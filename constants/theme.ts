import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 8pt Grid System
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  screen: 20,
} as const;

// Premium Color Palette - Dark Luxury Theme
export const colors = {
  // Backgrounds
  background: '#0A0A0A',
  surface: '#141414',
  surfaceElevated: '#1C1C1C',
  surfaceGlass: 'rgba(28, 28, 28, 0.8)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.4)',

  // Accents - Neon Cyan
  accent: '#00F0FF',
  accentSoft: 'rgba(0, 240, 255, 0.15)',
  accentGlow: 'rgba(0, 240, 255, 0.4)',

  // Secondary Accents
  purple: '#8B5CF6',
  pink: '#EC4899',
  gold: '#FFD700',

  // Utility
  border: 'rgba(255, 255, 255, 0.1)',
  borderElevated: 'rgba(255, 255, 255, 0.15)',
  shadow: 'rgba(0, 0, 0, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.7)',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
} as const;

// Typography Scale
export const typography = {
  // Display
  display: {
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.02,
    fontWeight: '700' as const,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.01,
    fontWeight: '700' as const,
  },

  // Headings
  h1: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.01,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.01,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
    fontWeight: '600' as const,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    fontWeight: '600' as const,
  },

  // Body
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.01,
    fontWeight: '400' as const,
  },

  // Caption
  caption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    fontWeight: '500' as const,
  },

  // Label
  label: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.04,
    fontWeight: '600' as const,
  },
} as const;

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

// Shadows
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 16,
  },
  glow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;

// Animation Timings
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
} as const;

// Screen Dimensions
export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmall: SCREEN_WIDTH < 375,
  isMedium: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLarge: SCREEN_WIDTH >= 414,
} as const;

// Layout Constants
export const layout = {
  maxContentWidth: 400,
  headerHeight: 60,
  bottomTabHeight: 80,
  cardAspectRatio: 3 / 4,
  productImageRatio: 1,
} as const;
