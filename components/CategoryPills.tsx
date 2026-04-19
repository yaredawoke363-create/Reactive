import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { Grid3X3, Cpu, Shirt, Home, Heart } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { categories } from '../data/products';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const iconMap: Record<string, React.ElementType> = {
  Grid3X3,
  Cpu,
  Shirt,
  Home,
  Heart,
};

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={() => onSelectCategory(category.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface CategoryPillProps {
  category: { id: string; name: string; icon: string };
  isSelected: boolean;
  onPress: () => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({
  category,
  isSelected,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const progress = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    progress.value = withSpring(isSelected ? 1 : 0, { damping: 15 });
  }, [isSelected, progress]);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, { damping: 15 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: progress.value > 0.5
      ? colors.accent
      : colors.surfaceElevated,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [colors.textSecondary, colors.background]
    ),
  }));

  const IconComponent = iconMap[category.icon] || Grid3X3;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.pill, animatedStyle]}
    >
      <View style={styles.iconContainer}>
        <IconComponent
          size={18}
          color={isSelected ? colors.background : colors.textSecondary}
        />
      </View>
      <Animated.Text style={[styles.pillText, textStyle]}>
        {category.name}
      </Animated.Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.screen,
    gap: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
  pillText: {
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '600',
  },
});
