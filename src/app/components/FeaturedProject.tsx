import { ArrowRight } from "lucide-react";

export function FeaturedProject() {
  return (
    <section className="py-20 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-80 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1733809701005-0b1c0ad53c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwcHJvamVjdCUyMGhlbHBpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzcyNzExNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Featured project"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#27AE60] text-white px-4 py-2 rounded-lg">
                Featured Project
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Clean Water Initiative
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our flagship project bringing clean drinking water to rural villages across Maharashtra. 
                This initiative has already impacted over 10,000 lives and continues to expand to 
                new communities every month. Through sustainable water management systems, we're 
                ensuring access to this basic necessity for generations to come.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-[#F7F9FC] px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-900 ml-2">Maharashtra</span>
                </div>
                <div className="bg-[#F7F9FC] px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600">Impact:</span>
                  <span className="font-semibold text-gray-900 ml-2">10,000+ Lives</span>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-[#2F80ED] text-white px-8 py-4 rounded-lg hover:bg-[#2563c4] transition-colors duration-200 shadow-md self-start">
                View Project
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
