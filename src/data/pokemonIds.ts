/**
 * Pokemon ID lists for deterministic rewards
 * Commons unlock at 50 XP intervals
 * Rares unlock at 150 XP intervals
 * Legendaries unlock at 300 XP intervals
 */

export const COMMON_POKEMON_IDS = [
  1,  // Bulbasaur
  4,  // Charmander
  7,  // Squirtle
  10, // Caterpie
  13, // Weedle
  16, // Pidgey
  19, // Rattata
  21, // Spearow
  25, // Pikachu
  27, // Sandshrew
  29, // Nidoran♀
  32, // Nidoran♂
  43, // Oddish
  46, // Paras
  48, // Venonat
];

export const RARE_POKEMON_IDS = [
  37, // Vulpix
  52, // Meowth
  58, // Growlithe
  77, // Ponyta
  92, // Gastly
  133, // Eevee
  147, // Dratini
];

export const LEGENDARY_POKEMON_IDS = [
  144, // Articuno
  145, // Zapdos
  146, // Moltres
  150, // Mewtwo
];

// XP thresholds for each rarity
export const XP_PER_COMPLETION = 10;
export const COMMON_XP_THRESHOLD = 50;
export const RARE_XP_THRESHOLD = 150;
export const LEGENDARY_XP_THRESHOLD = 300;
