import { Crown, Shield, GraduationCap, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const RolesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Role-Based Access Control
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three distinct portals with tailored permissions ensuring security and efficiency.
          </p>
        </div>

        {/* Roles grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <RoleCard
            icon={<Crown className="w-8 h-8" />}
            title="Owner"
            subtitle="Super Admin Access"
            features={[
              "View all ambassadors & employees",
              "Complete financial visibility",
              "Update salary structures",
              "Enable/disable admin access",
              "Decision-making dashboard",
              "Audit logs access"
            ]}
          />
          <RoleCard
            icon={<Shield className="w-8 h-8" />}
            title="Admin"
            subtitle="Operations Team"
            features={[
              "Manage ambassadors daily",
              "Verify payment proofs",
              "Approve tasks & send letters",
              "Track performance metrics",
              "Limited employee management",
              "Chat with ambassadors"
            ]}
          />
          <RoleCard
            icon={<GraduationCap className="w-8 h-8" />}
            title="Ambassador"
            subtitle="Campus Representative"
            features={[
              "Add student referrals",
              "Upload payment proofs",
              "Track earnings & incentives",
              "View leaderboard rankings",
              "Submit task completions",
              "Chat with admin team"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  features: string[];
}

const RoleCard = ({ icon, title, subtitle, features }: RoleCardProps) => (
  <div className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 group">
    <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex items-center gap-3 mb-2">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5">
        {title.toUpperCase()}
      </Badge>
    </div>
    <p className="text-muted-foreground mb-6 text-sm">{subtitle}</p>

    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="mt-1">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm text-foreground/90">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);
