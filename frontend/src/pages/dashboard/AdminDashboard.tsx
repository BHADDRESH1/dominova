import { useEffect, useState } from "react";
import {
  Users,
  FileCheck,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  UserPlus
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddAmbassadorModal } from "@/components/dashboard/AddAmbassadorModal";
import { toast } from "sonner";
import { dashboardService } from "@/services/dashboardService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalAmbassadors: 0,
    pendingVerifications: 0,
    pendingOfferLetters: 0,
    completedToday: 0,
  });

  const [pendingTasks, setPendingTasks] = useState<any[]>([]);
  const [recentVerifications, setRecentVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const dashboardStats = await dashboardService.getStats();
        setStats(dashboardStats);

        const { verifications, offerLetters } = await dashboardService.getPendingTasks();

        // Combine into a single task list for UI
        const tasks = [
          ...verifications.map(v => ({ type: 'verification', student: v.full_name, ambassador: 'Ambassador', amount: v.amount_paid || 'N/A' })),
          ...offerLetters.map(o => ({ type: 'offer_letter', student: o.full_name, program: o.course_interested }))
        ];

        setPendingTasks(tasks);

        const recent = await dashboardService.getRecentVerifications();
        setRecentVerifications(recent?.map(r => ({
          student: r.full_name,
          status: r.status,
          time: new Date(r.created_at).toLocaleDateString()
        })) || []);

      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleAction = (type: string, student: string) => {
    if (type === 'verification') {
      toast.info(`Opening verification details for ${student}`);
    } else {
      toast.info(`Preparing offer letter for ${student}`);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage ambassadors and verify payments</p>
          </div>
          <AddAmbassadorModal />
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Ambassadors"
            value={stats.totalAmbassadors}
            icon={<Users className="w-5 h-5" />}
            color="admin"
          />
          <StatCard
            title="Pending Verifications"
            value={stats.pendingVerifications}
            icon={<Clock className="w-5 h-5" />}
            color="warning"
            urgent={stats.pendingVerifications > 0}
          />
          <StatCard
            title="Pending Offer Letters"
            value={stats.pendingOfferLetters}
            icon={<Send className="w-5 h-5" />}
            color="info"
          />
          <StatCard
            title="Completed Today"
            value={stats.completedToday}
            icon={<CheckCircle2 className="w-5 h-5" />}
            color="success"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Pending Tasks
              </CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No pending tasks</p>
                ) : (
                  pendingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${task.type === 'verification' ? 'bg-warning/20 text-warning' : 'bg-info/20 text-info'
                          }`}>
                          {task.type === 'verification' ? <FileCheck className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{task.student}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.type === 'verification'
                              ? `Amount: ${task.amount}`
                              : task.program
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={task.type === 'verification' ? 'warning' : 'info'}>
                          {task.type === 'verification' ? 'Verify' : 'Send Letter'}
                        </Badge>
                        <Button size="sm" variant={task.type === 'verification' ? 'default' : 'admin'} onClick={() => handleAction(task.type, task.student)}>
                          Action
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Verifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-success" />
                Recent Students
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentVerifications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              ) : (
                recentVerifications.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.student}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <Badge variant={item.status === 'joined' ? 'success' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'admin' | 'warning' | 'info' | 'success';
  urgent?: boolean;
}

const colorClasses = {
  admin: 'bg-admin/10 text-admin',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-info/10 text-info',
  success: 'bg-success/10 text-success',
};

const StatCard = ({ title, value, icon, color, urgent }: StatCardProps) => (
  <Card className={`hover:shadow-lg transition-shadow ${urgent ? 'ring-2 ring-warning/50' : ''}`}>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default AdminDashboard;
