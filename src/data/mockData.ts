import { Provider, ServiceCategory, EventType, QuoteRequest, Booking } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_event_celebration_1790579583884.jpg';
export const CATEGORY_DECOR_IMG = '/src/assets/images/category_decorations_1790579598317.jpg';
export const CATEGORY_CATERING_IMG = '/src/assets/images/category_catering_1790579610860.jpg';
export const CATEGORY_PHOTO_IMG = '/src/assets/images/category_photography_1790579623123.jpg';
export const CATEGORY_CAKE_IMG = '/src/assets/images/category_cake_1790579633583.jpg';

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  startingPrice: number;
  providerCount: number;
  popularStyles: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'decorations',
    name: 'Event Decorators',
    tagline: 'Mandaps, stages, balloon artistry & ambient floral themes',
    description: 'Bespoke stage styling, grand entryways, celestial lighting, and luxury floral installations tailored to your vision.',
    icon: 'Sparkles',
    image: CATEGORY_DECOR_IMG,
    startingPrice: 350,
    providerCount: 48,
    popularStyles: ['Floral Canopies', 'Boho Chic', 'Traditional Heritage', 'Neon & Modern']
  },
  {
    id: 'photography',
    name: 'Photographers',
    tagline: 'Candid storytelling, portraits & cinematic memories',
    description: 'Award-winning photojournalists capturing real emotions, family milestones, and timeless editorial frames.',
    icon: 'Camera',
    image: CATEGORY_PHOTO_IMG,
    startingPrice: 400,
    providerCount: 62,
    popularStyles: ['Candid Storytelling', 'Fine-Art Editorial', 'Drone Aerials', 'Pre-Event Sessions']
  },
  {
    id: 'catering',
    name: 'Caterers & Banquets',
    tagline: 'Artisanal buffets, live food stations & multi-cuisine menus',
    description: 'Exquisite culinary spreads from traditional royal feasts to modern global fusion and bespoke dessert bars.',
    icon: 'Utensils',
    image: CATEGORY_CATERING_IMG,
    startingPrice: 18, // per person
    providerCount: 39,
    popularStyles: ['Farm-to-Table', 'Live Interactive Counters', 'Heritage Banquets', 'Gourmet Fingerfood']
  },
  {
    id: 'dj-music',
    name: 'DJs & Live Music',
    tagline: 'Sound systems, dancefloor lighting & energetic beats',
    description: 'Club-grade audio equipment, crowd-reading DJs, percussionists, and live acoustic bands for every tempo.',
    icon: 'Music',
    image: HERO_IMAGE,
    startingPrice: 300,
    providerCount: 34,
    popularStyles: ['Top 40 & Bollywood', 'Deep House & Nu-Disco', 'Live Sax & Percussion', 'Acoustic Serenade']
  },
  {
    id: 'anchors-mc',
    name: 'Anchors & MCs',
    tagline: 'Engaging hosts, bilingual presenters & crowd energizers',
    description: 'Charismatic masters of ceremonies who keep your timeline crisp, entertain guests, and elevate the energy.',
    icon: 'Mic',
    image: HERO_IMAGE,
    startingPrice: 200,
    providerCount: 22,
    popularStyles: ['Bilingual Hosts', 'Corporate Galas', 'Sangeet Hosts', 'Interactive Games']
  },
  {
    id: 'makeup',
    name: 'Makeup Artists',
    tagline: 'Bridal glam, HD airbrush, hair artistry & party looks',
    description: 'Certified makeup artists specializing in camera-ready natural glows, dramatic evening glam, and bridal hairstyling.',
    icon: 'Sparkle',
    image: CATEGORY_PHOTO_IMG,
    startingPrice: 150,
    providerCount: 51,
    popularStyles: ['Dewy Bridal HD', 'Airbrush Glam', 'Minimalist Elegance', 'Vintage Retro Hair']
  },
  {
    id: 'mehendi',
    name: 'Mehendi Artists',
    tagline: 'Bridal henna, Arabic motifs, organic stains & bridal party packs',
    description: 'Intricate Rajasthani, Arabic, and personalized portrait henna applied with 100% natural herbal henna paste.',
    icon: 'Palette',
    image: CATEGORY_DECOR_IMG,
    startingPrice: 80,
    providerCount: 29,
    popularStyles: ['Intricate Rajasthani', 'Arabic Modern', 'Storyline Portrait Henna', 'Minimalist Mandala']
  },
  {
    id: 'bakers',
    name: 'Cakes & Bakery',
    tagline: 'Tiered wedding cakes, dessert tables & personalized treats',
    description: 'Customized designer cakes, luxury dessert grazing tables, and handmade celebration pastries crafted with fine ingredients.',
    icon: 'Cake',
    image: CATEGORY_CAKE_IMG,
    startingPrice: 75,
    providerCount: 31,
    popularStyles: ['Tiered Architectural Cakes', 'Gold Leaf Accents', 'Gourmet Cupcake Towers', 'Macaron Pyramids']
  },
  {
    id: 'florists',
    name: 'Florists & Botanicals',
    tagline: 'Fresh cut arrangements, bridal bouquets & greenery installations',
    description: 'Fresh seasonal floral arches, hand-tied bride bouquets, boutonnières, and lush centerpieces.',
    icon: 'Flower2',
    image: CATEGORY_DECOR_IMG,
    startingPrice: 120,
    providerCount: 26,
    popularStyles: ['Lush Garden Greens', 'Monochromatic Rose', 'Dried Pampas & Terracotta', 'Tropical Exotics']
  },
  {
    id: 'planners',
    name: 'Event Planners',
    tagline: 'Full-service management, day-of coordination & vendor booking',
    description: 'End-to-end event conceptualization, budget auditing, vendor orchestration, and day-of execution peace of mind.',
    icon: 'ClipboardList',
    image: HERO_IMAGE,
    startingPrice: 600,
    providerCount: 24,
    popularStyles: ['Full Event Production', 'Day-Of Coordination', 'Destination Events', 'Budget Management']
  }
];

export const CITIES = [
  'All Locations',
  'Austin Metro',
  'Downtown & South Congress',
  'North Hills & Round Rock',
  'Lake Travis & Hill Country',
  'Cedar Park & Georgetown'
];

export const EVENT_TYPES: EventType[] = [
  'Wedding',
  'Birthday Party',
  'Engagement',
  'Baby Shower',
  'Corporate Gala',
  'Anniversary',
  'Cocktail Party',
  'College Event',
  'Other'
];

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'prov-1',
    name: 'Aura Luxe Event Styling',
    ownerName: 'Elena Rostova',
    category: 'decorations',
    categoryName: 'Event Decorators',
    tagline: 'Transforming ballrooms & open lawns into cinematic wonderlands.',
    location: 'Downtown & South Congress, Austin',
    city: 'Downtown & South Congress',
    startingPrice: 650,
    priceTier: '$$$',
    rating: 4.94,
    reviewCount: 142,
    isVerified: true,
    isFeatured: true,
    isAvailable: true,
    yearsExperience: 8,
    eventsCompleted: 430,
    about: 'Aura Luxe is an architectural and floral design studio committed to crafting unforgettable atmospheres. We specialize in high-concept stage arches, cascading ceiling floral runners, custom backdrop builds, and warm architectural lighting. Having styled over 400 weddings, corporate summits, and intimate engagements, we curate every texture to mirror your celebration story.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: CATEGORY_DECOR_IMG,
    portfolio: [
      CATEGORY_DECOR_IMG,
      HERO_IMAGE,
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: 'Ceremony Stage & Mandap Styling', price: 1200, description: 'Bespoke structural arch with fresh imported floral clusters, sheer drapery, and candle arrangements.' },
      { name: 'Reception Tablescape & Ambient Lighting', price: 850, description: 'Centerpieces for 12 tables, custom linen chargers, menu cards, and fairy-string ceiling installation.' },
      { name: 'Photo-Ready Entrance Arch & Welcome Board', price: 450, description: 'Personalized mirror or wood calligraphy sign surrounded by organic floral and greenery framing.' }
    ],
    packages: [
      {
        id: 'aura-pkg-1',
        name: 'The Intimate Glow',
        price: 950,
        description: 'Ideal for engagements, baby showers, and anniversary banquets up to 75 guests.',
        features: ['Custom backdrop structure with florals', 'Welcome entryway setup & signage', 'Up to 8 floral table centerpieces', 'Warm perimeter uplighting (6 units)', 'Full setup & breakdown crew']
      },
      {
        id: 'aura-pkg-2',
        name: 'Grand Signature Gala',
        price: 2400,
        description: 'Our most sought-after full-room transformation for grand weddings and gala evenings.',
        features: ['Full stage or ceremony floral canopy', 'Runway aisle markers and candlelight', 'Tablescape decor for up to 25 tables', 'Statement photo booth installation with neon lettering', 'Dedicated site manager and floral refreshes'],
        popular: true
      },
      {
        id: 'aura-pkg-3',
        name: 'Haute Couture Custom',
        price: 4800,
        description: 'Fully custom architectural styling with ceiling suspended floristry and bespoke props.',
        features: ['Suspended ceiling greenery & chandelier grid', 'Custom CNC cut backdrops & monogram logos', 'Lounge furniture vignettes & velvet armchairs', '3D visual render walkthrough prior to build', 'Unlimited consultation & on-site styling crew']
      }
    ],
    supportedEvents: ['Wedding', 'Engagement', 'Corporate Gala', 'Baby Shower', 'Birthday Party'],
    reviews: [
      {
        id: 'rev-101',
        authorName: 'Sophia & Julian Miller',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'August 14, 2026',
        eventType: 'Wedding',
        comment: 'Elena and the Aura Luxe team completely blew us away. Walking into the ballroom felt like stepping into an editorial magazine. The floral arch was lush, scented, and stayed vibrant all evening. Worth every single penny!',
        helpfulCount: 24
      },
      {
        id: 'rev-102',
        authorName: 'Marcus Vance',
        authorLocation: 'Round Rock, TX',
        rating: 5,
        date: 'July 28, 2026',
        eventType: 'Corporate Gala',
        comment: 'We booked them for our annual tech summit dinner (250 executives). Flawless execution, professional communication, and zero stress on event day. They delivered ahead of schedule.',
        helpfulCount: 17
      }
    ],
    phone: '+1 (512) 555-0192',
    email: 'hello@auraluxestyling.com',
    approved: true,
    plan: 'premium'
  },
  {
    id: 'prov-2',
    name: 'Verve Shutter & Cinema',
    ownerName: 'Devon Wright & Priya Nair',
    category: 'photography',
    categoryName: 'Photographers',
    tagline: 'Soulful documentary wedding photography & cinematic 4K film.',
    location: 'Austin Metro',
    city: 'Austin Metro',
    startingPrice: 500,
    priceTier: '$$$',
    rating: 4.98,
    reviewCount: 218,
    isVerified: true,
    isFeatured: true,
    isAvailable: true,
    yearsExperience: 9,
    eventsCompleted: 520,
    about: 'Verve Shutter is a duo of passionate photojournalists obsessed with authentic laughter, spontaneous teardrops, and unscripted joy. Rather than stiff posing, we blend in with your crowd to document emotions as they unfold. We deliver warm, timeless color grading with fast 14-day turnaround.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: CATEGORY_PHOTO_IMG,
    portfolio: [
      CATEGORY_PHOTO_IMG,
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: 'Full-Day Wedding Documentary Coverage', price: 1800, description: '8 hours of dual-photographer coverage, online gallery, and 500+ high-res edited files.' },
      { name: '4K Cinematic Highlight Reel (5-7 mins)', price: 1200, description: 'Cinematic drone shots, speech audio sync, and licensed emotional soundtrack.' },
      { name: 'Engagement / Pre-Wedding Session', price: 400, description: '2 hours at sunset in Hill Country or downtown, 50 edited images.' }
    ],
    packages: [
      {
        id: 'verve-pkg-1',
        name: 'Celebration Half-Day',
        price: 900,
        description: 'Ideal for intimate birthdays, graduation banquets, and engagement parties.',
        features: ['4 hours continuous coverage', 'Single master photographer', '250+ professionally edited photos', 'Private digital gallery with full print rights', 'Sneak peek within 48 hours']
      },
      {
        id: 'verve-pkg-2',
        name: 'The Full Cinematic Story',
        price: 2800,
        description: 'Complete photo + cinema film for weddings and milestone celebrations.',
        features: ['8 hours coverage with 2 photographers + 1 videographer', 'Drone 4K aerial footage', '600+ high-res images with custom color grading', '5-minute cinematic film + full ceremony multi-cam recording', 'Handcrafted heirloom linen photo book'],
        popular: true
      }
    ],
    supportedEvents: ['Wedding', 'Engagement', 'Birthday Party', 'College Event', 'Corporate Gala'],
    reviews: [
      {
        id: 'rev-201',
        authorName: 'Camila & Sean Harris',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'September 02, 2026',
        eventType: 'Wedding',
        comment: 'Devon and Priya captured the spirit of our day so tenderly. Our sneak peek arrived within 36 hours and made our families cry tears of happiness. True artists who make you feel completely relaxed.',
        helpfulCount: 31
      }
    ],
    phone: '+1 (512) 555-0814',
    email: 'info@verveshutter.com',
    approved: true,
    plan: 'premium'
  },
  {
    id: 'prov-3',
    name: 'Saffron & Sage Artisanal Banquets',
    ownerName: 'Chef Rahul Kapoor & Marie Blanc',
    category: 'catering',
    categoryName: 'Caterers & Banquets',
    tagline: 'Farm-to-table feasts, interactive live kitchens & bespoke banquets.',
    location: 'Lake Travis & Hill Country',
    city: 'Lake Travis & Hill Country',
    startingPrice: 32,
    priceTier: '$$$',
    rating: 4.91,
    reviewCount: 164,
    isVerified: true,
    isFeatured: true,
    isAvailable: true,
    yearsExperience: 12,
    eventsCompleted: 680,
    about: 'Saffron & Sage brings theatrical gastronomy to weddings, cocktail galas, and festive receptions. We collaborate with Texas organic farms to curate multi-course menus featuring live carving boards, aromatic biryani handis, wood-fired flatbreads, and fusion tapas. Our uniformed hospitality crew guarantees white-glove service from appetizer to dessert.',
    profileImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    coverImage: CATEGORY_CATERING_IMG,
    portfolio: [
      CATEGORY_CATERING_IMG,
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: 'Live Gourmet Food Stations', price: 45, description: 'Interactive stations including hand-rolled sushi, artisan street chaat, and smoked brisket sliders (per guest).' },
      { name: 'Plated 3-Course Dinner Service', price: 65, description: 'Fine-dining service with seasonal appetizers, paired mains, and dessert trio (per guest).' },
      { name: 'Celebration Cocktail Hors d’oeuvres', price: 28, description: '6 circulating warm and cold appetizers with mocktail/cocktail pairings (per guest).' }
    ],
    packages: [
      {
        id: 'saffron-pkg-1',
        name: 'The Festive Buffet Feast',
        price: 2200,
        description: 'Complete banquet menu for 50 guests with 3 appetizers, 4 mains, rice/breads & 2 desserts.',
        features: ['50-guest minimum base package', 'Complimentary tasting session for 2', 'Professional uniformed serving staff', 'Stainless chafing dishes, fine cutlery & linen', 'Coffee & infused refreshment station']
      },
      {
        id: 'saffron-pkg-2',
        name: 'Grand Royal Banquet & Live Counters',
        price: 4900,
        description: 'Luxury multi-station feast for 100 guests with 2 live chef cooking stations.',
        features: ['100 guests included ($45 per additional guest)', '2 interactive live chef counters', '5 passed hors d’oeuvres during reception', 'Decadent dessert dessert lounge with warm churros & rabri', 'Full cleanup, table bussing and trash removal'],
        popular: true
      }
    ],
    supportedEvents: ['Wedding', 'Corporate Gala', 'Engagement', 'Birthday Party', 'Anniversary'],
    reviews: [
      {
        id: 'rev-301',
        authorName: 'Ananya Deshmukh',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'July 19, 2026',
        eventType: 'Engagement',
        comment: 'Every single guest complimented the food! The live counter was a huge hit, and the flavors were rich, authentic, and perfectly spiced. Chef Rahul took care of all dietary requirements with grace.',
        helpfulCount: 19
      }
    ],
    phone: '+1 (512) 555-0377',
    email: 'banquets@saffronsage.com',
    approved: true,
    plan: 'pro'
  },
  {
    id: 'prov-4',
    name: 'Pulse & Rhythm DJ Collective',
    ownerName: 'DJ Jordan Cruz',
    category: 'dj-music',
    categoryName: 'DJs & Live Music',
    tagline: 'High-energy dance floors, intelligent lighting & seamless mixing.',
    location: 'North Hills & Round Rock',
    city: 'North Hills & Round Rock',
    startingPrice: 350,
    priceTier: '$$',
    rating: 4.93,
    reviewCount: 96,
    isVerified: true,
    isFeatured: true,
    isAvailable: true,
    yearsExperience: 7,
    eventsCompleted: 310,
    about: 'We don’t just play music — we orchestrate the emotional trajectory of your night. From romantic slow acoustics during cocktail hour to explosive bass drops that pack the dancefloor until 2 AM. Equipped with wireless microphones, custom lighting rigs, and bilingual MC capabilities.',
    profileImage: 'https://images.unsplash.com/photo-1520523839898-50712702759e?auto=format&fit=crop&w=400&q=80',
    coverImage: HERO_IMAGE,
    portfolio: [
      HERO_IMAGE,
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: 'Dancefloor DJ & MC Service (4 Hours)', price: 700, description: 'Full concert-grade QSC sound system, wireless mics, and custom playlist curation.' },
      { name: 'Intelligent Beam & Uplighting Package', price: 350, description: '12 wireless RGBW uplights synced to music beat plus dancefloor spot washes.' },
      { name: 'Low-Fog "Dancing on Clouds" Effect', price: 250, description: 'Cold-dry ice low fog machine creating a romantic cloud effect for first dances.' }
    ],
    packages: [
      {
        id: 'pulse-pkg-1',
        name: 'The Party Starter',
        price: 550,
        description: 'Perfect for birthdays, college formals, and backyard anniversary bashes.',
        features: ['Up to 4 hours DJ performance', '2 active 12-inch speakers + wireless microphone', 'Sound-activated LED dancefloor light bar', 'Pre-event consultation & "do not play" list']
      },
      {
        id: 'pulse-pkg-2',
        name: 'The Premium Celebration Suite',
        price: 1350,
        description: 'Comprehensive sound, wireless lighting, and bilingual MC for premier weddings.',
        features: ['6 hours coverage (Cocktail + Dinner + Reception)', 'Subwoofer augmented sound system', '12 programmable room uplights in custom wedding colors', 'Cold sparkler machines (indoor safe) for grand entrance', 'Professional MC introductions and timeline management'],
        popular: true
      }
    ],
    supportedEvents: ['Wedding', 'Birthday Party', 'College Event', 'Cocktail Party', 'Corporate Gala'],
    reviews: [
      {
        id: 'rev-401',
        authorName: 'Tyler Jennings',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'August 22, 2026',
        eventType: 'Birthday Party',
        comment: 'DJ Jordan read the room like a champion! Nobody sat down for 3 hours straight. Seamless transitions across hip hop, 90s throwbacks, and electronic classics.',
        helpfulCount: 14
      }
    ],
    phone: '+1 (512) 555-0622',
    email: 'bookings@pulserhythm.com',
    approved: true,
    plan: 'pro'
  },
  {
    id: 'prov-5',
    name: 'Elegance Bridal & Glamour Studio',
    ownerName: 'Maya Al-Mansoor',
    category: 'makeup',
    categoryName: 'Makeup Artists',
    tagline: 'Luminous bridal glam, HD airbrush & editorial hair artistry.',
    location: 'Cedar Park & Georgetown',
    city: 'Cedar Park & Georgetown',
    startingPrice: 180,
    priceTier: '$$',
    rating: 4.97,
    reviewCount: 153,
    isVerified: true,
    isFeatured: false,
    isAvailable: true,
    yearsExperience: 8,
    eventsCompleted: 410,
    about: 'Certified luxury bridal makeup artist with training in Paris and Dubai. Maya specializes in long-wear, sweat-resistant, HD airbrush formulations that look breathtaking both in-person and under 4K camera lenses. We travel on-site with a dedicated glam squad for bridal parties.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: CATEGORY_PHOTO_IMG,
    portfolio: [
      CATEGORY_PHOTO_IMG,
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: 'Bridal HD Airbrush Makeup & Hair Styling', price: 350, description: 'Luxury skincare prep, long-lasting airbrush foundation, mink lashes, and ornate updo styling.' },
      { name: 'Bridal Party & Bridesmaid Glam', price: 150, description: 'Full face makeup with lashes and choice of soft curls or textured braid.' },
      { name: 'Pre-Wedding Trial & Consultation', price: 180, description: '2.5 hour private studio session exploring two distinct makeup and hair looks.' }
    ],
    packages: [
      {
        id: 'maya-pkg-1',
        name: 'The Bridal Radiance Suite',
        price: 650,
        description: 'Complete bride pampering on event morning.',
        features: ['Full bridal trial prior to wedding', 'Day-of HD airbrush makeup with lash extensions', 'Intricate bridal hairdo with veil and floral pin settings', 'Luxury touch-up kit (lipstick, powder, blotters)', 'On-location travel within 35 miles'],
        popular: true
      }
    ],
    supportedEvents: ['Wedding', 'Engagement', 'Cocktail Party', 'Baby Shower', 'Birthday Party'],
    reviews: [
      {
        id: 'rev-501',
        authorName: 'Jessica Lin',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'August 05, 2026',
        eventType: 'Wedding',
        comment: 'My makeup stayed flawless through tears, 90-degree Texas heat, and 6 hours of dancing! Maya is a magician with hair and skin tones. I felt like the most confident version of myself.',
        helpfulCount: 22
      }
    ],
    phone: '+1 (512) 555-0941',
    email: 'maya@elegancebridal.com',
    approved: true,
    plan: 'free'
  },
  {
    id: 'prov-6',
    name: 'Velvet Whisk Confections',
    ownerName: 'Chloe Dupond',
    category: 'bakers',
    categoryName: 'Cakes & Bakery',
    tagline: 'Sculptural luxury wedding cakes & artisan dessert tables.',
    location: 'Downtown & South Congress, Austin',
    city: 'Downtown & South Congress',
    startingPrice: 120,
    priceTier: '$$$',
    rating: 4.92,
    reviewCount: 118,
    isVerified: true,
    isFeatured: true,
    isAvailable: true,
    yearsExperience: 6,
    eventsCompleted: 350,
    about: 'At Velvet Whisk, we believe a celebration cake should be as sensational to taste as it is visually arresting. We work with organic French butter, Swiss chocolate ganache, and Madagascar vanilla beans. Every sugar blossom and 24-karat edible gold flake is individually hand-placed in our boutique bakery.',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImage: CATEGORY_CAKE_IMG,
    portfolio: [
      CATEGORY_CAKE_IMG,
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: '3-Tier Custom Wedding Cake', price: 420, description: 'Serves 80-100 guests. Choice of 3 flavor tiers with custom textured buttercream and sugar florals.' },
      { name: 'Celebration Fondant Character Cake', price: 180, description: 'Custom shaped 3D themed cakes for birthdays and baby showers.' },
      { name: 'Petite Dessert Table Bar (60 pieces)', price: 240, description: 'French macarons, salted caramel tartlets, and Belgian cake pops.' }
    ],
    packages: [
      {
        id: 'velvet-pkg-1',
        name: 'Sweet Harmony Wedding Package',
        price: 580,
        description: 'Complete cake and dessert styling for modern celebrations.',
        features: ['3-tier bespoke wedding cake (serves 90)', 'Tasting sample box delivered to your home', 'Acrylic or vintage gold cake stand rental', 'Safe refrigerated on-site delivery & setup', 'Complimentary 1st anniversary keepsake tier'],
        popular: true
      }
    ],
    supportedEvents: ['Wedding', 'Birthday Party', 'Baby Shower', 'Engagement', 'Anniversary'],
    reviews: [
      {
        id: 'rev-601',
        authorName: 'David & Rachel Thorne',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'July 11, 2026',
        eventType: 'Wedding',
        comment: 'The cake was breathtaking! We chose raspberry champagne and salted espresso chocolate. Everyone asked for seconds. Chloe is extraordinarily talented.',
        helpfulCount: 18
      }
    ],
    phone: '+1 (512) 555-0453',
    email: 'chloe@velvetwhiskcakes.com',
    approved: true,
    plan: 'pro'
  },
  {
    id: 'prov-7',
    name: 'Henna Couture by Zara',
    ownerName: 'Zara Siddiqui',
    category: 'mehendi',
    categoryName: 'Mehendi Artists',
    tagline: '100% natural dark henna stains, modern Arabic & intricate bridal motifs.',
    location: 'Austin Metro',
    city: 'Austin Metro',
    startingPrice: 90,
    priceTier: '$',
    rating: 4.95,
    reviewCount: 94,
    isVerified: true,
    isFeatured: false,
    isAvailable: true,
    yearsExperience: 7,
    eventsCompleted: 280,
    about: 'Zara has mastered the art of organic botanical henna with a deep mahogany stain that develops beautifully. We hand-mix fresh eucalyptus and lavender essential oils with triple-sifted Sojat henna powder. From geometric contemporary wrists to full traditional bridal arms and feet with hidden groom names.',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: CATEGORY_DECOR_IMG,
    portfolio: [
      CATEGORY_DECOR_IMG,
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: 'Bridal Henna (Elbows to Palms & Feet)', price: 320, description: 'Intricate personalized design with couple portraits and date etchings.' },
      { name: 'Party Hourly Rate (Guests)', price: 100, description: 'Rapid application of elegant Arabic single-strip or mandala designs for 8-10 guests per hour.' }
    ],
    packages: [
      {
        id: 'zara-pkg-1',
        name: 'The Complete Sangeet Henna Night',
        price: 520,
        description: 'Complete coverage for the bride plus 3 hours of guest application.',
        features: ['Intricate bridal arms and feet application', '3 hours dedicated guest artist for family and friends', 'Fresh organic lemon-sugar seal spray provided', 'Aftercare balm & tape wrap kit included'],
        popular: true
      }
    ],
    supportedEvents: ['Wedding', 'Engagement', 'Baby Shower', 'Birthday Party'],
    reviews: [
      {
        id: 'rev-701',
        authorName: 'Fatima Qureshi',
        authorLocation: 'Cedar Park, TX',
        rating: 5,
        date: 'June 30, 2026',
        eventType: 'Wedding',
        comment: 'Zara’s henna smelled heavenly and the stain turned a rich dark mahogany within 48 hours. Her speed and symmetry are unmatched!',
        helpfulCount: 16
      }
    ],
    phone: '+1 (512) 555-0731',
    email: 'zara@hennacouture.com',
    approved: true,
    plan: 'free'
  },
  {
    id: 'prov-8',
    name: 'Wild & Bloom Botanical Florists',
    ownerName: 'Chloe Bennett',
    category: 'florists',
    categoryName: 'Florists & Botanicals',
    tagline: 'Sustainable seasonal floral sculptures, bouquets & botanical arches.',
    location: 'Downtown & South Congress, Austin',
    city: 'Downtown & South Congress',
    startingPrice: 200,
    priceTier: '$$',
    rating: 4.88,
    reviewCount: 79,
    isVerified: true,
    isFeatured: false,
    isAvailable: true,
    yearsExperience: 5,
    eventsCompleted: 210,
    about: 'Wild & Bloom crafts foam-free, eco-conscious floral installations. We source directly from Texas flower growers and Dutch flower auctions to curate whimsical, garden-inspired compositions with textured foliage, garden roses, ranunculus, and sweet peas.',
    profileImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    coverImage: CATEGORY_DECOR_IMG,
    portfolio: [
      CATEGORY_DECOR_IMG,
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: 'Bridal Bouquet & Boutonniere Duo', price: 220, description: 'Hand-tied organic bridal bouquet with silk ribbon finish and groom boutonniere.' },
      { name: 'Floral Ceremony Arch Installation', price: 850, description: 'Custom grounded or suspended floral arrangement with seasonal premium blossoms.' }
    ],
    packages: [
      {
        id: 'wild-pkg-1',
        name: 'The Botanical Romance Bundle',
        price: 1450,
        description: 'Floral package for ceremonies up to 100 guests.',
        features: ['1 Grand bridal bouquet + 4 bridesmaid bouquets', '6 Boutonnieres + 2 mother corsages', 'Statement ceremony arch floral adornment', '10 Table centerpieces in ceramic compotes', 'Delivery and setup included'],
        popular: true
      }
    ],
    supportedEvents: ['Wedding', 'Engagement', 'Baby Shower', 'Anniversary'],
    reviews: [
      {
        id: 'rev-801',
        authorName: 'Liam & Natalie Ross',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'May 18, 2026',
        eventType: 'Wedding',
        comment: 'Chloe created the most stunning garden arch we have ever seen. The fragrance was enchanting and every flower was in prime bloom.',
        helpfulCount: 11
      }
    ],
    phone: '+1 (512) 555-0211',
    email: 'chloe@wildandbloom.com',
    approved: true,
    plan: 'free'
  },
  {
    id: 'prov-9',
    name: 'StageCraft Anchors & Hosts',
    ownerName: 'Rohan Mehra & Claire Sterling',
    category: 'anchors-mc',
    categoryName: 'Anchors & MCs',
    tagline: 'Magnetic stage presence, bilingual humor & immaculate timing.',
    location: 'Downtown & South Congress, Austin',
    city: 'Downtown & South Congress',
    startingPrice: 250,
    priceTier: '$$',
    rating: 4.9,
    reviewCount: 88,
    isVerified: true,
    isFeatured: false,
    isAvailable: true,
    yearsExperience: 8,
    eventsCompleted: 340,
    about: 'StageCraft provides seasoned hosts for corporate award shows, weddings, sangeet performances, and milestone galas. With broadcast experience and quick comedic wit, we ensure speeches run on time, transitions are effortless, and your guests stay thoroughly entertained without awkward pauses.',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: HERO_IMAGE,
    portfolio: [
      HERO_IMAGE,
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: '4-Hour Wedding Reception Emcee', price: 600, description: 'Grand entrances, cake-cutting coordination, first dance cues, interactive shoe game, and timeline coordination.' },
      { name: 'Corporate Gala & Awards Presentation', price: 800, description: 'Formal keynote introductions, raffle draws, and speaker queue management.' }
    ],
    packages: [
      {
        id: 'stage-pkg-1',
        name: 'The Full Celebration Host',
        price: 750,
        description: 'Comprehensive hosting for receptions, sangeets, and galas.',
        features: ['Pre-event script & run-of-show timeline consultation', 'Coordination with DJ, caterer, and photographer', 'Interactive audience games and laughter moments', 'Bilingual announcements (English / Hindi / Spanish available)'],
        popular: true
      }
    ],
    supportedEvents: ['Wedding', 'Corporate Gala', 'College Event', 'Birthday Party', 'Anniversary'],
    reviews: [
      {
        id: 'rev-901',
        authorName: 'Sunita & Vikram Patel',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'April 20, 2026',
        eventType: 'Wedding',
        comment: 'Rohan was the backbone of our sangeet and reception! He kept both our older relatives and college friends laughing and cheering. Absolute professional.',
        helpfulCount: 15
      }
    ],
    phone: '+1 (512) 555-0899',
    email: 'rohan@stagecrafthosts.com',
    approved: true,
    plan: 'pro'
  },
  {
    id: 'prov-10',
    name: 'Grandeur Event Orchestration',
    ownerName: 'Isabella Fontaine',
    category: 'planners',
    categoryName: 'Event Planners',
    tagline: 'End-to-end luxury event coordination, vendor management & zero-stress execution.',
    location: 'Lake Travis & Hill Country',
    city: 'Lake Travis & Hill Country',
    startingPrice: 800,
    priceTier: '$$$$',
    rating: 5.0,
    reviewCount: 95,
    isVerified: true,
    isFeatured: true,
    isAvailable: true,
    yearsExperience: 11,
    eventsCompleted: 390,
    about: 'Grandeur Event Orchestration is Austin’s premier boutique planning atelier. Isabella and her seasoned production team handle every logistical nuance: contract negotiations, floorplans, permits, contingency rain plans, run-of-show spreadsheets, and day-of execution. We allow you to be a relaxed guest at your own landmark event.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: HERO_IMAGE,
    portfolio: [
      HERO_IMAGE,
      CATEGORY_DECOR_IMG,
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      { name: 'Month-Of / Day-Of Event Coordination', price: 1400, description: 'Timeline takeover 30 days prior, vendor check-ins, rehearsal direction, and 12 hours on-site team management.' },
      { name: 'Full-Service Luxury Event Planning', price: 3800, description: 'Complete 360 planning from venue scouting and design board creation to budget management and day-of orchestration.' }
    ],
    packages: [
      {
        id: 'grandeur-pkg-1',
        name: 'The Day-Of Serenity Suite',
        price: 1500,
        description: 'For couples and hosts who have booked vendors and need expert day-of direction.',
        features: ['Timeline handover 4 weeks prior to date', 'Detailed minute-by-minute vendor schedule creation', 'Lead coordinator + assistant on-site for 10 hours', 'Emergency kit on standby & personal attendant for hosts'],
        popular: true
      },
      {
        id: 'grandeur-pkg-2',
        name: 'The Royal Couture Experience',
        price: 4500,
        description: 'Bespoke end-to-end event planning & vendor curation.',
        features: ['Unlimited planning meetings & venue walk-throughs', 'Vendor contract negotiations (saving you 10-15%)', 'Complete aesthetic concept & 3D styling design deck', 'RSVP tracking, transportation & hotel block management', '3 dedicated on-site coordinators from dawn to midnight']
      }
    ],
    supportedEvents: ['Wedding', 'Corporate Gala', 'Engagement', 'Anniversary'],
    reviews: [
      {
        id: 'rev-1001',
        authorName: 'Christine & Alexander Vance',
        authorLocation: 'Austin, TX',
        rating: 5,
        date: 'August 29, 2026',
        eventType: 'Wedding',
        comment: 'Hiring Isabella was the single best decision of our entire wedding. When an unexpected thunderstorm threatened our outdoor ceremony, her team enacted Plan B in 20 minutes without breaking a sweat. Pure excellence!',
        helpfulCount: 29
      }
    ],
    phone: '+1 (512) 555-0155',
    email: 'isabella@grandeurevents.com',
    approved: true,
    plan: 'premium'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-101',
    providerId: 'prov-1',
    providerName: 'Aura Luxe Event Styling',
    providerCategory: 'Event Decorators',
    customerName: 'Rachel Green',
    customerEmail: 'rachel@example.com',
    customerPhone: '+1 (512) 555-8821',
    eventType: 'Wedding',
    eventDate: '2026-11-14',
    location: 'Austin Hill Country Estate',
    guestsCount: 160,
    requiredService: 'Ceremony Mandap & Reception Tablescapes',
    budget: '$3,000 - $5,000',
    additionalRequirements: 'Looking for a warm cream and blush pink palette with lots of natural taper candles and eucalyptus runners.',
    status: 'Quoted',
    quotedAmount: 3400,
    createdAt: '2026-09-24',
    providerNotes: 'Includes customized mandap arch, 16 tablescape floral centerpieces, fairy lighting, and full breakdown crew.'
  },
  {
    id: 'quote-102',
    providerId: 'prov-2',
    providerName: 'Verve Shutter & Cinema',
    providerCategory: 'Photographers',
    customerName: 'Rachel Green',
    customerEmail: 'rachel@example.com',
    customerPhone: '+1 (512) 555-8821',
    eventType: 'Wedding',
    eventDate: '2026-11-14',
    location: 'Austin Hill Country Estate',
    guestsCount: 160,
    requiredService: 'The Full Cinematic Story (Photo + Film)',
    budget: '$2,500 - $3,500',
    additionalRequirements: 'Need 8 hours of coverage with 2 shooters and drone aerials of the outdoor vineyard ceremony.',
    status: 'Accepted',
    quotedAmount: 2800,
    createdAt: '2026-09-22',
    providerNotes: 'Confirmed 2 lead photographers, 1 cinematographer with 4K drone, and delivery within 14 business days.'
  },
  {
    id: 'quote-103',
    providerId: 'prov-4',
    providerName: 'Pulse & Rhythm DJ Collective',
    providerCategory: 'DJs & Live Music',
    customerName: 'Rachel Green',
    customerEmail: 'rachel@example.com',
    customerPhone: '+1 (512) 555-8821',
    eventType: 'Wedding',
    eventDate: '2026-11-14',
    location: 'Austin Hill Country Estate',
    guestsCount: 160,
    requiredService: 'The Premium Celebration Suite',
    budget: '$1,000 - $1,500',
    additionalRequirements: 'Would love cold indoor sparkler fountains for our first dance, plus 12 amber uplights.',
    status: 'Pending',
    createdAt: '2026-09-27',
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-501',
    providerId: 'prov-2',
    providerName: 'Verve Shutter & Cinema',
    customerName: 'Rachel Green',
    customerEmail: 'rachel@example.com',
    customerPhone: '+1 (512) 555-8821',
    eventType: 'Wedding',
    eventDate: '2026-11-14',
    location: 'Austin Hill Country Estate',
    packageName: 'The Full Cinematic Story',
    totalAmount: 2800,
    depositPaid: 700,
    status: 'Confirmed',
    createdAt: '2026-09-23'
  },
  {
    id: 'bk-502',
    providerId: 'prov-6',
    providerName: 'Velvet Whisk Confections',
    customerName: 'Rachel Green',
    customerEmail: 'rachel@example.com',
    customerPhone: '+1 (512) 555-8821',
    eventType: 'Birthday Party',
    eventDate: '2026-08-10',
    location: 'Downtown Private Loft, Austin',
    packageName: 'Sweet Harmony Wedding Package',
    totalAmount: 580,
    depositPaid: 580,
    status: 'Completed',
    createdAt: '2026-07-28'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    quote: "EventEase transformed what used to be weeks of stressful vendor calling into an afternoon of browsing verified professionals. We found our decorator, DJ, and photographer in one spot!",
    author: "Pooja & Sameer Patel",
    event: "Wedding Celebration (280 guests)",
    location: "Austin, Texas",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'test-2',
    quote: "As an event host for our university’s annual spring gala, comparing prices and seeing genuine previous work samples transparently saved our committee over $2,400 in budget.",
    author: "Liam Vance",
    event: "University Gala & Alumni Dinner",
    location: "Round Rock, Texas",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'test-3',
    quote: "Within 2 hours of sending quote requests, three top-rated bakers and caterers sent itemized proposals. The booking experience and milestone tracking gave us total peace of mind.",
    author: "Hannah & Derek Cole",
    event: "1st Birthday & Baby Shower",
    location: "Lake Travis, Texas",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  }
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Explore Local Pros',
    desc: 'Filter by event type, service category, verified rating, and budget to discover top-rated professionals in your neighborhood.'
  },
  {
    step: '02',
    title: 'Compare & Request Quotes',
    desc: 'Browse high-res portfolios, transparent packages, real customer reviews, and submit custom quote requests in seconds.'
  },
  {
    step: '03',
    title: 'Book with Confidence',
    desc: 'Directly discuss details with the provider, confirm your date, and manage all your event vendors from one unified dashboard.'
  }
];
