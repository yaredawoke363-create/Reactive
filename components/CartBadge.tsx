import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { colors, borderRadius, typography } from '../constants/theme';
import { useCart } from '../hooks/useCart';

interface CartBadgeProps {
  children: React.ReactNode;
}

export const CartBadge: React.FC<CartBadgeProps> = ({ children }) => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  const scale = useSharedValue(0);
  const prevCount = React.useRef(itemCount);

  useEffect(() => {
    if (itemCount > 0) {
      if (prevCount.current !== itemCount) {
        // Pulse animation on count change
        scale.value = withSequence(
          withSpring(1.3, { damping: 8 }),
          withSpring(1, { damping: 15 })
        );
      } else {
        scale.value = withSpring(1, { damping: 15 });
      }
    } else {
      scale.value = withSpring(0, { damping: 15 });
    }
    prevCount.current = itemCount;
  }, [itemCount, scale]);

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  return (
    <View style={styles.container}>
      {children}
      {itemCount > 0 && (
        <Animated.View style={[styles.badge, badgeStyle]}>
          <Text style={styles.badgeText}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 20,
    height: 20,
    borderRadius: borderRadius.full,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  badgeText: {
    color: colors.background,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
});
