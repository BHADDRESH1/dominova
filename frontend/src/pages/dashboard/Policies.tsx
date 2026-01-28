
import { FileText, Shield, UserCheck, Briefcase } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useSearchParams } from "react-router-dom";

const Policies = () => {
    const [searchParams] = useSearchParams();
    const roleFromUrl = searchParams.get("role");
    const userRole = roleFromUrl || localStorage.getItem("userRole") || "owner";

    const policies = {
        general: [
            {
                title: "Terms of Service",
                date: "Updated Jan 2024",
                content: "These are the general terms and conditions for using the Dominova platform...",
                icon: Shield
            },
            {
                title: "Privacy Policy",
                date: "Updated Jan 2024",
                content: "Data privacy is paramount. This document outlines how we handle user data...",
                icon: Shield
            }
        ],
        ambassador: [
            {
                title: "Ambassador Code of Conduct",
                date: "Updated Dec 2023",
                content: "As a Campus Ambassador, you are the face of our brand. Guidelines for conduct...",
                icon: UserCheck
            },
            {
                title: "Incentive Structure 2024",
                date: "Effective Jan 1, 2024",
                content: "Detailed breakdown of the referral bonuses, milestone rewards, and payout cycles...",
                icon: FileText
            }
        ],
        employee: [
            {
                title: "Employee Handbook",
                date: "Version 2.0",
                content: "Comprehensive guide to company culture, policies, and operational procedures...",
                icon: Briefcase
            },
            {
                title: "Leave Policy",
                date: "Updated Nov 2023",
                content: "Guidelines for casual leave, sick leave, and privilege leave application...",
                icon: Briefcase
            },
            {
                title: "IT Security Guidelines",
                date: "Critical Update",
                content: "Protocols for data security, device management, and access control...",
                icon: Shield
            }
        ]
    };

    const defaultTab = userRole === "ambassador" ? "ambassador" : userRole === "admin" || userRole === "owner" ? "general" : "general";

    return (
        <DashboardLayout role={userRole as any}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Policies & Guidelines</h1>
                    <p className="text-muted-foreground mt-2">
                        Official guidelines and standards for Dominova operations.
                    </p>
                </div>

                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-secondary/50 border border-white/5">
                        <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-black">General</TabsTrigger>
                        {(userRole === "ambassador" || userRole === "owner" || userRole === "admin") && (
                            <TabsTrigger value="ambassador" className="data-[state=active]:bg-primary data-[state=active]:text-black">Ambassador</TabsTrigger>
                        )}
                        {(userRole === "employee" || userRole === "owner" || userRole === "admin") && (
                            <TabsTrigger value="employee" className="data-[state=active]:bg-primary data-[state=active]:text-black">Employee</TabsTrigger>
                        )}
                    </TabsList>

                    <TabsContent value="general" className="mt-6 space-y-6 animate-fade-in">
                        <div className="grid gap-6 md:grid-cols-2">
                            {policies.general.map((policy, index) => (
                                <PolicyCard key={index} {...policy} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="ambassador" className="mt-6 space-y-6 animate-fade-in">
                        <div className="grid gap-6 md:grid-cols-2">
                            {policies.ambassador.map((policy, index) => (
                                <PolicyCard key={index} {...policy} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="employee" className="mt-6 space-y-6 animate-fade-in">
                        <div className="grid gap-6 md:grid-cols-2">
                            {policies.employee.map((policy, index) => (
                                <PolicyCard key={index} {...policy} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

const PolicyCard = ({ title, date, content, icon: Icon }: { title: string, date: string, content: string, icon: any }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
                <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                    {title}
                </CardTitle>
                <CardDescription>{date}</CardDescription>
            </div>
            <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Icon className="w-4 h-4" />
            </div>
        </CardHeader>
        <CardContent>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground line-clamp-3">
                {content}
            </p>
            <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read full document →
            </div>
        </CardContent>
    </Card>
);

export default Policies;
