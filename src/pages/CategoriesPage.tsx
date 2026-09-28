import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ServiceCategory } from '../types';
import {
  Sparkles,
  Camera,
  Utensils,
  Music,
  Mic,
  Palette,
  Cake,
  Flower2,
  ClipboardList,
  ArrowRight,
  Search
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { setSelectedCategory, setCurrentPage } = useApp();
  const [filterSearch, setFilterSearch] = useState('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return <Camera className="w-5 h-5 text-[#8F2556]" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[#8F2556]" />;
      case 'Music': return <Music className="w-5 h-5 text-[#8F2556]" />;
      case 'Mic': return <Mic className="w-5 h-5 text-[#8F2556]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#8F2556]" />;
      case 'Cake': return <Cake className="w-5 h-5 text-[#8F2556]" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-[#8F2556]" />;
      case 'ClipboardList': return <ClipboardList className="w-5 h-5 text-[#8F2556]" />;
      default: return <Sparkles className="w-5 h-5 text-[#8F2556]" />;
    }
  };

  const handleExplore = (categoryId: ServiceCategory) => {
    setSelectedCategory(categoryId);
    setCurrentPage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCategories = CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
    c.description.toLowerCase().includes(filterSearch.toLowerCase()) ||
    c.popularStyles.some(s => s.toLowerCase().includes(filterSearch.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8F2556]">
          All Celebratory Disciplines
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#3B0D21] tracking-tight">
          Browse Service Categories
        </h1>
        <p className="text-sm sm:text-base text-[#6B5A58] leading-relaxed">
          From breathtaking mandap decor and Michelin-grade banquet menus to cinematic videography and certified henna artists — discover specialized talent for every milestone.
        </p>

        {/* Quick Filter Search Input */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8A7978] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterSearch}
              onChange={e => setFilterSearch(e.target.value)}
              placeholder="Search category (e.g. cakes, florals, DJ)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#DFCFC0] rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map(cat => (
          <div
            key={cat.id}
            className="group bg-white rounded-2xl border border-[#E7DCce] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              {/* Media Slot with hover zoom */}
              <div className="relative h-56 w-full overflow-hidden bg-[#F3ECE2]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Float tags */}
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-md">
                    {getCategoryIcon(cat.icon)}
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold drop-shadow-xs">
                    {cat.providerCount} Verified Professionals
                  </span>
                  <span className="bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-medium">
                    Starting ${cat.startingPrice}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#241C1D] group-hover:text-[#8F2556] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#8F2556] font-medium mt-0.5">
                    {cat.tagline}
                  </p>
                </div>

                <p className="text-xs text-[#5C4A48] leading-relaxed">
                  {cat.description}
                </p>

                {/* Popular styles inline list */}
                <div className="pt-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7978] block mb-1.5">
                    Popular Specializations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.popularStyles.map(style => (
                      <span
                        key={style}
                        className="text-[11px] bg-[#FAF5F0] text-[#5C4A48] border border-[#EBE1D4] px-2 py-0.5 rounded-md"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Explore Button */}
            <div className="p-6 pt-0">
              <button
                onClick={() => handleExplore(cat.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-[#4A0E2E] bg-[#F5EDE4] hover:bg-[#4A0E2E] hover:text-white rounded-xl transition-all cursor-pointer group-hover:shadow-sm"
              >
                <span>Explore {cat.name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
