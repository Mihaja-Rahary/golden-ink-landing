import { Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="text-center space-y-6">
            {/* Logo/Brand */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gradient-gold">
                1 Livre par Jour
              </h3>
              <p className="text-muted-foreground">
                Chaque livre est une porte vers une nouvelle idée 📖
              </p>
            </div>

            {/* Contact */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@monebook.com" className="hover:underline">
                contact@monebook.com
              </a>
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-border mx-auto" />

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                CGV
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span>© {new Date().getFullYear()} 1 Livre par Jour. Créé avec passion</span>
              <Heart className="w-4 h-4 text-primary fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </footer>
  );
};

export default Footer;
