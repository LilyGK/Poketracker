/**
 * Reward calculation logic - deterministic Pokemon unlocks
 */

import {
  COMMON_POKEMON_IDS,
  RARE_POKEMON_IDS,
  LEGENDARY_POKEMON_IDS,
  COMMON_XP_THRESHOLD,
  RARE_XP_THRESHOLD,
  LEGENDARY_XP_THRESHOLD,
} from '../data/pokemonIds';
import { EarnedPokemon, RarityType } from '../types';

interface RewardCheck {
  shouldAward: boolean;
  pokemon?: {
    id: number;
    name: string;
    rarity: RarityType;
  };
}

/**
 * Check if user should receive a Pokemon reward based on XP
 * Returns the next unearned Pokemon in deterministic order
 */
export function checkForReward(
  currentXp: number,
  lastCheckpointXp: number,
  earnedPokemon: EarnedPokemon[]
): RewardCheck {
  const earnedIds = new Set(earnedPokemon.map(p => p.id));

  // Check legendaries (highest threshold)
  if (currentXp >= LEGENDARY_XP_THRESHOLD && lastCheckpointXp < LEGENDARY_XP_THRESHOLD) {
    const nextLegendary = LEGENDARY_POKEMON_IDS.find(id => !earnedIds.has(id));
    if (nextLegendary) {
      return {
        shouldAward: true,
        pokemon: {
          id: nextLegendary,
          name: '', // Will be filled from API
          rarity: 'legendary',
        },
      };
    }
  }

  // Check rares
  if (currentXp >= RARE_XP_THRESHOLD && lastCheckpointXp < RARE_XP_THRESHOLD) {
    const nextRare = RARE_POKEMON_IDS.find(id => !earnedIds.has(id));
    if (nextRare) {
      return {
        shouldAward: true,
        pokemon: {
          id: nextRare,
          name: '',
          rarity: 'rare',
        },
      };
    }
  }

  // Check commons
  if (currentXp >= COMMON_XP_THRESHOLD && lastCheckpointXp < COMMON_XP_THRESHOLD) {
    const nextCommon = COMMON_POKEMON_IDS.find(id => !earnedIds.has(id));
    if (nextCommon) {
      return {
        shouldAward: true,
        pokemon: {
          id: nextCommon,
          name: '',
          rarity: 'common',
        },
      };
    }
  }

  // Check for additional common rewards at 50 XP intervals
  const commonInterval = COMMON_XP_THRESHOLD;
  const lastCommonMilestone = Math.floor(lastCheckpointXp / commonInterval) * commonInterval;
  const currentCommonMilestone = Math.floor(currentXp / commonInterval) * commonInterval;

  if (currentCommonMilestone > lastCommonMilestone && currentCommonMilestone >= commonInterval) {
    const nextCommon = COMMON_POKEMON_IDS.find(id => !earnedIds.has(id));
    if (nextCommon) {
      return {
        shouldAward: true,
        pokemon: {
          id: nextCommon,
          name: '',
          rarity: 'common',
        },
      };
    }
  }

  return { shouldAward: false };
}
