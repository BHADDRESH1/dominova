import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Subtle Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border-primary/20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your <span className="text-primary">Operations?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join hundreds of organizations streamlining their ambassador programs
            and employee management with our unified platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="btn-gold group min-w-[160px]"
              size="xl"
              onClick={() => navigate('/auth')}
            >
              Login to Dashboard
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              className="btn-gold-outline min-w-[160px]"
              size="xl"
              onClick={() => window.open('https://forms.gle/zJyGchFfavVBmQ3D7', '_blank')}
            >
              Apply as Ambassador
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
