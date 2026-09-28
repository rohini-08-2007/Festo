import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PackageOffer } from '../types';
import {
  Star,
  MapPin,
  ShieldCheck,
  Sparkles,
  Heart,
  CheckCircle,
  Calendar,
  Clock,
  Award,
  Phone,
  Mail,
  ChevronLeft,
  Share2,
  Check,
  MessageCircle,
  HelpCircle,
  X
} from 'lucide-react';

export const ProviderProfilePage: React.FC = () => {
  const {
    providers,
    selectedProviderId,
    setCurrentPage,
    openQuoteModal,
    openReviewModal,
    addBooking,
    favorites,
    toggleFavorite,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'packages' | 'portfolio' | 'reviews'>('overview');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<PackageOffer | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Fallback to first provider if none selected
  const provider = providers.find(p => p.id === selectedProviderId) || providers[0];

  if (!provider) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-sm text-[#7C6866]">Provider not found.</p>
        <button
          onClick={() => setCurrentPage('search')}
          className="mt-4 px-4 py-2 text-xs font-semibold bg-[#4A0E2E] text-white rounded-lg"
        >
          Return to Search
        </button>
      </div>
    );
  }

  const isFav = favorites.includes(provider.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'info');
  };

  const handleBookNow = (pkg: PackageOffer) => {
    setSelectedPackageForBooking(pkg);
  };

  const confirmDirectBooking = () => {
    if (!selectedPackageForBooking) return;
    addBooking({
      providerId: provider.id,
      providerName: provider.name,
      customerName: 'Rachel Green',
      customerEmail: 'rachel@example.com',
      customerPhone: '+1 (512) 555-8821',
      eventType: 'Wedding',
      eventDate: '2026-11-28',
      location: provider.location,
      packageName: selectedPackageForBooking.name,
      totalAmount: selectedPackageForBooking.price,
      depositPaid: Math.round(selectedPackageForBooking.price * 0.25),
      status: 'Confirmed'
    });
    setBookingConfirmed(true);
    setTimeout(() => {
      setSelectedPackageForBooking(null);
      setBookingConfirmed(false);
      setCurrentPage('customer-dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('search')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F2556] hover:text-[#4A0E2E] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-[#5C4A48] hover:text-[#4A0E2E] bg-white border border-[#DFCFC0] rounded-lg transition-colors cursor-pointer"
            title="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(provider.id)}
            className={`p-2 bg-white border border-[#DFCFC0] rounded-lg transition-colors cursor-pointer ${
              isFav ? 'text-rose-600' : 'text-[#5C4A48] hover:text-rose-600'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Cover & Provider Header */}
      <div className="bg-white rounded-2xl border border-[#E7DCce] overflow-hidden shadow-xs">
        
        {/* Cover Image */}
        <div className="relative h-64 sm:h-80 w-full bg-[#F3ECE2]">
          <img
            src={provider.coverImage}
            alt={provider.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/95 text-[#4A0E2E] text-xs font-bold px-3 py-1 rounded-md shadow-xs">
              {provider.categoryName}
            </span>
            {provider.isFeatured && (
              <span className="bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-md shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured Pro
              </span>
            )}
            {provider.isVerified && (
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Identity
              </span>
            )}
          </div>
        </div>

        {/* Profile Info Bar */}
        <div className="p-6 sm:p-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
            
            {/* Avatar & Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <img
                src={provider.profileImage}
                alt={provider.ownerName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-lg bg-[#FAF7F2]"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#241C1D]">
                  {provider.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#7C6866] font-medium">
                  Led by {provider.ownerName} · {provider.yearsExperience} years in event styling
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C4A48] pt-1">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <strong className="text-[#241C1D] tabular-nums">{provider.rating}</strong>
                    <span className="text-[#7C6866]">({provider.reviewCount} verified reviews)</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8F2556]" />
                    {provider.location}
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Accepting 2026/2027 Dates
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky Actions Desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => openQuoteModal(provider)}
                className="px-6 py-3 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95 text-center"
              >
                Request a Free Quote
              </button>
              <button
                onClick={() => handleBookNow(provider.packages[0] || {
                  id: 'direct',
                  name: 'Standard Consultation',
                  price: provider.startingPrice,
                  description: 'Initial booking deposit',
                  features: []
                })}
                className="px-6 py-3 text-xs font-bold text-[#4A0E2E] bg-[#F5EDE4] hover:bg-[#EFE3D6] border border-[#DFCFC0] rounded-xl transition-all cursor-pointer whitespace-nowrap text-center"
              >
                Book Now (From ${provider.startingPrice})
              </button>
            </div>

          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-2 border-b border-[#F3ECE2] mt-8 pt-2 overflow-x-auto">
            {(['overview', 'packages', 'services', 'portfolio', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-3 text-xs font-bold capitalize transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
                  activeTab === tab
                    ? 'border-[#4A0E2E] text-[#4A0E2E]'
                    : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
                }`}
              >
                {tab === 'portfolio' ? `Portfolio (${provider.portfolio.length})` : tab}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main Grid: 2/3 Content + 1/3 Quick Purchase / Contact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* TAB 1: Overview */}
          {(activeTab === 'overview' || activeTab === 'services') && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DCce] shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#3B0D21] mb-2">
                  About {provider.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3E3D] leading-relaxed whitespace-pre-line">
                  {provider.about}
                </p>
              </div>

              {/* Supported Occasions */}
              <div className="pt-4 border-t border-[#F3ECE2]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A7978] mb-2">
                  Event Types Supported
                </h4>
                <div className="flex flex-wrap gap-2">
                  {provider.supportedEvents.map(evt => (
                    <span
                      key={evt}
                      className="px-3 py-1 bg-[#FAF5F0] border border-[#EBE1D4] text-[#5C4A48] text-xs font-medium rounded-lg"
                    >
                      {evt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services Breakdown */}
              <div className="pt-4 border-t border-[#F3ECE2] space-y-4">
                <h4 className="font-serif text-xl font-bold text-[#3B0D21]">
                  A La Carte Services & Offerings
                </h4>
                <div className="space-y-3">
                  {provider.services.map(service => (
                    <div
                      key={service.name}
                      className="p-4 bg-[#FAF7F2] rounded-xl border border-[#DFCFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-[#241C1D]">
                          {service.name}
                        </h5>
                        <p className="text-xs text-[#6B5A58] mt-0.5">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-bold text-[#4A0E2E] tabular-nums">
                          ${service.price}
                        </span>
                        <button
                          onClick={() => openQuoteModal(provider)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#4A0E2E] bg-white border border-[#DFCFC0] hover:bg-[#F3ECE2] rounded-lg transition-colors cursor-pointer"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Packages */}
          {(activeTab === 'packages' || activeTab === 'overview') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#3B0D21]">
                    Curated Service Packages
                  </h3>
                  <p className="text-xs text-[#7C6866]">
                    Upfront transparent inclusions with zero hidden service fees.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {provider.packages.map(pkg => (
                  <div
                    key={pkg.id}
                    className={`bg-white rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-all ${
                      pkg.popular
                        ? 'border-[#8F2556] shadow-md ring-1 ring-[#8F2556]/30'
                        : 'border-[#E7DCce] shadow-xs'
                    }`}
                  >
                    <div>
                      {pkg.popular && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF2F5] text-[#8F2556] text-[10px] font-bold mb-2">
                          Most Popular Package
                        </span>
                      )}
                      <h4 className="font-serif text-xl font-bold text-[#241C1D]">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-[#6B5A58] mt-1 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#F3ECE2]">
                        <span className="text-2xl font-bold text-[#4A0E2E] tabular-nums font-mono">
                          ${pkg.price}
                        </span>
                        <span className="text-xs text-[#8A7978] ml-1">/ event base</span>
                      </div>

                      {/* Inclusions list */}
                      <ul className="mt-4 space-y-2 text-xs text-[#4A3E3D]">
                        {pkg.features.map(feat => (
                          <li key={feat} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-[#F3ECE2] flex gap-2">
                      <button
                        onClick={() => handleBookNow(pkg)}
                        className="flex-1 py-2.5 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl transition-all cursor-pointer text-center"
                      >
                        Book Package
                      </button>
                      <button
                        onClick={() => openQuoteModal(provider)}
                        className="px-4 py-2.5 text-xs font-semibold text-[#4A0E2E] bg-[#F5EDE4] hover:bg-[#EFE3D6] rounded-xl transition-colors cursor-pointer"
                      >
                        Customize
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Portfolio Gallery */}
          {(activeTab === 'portfolio' || activeTab === 'overview') && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DCce] shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
                Work Portfolio & Previous Events
              </h3>
              <p className="text-xs text-[#7C6866]">
                Click on any photo to inspect high-resolution textures and setup aesthetics.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {provider.portfolio.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhoto(img)}
                    className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#F3ECE2] cursor-pointer group"
                  >
                    <img
                      src={img}
                      alt={`Portfolio item ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                      Enlarge Photo
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Customer Reviews */}
          {(activeTab === 'reviews' || activeTab === 'overview') && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DCce] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#3B0D21]">
                    Client Reviews & Feedback
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#241C1D] tabular-nums">
                      {provider.rating} out of 5
                    </span>
                    <span className="text-xs text-[#7C6866]">
                      ({provider.reviewCount} verified reviews)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openReviewModal(provider)}
                  className="px-4 py-2 text-xs font-semibold text-[#4A0E2E] bg-[#F5EDE4] hover:bg-[#EFE3D6] border border-[#DFCFC0] rounded-xl transition-colors cursor-pointer"
                >
                  Write a Review
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 divide-y divide-[#F3ECE2]">
                {provider.reviews.map(review => (
                  <div key={review.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#241C1D]">
                          {review.authorName}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#7C6866]">
                          <span>{review.eventType}</span>
                          <span>·</span>
                          <span>{review.authorLocation || 'Texas'}</span>
                          <span>·</span>
                          <span>{review.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-[#4A3E3D] leading-relaxed">
                      "{review.comment}"
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified EventEase Client</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Right Sidebar: Contact, Live Availability & Booking Widget */}
        <div className="space-y-6">
          
          {/* Direct Booking / Inquiry Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7DCce] shadow-xs space-y-5 sticky top-24">
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7978]">
                Standard Engagement
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif text-3xl font-bold text-[#4A0E2E] tabular-nums">
                  ${provider.startingPrice}
                </span>
                <span className="text-xs text-[#7C6866]">starting price</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => openQuoteModal(provider)}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-md transition-all cursor-pointer text-center active:scale-98"
              >
                Request Custom Quote
              </button>
              
              <button
                onClick={() => handleBookNow(provider.packages[0] || {
                  id: 'base',
                  name: 'Standard Package',
                  price: provider.startingPrice,
                  description: 'Default consultation',
                  features: []
                })}
                className="w-full py-3 px-4 text-xs font-bold text-[#4A0E2E] bg-[#F5EDE4] hover:bg-[#EFE3D6] border border-[#DFCFC0] rounded-xl transition-all cursor-pointer text-center"
              >
                Instant Book Service
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="space-y-2 pt-4 border-t border-[#F3ECE2] text-xs text-[#5C4A48]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Business Identity</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8F2556] shrink-0" />
                <span>Average response: under 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Over {provider.eventsCompleted}+ celebrations hosted</span>
              </div>
            </div>

            {/* Contact details */}
            <div className="pt-4 border-t border-[#F3ECE2] space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#8A7978]">
                Direct Contact
              </h5>
              <div className="space-y-1 text-xs text-[#4A3E3D]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8F2556]" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8F2556]" />
                  <span>{provider.email}</span>
                </div>
              </div>
            </div>

            {/* Availability Calendar Snapshot */}
            <div className="pt-4 border-t border-[#F3ECE2] space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#8A7978] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8F2556]" />
                <span>Weekly Schedule</span>
              </h5>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#5C4A48]">
                <div className="p-1.5 bg-[#FAF7F2] rounded border border-[#E7DCce] flex justify-between">
                  <span>Friday</span>
                  <span className="text-emerald-700 font-bold">Open</span>
                </div>
                <div className="p-1.5 bg-[#FAF7F2] rounded border border-[#E7DCce] flex justify-between">
                  <span>Saturday</span>
                  <span className="text-amber-700 font-bold">Limited</span>
                </div>
                <div className="p-1.5 bg-[#FAF7F2] rounded border border-[#E7DCce] flex justify-between">
                  <span>Sunday</span>
                  <span className="text-emerald-700 font-bold">Open</span>
                </div>
                <div className="p-1.5 bg-[#FAF7F2] rounded border border-[#E7DCce] flex justify-between">
                  <span>Weekdays</span>
                  <span className="text-emerald-700 font-bold">Open</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Portfolio Photos */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer animate-in fade-in"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto}
              alt="Enlarged portfolio work"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* Direct Booking Modal confirmation */}
      {selectedPackageForBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#E7DCce] p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFCFC0]">
              <h4 className="font-serif text-xl font-bold text-[#3B0D21]">
                Confirm Booking with {provider.name}
              </h4>
              <button
                onClick={() => setSelectedPackageForBooking(null)}
                className="text-[#7C6866] hover:text-[#241C1D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h5 className="font-serif text-xl font-bold text-[#3B0D21]">
                  Booking Successfully Reserved!
                </h5>
                <p className="text-xs text-[#7C6866]">
                  Redirecting to your customer bookings hub...
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs text-[#4A3E3D]">
                <div className="p-3 bg-white rounded-xl border border-[#DFCFC0] space-y-2">
                  <div className="flex justify-between font-bold text-sm text-[#241C1D]">
                    <span>{selectedPackageForBooking.name}</span>
                    <span className="text-[#4A0E2E] tabular-nums font-mono">
                      ${selectedPackageForBooking.price}
                    </span>
                  </div>
                  <p className="text-[#6B5A58]">{selectedPackageForBooking.description}</p>
                  <div className="pt-2 border-t border-[#F3ECE2] flex justify-between text-[#7C6866]">
                    <span>25% Booking Deposit:</span>
                    <span className="font-bold text-[#241C1D] tabular-nums">
                      ${Math.round(selectedPackageForBooking.price * 0.25)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold">Event Date</label>
                  <input
                    type="date"
                    defaultValue="2026-11-28"
                    className="w-full p-2 bg-white border border-[#DFCFC0] rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold">Special Notes for Provider</label>
                  <textarea
                    rows={2}
                    placeholder="Venue details, start times, or song preferences..."
                    className="w-full p-2 bg-white border border-[#DFCFC0] rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DFCFC0]">
                  <button
                    onClick={() => setSelectedPackageForBooking(null)}
                    className="px-4 py-2 font-semibold text-[#6B5A58]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDirectBooking}
                    className="px-5 py-2.5 font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow cursor-pointer"
                  >
                    Confirm & Reserve Date
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
