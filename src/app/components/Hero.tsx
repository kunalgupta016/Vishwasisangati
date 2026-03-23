import { ArrowRight, Heart, Users, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { ContactFormDialog } from "./ContactFormDialog";
import { toast } from "sonner";
import { apiClient } from "../../utils/api/client";

const defaultHero = {
  badge: "Transforming Lives Since 2009",
  title: "Serving Hope To",
  highlightText: "Rural Communities",
  subtitle: "of India",
  description: "Empowering vulnerable communities through education, healthcare, and sustainable development. Together, we're building a brighter future.",
  mainImage: "https://images.unsplash.com/photo-1759738098462-90ffac98c554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBydXJhbCUyMGRldmVsb3BtZW50JTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjcxMjI5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  backgroundImage: "https://images.unsplash.com/photo-1761365361648-3968a6b588a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMEluZGlhbiUyMGNoaWxkcmVuJTIwcGxheWluZyUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyNzEyMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
};

export function Hero() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [content, setContent] = useState(defaultHero);

  useEffect(() => {
    async function loadHeroContent() {
      try {
        const response = await apiClient.getHeroContent();
        if (response.data) {
          const data = { ...defaultHero, ...(response.data as any) };
          const timestamp = (response as any).updatedAt ? new Date((response as any).updatedAt).getTime() : Date.now();
          
          if (data.mainImage) {
            const separator = data.mainImage.includes('?') ? '&' : '?';
            data.mainImage = `${data.mainImage}${separator}t=${timestamp}`;
          }
          if (data.backgroundImage) {
            const separator = data.backgroundImage.includes('?') ? '&' : '?';
            data.backgroundImage = `${data.backgroundImage}${separator}t=${timestamp}`;
          }
          
          setContent(data);
        }
      } catch (error) {
        console.error("Failed to load hero content:", error);
      }
    }
    loadHeroContent();
  }, []);

  const handleExploreWork = () => {
    const storiesSection = document.getElementById('stories');
    if (storiesSection) {
      storiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDonateNow = () => {
    setIsContactFormOpen(true);
    toast.info('Contact us to learn more about donation options');
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0F6B6B] via-[#0d5757] to-[#0a4545]">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={content.backgroundImage}
            alt="Happy children"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F6B6B]/95 via-[#0F6B6B]/85 to-[#0F6B6B]/70"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm">
                <div className="w-2 h-2 bg-[#E87D3E] rounded-full animate-pulse"></div>
                <span>{content.badge}</span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {content.title}
                <span className="block text-[#E87D3E] mt-2">{content.highlightText}</span>
                <span className="block mt-2">{content.subtitle || "of India"}</span>
              </h1>

              {/* Description */}
              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                {content.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleExploreWork}
                  className="group flex items-center justify-center gap-3 bg-white text-[#0F6B6B] px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span className="font-semibold text-lg">Explore Our Work</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button 
                  onClick={handleDonateNow}
                  className="flex items-center justify-center gap-3 bg-[#E87D3E] text-white px-8 py-4 rounded-full hover:bg-[#d66d30] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <Heart size={20} />
                  <span className="font-semibold text-lg">Donate Now</span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Users className="text-[#E87D3E]" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">2,500+</p>
                    <p className="text-sm text-white/70">Volunteers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Heart className="text-[#E87D3E]" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">50,000+</p>
                    <p className="text-sm text-white/70">Lives Impacted</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <TrendingUp className="text-[#E87D3E]" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">15+</p>
                    <p className="text-sm text-white/70">Years Service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Card */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 backdrop-blur-sm">
                <img
                  src={content.mainImage}
                  alt="Community development"
                  className="w-full h-[600px] object-cover"
                />
                {/* Floating achievement badge */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <p className="text-sm text-gray-600 mb-2">Current Focus</p>
                  <p className="text-lg font-bold text-gray-900">Empowering 62 Communities</p>
                  <p className="text-sm text-gray-600 mt-2">Through relief and rehabilitation programs</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#E87D3E] rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-white rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <p className="text-sm">Scroll to explore</p>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Contact Form Dialog */}
      <ContactFormDialog 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  );
}