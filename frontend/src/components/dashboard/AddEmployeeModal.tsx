
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { employeeService } from "@/services/employeeService";

interface AddEmployeeModalProps {
    onSuccess?: () => void;
}

export function AddEmployeeModal({ onSuccess }: AddEmployeeModalProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [designation, setDesignation] = useState("");
    const [idCode, setIdCode] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await employeeService.createEmployee({
                full_name: name,
                email: email,
                department: role, // Mapping role to department for now as per simple form
                designation: designation || "Staff",
                employee_id_code: idCode || `EMP${Math.floor(Math.random() * 1000)}`,
                status: "active",
                employment_type: "Full-time",
                date_of_joining: new Date().toISOString().split('T')[0]
            });

            toast.success("Employee added successfully");
            setOpen(false);
            // Reset form
            setName("");
            setEmail("");
            setRole("");
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add employee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Add Employee
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="employee-id">Employee ID</Label>
                        <Input
                            id="employee-id"
                            placeholder="EMP001"
                            value={idCode}
                            onChange={(e) => setIdCode(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="Jane Doe"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="jane@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                            id="designation"
                            placeholder="e.g. Senior Developer"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Department</Label>
                        <Select onValueChange={setRole} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Human Resources">Human Resources</SelectItem>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Employee"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
