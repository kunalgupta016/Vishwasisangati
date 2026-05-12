import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Image,
  FileText,
  BarChart3,
  MessageSquare,
  Mail,
  LogOut,
  Upload,
  Save,
  Plus,
  Trash2,
  Eye,
  UserPlus,
  Navigation,
  Target,
  Briefcase,
  Quote,
  Star as StarIcon,
  MapPin
} from 'lucide-react';
import { apiClient } from '../../utils/api/client';
import { toast } from 'sonner';
import logo from "../../assets/logo.png";

type TabType = 'hero' | 'about-us' | 'navbar' | 'vision-mission' | 'our-work' | 'testimonials' | 'featured-project' | 'footer' | 'stats' | 'stories' | 'contacts' | 'subscribers' | 'admins' | 'logo';

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [loading, setLoading] = useState(false);

  // Hero content state
  const [heroContent, setHeroContent] = useState<any>(null);
  const [uploadingHero, setUploadingHero] = useState(false);

  // About Us state
  const [aboutUsContent, setAboutUsContent] = useState<any>(null);
  const [uploadingAboutUs, setUploadingAboutUs] = useState(false);

  // Stats state
  const [stats, setStats] = useState<any[]>([]);

  // Stories state
  const [stories, setStories] = useState<any[]>([]);

  // Contacts state
  const [contacts, setContacts] = useState<any[]>([]);

  // Subscribers state
  const [subscribers, setSubscribers] = useState<any[]>([]);

  // Admins state
  const [admins, setAdmins] = useState<any[]>([]);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });

  // Navbar state
  const [navbarContent, setNavbarContent] = useState<any>(null);

  // Vision & Mission state
  const [visionMissionContent, setVisionMissionContent] = useState<any>(null);

  // Our Work state
  const [ourWorkContent, setOurWorkContent] = useState<any>(null);

  // Testimonials state
  const [testimonialsContent, setTestimonialsContent] = useState<any>(null);

  // Featured Project state
  const [featuredProjectContent, setFeaturedProjectContent] = useState<any>(null);
  const [uploadingFeaturedProject, setUploadingFeaturedProject] = useState(false);

  // Footer state
  const [footerContent, setFooterContent] = useState<any>(null);

  // Logo state
  const [logoContent, setLogoContent] = useState<any>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Load initial data
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [user, activeTab]);

  const loadData = async () => {
    setLoading(true);
    
    try {
      if (activeTab === 'hero') {
        const response = await apiClient.getHeroContent();
        if (response.data) {
          setHeroContent(response.data);
        }
      } else if (activeTab === 'about-us') {
        const response = await apiClient.getAboutUs();
        if (response.data) {
          setAboutUsContent(response.data);
        }
      } else if (activeTab === 'stats') {
        const response = await apiClient.getImpactStats();
        if (response.data && (response.data as any[]).length > 0) {
          setStats((response.data as any[]));
        } else {
          setStats([
            { icon: 'Users', number: '62', label: 'Communities supported', sublabel: 'Relief & rehabilitation programs', color: '#0F6B6B', gradient: 'from-[#0F6B6B] to-[#0d5757]' },
            { icon: 'Heart', number: '465', label: 'Women trained', sublabel: 'Skill development programs', color: '#E87D3E', gradient: 'from-[#E87D3E] to-[#d66d30]' }
          ]);
        }
      } else if (activeTab === 'stories') {
        const response = await apiClient.getImpactStories();
        if (response.data && (response.data as any[]).length > 0) {
          setStories((response.data as any[]));
        } else {
          setStories([
            { name: "Ramanjaneyulu", role: "Community Educator", quote: "With Vishwasi Sangati's Support...", description: "As a passionate educator...", image: "", impact: "Educating 50+ children" }
          ]);
        }
      } else if (activeTab === 'contacts') {
        const response = await apiClient.getAllContacts();
        if (response.data) {
           const contactItems = Array.isArray(response.data) ? response.data : [];
          setContacts(contactItems.map((item: any) => item.value || item));
        }
      } else if (activeTab === 'subscribers') {
        const response = await apiClient.getNewsletterSubscribers();
        if (response.data) {
          const subscriberItems = Array.isArray(response.data) ? response.data : [];
          setSubscribers(subscriberItems.map((item: any) => item.value || item));
        }
      } else if (activeTab === 'admins') {
        const response = await apiClient.getAdmins();
        if (response.data) {
          setAdmins(Array.isArray(response.data) ? response.data : []);
        }
      } else if (activeTab === 'navbar') {
        const response = await apiClient.getNavbar();
        setNavbarContent(response.data || {
          menuItems: [
            { label: "Home", href: "/#home" },
            { label: "About Us", href: "/#about" },
            { label: "Core Initiatives", href: "/#initiatives" },
            { label: "Impact Stories", href: "/#stories" },
            { label: "Contact", href: "/#contact" }
          ]
        });
      } else if (activeTab === 'vision-mission') {
        const response = await apiClient.getVisionMission();
        setVisionMissionContent(response.data || {
          sectionSubtitle: "Who We Are",
          sectionTitle: "Our Vision & Mission",
          sectionDescription: "Driven by compassion, guided by purpose",
          visionText: "A resilient India where every child, woman, and family lives with dignity, opportunity, and hope for a brighter tomorrow.",
          missionParagraph1: "To alleviate poverty and uplift vulnerable rural communities by providing access to education, healthcare, and sustainable livelihoods.",
          missionParagraph2: "Through women's empowerment, youth engagement, and community-led initiatives, we nurture people-driven change that is owned, sustained, and carried forward by the communities themselves.",
          missionHighlight: "From schools and childcare centers to medical camps, sewing workshops, and nutrition campaigns—we equip every child, woman, and family with the tools to live with dignity.",
          coreValues: [
            { label: "Compassion", emoji: "❤️" },
            { label: "Integrity", emoji: "🤝" },
            { label: "Empowerment", emoji: "💪" },
            { label: "Sustainability", emoji: "🌱" }
          ]
        });
      } else if (activeTab === 'our-work') {
        const response = await apiClient.getOurWork();
        setOurWorkContent(response.data || {
          sectionSubtitle: "Core Initiatives",
          sectionTitle: "Our Work",
          sectionDescription: "We focus on three key areas to create meaningful and lasting impact in communities",
          programs: [
            { title: "Education Program", description: "Providing quality education through 27 evening tuition centers and 2 educational institutions.", image: "", icon: "GraduationCap", stats: "610+ Children", color: "#0F6B6B" },
            { title: "Healthcare Initiative", description: "Delivering essential healthcare through 10 Primary Health Centers and medical camps.", image: "", icon: "Stethoscope", stats: "19,389 Visits", color: "#E87D3E" },
            { title: "Community Development", description: "Empowering 62 communities through relief & rehabilitation and women's skill training.", image: "", icon: "Users", stats: "62 Communities", color: "#0F6B6B" }
          ]
        });
      } else if (activeTab === 'testimonials') {
        const response = await apiClient.getTestimonials();
        setTestimonialsContent(response.data || {
          sectionSubtitle: "Testimonials",
          sectionTitle: "What People Say",
          sectionDescription: "Hear from our volunteers and community members about their experiences",
          testimonials: [
            { quote: "Volunteering with Vishwasi Sangati has been the most rewarding experience of my life.", name: "Priya Sharma", role: "Volunteer since 2023", image: "", rating: 5 },
            { quote: "The education program has transformed our village.", name: "Rajesh Kumar", role: "Community Leader", image: "", rating: 5 },
            { quote: "Being part of the healthcare initiative has allowed me to contribute my medical skills.", name: "Dr. Anjali Verma", role: "Medical Volunteer", image: "", rating: 5 }
          ]
        });
      } else if (activeTab === 'featured-project') {
        const response = await apiClient.getFeaturedProject();
        setFeaturedProjectContent(response.data || {
          sectionSubtitle: "Spotlight",
          sectionTitle: "Featured Project",
          sectionDescription: "Discover our flagship initiative making a tangible difference",
          title: "Poshan Maa — Nutrition Initiative",
          description: "Our flagship nutrition program providing balanced meals to children and mothers across rural communities.",
          image: "",
          stats: [
            { icon: "MapPin", label: "6 States" },
            { icon: "Users", label: "15,876+ Meals" },
            { icon: "Heart", label: "194 Children in Care" }
          ],
          ctaText: "Support This Project"
        });
      } else if (activeTab === 'footer') {
        const response = await apiClient.getFooter();
        setFooterContent(response.data || {
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
          donateCta: { title: "Make a Difference Today", description: "Your contribution can change lives." },
          copyright: "© 2026 Vishwasi Sangati. All rights reserved."
        });
      } else if (activeTab === 'logo') {
        const response = await apiClient.getLogo();
        if (response.data) {
          const url = (response.data as any).url;
          const timestamp = (response as any).updatedAt ? new Date((response as any).updatedAt).getTime() : Date.now();
          const separator = url?.includes('?') ? '&' : '?';
          setLogoContent({ ...response.data, url: url ? `${url}${separator}t=${timestamp}` : "/src/assets/logo.png" });
        } else {
          setLogoContent({ url: "/src/assets/logo.png" });
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success('Signed out successfully');
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'mainImage' | 'backgroundImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    const response = await apiClient.uploadMedia(file);
    setUploadingHero(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setHeroContent({ ...heroContent, [field]: response.url });
      toast.success('Image uploaded successfully');
    }
  };

  const handleSaveHero = async () => {
    setLoading(true);
    const response = await apiClient.updateHeroContent(heroContent);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Hero content updated successfully');
    }
  };

  const handleAboutUsImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAboutUs(true);
    const response = await apiClient.uploadMedia(file);
    setUploadingAboutUs(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setAboutUsContent({ ...aboutUsContent, image: response.url });
      toast.success('Image uploaded successfully');
    }
  };

  const handleSaveAboutUs = async () => {
    if (!aboutUsContent) return;
    setLoading(true);
    const response = await apiClient.updateAboutUs(aboutUsContent);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('About Us content updated successfully');
    }
  };

  const handleSaveStats = async () => {
    setLoading(true);
    const response = await apiClient.updateImpactStats(stats);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Impact stats updated successfully');
    }
  };

  const handleSaveStories = async () => {
    setLoading(true);
    const response = await apiClient.updateImpactStories(stories);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Impact stories updated successfully');
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    const response = await apiClient.createAdmin(newAdmin);
    setLoading(false);
    
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Admin created successfully');
      setNewAdmin({ name: '', email: '', password: '' });
      setShowAddAdmin(false);
      loadData();
    }
  };

  // --- New section save handlers ---
  const handleSaveNavbar = async () => {
    if (!navbarContent) return;
    setLoading(true);
    const response = await apiClient.updateNavbar(navbarContent);
    setLoading(false);
    if (response.error) { toast.error(response.error); } else { toast.success('Navbar updated successfully'); }
  };

  const handleSaveVisionMission = async () => {
    if (!visionMissionContent) return;
    setLoading(true);
    const response = await apiClient.updateVisionMission(visionMissionContent);
    setLoading(false);
    if (response.error) { toast.error(response.error); } else { toast.success('Vision & Mission updated successfully'); }
  };

  const handleSaveOurWork = async () => {
    if (!ourWorkContent) return;
    setLoading(true);
    const response = await apiClient.updateOurWork(ourWorkContent);
    setLoading(false);
    if (response.error) { toast.error(response.error); } else { toast.success('Our Work updated successfully'); }
  };

  const handleSaveTestimonials = async () => {
    if (!testimonialsContent) return;
    setLoading(true);
    const response = await apiClient.updateTestimonials(testimonialsContent);
    setLoading(false);
    if (response.error) { toast.error(response.error); } else { toast.success('Testimonials updated successfully'); }
  };

  const handleSaveFeaturedProject = async () => {
    if (!featuredProjectContent) return;
    setLoading(true);
    const response = await apiClient.updateFeaturedProject(featuredProjectContent);
    setLoading(false);
    if (response.error) { toast.error(response.error); } else { toast.success('Featured Project updated successfully'); }
  };

  const handleSaveFooter = async () => {
    if (!footerContent) return;
    setLoading(true);
    const response = await apiClient.updateFooter(footerContent);
    setLoading(false);
    if (response.error) { toast.error(response.error); } else { toast.success('Footer updated successfully'); }
  };

  const handleLogoImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const response = await apiClient.uploadMedia(file);
    setUploadingLogo(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setLogoContent({ ...logoContent, url: response.url });
      toast.success('Logo uploaded successfully');
    }
  };

  const handleSaveLogo = async () => {
    if (!logoContent) return;
    setLoading(true);
    const response = await apiClient.updateLogo(logoContent);
    setLoading(false);
    if (response.error) { toast.error(response.error); } else { toast.success('Logo updated successfully'); }
  };

  const handleStoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const response = await apiClient.uploadMedia(file);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      const newStories = [...stories];
      newStories[index].image = response.url;
      setStories(newStories);
      toast.success('Image uploaded successfully');
    }
  };

  const addNewStory = () => {
    setStories([
      ...stories,
      {
        id: Date.now(),
        name: 'New Person',
        role: 'Role',
        quote: 'Inspiring quote',
        description: 'Story description',
        image: '',
        impact: 'Impact description'
      }
    ]);
  };

  const removeStory = (index: number) => {
    setStories(stories.filter((_, i) => i !== index));
  };

  const addNewStat = () => {
    setStats([
      ...stats,
      {
        icon: 'Heart',
        number: '0',
        label: 'New Stat',
        sublabel: 'Description',
        color: '#0F6B6B',
        gradient: 'from-[#0F6B6B] to-[#0d5757]'
      }
    ]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: 'hero' as TabType, label: 'Hero Section', icon: Image },
    { id: 'about-us' as TabType, label: 'About Us', icon: FileText },
    { id: 'navbar' as TabType, label: 'Navbar', icon: Navigation },
    { id: 'vision-mission' as TabType, label: 'Vision & Mission', icon: Target },
    { id: 'our-work' as TabType, label: 'Our Work', icon: Briefcase },
    { id: 'testimonials' as TabType, label: 'Testimonials', icon: Quote },
    { id: 'featured-project' as TabType, label: 'Featured Project', icon: StarIcon },
    { id: 'footer' as TabType, label: 'Footer', icon: MapPin },
    { id: 'stats' as TabType, label: 'Impact Stats', icon: BarChart3 },
    { id: 'stories' as TabType, label: 'Impact Stories', icon: FileText },
    { id: 'contacts' as TabType, label: 'Contacts', icon: MessageSquare },
    { id: 'subscribers' as TabType, label: 'Subscribers', icon: Mail },
    { id: 'admins' as TabType, label: 'Admins', icon: UserPlus },
    { id: 'logo' as TabType, label: 'Site Logo', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoContent?.url || logo} alt="Logo" className="h-10 w-auto object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Vishwasi Sangati NGO</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#0F6B6B] transition-colors"
              >
                <Eye size={20} />
                <span>View Site</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#0F6B6B] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F6B6B]"></div>
                  <p className="mt-4 text-gray-600">Loading...</p>
                </div>
              ) : (
                <>
                  {/* Hero Content Tab */}
                  {activeTab === 'hero' && heroContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
                        <button
                          onClick={handleSaveHero}
                          className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                        >
                          <Save size={20} />
                          Save Changes
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                          <input
                            type="text"
                            value={heroContent.badge}
                            onChange={(e) => setHeroContent({ ...heroContent, badge: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={heroContent.title}
                            onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Text</label>
                          <input
                            type="text"
                            value={heroContent.highlightText}
                            onChange={(e) => setHeroContent({ ...heroContent, highlightText: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={heroContent.description}
                            onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                          {heroContent.mainImage && (
                            <img src={heroContent.mainImage} alt="Main" className="w-full h-48 object-cover rounded-lg mb-2" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleHeroImageUpload(e, 'mainImage')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            disabled={uploadingHero}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                          {heroContent.backgroundImage && (
                            <img src={heroContent.backgroundImage} alt="Background" className="w-full h-48 object-cover rounded-lg mb-2" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleHeroImageUpload(e, 'backgroundImage')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            disabled={uploadingHero}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* About Us Content Tab */}
                  {activeTab === 'about-us' && aboutUsContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">About Us Section</h2>
                        <button
                          onClick={handleSaveAboutUs}
                          className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                        >
                          <Save size={20} />
                          Save Changes
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph 1</label>
                          <textarea
                            value={aboutUsContent.paragraph1}
                            onChange={(e) => setAboutUsContent({ ...aboutUsContent, paragraph1: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph 2</label>
                          <textarea
                            value={aboutUsContent.paragraph2}
                            onChange={(e) => setAboutUsContent({ ...aboutUsContent, paragraph2: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Quote</label>
                          <textarea
                            value={aboutUsContent.quote}
                            onChange={(e) => setAboutUsContent({ ...aboutUsContent, quote: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph 3</label>
                          <textarea
                            value={aboutUsContent.paragraph3}
                            onChange={(e) => setAboutUsContent({ ...aboutUsContent, paragraph3: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Conclusion</label>
                          <textarea
                            value={aboutUsContent.conclusion}
                            onChange={(e) => setAboutUsContent({ ...aboutUsContent, conclusion: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">About Us Image</label>
                          {aboutUsContent.image && (
                            <img src={aboutUsContent.image} alt="About Us" className="w-full h-48 object-cover rounded-lg mb-2" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAboutUsImageUpload}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            disabled={uploadingAboutUs}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navbar Tab */}
                  {activeTab === 'navbar' && navbarContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Navbar Menu Items</h2>
                        <div className="flex gap-2">
                          <button onClick={() => setNavbarContent({ ...navbarContent, menuItems: [...(navbarContent.menuItems || []), { label: 'New Link', href: '#' }] })} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><Plus size={20} />Add Item</button>
                          <button onClick={handleSaveNavbar} className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"><Save size={20} />Save Changes</button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {(navbarContent.menuItems || []).map((item: any, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                            <div className="flex-1 grid grid-cols-2 gap-3">
                              <input type="text" value={item.label} onChange={(e) => { const items = [...navbarContent.menuItems]; items[index].label = e.target.value; setNavbarContent({ ...navbarContent, menuItems: items }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Label" />
                              <input type="text" value={item.href} onChange={(e) => { const items = [...navbarContent.menuItems]; items[index].href = e.target.value; setNavbarContent({ ...navbarContent, menuItems: items }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Link (e.g. /#about)" />
                            </div>
                            <button onClick={() => { const items = navbarContent.menuItems.filter((_: any, i: number) => i !== index); setNavbarContent({ ...navbarContent, menuItems: items }); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vision & Mission Tab */}
                  {activeTab === 'vision-mission' && visionMissionContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Vision & Mission</h2>
                        <button onClick={handleSaveVisionMission} className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"><Save size={20} />Save Changes</button>
                      </div>
                      <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label><input type="text" value={visionMissionContent.sectionSubtitle || ''} onChange={(e) => setVisionMissionContent({ ...visionMissionContent, sectionSubtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label><input type="text" value={visionMissionContent.sectionTitle || ''} onChange={(e) => setVisionMissionContent({ ...visionMissionContent, sectionTitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label><input type="text" value={visionMissionContent.sectionDescription || ''} onChange={(e) => setVisionMissionContent({ ...visionMissionContent, sectionDescription: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Vision Text</label><textarea value={visionMissionContent.visionText || ''} onChange={(e) => setVisionMissionContent({ ...visionMissionContent, visionText: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Mission Paragraph 1</label><textarea value={visionMissionContent.missionParagraph1 || ''} onChange={(e) => setVisionMissionContent({ ...visionMissionContent, missionParagraph1: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Mission Paragraph 2</label><textarea value={visionMissionContent.missionParagraph2 || ''} onChange={(e) => setVisionMissionContent({ ...visionMissionContent, missionParagraph2: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Mission Highlight</label><textarea value={visionMissionContent.missionHighlight || ''} onChange={(e) => setVisionMissionContent({ ...visionMissionContent, missionHighlight: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B]" /></div>
                        <div>
                          <div className="flex items-center justify-between mb-2"><label className="block text-sm font-medium text-gray-700">Core Values</label><button onClick={() => setVisionMissionContent({ ...visionMissionContent, coreValues: [...(visionMissionContent.coreValues || []), { label: 'New Value', emoji: '✨' }] })} className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} className="inline mr-1" />Add Value</button></div>
                          <div className="grid grid-cols-2 gap-3">
                            {(visionMissionContent.coreValues || []).map((val: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                                <input type="text" value={val.emoji} onChange={(e) => { const vals = [...visionMissionContent.coreValues]; vals[i].emoji = e.target.value; setVisionMissionContent({ ...visionMissionContent, coreValues: vals }); }} className="w-12 px-2 py-1 border border-gray-300 rounded text-center" />
                                <input type="text" value={val.label} onChange={(e) => { const vals = [...visionMissionContent.coreValues]; vals[i].label = e.target.value; setVisionMissionContent({ ...visionMissionContent, coreValues: vals }); }} className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" />
                                <button onClick={() => { const vals = visionMissionContent.coreValues.filter((_: any, idx: number) => idx !== i); setVisionMissionContent({ ...visionMissionContent, coreValues: vals }); }} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={14} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Our Work Tab */}
                  {activeTab === 'our-work' && ourWorkContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Our Work / Programs</h2>
                        <div className="flex gap-2">
                          <button onClick={() => setOurWorkContent({ ...ourWorkContent, programs: [...(ourWorkContent.programs || []), { title: 'New Program', description: 'Description', image: '', icon: 'Heart', stats: '0', color: '#0F6B6B' }] })} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><Plus size={20} />Add Program</button>
                          <button onClick={handleSaveOurWork} className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"><Save size={20} />Save Changes</button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label><input type="text" value={ourWorkContent.sectionSubtitle || ''} onChange={(e) => setOurWorkContent({ ...ourWorkContent, sectionSubtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label><input type="text" value={ourWorkContent.sectionTitle || ''} onChange={(e) => setOurWorkContent({ ...ourWorkContent, sectionTitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label><input type="text" value={ourWorkContent.sectionDescription || ''} onChange={(e) => setOurWorkContent({ ...ourWorkContent, sectionDescription: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                      </div>
                      <div className="space-y-4">
                        {(ourWorkContent.programs || []).map((prog: any, index: number) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                            <button onClick={() => { const progs = ourWorkContent.programs.filter((_: any, i: number) => i !== index); setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                            <input type="text" value={prog.title} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].title = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold" placeholder="Program Title" />
                            <textarea value={prog.description} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].description = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Description" />
                            <div className="grid grid-cols-3 gap-2">
                              <input type="text" value={prog.stats} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].stats = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Stats (e.g. 610+ Children)" />
                              <input type="text" value={prog.image} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].image = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Image URL" />
                              <select value={prog.icon} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].icon = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                <option value="GraduationCap">Graduation</option><option value="Stethoscope">Stethoscope</option><option value="Users">Users</option><option value="Heart">Heart</option><option value="BookOpen">Book</option><option value="Home">Home</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Testimonials Tab */}
                  {activeTab === 'testimonials' && testimonialsContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
                        <div className="flex gap-2">
                          <button onClick={() => setTestimonialsContent({ ...testimonialsContent, testimonials: [...(testimonialsContent.testimonials || []), { quote: 'New quote', name: 'Name', role: 'Role', image: '', rating: 5 }] })} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><Plus size={20} />Add Testimonial</button>
                          <button onClick={handleSaveTestimonials} className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"><Save size={20} />Save Changes</button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label><input type="text" value={testimonialsContent.sectionSubtitle || ''} onChange={(e) => setTestimonialsContent({ ...testimonialsContent, sectionSubtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label><input type="text" value={testimonialsContent.sectionTitle || ''} onChange={(e) => setTestimonialsContent({ ...testimonialsContent, sectionTitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label><input type="text" value={testimonialsContent.sectionDescription || ''} onChange={(e) => setTestimonialsContent({ ...testimonialsContent, sectionDescription: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                      </div>
                      <div className="space-y-4">
                        {(testimonialsContent.testimonials || []).map((t: any, index: number) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                            <button onClick={() => { const items = testimonialsContent.testimonials.filter((_: any, i: number) => i !== index); setTestimonialsContent({ ...testimonialsContent, testimonials: items }); }} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                            <div className="grid grid-cols-2 gap-2">
                              <input type="text" value={t.name} onChange={(e) => { const items = [...testimonialsContent.testimonials]; items[index].name = e.target.value; setTestimonialsContent({ ...testimonialsContent, testimonials: items }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Name" />
                              <input type="text" value={t.role} onChange={(e) => { const items = [...testimonialsContent.testimonials]; items[index].role = e.target.value; setTestimonialsContent({ ...testimonialsContent, testimonials: items }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Role" />
                            </div>
                            <textarea value={t.quote} onChange={(e) => { const items = [...testimonialsContent.testimonials]; items[index].quote = e.target.value; setTestimonialsContent({ ...testimonialsContent, testimonials: items }); }} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Quote" />
                            <input type="text" value={t.image} onChange={(e) => { const items = [...testimonialsContent.testimonials]; items[index].image = e.target.value; setTestimonialsContent({ ...testimonialsContent, testimonials: items }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Image URL" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Featured Project Tab */}
                  {activeTab === 'featured-project' && featuredProjectContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Featured Project</h2>
                        <button onClick={handleSaveFeaturedProject} className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"><Save size={20} />Save Changes</button>
                      </div>
                      <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label><input type="text" value={featuredProjectContent.sectionSubtitle || ''} onChange={(e) => setFeaturedProjectContent({ ...featuredProjectContent, sectionSubtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label><input type="text" value={featuredProjectContent.sectionTitle || ''} onChange={(e) => setFeaturedProjectContent({ ...featuredProjectContent, sectionTitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label><input type="text" value={featuredProjectContent.title || ''} onChange={(e) => setFeaturedProjectContent({ ...featuredProjectContent, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea value={featuredProjectContent.description || ''} onChange={(e) => setFeaturedProjectContent({ ...featuredProjectContent, description: e.target.value })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label><input type="text" value={featuredProjectContent.image || ''} onChange={(e) => setFeaturedProjectContent({ ...featuredProjectContent, image: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label><input type="text" value={featuredProjectContent.ctaText || ''} onChange={(e) => setFeaturedProjectContent({ ...featuredProjectContent, ctaText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div>
                          <div className="flex items-center justify-between mb-2"><label className="block text-sm font-medium text-gray-700">Stats Badges</label><button onClick={() => setFeaturedProjectContent({ ...featuredProjectContent, stats: [...(featuredProjectContent.stats || []), { icon: 'Heart', label: 'New Stat' }] })} className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} className="inline mr-1" />Add Stat</button></div>
                          <div className="space-y-2">
                            {(featuredProjectContent.stats || []).map((stat: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <select value={stat.icon} onChange={(e) => { const s = [...featuredProjectContent.stats]; s[i].icon = e.target.value; setFeaturedProjectContent({ ...featuredProjectContent, stats: s }); }} className="px-2 py-1 border border-gray-300 rounded text-sm"><option value="MapPin">MapPin</option><option value="Users">Users</option><option value="Heart">Heart</option></select>
                                <input type="text" value={stat.label} onChange={(e) => { const s = [...featuredProjectContent.stats]; s[i].label = e.target.value; setFeaturedProjectContent({ ...featuredProjectContent, stats: s }); }} className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" />
                                <button onClick={() => { const s = featuredProjectContent.stats.filter((_: any, idx: number) => idx !== i); setFeaturedProjectContent({ ...featuredProjectContent, stats: s }); }} className="text-red-500 p-1"><Trash2 size={14} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer Tab */}
                  {activeTab === 'footer' && footerContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Footer Content</h2>
                        <button onClick={handleSaveFooter} className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"><Save size={20} />Save Changes</button>
                      </div>
                      <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea value={footerContent.description || ''} onChange={(e) => setFooterContent({ ...footerContent, description: e.target.value })} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Address</label><textarea value={footerContent.address || ''} onChange={(e) => setFooterContent({ ...footerContent, address: e.target.value })} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><input type="email" value={footerContent.email || ''} onChange={(e) => setFooterContent({ ...footerContent, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                          <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone</label><input type="text" value={footerContent.phone || ''} onChange={(e) => setFooterContent({ ...footerContent, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label><input type="text" value={footerContent.copyright || ''} onChange={(e) => setFooterContent({ ...footerContent, copyright: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div>
                          <div className="flex items-center justify-between mb-2"><label className="block text-sm font-medium text-gray-700">Social Links</label><button onClick={() => setFooterContent({ ...footerContent, socialLinks: [...(footerContent.socialLinks || []), { platform: 'Facebook', url: '#' }] })} className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} className="inline mr-1" />Add</button></div>
                          <div className="space-y-2">
                            {(footerContent.socialLinks || []).map((link: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <select value={link.platform} onChange={(e) => { const links = [...footerContent.socialLinks]; links[i].platform = e.target.value; setFooterContent({ ...footerContent, socialLinks: links }); }} className="px-2 py-1 border border-gray-300 rounded text-sm"><option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkedin</option></select>
                                <input type="text" value={link.url} onChange={(e) => { const links = [...footerContent.socialLinks]; links[i].url = e.target.value; setFooterContent({ ...footerContent, socialLinks: links }); }} className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" placeholder="URL" />
                                <button onClick={() => { const links = footerContent.socialLinks.filter((_: any, idx: number) => idx !== i); setFooterContent({ ...footerContent, socialLinks: links }); }} className="text-red-500 p-1"><Trash2 size={14} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2"><label className="block text-sm font-medium text-gray-700">Quick Links</label><button onClick={() => setFooterContent({ ...footerContent, quickLinks: [...(footerContent.quickLinks || []), { label: 'New Link', href: '#' }] })} className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} className="inline mr-1" />Add</button></div>
                          <div className="space-y-2">
                            {(footerContent.quickLinks || []).map((link: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <input type="text" value={link.label} onChange={(e) => { const links = [...footerContent.quickLinks]; links[i].label = e.target.value; setFooterContent({ ...footerContent, quickLinks: links }); }} className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Label" />
                                <input type="text" value={link.href} onChange={(e) => { const links = [...footerContent.quickLinks]; links[i].href = e.target.value; setFooterContent({ ...footerContent, quickLinks: links }); }} className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Link" />
                                <button onClick={() => { const links = footerContent.quickLinks.filter((_: any, idx: number) => idx !== i); setFooterContent({ ...footerContent, quickLinks: links }); }} className="text-red-500 p-1"><Trash2 size={14} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2"><label className="block text-sm font-medium text-gray-700">Program Links</label><button onClick={() => setFooterContent({ ...footerContent, programs: [...(footerContent.programs || []), { label: 'New Program', href: '#' }] })} className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} className="inline mr-1" />Add</button></div>
                          <div className="space-y-2">
                            {(footerContent.programs || []).map((prog: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <input type="text" value={prog.label} onChange={(e) => { const progs = [...footerContent.programs]; progs[i].label = e.target.value; setFooterContent({ ...footerContent, programs: progs }); }} className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Label" />
                                <input type="text" value={prog.href} onChange={(e) => { const progs = [...footerContent.programs]; progs[i].href = e.target.value; setFooterContent({ ...footerContent, programs: progs }); }} className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Link" />
                                <button onClick={() => { const progs = footerContent.programs.filter((_: any, idx: number) => idx !== i); setFooterContent({ ...footerContent, programs: progs }); }} className="text-red-500 p-1"><Trash2 size={14} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-3">Donate CTA Section</h3>
                          <div className="space-y-3">
                            <div><label className="block text-xs text-gray-500 mb-1">CTA Title</label><input type="text" value={footerContent.donateCta?.title || ''} onChange={(e) => setFooterContent({ ...footerContent, donateCta: { ...footerContent.donateCta, title: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                            <div><label className="block text-xs text-gray-500 mb-1">CTA Description</label><textarea value={footerContent.donateCta?.description || ''} onChange={(e) => setFooterContent({ ...footerContent, donateCta: { ...footerContent.donateCta, description: e.target.value } })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Impact Stats Tab */}
                  {activeTab === 'stats' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Impact Statistics</h2>
                        <div className="flex gap-2">
                          <button
                            onClick={addNewStat}
                            className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <Plus size={20} />
                            Add Stat
                          </button>
                          <button
                            onClick={handleSaveStats}
                            className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                          >
                            <Save size={20} />
                            Save Changes
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                            <button
                                onClick={() => removeStat(index)}
                                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={stat.number}
                              onChange={(e) => {
                                const newStats = [...stats];
                                newStats[index].number = e.target.value;
                                setStats(newStats);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="Number"
                            />
                              <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => {
                                  const newStats = [...stats];
                                  newStats[index].label = e.target.value;
                                  setStats(newStats);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Label"
                              />
                            </div>
                            <input
                              type="text"
                              value={stat.sublabel}
                              onChange={(e) => {
                                const newStats = [...stats];
                                newStats[index].sublabel = e.target.value;
                                setStats(newStats);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="Sublabel (e.g. Relief programs)"
                            />
                            <select
                              value={stat.icon}
                              onChange={(e) => {
                                const newStats = [...stats];
                                newStats[index].icon = e.target.value;
                                setStats(newStats);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                              <option value="Users">Users Icon</option>
                              <option value="Heart">Heart Icon</option>
                              <option value="GraduationCap">Graduation Icon</option>
                              <option value="BookOpen">Book Icon</option>
                              <option value="School">School Icon</option>
                              <option value="Baby">Baby Icon</option>
                              <option value="Home">Home Icon</option>
                              <option value="Pill">Medical/Pill Icon</option>
                              <option value="Stethoscope">Stethoscope Icon</option>
                              <option value="Activity">Activity Icon</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Impact Stories Tab */}
                  {activeTab === 'stories' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Impact Stories</h2>
                        <div className="flex gap-2">
                          <button
                            onClick={addNewStory}
                            className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <Plus size={20} />
                            Add Story
                          </button>
                          <button
                            onClick={handleSaveStories}
                            className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                          >
                            <Save size={20} />
                            Save Changes
                          </button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {stories.map((story, index) => (
                          <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-900">Story #{index + 1}</h3>
                              <button
                                onClick={() => removeStory(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={story.name}
                                onChange={(e) => {
                                  const newStories = [...stories];
                                  newStories[index].name = e.target.value;
                                  setStories(newStories);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Person's Name"
                              />
                              <input
                                type="text"
                                value={story.role}
                                onChange={(e) => {
                                  const newStories = [...stories];
                                  newStories[index].role = e.target.value;
                                  setStories(newStories);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Their Role (e.g. Community Educator)"
                              />
                            </div>
                            
                            <input
                              type="text"
                              value={story.quote}
                              onChange={(e) => {
                                const newStories = [...stories];
                                newStories[index].quote = e.target.value;
                                setStories(newStories);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Quote / Catchy Header"
                            />

                            <textarea
                              value={story.description}
                              onChange={(e) => {
                                const newStories = [...stories];
                                newStories[index].description = e.target.value;
                                setStories(newStories);
                              }}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Description"
                            />

                            <input
                              type="text"
                              value={story.impact}
                              onChange={(e) => {
                                const newStories = [...stories];
                                newStories[index].impact = e.target.value;
                                setStories(newStories);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Impact"
                            />

                            <div>
                              {story.image && (
                                <img src={story.image} alt={story.title} className="w-full h-48 object-cover rounded-lg mb-2" />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleStoryImageUpload(e, index)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contacts Tab */}
                  {activeTab === 'contacts' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900">Contact Submissions</h2>
                      
                      {contacts.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No contact submissions yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {contacts.map((contact, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                                <span className="text-sm text-gray-500">
                                  {new Date(contact.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                <strong>Email:</strong> {contact.email}
                              </p>
                              {contact.phone && (
                                <p className="text-sm text-gray-600 mb-1">
                                  <strong>Phone:</strong> {contact.phone}
                                </p>
                              )}
                              <p className="text-sm text-gray-700 mt-2">
                                <strong>Message:</strong> {contact.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subscribers Tab */}
                  {activeTab === 'subscribers' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h2>
                        <div className="px-4 py-2 bg-[#0F6B6B] text-white rounded-lg">
                          Total: {subscribers.length}
                        </div>
                      </div>
                      
                      {subscribers.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No subscribers yet.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">#</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Subscribed At</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {subscribers.map((subscriber, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900">{subscriber.email}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                      {subscriber.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Admins Tab */}
                  {activeTab === 'admins' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Manage Administrators</h2>
                        <button
                          onClick={() => setShowAddAdmin(!showAddAdmin)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                        >
                          <UserPlus size={20} />
                          <span>Add Admin</span>
                        </button>
                      </div>

                      {showAddAdmin && (
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Admin Account</h3>
                          <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                  type="text"
                                  value={newAdmin.name}
                                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B] focus:border-transparent"
                                  placeholder="Jane Doe"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                  type="email"
                                  value={newAdmin.email}
                                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B] focus:border-transparent"
                                  placeholder="admin@vsindia.org"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                              <input
                                type="password"
                                value={newAdmin.password}
                                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F6B6B] focus:border-transparent"
                                placeholder="Enter at least 6 characters"
                                minLength={6}
                                required
                              />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => setShowAddAdmin(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                              >
                                {loading ? 'Creating...' : 'Create Admin'}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                      
                      {admins.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No admins found.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {admins.map((admin, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{admin.name}</td>
                                  <td className="px-4 py-4 text-sm text-gray-600">{admin.email}</td>
                                  <td className="px-4 py-4 text-sm text-gray-600">
                                    <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                                      {admin.role || 'Admin'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4 text-right">
                                    {user?.id !== admin._id ? (
                                      <button 
                                        onClick={async () => {
                                          if (confirm('Are you sure you want to delete this admin account?')) {
                                            const response = await apiClient.deleteAdmin(admin._id);
                                            if (!response.error) {
                                              toast.success('Admin deleted successfully');
                                              loadData();
                                            } else {
                                              toast.error(response.error);
                                            }
                                          }
                                        }}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors inline-block"
                                        title="Delete Admin"
                                      >
                                        <Trash2 size={18} />
                                      </button>
                                    ) : (
                                      <span className="text-xs text-gray-400 italic">Current User</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Logo Tab */}
                  {activeTab === 'logo' && logoContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Site Logo Configuration</h2>
                        <button
                          onClick={handleSaveLogo}
                          className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                        >
                          <Save size={20} />
                          Save Changes
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 flex flex-col items-center justify-center gap-4">
                          <label className="block text-sm font-medium text-gray-700">Current LogoPreview</label>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center w-full max-w-md h-32">
                            {logoContent.url ? (
                              <img src={logoContent.url} alt="Site Logo" className="max-h-20 object-contain" />
                            ) : (
                              <span className="text-gray-400">No logo uploaded</span>
                            )}
                          </div>
                          
                          <div className="w-full max-w-md">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Logo</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoImageUpload}
                              disabled={uploadingLogo}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                            />
                            {uploadingLogo && <p className="text-sm text-[#0F6B6B] mt-2 flex items-center gap-2"><div className="w-4 h-4 border-2 border-[#0F6B6B] border-t-transparent rounded-full animate-spin"></div> Uploading...</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
