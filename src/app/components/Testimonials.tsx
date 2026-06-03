import { Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/api/client";

const defaultContent = {
  sectionSubtitle: "Testimonials",
  sectionTitle: "What People Say",
  sectionDescription: "Hear from our volunteers and community members about their experiences",
  testimonials: [
    {
      quote: "Volunteering with Vishwasi Sangati has been the most rewarding experience of my life. Seeing the direct impact of our work in communities is truly inspiring.",
      name: "Priya Sharma",
      role: "Volunteer since 2023",
      image: "https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NzI3MTA2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    },
    {
      quote: "The education program has transformed our village. Children now have access to quality learning resources and a brighter future ahead.",
      name: "Rajesh Kumar",
      role: "Community Leader",
      image: "https://images.unsplash.com/photo-1769636930047-4478f12cf430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzI3MDExNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    },
    {
      quote: "Being part of the healthcare initiative has allowed me to contribute my medical skills to those who need it most. It's deeply fulfilling work.",
      name: "Dr. Anjali Verma",
      role: "Medical Volunteer",
      image: "https://images.unsplash.com/photo-1765648684555-de2d0f6af467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMHdvbWFuJTIwaGFwcHl8ZW58MXx8fHwxNzcyNzExNjU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    }
  ]
};

export function Testimonials() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await apiClient.getTestimonials();
        setContent({ ...defaultContent, ...((response.data as any) || {}) });
      } catch (error) {
        console.error("Failed to load testimonials content:", error);
        setContent(defaultContent);
      }
    }
    loadContent();
  }, []);

  if (!content) return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
            <div className="h-10 w-56 bg-gray-200 rounded mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-3xl"></div>)}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#0F6B6B]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#E87D3E]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#E87D3E] font-semibold mb-3 uppercase tracking-wider">{content.sectionSubtitle}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{content.sectionTitle}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.sectionDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F6B6B] to-[#0d5757] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300"></div>
              
              <div className="relative">
                {/* Quote icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0F6B6B]/10 rounded-2xl mb-6">
                  <Quote className="text-[#0F6B6B]" size={24} />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#E87D3E] fill-[#E87D3E]" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0F6B6B]/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#0F6B6B] flex items-center justify-center ring-2 ring-[#0F6B6B]/20">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-[#0F6B6B]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
