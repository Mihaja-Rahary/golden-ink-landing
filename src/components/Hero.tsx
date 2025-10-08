import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import ebookCover from "@/assets/ebook-cover.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
      
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Ebook Cover */}
          <div className="flex justify-center mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-3xl animate-glow" />
              <img
                src={ebookCover}
                alt="Couverture de l'ebook"
                className="relative w-64 md:w-80 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-gradient-gold">Un livre par jour</span>
            <br />
            <span className="text-foreground">pour t'inspirer 📖</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Chaque jour, découvre un résumé, une idée ou une anecdote tirée d'un livre marquant.
          </p>

          {/* Intro text */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Parce qu'un bon livre peut changer ta vision du monde. Découvre mes sélections quotidiennes et explore l'univers de la lecture autrement.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center pt-8">
            <Button variant="hero" size="lg" className="min-w-[250px]">
              Télécharger mon ebook gratuit
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
