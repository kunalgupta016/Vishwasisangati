import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dff980ef`;

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private getAuthHeader() {
    const accessToken = localStorage.getItem('access_token');
    return accessToken ? `Bearer ${accessToken}` : `Bearer ${publicAnonKey}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeader(),
        ...options.headers,
      };

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

  // Media endpoints
  async uploadMedia(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': accessToken ? `Bearer ${accessToken}` : `Bearer ${publicAnonKey}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Media upload error:', data.error);
        return { error: data.error || 'Failed to upload media' };
      }

      return data;
    } catch (error) {
      console.error('Media upload error:', error);
      return { error: 'Failed to upload media' };
    }
  }

  async getSignedUrl(path: string) {
    return this.request('/media/signed-url', {
      method: 'POST',
      body: JSON.stringify({ path }),
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
}

export const apiClient = new ApiClient();
