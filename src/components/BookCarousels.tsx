import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShoppingCart } from "lucide-react";

const bookCategories = [
  {
    title: "Développement Personnel",
    books: [
      { title: "Les 7 habitudes de ceux qui réussissent", author: "Stephen Covey" },
      { title: "Pouvoir illimité", author: "Tony Robbins" },
      { title: "L'art subtil de s'en foutre", author: "Mark Manson" },
      { title: "Réfléchissez et devenez riche", author: "Napoleon Hill" },
      { title: "Atomic Habits", author: "James Clear" },
    ],
  },
  {
    title: "Business & Mindset",
    books: [
      { title: "Père riche, père pauvre", author: "Robert Kiyosaki" },
      { title: "The One Thing", author: "Gary Keller" },
      { title: "La semaine de 4 heures", author: "Tim Ferriss" },
      { title: "Zero to One", author: "Peter Thiel" },
      { title: "Deep Work", author: "Cal Newport" },
    ],
  },
  {
    title: "Spiritualité & Philosophie",
    books: [
      { title: "Le moine qui vendit sa Ferrari", author: "Robin Sharma" },
      { title: "Méditations", author: "Marc Aurèle" },
      { title: "Les quatre accords toltèques", author: "Don Miguel Ruiz" },
      { title: "Le pouvoir du moment présent", author: "Eckhart Tolle" },
      { title: "L'Alchimiste", author: "Paulo Coelho" },
    ],
  },
  {
    title: "Biographies & Histoires vraies",
    books: [
      { title: "Steve Jobs", author: "Walter Isaacson" },
      { title: "Shoe Dog", author: "Phil Knight" },
      { title: "Becoming", author: "Michelle Obama" },
      { title: "Elon Musk", author: "Ashlee Vance" },
      { title: "Long Walk to Freedom", author: "Nelson Mandela" },
    ],
  },
];

const BookCarousels = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-16 animate-fade-in-up">
          {/* Section Title */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient-gold">Les livres</span> que je recommande 💛
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore mes sélections classées par thèmes — clique sur chaque couverture pour découvrir ou acheter le livre.
            </p>
          </div>

          {/* Carousels by Category */}
          {bookCategories.map((category, index) => (
            <div key={category.title} className="space-y-6" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {category.title}
              </h3>
              
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {category.books.map((book) => (
                    <CarouselItem key={book.title} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="group p-6 bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        {/* Book Cover Placeholder */}
                        <div className="aspect-[3/4] mb-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                          <div className="text-center p-4">
                            <p className="text-sm font-semibold text-primary">📖</p>
                          </div>
                        </div>
                        
                        {/* Book Info */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {book.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {book.author}
                          </p>
                          
                          {/* CTA Buttons */}
                          <div className="flex flex-col gap-2 pt-2">
                            <Button variant="affiliate" size="sm" className="w-full">
                              <ShoppingCart className="w-4 h-4" />
                              Amazon
                            </Button>
                            <Button variant="affiliate" size="sm" className="w-full">
                              <ShoppingCart className="w-4 h-4" />
                              Fnac
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookCarousels;
