import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationPage,
  ServiceCategory,
  EventType,
  Provider,
  QuoteRequest,
  Booking,
  UserRole,
  Review
} from '../types';
import { INITIAL_PROVIDERS, INITIAL_QUOTES, INITIAL_BOOKINGS } from '../data/mockData';

interface ToastState {
  text: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  selectedCategory: ServiceCategory | null;
  setSelectedCategory: (cat: ServiceCategory | null) => void;
  selectedEventType: EventType | '';
  setSelectedEventType: (type: EventType | '') => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedProviderId: string | null;
  setSelectedProviderId: (id: string | null) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeProviderId: string;
  setActiveProviderId: (id: string) => void;
  favorites: string[];
  toggleFavorite: (providerId: string) => void;
  providers: Provider[];
  addProvider: (newProvider: Provider) => void;
  updateProvider: (id: string, updates: Partial<Provider>) => void;
  toggleProviderFeatured: (id: string) => void;
  toggleProviderVerified: (id: string) => void;
  approveProvider: (id: string, approved: boolean) => void;
  quotes: QuoteRequest[];
  addQuote: (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => string;
  updateQuoteStatus: (id: string, status: QuoteRequest['status'], quotedAmount?: number, providerNotes?: string) => void;
  bookings: Booking[];
  addBooking: (bookingData: Omit<Booking, 'id' | 'createdAt'>) => string;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  addReview: (providerId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  toast: ToastState | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  quoteModalTargetProvider: Provider | null;
  openQuoteModal: (provider: Provider) => void;
  closeQuoteModal: () => void;
  reviewModalTargetProvider: Provider | null;
  openReviewModal: (provider: Provider) => void;
  closeReviewModal: () => void;
  navigateToProvider: (providerId: string) => void;
  navigateToCategory: (category: ServiceCategory) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<EventType | ''>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [activeProviderId, setActiveProviderId] = useState<string>('prov-1');
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('eventease_favs');
      return saved ? JSON.parse(saved) : ['prov-1', 'prov-2'];
    } catch {
      return ['prov-1', 'prov-2'];
    }
  });

  const [providers, setProviders] = useState<Provider[]>(() => {
    try {
      const saved = localStorage.getItem('eventease_providers');
      return saved ? JSON.parse(saved) : INITIAL_PROVIDERS;
    } catch {
      return INITIAL_PROVIDERS;
    }
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem('eventease_quotes');
      return saved ? JSON.parse(saved) : INITIAL_QUOTES;
    } catch {
      return INITIAL_QUOTES;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('eventease_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [toast, setToast] = useState<ToastState | null>(null);
  const [quoteModalTargetProvider, setQuoteModalTargetProvider] = useState<Provider | null>(null);
  const [reviewModalTargetProvider, setReviewModalTargetProvider] = useState<Provider | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('eventease_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('eventease_providers', JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('eventease_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('eventease_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Toast helper
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(prev => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(providerId);
      const next = isFav ? prev.filter(id => id !== providerId) : [...prev, providerId];
      showToast(isFav ? 'Removed from saved favorites' : 'Added to saved favorites', 'info');
      return next;
    });
  };

  const addProvider = (newProvider: Provider) => {
    setProviders(prev => [newProvider, ...prev]);
    showToast('Your business has been registered! Awaiting admin verification.', 'success');
  };

  const updateProvider = (id: string, updates: Partial<Provider>) => {
    setProviders(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Provider profile updated successfully', 'success');
  };

  const toggleProviderFeatured = (id: string) => {
    setProviders(prev =>
      prev.map(p => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    showToast('Updated featured status', 'info');
  };

  const toggleProviderVerified = (id: string) => {
    setProviders(prev =>
      prev.map(p => (p.id === id ? { ...p, isVerified: !p.isVerified } : p))
    );
    showToast('Updated verification status', 'info');
  };

  const approveProvider = (id: string, approved: boolean) => {
    setProviders(prev =>
      prev.map(p => (p.id === id ? { ...p, approved } : p))
    );
    showToast(approved ? 'Provider application approved!' : 'Provider application rejected', approved ? 'success' : 'error');
  };

  const addQuote = (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): string => {
    const newId = `quote-${Date.now()}`;
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: newId,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setQuotes(prev => [newQuote, ...prev]);
    showToast(`Quote request sent to ${quoteData.providerName}!`, 'success');
    return newId;
  };

  const updateQuoteStatus = (
    id: string,
    status: QuoteRequest['status'],
    quotedAmount?: number,
    providerNotes?: string
  ) => {
    setQuotes(prev =>
      prev.map(q => {
        if (q.id === id) {
          return {
            ...q,
            status,
            quotedAmount: quotedAmount !== undefined ? quotedAmount : q.quotedAmount,
            providerNotes: providerNotes !== undefined ? providerNotes : q.providerNotes
          };
        }
        return q;
      })
    );
    showToast(`Quote status updated to: ${status}`, 'success');
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): string => {
    const newId = `bk-${Date.now()}`;
    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Booking confirmed with ${bookingData.providerName}!`, 'success');
    return newId;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status } : b))
    );
    showToast(`Booking status changed to ${status}`, 'info');
  };

  const addReview = (providerId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      helpfulCount: 0
    };

    setProviders(prev =>
      prev.map(p => {
        if (p.id === providerId) {
          const updatedReviews = [newReview, ...p.reviews];
          const avgRating = Number(
            (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(2)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: avgRating
          };
        }
        return p;
      })
    );
    showToast('Your review has been published. Thank you!', 'success');
  };

  const openQuoteModal = (provider: Provider) => {
    setQuoteModalTargetProvider(provider);
  };

  const closeQuoteModal = () => {
    setQuoteModalTargetProvider(null);
  };

  const openReviewModal = (provider: Provider) => {
    setReviewModalTargetProvider(provider);
  };

  const closeReviewModal = () => {
    setReviewModalTargetProvider(null);
  };

  const navigateToProvider = (providerId: string) => {
    setSelectedProviderId(providerId);
    setCurrentPage('provider-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setCurrentPage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        selectedEventType,
        setSelectedEventType,
        selectedLocation,
        setSelectedLocation,
        searchQuery,
        setSearchQuery,
        selectedProviderId,
        setSelectedProviderId,
        userRole,
        setUserRole,
        activeProviderId,
        setActiveProviderId,
        favorites,
        toggleFavorite,
        providers,
        addProvider,
        updateProvider,
        toggleProviderFeatured,
        toggleProviderVerified,
        approveProvider,
        quotes,
        addQuote,
        updateQuoteStatus,
        bookings,
        addBooking,
        updateBookingStatus,
        addReview,
        toast,
        showToast,
        quoteModalTargetProvider,
        openQuoteModal,
        closeQuoteModal,
        reviewModalTargetProvider,
        openReviewModal,
        closeReviewModal,
        navigateToProvider,
        navigateToCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
