import { ArrowRight, MapPin, Users, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { ContactFormDialog } from "./ContactFormDialog";

export function FeaturedProject() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#0F6B6B]/5 rounded-full blur-3xl -translate-x-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#E87D3E] font-semibold mb-3 uppercase tracking-wider">Spotlight</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Project
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our flagship initiative making a tangible difference
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-80 md:h-auto min-h-[400px] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1733809701005-0b1c0ad53c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwcHJvamVjdCUyMGhlbHBpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzcyNzExNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Featured project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F6B6B]/30 to-transparent"></div>
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-[#E87D3E] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <Sparkles size={16} />
                  Featured Project
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Poshan Maa — Nutrition Initiative
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our flagship nutrition program providing balanced meals to children and mothers 
                  across rural communities. Through Poshan Maa, we've served over 15,876 nutrition 
                  meals, combating malnutrition and ensuring healthy growth for the next generation. 
                  This initiative spans across multiple states, reaching the most vulnerable families.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2 bg-[#0F6B6B]/10 px-4 py-2 rounded-full">
                    <MapPin size={16} className="text-[#0F6B6B]" />
                    <span className="text-sm font-medium text-[#0F6B6B]">6 States</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#E87D3E]/10 px-4 py-2 rounded-full">
                    <Users size={16} className="text-[#E87D3E]" />
                    <span className="text-sm font-medium text-[#E87D3E]">15,876+ Meals</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0F6B6B]/10 px-4 py-2 rounded-full">
                    <Heart size={16} className="text-[#0F6B6B]" />
                    <span className="text-sm font-medium text-[#0F6B6B]">194 Children in Care</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsContactFormOpen(true)}
                  className="group self-start flex items-center gap-3 bg-[#0F6B6B] text-white px-8 py-4 rounded-full hover:bg-[#0d5757] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span className="font-semibold text-lg">Support This Project</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFormDialog 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  );
}
