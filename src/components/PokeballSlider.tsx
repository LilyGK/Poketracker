/**
 * PokeballSlider - Interactive swipe-to-complete component
 * Pokémon-style habit completion with slide animation
 */

import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  PanResponder, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, radius } from '../theme';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface PokeballSliderProps {
  onComplete: () => void;
  isCompleted: boolean;
  disabled?: boolean;
}

const SLIDER_WIDTH = Dimensions.get('window').width - 80;
const BALL_SIZE = 60;
const TRAVEL_DISTANCE = SLIDER_WIDTH - BALL_SIZE - 20;

export function PokeballSlider({ onComplete, isCompleted, disabled }: PokeballSliderProps) {
  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Reset slider position when it's not completed (for multi-item habits)
  useEffect(() => {
    if (!isCompleted) {
      pan.setValue(0);
      scale.setValue(1);
    }
  }, [isCompleted]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isCompleted && !disabled,
      onMoveShouldSetPanResponder: () => !isCompleted && !disabled,
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 1.1,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx >= 0 && gestureState.dx <= TRAVEL_DISTANCE) {
          pan.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();

        if (gestureState.dx > TRAVEL_DISTANCE * 0.7) {
          // Complete
          Animated.spring(pan, {
            toValue: TRAVEL_DISTANCE,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }).start(() => {
            onComplete();
          });
        } else {
          // Snap back
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }).start();
        }
      },
    })
  ).current;

  if (isCompleted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#22C55E', '#16A34A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.completedTrack}
        >
          <Text style={styles.completedText}>✓ Completed!</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.surfaceLight, colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.track}
      >
        <View style={styles.trackContent}>
          <Text style={styles.trackText}>Swipe to Complete</Text>
          <Text style={styles.trackIcon}>→</Text>
        </View>
      </LinearGradient>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.ball,
          {
            transform: [
              { translateX: pan },
              { scale: scale },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.ballGradient}
        >
          <Pokeball />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

// Simple Pokéball SVG icon
function Pokeball() {
  return (
    <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
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
  container: {
    width: SLIDER_WIDTH,
    height: 70,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: spacing.md,
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  trackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  trackText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  trackIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  ball: {
    position: 'absolute',
    left: 10,
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  ballGradient: {
    width: '100%',
    height: '100%',
    borderRadius: BALL_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.text,
  },
  completedTrack: {
    width: '100%',
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  completedText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
    fontSize: 18,
  },
});
