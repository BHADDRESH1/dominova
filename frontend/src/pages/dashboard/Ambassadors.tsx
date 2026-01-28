
import { useState, useEffect } from "react";
import { Search, Filter, Plus, Mail, CheckCircle, XCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ambassadorService } from "@/services/ambassadorService";

import { AddAmbassadorModal } from "@/components/dashboard/AddAmbassadorModal";
import { useSearchParams } from "react-router-dom";

const Ambassadors = () => {
    const [searchParams] = useSearchParams();
    const roleFromUrl = searchParams.get("role");
    const userRole = roleFromUrl || localStorage.getItem("userRole") || "owner";

    const [searchTerm, setSearchTerm] = useState("");
    const [ambassadors, setAmbassadors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await ambassadorService.getAllAmbassadors();
                setAmbassadors(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filteredAmbassadors = ambassadors.filter(
        (amb) =>
            amb.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            amb.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout role={userRole as any}>
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Ambassadors</h1>
                        <p className="text-muted-foreground mt-1">Manage your campus ambassador program</p>
                    </div>
                    <AddAmbassadorModal />
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <CardTitle>All Ambassadors</CardTitle>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search ambassadors..."
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" size="icon">
                                    <Filter className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>University</TableHead>
                                        <TableHead>Referrals</TableHead>
                                        <TableHead>Earnings</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredAmbassadors.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                No ambassadors found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredAmbassadors.map((ambassador) => (
                                            <TableRow key={ambassador.id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{ambassador.name}</p>
                                                        <p className="text-sm text-muted-foreground">{ambassador.email}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{ambassador.university}</TableCell>
                                                <TableCell>{ambassador.referrals}</TableCell>
                                                <TableCell>{ambassador.earnings}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={ambassador.status === "Active" ? "default" : "secondary"}
                                                        className={ambassador.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                                                    >
                                                        {ambassador.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" title="Email">
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Ambassadors;
