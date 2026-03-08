import { ArrowRight, BookOpen, Stethoscope, Users, Sparkles, Heart, GraduationCap } from "lucide-react";

export function OurWork() {
  const programs = [
    {
      title: "Education Program",
      description: "Providing quality education through 27 evening tuition centers and 2 educational institutions, enrolling 610+ children and supporting 415 students in schools.",
      image: "https://images.unsplash.com/photo-1771765780945-c788a6ce4b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjaGlsZHJlbiUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3MjcxMTY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: GraduationCap,
      stats: "610+ Children",
      color: "#0F6B6B"
    },
    {
      title: "Healthcare Initiative",
      description: "Delivering essential healthcare through 10 Primary Health Centers, medical camps across 36 villages, and distributing 12,000+ vitamin tablets across 6 states.",
      image: "https://images.unsplash.com/photo-1710074213374-e68503a1b795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGNsaW5pYyUyMEluZGlhfGVufDF8fHx8MTc3MjcxMTY1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Stethoscope,
      stats: "19,389 Visits",
      color: "#E87D3E"
    },
    {
      title: "Community Development",
      description: "Empowering 62 communities through relief & rehabilitation, women's skill training for 465+ women, and tribal education programs for Chenchu tribal children.",
      image: "https://images.unsplash.com/photo-1769366056117-e1c3dceee209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkZXZlbG9wbWVudCUyMHJ1cmFsJTIwdmlsbGFnZXxlbnwxfHx8fDE3NzI3MTE2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Users,
      stats: "62 Communities",
      color: "#0F6B6B"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F6B6B]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E87D3E]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#E87D3E] font-semibold mb-3 uppercase tracking-wider">Core Initiatives</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We focus on three key areas to create meaningful and lasting impact in communities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
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
                  <div className="p-3 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: `${program.color}CC` }}>
                    <program.icon size={24} className="text-white" />
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
                <button className="group/btn inline-flex items-center gap-2 text-[#0F6B6B] font-semibold hover:gap-3 transition-all duration-200">
                  <span>Learn More</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
