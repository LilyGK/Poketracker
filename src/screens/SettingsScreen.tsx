/**
 * Screen: Settings
 * App settings including reset data
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../store';
import { colors, typography, spacing, radius } from '../theme';

export function SettingsScreen() {
  const resetAllData = useStore((state) => state.resetAllData);

  const handleReset = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure? This will delete all habits, completions, and earned Pokémon. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAllData();
            Alert.alert('Success', 'All data has been reset.');
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={colors.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.screenTitle}>Settings</Text>
      <View style={styles.content}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            PokeTracker - Build habits, earn Pokémon!
          </Text>
          <Text style={styles.sectionText}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <TouchableOpacity
            testID="reset-data-btn"
            accessibilityLabel="reset-data-btn"
            accessibilityRole="button"
            style={styles.dangerBtn}
            onPress={handleReset}
          >
            <Text style={styles.dangerBtnText}>Reset All Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <Text style={styles.helpText}>
            • Complete habits to earn XP (10 XP per completion)
          </Text>
          <Text style={styles.helpText}>
            • 50 XP → Common Pokémon
          </Text>
          <Text style={styles.helpText}>
            • 150 XP → Rare Pokémon
          </Text>
          <Text style={styles.helpText}>
            • 300 XP → Legendary Pokémon
          </Text>
          <Text style={styles.helpText}>
            • Build streaks by completing habits daily
          </Text>
        </View>
      </View>
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
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  dangerBtn: {
    backgroundColor: colors.error,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  dangerBtnText: {
    color: colors.text,
    ...typography.body,
    fontWeight: '600',
  },
  helpText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
});
