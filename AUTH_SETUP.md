# Authentication Setup for TradeIQ Frontend

This document describes the authentication system that has been added to the TradeIQ Frontend to work with the backend.

## Overview

The authentication system includes:

1. **AuthContext** - Manages authentication state and provides auth methods
2. **API Client** - Handles API requests with automatic token management
3. **Protected Routes** - Ensures only authenticated users can access certain pages
4. **Sign In/Sign Up Components** - Updated to use real authentication
5. **OAuth Support** - Google and Facebook authentication

## Files Added/Modified

### New Files:
- `lib/api.ts` - API client with authentication interceptors
- `context/AuthContext.tsx` - Authentication context and state management
- `components/ProtectedRoute.tsx` - Route protection component
- `components/AuthCallback.tsx` - OAuth callback handler

### Modified Files:
- `App.tsx` - Added routing and authentication providers
- `components/SignIn.tsx` - Updated to use real authentication
- `components/Signup.tsx` - Updated to use real authentication
- `components/LeftSidebar.tsx` - Added logout functionality and user display

## Features

### Authentication Methods:
- Email/Password login
- Email/Password registration
- Google OAuth
- Facebook OAuth
- Automatic token refresh
- Session persistence

### Security Features:
- JWT token management
- Automatic token refresh on 401 errors
- Secure token storage in localStorage
- Protected routes with automatic redirects

## Usage

### Environment Variables:
Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:3000
```

### Using Authentication in Components:

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, signIn, signOut, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <div>Please sign in</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Protected Routes:

```tsx
import ProtectedRoute from './components/ProtectedRoute';

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## API Endpoints

The authentication system expects these backend endpoints:

- `POST /auth/login` - Email/password login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `GET /social-auth/url/google` - Get Google OAuth URL
- `GET /social-auth/url/facebook` - Get Facebook OAuth URL

## Token Management

- Access tokens are automatically added to API requests
- Refresh tokens are used to get new access tokens when they expire
- Tokens are stored in localStorage
- Failed authentication redirects to the sign-in page

## OAuth Flow

1. User clicks Google/Facebook sign-in button
2. OAuth popup opens with the provider's authorization URL
3. User authorizes the application
4. Provider redirects to `/auth/callback` with authorization code
5. Callback component sends code to parent window
6. Parent window exchanges code for tokens via backend
7. User is signed in and redirected to dashboard 