import { ArrowRight, Quote } from "lucide-react";

export function ImpactStories() {
  const stories = [
    {
      name: "Ramanjaneyulu",
      role: "Community Educator",
      quote: "With Vishwasi Sangali's Support, I Am Helping a Whole Village Learn and Grow",
      description: "As a passionate educator in my village, I've witnessed firsthand how access to quality education can transform entire communities. The support from Vishwasi Sangali has empowered me to reach more children and make learning accessible to everyone.",
      image: "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjbGFzc3Jvb20lMjBJbmRpYSUyMGNoaWxkcmVufGVufDF8fHx8MTc3MjcxMjI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      impact: "Educating 50+ children"
    },
    {
      name: "Pourmula Gayatri",
      role: "Parent & Advocate",
      quote: "Vishwasi Sangali Gave Our Daughter a Chance to Learn, Dream, and Succeed",
      description: "As parents, we couldn't afford proper education for our daughter. Thanks to Vishwasi Sangali's programs, she now attends school regularly and dreams of becoming a teacher. They didn't just educate our child—they gave hope to our entire family.",
      image: "https://images.unsplash.com/photo-1759840278361-f1adc75529a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGVudHJlcHJlbmV1ciUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzI3MTIyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      impact: "Changed one family's future"
    }
  ];

  return (
    <section id="stories" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#E87D3E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#0F6B6B] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#E87D3E] font-semibold mb-3 uppercase tracking-wider">Real Stories</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Impact Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from those whose lives we've touched—their stories inspire us every day
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {stories.map((story, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#E87D3E]"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                
                {/* Quote icon */}
                <div className="absolute top-6 left-6">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Quote className="text-white" size={32} />
                  </div>
                </div>

                {/* Impact badge */}
                <div className="absolute bottom-6 left-6">
                  <div className="bg-[#E87D3E] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {story.impact}
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-4">
                {/* Name and Role */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{story.name}</h3>
                  <p className="text-[#0F6B6B] font-medium">{story.role}</p>
                </div>

                {/* Quote */}
                <blockquote className="text-lg font-semibold text-gray-900 italic leading-relaxed">
                  "{story.quote}"
                </blockquote>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {story.description}
                </p>

                {/* Read More Button */}
                <button className="group/btn inline-flex items-center gap-2 text-[#0F6B6B] font-semibold hover:gap-3 transition-all duration-200">
                  <span>Read Full Story</span>
                  <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
            <span className="font-semibold text-lg">View All Impact Stories</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-gradient-to-br from-[#0F6B6B] to-[#0d5757] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative max-w-4xl mx-auto text-center space-y-6">
            <Quote className="mx-auto text-[#E87D3E]" size={48} />
            <blockquote className="text-2xl md:text-3xl font-semibold italic leading-relaxed">
              "Every individual has the potential to create positive change. Together, we're proving that sustainable community development is not just possible—it's happening."
            </blockquote>
            <div className="pt-4">
              <p className="font-semibold text-lg">Vishwasi Sangali Team</p>
              <p className="text-white/70">Serving communities since 2009</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
