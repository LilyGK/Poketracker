/**
 * Core data types for PokeTracker app
 */

export type FrequencyType = "daily" | "weekly";
export type RarityType = "common" | "rare" | "legendary";

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: FrequencyType;
  goalPerPeriod: number; // e.g., 1 per day
  createdAt: number;
  archived: boolean;
}

export interface Completion {
  habitId: string;
  date: string; // YYYY-MM-DD format
  count: number;
}

export interface EarnedPokemon {
  id: number; // PokeAPI pokemon id
  name: string;
  rarity: RarityType;
  earnedAt: number; // timestamp
}

export interface UserProgress {
  xp: number;
  streakByHabit: Record<string, number>; // habitId -> current streak
  earnedPokemon: EarnedPokemon[];
  lastRewardCheckpointXp: number; // to prevent double-awards
}

// PokeAPI response types (partial)
export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
}

// App state structure
export interface AppState {
  habits: Habit[];
  completions: Completion[];
  progress: UserProgress;
}
