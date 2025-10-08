import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";
import { useState } from "react";

const EbookSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Email submitted:", email);
    setEmail("");
  };

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
              <BookOpen className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient-gold">Ton ebook offert</span> 📚
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reçois gratuitement mon ebook exclusif contenant les résumés de tous les livres que je présente sur mes réseaux. 
            Un guide simple pour savoir lesquels acheter en priorité.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ton adresse email"
                required
                className="flex-1 px-6 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <Button type="submit" variant="hero" size="lg" className="sm:min-w-[180px]">
                <Download className="w-4 h-4" />
                Je le veux !
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EbookSection;
