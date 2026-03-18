import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/api/client";
import { toast } from "sonner";
import { ContactFormDialog } from "./ContactFormDialog";
import logo from "../../assets/logo.png";

const socialIconMap: Record<string, any> = { Facebook, Twitter, Instagram, Linkedin };

const defaultFooter = {
  description: "Empowering communities through dedicated service, sustainable development, and compassionate action since 2009.",
  address: "Plot No: 193 & 194, Vishwa Vani Building Road No.2, Bhaagvan Colony, Chakripuram, ECIL - Post Hyderabad",
  email: "vishwasisangati@gmail.com",
  phone: "+91 98480 51358",
  socialLinks: [
    { platform: "Facebook", url: "#" },
    { platform: "Twitter", url: "#" },
    { platform: "Instagram", url: "#" },
    { platform: "Linkedin", url: "#" }
  ],
  quickLinks: [
    { label: "About Us", href: "#about" },
    { label: "Our Mission", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Careers", href: "#careers" },
    { label: "Blog", href: "#blog" }
  ],
  programs: [
    { label: "Education", href: "#education" },
    { label: "Healthcare", href: "#healthcare" },
    { label: "Community Development", href: "#development" },
    { label: "Women Empowerment", href: "#women" },
    { label: "Skill Training", href: "#training" }
  ],
  donateCta: {
    title: "Make a Difference Today",
    description: "Your contribution can change lives. Join us in our mission to build stronger, healthier communities."
  },
  copyright: "© 2026 Vishwasi Sangati. All rights reserved."
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [content, setContent] = useState(defaultFooter);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await apiClient.getFooter();
        if (response.data) {
          setContent({ ...defaultFooter, ...(response.data as any) });
        }
      } catch (error) {
        console.error("Failed to load footer content:", error);
      }
    }
    loadContent();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    const response = await apiClient.subscribeNewsletter(email);
    setIsSubmitting(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message || 'Successfully subscribed to newsletter!');
      setEmail('');
    }
  };

  const handleDonateClick = () => {
    setIsContactFormOpen(true);
    toast.info('Contact us to learn more about donation options');
  };

  return (
    <>
      <footer id="contact" className="relative bg-gray-900 text-white overflow-hidden">
        {/* Newsletter Section */}
        <div className="relative bg-gradient-to-br from-[#0F6B6B] to-[#0d5757] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h3>
                <p className="text-white/90 text-lg">
                  Get updates about our work, impact stories, and ways you can help make a difference.
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-[#E87D3E] text-white px-8 py-4 rounded-full hover:bg-[#d66d30] transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-semibold">{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="relative py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* About Column */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <img src={logo} alt="Vishwasi Sangati" className="h-16 w-auto object-contain brightness-0 invert" />
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  {content.description}
                </p>
                <div className="flex gap-3">
                  {content.socialLinks.map((social: any, index: number) => {
                    const SocialIcon = socialIconMap[social.platform] || Facebook;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="p-3 bg-white/10 hover:bg-[#E87D3E] rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <SocialIcon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-[#E87D3E] rounded-full"></div>
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {content.quickLinks.map((link: any, index: number) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programs */}
              <div>
                <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-[#E87D3E] rounded-full"></div>
                  Our Programs
                </h4>
                <ul className="space-y-3">
                  {content.programs.map((program: any, index: number) => (
                    <li key={index}>
                      <a
                        href={program.href}
                        className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                      >
                        {program.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-[#E87D3E] rounded-full"></div>
                  Contact Us
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="text-[#E87D3E] mt-1 flex-shrink-0" />
                    <span className="text-white/80 text-sm leading-relaxed">
                      {content.address}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={20} className="text-[#E87D3E] flex-shrink-0" />
                    <a
                      href={`mailto:${content.email}`}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {content.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={20} className="text-[#E87D3E] flex-shrink-0" />
                    <a
                      href={`tel:${content.phone?.replace(/\s/g, '')}`}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {content.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Donate CTA */}
            <div className="mb-12 p-8 bg-gradient-to-r from-[#E87D3E] to-[#d66d30] rounded-3xl text-center">
              <h3 className="text-2xl font-bold mb-3">{content.donateCta?.title || "Make a Difference Today"}</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                {content.donateCta?.description || "Your contribution can change lives. Join us in our mission to build stronger, healthier communities."}
              </p>
              <button 
                onClick={handleDonateClick}
                className="inline-flex items-center gap-2 bg-white text-[#E87D3E] px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
              >
                <Heart size={20} />
                <span className="font-semibold text-lg">Donate Now</span>
              </button>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p className="text-white/70">
                  {content.copyright}
                </p>
                <div className="flex gap-6">
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                  <span className="text-white/30">|</span>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Dialog */}
      <ContactFormDialog 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  );
}