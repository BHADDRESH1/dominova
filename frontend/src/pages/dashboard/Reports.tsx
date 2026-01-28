
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const REVENUE_DATA = [
    { name: 'Jan', revenue: 4000, referrals: 24 },
    { name: 'Feb', revenue: 3000, referrals: 18 },
    { name: 'Mar', revenue: 2000, referrals: 12 },
    { name: 'Apr', revenue: 2780, referrals: 30 },
    { name: 'May', revenue: 1890, referrals: 45 },
    { name: 'Jun', revenue: 2390, referrals: 25 },
];

const PREFORMANCE_DATA = [
    { name: 'Week 1', students: 10 },
    { name: 'Week 2', students: 25 },
    { name: 'Week 3', students: 15 },
    { name: 'Week 4', students: 35 },
];

const Reports = () => {
    return (
        <DashboardLayout role="owner">
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
                        <p className="text-muted-foreground mt-1">Detailed insights into your program performance</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" /> Export All
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Overview</CardTitle>
                            <CardDescription>Monthly revenue generated from referrals</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={REVENUE_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="revenue" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Referral Growth</CardTitle>
                            <CardDescription>New student registrations per week</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={PREFORMANCE_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="students" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Total Ambassador Payouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹1,24,500</div>
                            <p className="text-xs text-muted-foreground">+12% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18.2%</div>
                            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Active Regions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">Across India</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;
