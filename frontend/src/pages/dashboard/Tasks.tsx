
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const TASKS = [
    { id: 1, title: "Upload Payment Proof", description: "For Student ID #4521", status: "Pending", due: "Today" },
    { id: 2, title: "Complete Profile", description: "Add your bank details for payouts", status: "Done", due: "Yesterday" },
    { id: 3, title: "Share Campaign", description: "Post on LinkedIn about the new batch", status: "Pending", due: "Tomorrow" },
];

const Tasks = () => {
    return (
        <DashboardLayout role="ambassador">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
                    <p className="text-muted-foreground mt-1">Pending actions and requirements</p>
                </div>

                <div className="grid gap-4">
                    {TASKS.map((task) => (
                        <Card key={task.id} className={task.status === "Done" ? "opacity-60" : ""}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                                        {task.status === "Done" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-muted-foreground" />}
                                        {task.title}
                                    </CardTitle>
                                    <CardDescription>{task.description}</CardDescription>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {task.due}
                                </div>
                            </CardHeader>
                            {task.status !== "Done" && (
                                <CardContent>
                                    <Button size="sm" variant="outline">Mark as Done</Button>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Tasks;
