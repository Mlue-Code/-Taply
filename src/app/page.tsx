import Navbar from "../components/layout/Navbar";
import HomeDecorations from "../components/home/HomeDecorations";
import HeroSection from "../components/home/HeroSection";
import FeatureGrid from "../components/home/FeatureGrid";
import HowItWorksSection from "../components/home/HowItWorksSection";
import SectionDecorations from "../components/home/SectionDecorations";
import CtaSection from "../components/home/CtaSection";
import SiteFooter from "../components/home/SiteFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-base text-text-primary">
      <HomeDecorations />
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <HowItWorksSection />
      <SectionDecorations />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
