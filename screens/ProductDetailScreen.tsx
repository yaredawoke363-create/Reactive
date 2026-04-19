import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  Minus,
  Plus,
  Check,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, spacing, borderRadius, typography, shadows } from '../constants/theme';
import { getProductById, Product, ProductColor, ProductSize } from '../data/products';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AnimatedButton } from '../components/AnimatedButton';
import { useCart } from '../hooks/useCart';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { productId } = route.params as { productId: string };
  const product = getProductById(productId);

  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product?.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const scrollY = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const headerOpacity = useSharedValue(0);
  const addButtonScale = useSharedValue(1);

  useEffect(() => {
    imageScale.value = withSpring(1, { damping: 20 });
  }, [imageScale]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      // Fade in header as user scrolls
      headerOpacity.value = interpolate(
        scrollY.value,
        [200, 350],
        [0, 1],
        Extrapolate.CLAMP
      );
    },
  });

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [-200, 0],
          [1.3, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const infoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, 200],
          [0, -30],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    backgroundColor: `rgba(10, 10, 10, ${headerOpacity.value * 0.95})`,
  }));

  const handleAddToCart = useCallback(() => {
    if (product) {
      addItem(product, selectedColor, selectedSize);
      addButtonScale.value = withSequence(
        withSpring(0.95, { damping: 10 }),
        withSpring(1, { damping: 10 })
      );
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  }, [addItem, product, selectedColor, selectedSize, addButtonScale]);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, headerStyle]}>
        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
          >
            <ChevronLeft size={28} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle} numberOfLines={1}>
            {product.name}
          </Text>

          <TouchableOpacity
            onPress={() => setIsWishlisted(!isWishlisted)}
            style={styles.headerButton}
          >
            <Heart
              size={24}
              color={isWishlisted ? colors.accent : colors.textPrimary}
              fill={isWishlisted ? colors.accent : 'transparent'}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>

      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Animated.Image
            source={{ uri: product.images[0] }}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.imageGradient}
          />

          {/* Back Button (absolute) */}
          <SafeAreaView style={styles.backButton}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonInner}
            >
              <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill}>
                <View style={styles.backButtonBlur} />
              </BlurView>
              <ChevronLeft size={28} color={colors.textPrimary} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === 0 && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <Animated.View style={[styles.infoContainer, infoStyle]}>
          {/* Brand & Rating */}
          <View style={styles.brandRow}>
            <View style={styles.badgeContainer}>
              <BlurView intensity={60} tint="dark" style={styles.brandBadge}>
                <Text style={styles.brandText}>{product.brand}</Text>
              </BlurView>
            </View>

            <View style={styles.rating}>
              <Star size={16} color={colors.gold} fill={colors.gold} />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewCount}>
                ({product.reviewCount.toLocaleString()})
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                ${product.price.toLocaleString()}
              </Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice.toLocaleString()}
                </Text>
              )}
            </View>

            {discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{discount}% OFF</Text>
              </View>
            )}
          </View>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.colorContainer}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color.name}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.colorOption,
                      selectedColor?.name === color.name && styles.colorOptionSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.colorCircle,
                        { backgroundColor: color.hex },
                      ]}
                    />
                    {selectedColor?.name === color.name && (
                      <View style={styles.colorCheck}>
                        <Check size={12} color={colors.textPrimary} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.selectedColorText}>
                {selectedColor?.name}
              </Text>
            </View>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeContainer}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size.name}
                    onPress={() => size.available && setSelectedSize(size)}
                    disabled={!size.available}
                    style={[
                      styles.sizeOption,
                      selectedSize?.name === size.name && styles.sizeOptionSelected,
                      !size.available && styles.sizeOptionDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize?.name === size.name && styles.sizeTextSelected,
                        !size.available && styles.sizeTextDisabled,
                      ]}
                    >
                      {size.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Spacer for bottom bar */}
          <View style={{ height: 120 }} />
        </Animated.View>
      </AnimatedScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <LinearGradient
          colors={[colors.background, 'rgba(10, 10, 10, 0.9)', colors.background]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.bottomContent}>
          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.quantityButton}
              disabled={quantity <= 1}
            >
              <Minus
                size={20}
                color={quantity > 1 ? colors.textPrimary : colors.textTertiary}
              />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.quantityButton}
            >
              <Plus size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <Animated.View style={{ flex: 1, transform: [{ scale: addButtonScale }] }}>
            <AnimatedButton
              variant="primary"
              size="large"
              onPress={handleAddToCart}
              fullWidth
            >
              <View style={styles.addButtonContent}>
                {addedToCart ? (
                  <>
                    <Check size={20} color={colors.background} />
                    <Text style={styles.addButtonText}>Added!</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.addButtonPrice}>
                      ${(product.price * quantity).toLocaleString()}
                    </Text>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                  </>
                )}
              </View>
            </AnimatedButton>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.md,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: spacing.md,
  },
  imageContainer: {
    height: SCREEN_WIDTH,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButtonInner: {
    marginTop: spacing.screen,
    marginLeft: spacing.screen,
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textTertiary,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: colors.accent,
  },
  infoContainer: {
    paddingHorizontal: spacing.screen,
    marginTop: -spacing.xl,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  badgeContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  brandBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  brandText: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.textPrimary,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  reviewCount: {
    color: colors.textTertiary,
    fontSize: typography.caption.fontSize,
    marginLeft: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h1.fontSize,
    fontWeight: '700',
    lineHeight: typography.h1.lineHeight,
    marginBottom: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: colors.accent,
    fontSize: typography.h2.fontSize,
    fontWeight: '700',
  },
  originalPrice: {
    color: colors.textTertiary,
    fontSize: typography.body.fontSize,
    textDecorationLine: 'line-through',
    marginLeft: spacing.sm,
  },
  discountBadge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  discountText: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.bodyLarge.fontSize,
    lineHeight: typography.bodyLarge.lineHeight,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
  },
  colorOptionSelected: {
    borderColor: colors.accent,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  colorCheck: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorText: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall.fontSize,
    marginTop: spacing.sm,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sizeOption: {
    minWidth: 60,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sizeOptionSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  sizeOptionDisabled: {
    opacity: 0.5,
  },
  sizeText: {
    color: colors.textPrimary,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '600',
    textAlign: 'center',
  },
  sizeTextSelected: {
    color: colors.accent,
  },
  sizeTextDisabled: {
    textDecorationLine: 'line-through',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: spacing.md,
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall.fontSize,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: spacing.lg,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
  },
  quantityButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  addButtonPrice: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '700',
  },
  addButtonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
});
