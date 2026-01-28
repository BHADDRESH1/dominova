import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <img src="/dominova_logo.png" alt="Dominova" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Dominova
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link to="/policies" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Policies
            </Link>
            <Link to="/terms" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Privacy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} Dominova. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
