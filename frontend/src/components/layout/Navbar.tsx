import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
              <img src="/dominova_logo.png" alt="Dominova" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">Dominova</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#roles">Roles</NavLink>
            <NavLink href="/apply">Apply</NavLink>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-white/5 transition-all duration-300"
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
            <Button
              className="btn-gold"
              size="sm"
              onClick={() => navigate('/auth?tab=signup')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-fade-in bg-background/95 backdrop-blur-xl absolute left-0 right-0 px-6 shadow-2xl">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-muted-foreground hover:text-primary py-2 transition-colors">
                Features
              </a>
              <a href="#roles" className="text-muted-foreground hover:text-primary py-2 transition-colors">
                Roles
              </a>
              <Link to="/apply" className="text-muted-foreground hover:text-primary py-2 transition-colors">
                Apply
              </Link>
              <div className="pt-4 flex flex-col gap-3">
                <Button
                  variant="ghost"
                  className="text-white w-full justify-center hover:bg-white/5"
                  onClick={() => navigate('/auth')}
                >
                  Login
                </Button>
                <Button
                  className="btn-gold w-full"
                  onClick={() => navigate('/auth?tab=signup')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
  </a>
);
