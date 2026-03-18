import { Menu, X, Heart, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import logo from "../../assets/logo.png";
import { apiClient } from "../../utils/api/client";

const defaultNavbar = {
  menuItems: [
    { label: "Home", href: "/#home" },
    { label: "About Us", href: "/#about" },
    { label: "Core Initiatives", href: "/#initiatives" },
    { label: "Impact Stories", href: "/#stories" },
    { label: "Contact", href: "/#contact" }
  ]
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [content, setContent] = useState(defaultNavbar);
  const navigate = useNavigate();
  const location = useLocation();

  // Only show scrolling effects on homepage
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await apiClient.getNavbar();
        if (response.data) {
          setContent({ ...defaultNavbar, ...(response.data as any) });
        }
      } catch (error) {
        console.error("Failed to load navbar content:", error);
      }
    }
    loadContent();
  }, []);

  const handleDonateClick = () => {
    // Scroll to contact section or open donation modal
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 group">
            <div className="transition-all duration-300">
              <img 
                src={logo} 
                alt="Vishwasi Sangati Logo" 
                className={`h-16 w-auto object-contain transition-all duration-300 ${!scrolled && isHomePage ? 'brightness-0 invert' : 'brightness-0 opacity-90'}`}
              />
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {content.menuItems.map((item: any) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  (scrolled || !isHomePage)
                    ? "text-gray-700 hover:bg-[#0F6B6B]/10 hover:text-[#0F6B6B]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin/login')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                (scrolled || !isHomePage)
                  ? "text-[#0F6B6B] hover:bg-[#0F6B6B]/10"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Lock size={18} />
              <span className="text-sm">Admin</span>
            </button>
            <button 
              onClick={handleDonateClick}
              className="flex items-center gap-2 bg-[#E87D3E] text-white px-6 py-3 rounded-full hover:bg-[#d66d30] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Heart size={20} />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              (scrolled || !isHomePage) ? "text-gray-700" : "text-white"
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 space-y-2 bg-white rounded-2xl mt-2 shadow-xl border border-gray-100">
            {content.menuItems.map((item: any) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-6 py-3 text-gray-700 hover:bg-[#0F6B6B]/10 hover:text-[#0F6B6B] transition-colors rounded-lg mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 pt-4 space-y-2">
              <button 
                onClick={() => {
                  navigate('/admin/login');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Lock size={20} />
                <span>Admin Login</span>
              </button>
              <button 
                onClick={() => {
                  handleDonateClick();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#E87D3E] text-white px-6 py-3 rounded-full hover:bg-[#d66d30] transition-colors shadow-lg"
              >
                <Heart size={20} />
                <span>Donate Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}