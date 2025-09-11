import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthAPI, TokenManager } from '../lib/authApi';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  is_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = TokenManager.getAccessToken();
      
      if (accessToken) {
        try {
          const userData = await AuthAPI.getCurrentUser(accessToken);
          setUser(userData);
        } catch (error) {
          console.error('Failed to get user data:', error);
          // Token might be expired, clear it
          TokenManager.clearTokens();
        }
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthAPI.login({ email, password });
      TokenManager.setTokens(response.access_token, response.refresh_token);
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await AuthAPI.register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
      TokenManager.setTokens(response.access_token, response.refresh_token);
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    TokenManager.clearTokens();
    setUser(null);
  };

  const refreshUser = async () => {
    const accessToken = TokenManager.getAccessToken();
    if (accessToken) {
      try {
        const userData = await AuthAPI.getCurrentUser(accessToken);
        setUser(userData);
      } catch (error) {
        console.error('Failed to refresh user data:', error);
        logout();
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};