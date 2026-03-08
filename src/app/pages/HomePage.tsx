import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { VisionMission } from "../components/VisionMission";
import { OurWork } from "../components/OurWork";
import { ImpactStats } from "../components/ImpactStats";
import { ImpactStories } from "../components/ImpactStories";
import { FeaturedProject } from "../components/FeaturedProject";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <VisionMission />
      <OurWork />
      <ImpactStats />
      <FeaturedProject />
      <ImpactStories limit={2} showViewAll={true} />
      <Testimonials />
      <Footer />
    </div>
  );
}
