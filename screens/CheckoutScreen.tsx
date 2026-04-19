import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  Shield,
  Check,
  MapPin,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { useCart } from '../hooks/useCart';
import { AnimatedButton } from '../components/AnimatedButton';
import { GlassCard } from '../components/GlassCard';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: null },
  { id: 'apple', name: 'Apple Pay', icon: null },
];

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const { items, getTotalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const checkScale = useSharedValue(0);

  const handlePlaceOrder = useCallback(() => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      checkScale.value = withSpring(1, { damping: 10 });
      setTimeout(() => {
        clearCart();
        navigation.navigate('MainTabs');
      }, 2000);
    }, 2000);
  }, [clearCart, navigation, checkScale]);

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 500 ? 0 : 25;
  const finalTotal = totalPrice + shippingCost;

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  if (isComplete) {
    return (
      <SafeAreaView style={[styles.container, styles.successContainer]}>
        <Animated.View style={[styles.checkCircle, checkStyle]}>
          <LinearGradient
            colors={[colors.accent, '#00C8D4']}
            style={StyleSheet.absoluteFill}
            borderRadius={80}
          />
          <Check size={60} color={colors.background} strokeWidth={3} />
        </Animated.View>

        <Text style={styles.successTitle}>Order Confirmed!</Text>
        <Text style={styles.successSubtitle}>
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </Text>

        <View style={styles.orderDetails}>
          <Text style={styles.orderLabel}>Order Total</Text>
          <Text style={styles.orderTotal}>${finalTotal.toLocaleString()}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Summary */}
        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Truck size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>Order Summary</Text>
          </View>

          <View style={styles.summaryItems}>
            {items.map((item) => (
              <View key={item.id} style={styles.summaryItem}>
                <View style={styles.summaryItemInfo}>
                  <Text style={styles.summaryItemName} numberOfLines={1}>
                    {item.product.name}
                  </Text>
                  <Text style={styles.summaryItemQty}>x{item.quantity}</Text>
                </View>
                <Text style={styles.summaryItemPrice}>
                  ${(item.product.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${totalPrice.toLocaleString()}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${finalTotal.toLocaleString()}</Text>
          </View>
        </GlassCard>

        {/* Shipping Address */}
        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Street Address</Text>
            <TextInput
              style={styles.input}
              placeholder="123 Luxury Lane"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="New York"
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 0.5, marginLeft: spacing.md }]}\n              >
                <Text style={styles.inputLabel}>ZIP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="10001"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="number-pad"
                />
              </View>
          </View>
        </GlassCard>

        {/* Payment Method */}
        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>

          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedPayment(method.id)}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method.id && styles.paymentMethodSelected,
                ]}
              >
                <View style={styles.paymentMethodContent}>
                  {method.icon && (
                    <method.icon
                      size={24}
                      color={
                        selectedPayment === method.id
                          ? colors.accent
                          : colors.textSecondary
                      }
                    />
                  )}
                  <Text
                    style={[
                      styles.paymentMethodText,
                      selectedPayment === method.id &&
                        styles.paymentMethodTextSelected,
                    ]}
                  >
                    {method.name}
                  </Text>
                </View>

                <View
                  style={[
                    styles.radio,
                    selectedPayment === method.id && styles.radioSelected,
                  ]}
                >
                  {selectedPayment === method.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {selectedPayment === 'card' && (
            <View style={styles.cardInputs}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}\n                  >
                    <Text style={styles.inputLabel}>Expiry</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      placeholderTextColor={colors.textTertiary}
                    />
                  </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: spacing.md }]}\n                  >
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor={colors.textTertiary}
                      keyboardType="number-pad"
                      maxLength={4}
                    />
                  </View>
              </View>
            </View>
          )}
        </GlassCard>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Shield size={16} color={colors.textTertiary} />
          <Text style={styles.securityText}>
            Your payment is secured with 256-bit encryption
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={['transparent', colors.background]}
          style={StyleSheet.absoluteFill}
        />

        <AnimatedButton
          variant="primary"
          size="large"
          onPress={handlePlaceOrder}
          fullWidth
          disabled={isProcessing}
        >
          <View style={styles.placeOrderContent}>
            {isProcessing ? (
              <Text style={styles.placeOrderText}>Processing...</Text>
            ) : (
              <>
                <Text style={styles.placeOrderText}>Place Order</Text>
                <Text style={styles.placeOrderPrice}>
                  ${finalTotal.toLocaleString()}
                </Text>
              </>
            )}
          </View>
        </AnimatedButton>
      </View>
    </SafeAreaView>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.h3.fontSize,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: spacing.screen,
  },
  sectionCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  summaryItems: {
    marginBottom: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryItemName: {
    color: colors.textPrimary,
    fontSize: typography.bodySmall.fontSize,
    flex: 1,
  },
  summaryItemQty: {
    color: colors.textTertiary,
    fontSize: typography.caption.fontSize,
    marginLeft: spacing.sm,
  },
  summaryItemPrice: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall.fontSize,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: typography.bodySmall.fontSize,
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
    fontSize: typography.body.fontSize,
    fontWeight: '700',
  },
  totalValue: {
    color: colors.accent,
    fontSize: typography.h4.fontSize,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentMethods: {
    gap: spacing.sm,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentMethodSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  paymentMethodText: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '500',
  },
  paymentMethodTextSelected: {
    color: colors.accent,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.accent,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  cardInputs: {
    marginTop: spacing.md,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  securityText: {
    color: colors.textTertiary,
    fontSize: typography.caption.fontSize,
    marginLeft: spacing.xs,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  placeOrderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeOrderText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '700',
  },
  placeOrderPrice: {
    color: colors.background,
    fontSize: typography.h4.fontSize,
    fontWeight: '700',
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  successTitle: {
    color: colors.textPrimary,
    fontSize: typography.h2.fontSize,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  successSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  orderDetails: {
    alignItems: 'center',
  },
  orderLabel: {
    color: colors.textTertiary,
    fontSize: typography.bodySmall.fontSize,
    marginBottom: spacing.xs,
  },
  orderTotal: {
    color: colors.accent,
    fontSize: typography.h2.fontSize,
    fontWeight: '700',
  },
});
