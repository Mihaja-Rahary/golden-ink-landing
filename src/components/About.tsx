const About = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-card/50" />
      <div className="container relative z-10 mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-in-up">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient-gold">À propos</span> de ce livre
          </h2>

          {/* Description */}
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Ce livre n'est pas qu'un simple guide. C'est une invitation à transformer 
              votre façon de penser, d'agir et de réussir. À travers des conseils pratiques 
              et des histoires inspirantes, vous découvrirez comment atteindre vos objectifs 
              les plus ambitieux.
            </p>
            
            <p className="text-foreground font-medium italic">
              "Chaque page est une étape vers votre meilleure version."
            </p>

            <p>
              Que vous soyez débutant ou déjà engagé dans votre parcours, 
              ce livre vous accompagnera avec bienveillance et efficacité.
            </p>
          </div>

          {/* Featured Quote */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-card to-secondary border border-primary/20">
            <blockquote className="text-2xl md:text-3xl font-semibold text-foreground">
              "La réussite commence par une décision."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
