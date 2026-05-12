import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { apiClient } from "../../utils/api/client";
import { createProgramSlug } from "../../utils/programs";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

interface Program {
  title: string;
  description: string;
  image: string;
  icon?: string;
  stats?: string;
  color?: string;
  slug?: string;
  fullDescription?: string;
  highlights?: string[];
}

export default function InitiativeDetailPage() {
  const { slug } = useParams();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgram() {
      try {
        const response = await apiClient.getOurWork();
        const programs = ((response.data as any)?.programs || []) as Program[];
        const foundProgram = programs.find((item, index) => {
          const itemSlug = createProgramSlug(item.slug || item.title, `program-${index + 1}`);
          return itemSlug === slug;
        });

        setProgram(foundProgram || null);
      } catch (error) {
        console.error("Failed to load initiative detail:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProgram();
  }, [slug]);

  const highlights = program?.highlights?.filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {loading ? (
        <main className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            Loading initiative...
          </div>
        </main>
      ) : !program ? (
        <main className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#E87D3E] font-semibold uppercase tracking-wider mb-3">Initiative</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Initiative not found</h1>
            <p className="text-gray-600 mb-8">The program you are looking for may have been renamed or removed.</p>
            <Link to="/#initiatives" className="inline-flex items-center gap-2 text-[#0F6B6B] font-semibold">
              <ArrowLeft size={18} />
              Back to Our Work
            </Link>
          </div>
        </main>
      ) : (
        <main>
          <section className="relative pt-32 pb-16 overflow-hidden">
            <div className="absolute inset-0 bg-gray-950">
              {program.image && (
                <img src={program.image} alt={program.title} className="w-full h-full object-cover opacity-45" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/65 to-gray-950/25" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link to="/#initiatives" className="inline-flex items-center gap-2 text-white/85 hover:text-white mb-10">
                <ArrowLeft size={18} />
                Our Work
              </Link>
              <div className="max-w-3xl">
                <p className="text-[#E87D3E] font-semibold uppercase tracking-wider mb-3">Core Initiative</p>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">{program.title}</h1>
                <p className="text-xl text-white/85 leading-relaxed">{program.description}</p>
                {program.stats && (
                  <div className="inline-flex mt-8 px-5 py-3 bg-white rounded-full shadow-lg">
                    <span className="font-bold" style={{ color: program.color || "#0F6B6B" }}>{program.stats}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_380px] gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Initiative</h2>
                <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                  {(program.fullDescription || program.description)
                    .split("\n")
                    .filter(Boolean)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>

              <aside className="bg-gray-50 border border-gray-100 rounded-2xl p-6 self-start">
                <h3 className="text-xl font-bold text-gray-900 mb-5">Key Details</h3>
                {highlights.length > 0 ? (
                  <ul className="space-y-4">
                    {highlights.map((item, index) => (
                      <li key={index} className="flex gap-3 text-gray-700">
                        <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-[#0F6B6B]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{program.description}</p>
                )}
              </aside>
            </div>
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
}
