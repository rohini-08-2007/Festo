import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NavigationPage, UserRole } from '../types';
import {
  Heart,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Briefcase,
  User,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    favorites,
    userRole,
    setUserRole,
    setSelectedCategory
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const handleNav = (page: NavigationPage) => {
    if (page === 'search' && currentPage !== 'search') {
      // Keep or reset filters cleanly
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const roles: { role: UserRole; label: string; icon: any; page: NavigationPage }[] = [
    { role: 'customer', label: 'Customer View', icon: User, page: 'customer-dashboard' },
    { role: 'provider', label: 'Provider Portal', icon: Briefcase, page: 'provider-dashboard' },
    { role: 'admin', label: 'Admin Console', icon: ShieldCheck, page: 'admin-dashboard' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DCce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="text-left font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#4A0E2E] hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
        >
          EventEase
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A3E3D]">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors hover:text-[#4A0E2E] cursor-pointer ${
              currentPage === 'home' ? 'text-[#4A0E2E] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('categories')}
            className={`transition-colors hover:text-[#4A0E2E] cursor-pointer ${
              currentPage === 'categories' ? 'text-[#4A0E2E] font-semibold' : ''
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => {
              setSelectedCategory(null);
              handleNav('search');
            }}
            className={`transition-colors hover:text-[#4A0E2E] cursor-pointer ${
              currentPage === 'search' ? 'text-[#4A0E2E] font-semibold' : ''
            }`}
          >
            Explore Pros
          </button>
          <button
            onClick={() => handleNav('pricing')}
            className={`transition-colors hover:text-[#4A0E2E] cursor-pointer ${
              currentPage === 'pricing' ? 'text-[#4A0E2E] font-semibold' : ''
            }`}
          >
            Plans
          </button>
          <button
            onClick={() => handleNav('customer-dashboard')}
            className={`transition-colors hover:text-[#4A0E2E] cursor-pointer ${
              currentPage === 'customer-dashboard' ? 'text-[#4A0E2E] font-semibold' : ''
            }`}
          >
            My Bookings
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + Role Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Favorites quick trigger */}
          <button
            onClick={() => handleNav('customer-dashboard')}
            title="Saved Favorites"
            className="relative p-2.5 text-[#5C4A48] hover:text-[#4A0E2E] hover:bg-[#F3ECE2] rounded-lg transition-colors cursor-pointer"
          >
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-[#E05282] text-[#E05282]' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8F2556] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Role view switcher dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#4A0E2E] bg-[#F5EDE4] hover:bg-[#EFE3D6] border border-[#DFCFC0] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="capitalize">{userRole} Mode</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7C6866]" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E7DCce] rounded-xl shadow-xl py-2 z-50">
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8A7978]">
                  Switch Workspace
                </div>
                {roles.map(r => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        setUserRole(r.role);
                        setRoleMenuOpen(false);
                        handleNav(r.page);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                        userRole === r.role
                          ? 'bg-[#FAF2F5] text-[#4A0E2E] font-semibold'
                          : 'text-[#4A3E3D] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#8F2556]" />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNav('provider-register')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>List Your Business</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A3E3D] hover:bg-[#F3ECE2] rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E7DCce] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[#4A3E3D]">
            <button
              onClick={() => handleNav('home')}
              className="text-left py-2 hover:text-[#4A0E2E] cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('categories')}
              className="text-left py-2 hover:text-[#4A0E2E] cursor-pointer"
            >
              Service Categories
            </button>
            <button
              onClick={() => {
                setSelectedCategory(null);
                handleNav('search');
              }}
              className="text-left py-2 hover:text-[#4A0E2E] cursor-pointer"
            >
              Search & Explore Pros
            </button>
            <button
              onClick={() => handleNav('pricing')}
              className="text-left py-2 hover:text-[#4A0E2E] cursor-pointer"
            >
              Provider Pricing Plans
            </button>
            <button
              onClick={() => handleNav('customer-dashboard')}
              className="text-left py-2 hover:text-[#4A0E2E] cursor-pointer"
            >
              Customer Hub & Bookings
            </button>
            <button
              onClick={() => handleNav('provider-dashboard')}
              className="text-left py-2 hover:text-[#4A0E2E] cursor-pointer"
            >
              Provider Dashboard
            </button>
            <button
              onClick={() => handleNav('admin-dashboard')}
              className="text-left py-2 hover:text-[#4A0E2E] cursor-pointer"
            >
              Admin Moderation Console
            </button>
          </nav>
          
          <div className="pt-2 border-t border-[#E7DCce]">
            <button
              onClick={() => handleNav('provider-register')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#4A0E2E] rounded-lg shadow cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>List Your Business for Free</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
