
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

const LEADERBOARD = [
    { rank: 1, name: "Priya Sharma", referrals: 28, points: 2800, avatar: "PS" },
    { rank: 2, name: "Rahul Kumar", referrals: 24, points: 2400, avatar: "RK" },
    { rank: 3, name: "Ananya Patel", referrals: 21, points: 2100, avatar: "AP" },
    { rank: 4, name: "Kiran Reddy", referrals: 19, points: 1900, avatar: "KR" },
    { rank: 5, name: "You", referrals: 18, points: 1800, avatar: "ME" },
];

const Leaderboard = () => {
    return (
        <DashboardLayout role="ambassador">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
                    <p className="text-muted-foreground mt-1">See how you stack up against top ambassadors</p>
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
                            {LEADERBOARD.map((user) => (
                                <div key={user.rank} className={`flex items-center justify-between p-4 rounded-lg border ${user.name === 'You' ? 'bg-primary/10 border-primary/20' : 'bg-card'}`}>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-lg font-bold w-8 ${user.rank <= 3 ? 'text-yellow-600' : 'text-muted-foreground'}`}>#{user.rank}</span>
                                        <Avatar>
                                            <AvatarFallback>{user.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.points} pts</p>
                                        </div>
                                    </div>
                                    <div className="font-semibold">{user.referrals} Referrals</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Leaderboard;
