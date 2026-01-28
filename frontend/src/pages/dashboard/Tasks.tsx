
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/common/FileUpload";
import { useState } from "react";
import { toast } from "sonner";

const INITIAL_TASKS = [
    { id: 1, title: "Upload Payment Proof", description: "For Student ID #4521", status: "Pending", due: "Today", needsUpload: true },
    { id: 2, title: "Complete Profile", description: "Add your bank details for payouts", status: "Done", due: "Yesterday" },
    { id: 3, title: "Share Campaign", description: "Post on LinkedIn about the new batch", status: "Pending", due: "Tomorrow" },
];

const Tasks = () => {
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const handleUploadComplete = (taskId: number, url: string) => {
        console.log("Uploaded proof:", url);
        // Update task status
        setTasks(prev => prev.map(t =>
            t.id === taskId
                ? { ...t, status: "Done", description: "Proof uploaded successfully" }
                : t
        ));
    };

    const markAsDone = (taskId: number) => {
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, status: "Done" } : t
        ));
        toast.success("Task marked as completed");
    }

    return (
        <DashboardLayout role="ambassador">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
                    <p className="text-muted-foreground mt-1">Pending actions and requirements</p>
                </div>

                <div className="grid gap-4">
                    {tasks.map((task) => (
                        <Card key={task.id} className={task.status === "Done" ? "opacity-60 border-green-500/20" : ""}>
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
                                    {task.needsUpload ? (
                                        <div className="mt-2">
                                            <FileUpload
                                                label="Select Screenshot"
                                                onUploadComplete={(url) => handleUploadComplete(task.id, url)}
                                            />
                                        </div>
                                    ) : (
                                        <Button size="sm" variant="outline" onClick={() => markAsDone(task.id)}>Mark as Done</Button>
                                    )}
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
