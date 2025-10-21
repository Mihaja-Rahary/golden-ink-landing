import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Instagram, Send, ShoppingBag, BookOpen, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Instagram,
  Send,
  ShoppingBag,
  BookOpen,
};

interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
  description: string;
}

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState({
    title: "Découvre mes plateformes 📱",
    subtitle: "Rejoins-moi pour du contenu quotidien et mes recommandations",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: links } = await supabase
      .from("social_links")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (links) setSocialLinks(links);

    const { data: settingsData } = await supabase
      .from("site_settings")
      .select("setting_key, setting_value")
      .in("setting_key", ["social_section_title", "social_section_subtitle"]);

    if (settingsData) {
      const settingsMap: any = {};
      settingsData.forEach((item) => {
        const key = item.setting_key.replace("social_section_", "");
        settingsMap[key] = item.setting_value;
      });
      setSettings((prev) => ({ ...prev, ...settingsMap }));
    }
  };
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-12 animate-fade-in-up">
          {/* Section Title */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient-gold">{settings.title}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {settings.subtitle}
            </p>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                      {iconMap[link.icon] && 
                        (() => {
                          const Icon = iconMap[link.icon];
                          return <Icon className="w-6 h-6 text-primary" />;
                        })()
                      }
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
