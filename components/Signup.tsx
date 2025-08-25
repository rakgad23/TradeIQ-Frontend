import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, error: authError, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    
    try {
      await signUp(email, password, firstName, lastName);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (authError) clearError();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const { email, password, firstName, lastName } = formData;

    try {
      await handleSignUp(email, password, firstName, lastName);
    } catch (error) {
      console.error('Signup error:', error);
    }
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
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
            <p className="text-slate-600">Start optimizing your Amazon sales</p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700 text-sm">{authError}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="pl-10"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="pl-10"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

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
                  required
                  className="pl-10"
                  placeholder="you@example.com"
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
                  required
                  className="pl-10 pr-10"
                  placeholder="Create a password"
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
                  {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-800 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <BarChart3 className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h3 className="text-2xl font-bold mb-4">Unlock powerful insights</h3>
            <p className="text-purple-100 text-lg mb-8">
              Get started with AI-powered tools to grow your FBA business
            </p>
            <ul className="space-y-2 text-left">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-purple-100">Real-time market tracking</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-purple-100">Product opportunity insights</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-purple-100">Automated listing optimization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 