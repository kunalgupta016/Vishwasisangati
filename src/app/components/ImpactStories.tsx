import { ArrowRight, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { apiClient } from "../../utils/api/client";

interface ImpactStoriesProps {
  limit?: number;
  showViewAll?: boolean;
}

export function ImpactStories({ limit, showViewAll = false }: ImpactStoriesProps) {
  const [stories, setStories] = useState<any[]>([]);
  const [expandedStories, setExpandedStories] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function loadStories() {
      try {
        const response = await apiClient.getImpactStories();
        if (response.data && (response.data as any[]).length > 0) {
          setStories(response.data as any[]);
        } else {
          setStories([
            {
              name: "Ramanjaneyulu",
              role: "Community Educator",
              quote: "With Vishwasi Sangati's Support, I Am Helping a Whole Village Learn and Grow",
              description: "As a passionate educator in my village, I've witnessed firsthand how access to quality education can transform entire communities. The support from Vishwasi Sangati has empowered me to reach more children and make learning accessible to everyone.",
              image: "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjbGFzc3Jvb20lMjBJbmRpYSUyMGNoaWxkcmVufGVufDF8fHx8MTc3MjcxMjI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              impact: "Educating 50+ children"
            },
            {
              name: "Pourmula Gayatri",
              role: "Parent & Advocate",
              quote: "Vishwasi Sangati Gave Our Daughter a Chance to Learn, Dream, and Succeed",
              description: "As parents, we couldn't afford proper education for our daughter. Thanks to Vishwasi Sangati's programs, she now attends school regularly and dreams of becoming a teacher. They didn't just educate our child—they gave hope to our entire family.",
              image: "https://images.unsplash.com/photo-1759840278361-f1adc75529a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGVudHJlcHJlbmV1ciUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzI3MTIyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              impact: "Changed one family's future"
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to load impact stories:", error);
      }
    }
    loadStories();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedStories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const displayedStories = limit ? stories.slice(0, limit) : stories;

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
          {displayedStories.map((story, index) => {
            const isExpanded = expandedStories[index];
            const isLong = story.description?.length > 150;
            const displayText = isExpanded || !isLong 
              ? story.description 
              : `${story.description?.substring(0, 150)}...`;

            return (
              <div
                key={index}
                className="group flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#E87D3E]"
              >
                <div className="relative h-80 shrink-0 overflow-hidden">
                  {story.image ? (
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0F6B6B] to-[#0d5757] flex items-center justify-center">
                      <span className="text-white font-bold text-7xl opacity-80">
                        {story.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
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

                <div className="p-8 space-y-4 flex-grow flex flex-col">
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
                  <div className="flex-grow">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {displayText}
                    </p>
                  </div>

                  {/* Read More Button */}
                  {isLong && (
                    <button 
                      onClick={() => toggleExpand(index)}
                      className="group/btn inline-flex items-center gap-2 text-[#0F6B6B] font-semibold hover:gap-3 transition-all duration-200 mt-auto pt-4"
                    >
                      <span>{isExpanded ? 'Show Less' : 'Read Full Story'}</span>
                      {isExpanded ? <ChevronUp size={20} className="transition-transform" /> : <ChevronDown size={20} className="transition-transform" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center">
            <Link to="/stories" className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              <span className="font-semibold text-lg">View All Impact Stories</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        )}

        {/* Testimonial Section */}
        {showViewAll && (
          <div className="mt-20 bg-gradient-to-br from-[#0F6B6B] to-[#0d5757] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative max-w-4xl mx-auto text-center space-y-6">
              <Quote className="mx-auto text-[#E87D3E]" size={48} />
              <blockquote className="text-2xl md:text-3xl font-semibold italic leading-relaxed">
                "Every individual has the potential to create positive change. Together, we're proving that sustainable community development is not just possible—it's happening."
              </blockquote>
              <div className="pt-4">
                <p className="font-semibold text-lg">Vishwasi Sangati Team</p>
                <p className="text-white/70">Serving communities since 2009</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
