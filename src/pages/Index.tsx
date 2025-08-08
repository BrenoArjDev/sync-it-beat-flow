import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MusicNewsSection } from "@/components/MusicNewsSection";
import { FavoritesSection } from "@/components/FavoritesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CommunitySection } from "@/components/CommunitySection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Footer } from "@/components/Footer";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { useState } from "react";

const Index = () => {
  const [isMusicPlayerExpanded, setIsMusicPlayerExpanded] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* <Hero /> */}
      <MusicNewsSection />
      <FavoritesSection />
      <FeaturesSection />
      <CommunitySection />
      <Footer />
      <MusicPlayer onExpandChange={setIsMusicPlayerExpanded} />
      {!isMusicPlayerExpanded && <ScrollToTopButton />}
    </div>
  );
};

export default Index;
