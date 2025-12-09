/**
 * Color palette - Modern Pokémon-inspired theme
 * Based on Pokémon selection UI reference
 */

export const colors = {
  // Primary colors - Vibrant Pokémon accents
  primary: '#FFB444',      // Warm glowing orange
  primaryDark: '#E89A2F',
  primaryLight: '#FFC866',
  
  secondary: '#B2FFE2',    // Mint green accent
  secondaryDark: '#8FECC8',
  secondaryLight: '#CFFFED',
  
  accent: '#ADDAEE',       // Light blue highlight
  accentDark: '#8BC4D8',
  accentLight: '#C4E6F4',
  
  // Status colors
  success: '#22C55E',
  successLight: '#86EFAC',
  warning: '#FFB444',      // Using primary orange
  warningLight: '#FFC866',
  error: '#EF4444',
  errorLight: '#FCA5A5',
  
  // Surfaces - Dark Pokémon theme
  background: '#000000',        // Deep black
  backgroundGradientStart: '#232323',  // Dark surface
  backgroundGradientMid: '#1B3430',    // Blue-green tint
  backgroundGradientEnd: '#000000',    // Black anchor
  
  surface: '#232323',          // Dark card surface
  surfaceLight: '#2D2D2D',
  surfaceVariant: '#1B3430',   // Blue-green variant
  
  // Text
  text: '#FFFFFF',            // White primary text
  textSecondary: '#B2B2B2',   // Light gray
  textTertiary: '#808080',    // Medium gray
  textInverse: '#000000',     // Black on light backgrounds
  
  // Borders & overlays
  border: 'rgba(255, 255, 255, 0.1)',
  borderDark: 'rgba(255, 255, 255, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Glow effects
  glowOrange: 'rgba(255, 180, 68, 0.5)',
  glowMint: 'rgba(178, 255, 226, 0.4)',
  glowBlue: 'rgba(173, 218, 238, 0.4)',
  
  // Rarity colors
  rarityCommon: '#8BC34A',
  rarityRare: '#2196F3',
  rarityLegendary: '#FF9800',
  
  // Gradient arrays
  gradientHeader: ['#232323', '#1B3430', '#000000'] as string[],
  gradientButton: ['#FFB444', '#FFA020'] as string[],
  gradientCard: ['#2D2D2D', '#232323'] as string[],
  gradientBackground: ['#232323', '#1B3430', '#000000'] as string[],
};

export const gradients = {
  primary: ['#E3350D', '#FF5B3D'],
  secondary: ['#3B4CCA', '#5B6FE8'],
  accent: ['#FFCB05', '#FFD94D'],
  header: ['#E3350D', '#FFCB05'],
  headerAlt: ['#3B4CCA', '#E3350D'],
};
