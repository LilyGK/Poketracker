/**
 * Screen: Habit Detail
 * Shows habit info, streak, recent completions, and actions
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../store';
import { getTodayString, getLastNDays } from '../utils/date';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { PokeCard, Badge, Chip, PrimaryButton, SecondaryButton } from '../components/StyledComponents';
import { colors, typography, spacing, radius, shadows } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'HabitDetail'>;

export function HabitDetailScreen({ route, navigation }: Props) {
  const { habitId } = route.params;

  const habit = useStore((state) =>
    state.habits.find((h) => h.id === habitId)
  );
  const completions = useStore((state) => state.completions);
  const streak = useStore((state) => state.progress.streakByHabit[habitId] || 0);
  const completeHabit = useStore((state) => state.completeHabit);
  const archiveHabit = useStore((state) => state.archiveHabit);

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Habit not found</Text>
      </View>
    );
  }

  const today = getTodayString();
  const last7Days = getLastNDays(7);

  const getTodayProgress = () => {
    const completion = completions.find(
      (c) => c.habitId === habitId && c.date === today
    );
    return completion?.count || 0;
  };

  const getCompletionForDate = (date: string) => {
    const completion = completions.find(
      (c) => c.habitId === habitId && c.date === date
    );
    return completion?.count || 0;
  };

  const handleArchive = () => {
    Alert.alert(
      'Archive Habit',
      'Are you sure? This will hide the habit from your daily list.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Archive',
          style: 'destructive',
          onPress: () => {
            archiveHabit(habitId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const todayProgress = getTodayProgress();
  const isComplete = todayProgress >= habit.goalPerPeriod;
  const progressPercent = Math.min((todayProgress / habit.goalPerPeriod) * 100, 100);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Hero Card */}
        <PokeCard elevation="md" style={styles.heroCard}>
          <Text
            testID="habit-detail-title"
            accessibilityLabel="habit-detail-title"
            style={styles.title}
          >
            {habit.title}
          </Text>
          
          {habit.description && (
            <Text style={styles.description}>{habit.description}</Text>
          )}

          {/* Streak & Progress Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>🔥 {streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {todayProgress}/{habit.goalPerPeriod}
              </Text>
              <Text style={styles.statLabel}>Today's Goal</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressPercent}>{Math.round(progressPercent)}%</Text>
          </View>

          {/* Metadata */}
          <View style={styles.metaRow}>
            <Chip text={habit.frequency === 'daily' ? 'Daily' : 'Weekly'} />
            <Chip text={`Goal: ${habit.goalPerPeriod}`} />
          </View>
        </PokeCard>

        {/* Last 7 Days */}
        <Text style={styles.sectionTitle}>Last 7 Days</Text>
        <View style={styles.daysGrid}>
          {last7Days.map((date) => {
            const count = getCompletionForDate(date);
            const isToday = date === today;
            const isDone = count >= habit.goalPerPeriod;
            
            return (
              <View 
                key={date} 
                style={[
                  styles.dayChip,
                  isDone && styles.dayChipComplete,
                  isToday && styles.dayChipToday,
                ]}
              >
                <Text style={[
                  styles.dayChipDate,
                  isDone && styles.dayChipDateComplete,
                ]}>
                  {date.slice(-5)}
                </Text>
                <Text style={[
                  styles.dayChipIcon,
                  isDone && styles.dayChipIconComplete,
                ]}>
                  {isDone ? '✓' : '○'}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <View style={styles.actionButtonWrapper}>
            <SecondaryButton
              testID="edit-habit-btn"
              accessibilityLabel="edit-habit-btn"
              title="Edit"
              onPress={() => navigation.navigate('AddEditHabit', { habitId })}
            />
          </View>
          <View style={styles.actionButtonWrapper}>
            <TouchableOpacity
              testID="archive-habit-btn"
              accessibilityLabel="archive-habit-btn"
              accessibilityRole="button"
              style={styles.archiveBtn}
              onPress={handleArchive}
              activeOpacity={0.7}
            >
              <Text style={styles.archiveBtnText}>Archive</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View style={styles.bottomCta}>
        <PrimaryButton
          testID="detail-complete-btn"
          accessibilityLabel="detail-complete-btn"
          title={isComplete ? '✓ Completed Today' : 'Complete Today'}
          onPress={() => completeHabit(habitId)}
          disabled={isComplete}
          style={isComplete ? styles.completeBtnDisabled : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 160, // space for fixed bottom button + tab bar
  },
  heroCard: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.headingLarge,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.captionSmall,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.base,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceVariant,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: radius.pill,
  },
  progressPercent: {
    ...typography.captionSmall,
    fontWeight: '700',
    color: colors.text,
    minWidth: 40,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.base,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  dayChip: {
    flex: 1,
    minWidth: '13%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  dayChipComplete: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  dayChipToday: {
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  dayChipDate: {
    ...typography.captionSmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs - 2,
  },
  dayChipDateComplete: {
    color: colors.success,
    fontWeight: '600',
  },
  dayChipIcon: {
    fontSize: 18,
    color: colors.textTertiary,
  },
  dayChipIconComplete: {
    color: colors.success,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  actionButtonWrapper: {
    flex: 1,
  },
  archiveBtn: {
    flex: 1,
    height: 52,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.error,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  archiveBtnText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.error,
  },
  bottomCta: {
    position: 'absolute',
    bottom: 80, // space for tab bar
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.lg,
  },
  completeBtnDisabled: {
    backgroundColor: colors.surfaceVariant,
    opacity: 0.6,
  },
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
