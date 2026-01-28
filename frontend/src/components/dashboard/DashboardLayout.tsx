import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Crown,
  UserCheck,
  GraduationCap,
  BarChart3,
  Award,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/auth";

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
}

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const roleConfig = {
    owner: {
      label: "Owner",
      icon: Crown,
      color: "owner" as const,
    },
    admin: {
      label: "Admin",
      icon: Shield,
      color: "admin" as const,
    },
    ambassador: {
      label: "Ambassador",
      icon: GraduationCap,
      color: "ambassador" as const,
    },
    employee: {
      label: "Employee",
      icon: Briefcase,
      color: "admin" as const, // Reusing admin color style for now or default
    },
  };

  const navItems = {
    owner: [
      { label: "Dashboard", href: "/dashboard/owner", icon: LayoutDashboard },
      { label: "Ambassadors", href: "/dashboard/ambassadors", icon: Users },
      { label: "Employees", href: "/dashboard/employees", icon: Briefcase },
      { label: "Financials", href: "/dashboard/financials", icon: DollarSign },
      { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      {
        label: "Policies",
        href: "/dashboard/policies?role=owner",
        icon: FileText,
      },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    admin: [
      { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      {
        label: "Ambassadors",
        href: "/dashboard/ambassadors?role=admin",
        icon: Users,
      },
      {
        label: "Verifications",
        href: "/dashboard/verifications",
        icon: FileCheck,
      },
      { label: "Offer Letters", href: "/dashboard/offer-letters", icon: Award },
      {
        label: "Employees",
        href: "/dashboard/employees?role=admin",
        icon: Briefcase,
      },
      {
        label: "Messages",
        href: "/dashboard/messages?role=admin",
        icon: MessageSquare,
      },
      {
        label: "Policies",
        href: "/dashboard/policies?role=admin",
        icon: FileText,
      },
    ],
    ambassador: [
      {
        label: "Dashboard",
        href: "/dashboard/ambassador",
        icon: LayoutDashboard,
      },
      { label: "My Students", href: "/dashboard/students", icon: Users },
      { label: "Earnings", href: "/dashboard/earnings", icon: DollarSign },
      { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Award },
      { label: "Tasks", href: "/dashboard/tasks", icon: FileCheck },
      {
        label: "Messages",
        href: "/dashboard/messages?role=ambassador",
        icon: MessageSquare,
      },
      {
        label: "Policies",
        href: "/dashboard/policies?role=ambassador",
        icon: FileText,
      },
    ],
    employee: [
      {
        label: "Dashboard",
        href: "/dashboard/employee",
        icon: LayoutDashboard,
      },
      {
        label: "Messages",
        href: "/dashboard/messages?role=employee",
        icon: MessageSquare,
      },
      {
        label: "Policies",
        href: "/dashboard/policies?role=employee",
        icon: FileText,
      },
      // Add more employee specific items here if needed
    ],
  };

  const config = roleConfig[role];
  const RoleIcon = config.icon;
  const items = navItems[role];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/dominova_logo.png"
            alt="Dominova"
            className="w-8 h-8 object-contain"
          />
          <span className="text-lg font-bold text-sidebar-foreground">
            Dominova
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-sidebar-foreground"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
            <img
              src="/dominova_logo.png"
              alt="Dominova"
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold text-sidebar-foreground">
              Dominova
            </span>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  config.color === "owner" && "bg-owner/20 text-owner",
                  config.color === "admin" && "bg-admin/20 text-admin",
                  config.color === "ambassador" &&
                    "bg-ambassador/20 text-ambassador",
                )}
              >
                <RoleIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">
                  Demo User
                </p>
                <Badge variant={config.color} className="text-xs mt-1">
                  {config.label}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "nav-link",
                      isActive
                        ? "nav-link-active"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className={cn("lg:ml-64 min-h-screen", "pt-16 lg:pt-0")}>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};
