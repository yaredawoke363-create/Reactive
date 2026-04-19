import React, { useCallback } from 'react';
import { View, StyleSheet, PressableProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  onPress,
  style,
  ...props
}) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, { damping: 12, stiffness: 200 });
    glowOpacity.value = withSpring(1, { damping: 15 });
  }, [scale, glowOpacity]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
    glowOpacity.value = withSpring(0, { damping: 15 });
  }, [scale, glowOpacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: interpolate(glowOpacity.value, [0, 1], [0.95, 1.1]) }],
  }));

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.md };
      case 'large':
        return { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl };
      default:
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: [colors.accent, '#00C8D4'],
          text: colors.background,
        };
      case 'secondary':
        return {
          background: colors.surfaceElevated,
          text: colors.textPrimary,
          border: colors.borderElevated,
        };
      case 'ghost':
        return {
          background: 'transparent',
          text: colors.textPrimary,
        };
      case 'glass':
        return {
          background: colors.surfaceGlass,
          text: colors.textPrimary,
          border: colors.border,
        };
      default:
        return { background: colors.accent, text: colors.background };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        sizeStyles,
        variant !== 'primary' && {
          backgroundColor: variantStyles.background,
          borderWidth: variantStyles.border ? 1 : 0,
          borderColor: variantStyles.border,
        },
        (disabled || loading) && styles.disabled,
        animatedStyle,
        style,
      ]}
      {...props}
    >
      {variant === 'primary' && (
        <>
          <Animated.View style={[styles.glow, glowStyle]} >
            <LinearGradient
              colors={[colors.accentGlow, 'transparent']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </Animated.View>
          <LinearGradient
            colors={variantStyles.background as string[]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </>
      )}
      <View style={styles.content}>{children}</View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.small,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.xl,
  },
});
