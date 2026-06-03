import { ArrowRight, BookOpen, Stethoscope, Users, Sparkles, Heart, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { apiClient } from "../../utils/api/client";
import { createProgramSlug } from "../../utils/programs";

const iconMap: Record<string, any> = {
  BookOpen, Stethoscope, Users, Sparkles, Heart, GraduationCap
};

const defaultContent = {
  sectionSubtitle: "Core Initiatives",
  sectionTitle: "Our Work",
  sectionDescription: "We focus on three key areas to create meaningful and lasting impact in communities",
  programs: [
    {
      title: "Education Program",
      description: "Providing quality education through 27 evening tuition centers and 2 educational institutions, enrolling 610+ children and supporting 415 students in schools.",
      image: "https://images.unsplash.com/photo-1771765780945-c788a6ce4b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjaGlsZHJlbiUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3MjcxMTY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "GraduationCap",
      stats: "610+ Children",
      color: "#0F6B6B",
      fullDescription: "Our education initiative supports children through evening tuition centers, school support, and community-based learning spaces. The program focuses on foundational literacy, consistent attendance, mentoring, and helping first-generation learners continue their education with confidence.",
      highlights: ["27 evening tuition centers", "2 educational institutions", "610+ children enrolled", "415 students supported in schools"]
    },
    {
      title: "Healthcare Initiative",
      description: "Delivering essential healthcare through 10 Primary Health Centers, medical camps across 36 villages, and distributing 12,000+ vitamin tablets across 6 states.",
      image: "https://images.unsplash.com/photo-1710074213374-e68503a1b795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGNsaW5pYyUyMEluZGlhfGVufDF8fHx8MTc3MjcxMTY1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "Stethoscope",
      stats: "19,389 Visits",
      color: "#E87D3E",
      fullDescription: "The healthcare initiative brings essential care closer to underserved communities through primary health centers, medical camps, nutrition support, and preventive health awareness. It is designed to reduce distance, cost, and uncertainty for families seeking basic care.",
      highlights: ["10 Primary Health Centers", "Medical camps across 36 villages", "19,389 healthcare visits", "12,000+ vitamin tablets distributed"]
    },
    {
      title: "Community Development",
      description: "Empowering 62 communities through relief & rehabilitation, women's skill training for 465+ women, and tribal education programs for Chenchu tribal children.",
      image: "https://images.unsplash.com/photo-1769366056117-e1c3dceee209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkZXZlbG9wbWVudCUyMHJ1cmFsJTIwdmlsbGFnZXxlbnwxfHx8fDE3NzI3MTE2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: "Users",
      stats: "62 Communities",
      color: "#0F6B6B",
      fullDescription: "Our community development work strengthens local capacity through relief and rehabilitation, women's skill training, tribal education support, and livelihood-focused programs. The goal is community-owned change that continues beyond direct intervention.",
      highlights: ["62 communities supported", "465+ women trained", "Relief and rehabilitation programs", "Tribal education support for Chenchu children"]
    }
  ]
};

export function OurWork() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await apiClient.getOurWork();
        setContent({ ...defaultContent, ...((response.data as any) || {}) });
      } catch (error) {
        console.error("Failed to load our-work content:", error);
        setContent(defaultContent);
      }
    }
    loadContent();
  }, []);

  if (!content) return (
    <section id="initiatives" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
            <div className="h-10 w-48 bg-gray-200 rounded mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-80 bg-gray-100 rounded-3xl"></div>)}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section id="initiatives" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F6B6B]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E87D3E]/5 rounded-full blur-3xl"></div>

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

        <div className="grid md:grid-cols-3 gap-8">
          {content.programs.map((program: any, index: number) => {
            const IconComponent = iconMap[program.icon] || GraduationCap;
            return (
              <Link
                key={index}
                to={`/initiatives/${createProgramSlug(program.slug || program.title, `program-${index + 1}`)}`}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#0F6B6B]/30 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"></div>
                  
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4">
                    <div className="p-4 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: `${program.color}CC` }}>
                      <IconComponent size={36} className="text-white" />
                    </div>
                  </div>

                  {/* Stats badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-bold" style={{ color: program.color }}>{program.stats}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0F6B6B] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{program.description}</p>
                  <span className="group/btn inline-flex items-center gap-2 text-[#0F6B6B] font-semibold group-hover:gap-3 transition-all duration-200">
                    <span>Learn More</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
