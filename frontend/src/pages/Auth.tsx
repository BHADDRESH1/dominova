import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Mock credentials for testing
  const MOCK_CREDENTIALS = {
    "owner@dominova.com": { password: "owner123", role: "owner", path: "/dashboard/owner" },
    "admin@dominova.com": { password: "admin123", role: "admin", path: "/dashboard/admin" },
    "ambassador@dominova.com": { password: "ambassador123", role: "ambassador", path: "/dashboard/ambassador" },
    "employee@dominova.com": { password: "employee123", role: "employee", path: "/dashboard/employee" },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);

      const user = MOCK_CREDENTIALS[loginEmail as keyof typeof MOCK_CREDENTIALS];

      if (user && user.password === loginPassword) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.role}!`,
        });
        // Save role to localStorage for role-based access
        localStorage.setItem("userRole", user.role);
        navigate(user.path);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Please check your email and password.",
        });
      }
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual signup with Supabase
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Authentication Required",
        description: "Please set up the database to enable signup functionality.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations - Subtle Gold Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="glass-card animate-slide-up border-white/5">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img src="/dominova_logo.png" alt="Dominova" className="w-full h-full object-contain relative z-10" />
            </div>
            <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your workspace
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50 border border-white/5">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="animate-fade-in">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-muted-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="admin@dominova.com"
                        className="pl-10 bg-secondary/50 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" >Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-secondary/50 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-gold" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="animate-fade-in">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 bg-secondary/50 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 bg-secondary/50 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-secondary/50 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                  </p>

                  <Button type="submit" className="w-full btn-gold" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
