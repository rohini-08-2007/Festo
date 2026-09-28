export type ServiceCategory =
  | 'decorations'
  | 'photography'
  | 'videography'
  | 'dj-music'
  | 'anchors-mc'
  | 'catering'
  | 'makeup'
  | 'mehendi'
  | 'bakers'
  | 'florists'
  | 'planners';

export type EventType =
  | 'Wedding'
  | 'Birthday Party'
  | 'Engagement'
  | 'College Event'
  | 'Baby Shower'
  | 'Anniversary'
  | 'Cocktail Party'
  | 'Corporate Gala'
  | 'Other';

export type PriceTier = '$' | '$$' | '$$$' | '$$$$';

export interface Review {
  id: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
  date: string;
  eventType: EventType;
  comment: string;
  helpfulCount: number;
}

export interface PackageOffer {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ProviderService {
  name: string;
  price: number;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  ownerName: string;
  category: ServiceCategory;
  categoryName: string;
  tagline: string;
  location: string;
  city: string;
  startingPrice: number;
  priceTier: PriceTier;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  yearsExperience: number;
  eventsCompleted: number;
  about: string;
  profileImage: string;
  coverImage: string;
  portfolio: string[];
  services: ProviderService[];
  packages: PackageOffer[];
  supportedEvents: EventType[];
  reviews: Review[];
  phone: string;
  email: string;
  approved: boolean; // For admin moderation
  plan: 'free' | 'pro' | 'premium';
}

export interface QuoteRequest {
  id: string;
  providerId: string;
  providerName: string;
  providerCategory: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: EventType;
  eventDate: string;
  location: string;
  guestsCount: number;
  requiredService: string;
  budget: string;
  additionalRequirements: string;
  status: 'Pending' | 'Quoted' | 'Accepted' | 'Declined';
  quotedAmount?: number;
  createdAt: string;
  providerNotes?: string;
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: EventType;
  eventDate: string;
  location: string;
  packageName: string;
  totalAmount: number;
  depositPaid: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export type UserRole = 'customer' | 'provider' | 'admin';

export type NavigationPage =
  | 'home'
  | 'categories'
  | 'search'
  | 'provider-profile'
  | 'customer-dashboard'
  | 'provider-dashboard'
  | 'provider-register'
  | 'pricing'
  | 'admin-dashboard';
