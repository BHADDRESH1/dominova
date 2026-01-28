
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, FileCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { emailService } from "@/services/emailService";

const OfferLetters = () => {
    const [loading, setLoading] = useState(false);
    const [recentLetters, setRecentLetters] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "Campus Ambassador"
    });

    useEffect(() => {
        // Placeholder for future history fetching
    }, []);

    const handleSend = async () => {
        if (!formData.name || !formData.email) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await emailService.sendOfferLetter(formData.email, formData.name);
            toast.success(`Offer letter sent to ${formData.email}`);

            setRecentLetters(prev => [{
                name: formData.name,
                email: formData.email,
                date: new Date().toLocaleDateString()
            }, ...prev]);

            // Reset form
            setFormData(prev => ({ ...prev, name: "", email: "" }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to send offer letter");
        } finally {
            setLoading(false);
        }
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
                                <Input
                                    id="candidate-name"
                                    placeholder="e.g. Rahul Verma"
                                    value={formData.name}
                                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="candidate-email">Email Address</Label>
                                <Input
                                    id="candidate-email"
                                    type="email"
                                    placeholder="e.g. rahul@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    value={formData.position}
                                    onChange={(e) => setFormData(p => ({ ...p, position: e.target.value }))}
                                />
                            </div>
                            <Button className="w-full gap-2" onClick={handleSend} disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {loading ? "Sending..." : "Send Offer Letter"}
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
                                    recentLetters.map((letter, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{letter.name}</p>
                                                <p className="text-sm text-muted-foreground">{letter.email} • {letter.date}</p>
                                            </div>
                                            <Button size="icon" variant="ghost">
                                                <FileCheck className="w-4 h-4 text-green-500" />
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
