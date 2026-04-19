import React, { useCallback } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Star, ShoppingBag } from 'lucide-react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../constants/theme';
import type { Product } from '../data/products';
import { AnimatedButton } from './AnimatedButton';
import { useCart } from '../hooks/useCart';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  index = 0,
}) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const { addItem } = useCart();

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 200 });
    translateY.value = withTiming(-4, { duration: 200 });
    imageScale.value = withTiming(1.1, { duration: 300 });
  }, [scale, translateY, imageScale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    translateY.value = withTiming(0, { duration: 200 });
    imageScale.value = withTiming(1, { duration: 300 });
  }, [scale, translateY, imageScale]);

  const handleAddToCart = useCallback(
    (e: any) => {
      e.stopPropagation();
      addItem(product);
    },
    [addItem, product]
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, cardStyle]}
    >
      <View style={styles.imageContainer}>
        <Animated.Image
          source={{ uri: product.images[0] }}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />

        {/* Badge */}
        {product.badge && (
          <View style={styles.badge}>
            <BlurView intensity={60} tint="dark" style={styles.badgeBlur}>
              <View style={styles.badgeContent}>
                <View style={styles.badgeDot} />
                <View style={styles.badgeTextContainer}>
                  <Text style={styles.badgeText}>{product.badge}</Text>
                </View>
              </View>
            </BlurView>
          </View>
        )}

        {/* Discount Badge */}
        {discount && (
          <View style={styles.discountBadge}>
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill}>
              <View style={styles.discountContent}>
                <Text style={styles.discountText}>-{discount}%</Text>
              </View>
            </BlurView>
          </View>
        )}

        {/* Add to Cart Button */}
        <View style={styles.addButton}>
          <AnimatedButton
            onPress={handleAddToCart}
            variant="glass"
            size="small"
            style={styles.cartButton}
          >
            <ShoppingBag size={18} color={colors.textPrimary} />
          </AnimatedButton>
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>{product.brand}</Text>
          <View style={styles.rating}>
            <Star size={12} color={colors.gold} fill={colors.gold} />
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviewCount.toLocaleString()})
            </Text>
          </View>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ${product.price.toLocaleString()}
          </Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toLocaleString()}
            </Text>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    ...shadows.medium,
  },
  imageContainer: {
    aspectRatio: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  badgeBlur: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: spacing.xs,
  },
  badgeTextContainer: {
    marginLeft: spacing.xs,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  discountContent: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  discountText: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
  },
  addButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
  },
  cartButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  infoContainer: {
    padding: spacing.md,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  brand: {
    color: colors.textTertiary,
    fontSize: typography.caption.fontSize,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
    marginLeft: 4,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    lineHeight: typography.body.lineHeight,
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: colors.accent,
    fontSize: typography.h4.fontSize,
    fontWeight: '700',
  },
  originalPrice: {
    color: colors.textTertiary,
    fontSize: typography.bodySmall.fontSize,
    textDecorationLine: 'line-through',
    marginLeft: spacing.sm,
  },
});
