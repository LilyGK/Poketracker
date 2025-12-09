/**
 * Screen: Today / Home
 * Shows today's habits with completion buttons
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../store';
import { HabitCard } from '../components/HabitCard';
import { getTodayString } from '../utils/date';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { PrimaryButton } from '../components/StyledComponents';
import { colors, typography, spacing, radius } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Today'>;

export function TodayScreen({ navigation }: Props) {
  const habits = useStore((state) => state.habits.filter((h) => !h.archived));
  const completions = useStore((state) => state.completions);
  const streaks = useStore((state) => state.progress.streakByHabit);
  const completeHabit = useStore((state) => state.completeHabit);

  const today = getTodayString();

  const getTodayProgress = (habitId: string) => {
    const completion = completions.find(
      (c) => c.habitId === habitId && c.date === today
    );
    return completion?.count || 0;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>⚪</Text>
      <Text style={styles.emptyTitle}>No habits yet</Text>
      <Text style={styles.emptySubtitle}>
        Start building your routine{'\n'}and catch Pokémon!
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={colors.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.screenTitle}>Today</Text>
      <FlatList
        testID="habit-list"
        accessibilityLabel="habit-list"
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            streak={streaks[item.id] || 0}
            todayProgress={getTodayProgress(item.id)}
            onPress={() => navigation.navigate('HabitDetail', { habitId: item.id })}
            onComplete={() => completeHabit(item.id)}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          habits.length === 0 && styles.listContentEmpty,
        ]}
      />

      <LinearGradient
        colors={[colors.surface, colors.surfaceVariant, '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.fabContainer}
      >
        <View style={styles.fab}>
          <PrimaryButton
            testID="add-habit-btn"
            accessibilityLabel="add-habit-btn"
            title="+ Add Habit"
            onPress={() => navigation.navigate('AddEditHabit', {})}
          />
        </View>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    ...typography.title,
    color: colors.text,
    marginTop: 60,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: spacing.base,
    paddingBottom: 220, // Increased space for FAB + tab bar
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  fab: {
    shadowColor: 'transparent',
    elevation: 0,
  },
});
