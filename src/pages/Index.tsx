import Hero from "@/components/Hero";
import About from "@/components/About";
import SocialLinks from "@/components/SocialLinks";
import AffiliateSection from "@/components/AffiliateSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <SocialLinks />
      <AffiliateSection />
      <Footer />
    </div>
  );
};

export default Index;
