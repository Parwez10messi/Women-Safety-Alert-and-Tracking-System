import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleGoogleSignIn() {
    let result;
    try {
      setError('');
      setLoading(true);
      result = await loginWithGoogle();
      if (result && !result.redirected) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to sign in with Google. Please try again.');
      setLoading(false);
    } finally {
      if (!result || !result.redirected) {
        setLoading(false);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      return setError('Please fill in all fields.');
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError(`Failed to log in: ${err.message || 'Please try again.'}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Mandala backdrop */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-96 h-96 opacity-[0.03] text-safety-purple-700 pointer-events-none animate-spin-slow -z-10">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2, 2" />
          {[...Array(12)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 30} 50 50)`}>
              <path d="M50,10 C52,25 48,25 50,10 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </g>
          ))}
        </svg>
      </div>

      <div className="w-full max-w-md z-10">
        
        {/* Glassmorphic Login Card */}
        <div className="glass-panel p-8 sm:p-10 shadow-2xl relative border border-white/70 overflow-hidden">
          {/* Card-level inner decorative mandala */}
          <div className="absolute -top-10 -right-10 w-24 h-24 opacity-[0.05] text-safety-purple-700 pointer-events-none animate-spin-slow">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
              {[...Array(8)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 45} 50 50)`}>
                  <path d="M50,10 C52,25 48,25 50,10 Z" stroke="currentColor" strokeWidth="1" fill="none" />
                </g>
              ))}
            </svg>
          </div>

          <div className="text-center mb-8 relative z-10 flex flex-col items-center">
            {/* Elegant Women Empowerment Silhouette Emblem */}
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-safety-purple-100 to-safety-pink-100 rounded-full blur-md opacity-70"></div>
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-safety-pink-500 relative z-10">
                <defs>
                  <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF1F2" />
                    <stop offset="100%" stopColor="#FECDD3" />
                  </linearGradient>
                  <linearGradient id="emblemHair" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#FF1493" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#emblemGrad)" stroke="#FF1493" strokeWidth="1" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="#EF4444" strokeWidth="0.5" opacity="0.3" />
                {/* Hair */}
                <path d="M38,65 C38,65 32,48 42,38 C48,32 58,32 62,38 C68,42 65,52 68,58 C70,62 78,68 78,68 C78,68 70,72 65,70 C60,68 59,62 55,62 C51,62 48,68 42,70 C38,72 38,65 38,65 Z" fill="url(#emblemHair)" opacity="0.9" />
                {/* Face outline */}
                <path d="M51,40 C52.5,41 54,42.5 54,45 C54,46 52.5,47 52,47.5 C51.5,48 51,49 51.5,50 C52,51 53.5,51.5 54,52.5 C52.5,54 49,56 47.5,56" stroke="#1E1B4B" strokeWidth="1" strokeLinecap="round" fill="none" />
                {/* Stars/Sparkles */}
                <path d="M30,32 L31,34 L33,35 L31,36 L30,38 L29,36 L27,35 L29,34 Z" fill="#FF1493" />
                <path d="M72,30 L73,32 L75,33 L73,34 L72,36 L71,34 L69,33 L71,32 Z" fill="#EF4444" />
                {/* Tiny Crown */}
                <path d="M47,28 L49,32 L53,30 L57,32 L59,28 L55,30 L53,26 L51,30 Z" fill="#FBBF24" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              <span className="gradient-text">Welcome Back</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Sign in to manage your emergency settings
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start space-x-3 text-red-700 text-sm animate-fadeIn">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white/50 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-safety-purple-500 focus:border-transparent transition-all text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white/50 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-safety-purple-500 focus:border-transparent transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 gradient-btn disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/80 px-2 text-slate-400 font-semibold backdrop-blur-sm">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition duration-200 flex items-center justify-center space-x-2.5 shadow-sm active:scale-[0.98]"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 1.84 14.96 1 12 1 7.35 1 3.39 3.67 1.5 7.58l3.7 2.87c.87-2.6 3.3-4.41 6.8-4.41z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.55z"
              />
              <path
                fill="#FBBC05"
                d="M5.2 14.55c-.22-.66-.35-1.37-.35-2.1s.13-1.44.35-2.1L1.5 7.48C.54 9.4 0 11.62 0 14s.54 4.6 1.5 6.52l3.7-2.97z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.1.74-2.52 1.18-4.3 1.18-3.5 0-5.93-1.81-6.8-4.41L1.5 16.98C3.39 20.89 7.35 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Redirect to Register */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm">
            <span className="text-slate-500">Don't have an account? </span>
            <Link to="/register" className="font-semibold text-safety-purple-700 hover:text-safety-purple-900 transition-colors">
              Register here
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
