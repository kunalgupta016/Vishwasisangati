import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ImpactStories } from "../components/ImpactStories";

export default function AllStoriesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-gray-50 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          All Impact Stories
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Discover the profound transformations our community members have experienced through Vishwasi Sangati.
        </p>
      </div>
      <ImpactStories showViewAll={false} />
      <Footer />
    </div>
  );
}
