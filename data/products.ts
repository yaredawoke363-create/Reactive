export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  badge?: string;
  colors?: ProductColor[];
  sizes?: ProductSize[];
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  name: string;
  available: boolean;
}

export const categories = [
  { id: 'all', name: 'All', icon: 'Grid3X3' },
  { id: 'tech', name: 'Tech', icon: 'Cpu' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'home', name: 'Home', icon: 'Home' },
  { id: 'lifestyle', name: 'Life', icon: 'Heart' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Sonic Pro Elite',
    brand: 'AudioTech',
    price: 449,
    originalPrice: 549,
    rating: 4.9,
    reviewCount: 2847,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop',
    ],
    category: 'tech',
    description: 'Experience pure audio perfection with the Sonic Pro Elite. Featuring industry-leading active noise cancellation, 40-hour battery life, and premium materials that redefine comfort.',
    features: [
      'Active Noise Cancellation Pro',
      '40-hour battery life',
      'Spatial Audio with head tracking',
      'Premium leather cushions',
      'Multi-device connectivity',
    ],
    inStock: true,
    badge: 'Bestseller',
    colors: [
      { name: 'Midnight Black', hex: '#1A1A1A' },
      { name: 'Silver Frost', hex: '#C0C0C0' },
      { name: 'Navy Blue', hex: '#1E3A5F' },
    ],
  },
  {
    id: '2',
    name: 'Horizon Smartwatch Ultra',
    brand: 'TechWear',
    price: 899,
    rating: 4.8,
    reviewCount: 1523,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop',
    ],
    category: 'tech',
    description: 'The ultimate companion for your active lifestyle. Titanium case, sapphire crystal, and advanced health monitoring make this the most capable smartwatch ever.',
    features: [
      'Titanium case construction',
      '7-day battery life',
      'Advanced health sensors',
      '100m water resistance',
      'Emergency SOS & Fall Detection',
    ],
    inStock: true,
    badge: 'New',
    colors: [
      { name: 'Titanium', hex: '#8B8B8B' },
      { name: 'Midnight', hex: '#2C2C2C' },
      { name: 'Starlight', hex: '#F5F5DC' },
    ],
  },
  {
    id: '3',
    name: 'Minimalist Leather Weekender',
    brand: 'Luxe Leather Co.',
    price: 685,
    rating: 4.9,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop',
    ],
    category: 'fashion',
    description: 'Handcrafted from full-grain Italian leather, this weekender bag combines timeless elegance with modern functionality. The perfect companion for sophisticated travelers.',
    features: [
      'Full-grain Italian leather',
      'Brass hardware',
      'Water-resistant lining',
      'Removable shoulder strap',
      'Lifetime warranty',
    ],
    inStock: true,
    colors: [
      { name: 'Cognac', hex: '#9A463D' },
      { name: 'Espresso', hex: '#3D2914' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
  },
  {
    id: '4',
    name: 'Aura Smart Diffuser',
    brand: 'HomeSense',
    price: 189,
    rating: 4.7,
    reviewCount: 2156,
    images: [
      'https://images.unsplash.com/photo-1608508644127-536420AAF7c4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop',
    ],
    category: 'home',
    description: 'Transform your space with the Aura Smart Diffuser. App-controlled, whisper-quiet operation, and handcrafted ceramic design that complements any interior.',
    features: [
      'App-controlled scheduling',
      'Ultrasonic technology',
      'Ambient light ring',
      '8-hour runtime',
      'Handcrafted ceramic',
    ],
    inStock: true,
    badge: 'Trending',
    colors: [
      { name: 'Cloud White', hex: '#F5F5F5' },
      { name: 'Stone Gray', hex: '#6B6B6B' },
      { name: 'Terracotta', hex: '#C65D3B' },
    ],
  },
  {
    id: '5',
    name: 'Apex Running Shoes',
    brand: 'Velocity',
    price: 275,
    originalPrice: 325,
    rating: 4.8,
    reviewCount: 3421,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop',
    ],
    category: 'fashion',
    description: 'Engineered for peak performance. Carbon fiber plate, responsive foam, and breathable upper deliver an unmatched running experience.',
    features: [
      'Carbon fiber propulsion plate',
      'Responsive foam cushioning',
      'Breathable knit upper',
      '4mm drop design',
      'Reflective details',
    ],
    inStock: true,
    colors: [
      { name: 'Neon Red', hex: '#FF3333' },
      { name: 'Midnight', hex: '#1A1A1A' },
      { name: 'Electric Blue', hex: '#0066FF' },
    ],
    sizes: [
      { name: 'US 7', available: true },
      { name: 'US 8', available: true },
      { name: 'US 9', available: true },
      { name: 'US 10', available: true },
      { name: 'US 11', available: false },
      { name: 'US 12', available: true },
    ],
  },
  {
    id: '6',
    name: 'Zen Meditation Set',
    brand: 'Mindful Living',
    price: 129,
    rating: 4.9,
    reviewCount: 678,
    images: [
      'https://images.unsplash.com/photo-1609345265499-2133bbeb6ce5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&auto=format&fit=crop',
    ],
    category: 'lifestyle',
    description: 'Find your inner peace with this complete meditation set. Includes premium meditation cushion, singing bowl, and guided meditation access.',
    features: [
      'Organic cotton cushion',
      'Hand-tuned singing bowl',
      '1-year app subscription',
      'Carrying case included',
      'Eco-friendly materials',
    ],
    inStock: true,
    colors: [
      { name: 'Sage', hex: '#87A878' },
      { name: 'Sand', hex: '#C2B280' },
      { name: 'Charcoal', hex: '#36454F' },
    ],
  },
  {
    id: '7',
    name: 'Nomad Backpack Pro',
    brand: 'Urban Gear',
    price: 249,
    rating: 4.7,
    reviewCount: 1234,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop',
    ],
    category: 'fashion',
    description: 'The ultimate everyday carry. Weatherproof construction, laptop compartment, and thoughtful organization for the modern professional.',
    features: [
      'Waterproof fabric',
      '18L capacity',
      'Laptop sleeve (16")',
      'Quick-access pockets',
      'Luggage pass-through',
    ],
    inStock: true,
    colors: [
      { name: 'Stealth Black', hex: '#0A0A0A' },
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
  },
  {
    id: '8',
    name: 'Lumina Desk Lamp',
    brand: 'BrightWorks',
    price: 299,
    rating: 4.8,
    reviewCount: 445,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513506003011-3b03c80175e8?w=800&auto=format&fit=crop',
    ],
    category: 'home',
    description: 'Revolutionary lighting for your workspace. Adaptive brightness, color temperature control, and minimalist design elevate your desk setup.',
    features: [
      'Adaptive brightness',
      'Circadian rhythm lighting',
      'Wireless charging base',
      'Touch controls',
      'App connectivity',
    ],
    inStock: true,
    colors: [
      { name: 'Matte White', hex: '#F0F0F0' },
      { name: 'Space Gray', hex: '#4A4A4A' },
    ],
  },
];

export const featuredProducts = products.slice(0, 4);

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === 'all') return products;
  return products.filter((p) => p.category === categoryId);
};
