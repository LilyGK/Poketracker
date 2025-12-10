/**
 * Reusable component: HabitCard for displaying habit in list
 * Modern Pokémon-inspired 3D glossy design
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Habit } from '../types';
import { colors, typography, spacing, radius, shadows } from '../theme';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface HabitCardProps {
  habit: Habit;
  streak: number;
  todayProgress: number;
  onPress: () => void;
  onComplete: () => void;
}

export function HabitCard({
  habit,
  streak,
  todayProgress,
  onPress,
  onComplete,
}: HabitCardProps) {
  const isComplete = todayProgress >= habit.goalPerPeriod;

  return (
    <TouchableOpacity
      testID={`habit-card-${habit.id}`}
      accessibilityLabel={`habit-card-${habit.id}`}
      accessibilityRole="button"
      style={styles.cardWrapper}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <LinearGradient
        colors={isComplete 
          ? ['#2D4D3D', '#232323', '#1B2D25']
          : [colors.surfaceLight, colors.surface, colors.surfaceVariant]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.card,
          isComplete && styles.cardCompleted
        ]}
      >
        {/* Glow effect when completed */}
        {isComplete && (
          <View style={styles.glowEffect} />
        )}

        {/* Accent border */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.accentBorder}
        />
        
        <View style={styles.content}>
          {/* Header with title and streak */}
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>{habit.title}</Text>
            
            {/* Streak badge with fire animation */}
            {streak > 0 && (
              <LinearGradient
                colors={['#FFB444', '#FF8A3D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.streakBadge}
              >
                <Text style={styles.fireIcon}>🔥</Text>
                <Text style={styles.streakText}>{streak}</Text>
              </LinearGradient>
            )}
          </View>
          
          {/* Progress info */}
          <View style={styles.progressInfo}>
            <View style={styles.progressDot} />
            <Text style={styles.progressText}>
              {todayProgress}/{habit.goalPerPeriod} completed today
            </Text>
          </View>

          {/* Pokéball button */}
          {isComplete ? (
            <View style={styles.completedContainer}>
              <LinearGradient
                colors={['#22C55E', '#16A34A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.completedBadge}
              >
                <Text style={styles.completedText}>✓ Completed!</Text>
              </LinearGradient>
            </View>
          ) : (
            <TouchableOpacity
              testID={`complete-habit-btn-${habit.id}`}
              accessibilityLabel={`complete-habit-btn-${habit.id}`}
              onPress={onComplete}
              activeOpacity={0.8}
              style={styles.pokeballButtonContainer}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.pokeballButton}
              >
                <Pokeball />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// Simple Pokéball SVG icon
function Pokeball() {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
      <G>
        {/* Top half - red */}
        <Path
          d="M12 2C6.48 2 2 6.48 2 12h10V2z"
          fill="#FFFFFF"
        />
        {/* Bottom half - white */}
        <Path
          d="M22 12c0-5.52-4.48-10-10-10v10h10z"
          fill="#FFD1D1"
        />
        {/* Center band */}
        <Path
          d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          fill="#232323"
        />
        {/* Center dot */}
        <Circle cx="12" cy="12" r="2" fill="#FFFFFF" />
      </G>
    </Svg>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: spacing.lg + spacing.sm,
  },
  card: {
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  cardCompleted: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.glowOrange,
    opacity: 0.1,
  },
  accentBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
  },
  content: {
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.headingLarge,
    color: colors.text,
    flex: 1,
    fontWeight: '700',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    shadowColor: colors.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  fireIcon: {
    fontSize: 20,
  },
  streakText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    fontSize: 18,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  completedContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  completedBadge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  completedText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
  pokeballButtonContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  pokeballButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.text,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});
