import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { animation } from '../constants/theme';

// Fade In Up Animation
export const useFadeInUp = (delay = 0) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const animate = useCallback(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: animation.slow })
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: animation.slow })
    );
  }, [delay, opacity, translateY]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return { style, animate };
};

// Scale Animation with Spring
export const useScaleAnimation = () => {
  const scale = useSharedValue(1);

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.96, animation.spring);
  }, [scale]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, animation.spring);
  }, [scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { style, onPressIn, onPressOut };
};

// Scroll-based parallax
export const useParallax = (scrollY: any, inputRange: number[]) => {
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          inputRange,
          [0, -50],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  return style;
};

// Card hover/press animation
export const useCardAnimation = () => {
  const scale = useSharedValue(1);
  const elevation = useSharedValue(0);

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.98, animation.spring);
    elevation.value = withTiming(20, { duration: animation.fast });
  }, [scale, elevation]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, animation.spring);
    elevation.value = withTiming(0, { duration: animation.fast });
  }, [scale, elevation]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: interpolate(
      elevation.value,
      [0, 20],
      [0.3, 0.6],
      Extrapolate.CLAMP
    ),
  }));

  return { style, onPressIn, onPressOut };
};

// Stagger children animation
export const useStaggerAnimation = (index: number, baseDelay = 100) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  const animate = useCallback(() => {
    const delay = index * baseDelay;
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: animation.normal })
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: animation.normal })
    );
  }, [index, baseDelay, opacity, translateY]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return { style, animate };
};

// Pulse animation for badges
export const usePulseAnimation = () => {
  const scale = useSharedValue(1);

  const start = useCallback(() => {
    scale.value = withSequence(
      withSpring(1.2, { damping: 2, stiffness: 200 }),
      withSpring(1, { damping: 2, stiffness: 200 })
    );
  }, [scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { style, start };
};

// Slide in from right
export const useSlideInRight = (delay = 0) => {
  const translateX = useSharedValue(100);
  const opacity = useSharedValue(0);

  const animate = useCallback(() => {
    translateX.value = withDelay(
      delay,
      withTiming(0, { duration: animation.slow })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: animation.slow })
    );
  }, [delay, translateX, opacity]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return { style, animate };
};

// Header scroll animation
export const useHeaderAnimation = (scrollY: any) => {
  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  const backgroundColor = useAnimatedStyle(() => ({
    backgroundColor: `rgba(10, 10, 10, ${interpolate(
      scrollY.value,
      [0, 100],
      [0, 0.95],
      Extrapolate.CLAMP
    )})`,
  }));

  return { opacity, backgroundColor };
};
