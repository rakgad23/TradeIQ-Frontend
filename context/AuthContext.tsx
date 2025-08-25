import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from 'react';

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, first_name?: string, last_name?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      
      // Simple mock authentication - accept any email/password for demo
      // In a real app, this would make an API call
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user data
      const userData: User = {
        id: '1',
        email: email,
        first_name: email.split('@')[0], // Use email prefix as first name
        last_name: 'Demo'
      };
      
      // Store mock tokens and user data
      localStorage.setItem('access_token', 'mock-access-token');
      localStorage.setItem('refresh_token', 'mock-refresh-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, first_name?: string, last_name?: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      
      // Simple mock registration - accept any valid email/password for demo
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user data
      const userData: User = {
        id: '1',
        email: email,
        first_name: first_name || email.split('@')[0],
        last_name: last_name || 'Demo'
      };
      
      // Store mock tokens and user data
      localStorage.setItem('access_token', 'mock-access-token');
      localStorage.setItem('refresh_token', 'mock-refresh-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user data for Google sign-in
      const userData: User = {
        id: '1',
        email: 'demo@google.com',
        first_name: 'Google',
        last_name: 'User'
      };
      
      localStorage.setItem('access_token', 'mock-google-access-token');
      localStorage.setItem('refresh_token', 'mock-google-refresh-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error: any) {
      const errorMessage = error.message || 'Google login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async (): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user data for Facebook sign-in
      const userData: User = {
        id: '1',
        email: 'demo@facebook.com',
        first_name: 'Facebook',
        last_name: 'User'
      };
      
      localStorage.setItem('access_token', 'mock-facebook-access-token');
      localStorage.setItem('refresh_token', 'mock-facebook-refresh-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error: any) {
      const errorMessage = error.message || 'Facebook login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      // In a real app, this would make an API call to logout
      console.log('Signing out...');
    } catch (e) {
      console.warn("Logout request failed, but clearing local data");
    } finally {
      // Clear all auth data
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setUser(null);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };
  
  const value: AuthContextValue = { 
    user, 
    loading, 
    signIn, 
    signUp, 
    signInWithGoogle,
    signInWithFacebook,
    signOut, 
    error, 
    clearError 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 