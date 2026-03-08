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
  Eye
} from 'lucide-react';
import { apiClient } from '../../utils/api/client';
import { toast } from 'sonner';

type TabType = 'hero' | 'stats' | 'stories' | 'contacts' | 'subscribers';

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [loading, setLoading] = useState(false);

  // Hero content state
  const [heroContent, setHeroContent] = useState<any>(null);
  const [uploadingHero, setUploadingHero] = useState(false);

  // Stats state
  const [stats, setStats] = useState<any[]>([]);

  // Stories state
  const [stories, setStories] = useState<any[]>([]);

  // Contacts state
  const [contacts, setContacts] = useState<any[]>([]);

  // Subscribers state
  const [subscribers, setSubscribers] = useState<any[]>([]);

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
      } else if (activeTab === 'stats') {
        const response = await apiClient.getImpactStats();
        if (response.data) {
          setStats(Array.isArray(response.data) ? response.data : response.data.map((item: any) => item.value));
        }
      } else if (activeTab === 'stories') {
        const response = await apiClient.getImpactStories();
        if (response.data) {
          setStories(Array.isArray(response.data) ? response.data : response.data.map((item: any) => item.value));
        }
      } else if (activeTab === 'contacts') {
        const response = await apiClient.getAllContacts();
        if (response.data) {
          setContacts(response.data.map((item: any) => item.value));
        }
      } else if (activeTab === 'subscribers') {
        const response = await apiClient.getNewsletterSubscribers();
        if (response.data) {
          setSubscribers(response.data.map((item: any) => item.value));
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
        title: 'New Story',
        description: 'Story description',
        image: '',
        category: 'General',
        impact: '0'
      }
    ]);
  };

  const removeStory = (index: number) => {
    setStories(stories.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: 'hero' as TabType, label: 'Hero Section', icon: Image },
    { id: 'stats' as TabType, label: 'Impact Stats', icon: BarChart3 },
    { id: 'stories' as TabType, label: 'Impact Stories', icon: FileText },
    { id: 'contacts' as TabType, label: 'Contacts', icon: MessageSquare },
    { id: 'subscribers' as TabType, label: 'Subscribers', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="text-[#0F6B6B]" size={32} />
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

                  {/* Impact Stats Tab */}
                  {activeTab === 'stats' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Impact Statistics</h2>
                        <button
                          onClick={handleSaveStats}
                          className="flex items-center gap-2 px-6 py-2 bg-[#0F6B6B] text-white rounded-lg hover:bg-[#0d5757] transition-colors"
                        >
                          <Save size={20} />
                          Save Changes
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-2">
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
                                value={story.title}
                                onChange={(e) => {
                                  const newStories = [...stories];
                                  newStories[index].title = e.target.value;
                                  setStories(newStories);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Title"
                              />
                              <input
                                type="text"
                                value={story.category}
                                onChange={(e) => {
                                  const newStories = [...stories];
                                  newStories[index].category = e.target.value;
                                  setStories(newStories);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Category"
                              />
                            </div>

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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
