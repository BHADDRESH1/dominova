import { useState, useEffect } from "react";
import { DollarSign, Search, Filter, Calendar, CheckCircle, Clock } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { salaryService } from "@/services/salaryService";

const Salaries = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("January");
    const [year, setYear] = useState(2024); // Could make dynamic
    const userRole = "owner";

    const [salaries, setSalaries] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalPaid: 0,
        pendingAmount: 0,
        employeesPaid: 0,
        employeesPending: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSalaries = async () => {
            setLoading(true);
            try {
                // Fetch data for the selected month
                const data = await salaryService.getSalariesByMonth(selectedMonth, year);

                // Transform data for UI if needed (mapping fields)
                // DB fields: payment_status, etc. UI expects: status
                const formattedData = data?.map((item: any) => ({
                    id: item.id,
                    employee_name: item.employees?.full_name || "Unknown",
                    employee_id: item.employees?.employee_id_code || "N/A",
                    month: item.month,
                    year: item.year,
                    amount: Number(item.amount),
                    status: item.payment_status, // 'paid' or 'pending'
                    payment_date: item.payment_date
                })) || [];

                setSalaries(formattedData);

                // Calculate stats
                const statsData = await salaryService.getSalaryStats(selectedMonth, year);
                setStats(statsData);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadSalaries();
    }, [selectedMonth, year]);

    return (
        <DashboardLayout role={userRole as any}>
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Salary Management</h1>
                        <p className="text-muted-foreground mt-1">Track and manage employee payroll</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[180px]">
                                <Calendar className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="January">January</SelectItem>
                                <SelectItem value="February">February</SelectItem>
                                <SelectItem value="March">March</SelectItem>
                                <SelectItem value="April">April</SelectItem>
                                <SelectItem value="May">May</SelectItem>
                                <SelectItem value="June">June</SelectItem>
                                <SelectItem value="July">July</SelectItem>
                                <SelectItem value="August">August</SelectItem>
                                <SelectItem value="September">September</SelectItem>
                                <SelectItem value="October">October</SelectItem>
                                <SelectItem value="November">November</SelectItem>
                                <SelectItem value="December">December</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* salary stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-success">₹{stats.totalPaid.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stats.employeesPaid} employees processed</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-warning">₹{stats.pendingAmount.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stats.employeesPending} employees pending</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Salary Records</CardTitle>
                                <CardDescription>Payroll for {selectedMonth} {year}</CardDescription>
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
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Payment Date</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : salaries?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8">
                                                No records found for {selectedMonth}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        salaries?.map((record) => (
                                            <TableRow key={record.id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{record.employee_name}</p>
                                                        <p className="text-xs text-muted-foreground">{record.employee_id}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-semibold">₹{record.amount.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge variant={record.status === "paid" ? "success" : "warning"}>
                                                        {record.status === "paid" ? (
                                                            <div className="flex items-center gap-1">
                                                                <CheckCircle className="w-3 h-3" /> Paid
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" /> Pending
                                                            </div>
                                                        )}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{record.payment_date || "-"}</TableCell>
                                                <TableCell className="text-right">
                                                    {record.status === "pending" && (
                                                        <Button size="sm" variant="default">Mark Paid</Button>
                                                    )}
                                                    {record.status === "paid" && (
                                                        <Button size="sm" variant="ghost">View Details</Button>
                                                    )}
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

export default Salaries;
