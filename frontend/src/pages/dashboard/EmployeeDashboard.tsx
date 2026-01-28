
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmployeeDashboard = () => {
    return (
        <DashboardLayout role="employee">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Employee Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Welcome back! Manage your work and communications.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Announcements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">No new announcements at this time.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>My Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">You are all caught up!</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EmployeeDashboard;
