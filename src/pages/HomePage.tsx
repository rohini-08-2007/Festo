import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CITIES, EVENT_TYPES, TESTIMONIALS, HOW_IT_WORKS, HERO_IMAGE } from '../data/mockData';
import { ServiceCategory, EventType } from '../types';
import {
  Search,
  MapPin,
  Calendar,
  Sparkles,
  Star,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Heart,
  ChevronRight,
  Layers,
  Award,
  Users
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    providers,
    setCurrentPage,
    setSelectedCategory,
    setSelectedEventType,
    setSelectedLocation,
    navigateToProvider,
    openQuoteModal,
    favorites,
    toggleFavorite
  } = useApp();

  const [heroLocation, setHeroLocation] = useState('All Locations');
  const [heroEventType, setHeroEventType] = useState<EventType | ''>('');
  const [heroCategory, setHeroCategory] = useState<ServiceCategory | ''>('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedLocation(heroLocation);
    setSelectedEventType(heroEventType);
    setSelectedCategory(heroCategory ? (heroCategory as ServiceCategory) : null);
    setCurrentPage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredProviders = providers.filter(p => p.isFeatured && p.approved).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden border-b border-[#E7DCce]">
        
        {/* Background Image with warm rich contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Luxury evening event celebration"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24131C] via-[#3B1527]/80 to-[#24131C]/65" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white space-y-8">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-200 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Curated Marketplace for Central Texas Celebrations</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight sm:leading-none text-balance">
              Everything You Need for Your Perfect Event
            </h1>

            <p className="text-base sm:text-xl text-[#F0E6EB] font-light max-w-2xl mx-auto leading-relaxed">
              Discover trusted local event professionals, compare services, and make your celebration unforgettable.
            </p>
          </div>

          {/* Search Box Card */}
          <form
            onSubmit={handleHeroSearch}
            className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl shadow-2xl border border-[#DFCFC0] text-left max-w-4xl mx-auto text-[#241C1D]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Location */}
              <div className="bg-white p-2.5 rounded-xl border border-[#E7DCce] flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#8F2556] shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#8A7978]">
                    Location
                  </span>
                  <select
                    value={heroLocation}
                    onChange={e => setHeroLocation(e.target.value)}
                    className="w-full text-xs font-medium text-[#241C1D] bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Event Type */}
              <div className="bg-white p-2.5 rounded-xl border border-[#E7DCce] flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#8F2556] shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#8A7978]">
                    Event Type
                  </span>
                  <select
                    value={heroEventType}
                    onChange={e => setHeroEventType(e.target.value as EventType)}
                    className="w-full text-xs font-medium text-[#241C1D] bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    <option value="">All Event Occasions</option>
                    {EVENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Category */}
              <div className="bg-white p-2.5 rounded-xl border border-[#E7DCce] flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#8F2556] shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#8A7978]">
                    Service Category
                  </span>
                  <select
                    value={heroCategory}
                    onChange={e => setHeroCategory(e.target.value as ServiceCategory)}
                    className="w-full text-xs font-medium text-[#241C1D] bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    <option value="">All Services (Decor, Photo, DJ...)</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Submit Action */}
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#F0E6D8]">
              <div className="flex items-center gap-3 text-xs text-[#7C6866]">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Free to Inquire
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Direct Vendor Quotes
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#4A0E2E] hover:bg-[#380922] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer active:scale-98 whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Find Services</span>
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* 2. Popular Service Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8F2556]">
              Handcrafted Celebrations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B0D21] mt-1">
              Explore Popular Services
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentPage('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F2556] hover:text-[#4A0E2E] cursor-pointer group"
          >
            <span>View all 10 categories</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 10).map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage('search');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white rounded-xl border border-[#E7DCce] overflow-hidden hover:border-[#8F2556]/40 hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-32 w-full overflow-hidden bg-[#F3ECE2]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-bold text-white drop-shadow-sm">
                  {cat.providerCount} Local Pros
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#241C1D] group-hover:text-[#8F2556] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#7C6866] mt-1 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#F3ECE2] flex items-center justify-between text-[11px]">
                  <span className="text-[#8A7978]">From</span>
                  <span className="font-semibold text-[#4A0E2E] tabular-nums">
                    ${cat.startingPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Providers Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8F2556]">
              Verified & Top Rated
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B0D21] mt-1">
              Featured Event Professionals
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage('search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F2556] hover:text-[#4A0E2E] cursor-pointer group"
          >
            <span>Browse all providers</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProviders.map(provider => {
            const isFav = favorites.includes(provider.id);
            return (
              <div
                key={provider.id}
                className="bg-white rounded-xl border border-[#E7DCce] overflow-hidden hover:shadow-xl transition-all flex flex-col"
              >
                {/* Cover & Badges */}
                <div className="relative h-44 w-full bg-[#F3ECE2] overflow-hidden">
                  <img
                    src={provider.coverImage}
                    alt={provider.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category unboxed tag & Available status */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-white/90 backdrop-blur-xs text-[#4A0E2E] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {provider.categoryName}
                    </span>
                    {provider.isFeatured && (
                      <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(provider.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#5C4A48] hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Rating on image */}
                  <div className="absolute bottom-2 left-3 flex items-center gap-1 text-white text-xs font-semibold drop-shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span className="tabular-nums">{provider.rating}</span>
                    <span className="text-white/80 font-normal">({provider.reviewCount})</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-[#7C6866] mb-1">
                      <MapPin className="w-3 h-3 text-[#8F2556]" />
                      <span className="truncate">{provider.city}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">Available</span>
                    </div>

                    <h3
                      onClick={() => navigateToProvider(provider.id)}
                      className="font-serif text-lg font-bold text-[#241C1D] hover:text-[#8F2556] transition-colors cursor-pointer leading-snug"
                    >
                      {provider.name}
                    </h3>

                    <p className="text-xs text-[#5C4A48] line-clamp-2 mt-1 leading-relaxed">
                      {provider.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F3ECE2] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8A7978]">Starting at</span>
                      <span className="text-sm font-bold text-[#4A0E2E] tabular-nums">
                        ${provider.startingPrice}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigateToProvider(provider.id)}
                        className="w-full py-2 text-xs font-semibold text-[#4A3E3D] bg-[#F5EDE4] hover:bg-[#EFE3D6] rounded-lg transition-colors text-center cursor-pointer"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => openQuoteModal(provider)}
                        className="w-full py-2 text-xs font-semibold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-lg shadow-xs transition-colors text-center cursor-pointer"
                      >
                        Contact
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="bg-[#F3ECE2]/80 border-y border-[#DFCFC0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8F2556]">
              Streamlined Event Planning
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B0D21]">
              How EventEase Works
            </h2>
            <p className="text-sm text-[#6B5A58]">
              No back-and-forth phone tag. Find verified local talent, review upfront pricing, and book your date seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} className="bg-white p-6 rounded-xl border border-[#DFCFC0] shadow-sm relative">
                <span className="font-serif text-3xl font-bold text-[#DFCFC0] block mb-2">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-[#241C1D] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5C4A48] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8F2556]">
            Real Stories, Real Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B0D21]">
            Loved by Event Hosts Across Texas
          </h2>
          <p className="text-sm text-[#6B5A58]">
            Over 2,400 weddings, baby showers, and milestones planned with zero stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-xl border border-[#E7DCce] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#3E3231] italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F3ECE2] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#DFCFC0]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#241C1D]">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-[#7C6866]">
                    {t.event} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Join as a Service Provider CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#3B0D21] via-[#521531] to-[#3B0D21] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-medium border border-white/15">
              <Award className="w-3.5 h-3.5" />
              <span>For Event Professionals & Artisans</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Grow Your Event Business with EventEase
            </h2>

            <p className="text-sm sm:text-base text-[#E0D3DA] leading-relaxed">
              Get discovered by high-intent clients looking for decorators, caterers, photographers, DJs, and bakers in your city. List your packages, accept quote inquiries, and keep 100% of your earnings on our Starter plan.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setCurrentPage('provider-register');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                <span>List Your Business for Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Compare Partner Plans
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
