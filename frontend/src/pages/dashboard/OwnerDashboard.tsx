import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Award,
  Clock
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OwnerDashboard = () => {
  // Sample data - will be replaced with real data
  const stats = {
    totalAmbassadors: 48,
    activeAmbassadors: 42,
    totalEmployees: 12,
    totalRevenue: 125000,
    totalIncentivesPaid: 18500,
    totalSalariesPaid: 95000,
    pendingPayouts: 4200,
  };

  const topAmbassadors = [
    { name: "Priya Sharma", referrals: 28, earnings: 5600 },
    { name: "Rahul Kumar", referrals: 24, earnings: 4800 },
    { name: "Ananya Patel", referrals: 21, earnings: 4200 },
  ];

  const recentActivity = [
    { action: "Payment verified", user: "Vikram Singh", time: "2 hours ago" },
    { action: "New ambassador joined", user: "Sneha Gupta", time: "5 hours ago" },
    { action: "Salary updated", user: "HR Team", time: "1 day ago" },
  ];

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Owner Dashboard</h1>
          <p className="text-muted-foreground mt-1">Complete overview of your operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Ambassadors"
            value={stats.totalAmbassadors}
            subValue={`${stats.activeAmbassadors} active`}
            icon={<Users className="w-5 h-5" />}
            trend={{ value: 12, positive: true }}
            color="ambassador"
          />
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            subValue="All departments"
            icon={<Briefcase className="w-5 h-5" />}
            color="admin"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            subValue="This month"
            icon={<DollarSign className="w-5 h-5" />}
            trend={{ value: 8, positive: true }}
            color="success"
          />
          <StatCard
            title="Pending Payouts"
            value={`₹${stats.pendingPayouts.toLocaleString()}`}
            subValue="Awaiting approval"
            icon={<Clock className="w-5 h-5" />}
            color="warning"
          />
        </div>

        {/* Financial Summary */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Financial Overview
              </CardTitle>
              <CardDescription>Total payouts and revenue tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-success">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-ambassador/10 border border-ambassador/20">
                  <p className="text-sm text-muted-foreground">Incentives Paid</p>
                  <p className="text-2xl font-bold text-ambassador">₹{stats.totalIncentivesPaid.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-admin/10 border border-admin/20">
                  <p className="text-sm text-muted-foreground">Salaries Paid</p>
                  <p className="text-2xl font-bold text-admin">₹{stats.totalSalariesPaid.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Ambassadors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-warning" />
                Top Ambassadors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topAmbassadors.map((ambassador, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-ambassador/20 flex items-center justify-center text-sm font-bold text-ambassador">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{ambassador.name}</p>
                      <p className="text-xs text-muted-foreground">{ambassador.referrals} referrals</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-success">₹{ambassador.earnings}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <Badge variant="secondary">{activity.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  subValue: string;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  color: 'ambassador' | 'admin' | 'owner' | 'success' | 'warning';
}

const colorClasses = {
  ambassador: 'bg-ambassador/10 text-ambassador',
  admin: 'bg-admin/10 text-admin',
  owner: 'bg-owner/10 text-owner',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
};

const StatCard = ({ title, value, subValue, icon, trend, color }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-xs ${trend.positive ? 'text-success' : 'text-destructive'}`}>
          {trend.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>{trend.value}% from last month</span>
        </div>
      )}
    </CardContent>
  </Card>
);

export default OwnerDashboard;
