import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Heart,
  FileText,
  User,
  Star,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Trash2,
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    quotes,
    bookings,
    favorites,
    providers,
    toggleFavorite,
    navigateToProvider,
    openReviewModal,
    updateBookingStatus,
    updateQuoteStatus,
    setCurrentPage,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'quotes' | 'favorites' | 'profile'>('bookings');

  // Customer mock profile details
  const [profile, setProfile] = useState({
    name: 'Rachel Green',
    email: 'rachel@example.com',
    phone: '+1 (512) 555-8821',
    primaryLocation: 'Austin Hill Country & Downtown',
    nextEventDate: '2026-11-14',
    nextEventType: 'Wedding Celebration'
  });

  const [profileSaved, setProfileSaved] = useState(false);

  const favoriteProviders = providers.filter(p => favorites.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    showToast('Customer profile & preferences updated!', 'success');
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
            <Clock className="w-3.5 h-3.5" /> Pending Response
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-900">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <AlertCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      case 'Quoted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-900">
            <Sparkles className="w-3.5 h-3.5" /> Quote Received
          </span>
        );
      case 'Accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Greeting */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DCce] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#4A0E2E] text-white flex items-center justify-center font-serif text-2xl font-bold">
            RG
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7978]">
              Client Concierge
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241C1D]">
              Welcome back, {profile.name}
            </h1>
            <p className="text-xs text-[#7C6866]">
              Target Event: <strong className="text-[#4A0E2E]">{profile.nextEventType}</strong> on{' '}
              <strong className="text-[#4A0E2E]">{profile.nextEventDate}</strong>
            </p>
          </div>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-4 text-center">
          <div className="px-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#DFCFC0]">
            <span className="block font-serif text-xl font-bold text-[#4A0E2E] tabular-nums">
              {bookings.length}
            </span>
            <span className="text-[11px] text-[#7C6866]">Bookings</span>
          </div>
          <div className="px-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#DFCFC0]">
            <span className="block font-serif text-xl font-bold text-[#4A0E2E] tabular-nums">
              {quotes.length}
            </span>
            <span className="text-[11px] text-[#7C6866]">Quote Requests</span>
          </div>
          <div className="px-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#DFCFC0]">
            <span className="block font-serif text-xl font-bold text-[#4A0E2E] tabular-nums">
              {favorites.length}
            </span>
            <span className="text-[11px] text-[#7C6866]">Saved Pros</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DFCFC0] overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Event Bookings ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quotes')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'quotes'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Quote Inquiries ({quotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'favorites'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Favorites ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Preferences</span>
        </button>
      </div>

      {/* TAB CONTENT: Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#DFCFC0] p-12 text-center space-y-3">
              <Calendar className="w-10 h-10 text-[#8F2556] mx-auto opacity-40" />
              <h3 className="font-serif text-xl font-bold text-[#3B0D21]">No Bookings Yet</h3>
              <p className="text-xs text-[#7C6866]">
                You haven't confirmed any vendor bookings yet. Browse our verified categories to get started.
              </p>
              <button
                onClick={() => setCurrentPage('search')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#4A0E2E] rounded-xl cursor-pointer"
              >
                Explore Providers
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map(booking => {
                const targetProvider = providers.find(p => p.id === booking.providerId);
                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-[#E7DCce] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        {getStatusBadge(booking.status)}
                        <span className="text-[11px] text-[#8A7978] font-mono">
                          Ref: {booking.id}
                        </span>
                      </div>

                      <h3
                        onClick={() => targetProvider && navigateToProvider(targetProvider.id)}
                        className="font-serif text-xl font-bold text-[#241C1D] hover:text-[#8F2556] cursor-pointer"
                      >
                        {booking.providerName}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C4A48]">
                        <span>Package: <strong>{booking.packageName}</strong></span>
                        <span>·</span>
                        <span>Event: <strong>{booking.eventType}</strong></span>
                        <span>·</span>
                        <span>Date: <strong>{booking.eventDate}</strong></span>
                        <span>·</span>
                        <span>Location: <strong>{booking.location}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-[#F3ECE2]">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] uppercase text-[#8A7978] block">Total Invoiced</span>
                        <span className="text-lg font-bold text-[#4A0E2E] tabular-nums font-mono">
                          ${booking.totalAmount}
                        </span>
                        <span className="text-[11px] text-emerald-700 block">
                          Deposit Paid: ${booking.depositPaid}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {targetProvider && (
                          <button
                            onClick={() => openReviewModal(targetProvider)}
                            className="px-3.5 py-2 text-xs font-semibold text-[#8F2556] bg-[#FAF2F5] hover:bg-[#FCE7F3] border border-[#FBCFE8] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <span>Leave Review</span>
                          </button>
                        )}

                        {booking.status === 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                            className="px-3 py-2 text-xs text-[#7C6866] hover:text-rose-600 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Quote Requests */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          {quotes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#DFCFC0] p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-[#8F2556] mx-auto opacity-40" />
              <h3 className="font-serif text-xl font-bold text-[#3B0D21]">No Quotes Requested</h3>
              <p className="text-xs text-[#7C6866]">
                When you request quotes from decorators, caterers, or photographers, their proposals will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map(quote => (
                <div
                  key={quote.id}
                  className="bg-white rounded-2xl border border-[#E7DCce] p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F3ECE2]">
                    <div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(quote.status)}
                        <span className="text-[11px] font-mono text-[#8A7978]">
                          {quote.id} · Requested on {quote.createdAt}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#241C1D] mt-1">
                        {quote.providerName}
                      </h3>
                      <span className="text-xs text-[#8F2556] font-medium">{quote.providerCategory}</span>
                    </div>

                    {quote.quotedAmount && (
                      <div className="text-right bg-[#FAF2F5] p-3 rounded-xl border border-[#FBCFE8]">
                        <span className="text-[10px] uppercase text-[#8F2556] font-semibold block">
                          Provider's Proposed Quote
                        </span>
                        <span className="text-xl font-bold text-[#4A0E2E] tabular-nums font-mono">
                          ${quote.quotedAmount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quote Specifications */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#5C4A48] bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E7DCce]">
                    <div>
                      <span className="text-[#8A7978] block">Event & Date:</span>
                      <strong className="text-[#241C1D]">{quote.eventType} · {quote.eventDate}</strong>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Guests & Venue:</span>
                      <strong className="text-[#241C1D]">{quote.guestsCount} guests · {quote.location}</strong>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Service Inquired:</span>
                      <strong className="text-[#241C1D]">{quote.requiredService}</strong>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Customer Budget:</span>
                      <strong className="text-[#241C1D]">{quote.budget}</strong>
                    </div>
                  </div>

                  {quote.additionalRequirements && (
                    <div className="text-xs text-[#5C4A48]">
                      <span className="text-[#8A7978] font-semibold block">Your Notes:</span>
                      <p className="italic bg-white p-2.5 rounded-lg border border-[#DFCFC0] mt-1">
                        "{quote.additionalRequirements}"
                      </p>
                    </div>
                  )}

                  {quote.providerNotes && (
                    <div className="text-xs text-[#4A0E2E] bg-[#FFF8FA] p-3 rounded-xl border border-[#FBCFE8]">
                      <span className="font-bold flex items-center gap-1 text-[#8F2556] mb-1">
                        <MessageSquare className="w-3.5 h-3.5" /> Note from {quote.providerName}:
                      </span>
                      <p>{quote.providerNotes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    {quote.status === 'Quoted' && (
                      <>
                        <button
                          onClick={() => updateQuoteStatus(quote.id, 'Declined')}
                          className="px-4 py-2 text-xs font-semibold text-[#7C6866] hover:bg-[#F3ECE2] rounded-lg transition-colors cursor-pointer"
                        >
                          Decline Quote
                        </button>
                        <button
                          onClick={() => updateQuoteStatus(quote.id, 'Accepted')}
                          className="px-5 py-2 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          Accept & Confirm Vendor
                        </button>
                      </>
                    )}
                    {quote.status === 'Pending' && (
                      <span className="text-xs text-[#8A7978] italic">
                        Provider is preparing your customized quotation...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Saved Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {favoriteProviders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#DFCFC0] p-12 text-center space-y-3">
              <Heart className="w-10 h-10 text-[#8F2556] mx-auto opacity-40" />
              <h3 className="font-serif text-xl font-bold text-[#3B0D21]">No Saved Favorites</h3>
              <p className="text-xs text-[#7C6866]">
                Click the heart icon on any provider profile or card to bookmark them for quick comparison.
              </p>
              <button
                onClick={() => setCurrentPage('search')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#4A0E2E] rounded-xl cursor-pointer"
              >
                Browse Top Event Pros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProviders.map(provider => (
                <div
                  key={provider.id}
                  className="bg-white rounded-2xl border border-[#E7DCce] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-[#F3ECE2]">
                      <img
                        src={provider.coverImage}
                        alt={provider.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => toggleFavorite(provider.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white text-rose-600 shadow cursor-pointer"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-3 text-white text-xs font-bold drop-shadow flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span>{provider.rating}</span> ({provider.reviewCount})
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-[#8F2556] bg-[#FAF2F5] px-2 py-0.5 rounded">
                        {provider.categoryName}
                      </span>
                      <h4
                        onClick={() => navigateToProvider(provider.id)}
                        className="font-serif text-lg font-bold text-[#241C1D] hover:text-[#8F2556] cursor-pointer"
                      >
                        {provider.name}
                      </h4>
                      <p className="text-xs text-[#5C4A48] line-clamp-2">
                        {provider.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="pt-3 border-t border-[#F3ECE2] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#4A0E2E] tabular-nums">
                        From ${provider.startingPrice}
                      </span>
                      <button
                        onClick={() => navigateToProvider(provider.id)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-lg transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Profile & Preferences */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DCce] shadow-xs max-w-2xl mx-auto">
          <h3 className="font-serif text-xl font-bold text-[#3B0D21] mb-1">
            Event Host Profile Settings
          </h3>
          <p className="text-xs text-[#7C6866] mb-6">
            Keep your contact information up to date so event service providers can reach you promptly.
          </p>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Preferred Location</label>
                <input
                  type="text"
                  value={profile.primaryLocation}
                  onChange={e => setProfile({ ...profile, primaryLocation: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Upcoming Milestone Occasion</label>
                <input
                  type="text"
                  value={profile.nextEventType}
                  onChange={e => setProfile({ ...profile, nextEventType: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Target Date</label>
                <input
                  type="date"
                  value={profile.nextEventDate}
                  onChange={e => setProfile({ ...profile, nextEventDate: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#F3ECE2]">
              {profileSaved && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Preferences saved!
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
