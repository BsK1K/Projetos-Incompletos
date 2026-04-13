import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleCategories from "@/components/VehicleCategories";
import VIPSection from "@/components/VIPSection";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <VehicleCategories />
      <VIPSection />
      <Testimonials />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
