/// <reference types="vite/client" />
const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const envApiUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_URL : null;
const API_BASE_URL = isLocalhost ? 'http://localhost:5000/api' : (envApiUrl || 'https://vishwasisangati.onrender.com/api');

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  token?: string;
  user?: any;
}

class ApiClient {
  private getAuthHeader() {
    const token = localStorage.getItem('access_token');
    return token ? `Bearer ${token}` : '';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers as Record<string, string>,
      };

      const authHeader = this.getAuthHeader();
      if (authHeader) {
        headers['Authorization'] = authHeader;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`API Error [${endpoint}]:`, data.error);
        return { error: data.error || 'An error occurred' };
      }

      return data;
    } catch (error) {
      console.error(`API Request Error [${endpoint}]:`, error);
      return { error: 'Failed to connect to server' };
    }
  }

  // Auth endpoints
  async signUp(email: string, password: string, name: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async verifyToken() {
    return this.request('/auth/me');
  }

  // Admin Management endpoints
  async getAdmins() {
    return this.request('/auth/admins');
  }

  async createAdmin(data: { name: string; email: string; password: string }) {
    return this.request('/auth/admins', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteAdmin(id: string) {
    return this.request(`/auth/admins/${id}`, {
      method: 'DELETE',
    });
  }

  // Content endpoints
  async getHeroContent() {
    return this.request('/content/hero');
  }

  async updateHeroContent(content: any) {
    return this.request('/content/hero', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  async getImpactStats() {
    return this.request('/content/impact-stats');
  }

  async updateImpactStats(stats: any[]) {
    return this.request('/content/impact-stats', {
      method: 'PUT',
      body: JSON.stringify({ stats }),
    });
  }

  async getImpactStories() {
    return this.request('/content/impact-stories');
  }

  async updateImpactStories(stories: any[]) {
    return this.request('/content/impact-stories', {
      method: 'PUT',
      body: JSON.stringify({ stories }),
    });
  }

  // Contact endpoints
  async submitContact(data: { name: string; email: string; phone?: string; message: string }) {
    return this.request('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAllContacts() {
    return this.request('/contact/all');
  }

  // Newsletter endpoints
  async subscribeNewsletter(email: string) {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getNewsletterSubscribers() {
    return this.request('/newsletter/subscribers');
  }

  // About Us content endpoints
  async getAboutUs() {
    return this.request('/content/about-us');
  }

  async updateAboutUs(content: any) {
    return this.request('/content/about-us', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Navbar content endpoints
  async getNavbar() {
    return this.request('/content/navbar');
  }

  async updateNavbar(content: any) {
    return this.request('/content/navbar', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Vision & Mission content endpoints
  async getVisionMission() {
    return this.request('/content/vision-mission');
  }

  async updateVisionMission(content: any) {
    return this.request('/content/vision-mission', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Our Work content endpoints
  async getOurWork() {
    return this.request('/content/our-work');
  }

  async updateOurWork(content: any) {
    return this.request('/content/our-work', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Testimonials content endpoints
  async getTestimonials() {
    return this.request('/content/testimonials');
  }

  async updateTestimonials(content: any) {
    return this.request('/content/testimonials', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Featured Project content endpoints
  async getFeaturedProject() {
    return this.request('/content/featured-project');
  }

  async updateFeaturedProject(content: any) {
    return this.request('/content/featured-project', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Footer content endpoints
  async getFooter() {
    return this.request('/content/footer');
  }

  async updateFooter(content: any) {
    return this.request('/content/footer', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Careers content endpoints
  async getCareers() {
    return this.request('/content/careers');
  }

  async updateCareers(content: any) {
    return this.request('/content/careers', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Logo content endpoints
  async getLogo() {
    return this.request('/content/logo');
  }

  async updateLogo(content: any) {
    return this.request('/content/logo', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // Media endpoints
  async uploadMedia(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const authHeader = this.getAuthHeader();
      const headers: Record<string, string> = {};
      if (authHeader) headers['Authorization'] = authHeader;

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Upload API Error:', data.error);
        return { error: data.error || 'Failed to upload media' };
      }
      return { url: data.url };
    } catch (error) {
      console.error('Upload request failed:', error);
      return { error: 'Failed to connect to server for upload' };
    }
  }

  // Team endpoints
  async getTeamMembers() {
    return this.request('/team');
  }

  async getAllTeamMembers() {
    return this.request('/team/all');
  }

  async createTeamMember(data: { name: string; position: string; photo: string; bio?: string; order?: number }) {
    return this.request('/team', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTeamMember(id: string, data: { name: string; position: string; photo: string; bio?: string; order?: number; isActive?: boolean }) {
    return this.request(`/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTeamMember(id: string) {
    return this.request(`/team/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
