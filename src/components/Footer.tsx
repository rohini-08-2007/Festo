import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { Mail, Phone, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, setUserRole } = useApp();

  return (
    <footer className="bg-[#24131C] text-[#E0D3DA] pt-16 pb-12 border-t border-[#3B2230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3B2230]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-semibold tracking-tight text-white block">
              EventEase
            </span>
            <p className="text-sm text-[#BBA6B2] leading-relaxed max-w-sm">
              Discover trusted local event professionals, compare transparent packages, and make your celebration unforgettable. Verified vendors, authentic reviews, and seamless quoting.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#D8C7D2] pt-2">
              <span className="flex items-center gap-1.5 bg-[#3B2230] px-3 py-1 rounded-md text-amber-200">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                100% Verified Local Pros
              </span>
              <span className="flex items-center gap-1.5 bg-[#3B2230] px-3 py-1 rounded-md text-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                Fast Free Quotes
              </span>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-4">
              Popular Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8B8C2]">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage('search');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links & Host hub */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-4">
              Explore & Portals
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8B8C2]">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('categories');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Service Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('customer-dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Bookings Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('provider');
                    setCurrentPage('provider-dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Provider Partner Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('provider-register');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  List Your Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('pricing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Provider Pricing & Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('admin');
                    setCurrentPage('admin-dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-amber-200"
                >
                  Admin Moderation Console
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-4">
              Contact & Support
            </h4>
            <div className="space-y-3 text-sm text-[#C8B8C2]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Austin Metro, Texas · Servicing Central TX</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>concierge@eventease.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (800) 512-EASE</span>
              </div>
              <p className="text-xs text-[#9E8B96] pt-1">
                Mon - Sat: 8:00 AM - 8:00 PM CST
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E8B96] gap-4">
          <p>© 2026 EventEase Inc. All rights reserved. Empowering local event artisans.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Trust & Safety</span>
            <span className="hover:text-white cursor-pointer transition-colors">Vendor Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
