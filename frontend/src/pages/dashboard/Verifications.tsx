
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import { verificationService } from "@/services/verificationService";

const Verifications = () => {
    // Ensuring role is passed as query param if needed, or handled by layout
    const [verifications, setVerifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadVerifications = async () => {
        try {
            const data = await verificationService.getPendingVerifications();
            setVerifications(data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load verifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVerifications();
    }, []);

    const handleReject = async (id: string, name: string) => {
        try {
            await verificationService.rejectVerification(id);
            toast.error(`Verification rejected/deleted for ${name}`);
            loadVerifications();
        } catch (e) {
            toast.error("Failed to reject");
        }
    };

    const handleApprove = async (id: string, name: string) => {
        try {
            await verificationService.approveVerification(id);
            toast.success(`Verification approved for ${name}`);
            loadVerifications();
        } catch (e) {
            toast.error("Failed to approve");
        }
    };

    return (
        <DashboardLayout role="admin">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Verifications</h1>
                    <p className="text-muted-foreground mt-1">Review and approve ambassador submissions</p>
                </div>

                <div className="grid gap-4">
                    {loading ? <p>Loading...</p> : verifications.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No pending verifications
                        </div>
                    ) : (
                        verifications.map((item) => (
                            <Card key={item.id}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-secondary rounded-full">
                                            <FileText className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base font-semibold">{item.full_name}</CardTitle>
                                            {/* Assuming amount_paid is the verification amount */}
                                            <CardDescription>Payment Proof • {new Date(item.created_at).toLocaleDateString()} {item.amount_paid && `• ₹${item.amount_paid}`}</CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        {item.status}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="flex justify-end gap-2 pt-0">
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleReject(item.id, item.full_name)}>
                                        <XCircle className="w-4 h-4 mr-1" /> Reject
                                    </Button>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(item.id, item.full_name)}>
                                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Verifications;
