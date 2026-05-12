import { Users, Heart, GraduationCap, Home, BookOpen, Stethoscope, Baby, School, Pill, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/api/client";

const iconMap: Record<string, any> = {
  Users, Heart, GraduationCap, Home, BookOpen, Stethoscope, Baby, School, Pill, Activity
};

export function ImpactStats() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await apiClient.getImpactStats();
        if (response.data && (response.data as any[]).length > 0) {
          setStats(response.data as any[]);
        } else {
          setStats([
            { icon: "Users", number: "62", label: "Communities supported", sublabel: "Relief & rehabilitation programs", color: "#0F6B6B", gradient: "from-[#0F6B6B] to-[#0d5757]" },
            { icon: "Heart", number: "465", label: "Women trained", sublabel: "Skill development programs", color: "#E87D3E", gradient: "from-[#E87D3E] to-[#d66d30]" },
            { icon: "GraduationCap", number: "15,876", label: "Nutrition meals provided", sublabel: "Poshan Maa Initiative", color: "#0F6B6B", gradient: "from-[#0F6B6B] to-[#0d5757]" },
            { icon: "BookOpen", number: "610", label: "Children enrolled", sublabel: "27 evening tuition centers", color: "#E87D3E", gradient: "from-[#E87D3E] to-[#d66d30]" },
            { icon: "School", number: "415", label: "Students in schools", sublabel: "2 educational institutions", color: "#0F6B6B", gradient: "from-[#0F6B6B] to-[#0d5757]" },
            { icon: "BookOpen", number: "68", label: "Adults learning", sublabel: "Adult literacy centers", color: "#E87D3E", gradient: "from-[#E87D3E] to-[#d66d30]" },
            { icon: "Baby", number: "194", label: "Children in care", sublabel: "Childcare centers", color: "#0F6B6B", gradient: "from-[#0F6B6B] to-[#0d5757]" },
            { icon: "Home", number: "552", label: "Tribal children", sublabel: "Chenchu tribal tuition centers", color: "#E87D3E", gradient: "from-[#E87D3E] to-[#d66d30]" },
            { icon: "Pill", number: "12,000", label: "Vitamin tablets", sublabel: "Distributed across 6 states", color: "#0F6B6B", gradient: "from-[#0F6B6B] to-[#0d5757]" },
            { icon: "Stethoscope", number: "3,779", label: "Patients treated", sublabel: "36 villages through medical camps", color: "#E87D3E", gradient: "from-[#E87D3E] to-[#d66d30]" },
            { icon: "Activity", number: "19,389", label: "Healthcare visits", sublabel: "10 Primary Health Centers", color: "#0F6B6B", gradient: "from-[#0F6B6B] to-[#0d5757]" }
          ]);
        }
      } catch (error) {
        console.error("Failed to load impact stats:", error);
      }
    }
    loadStats();
  }, []);

  return (
    <section id="stats" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0F6B6B]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E87D3E]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#E87D3E] font-semibold mb-3 uppercase tracking-wider">Real Impact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Impact — 2024-2025
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable change across communities, powered by compassion and commitment
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-all duration-300 bg-gradient-to-br ${stat.gradient} group-hover:scale-110`}>
                  {(() => {
                    const IconComponent = iconMap[stat.icon] || Users;
                    return <IconComponent size={28} className="text-white" />;
                  })()}
                </div>

                {/* Number */}
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </h3>

                {/* Label */}
                <p className="font-semibold text-gray-900 mb-1">
                  {stat.label}
                </p>

                {/* Sublabel */}
                <p className="text-sm text-gray-600 leading-snug">
                  {stat.sublabel}
                </p>

                {/* Progress indicator */}
                <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-700 group-hover:w-full`}
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-[#0F6B6B] to-[#0d5757] rounded-3xl p-8 md:p-10 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold">Want to be part of this change?</h3>
            <p className="text-white/90 max-w-2xl">
              Every contribution makes a difference. Join us in our mission to transform lives and build stronger communities.
            </p>
            <button className="flex items-center gap-2 bg-[#E87D3E] text-white px-8 py-4 rounded-full hover:bg-[#d66d30] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mt-4">
              <Heart size={20} />
              <span className="font-semibold">Support Our Cause</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
