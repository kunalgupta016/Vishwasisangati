const API_BASE_URL = 'https://vishwasi-sangati-api.onrender.com/api'

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

  // Media endpoints
  async uploadMedia(file: File) {
    // For a real implementation, you'd send FormData to an upload endpoint
    // and return the hosted URL. Since we don't have a media storage backend 
    // configured (like S3 or Supabase Storage), we will simulate success or
    // return a placeholder.
    return new Promise<{url?: string, error?: string}>((resolve) => {
      setTimeout(() => {
        resolve({ url: URL.createObjectURL(file) });
      }, 1000);
    });
  }
}

export const apiClient = new ApiClient();
