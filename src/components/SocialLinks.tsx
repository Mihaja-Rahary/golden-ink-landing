import { Button } from "@/components/ui/button";
import { Instagram, Send, ShoppingBag, BookOpen } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "#",
    description: "Suivez-moi pour plus de contenu",
  },
  {
    name: "Telegram",
    icon: Send,
    url: "#",
    description: "Rejoignez la communauté",
  },
  {
    name: "Amazon",
    icon: ShoppingBag,
    url: "#",
    description: "Mes recommandations",
  },
  {
    name: "Fnac",
    icon: BookOpen,
    url: "#",
    description: "Découvrez mes livres",
  },
];

const SocialLinks = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-12 animate-fade-in-up">
          {/* Section Title */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient-gold">Restons</span> connectés
            </h2>
            <p className="text-xl text-muted-foreground">
              Rejoignez-moi sur mes différentes plateformes
            </p>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
