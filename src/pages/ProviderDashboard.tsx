import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PackageOffer, ProviderService } from '../types';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Star,
  Settings,
  Image as ImageIcon,
  Layers,
  ChevronDown
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const {
    providers,
    activeProviderId,
    setActiveProviderId,
    updateProvider,
    quotes,
    updateQuoteStatus,
    bookings,
    updateBookingStatus,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'bookings' | 'profile' | 'packages' | 'availability'>('overview');

  // Active provider
  const currentProvider = providers.find(p => p.id === activeProviderId) || providers[0];

  // Local state for editing profile
  const [profileForm, setProfileForm] = useState({
    name: currentProvider.name,
    ownerName: currentProvider.ownerName,
    tagline: currentProvider.tagline,
    about: currentProvider.about,
    location: currentProvider.location,
    startingPrice: currentProvider.startingPrice,
    phone: currentProvider.phone,
    email: currentProvider.email
  });

  // Local state for sending a quote
  const [respondingQuoteId, setRespondingQuoteId] = useState<string | null>(null);
  const [quoteAmount, setQuoteAmount] = useState<number>(1500);
  const [quoteNotes, setQuoteNotes] = useState<string>('Thank you for reaching out! We would love to be part of your celebration. This quote includes complete setup, travel within 30 miles, and breakdown.');

  // Local state for adding a new package
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: 900,
    description: '',
    featureInput: '',
    features: ['Initial consultation', 'Standard setup & breakdown', 'On-site team']
  });

  // Local state for adding a portfolio image
  const [newImageUrl, setNewImageUrl] = useState('');

  // Weekly availability state
  const [availability, setAvailability] = useState<Record<string, 'Available' | 'Busy' | 'Limited'>>({
    Friday: 'Available',
    Saturday: 'Limited',
    Sunday: 'Available',
    Weekdays: 'Available'
  });

  // Filter inquiries for this provider
  const providerQuotes = quotes.filter(q => q.providerId === currentProvider.id);
  const providerBookings = bookings.filter(b => b.providerId === currentProvider.id);

  // Statistics calculation
  const totalEarnings = providerBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const confirmedBookingsCount = providerBookings.filter(b => b.status === 'Confirmed').length;
  const pendingQuotesCount = providerQuotes.filter(q => q.status === 'Pending').length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProvider(currentProvider.id, {
      name: profileForm.name,
      ownerName: profileForm.ownerName,
      tagline: profileForm.tagline,
      about: profileForm.about,
      location: profileForm.location,
      startingPrice: Number(profileForm.startingPrice),
      phone: profileForm.phone,
      email: profileForm.email
    });
  };

  const handleSendQuote = (quoteId: string) => {
    if (!quoteAmount || quoteAmount <= 0) {
      showToast('Please enter a valid quotation amount', 'error');
      return;
    }
    updateQuoteStatus(quoteId, 'Quoted', quoteAmount, quoteNotes);
    setRespondingQuoteId(null);
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackage.name.trim()) return;

    const pkg: PackageOffer = {
      id: `pkg-${Date.now()}`,
      name: newPackage.name,
      price: Number(newPackage.price),
      description: newPackage.description,
      features: newPackage.features
    };

    updateProvider(currentProvider.id, {
      packages: [...currentProvider.packages, pkg]
    });

    setNewPackage({
      name: '',
      price: 900,
      description: '',
      featureInput: '',
      features: ['Initial consultation', 'Standard setup & breakdown']
    });
  };

  const handleAddPortfolioImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    updateProvider(currentProvider.id, {
      portfolio: [newImageUrl.trim(), ...currentProvider.portfolio]
    });
    setNewImageUrl('');
    showToast('New portfolio photo added!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header & Provider Switcher */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DCce] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F2556] bg-[#FAF2F5] px-2.5 py-0.5 rounded-full">
              Partner Workspace · {currentProvider.plan.toUpperCase()} Plan
            </span>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live & Discoverable
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241C1D]">
            {currentProvider.name}
          </h1>
          <p className="text-xs text-[#7C6866]">
            Managed by {currentProvider.ownerName} · {currentProvider.categoryName} ({currentProvider.location})
          </p>
        </div>

        {/* Perspective Switcher */}
        <div className="flex items-center gap-2 bg-[#FAF7F2] p-2 rounded-xl border border-[#DFCFC0]">
          <span className="text-xs font-semibold text-[#8A7978] pl-2 hidden sm:inline">
            Manage Provider:
          </span>
          <select
            value={activeProviderId}
            onChange={e => {
              const selectedId = e.target.value;
              setActiveProviderId(selectedId);
              const p = providers.find(prov => prov.id === selectedId);
              if (p) {
                setProfileForm({
                  name: p.name,
                  ownerName: p.ownerName,
                  tagline: p.tagline,
                  about: p.about,
                  location: p.location,
                  startingPrice: p.startingPrice,
                  phone: p.phone,
                  email: p.email
                });
              }
            }}
            className="text-xs font-bold text-[#4A0E2E] bg-white border border-[#DFCFC0] rounded-lg px-3 py-1.5 focus:outline-hidden cursor-pointer"
          >
            {providers.slice(0, 8).map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.categoryName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7C6866] mb-2">
            <span>Platform Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#241C1D] tabular-nums font-mono">
            ${totalEarnings.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">
            Based on {providerBookings.length} confirmed bookings
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7C6866] mb-2">
            <span>Pending Inquiries</span>
            <MessageSquare className="w-4 h-4 text-[#8F2556]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E2E] tabular-nums font-mono">
            {pendingQuotesCount}
          </div>
          <span className="text-[11px] text-amber-700 font-medium">
            Awaiting custom price proposal
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7C6866] mb-2">
            <span>Client Rating</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#241C1D] tabular-nums">
            {currentProvider.rating}
          </div>
          <span className="text-[11px] text-[#7C6866]">
            Across {currentProvider.reviewCount} customer reviews
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7C6866] mb-2">
            <span>Monthly Profile Views</span>
            <TrendingUp className="w-4 h-4 text-purple-700" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#241C1D] tabular-nums font-mono">
            1,840
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">
            +18% search impressions
          </span>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DFCFC0] overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Inquiries & Proposals ({providerQuotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Confirmed Bookings ({providerBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Edit Business Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'packages'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Packages & Portfolio</span>
        </button>

        <button
          onClick={() => setActiveTab('availability')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'availability'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Calendar & Availability</span>
        </button>
      </div>

      {/* TAB CONTENT: Inquiries & Quotes */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
              Customer Quote Inquiries ({providerQuotes.length})
            </h3>
            <span className="text-xs text-[#7C6866]">
              Respond quickly to boost lead conversion by 3.5x
            </span>
          </div>

          {providerQuotes.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#DFCFC0] text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-[#8F2556] mx-auto opacity-40" />
              <h4 className="font-serif text-lg font-bold text-[#241C1D]">No Inquiries Yet</h4>
              <p className="text-xs text-[#7C6866]">
                When event organizers request custom quotes for {currentProvider.name}, they will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {providerQuotes.map(q => (
                <div
                  key={q.id}
                  className="bg-white p-6 rounded-2xl border border-[#E7DCce] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3ECE2]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          q.status === 'Pending' ? 'bg-amber-100 text-amber-900' :
                          q.status === 'Quoted' ? 'bg-purple-100 text-purple-900' :
                          q.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {q.status}
                        </span>
                        <span className="text-xs font-mono text-[#8A7978]">{q.id}</span>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-[#241C1D] mt-1">
                        Inquiry from {q.customerName}
                      </h4>
                      <div className="text-xs text-[#7C6866]">
                        {q.customerEmail} · {q.customerPhone}
                      </div>
                    </div>

                    {q.quotedAmount && (
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-[#8A7978] block">Your Quoted Fee</span>
                        <span className="text-xl font-bold text-[#4A0E2E] tabular-nums font-mono">
                          ${q.quotedAmount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DCce]">
                    <div>
                      <span className="text-[#8A7978] block">Occasion & Date:</span>
                      <strong className="text-[#241C1D]">{q.eventType} · {q.eventDate}</strong>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Venue / City:</span>
                      <strong className="text-[#241C1D]">{q.location}</strong>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Guest Count:</span>
                      <strong className="text-[#241C1D]">{q.guestsCount} guests</strong>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Client Budget:</span>
                      <strong className="text-[#241C1D]">{q.budget}</strong>
                    </div>
                  </div>

                  {q.additionalRequirements && (
                    <div className="text-xs text-[#5C4A48]">
                      <span className="font-semibold text-[#8A7978] block">Client Specifications:</span>
                      <p className="bg-white p-2.5 rounded-lg border border-[#DFCFC0] mt-1 italic">
                        "{q.additionalRequirements}"
                      </p>
                    </div>
                  )}

                  {/* Actions / Respond Form */}
                  {respondingQuoteId === q.id ? (
                    <div className="bg-[#FAF2F5] p-4 rounded-xl border border-[#FBCFE8] space-y-3 animate-in fade-in">
                      <h5 className="text-xs font-bold text-[#4A0E2E] uppercase tracking-wider">
                        Send Official Quote to {q.customerName}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                            Quote Total ($ USD) *
                          </label>
                          <input
                            type="number"
                            value={quoteAmount}
                            onChange={e => setQuoteAmount(Number(e.target.value))}
                            className="w-full p-2 bg-white text-xs border border-[#DFCFC0] rounded-lg font-mono font-bold"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                            Message to Client / Scope Inclusions
                          </label>
                          <input
                            type="text"
                            value={quoteNotes}
                            onChange={e => setQuoteNotes(e.target.value)}
                            className="w-full p-2 bg-white text-xs border border-[#DFCFC0] rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={() => setRespondingQuoteId(null)}
                          className="px-3 py-1.5 text-xs text-[#7C6866] hover:bg-white rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSendQuote(q.id)}
                          className="px-5 py-2 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-lg shadow-xs cursor-pointer"
                        >
                          Submit Quotation
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2 pt-1">
                      {q.status === 'Pending' && (
                        <button
                          onClick={() => {
                            setRespondingQuoteId(q.id);
                            setQuoteAmount(currentProvider.startingPrice);
                          }}
                          className="px-5 py-2 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-xs cursor-pointer"
                        >
                          Respond with Quote
                        </button>
                      )}
                      {q.status === 'Quoted' && (
                        <span className="text-xs text-purple-900 font-medium">
                          Quotation sent. Awaiting client decision.
                        </span>
                      )}
                      {q.status === 'Accepted' && (
                        <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Client accepted your proposal!
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Confirmed Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
              Event Calendar & Bookings ({providerBookings.length})
            </h3>
          </div>

          {providerBookings.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#DFCFC0] text-center space-y-3">
              <Calendar className="w-10 h-10 text-[#8F2556] mx-auto opacity-40" />
              <h4 className="font-serif text-lg font-bold text-[#241C1D]">No Active Bookings</h4>
              <p className="text-xs text-[#7C6866]">
                Direct bookings will appear here with customer contact details.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {providerBookings.map(b => (
                <div
                  key={b.id}
                  className="bg-white p-6 rounded-2xl border border-[#E7DCce] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {b.status}
                      </span>
                      <span className="text-xs font-mono text-[#8A7978]">{b.id}</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-[#241C1D]">
                      {b.customerName} · {b.eventType}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C4A48]">
                      <span>Date: <strong>{b.eventDate}</strong></span>
                      <span>·</span>
                      <span>Location: <strong>{b.location}</strong></span>
                      <span>·</span>
                      <span>Package: <strong>{b.packageName}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#4A0E2E] tabular-nums font-mono block">
                        ${b.totalAmount}
                      </span>
                      <span className="text-[11px] text-emerald-700 block">
                        Deposit: ${b.depositPaid}
                      </span>
                    </div>

                    {b.status === 'Confirmed' ? (
                      <button
                        onClick={() => updateBookingStatus(b.id, 'Completed')}
                        className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg cursor-pointer"
                      >
                        Mark Completed
                      </button>
                    ) : (
                      <span className="text-xs text-neutral-500 font-medium">Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Edit Business Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DCce] shadow-xs max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#3B0D21]">
              Edit Business Profile
            </h3>
            <p className="text-xs text-[#7C6866]">
              Keep your public brand description, phone, and starting pricing accurate.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Business / Studio Name *
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Owner / Lead Artist Name *
                </label>
                <input
                  type="text"
                  value={profileForm.ownerName}
                  onChange={e => setProfileForm({ ...profileForm, ownerName: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                Tagline / Elevator Pitch
              </label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={e => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                Full Business Bio / About
              </label>
              <textarea
                rows={4}
                value={profileForm.about}
                onChange={e => setProfileForm({ ...profileForm, about: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Starting Price ($)
                </label>
                <input
                  type="number"
                  value={profileForm.startingPrice}
                  onChange={e => setProfileForm({ ...profileForm, startingPrice: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                Primary Service Location
              </label>
              <input
                type="text"
                value={profileForm.location}
                onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-[#F3ECE2]">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-xs cursor-pointer"
              >
                Save Business Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: Packages & Portfolio */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Packages Manager */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7DCce] shadow-xs space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
                Service Packages ({currentProvider.packages.length})
              </h3>
              <p className="text-xs text-[#7C6866]">
                Configure tiered offerings visible directly on your profile.
              </p>
            </div>

            {/* List existing */}
            <div className="space-y-3">
              {currentProvider.packages.map(pkg => (
                <div
                  key={pkg.id}
                  className="p-4 bg-[#FAF7F2] rounded-xl border border-[#DFCFC0] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#241C1D]">{pkg.name}</h4>
                    <span className="text-sm font-bold text-[#4A0E2E] tabular-nums font-mono">
                      ${pkg.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B5A58]">{pkg.description}</p>
                  <ul className="text-[11px] text-[#5C4A48] space-y-0.5">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Add New Package Form */}
            <form onSubmit={handleAddPackage} className="pt-4 border-t border-[#F3ECE2] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A7978]">
                Add New Package Tier
              </h4>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Package Name (e.g. Platinum Suite)"
                  value={newPackage.name}
                  onChange={e => setNewPackage({ ...newPackage, name: e.target.value })}
                  className="p-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={newPackage.price}
                  onChange={e => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
                  className="p-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg font-mono"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Short description of what is included..."
                value={newPackage.description}
                onChange={e => setNewPackage({ ...newPackage, description: e.target.value })}
                className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg"
              />

              <button
                type="submit"
                className="w-full py-2 text-xs font-bold text-[#4A0E2E] bg-[#F5EDE4] hover:bg-[#EFE3D6] border border-[#DFCFC0] rounded-lg cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package Tier</span>
              </button>
            </form>
          </div>

          {/* Portfolio Manager */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7DCce] shadow-xs space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
                Portfolio Gallery ({currentProvider.portfolio.length} Photos)
              </h3>
              <p className="text-xs text-[#7C6866]">
                High-resolution images of previous event setups and deliverables.
              </p>
            </div>

            {/* Add photo form */}
            <form onSubmit={handleAddPortfolioImage} className="flex gap-2">
              <input
                type="url"
                placeholder="Enter image URL..."
                value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
                className="flex-1 p-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-[#4A0E2E] rounded-lg cursor-pointer whitespace-nowrap"
              >
                Add Photo
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {currentProvider.portfolio.map((img, idx) => (
                <div key={idx} className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#F3ECE2]">
                  <img
                    src={img}
                    alt={`Portfolio ${idx}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: Availability */}
      {activeTab === 'availability' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DCce] shadow-xs max-w-xl mx-auto space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#3B0D21]">
              Set Weekly Availability & Blackout Dates
            </h3>
            <p className="text-xs text-[#7C6866]">
              Keep prospective clients informed about your weekend scheduling.
            </p>
          </div>

          <div className="space-y-3">
            {Object.keys(availability).map(day => (
              <div
                key={day}
                className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#DFCFC0] flex items-center justify-between"
              >
                <span className="text-xs font-bold text-[#241C1D]">{day}</span>
                <div className="flex items-center gap-1.5">
                  {(['Available', 'Limited', 'Busy'] as const).map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setAvailability(prev => ({ ...prev, [day]: status }));
                        showToast(`Updated ${day} to ${status}`, 'info');
                      }}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        availability[day] === status
                          ? status === 'Available'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : status === 'Limited'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white text-[#7C6866] border border-[#DFCFC0]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
