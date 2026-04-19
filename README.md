# LuxeShop - Premium E-Commerce App

An ultra-premium Expo-based React Native ecommerce application with Apple-level design quality, featuring smooth animations, glassmorphism UI, and a luxury shopping experience.

## ✨ Features

- **Ultra-Premium UI**: Dark luxury theme with neon cyan accents
- **Glassmorphism Design**: Blur effects, frosted glass cards, and depth layers
- **Smooth Animations**: Powered by react-native-reanimated
- **Gesture-Based Interactions**: React Native Gesture Handler integration
- **E-Commerce Features**:
  - Product catalog with filtering
  - Product detail with 3D-like scroll reveal
  - Shopping cart with quantity controls
  - Checkout flow with payment methods
  - User profile dashboard

## 🚀 Tech Stack

- **Framework**: Expo SDK 52
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **Animations**: React Native Reanimated v3 + Moti
- **State Management**: Zustand
- **Styling**: Custom design system with constants
- **Icons**: Lucide React Native

## 📱 Screenshots

The app features:
- Hero section with parallax scrolling
- Animated product cards with hover effects
- Category filtering pills
- Glassmorphic cart items
- Premium checkout flow

## 🛠️ Installation

### Prerequisites

- Node.js 18+ installed
- Expo CLI: `npm install -g expo-cli`
- Expo Go app installed on your Android device

### Setup

1. **Navigate to the project directory:**
```bash
cd luxeshop-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npx expo start
```

4. **Run on Android (Expo Go):**
   - Scan the QR code displayed in the terminal with your Android device
   - Or press `a` in the terminal to open Android emulator
   - Make sure your device and computer are on the same WiFi network

## 📂 Project Structure

```
luxeshop-app/
├── App.tsx                 # Main entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── babel.config.js        # Babel configuration
├── navigation/
│   └── AppNavigator.tsx   # Navigation setup
├── screens/
│   ├── HomeScreen.tsx     # Home with hero and products
│   ├── ProductDetailScreen.tsx  # Product detail view
│   ├── CartScreen.tsx     # Shopping cart
│   ├── CheckoutScreen.tsx # Checkout flow
│   └── ProfileScreen.tsx  # User profile
├── components/
│   ├── AnimatedButton.tsx # Pressable animated button
│   ├── ProductCard.tsx    # Product card component
│   ├── GlassCard.tsx      # Glassmorphism card
│   ├── HeroSection.tsx    # Hero banner
│   ├── CategoryPills.tsx  # Category filter
│   └── CartBadge.tsx      # Cart badge with count
├── hooks/
│   ├── useAnimation.ts    # Animation utilities
│   └── useCart.ts         # Cart state management
├── constants/
│   └── theme.ts           # Colors, typography, spacing
├── data/
│   └── products.ts          # Product data
└── assets/                # Images and fonts
```

## 🎨 Design System

### Colors
- Background: `#0A0A0A`
- Surface: `#141414`
- Accent: `#00F0FF` (Neon Cyan)
- Text Primary: `#FFFFFF`
- Text Secondary: `rgba(255, 255, 255, 0.7)`

### Spacing (8pt Grid)
- xs: 4
- sm: 8
- md: 16
- lg: 24
- xl: 32
- xxl: 48

### Typography
- Display: 48px / Bold
- H1: 32px / Bold
- H2: 28px / Semibold
- H3: 24px / Semibold
- Body: 16px / Regular

## 🎭 Animation Details

### Implemented Animations:
1. **Hero Section**: Fade-in + slide-up with stagger
2. **Product Cards**: Scale + depth on press
3. **Category Pills**: Color interpolation on select
4. **Cart Items**: Slide + fade on remove
5. **Add to Cart**: Pulse animation on badge
6. **Product Detail**: Parallax scroll + image scale
7. **Page Transitions**: Slide from right/bottom

### Animation Libraries:
- `react-native-reanimated` - Core animations
- `react-native-gesture-handler` - Touch handling
- `expo-linear-gradient` - Gradient effects
- `expo-blur` - Glassmorphism blur
- `moti` - Optional smooth transitions

## 🔧 Customization

### Adding New Products
Edit `data/products.ts`:

```typescript
{
  id: '9',
  name: 'Your Product',
  brand: 'Brand Name',
  price: 299,
  rating: 4.8,
  reviewCount: 100,
  images: ['image-url'],
  category: 'tech',
  description: 'Product description',
  features: ['Feature 1', 'Feature 2'],
  inStock: true,
}
```

### Changing Theme Colors
Edit `constants/theme.ts`:

```typescript
export const colors = {
  background: '#your-color',
  accent: '#your-accent',
  // ...other colors
};
```

## 📱 Running on Expo Go

1. Make sure your phone and computer are on the same WiFi network
2. Open Expo Go app on Android
3. Scan the QR code from the terminal
4. The app will load and hot-reload on code changes

## 🚀 Building for Production

```bash
# Build for Android
npx eas build --platform android

# Build for iOS
npx eas build --platform ios

# Build for web
npx expo export:web
```

## 📝 Notes

- All images are loaded from Unsplash URLs for demo purposes
- Cart state is stored in memory (resets on app restart)
- No actual payment processing is implemented
- Expo Go compatible - no native modules required

## 🐛 Troubleshooting

### Metro bundler issues:
```bash
npx expo start --clear
```

### Cache issues:
```bash
rm -rf node_modules .expo
npm install
npx expo start --clear
```

### Android connection issues:
- Make sure your device is on the same network
- Try using tunnel mode: `npx expo start --tunnel`

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

Built with ❤️ using Expo and React Native.
# Reactive
