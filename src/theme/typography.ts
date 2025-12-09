/**
 * Typography scale - Modern Pokémon UI inspired
 * Using bold, large, spaced letters for Clash Display aesthetic
 */

export const typography = {
  // Screen titles - Extra bold and large
  title: {
    fontSize: 36,
    fontWeight: '700' as const,
    lineHeight: 44,
    letterSpacing: 0.5,
  },
  titleMedium: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: 0.4,
  },
  
  // Section titles - Semibold Pokémon style
  heading: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 30,
    letterSpacing: 0.3,
  },
  headingLarge: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: 0.4,
  },
  headingSmall: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  
  // Body text - Modern and readable
  body: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 28,
    letterSpacing: 0.2,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  bodySemibold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  
  // Labels & buttons
  label: {
    fontSize: 15,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  labelBold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  
  // Small text
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  captionSmall: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  
  // Badges & chips
  badge: {
    fontSize: 11,
    fontWeight: '700' as const,
    lineHeight: 14,
    letterSpacing: 0.5,
  },
};
