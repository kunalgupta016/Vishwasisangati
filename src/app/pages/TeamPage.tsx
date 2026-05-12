import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/api/client";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  photo?: string;
  bio?: string;
  order: number;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeamMembers() {
      try {
        const response = await apiClient.getTeamMembers();
        if (response.data) {
          setTeamMembers(response.data);
        }
      } catch (error) {
        console.error("Failed to load team members:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E87D3E] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F6B6B] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#E87D3E] font-bold tracking-widest uppercase mb-3 text-sm">Our Team</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Meet the People Behind
              <span className="text-[#0F6B6B]"> Our Mission</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our dedicated team of professionals, volunteers, and community leaders work tirelessly
              to bring positive change to rural communities across India.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F6B6B] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No team members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member._id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      {member.photo ? (
                        <Avatar className="w-24 h-24 mx-auto">
                          <AvatarImage src={member.photo} alt={member.name} />
                          <AvatarFallback className="bg-[#0F6B6B] text-white">
                            {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="w-24 h-24 mx-auto">
                          <AvatarFallback className="bg-[#0F6B6B] text-white">
                            {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-[#E87D3E] font-semibold mb-3">{member.position}</p>
                    {member.bio && (
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
