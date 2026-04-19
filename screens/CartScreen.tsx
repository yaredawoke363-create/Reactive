import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { useCart, CartItem } from '../hooks/useCart';
import { AnimatedButton } from '../components/AnimatedButton';
import { RootStackParamList } from '../navigation/AppNavigator';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = useCallback(() => {
    navigation.navigate('Checkout');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item, index }: { item: CartItem; index: number }) => (
      <CartItemCard
        item={item}
        onRemove={() => removeItem(item.id)}
        onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
        index={index}
      />
    ),
    [removeItem, updateQuantity]
  );

  if (totalItems === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <ShoppingBag size={64} color={colors.textTertiary} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Discover amazing products and add them to your cart
          </Text>
          <AnimatedButton
            variant="primary"
            size="large"
            onPress={() => navigation.navigate('MainTabs')}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Start Shopping</Text>
          </AnimatedButton>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.headerSubtitle}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Summary */}
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={['transparent', colors.background]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${totalPrice.toLocaleString()}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalPrice.toLocaleString()}</Text>
          </View>
        </View>

        <AnimatedButton
          variant="primary"
          size="large"
          onPress={handleCheckout}
          fullWidth
        >
          <View style={styles.checkoutButtonContent}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
            <ArrowRight size={20} color={colors.background} />
          </View>
        </AnimatedButton>
      </View>
    </SafeAreaView>
  );
};

interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  index: number;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
  index,
}) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const handleRemove = () => {
    scale.value = withTiming(0.9, { duration: 150 });
    opacity.value = withTiming(0, { duration: 200 }, () => {
      onRemove();
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.cartItem, animatedStyle]}>
      <BlurView intensity={30} tint="dark" style={styles.cartItemBlur}>
        <View style={styles.cartItemContent}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.product.images[0] }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Product Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.brand}>{item.product.brand}</Text>
            <Text style={styles.name} numberOfLines={2}>
              {item.product.name}
            </Text>

            {item.selectedColor && (
              <View style={styles.variantRow}>
                <View
                  style={[
                    styles.colorDot,
                    { backgroundColor: item.selectedColor.hex },
                  ]}
                />
                <Text style={styles.variantText}>{item.selectedColor.name}</Text>
              </View>
            )}

            {item.selectedSize && (
              <Text style={styles.variantText}>Size: {item.selectedSize.name}</Text>
            )}

            <Text style={styles.price}>
              ${(item.product.price * item.quantity).toLocaleString()}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            {/* Remove Button */}
            <TouchableOpacity
              onPress={handleRemove}
              style={styles.removeButton}
            >
              <Trash2 size={18} color={colors.error} />
            </TouchableOpacity>

            {/* Quantity Controls */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => onUpdateQuantity(item.quantity - 1)}
                style={styles.quantityButton}
                disabled={item.quantity <= 1}
              >
                <Minus
                  size={16}
                  color={
                    item.quantity > 1 ? colors.textPrimary : colors.textTertiary
                  }
                />
              </TouchableOpacity>

              <Text style={styles.quantity}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => onUpdateQuantity(item.quantity + 1)}
                style={styles.quantityButton}
              >
                <Plus size={16} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.h2.fontSize,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: colors.textTertiary,
    fontSize: typography.bodySmall.fontSize,
    marginTop: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.xxl,
  },
  cartItem: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
  },
  cartItemBlur: {
    overflow: 'hidden',
    borderRadius: borderRadius.xxl,
  },
  cartItemContent: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  brand: {
    color: colors.textTertiary,
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  variantText: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
  },
  price: {
    color: colors.accent,
    fontSize: typography.h4.fontSize,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  actionsContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  removeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    color: colors.textPrimary,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '600',
    width: 30,
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summary: {
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    color: colors.textPrimary,
    fontSize: typography.h4.fontSize,
    fontWeight: '700',
  },
  totalValue: {
    color: colors.accent,
    fontSize: typography.h3.fontSize,
    fontWeight: '700',
  },
  checkoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  checkoutButtonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.h3.fontSize,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  emptyButton: {
    minWidth: 200,
  },
  emptyButtonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
});
