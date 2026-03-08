import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../../utils/api/client';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('access_token');
    if (token) {
      apiClient.verifyToken()
        .then((response) => {
          if (response.user) {
            setUser(response.user);
          } else {
            localStorage.removeItem('access_token');
          }
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('access_token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);

      if (response.error) {
        return { error: response.error };
      }

      if (response.token) {
        localStorage.setItem('access_token', response.token);
        setUser(response.user);
      }

      return {};
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error: 'Failed to sign in' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
