/**
 * Reusable styled components - Pokémon UI style
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, radius, shadows } from '../theme';

// PokeCard - Main card component
interface PokeCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'sm' | 'base' | 'md' | 'lg';
}

export function PokeCard({ children, style, elevation = 'base' }: PokeCardProps) {
  return (
    <View style={[styles.card, shadows[elevation], style]}>
      {children}
    </View>
  );
}

// PrimaryButton - Large glossy Pokémon-style button
interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function PrimaryButton({ 
  onPress, 
  title, 
  disabled, 
  testID, 
  accessibilityLabel,
  style,
  fullWidth = false 
}: ButtonProps) {
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel || testID}
      accessibilityRole="button"
      style={[
        styles.primaryButtonWrapper,
        fullWidth && styles.fullWidth,
        disabled && styles.buttonDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={disabled 
          ? ['#666666', '#444444']
          : [colors.primary, colors.primaryDark, '#E08920']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// SecondaryButton - Subtle glossy button
export function SecondaryButton({ 
  onPress, 
  title, 
  disabled, 
  testID, 
  accessibilityLabel,
  style 
}: ButtonProps) {
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel || testID}
      accessibilityRole="button"
      style={[
        styles.secondaryButtonWrapper,
        disabled && styles.buttonDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[colors.surfaceLight, colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// Badge
interface BadgeProps {
  text: string;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

export function Badge({ text, color = colors.primary, textColor = colors.text, style }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }, style]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
    </View>
  );
}

// Chip (rounded pill)
interface ChipProps {
  text: string;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

export function Chip({ text, color = colors.surfaceVariant, textColor = colors.text, style }: ChipProps) {
  return (
    <View style={[styles.chip, { backgroundColor: color }, style]}>
      <Text style={[styles.chipText, { color: textColor }]}>{text}</Text>
    </View>
  );
}

// ScreenContainer
interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ScreenContainer({ children, style }: ScreenContainerProps) {
  return (
    <View style={[styles.screenContainer, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.base,
  },
  
  primaryButtonWrapper: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  
  primaryButton: {
    paddingHorizontal: spacing.xl + spacing.md,
    paddingVertical: spacing.lg + spacing.xs,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  fullWidth: {
    width: '100%',
  },
  
  buttonDisabled: {
    opacity: 0.5,
  },
  
  primaryButtonText: {
    ...typography.labelBold,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  
  secondaryButtonWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  secondaryButton: {
    paddingHorizontal: spacing.xl + spacing.md,
    paddingVertical: spacing.lg,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 65,
    borderWidth: 2,
    borderColor: colors.border,
  },
  
  secondaryButtonText: {
    ...typography.labelBold,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: 0.5,
  },
  
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 1,
    borderRadius: radius.xs,
    alignSelf: 'flex-start',
  },
  
  badgeText: {
    ...typography.badge,
    textTransform: 'uppercase',
  },
  
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 1,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  
  chipText: {
    ...typography.caption,
    fontWeight: '600',
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
