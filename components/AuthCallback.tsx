import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      const provider = searchParams.get('provider');

      if (error) {
        // Handle OAuth error
        window.opener?.postMessage({ type: 'OAUTH_ERROR', error }, window.location.origin);
        window.close();
        return;
      }

      if (code && state) {
        try {
          // Send the authorization code to the parent window
          window.opener?.postMessage({ 
            type: 'OAUTH_SUCCESS', 
            code, 
            state, 
            provider 
          }, window.location.origin);
          window.close();
        } catch (error) {
          console.error('OAuth callback error:', error);
          window.opener?.postMessage({ 
            type: 'OAUTH_ERROR', 
            error: 'Authentication failed' 
          }, window.location.origin);
          window.close();
        }
      } else {
        // No code or state, redirect to signin
        navigate('/signin');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing authentication...</h2>
        <p className="text-gray-600">Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
};

export default AuthCallback; 