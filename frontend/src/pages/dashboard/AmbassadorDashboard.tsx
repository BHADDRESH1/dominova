import {
  Users,
  DollarSign,
  Trophy,
  Clock,
  TrendingUp,
  Plus,
  Upload,
  MessageSquare,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ambassadorService } from "@/services/ambassadorService";
import { verificationService } from "@/services/verificationService";

const incentiveSlabs = [
  { min: 1, max: 5, rate: 100 },
  { min: 6, max: 10, rate: 150 },
  { min: 11, max: 20, rate: 200 },
  { min: 21, max: null, rate: 250 },
];

const AmbassadorDashboard = () => {
  const [stats, setStats] = useState<any>({
    totalStudents: 0,
    paidStudents: 0,
    pendingStudents: 0,
    totalEarnings: 0,
    nextSlabTarget: 0,
    currentRank: 0,
  });
  const [recentStudents, setRecentStudents] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseInterested: "",
  });
  const [adding, setAdding] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const ambassadorId = "me";
      const statsData =
        await ambassadorService.getAmbassadorStats(ambassadorId);
      setStats(
        statsData || {
          totalStudents: 0,
          paidStudents: 0,
          pendingStudents: 0,
          totalEarnings: 0,
          nextSlabTarget: 0,
          currentRank: 0,
        },
      );
      const students = await verificationService.getPendingVerifications();
      setRecentStudents(students.slice(0, 3));
      const allAmbassadors = await ambassadorService.getAllAmbassadors();
      const sorted = allAmbassadors
        .map((a: any, i: number) => ({
          rank: i + 1,
          name: a.name,
          referrals: a.referrals,
          isYou: a.id === ambassadorId,
        }))
        .sort((a, b) => b.referrals - a.referrals);
      setLeaderboard(sorted);
    } catch (e) {
      setStats({
        totalStudents: 0,
        paidStudents: 0,
        pendingStudents: 0,
        totalEarnings: 0,
        nextSlabTarget: 0,
        currentRank: 0,
      });
      setRecentStudents([]);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      // Replace with actual ambassadorId if available
      const ambassadorId = "me";
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL
          ? `${import.meta.env.VITE_BACKEND_URL}/api/students`
          : "http://localhost:3000/api/students",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...addForm, referredById: ambassadorId }),
        },
      );
      if (!res.ok) throw new Error("Failed to add student");
      toast.success("Student added successfully");
      setShowAddModal(false);
      setAddForm({ fullName: "", email: "", phone: "", courseInterested: "" });
      fetchDashboardData();
    } catch (err: any) {
      toast.error(err.message || "Failed to add student");
    } finally {
      setAdding(false);
    }
  };

  const progressToNextSlab =
    stats && stats.nextSlabTarget
      ? (stats.paidStudents / stats.nextSlabTarget) * 100
      : 0;

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Ambassador Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your referrals and earnings
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="ambassador" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
                      const handleAddStudent = async (e: React.FormEvent) => {
                        e.preventDefault();
                        if (!ambassadorId) {
                          toast.error("Ambassador profile not loaded. Please wait and try again.");
                          return;
                        }
                        setAdding(true);
                        try {
                          const res = await fetch(
                            import.meta.env.VITE_BACKEND_URL
                              ? `${import.meta.env.VITE_BACKEND_URL}/api/students`
                              : "http://localhost:3000/api/students",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ ...addForm, referredById: ambassadorId }),
                            },
                          );
                          if (!res.ok) throw new Error("Failed to add student");
                          toast.success("Student added successfully");
                          setShowAddModal(false);
                          setAddForm({ fullName: "", email: "", phone: "", courseInterested: "" });
                          fetchDashboardData(ambassadorId);
                        } catch (err: any) {
                          toast.error(err.message || "Failed to add student");
                        } finally {
                          setAdding(false);
                        }
                      };
                    placeholder="Email"
                    type="email"
                    value={addForm.email}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                  />
                  <Input
                    placeholder="Phone"
                    value={addForm.phone}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                  <Input
                    placeholder="Course Interested"
                    value={addForm.courseInterested}
                    onChange={(e) =>
                      setAddForm((f) => ({
                        ...f,
                        courseInterested: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddModal(false)}
                              <Button variant="ambassador" onClick={() => setShowAddModal(true)} disabled={!ambassadorId}>
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="ambassador" loading={adding}>
                      Add
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Students"
                value={stats.totalStudents || 0}
                icon={<Users className="w-5 h-5" />}
                color="ambassador"
              />
              <StatCard
                title="Paid Students"
                value={stats.paidStudents || 0}
                icon={<TrendingUp className="w-5 h-5" />}
                color="success"
              />
              <StatCard
                title="Pending"
                value={stats.pendingStudents || 0}
                icon={<Clock className="w-5 h-5" />}
                color="warning"
              />
              <StatCard
                title="Total Earnings"
                value={`₹${(stats.totalEarnings || 0).toLocaleString()}`}
                icon={<DollarSign className="w-5 h-5" />}
                color="success"
              />
            </div>

            {/* Progress & Incentives */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Progress to next slab */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-ambassador" />
                    Progress to Next Slab
                  </CardTitle>
                  <CardDescription>
                    {stats.paidStudents || 0} of {stats.nextSlabTarget || 0}{" "}
                    students to unlock ₹200/referral
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progressToNextSlab} className="h-3 mb-4" />
                  <div className="grid grid-cols-4 gap-2">
                    {incentiveSlabs.map((slab, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg text-center ${
                          (stats.paidStudents || 0) >= slab.min
                            ? "bg-ambassador/20 border border-ambassador/30"
                            : "bg-muted/50 border border-border"
                        }`}
                      >
                        <p className="text-xs text-muted-foreground">
                          {slab.min}-{slab.max || "∞"}
                        </p>
                        <p
                          className={`text-lg font-bold ${
                            (stats.paidStudents || 0) >= slab.min
                              ? "text-ambassador"
                              : "text-muted-foreground"
                          }`}
                        >
                          ₹{slab.rate}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-warning" />
                    Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Your current rank: #{stats.currentRank || 0}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.map((entry: any) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        entry.isYou
                          ? "bg-ambassador/10 border border-ambassador/30"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            entry.rank <= 3
                              ? "bg-warning/20 text-warning"
                              : entry.isYou
                                ? "bg-ambassador/20 text-ambassador"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {entry.rank}
                        </div>
                        <p
                          className={`font-medium text-sm ${entry.isYou ? "text-ambassador" : ""}`}
                        >
                          {entry.name}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {entry.referrals} referrals
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Students */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Students</CardTitle>
                  <CardDescription>Your latest referrals</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-ambassador/20 flex items-center justify-center text-ambassador font-semibold">
                          {student.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {student.name || "Unknown"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {student.date || ""}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          student.status === "paid" ? "success" : "warning"
                        }
                      >
                        {student.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat with Admin */}
            <Card className="border-2 border-dashed border-admin/30 bg-admin/5">
              <CardContent className="py-8 text-center">
                <MessageSquare className="w-12 h-12 text-admin mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with the admin team for payment clarifications or support
                </p>
                <Button variant="admin">Start Chat</Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "ambassador" | "success" | "warning";
}

const colorClasses = {
  ambassador: "bg-ambassador/10 text-ambassador",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div
          className={`w-10 h-10 rounded-xl ${colorClasses[color]} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default AmbassadorDashboard;
