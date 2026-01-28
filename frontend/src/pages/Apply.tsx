import { ExternalLink, GraduationCap, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Apply = () => {
  const benefits = [
    "Earn incentives for every successful referral",
    "Gain real-world marketing experience",
    "Build your professional network",
    "Flexible work schedule",
    "Certificate of completion",
    "Letter of recommendation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-ambassador/60 flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-ambassador/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-info/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="border-0 shadow-2xl animate-slide-up">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-2xl bg-ambassador mx-auto mb-4 flex items-center justify-center">
              <GraduationCap className="w-9 h-9 text-ambassador-foreground" />
            </div>
            <CardTitle className="text-3xl">Become a Campus Ambassador</CardTitle>
            <CardDescription className="text-base">
              Join our network of student leaders and earn while you learn
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Benefits */}
            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">What You'll Get</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-ambassador shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Requirements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Currently enrolled in a college or university</li>
                <li>• Strong communication and networking skills</li>
                <li>• Active presence on social media platforms</li>
                <li>• Minimum commitment of 10 hours per week</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4 space-y-4">
              <Button 
                variant="ambassador" 
                size="xl" 
                className="w-full group"
                onClick={() => window.open('https://forms.gle/zJyGchFfavVBmQ3D7', '_blank')}
              >
                Apply Now
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                You'll be redirected to our application form
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Apply;
