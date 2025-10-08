import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Heart } from "lucide-react";

const AffiliateSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
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
            <span className="text-gradient-gold">Mes recommandations</span>
            <br />
            <span className="text-foreground">pour vous</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Découvrez ma sélection de livres et ressources qui ont transformé ma vie. 
            Des ouvrages soigneusement choisis pour vous accompagner dans votre parcours.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-xl bg-card border border-border">
              <BookOpen className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Livres inspirants</h3>
              <p className="text-sm text-muted-foreground">
                Les meilleurs ouvrages pour votre développement
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <Heart className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Testés & approuvés</h3>
              <p className="text-sm text-muted-foreground">
                Chaque recommandation est personnellement vérifiée
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <Sparkles className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Impact garanti</h3>
              <p className="text-sm text-muted-foreground">
                Des ressources qui font vraiment la différence
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="affiliate" size="lg" className="min-w-[200px]">
              Voir sur Amazon
            </Button>
            <Button variant="affiliate" size="lg" className="min-w-[200px]">
              Voir sur Fnac
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateSection;
