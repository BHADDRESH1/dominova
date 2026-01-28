import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboardService";

// Placeholder chart data, replace with backend API if available
const EMPTY_REVENUE_DATA = [];
const EMPTY_PERFORMANCE_DATA = [];

const Reports = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // If you have backend endpoints for chart data, fetch and use them here
  const [revenueData, setRevenueData] = useState<any[]>(EMPTY_REVENUE_DATA);
  const [performanceData, setPerformanceData] = useState<any[]>(
    EMPTY_PERFORMANCE_DATA,
  );

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const statsData = await dashboardService.getStats();
        setStats(statsData);
        // Optionally, fetch chart data from backend if available
        // setRevenueData(await dashboardService.getRevenueData());
        // setPerformanceData(await dashboardService.getPerformanceData());
      } catch (e) {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Detailed insights into your program performance
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export All
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue generated from referrals
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral Growth</CardTitle>
              <CardDescription>
                New student registrations per week
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Total Ambassador Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading || !stats
                  ? "Loading..."
                  : `₹${(stats.totalIncentivesPaid || 0).toLocaleString()}`}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.2%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Active Regions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Across India</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
