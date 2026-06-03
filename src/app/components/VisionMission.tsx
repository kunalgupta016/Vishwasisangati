import { Target, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/api/client";

const defaultContent = {
  sectionSubtitle: "Who We Are",
  sectionTitle: "Our Vision & Mission",
  sectionDescription: "Driven by compassion, guided by purpose",
  visionText: "A resilient India where every child, woman, and family lives with dignity, opportunity, and hope for a brighter tomorrow.",
  missionParagraph1: "To alleviate poverty and uplift vulnerable rural communities by providing access to education, healthcare, and sustainable livelihoods.",
  missionParagraph2: "Through women's empowerment, youth engagement, and community-led initiatives, we nurture people-driven change that is owned, sustained, and carried forward by the communities themselves.",
  missionHighlight: "From schools and childcare centers to medical camps, sewing workshops, and nutrition campaigns—we equip every child, woman, and family with the tools to live with dignity.",
  coreValues: [
    { label: "Compassion", emoji: "❤️" },
    { label: "Integrity", emoji: "🤝" },
    { label: "Empowerment", emoji: "💪" },
    { label: "Sustainability", emoji: "🌱" }
  ]
};

export function VisionMission() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await apiClient.getVisionMission();
        setContent({ ...defaultContent, ...((response.data as any) || {}) });
      } catch (error) {
        console.error("Failed to load vision-mission content:", error);
        setContent(defaultContent);
      }
    }
    loadContent();
  }, []);

  if (!content) return null;

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F6B6B] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E87D3E] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#E87D3E] font-semibold mb-3 uppercase tracking-wider">{content.sectionSubtitle}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.sectionDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="group relative bg-gradient-to-br from-[#0F6B6B] to-[#0d5757] rounded-3xl p-8 md:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Eye size={32} className="text-[#E87D3E]" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                {content.visionText}
              </p>
              {/* Decorative line */}
              <div className="mt-6 h-1 w-20 bg-[#E87D3E] rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group relative bg-white border-2 border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#E87D3E]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#E87D3E]/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0F6B6B]/10 rounded-2xl mb-6">
                <Target size={32} className="text-[#0F6B6B]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  {content.missionParagraph1}
                </p>
                <p className="text-lg">
                  {content.missionParagraph2}
                </p>
                <p className="text-lg font-medium text-[#0F6B6B]">
                  {content.missionHighlight}
                </p>
              </div>
              {/* Decorative line */}
              <div className="mt-6 h-1 w-20 bg-[#E87D3E] rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {content.coreValues.map((value: any, index: number) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-[#0F6B6B] transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-4xl mb-3">{value.emoji}</div>
              <p className="font-semibold text-gray-900">{value.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
