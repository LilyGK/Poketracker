/**
 * Screen: Streaks / Stats
 * Shows XP, weekly completions, and habit streaks
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../store';
import { getLastNDays } from '../utils/date';
import { colors, typography, spacing, radius } from '../theme';

export function StreaksScreen() {
  const habits = useStore((state) => state.habits.filter((h) => !h.archived));
  const completions = useStore((state) => state.completions);
  const progress = useStore((state) => state.progress);

  // Calculate weekly completions (last 7 days)
  const last7Days = getLastNDays(7);
  const weeklyCompletions = completions.filter((c) =>
    last7Days.includes(c.date)
  ).length;

  // Sort habits by streak
  const habitsByStreak = [...habits].sort((a, b) => {
    const streakA = progress.streakByHabit[a.id] || 0;
    const streakB = progress.streakByHabit[b.id] || 0;
    return streakB - streakA;
  });

  return (
    <LinearGradient
      colors={colors.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
        <Text style={styles.screenTitle}>Streaks</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text
              testID="stats-total-xp"
              accessibilityLabel="stats-total-xp"
              style={styles.statValue}
            >
              {progress.xp}
            </Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>

          <View style={styles.statItem}>
            <Text
              testID="stats-weekly-completions"
              accessibilityLabel="stats-weekly-completions"
              style={styles.statValue}
            >
              {weeklyCompletions}
            </Text>
            <Text style={styles.statLabel}>Completions This Week</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Habit Streaks</Text>
        
        {habitsByStreak.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No habits yet</Text>
          </View>
        ) : (
          <View
            testID="stats-streak-list"
            accessibilityLabel="stats-streak-list"
            style={styles.streakList}
          >
            {habitsByStreak.map((habit) => {
              const streak = progress.streakByHabit[habit.id] || 0;
              return (
                <View
                  key={habit.id}
                  testID={`stats-streak-item-${habit.id}`}
                  accessibilityLabel={`stats-streak-item-${habit.id}`}
                  style={styles.streakItem}
                >
                  <View style={styles.streakInfo}>
                    <Text style={styles.streakTitle}>{habit.title}</Text>
                    <Text style={styles.streakFrequency}>
                      {habit.frequency} • Goal: {habit.goalPerPeriod}
                    </Text>
                  </View>
                  <View style={styles.streakBadge}>
                    <Text style={styles.streakNumber}>{streak}</Text>
                    <Text style={styles.streakDays}>days</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <Text style={styles.sectionTitle}>Pokémon Collection</Text>
        <View style={styles.pokemonCard}>
          <Text style={styles.pokemonCount}>
            {progress.earnedPokemon.length} Pokémon Earned
          </Text>
          <Text style={styles.pokemonBreakdown}>
            Common: {progress.earnedPokemon.filter((p) => p.rarity === 'common').length}
            {' • '}
            Rare: {progress.earnedPokemon.filter((p) => p.rarity === 'rare').length}
            {' • '}
            Legendary: {progress.earnedPokemon.filter((p) => p.rarity === 'legendary').length}
          </Text>
        </View>
      </View>
    </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100, // Space for tab bar
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  screenTitle: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
    gap: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.title,
    fontSize: 40,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
    width: '100%',
  },
  statLabel: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.headingLarge,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  streakList: {
    marginBottom: spacing.xl,
  },
  streakItem: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  streakFrequency: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  streakBadge: {
    backgroundColor: colors.warning,
    borderRadius: radius.md,
    padding: spacing.md,
    minWidth: 60,
    alignItems: 'center',
    shadowColor: colors.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  streakDays: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  pokemonCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pokemonCount: {
    ...typography.headingLarge,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  pokemonBreakdown: {
    ...typography.body,
    color: colors.textSecondary,
  },
  emptyState: {
    padding: spacing.huge,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
