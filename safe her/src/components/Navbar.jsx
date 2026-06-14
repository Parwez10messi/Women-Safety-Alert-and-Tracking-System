import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, LogOut, User, Menu, X, LayoutDashboard, Home } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `
    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1.5
    ${isActive(path)
      ? 'bg-safety-purple-100 text-safety-purple-800'
      : 'text-slate-600 hover:bg-slate-50 hover:text-safety-purple-700'}
  `;

  const mobileLinkClass = (path) => `
    block px-4 py-2.5 rounded-lg text-base font-semibold transition-colors duration-200 flex items-center space-x-2
    ${isActive(path)
      ? 'bg-safety-purple-100 text-safety-purple-800'
      : 'text-slate-600 hover:bg-slate-50 hover:text-safety-purple-700'}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-safety-purple-100/60 shadow-sm shadow-safety-purple-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold font-display tracking-tight text-slate-800">
              <span className="p-1 rounded-lg bg-white border border-safety-pink-100 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 100 100" className="h-6 w-6">
                  <defs>
                    <linearGradient id="butterflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                    <linearGradient id="butterflyGradLower" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F43F5E" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  {/* Left Wings */}
                  <g>
                    <path d="M 48 46 C 45 28 22 12 10 25 C 0 35 15 54 32 52 C 42 51 46 48 48 46 Z" fill="url(#butterflyGrad)" />
                    <path d="M 45 44 C 42 30 25 20 16 29 C 10 35 20 48 30 46 C 38 45 43 43 45 44 Z" fill="#FFFFFF" fillOpacity="0.3" />
                    <path d="M 47 49 C 42 52 30 55 20 62 C 10 68 14 80 26 80 C 38 80 45 62 47 49 Z" fill="url(#butterflyGradLower)" />
                    <path d="M 44 51 C 40 53 32 55 24 60 C 16 64 18 73 25 73 C 33 73 41 61 44 51 Z" fill="#FFFFFF" fillOpacity="0.25" />
                  </g>
                  {/* Right Wings (Mirrored) */}
                  <g transform="translate(100, 0) scale(-1, 1)">
                    <path d="M 48 46 C 45 28 22 12 10 25 C 0 35 15 54 32 52 C 42 51 46 48 48 46 Z" fill="url(#butterflyGrad)" />
                    <path d="M 45 44 C 42 30 25 20 16 29 C 10 35 20 48 30 46 C 38 45 43 43 45 44 Z" fill="#FFFFFF" fillOpacity="0.3" />
                    <path d="M 47 49 C 42 52 30 55 20 62 C 10 68 14 80 26 80 C 38 80 45 62 47 49 Z" fill="url(#butterflyGradLower)" />
                    <path d="M 44 51 C 40 53 32 55 24 60 C 16 64 18 73 25 73 C 33 73 41 61 44 51 Z" fill="#FFFFFF" fillOpacity="0.25" />
                  </g>
                  {/* Antennae */}
                  <path d="M 48 28 C 45 20 37 18 36 12" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <circle cx="36" cy="12" r="2" fill="#1E1B4B" />
                  <path d="M 52 28 C 55 20 63 18 64 12" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <circle cx="64" cy="12" r="2" fill="#1E1B4B" />
                  {/* Head & Body */}
                  <circle cx="50" cy="30" r="4.5" fill="#1E1B4B" />
                  <path d="M 50 32 C 52 32 53 38 53 52 C 53 66 52 75 50 75 C 48 75 47 66 47 52 C 47 38 48 32 50 32 Z" fill="#1E1B4B" />
                </svg>
              </span>
              <span>
                Safe<span className="text-safety-pink-500">Her</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={linkClass('/')}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {currentUser ? (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard')}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className={linkClass('/profile')}>
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={linkClass('/login')}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-medium gradient-btn"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-safety-purple-700 hover:bg-slate-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-fadeIn duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={mobileLinkClass('/')}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClass('/dashboard')}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClass('/profile')}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2.5 rounded-lg text-base font-semibold text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2 px-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg font-semibold gradient-btn"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
