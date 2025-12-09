/**
 * Decorative Background Pattern - Pokémon UI style
 * Adds subtle grain texture and energy glow effects
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

const { width, height } = Dimensions.get('window');

export function BackgroundPattern() {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Ambient glow top left */}
      <LinearGradient
        colors={[colors.glowOrange, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.glow, styles.glowTopLeft]}
      />
      
      {/* Ambient glow bottom right */}
      <LinearGradient
        colors={['transparent', colors.glowBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.glow, styles.glowBottomRight]}
      />
      
      {/* Subtle grain overlay */}
      <View style={styles.grain} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.5,
    borderRadius: width,
    opacity: 0.15,
  },
  glowTopLeft: {
    top: -height * 0.2,
    left: -width * 0.3,
  },
  glowBottomRight: {
    bottom: -height * 0.2,
    right: -width * 0.3,
  },
  grain: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
});
