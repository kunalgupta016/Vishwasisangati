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

type TabType = 'hero' | 'about-us' | 'navbar' | 'vision-mission' | 'our-work' | 'testimonials' | 'featured-project' | 'footer' | 'careers' | 'stats' | 'stories' | 'contacts' | 'subscribers' | 'admins' | 'logo' | 'team';

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

  // Careers state
  const [careersContent, setCareersContent] = useState<any>(null);
  const [uploadingCareersHero, setUploadingCareersHero] = useState(false);

  // Generic uploading state for dynamic indices
  const [uploadingTestimonialIndex, setUploadingTestimonialIndex] = useState<number | null>(null);
  const [uploadingOurWorkIndex, setUploadingOurWorkIndex] = useState<number | null>(null);
  const [uploadingEditTeamPhoto, setUploadingEditTeamPhoto] = useState(false);

  // Logo state
  const [logoContent, setLogoContent] = useState<any>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Team state
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [showAddTeamMember, setShowAddTeamMember] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<any>(null);
  const [newTeamMember, setNewTeamMember] = useState({ name: '', position: '', photo: '', bio: '', order: 0 });
  const [uploadingTeamPhoto, setUploadingTeamPhoto] = useState(false);

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
            { title: "Education Program", description: "Providing quality education through 27 evening tuition centers and 2 educational institutions.", image: "", icon: "GraduationCap", stats: "610+ Children", color: "#0F6B6B", slug: "education-program", fullDescription: "Detailed information about the education program.", highlights: ["27 evening tuition centers", "610+ children enrolled"] },
            { title: "Healthcare Initiative", description: "Delivering essential healthcare through 10 Primary Health Centers and medical camps.", image: "", icon: "Stethoscope", stats: "19,389 Visits", color: "#E87D3E", slug: "healthcare-initiative", fullDescription: "Detailed information about the healthcare initiative.", highlights: ["10 Primary Health Centers", "19,389 healthcare visits"] },
            { title: "Community Development", description: "Empowering 62 communities through relief & rehabilitation and women's skill training.", image: "", icon: "Users", stats: "62 Communities", color: "#0F6B6B", slug: "community-development", fullDescription: "Detailed information about community development programs.", highlights: ["62 communities supported", "465+ women trained"] }
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
            { label: "Our Team", href: "/team" },
            { label: "Careers", href: "/careers" },
            { label: "Blog", href: "#blog" }
          ],
          donateCta: { title: "Make a Difference Today", description: "Your contribution can change lives." },
          copyright: "© 2026 Vishwasi Sangati. All rights reserved."
        });
      } else if (activeTab === 'careers') {
        const response = await apiClient.getCareers();
        setCareersContent(response.data || {
          sectionSubtitle: "Careers",
          sectionTitle: "Join Our Team",
          sectionDescription: "Work with Vishwasi Sangati to support education, healthcare, and community-led development across rural India.",
          heroImage: "",
          introTitle: "Build meaningful change with us",
          introDescription: "We welcome people who care deeply about community development, field work, operations, communications, and program delivery.",
          benefits: ["Purpose-driven work with community impact", "Collaborative and supportive team culture"],
          jobs: []
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
      } else if (activeTab === 'team') {
        const response = await apiClient.getAllTeamMembers();
        if (response.data) {
          setTeamMembers(Array.isArray(response.data) ? response.data : []);
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

  const handleSaveCareers = async () => {
    if (!careersContent) return;
    setLoading(true);
    const response = await apiClient.updateCareers(careersContent);
    setLoading(false);
    if (response.error) { toast.error(response.error); } else { toast.success('Careers page updated successfully'); }
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

  // Team management functions
  const handleTeamPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTeamPhoto(true);
    const response = await apiClient.uploadMedia(file);
    setUploadingTeamPhoto(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setNewTeamMember({ ...newTeamMember, photo: response.url });
      toast.success('Photo uploaded successfully');
    }
  };

  const handleAddTeamMember = async () => {
    if (!newTeamMember.name || !newTeamMember.position) {
      toast.error('Name and position are required');
      return;
    }
    
    setLoading(true);
    const response = await apiClient.createTeamMember(newTeamMember);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setTeamMembers([...teamMembers, response.data]);
      setNewTeamMember({ name: '', position: '', photo: '', bio: '', order: teamMembers.length });
      setShowAddTeamMember(false);
      toast.success('Team member added successfully');
    }
  };

  const handleUpdateTeamMember = async () => {
    if (!editingTeamMember || !editingTeamMember.name || !editingTeamMember.position) {
      toast.error('Name and position are required');
      return;
    }

    setLoading(true);
    const response = await apiClient.updateTeamMember(editingTeamMember._id, editingTeamMember);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setTeamMembers(teamMembers.map(member => member._id === editingTeamMember._id ? response.data : member));
      setEditingTeamMember(null);
      toast.success('Team member updated successfully');
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    setLoading(true);
    const response = await apiClient.deleteTeamMember(id);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setTeamMembers(teamMembers.filter(member => member._id !== id));
      toast.success('Team member deleted successfully');
    }
  };

  const startEditingTeamMember = (member: any) => {
    setEditingTeamMember({ ...member });
  };

  const cancelEditingTeamMember = () => {
    setEditingTeamMember(null);
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

  // Testimonial image upload handler
  const handleTestimonialImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTestimonialIndex(index);
    const response = await apiClient.uploadMedia(file);
    setUploadingTestimonialIndex(null);

    if (response.error) {
      toast.error(response.error);
    } else {
      const items = [...testimonialsContent.testimonials];
      items[index].image = response.url;
      setTestimonialsContent({ ...testimonialsContent, testimonials: items });
      toast.success('Image uploaded successfully');
    }
  };

  // Our Work program image upload handler
  const handleOurWorkImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingOurWorkIndex(index);
    const response = await apiClient.uploadMedia(file);
    setUploadingOurWorkIndex(null);

    if (response.error) {
      toast.error(response.error);
    } else {
      const progs = [...ourWorkContent.programs];
      progs[index].image = response.url;
      setOurWorkContent({ ...ourWorkContent, programs: progs });
      toast.success('Image uploaded successfully');
    }
  };

  // Careers hero image upload handler
  const handleCareersHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCareersHero(true);
    const response = await apiClient.uploadMedia(file);
    setUploadingCareersHero(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setCareersContent({ ...careersContent, heroImage: response.url });
      toast.success('Image uploaded successfully');
    }
  };

  // Featured project image upload handler
  const handleFeaturedProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFeaturedProject(true);
    const response = await apiClient.uploadMedia(file);
    setUploadingFeaturedProject(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setFeaturedProjectContent({ ...featuredProjectContent, image: response.url });
      toast.success('Image uploaded successfully');
    }
  };

  // Edit team member photo upload handler
  const handleEditTeamPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingEditTeamPhoto(true);
    const response = await apiClient.uploadMedia(file);
    setUploadingEditTeamPhoto(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      setEditingTeamMember({ ...editingTeamMember, photo: response.url });
      toast.success('Photo uploaded successfully');
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
    { id: 'careers' as TabType, label: 'Careers', icon: Briefcase },
    { id: 'stats' as TabType, label: 'Impact Stats', icon: BarChart3 },
    { id: 'stories' as TabType, label: 'Impact Stories', icon: FileText },
    { id: 'contacts' as TabType, label: 'Contacts', icon: MessageSquare },
    { id: 'subscribers' as TabType, label: 'Subscribers', icon: Mail },
    { id: 'admins' as TabType, label: 'Admins', icon: UserPlus },
    { id: 'logo' as TabType, label: 'Site Logo', icon: Image },
    { id: 'team' as TabType, label: 'Team Members', icon: UserPlus },
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
                          <button onClick={() => setOurWorkContent({ ...ourWorkContent, programs: [...(ourWorkContent.programs || []), { title: 'New Program', slug: 'new-program', description: 'Description', image: '', icon: 'Heart', stats: '0', color: '#0F6B6B', fullDescription: 'Add full details for this program.', highlights: ['Key detail'] }] })} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><Plus size={20} />Add Program</button>
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
                            <div className="grid grid-cols-2 gap-2">
                              <input type="text" value={prog.slug || ''} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].slug = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="URL Slug (e.g. education-program)" />
                              <input type="text" value={prog.stats} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].stats = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Stats (e.g. 610+ Children)" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Program Image</label>
                              {prog.image && (
                                <img src={prog.image} alt={prog.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                              )}
                              <input type="text" value={prog.image} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].image = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Paste image URL here" />
                              <div className="flex items-center gap-2 my-2">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-xs text-gray-400 font-medium">OR</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="file" accept="image/*" onChange={(e) => handleOurWorkImageUpload(e, index)} disabled={uploadingOurWorkIndex === index} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50" />
                                {uploadingOurWorkIndex === index && <div className="w-5 h-5 border-2 border-[#0F6B6B] border-t-transparent rounded-full animate-spin"></div>}
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
                              <select value={prog.icon} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].icon = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                <option value="GraduationCap">Graduation</option><option value="Stethoscope">Stethoscope</option><option value="Users">Users</option><option value="Heart">Heart</option><option value="BookOpen">Book</option><option value="Home">Home</option>
                              </select>
                            </div>
                            <textarea value={prog.fullDescription || ''} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].fullDescription = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Full detail page description" />
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700">Detail Bullets</label>
                                <button onClick={() => { const progs = [...ourWorkContent.programs]; progs[index].highlights = [...(progs[index].highlights || []), 'New detail']; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} className="inline mr-1" />Add Detail</button>
                              </div>
                              {(prog.highlights || []).map((detail: string, detailIndex: number) => (
                                <div key={detailIndex} className="flex gap-2">
                                  <input type="text" value={detail} onChange={(e) => { const progs = [...ourWorkContent.programs]; progs[index].highlights[detailIndex] = e.target.value; setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Detail bullet" />
                                  <button onClick={() => { const progs = [...ourWorkContent.programs]; progs[index].highlights = progs[index].highlights.filter((_: any, i: number) => i !== detailIndex); setOurWorkContent({ ...ourWorkContent, programs: progs }); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                              ))}
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
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Profile Image</label>
                              {t.image && (
                                <img src={t.image} alt={t.name} className="w-16 h-16 object-cover rounded-full mb-2" />
                              )}
                              <input type="text" value={t.image} onChange={(e) => { const items = [...testimonialsContent.testimonials]; items[index].image = e.target.value; setTestimonialsContent({ ...testimonialsContent, testimonials: items }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Paste image URL here" />
                              <div className="flex items-center gap-2 my-2">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-xs text-gray-400 font-medium">OR</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="file" accept="image/*" onChange={(e) => handleTestimonialImageUpload(e, index)} disabled={uploadingTestimonialIndex === index} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50" />
                                {uploadingTestimonialIndex === index && <div className="w-5 h-5 border-2 border-[#0F6B6B] border-t-transparent rounded-full animate-spin"></div>}
                              </div>
                            </div>
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
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                          {featuredProjectContent.image && (
                            <img src={featuredProjectContent.image} alt="Featured Project" className="w-full h-48 object-cover rounded-lg mb-2" />
                          )}
                          <input type="text" value={featuredProjectContent.image || ''} onChange={(e) => setFeaturedProjectContent({ ...featuredProjectContent, image: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Paste image URL here" />
                          <div className="flex items-center gap-2 my-2">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-xs text-gray-400 font-medium">OR</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="file" accept="image/*" onChange={handleFeaturedProjectImageUpload} disabled={uploadingFeaturedProject} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50" />
                            {uploadingFeaturedProject && <div className="w-5 h-5 border-2 border-[#0F6B6B] border-t-transparent rounded-full animate-spin"></div>}
                          </div>
                        </div>
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

                  {/* Careers Tab */}
                  {activeTab === 'careers' && careersContent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Careers Page</h2>
                        <div className="flex gap-2">
                          <button onClick={() => setCareersContent({ ...careersContent, jobs: [...(careersContent.jobs || []), { title: 'New Opening', location: 'Location', type: 'Full-time', summary: 'Role summary', requirements: ['Requirement'], applyEmail: careersContent.applyEmail || 'vishwasisangati@gmail.com' }] })} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><Plus size={20} />Add Opening</button>
                          <button onClick={handleSaveCareers} className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"><Save size={20} />Save Changes</button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label><input type="text" value={careersContent.sectionSubtitle || ''} onChange={(e) => setCareersContent({ ...careersContent, sectionSubtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label><input type="text" value={careersContent.sectionTitle || ''} onChange={(e) => setCareersContent({ ...careersContent, sectionTitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Page Description</label><textarea value={careersContent.sectionDescription || ''} onChange={(e) => setCareersContent({ ...careersContent, sectionDescription: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                          {careersContent.heroImage && (
                            <img src={careersContent.heroImage} alt="Careers Hero" className="w-full h-48 object-cover rounded-lg mb-2" />
                          )}
                          <input type="text" value={careersContent.heroImage || ''} onChange={(e) => setCareersContent({ ...careersContent, heroImage: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Paste image URL here" />
                          <div className="flex items-center gap-2 my-2">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-xs text-gray-400 font-medium">OR</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="file" accept="image/*" onChange={handleCareersHeroImageUpload} disabled={uploadingCareersHero} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50" />
                            {uploadingCareersHero && <div className="w-5 h-5 border-2 border-[#0F6B6B] border-t-transparent rounded-full animate-spin"></div>}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><label className="block text-sm font-medium text-gray-700 mb-2">Intro Title</label><input type="text" value={careersContent.introTitle || ''} onChange={(e) => setCareersContent({ ...careersContent, introTitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                          <div><label className="block text-sm font-medium text-gray-700 mb-2">Default Apply Email</label><input type="email" value={careersContent.applyEmail || ''} onChange={(e) => setCareersContent({ ...careersContent, applyEmail: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="vishwasisangati@gmail.com" /></div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Intro Description</label><textarea value={careersContent.introDescription || ''} onChange={(e) => setCareersContent({ ...careersContent, introDescription: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div>
                          <div className="flex items-center justify-between mb-2"><label className="block text-sm font-medium text-gray-700">Benefits</label><button onClick={() => setCareersContent({ ...careersContent, benefits: [...(careersContent.benefits || []), 'New benefit'] })} className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} className="inline mr-1" />Add Benefit</button></div>
                          <div className="space-y-2">
                            {(careersContent.benefits || []).map((benefit: string, i: number) => (
                              <div key={i} className="flex gap-2">
                                <input type="text" value={benefit} onChange={(e) => { const benefits = [...careersContent.benefits]; benefits[i] = e.target.value; setCareersContent({ ...careersContent, benefits }); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                <button onClick={() => setCareersContent({ ...careersContent, benefits: careersContent.benefits.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          {(careersContent.jobs || []).map((job: any, index: number) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                              <button onClick={() => setCareersContent({ ...careersContent, jobs: careersContent.jobs.filter((_: any, i: number) => i !== index) })} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                              <input type="text" value={job.title || ''} onChange={(e) => { const jobs = [...careersContent.jobs]; jobs[index].title = e.target.value; setCareersContent({ ...careersContent, jobs }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold" placeholder="Job Title" />
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input type="text" value={job.location || ''} onChange={(e) => { const jobs = [...careersContent.jobs]; jobs[index].location = e.target.value; setCareersContent({ ...careersContent, jobs }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Location" />
                                <input type="text" value={job.type || ''} onChange={(e) => { const jobs = [...careersContent.jobs]; jobs[index].type = e.target.value; setCareersContent({ ...careersContent, jobs }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Type" />
                                <input type="email" value={job.applyEmail || ''} onChange={(e) => { const jobs = [...careersContent.jobs]; jobs[index].applyEmail = e.target.value; setCareersContent({ ...careersContent, jobs }); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Apply Email" />
                              </div>
                              <textarea value={job.summary || ''} onChange={(e) => { const jobs = [...careersContent.jobs]; jobs[index].summary = e.target.value; setCareersContent({ ...careersContent, jobs }); }} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Role Summary" />
                              <div>
                                <div className="flex items-center justify-between mb-2"><label className="block text-sm font-medium text-gray-700">Requirements</label><button onClick={() => { const jobs = [...careersContent.jobs]; jobs[index].requirements = [...(jobs[index].requirements || []), 'New requirement']; setCareersContent({ ...careersContent, jobs }); }} className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} className="inline mr-1" />Add Requirement</button></div>
                                <div className="space-y-2">
                                  {(job.requirements || []).map((req: string, reqIndex: number) => (
                                    <div key={reqIndex} className="flex gap-2">
                                      <input type="text" value={req} onChange={(e) => { const jobs = [...careersContent.jobs]; jobs[index].requirements[reqIndex] = e.target.value; setCareersContent({ ...careersContent, jobs }); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                      <button onClick={() => { const jobs = [...careersContent.jobs]; jobs[index].requirements = jobs[index].requirements.filter((_: any, i: number) => i !== reqIndex); setCareersContent({ ...careersContent, jobs }); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
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

                  {/* Team Tab */}
                  {activeTab === 'team' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                        <button
                          onClick={() => setShowAddTeamMember(true)}
                          className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                        >
                          <Plus size={20} />
                          Add Team Member
                        </button>
                      </div>

                      {/* Add Team Member Form */}
                      {showAddTeamMember && (
                        <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Team Member</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                              <input
                                type="text"
                                value={newTeamMember.name}
                                onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Full name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                              <input
                                type="text"
                                value={newTeamMember.position}
                                onChange={(e) => setNewTeamMember({ ...newTeamMember, position: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Job title"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                              <textarea
                                value={newTeamMember.bio}
                                onChange={(e) => setNewTeamMember({ ...newTeamMember, bio: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Brief description"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Photo *</label>
                              <div className="flex gap-4 items-center">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleTeamPhotoUpload}
                                  disabled={uploadingTeamPhoto}
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                                />
                                {uploadingTeamPhoto && <div className="w-6 h-6 border-2 border-[#0F6B6B] border-t-transparent rounded-full animate-spin"></div>}
                              </div>
                              {newTeamMember.photo && (
                                <div className="mt-2">
                                  <img src={newTeamMember.photo} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <button
                              onClick={handleAddTeamMember}
                              disabled={loading}
                              className="px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] disabled:opacity-50"
                            >
                              {loading ? 'Adding...' : 'Add Member'}
                            </button>
                            <button
                              onClick={() => setShowAddTeamMember(false)}
                              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Edit Team Member Form */}
                      {editingTeamMember && (
                        <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Team Member</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                              <input
                                type="text"
                                value={editingTeamMember.name}
                                onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                              <input
                                type="text"
                                value={editingTeamMember.position}
                                onChange={(e) => setEditingTeamMember({ ...editingTeamMember, position: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                              <textarea
                                value={editingTeamMember.bio}
                                onChange={(e) => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Photo *</label>
                              {editingTeamMember.photo && (
                                <div className="mb-2">
                                  <img src={editingTeamMember.photo} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                                </div>
                              )}
                              <input
                                type="text"
                                value={editingTeamMember.photo}
                                onChange={(e) => setEditingTeamMember({ ...editingTeamMember, photo: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Paste image URL here"
                              />
                              <div className="flex items-center gap-2 my-2">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-xs text-gray-400 font-medium">OR</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleEditTeamPhotoUpload}
                                  disabled={uploadingEditTeamPhoto}
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                                />
                                {uploadingEditTeamPhoto && <div className="w-5 h-5 border-2 border-[#0F6B6B] border-t-transparent rounded-full animate-spin"></div>}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <button
                              onClick={handleUpdateTeamMember}
                              disabled={loading}
                              className="px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] disabled:opacity-50"
                            >
                              {loading ? 'Updating...' : 'Update Member'}
                            </button>
                            <button
                              onClick={cancelEditingTeamMember}
                              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Team Members List */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member) => (
                          <div key={member._id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                              {member.photo ? (
                                <img
                                  src={member.photo}
                                  alt={member.name}
                                  className="w-16 h-16 object-cover rounded-full"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-[#0F6B6B] flex items-center justify-center">
                                  <span className="text-white font-bold text-xl">
                                    {member.name?.charAt(0)?.toUpperCase() || '?'}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                <p className="text-[#E87D3E] text-sm">{member.position}</p>
                              </div>
                            </div>
                            {member.bio && (
                              <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEditingTeamMember(member)}
                                className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTeamMember(member._id)}
                                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {teamMembers.length === 0 && !showAddTeamMember && !editingTeamMember && (
                        <div className="text-center py-12 text-gray-500">
                          <UserPlus size={48} className="mx-auto mb-4 opacity-50" />
                          <p>No team members added yet. Click "Add Team Member" to get started.</p>
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
