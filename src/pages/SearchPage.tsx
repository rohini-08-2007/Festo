import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CITIES, EVENT_TYPES } from '../data/mockData';
import { ServiceCategory, EventType, PriceTier } from '../types';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Sparkles,
  Heart,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  CheckCircle2
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const {
    providers,
    selectedCategory,
    setSelectedCategory,
    selectedEventType,
    setSelectedEventType,
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    navigateToProvider,
    openQuoteModal,
    favorites,
    toggleFavorite
  } = useApp();

  const [priceTier, setPriceTier] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'reviews' | 'price-asc' | 'price-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter & Sort calculation
  const filteredProviders = useMemo(() => {
    return providers
      .filter(p => {
        // Must be approved by admin
        if (!p.approved) return false;

        // Keyword query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBio = p.about.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          const matchCat = p.categoryName.toLowerCase().includes(q);
          if (!matchName && !matchBio && !matchTagline && !matchCat) return false;
        }

        // Category filter
        if (selectedCategory && p.category !== selectedCategory) {
          return false;
        }

        // Location filter
        if (selectedLocation && selectedLocation !== 'All Locations') {
          if (!p.location.includes(selectedLocation) && p.city !== selectedLocation) {
            return false;
          }
        }

        // Event type filter
        if (selectedEventType && !p.supportedEvents.includes(selectedEventType)) {
          return false;
        }

        // Price Tier filter
        if (priceTier !== 'all' && p.priceTier !== priceTier) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        // Availability filter
        if (onlyAvailable && !p.isAvailable) {
          return false;
        }

        // Verified filter
        if (onlyVerified && !p.isVerified) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
          return b.rating - a.rating;
        }
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        return 0;
      });
  }, [
    providers,
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedEventType,
    priceTier,
    minRating,
    onlyAvailable,
    onlyVerified,
    sortBy
  ]);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedLocation('All Locations');
    setSelectedEventType('');
    setSearchQuery('');
    setPriceTier('all');
    setMinRating(0);
    setOnlyAvailable(false);
    setOnlyVerified(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    selectedLocation !== 'All Locations' ||
    Boolean(selectedEventType) ||
    Boolean(searchQuery) ||
    priceTier !== 'all' ||
    minRating > 0 ||
    onlyAvailable ||
    onlyVerified;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E7DCce] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B0D21]">
              Find & Book Local Event Professionals
            </h1>
            <p className="text-xs sm:text-sm text-[#7C6866] mt-0.5">
              Showing <span className="font-semibold text-[#241C1D] tabular-nums">{filteredProviders.length}</span> verified event specialists in Central Texas
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8A7978] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, floral style, DJ..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
            />
          </div>
        </div>

        {/* Filter bar summary & controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F3ECE2]">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#4A0E2E] bg-[#F5EDE4] border border-[#DFCFC0] rounded-lg cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>

            {/* Category Pill Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  !selectedCategory
                    ? 'bg-[#4A0E2E] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#5C4A48] hover:bg-[#F3ECE2]'
                }`}
              >
                All Services
              </button>
              {CATEGORIES.slice(0, 6).map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(selectedCategory === c.id ? null : c.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-[#4A0E2E] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#5C4A48] hover:bg-[#F3ECE2]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort & View Mode */}
          <div className="flex items-center gap-3 self-end">
            <div className="flex items-center gap-1.5 text-xs text-[#5C4A48]">
              <span className="text-[#8A7978] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs font-medium bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured & Recommended</option>
                <option value="rating">Highest Star Rating</option>
                <option value="reviews">Most Reviews</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-[#4A0E2E]' : 'text-[#8A7978]'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md cursor-pointer ${
                  viewMode === 'list' ? 'bg-white shadow-xs text-[#4A0E2E]' : 'text-[#8A7978]'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-[#8A7978]">Active Filters:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF2F5] text-[#8F2556] border border-[#FBCFE8]">
                Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory(null)} />
              </span>
            )}
            {selectedLocation !== 'All Locations' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF2F5] text-[#8F2556] border border-[#FBCFE8]">
                {selectedLocation}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation('All Locations')} />
              </span>
            )}
            {selectedEventType && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF2F5] text-[#8F2556] border border-[#FBCFE8]">
                Occasion: {selectedEventType}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedEventType('')} />
              </span>
            )}
            {priceTier !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF2F5] text-[#8F2556] border border-[#FBCFE8]">
                Tier: {priceTier}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceTier('all')} />
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF2F5] text-[#8F2556] border border-[#FBCFE8]">
                {minRating}+ Stars
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-[#8F2556] hover:underline text-xs font-semibold cursor-pointer ml-1"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          } bg-white p-6 rounded-2xl border border-[#E7DCce] shadow-xs space-y-6 h-fit`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#F3ECE2]">
            <h3 className="font-serif text-lg font-bold text-[#3B0D21] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#8F2556]" />
              <span>Refine Search</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] font-semibold text-[#8F2556] hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E3D]">
              Location / Area
            </label>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden cursor-pointer"
            >
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Event Type Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E3D]">
              Event Occasion
            </label>
            <select
              value={selectedEventType}
              onChange={e => setSelectedEventType(e.target.value as EventType)}
              className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden cursor-pointer"
            >
              <option value="">All Event Occasions</option>
              {EVENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Category List */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E3D]">
              Service Category
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer flex justify-between ${
                  !selectedCategory ? 'bg-[#FAF2F5] text-[#8F2556] font-semibold' : 'text-[#5C4A48] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>All Categories</span>
                <span className="tabular-nums text-[#8A7978]">{providers.length}</span>
              </button>
              {CATEGORIES.map(cat => {
                const count = providers.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer flex justify-between ${
                      selectedCategory === cat.id ? 'bg-[#FAF2F5] text-[#8F2556] font-semibold' : 'text-[#5C4A48] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="tabular-nums text-[#8A7978]">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Segmented */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E3D]">
              Price Tier
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#FAF7F2] rounded-xl border border-[#DFCFC0]">
              {['all', '$', '$$', '$$$'].map(tier => (
                <button
                  key={tier}
                  onClick={() => setPriceTier(tier)}
                  className={`py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center ${
                    priceTier === tier ? 'bg-[#4A0E2E] text-white shadow-xs' : 'text-[#5C4A48] hover:text-[#241C1D]'
                  }`}
                >
                  {tier === 'all' ? 'Any' : tier}
                </button>
              ))}
            </div>
          </div>

          {/* Star Rating Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E3D]">
              Minimum Rating
            </label>
            <div className="space-y-1.5 text-xs text-[#5C4A48]">
              {[4.9, 4.8, 4.5, 0].map(rating => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="minRating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    className="accent-[#8F2556]"
                  />
                  <span>{rating === 0 ? 'Any Rating' : `${rating}+ Stars`}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Badges and Toggles */}
          <div className="pt-2 border-t border-[#F3ECE2] space-y-2 text-xs text-[#4A3E3D]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={e => setOnlyVerified(e.target.checked)}
                className="accent-[#8F2556] rounded"
              />
              <span className="font-medium">Verified Professionals Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={e => setOnlyAvailable(e.target.checked)}
                className="accent-[#8F2556] rounded"
              />
              <span className="font-medium">Immediate Availability Only</span>
            </label>
          </div>

        </aside>

        {/* Results Area */}
        <div className="lg:col-span-3">
          {filteredProviders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#DFCFC0] p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#FAF5F0] text-[#8F2556] rounded-full flex items-center justify-center mx-auto border border-[#E7DCce]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#3B0D21]">
                No Professionals Matched Your Filters
              </h3>
              <p className="text-xs text-[#7C6866] max-w-md mx-auto leading-relaxed">
                We couldn't find any service providers matching all selected criteria. Try broadening your location or resetting filters to view all available talent.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-xl shadow-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProviders.map(provider => {
                const isFav = favorites.includes(provider.id);
                return (
                  <div
                    key={provider.id}
                    className="bg-white rounded-2xl border border-[#E7DCce] overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Media Header */}
                      <div className="relative h-48 w-full bg-[#F3ECE2] overflow-hidden">
                        <img
                          src={provider.coverImage}
                          alt={provider.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="bg-white/95 backdrop-blur-xs text-[#4A0E2E] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                            {provider.categoryName}
                          </span>
                          {provider.isFeatured && (
                            <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" /> Featured
                            </span>
                          )}
                          {provider.isVerified && (
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                              <ShieldCheck className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </div>

                        {/* Favorite button */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleFavorite(provider.id);
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#5C4A48] hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        {/* Rating overlay */}
                        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                          <span className="tabular-nums">{provider.rating}</span>
                          <span className="text-white/80 font-normal">({provider.reviewCount} reviews)</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-1 text-[11px] text-[#7C6866]">
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

                        <p className="text-xs text-[#5C4A48] line-clamp-2 leading-relaxed">
                          {provider.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="p-4 pt-0">
                      <div className="pt-3 border-t border-[#F3ECE2] space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#8A7978]">Starting package</span>
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
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProviders.map(provider => {
                const isFav = favorites.includes(provider.id);
                return (
                  <div
                    key={provider.id}
                    className="bg-white rounded-2xl border border-[#E7DCce] overflow-hidden hover:shadow-md transition-all p-4 flex flex-col sm:flex-row gap-5"
                  >
                    {/* Media Slot */}
                    <div className="relative sm:w-64 h-48 sm:h-auto rounded-xl overflow-hidden bg-[#F3ECE2] shrink-0">
                      <img
                        src={provider.coverImage}
                        alt={provider.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleFavorite(provider.id);
                        }}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#5C4A48] hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    {/* Middle Info */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-bold text-[#8F2556] bg-[#FAF2F5] px-2 py-0.5 rounded">
                            {provider.categoryName}
                          </span>
                          {provider.isFeatured && (
                            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" /> Featured
                            </span>
                          )}
                          {provider.isVerified && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <ShieldCheck className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </div>

                        <h3
                          onClick={() => navigateToProvider(provider.id)}
                          className="font-serif text-xl font-bold text-[#241C1D] hover:text-[#8F2556] cursor-pointer"
                        >
                          {provider.name}
                        </h3>

                        <p className="text-xs text-[#5C4A48] mt-1 line-clamp-2 leading-relaxed">
                          {provider.about}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#7C6866]">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <strong className="text-[#241C1D] tabular-nums">{provider.rating}</strong> ({provider.reviewCount} reviews)
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#8F2556]" />
                            {provider.location}
                          </span>
                          <span>·</span>
                          <span>{provider.eventsCompleted}+ events done</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#F3ECE2]">
                        <div>
                          <span className="text-[10px] uppercase text-[#8A7978] block">Starting from</span>
                          <span className="text-base font-bold text-[#4A0E2E] tabular-nums">
                            ${provider.startingPrice}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigateToProvider(provider.id)}
                            className="px-4 py-2 text-xs font-semibold text-[#4A3E3D] bg-[#F5EDE4] hover:bg-[#EFE3D6] rounded-lg transition-colors cursor-pointer"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => openQuoteModal(provider)}
                            className="px-5 py-2 text-xs font-semibold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-lg shadow-xs transition-colors cursor-pointer"
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
          )}
        </div>

      </div>

    </div>
  );
};
