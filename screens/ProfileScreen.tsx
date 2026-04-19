import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {
  User,
  Package,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  ChevronRight,
  LogOut,
  Settings,
  Award,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { GlassCard } from '../components/GlassCard';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const menuItems = [
  { id: 'orders', name: 'My Orders', icon: Package, count: 3 },
  { id: 'payment', name: 'Payment Methods', icon: CreditCard },
  { id: 'address', name: 'Shipping Addresses', icon: MapPin, count: 2 },
  { id: 'notifications', name: 'Notifications', icon: Bell, count: 5 },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'settings', name: 'Settings', icon: Settings },
];

const stats = [
  { label: 'Orders', value: '24' },
  { label: 'Spent', value: '$4.2k' },
  { label: 'Points', value: '2,450' },
];

export const ProfileScreen: React.FC = () => {
  const [user] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
    memberSince: '2023',
    tier: 'Platinum',
  });

  const headerOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(30);

  React.useEffect(() => {
    headerOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));
    contentTranslateY.value = withDelay(200, withSpring(0, { damping: 15 }));
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const renderMenuItem = useCallback(
    (item: typeof menuItems[0], index: number) => (
      <MenuItem key={item.id} item={item} index={index} />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Settings size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.content, contentStyle]}>
          {/* Profile Card */}
          <GlassCard style={styles.profileCard}>
            <LinearGradient
              colors={[colors.accentSoft, 'transparent']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />

            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.tierBadge}>
                  <Award size={12} color={colors.gold} />
                </View>
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>

                <View style={styles.tierContainer}>
                  <View style={styles.tierPill}>
                    <Text style={styles.tierText}>{user.tier} Member</Text>
                  </View>
                  <Text style={styles.memberSince}>
                    Since {user.memberSince}
                  </Text>
                </View>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View
                  key={stat.label}
                  style={[
                    styles.stat,
                    index < stats.length - 1 && styles.statBorder,
                  ]}
                >
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </GlassCard>

          {/* Menu Items */}
          <GlassCard style={styles.menuCard}>
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </GlassCard>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={colors.error} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface MenuItemProps {
  item: typeof menuItems[0];
  index: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, index }) => {
  const scale = useSharedValue(1);
  const IconComponent = item.icon;

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.98, { damping: 15 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.menuItem, animatedStyle]}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <IconComponent size={22} color={colors.accent} />
        </View>
        <Text style={styles.menuItemText}>{item.name}</Text>
      </View>

      <View style={styles.menuItemRight}>
        {item.count > 0 && (
          <View style={styles.menuBadge}>
            <Text style={styles.menuBadgeText}>{item.count}</Text>
          </View>
        )}
        <ChevronRight size={20} color={colors.textTertiary} />
      </View>
    </AnimatedTouchable>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.h2.fontSize,
    fontWeight: '700',
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: spacing.lg,
  },
  profileCard: {
    padding: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  tierBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gold,
  },
  profileInfo: {
    marginLeft: spacing.lg,
    flex: 1,
  },
  userName: {
    color: colors.textPrimary,
    fontSize: typography.h4.fontSize,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall.fontSize,
    marginBottom: spacing.sm,
  },
  tierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierPill: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  tierText: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
  },
  memberSince: {
    color: colors.textTertiary,
    fontSize: typography.caption.fontSize,
    marginLeft: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: typography.h3.fontSize,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textTertiary,
    fontSize: typography.caption.fontSize,
    letterSpacing: 0.5,
  },
  menuCard: {
    paddingVertical: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.accentSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuItemText: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: '500',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuBadge: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  menuBadgeText: {
    color: colors.background,
    fontSize: typography.caption.fontSize - 1,
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  logoutText: {
    color: colors.error,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
});
