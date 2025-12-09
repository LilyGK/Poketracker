/**
 * Screen: Add/Edit Habit
 * Form for creating or editing a habit
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useStore } from '../store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { FrequencyType } from '../types';
import { PrimaryButton, SecondaryButton } from '../components/StyledComponents';
import { colors, typography, spacing, radius, shadows } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'AddEditHabit'>;

export function AddEditHabitScreen({ route, navigation }: Props) {
  const { habitId } = route.params;
  const isEditing = !!habitId;

  const habits = useStore((state) => state.habits);
  const addHabit = useStore((state) => state.addHabit);
  const updateHabit = useStore((state) => state.updateHabit);

  const existingHabit = habitId
    ? habits.find((h) => h.id === habitId)
    : undefined;

  const [title, setTitle] = useState(existingHabit?.title || '');
  const [description, setDescription] = useState(existingHabit?.description || '');
  const [frequency, setFrequency] = useState<FrequencyType>(
    existingHabit?.frequency || 'daily'
  );
  const [goal, setGoal] = useState(
    existingHabit?.goalPerPeriod.toString() || '1'
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    const goalNum = parseInt(goal, 10);
    if (isNaN(goalNum) || goalNum < 1) {
      newErrors.goal = 'Goal must be at least 1';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const habitData = {
      title: title.trim(),
      description: description.trim(),
      frequency,
      goalPerPeriod: parseInt(goal, 10),
    };

    if (isEditing && habitId) {
      updateHabit(habitId, habitData);
    } else {
      addHabit(habitData);
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Title Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            testID="habit-title-input"
            accessibilityLabel="habit-title-input"
            style={[styles.input, errors.title ? styles.inputError : null]}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Morning workout"
            placeholderTextColor={colors.textTertiary}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            testID="habit-desc-input"
            accessibilityLabel="habit-desc-input"
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Optional description"
            placeholderTextColor={colors.textTertiary}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Frequency Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.segmentControl}>
            <TouchableOpacity
              testID="frequency-daily-btn"
              accessibilityLabel="frequency-daily-btn"
              accessibilityRole="button"
              style={[
                styles.segment,
                frequency === 'daily' && styles.segmentActive,
              ]}
              onPress={() => setFrequency('daily')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  frequency === 'daily' && styles.segmentTextActive,
                ]}
              >
                Daily
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="frequency-weekly-btn"
              accessibilityLabel="frequency-weekly-btn"
              accessibilityRole="button"
              style={[
                styles.segment,
                frequency === 'weekly' && styles.segmentActive,
              ]}
              onPress={() => setFrequency('weekly')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  frequency === 'weekly' && styles.segmentTextActive,
                ]}
              >
                Weekly
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Goal Section */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Goal per {frequency === 'daily' ? 'day' : 'week'}
          </Text>
          <TextInput
            testID="goal-input"
            accessibilityLabel="goal-input"
            style={[styles.input, errors.goal ? styles.inputError : null]}
            value={goal}
            onChangeText={setGoal}
            placeholder="1"
            placeholderTextColor={colors.textTertiary}
            keyboardType="number-pad"
          />
          {errors.goal && <Text style={styles.errorText}>{errors.goal}</Text>}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttons}>
          <View style={styles.buttonWrapper}>
            <SecondaryButton
              testID="cancel-habit-btn"
              accessibilityLabel="cancel-habit-btn"
              title="Cancel"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              testID="save-habit-btn"
              accessibilityLabel="save-habit-btn"
              title={isEditing ? 'Update' : 'Create'}
              onPress={handleSave}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.bodyLarge,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.base,
    fontSize: typography.body.fontSize,
    color: colors.text,
    ...shadows.sm,
  },
  inputError: {
    borderColor: colors.error,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.base,
  },
  errorText: {
    ...typography.captionSmall,
    color: colors.error,
    marginTop: spacing.xs,
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.base + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.secondary,
  },
  segmentText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.textInverse,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  buttonWrapper: {
    flex: 1,
  },
});
