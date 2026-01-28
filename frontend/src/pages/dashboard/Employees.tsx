
import { useEffect, useState } from "react"; // Added useEffect
import { Search, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { AddEmployeeModal } from "@/components/dashboard/AddEmployeeModal";
import { employeeService } from "@/services/employeeService";

const Employees = () => {
    const [searchParams] = useSearchParams();
    const roleFromUrl = searchParams.get("role");
    const userRole = roleFromUrl || localStorage.getItem("userRole") || "owner";
    const [searchTerm, setSearchTerm] = useState("");
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEmployees = async () => {
        try {
            const data = await employeeService.getAllEmployees();
            setEmployees(data || []);
        } catch (error) {
            console.error("Failed to load employees", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const filteredEmployees = employees.filter(
        (emp) =>
            (emp.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (emp.department || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout role={userRole as any}>
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Employees</h1>
                        <p className="text-muted-foreground mt-1">Manage your team members and staff</p>
                    </div>
                    <AddEmployeeModal onSuccess={loadEmployees} />
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Employee Directory</CardTitle>
                                <CardDescription>Total {filteredEmployees.length} employees</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative w-64 hidden sm:block">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search employees..."
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
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Designation</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8">
                                                Loading employees...
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredEmployees.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8">
                                                No employees found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredEmployees.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="font-mono text-xs">{employee.employee_id_code}</TableCell>
                                                <TableCell className="font-medium">{employee.full_name}</TableCell>
                                                <TableCell>{employee.designation}</TableCell>
                                                <TableCell>{employee.department}</TableCell>
                                                <TableCell>{employee.employment_type}</TableCell>
                                                <TableCell>
                                                    <Badge variant={employee.status === "active" ? "success" : "secondary"}>
                                                        {employee.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">View</Button>
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

export default Employees;
