import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CITIES, EVENT_TYPES } from '../data/mockData';
import { ServiceCategory, EventType, Provider } from '../types';
import {
  Sparkles,
  CheckCircle,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ProviderRegistrationPage: React.FC = () => {
  const { addProvider, setCurrentPage, setUserRole, setActiveProviderId } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [createdProviderId, setCreatedProviderId] = useState('');

  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    category: 'decorations' as ServiceCategory,
    location: 'Austin Metro',
    city: 'Austin Metro',
    experienceYears: 5,
    startingPrice: 350,
    tagline: '',
    about: '',
    packageName: 'Standard Celebration Package',
    packagePrice: 650,
    packageDescription: 'Includes initial consultation, full setup, and 4 hours of event presence.'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.businessName.trim()) errs.businessName = 'Business name is required';
    if (!form.ownerName.trim()) errs.ownerName = 'Owner name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email is required';
    if (!form.about.trim() || form.about.trim().length < 20) {
      errs.about = 'Please provide at least 20 characters describing your services';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const id = `prov-${Date.now()}`;
    const selectedCat = CATEGORIES.find(c => c.id === form.category);

    const newProvider: Provider = {
      id,
      name: form.businessName,
      ownerName: form.ownerName,
      category: form.category,
      categoryName: selectedCat ? selectedCat.name : 'Event Decorators',
      tagline: form.tagline.trim() || `Premier ${selectedCat?.name || 'event'} services in ${form.city}`,
      location: `${form.location}, Texas`,
      city: form.city,
      startingPrice: Number(form.startingPrice),
      priceTier: form.startingPrice > 500 ? '$$$' : form.startingPrice > 200 ? '$$' : '$',
      rating: 5.0,
      reviewCount: 1,
      isVerified: false,
      isFeatured: false,
      isAvailable: true,
      yearsExperience: Number(form.experienceYears),
      eventsCompleted: 15,
      about: form.about,
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      coverImage: selectedCat ? selectedCat.image : 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      portfolio: [
        selectedCat ? selectedCat.image : 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
      ],
      services: [
        {
          name: form.packageName,
          price: Number(form.packagePrice),
          description: form.packageDescription
        }
      ],
      packages: [
        {
          id: `pkg-${Date.now()}`,
          name: form.packageName,
          price: Number(form.packagePrice),
          description: form.packageDescription,
          features: [
            'Dedicated event day coordinator',
            'Full setup and teardown service',
            'Complimentary consultation'
          ],
          popular: true
        }
      ],
      supportedEvents: ['Wedding', 'Birthday Party', 'Engagement', 'Anniversary'],
      reviews: [
        {
          id: `rev-initial-${Date.now()}`,
          authorName: 'First Verified Client',
          rating: 5,
          date: 'September 2026',
          eventType: 'Wedding',
          comment: 'Outstanding service and clear communication throughout our celebration.',
          helpfulCount: 2
        }
      ],
      phone: form.phone,
      email: form.email,
      approved: false, // Sent to Admin Dashboard for approval!
      plan: 'free'
    };

    addProvider(newProvider);
    setCreatedProviderId(id);
    setActiveProviderId(id);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2F5] text-[#8F2556] text-xs font-semibold border border-[#FBCFE8]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Vendor Partnership Program</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3B0D21]">
          List Your Business on EventEase
        </h1>
        <p className="text-sm sm:text-base text-[#6B5A58] max-w-2xl mx-auto leading-relaxed">
          Get discovered by customers looking for event professionals in your area. Join over 300+ trusted decorators, caterers, photographers, and DJs.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl border border-[#DFCFC0] p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 bg-[#F0FDF4] text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#3B0D21]">
              Registration Submitted Successfully!
            </h2>
            <p className="text-sm text-[#5C4A48] max-w-lg mx-auto">
              Your business listing for <strong className="text-[#241C1D]">{form.businessName}</strong> has been created and sent to our curation team for quality check and approval.
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl max-w-md mx-auto text-left text-xs space-y-2 text-[#5C4A48]">
            <div className="flex justify-between">
              <span className="text-[#8A7978]">Registration ID:</span>
              <span className="font-mono font-bold text-[#241C1D]">{createdProviderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A7978]">Moderation Queue:</span>
              <span className="text-amber-700 font-semibold">Pending Admin Approval</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A7978]">Estimated Review Time:</span>
              <span className="text-[#241C1D] font-medium">Within 24 Hours</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setUserRole('provider');
                setCurrentPage('provider-dashboard');
              }}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Open Provider Workspace
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setCurrentPage('admin-dashboard');
              }}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-[#4A0E2E] bg-[#F5EDE4] hover:bg-[#EFE3D6] rounded-xl transition-colors cursor-pointer"
            >
              View in Admin Approval Queue
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E7DCce] p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* Section 1: Business Identity */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#3B0D21] pb-2 border-b border-[#F3ECE2] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#8F2556]" />
              <span>1. Business & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Business / Provider Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Celestial Blooms & Decor"
                  value={form.businessName}
                  onChange={e => setForm({ ...form, businessName: e.target.value })}
                  className={`w-full p-2.5 text-xs bg-[#FAF7F2] border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8F2556] ${
                    errors.businessName ? 'border-rose-400' : 'border-[#DFCFC0]'
                  }`}
                />
                {errors.businessName && <p className="text-[11px] text-rose-600 mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Owner / Lead Artist Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Sterling"
                  value={form.ownerName}
                  onChange={e => setForm({ ...form, ownerName: e.target.value })}
                  className={`w-full p-2.5 text-xs bg-[#FAF7F2] border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8F2556] ${
                    errors.ownerName ? 'border-rose-400' : 'border-[#DFCFC0]'
                  }`}
                />
                {errors.ownerName && <p className="text-[11px] text-rose-600 mt-1">{errors.ownerName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Official Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+1 (512) 555-0100"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className={`w-full p-2.5 text-xs bg-[#FAF7F2] border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8F2556] ${
                    errors.phone ? 'border-rose-400' : 'border-[#DFCFC0]'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Business Email Address *
                </label>
                <input
                  type="email"
                  placeholder="contact@mybusiness.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={`w-full p-2.5 text-xs bg-[#FAF7F2] border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8F2556] ${
                    errors.email ? 'border-rose-400' : 'border-[#DFCFC0]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Category & Location */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#3B0D21] pb-2 border-b border-[#F3ECE2] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8F2556]" />
              <span>2. Specialization & Coverage</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Primary Service Category *
                </label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value as ServiceCategory })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden cursor-pointer"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Service Region / City *
                </label>
                <select
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value, location: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden cursor-pointer"
                >
                  {CITIES.filter(c => c !== 'All Locations').map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Years in Professional Business
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={form.experienceYears}
                  onChange={e => setForm({ ...form, experienceYears: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Starting Price for Basic Engagement ($ USD)
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.startingPrice}
                  onChange={e => setForm({ ...form, startingPrice: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  One-Line Business Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern bohemian decor & candlelit styling"
                  value={form.tagline}
                  onChange={e => setForm({ ...form, tagline: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                Full Business Bio / About Services *
              </label>
              <textarea
                rows={3}
                placeholder="Tell prospective hosts what makes your services unique, your artistic process, past highlights..."
                value={form.about}
                onChange={e => setForm({ ...form, about: e.target.value })}
                className={`w-full p-2.5 text-xs bg-[#FAF7F2] border rounded-xl focus:outline-hidden ${
                  errors.about ? 'border-rose-400' : 'border-[#DFCFC0]'
                }`}
              />
              {errors.about && <p className="text-[11px] text-rose-600 mt-1">{errors.about}</p>}
            </div>
          </div>

          {/* Section 3: Initial Package */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#3B0D21] pb-2 border-b border-[#F3ECE2] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8F2556]" />
              <span>3. Initial Starter Package</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Package Name
                </label>
                <input
                  type="text"
                  value={form.packageName}
                  onChange={e => setForm({ ...form, packageName: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Package Price ($)
                </label>
                <input
                  type="number"
                  value={form.packagePrice}
                  onChange={e => setForm({ ...form, packagePrice: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                Package Description & Deliverables
              </label>
              <input
                type="text"
                value={form.packageDescription}
                onChange={e => setForm({ ...form, packageDescription: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#F3ECE2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#7C6866]">
              By registering, you agree to EventEase quality standards & client transparency guidelines.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-98"
            >
              <span>Submit Registration</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
