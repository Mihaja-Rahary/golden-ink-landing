import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EbookSection from "@/components/EbookSection";
import BookCarousels from "@/components/BookCarousels";
import DailyBook from "@/components/DailyBook";
import Newsletter from "@/components/Newsletter";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <EbookSection />
      <BookCarousels />
      <DailyBook />
      <Newsletter />
      <SocialLinks />
      <Footer />
    </div>
  );
};

export default Index;
