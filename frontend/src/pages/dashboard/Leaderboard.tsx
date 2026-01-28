import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

import { useEffect, useState } from "react";
import { ambassadorService } from "@/services/ambassadorService";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const ambassadors = await ambassadorService.getAllAmbassadors();
        // Sort by referrals descending, add rank and avatar fallback
        const sorted = ambassadors
          .sort((a: any, b: any) => (b.referrals || 0) - (a.referrals || 0))
          .map((a: any, i: number) => ({
            ...a,
            rank: i + 1,
            avatar: a.name
              ? a.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
              : "?",
            points: a.earnings ? parseInt(a.earnings.replace(/[^\d]/g, "")) : 0,
          }));
        setLeaderboard(sorted);
      } catch (e) {
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">
            See how you stack up against top ambassadors
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div>Loading...</div>
              ) : leaderboard.length === 0 ? (
                <div>No leaderboard data.</div>
              ) : (
                leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border ${user.isYou ? "bg-primary/10 border-primary/20" : "bg-card"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-lg font-bold w-8 ${user.rank <= 3 ? "text-yellow-600" : "text-muted-foreground"}`}
                      >
                        #{user.rank}
                      </span>
                      <Avatar>
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.points} pts
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold">
                      {user.referrals} Referrals
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
