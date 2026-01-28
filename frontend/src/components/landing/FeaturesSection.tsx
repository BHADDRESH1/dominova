import {
  UserPlus,
  FileCheck,
  Award,
  MessageSquare,
  Briefcase,
  TrendingUp,
  DollarSign,
  FileText
} from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to <span className="text-primary">Manage Operations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From student referrals to employee payroll, our platform handles it all with
            precision and ease.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<UserPlus className="w-6 h-6" />}
            title="Student Onboarding"
            description="Ambassadors add student details and track their referral journey from registration to enrollment."
          />
          <FeatureCard
            icon={<FileCheck className="w-6 h-6" />}
            title="Payment Verification"
            description="Upload proofs, admin verification, and automated status updates in real-time."
          />
          <FeatureCard
            icon={<Award className="w-6 h-6" />}
            title="Incentive Tracking"
            description="Multi-tier incentive slabs with automatic calculations and transparent earnings."
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Built-in Chat"
            description="Direct communication between ambassadors and admins for quick resolutions."
          />
          <FeatureCard
            icon={<Briefcase className="w-6 h-6" />}
            title="Employee Profiles"
            description="Complete employee management with designations, departments, and reporting structure."
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Performance Reviews"
            description="Monthly performance tracking with ratings, remarks, and improvement notes."
          />
          <FeatureCard
            icon={<DollarSign className="w-6 h-6" />}
            title="Salary Management"
            description="Track salary history, bonuses, and payment status with owner-level controls."
          />
          <FeatureCard
            icon={<FileText className="w-6 h-6" />}
            title="Documents & Policies"
            description="Centralized repository for offer letters, policies, SOPs, and legal documents."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass-card p-6 rounded-2xl hover:border-primary/40 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform border border-primary/20">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
