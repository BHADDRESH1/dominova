
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TRANSACTIONS = [
    { id: 1, date: "2024-01-01", amount: "₹2,000", type: "Referral Bonus", status: "Paid" },
    { id: 2, date: "2024-01-10", amount: "₹500", type: "Incentive", status: "Paid" },
    { id: 3, date: "2024-01-15", amount: "₹1,500", type: "Referral Bonus", status: "Pending" },
];

const Earnings = () => {
    return (
        <DashboardLayout role="ambassador">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Earnings</h1>
                    <p className="text-muted-foreground mt-1">View your payout history and pending amounts</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹4,000</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-500">₹1,500</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Next Payout Date</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Feb 01, 2024</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {TRANSACTIONS.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell>{tx.type}</TableCell>
                                        <TableCell className="font-medium">{tx.amount}</TableCell>
                                        <TableCell>
                                            <Badge variant={tx.status === "Paid" ? "default" : "outline"} className={tx.status === "Pending" ? "text-orange-500 border-orange-500" : ""}>
                                                {tx.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Earnings;
