import { Button } from "@/components/ui/button";
import { Sparkles, Instagram } from "lucide-react";

const DailyBook = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-in-up">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 animate-glow">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient-gold">Le livre du jour</span> 🌟
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Chaque jour, je partage sur mes réseaux un résumé ou une idée clé tirée d'un livre inspirant. 
            Rejoins-moi pour une dose quotidienne de savoir et de motivation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="social" size="lg" className="min-w-[240px]">
              <Instagram className="w-5 h-5" />
              Voir sur Instagram
            </Button>
            <Button variant="social" size="lg" className="min-w-[240px]">
              📱 Voir sur TikTok
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyBook;
