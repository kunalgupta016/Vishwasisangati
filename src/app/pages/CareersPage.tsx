import { Briefcase, CheckCircle2, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api/client";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const defaultCareers = {
  sectionSubtitle: "Careers",
  sectionTitle: "Join Our Team",
  sectionDescription: "Work with Vishwasi Sangati to support education, healthcare, and community-led development across rural India.",
  heroImage: "",
  introTitle: "Build meaningful change with us",
  introDescription: "We welcome people who care deeply about community development, field work, operations, communications, and program delivery.",
  benefits: ["Purpose-driven work with community impact", "Collaborative and supportive team culture"],
  applyEmail: "vishwasisangati@gmail.com",
  jobs: []
};

export default function CareersPage() {
  const [content, setContent] = useState<any>(defaultCareers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCareers() {
      try {
        const response = await apiClient.getCareers();
        if (response.data) {
          setContent({ ...defaultCareers, ...(response.data as any) });
        }
      } catch (error) {
        console.error("Failed to load careers content:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCareers();
  }, []);

  const jobs = content.jobs || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-950">
        {content.heroImage && (
          <img src={content.heroImage} alt={content.sectionTitle} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#E87D3E] font-semibold uppercase tracking-wider mb-3">{content.sectionSubtitle}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">{content.sectionTitle}</h1>
            <p className="text-xl text-white/85 leading-relaxed">{content.sectionDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_380px] gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">{content.introTitle}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{content.introDescription}</p>
          </div>
          <aside className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-5">Why Work With Us</h3>
            <ul className="space-y-4">
              {(content.benefits || []).map((benefit: string, index: number) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-[#0F6B6B]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[#E87D3E] font-semibold uppercase tracking-wider mb-2">Open Roles</p>
              <h2 className="text-3xl font-bold text-gray-900">Current Openings</h2>
            </div>
            <Briefcase className="hidden md:block text-[#0F6B6B]" size={40} />
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-600">Loading careers...</div>
          ) : jobs.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">No openings right now</h3>
              <p className="text-gray-600">Please check back soon or contact us for future opportunities.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job: any, index: number) => {
                const applyEmail = job.applyEmail || content.applyEmail || "vishwasisangati@gmail.com";
                return (
                  <article key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex flex-wrap gap-3 mb-4 text-sm">
                      {job.location && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F6B6B]/10 text-[#0F6B6B] rounded-full">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      )}
                      {job.type && (
                        <span className="px-3 py-1 bg-[#E87D3E]/10 text-[#E87D3E] rounded-full">{job.type}</span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{job.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-5">{job.summary}</p>
                    {(job.requirements || []).length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((item: string, reqIndex: number) => (
                          <li key={reqIndex} className="flex gap-2 text-sm text-gray-700">
                            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[#0F6B6B]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <a href={`mailto:${applyEmail}?subject=Application for ${encodeURIComponent(job.title || "Career Opening")}`} className="inline-flex items-center gap-2 bg-[#0F6B6B] text-white px-5 py-3 rounded-full hover:bg-[#0d5757] transition-colors">
                      <Mail size={18} />
                      Apply Now
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
