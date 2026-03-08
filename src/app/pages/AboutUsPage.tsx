import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/api/client";

export default function AboutUsPage() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await apiClient.getAboutUs();
        if (response.data) {
          setContent(response.data);
        } else {
           // Fallback in case of an error loading
          setContent({
            paragraph1: "At Vishwasi Sangati, we believe in people-driven change. Rooted in India since 1994, we work hand-in-hand with the unreached rural communities to alleviate poverty through education, health, and empowerment initiatives for the vulnerable.",
            paragraph2: "From schools and childcare centers to medical camps, sewing workshops, and nutrition campaigns, our mission is simple yet powerful: to equip every child, woman, and family with the tools to live with dignity.",
            quote: "Vishwasi Sangati is a community-led, grassroots organisation founded by a group of pioneers like Late Dr. Emil Jebasingh, Mr. P. Selvaraj and others with a shared vision—to uplift vulnerable rural communities across India.",
            paragraph3: "By empowering youth, women, and local groups, we not only bring development to the doorstep, but ensure it is owned, sustained, and carried forward by the community itself.",
            conclusion: "Through engagement, education, and empathy, we are working together to build a stronger, more resilient India.",
            image: "https://images.unsplash.com/photo-1761365361648-3968a6b588a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMEluZGlhbiUyMGNoaWxkcmVuJTIwcGxheWluZyUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyNzEyMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          });
        }
      } catch (error) {
        console.error("Failed to load about us content:", error);
      }
    }
    loadContent();
  }, []);

  if (!content) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E87D3E] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F6B6B] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#E87D3E] font-bold tracking-widest uppercase mb-3 text-sm">Our Story</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              About Vishwasi Sangati
            </h1>
            <div className="w-24 h-1 bg-[#0F6B6B] mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0F6B6B] to-[#E87D3E] opacity-20 group-hover:opacity-40 rounded-3xl blur-xl transition-all duration-500"></div>
              <img 
                src={content.image}
                alt="Community members of Vishwasi Sangati" 
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px] transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-gray-100">
                <p className="text-[#E87D3E] font-bold text-4xl mb-1">1994</p>
                <p className="text-gray-600 font-medium tracking-wide text-sm uppercase">Established Since</p>
              </div>
            </div>

            {/* Text Side */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
              <p className="text-xl font-medium text-gray-900 border-l-4 border-[#0F6B6B] pl-4">
                {content.paragraph1}
              </p>
              
              <p>
                {content.paragraph2}
              </p>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner my-8">
                <p className="text-base text-gray-800 italic">
                  {content.quote}
                </p>
              </div>
              
              <p>
                {content.paragraph3}
              </p>
              
              <p className="text-[#0F6B6B] font-medium text-xl mt-4">
                {content.conclusion}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
