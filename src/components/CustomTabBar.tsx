/**
 * Custom Bottom Tab Bar - Pokémon-inspired large buttons
 * Modern glossy UI with Pokéball center icon
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, typography, spacing, radius } from '../theme';
import Svg, { Path, Circle, G } from 'react-native-svg';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.surface, colors.surfaceVariant, '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.tabBar}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const isCenter = route.name === 'PokedexTab';

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              <LinearGradient
                colors={isFocused 
                  ? (isCenter 
                      ? [colors.primary, colors.primaryDark]
                      : [colors.secondary, colors.secondaryDark])
                  : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                  styles.tabButton,
                  isFocused && styles.tabButtonActive
                ]}
              >
                <Text style={styles.tabIcon}>
                  {route.name === 'HomeTab' && '🏠'}
                  {route.name === 'StreaksTab' && '🔥'}
                  {route.name === 'PokedexTab' && (
                    <PokeballIcon focused={isFocused} />
                  )}
                  {route.name === 'SettingsTab' && '⚙️'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
}

// Pokéball Icon Component
function PokeballIcon({ focused }: { focused: boolean }) {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
      <G>
        {/* Top half */}
        <Path
          d="M12 2C6.48 2 2 6.48 2 12h10V2z"
          fill={focused ? '#FFFFFF' : '#666666'}
        />
        {/* Bottom half */}
        <Path
          d="M22 12c0-5.52-4.48-10-10-10v10h10z"
          fill={focused ? '#FFD1D1' : '#444444'}
        />
        {/* Center band */}
        <Path
          d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          fill={focused ? '#232323' : '#333333'}
        />
        {/* Center dot */}
        <Circle cx="12" cy="12" r="2" fill={focused ? '#FFFFFF' : '#666666'} />
      </G>
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabButtonActive: {
    borderColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    ...typography.bodySmall,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  centerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 85,
    height: 85,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.text,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
    marginBottom: spacing.xs,
  },
  centerLabel: {
    ...typography.bodySmall,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: spacing.xs,
  },
});
