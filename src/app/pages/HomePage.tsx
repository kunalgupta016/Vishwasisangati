import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { VisionMission } from "../components/VisionMission";
import { ImpactStats } from "../components/ImpactStats";
import { ImpactStories } from "../components/ImpactStories";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <VisionMission />
      <ImpactStats />
      <ImpactStories />
      <Footer />
    </div>
  );
}
