
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { verificationService } from "@/services/verificationService";

const OfferLetters = () => {
    const [loading, setLoading] = useState(false);
    const [recentLetters, setRecentLetters] = useState<any[]>([]);

    useEffect(() => {
        // Placeholder for future history fetching
    }, []);

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            toast.success("Offer letter preview generated successfully!");
            setLoading(false);
        }, 1000);
    };

    return (
        <DashboardLayout role="admin">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Offer Letters</h1>
                    <p className="text-muted-foreground mt-1">Generate and send offer letters to selected candidates</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generate New Offer</CardTitle>
                            <CardDescription>Enter candidate details to create a letter</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="candidate-name">Candidate Name</Label>
                                <Input id="candidate-name" placeholder="e.g. Rahul Verma" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="candidate-email">Email Address</Label>
                                <Input id="candidate-email" type="email" placeholder="e.g. rahul@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input id="position" defaultValue="Campus Ambassador" />
                            </div>
                            <Button className="w-full gap-2" onClick={handleGenerate} disabled={loading}>
                                <FileCheck className="w-4 h-4" /> {loading ? "Generating..." : "Generate Preview"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Letters Sent</CardTitle>
                            <CardDescription>History of offer letters dispatched</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentLetters.length === 0 ? (
                                    <p className="text-muted-foreground text-center py-4">No recent letters sent.</p>
                                ) : (
                                    recentLetters.map((i) => (
                                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">Candidate #{i}</p>
                                                <p className="text-sm text-muted-foreground">Sent on Jan {15 - i}, 2024</p>
                                            </div>
                                            <Button size="icon" variant="ghost">
                                                <Send className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default OfferLetters;
