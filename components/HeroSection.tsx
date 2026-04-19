import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ChevronRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { AnimatedButton } from './AnimatedButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HeroSection: React.FC = () => {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(40);
  const subtitleOpacity = useSharedValue(0);
  const imageScale = useSharedValue(1.2);
  const imageOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(20);

  useEffect(() => {
    // Staggered animation sequence
    imageOpacity.value = withTiming(1, { duration: 800 });
    imageScale.value = withTiming(1, { duration: 1200 });

    titleOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    titleTranslateY.value = withDelay(200, withSpring(0, { damping: 15 }));

    subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));

    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    buttonTranslateY.value = withDelay(600, withSpring(0, { damping: 15 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const imageStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
    transform: [{ scale: imageScale.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Background Image with Parallax Effect */}
      <Animated.View style={[styles.imageContainer, imageStyle]}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop',
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={[
            'transparent',
            'rgba(10, 10, 10, 0.3)',
            'rgba(10, 10, 10, 0.8)',
            colors.background,
          ]}
          locations={[0, 0.4, 0.7, 1]}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Content Overlay */}
      <View style={styles.content}>
        <View style={styles.badgeContainer}>
          <BlurView intensity={80} tint="dark" style={styles.badge}>
            <View style={styles.badgeInner}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>New Collection</Text>
            </View>
          </BlurView>
        </View>

        <Animated.Text style={[styles.title, titleStyle]}>
          Luxury{'\n'}Redefined
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          Discover premium products crafted for those who demand excellence
        </Animated.Text>

        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          <AnimatedButton
            variant="primary"
            size="large"
            onPress={() => {}}
            style={styles.button}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Explore Collection</Text>
              <ChevronRight size={20} color={colors.background} />
            </View>
          </AnimatedButton>
        </Animated.View>
      </View>
    </View>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: SCREEN_WIDTH * 1.2,
    position: 'relative',
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.xxl,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  badge: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  badgeInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginRight: spacing.sm,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.display.fontSize,
    fontWeight: '700',
    lineHeight: typography.display.lineHeight,
    letterSpacing: -1,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.bodyLarge.fontSize,
    lineHeight: typography.bodyLarge.lineHeight,
    marginBottom: spacing.xl,
    maxWidth: 300,
  },
  buttonContainer: {
    alignSelf: 'flex-start',
  },
  button: {
    minWidth: 200,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
});
