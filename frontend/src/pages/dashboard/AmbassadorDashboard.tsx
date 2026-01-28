import { 
  Users, 
  DollarSign, 
  Trophy, 
  Clock,
  TrendingUp,
  Plus,
  Upload,
  MessageSquare
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const AmbassadorDashboard = () => {
  const stats = {
    totalStudents: 18,
    paidStudents: 14,
    pendingStudents: 4,
    totalEarnings: 2800,
    currentRank: 5,
    nextSlabTarget: 20,
  };

  const incentiveSlabs = [
    { min: 1, max: 5, rate: 100 },
    { min: 6, max: 10, rate: 150 },
    { min: 11, max: 20, rate: 200 },
    { min: 21, max: null, rate: 250 },
  ];

  const recentStudents = [
    { name: "Amit Kumar", status: "paid", date: "2 days ago" },
    { name: "Sneha Reddy", status: "pending", date: "3 days ago" },
    { name: "Vikram Singh", status: "paid", date: "5 days ago" },
  ];

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", referrals: 28 },
    { rank: 2, name: "Rahul Kumar", referrals: 24 },
    { rank: 3, name: "Ananya Patel", referrals: 21 },
    { rank: 4, name: "Kiran Reddy", referrals: 19 },
    { rank: 5, name: "You", referrals: 18, isYou: true },
  ];

  const progressToNextSlab = (stats.paidStudents / stats.nextSlabTarget) * 100;

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ambassador Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your referrals and earnings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ambassador">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Proof
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<Users className="w-5 h-5" />}
            color="ambassador"
          />
          <StatCard
            title="Paid Students"
            value={stats.paidStudents}
            icon={<TrendingUp className="w-5 h-5" />}
            color="success"
          />
          <StatCard
            title="Pending"
            value={stats.pendingStudents}
            icon={<Clock className="w-5 h-5" />}
            color="warning"
          />
          <StatCard
            title="Total Earnings"
            value={`₹${stats.totalEarnings.toLocaleString()}`}
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
                {stats.paidStudents} of {stats.nextSlabTarget} students to unlock ₹200/referral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressToNextSlab} className="h-3 mb-4" />
              <div className="grid grid-cols-4 gap-2">
                {incentiveSlabs.map((slab, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg text-center ${
                      stats.paidStudents >= slab.min 
                        ? 'bg-ambassador/20 border border-ambassador/30' 
                        : 'bg-muted/50 border border-border'
                    }`}
                  >
                    <p className="text-xs text-muted-foreground">
                      {slab.min}-{slab.max || '∞'}
                    </p>
                    <p className={`text-lg font-bold ${
                      stats.paidStudents >= slab.min ? 'text-ambassador' : 'text-muted-foreground'
                    }`}>
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
              <CardDescription>Your current rank: #{stats.currentRank}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.map((entry) => (
                <div 
                  key={entry.rank} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    entry.isYou ? 'bg-ambassador/10 border border-ambassador/30' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.rank <= 3 
                        ? 'bg-warning/20 text-warning' 
                        : entry.isYou 
                          ? 'bg-ambassador/20 text-ambassador'
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {entry.rank}
                    </div>
                    <p className={`font-medium text-sm ${entry.isYou ? 'text-ambassador' : ''}`}>
                      {entry.name}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">{entry.referrals} referrals</p>
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
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-ambassador/20 flex items-center justify-center text-ambassador font-semibold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.date}</p>
                    </div>
                  </div>
                  <Badge variant={student.status === 'paid' ? 'success' : 'warning'}>
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
      </div>
    </DashboardLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'ambassador' | 'success' | 'warning';
}

const colorClasses = {
  ambassador: 'bg-ambassador/10 text-ambassador',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
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

export default AmbassadorDashboard;
