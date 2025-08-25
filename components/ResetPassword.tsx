import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Mail, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <Link to="/" className="flex items-center justify-center mb-8">
              <BarChart3 className="h-10 w-10 text-purple-600" />
              <span className="ml-2 text-2xl font-bold text-slate-900">TradeIQ Pro</span>
            </Link>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Check your email</h2>
            <p className="text-slate-600 mb-8">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full"
              >
                Try another email
              </Button>
              <Link
                to="/signin"
                className="block text-center text-purple-600 hover:text-purple-500 font-medium"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Panel - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center mb-8">
              <BarChart3 className="h-10 w-10 text-purple-600" />
              <span className="ml-2 text-2xl font-bold text-slate-900">TradeIQ Pro</span>
            </Link>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Forgot your password?</h2>
            <p className="text-slate-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Reset Form */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
            >
              Send reset link
            </Button>
          </form>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              to="/signin"
              className="inline-flex items-center text-purple-600 hover:text-purple-500 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Info */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-800 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <BarChart3 className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h3 className="text-2xl font-bold mb-4">
              Get back to optimizing your Amazon business
            </h3>
            <p className="text-purple-100 text-lg mb-8">
              Reset your password and continue tracking your products with AI-powered insights.
            </p>
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-purple-100">Secure password recovery</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-purple-100">Quick email verification</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-purple-100">Instant access restoration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 