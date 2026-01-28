import { ArrowRight, Shield, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle Background Gradient - Dark to slightly lighter charcoal */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#151515]" />

      {/* Subtle Gold Glow (Smoke effect) - Very faint */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Internal Management System</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Your Complete
            <br />
            <span className="text-primary font-extrabold drop-shadow-lg">Operations Hub</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
            Manage campus ambassadors, employees, performance tracking, and payroll —
            all in one powerful, unified platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              className="btn-gold group min-w-[160px]"
              size="xl"
              onClick={() => navigate('/auth')}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              className="btn-gold-outline min-w-[160px]"
              size="xl"
              onClick={() => navigate('/apply')}
            >
              Apply now
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Ambassador Management"
              description="Track referrals, verify payments, and manage incentives"
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Employee Tracking"
              description="Performance reviews, attendance, and salary management"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Role-Based Access"
              description="Owner, Admin, and Ambassador portals with secure access"
            />
          </div>
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
  <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto group-hover:scale-110 transition-transform border border-primary/20">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">{description}</p>
  </div>
);
