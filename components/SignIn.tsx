import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle, signInWithFacebook, error: authError, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);

  // Get the redirect path from location state, or default to products
  const from = (location.state as any)?.from?.pathname || '/products';

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    
    try {
      await signInWithFacebook();
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      await handleSignIn(formData.email, formData.password);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleGoogleSignInClick = async () => {
    clearError();
    try {
      await handleGoogleSignIn();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleFacebookSignInClick = async () => {
    clearError();
    try {
      await handleFacebookSignIn();
    } catch (error) {
      console.error('Facebook sign in error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (authError) clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center mb-8">
              <BarChart3 className="h-10 w-10 text-purple-600" />
              <span className="ml-2 text-2xl font-bold text-slate-900">TradeIQ Pro</span>
            </Link>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-600">Sign in to your account to continue</p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700 text-sm">{authError}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))
                  }
                  disabled={loading}
                />
                <Label htmlFor="remember-me" className="text-sm text-slate-600">
                  Remember me
                </Label>
              </div>
              <div className="text-sm">
                <Link to="/reset-password" className="text-purple-600 hover:text-purple-500 font-medium">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-50 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2 hover:bg-red-50 hover:border-red-200" 
              onClick={handleGoogleSignInClick}
              disabled={loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2 hover:bg-blue-50 hover:border-blue-200" 
              onClick={handleFacebookSignInClick}
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </Button>
          </div>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-800 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <BarChart3 className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h3 className="text-2xl font-bold mb-4">Join 10,000+ successful Amazon sellers</h3>
            <p className="text-purple-100 text-lg mb-8">
              Track performance, optimize listings, and grow your revenue with AI-powered insights.
            </p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[
                'Real-time analytics dashboard',
                'AI-powered recommendations',
                'Automated listing optimization',
              ].map((text) => (
                <div key={text} className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  <span className="text-purple-100">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 