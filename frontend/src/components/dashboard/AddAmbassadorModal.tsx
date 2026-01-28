import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import { ambassadorService } from "@/services/ambassadorService";

export function AddAmbassadorModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target as HTMLFormElement;
      const nameInput = form.elements.namedItem('name') as HTMLInputElement;
      const emailInput = form.elements.namedItem('email') as HTMLInputElement;
      const universityInput = form.elements.namedItem('university') as HTMLInputElement;

      await ambassadorService.createAmbassador({
        full_name: nameInput.value,
        email: emailInput.value,
        college_name: universityInput.value
      });

      toast.success("Ambassador added successfully");
      setOpen(false);
      // Optional: Trigger refresh of parent list if passed as prop
    } catch (error) {
      console.error(error);
      toast.error("Failed to add ambassador");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add Ambassador
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Ambassador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="university">University</Label>
            <Input id="university" placeholder="Delhi University" required />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Ambassador"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
