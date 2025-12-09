/**
 * Main app store using Zustand with AsyncStorage persistence
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, Completion, UserProgress, EarnedPokemon } from '../types';
import { getTodayString, isYesterday } from '../utils/date';
import { checkForReward } from '../utils/rewards';
import { fetchPokemonById } from '../api/pokeapi';
import { XP_PER_COMPLETION } from '../data/pokemonIds';

const STORAGE_KEY = 'poketracker:state';

interface AppStore {
  // State
  habits: Habit[];
  completions: Completion[];
  progress: UserProgress;
  isLoaded: boolean;
  rewardModal: {
    visible: boolean;
    pokemon: EarnedPokemon | null;
  };

  // Actions
  loadState: () => Promise<void>;
  saveState: () => Promise<void>;
  resetAllData: () => Promise<void>;

  // Habit actions
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'archived'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  archiveHabit: (id: string) => void;

  // Completion actions
  completeHabit: (habitId: string) => Promise<void>;
  
  // Reward modal
  closeRewardModal: () => void;
}

const initialProgress: UserProgress = {
  xp: 0,
  streakByHabit: {},
  earnedPokemon: [],
  lastRewardCheckpointXp: 0,
};

export const useStore = create<AppStore>((set, get) => ({
  // Initial state
  habits: [],
  completions: [],
  progress: initialProgress,
  isLoaded: false,
  rewardModal: { visible: false, pokemon: null },

  // Load persisted state
  loadState: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        set({
          habits: parsed.habits || [],
          completions: parsed.completions || [],
          progress: parsed.progress || initialProgress,
          isLoaded: true,
        });
      } else {
        set({ isLoaded: true });
      }
    } catch (error) {
      console.error('Failed to load state:', error);
      set({ isLoaded: true });
    }
  },

  // Save state to AsyncStorage
  saveState: async () => {
    try {
      const { habits, completions, progress } = get();
      const state = { habits, completions, progress };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  },

  // Reset all data
  resetAllData: async () => {
    try {
      await AsyncStorage.clear();
      set({
        habits: [],
        completions: [],
        progress: initialProgress,
      });
    } catch (error) {
      console.error('Failed to reset data:', error);
    }
  },

  // Add a new habit
  addHabit: (habitData) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: Date.now(),
      archived: false,
    };
    set((state) => ({
      habits: [...state.habits, newHabit],
    }));
    get().saveState();
  },

  // Update an existing habit
  updateHabit: (id, updates) => {
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id ? { ...h, ...updates } : h
      ),
    }));
    get().saveState();
  },

  // Archive a habit
  archiveHabit: (id) => {
    get().updateHabit(id, { archived: true });
  },

  // Complete a habit (main logic)
  completeHabit: async (habitId) => {
    const { habits, completions, progress } = get();
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    const today = getTodayString();
    const existing = completions.find(
      (c) => c.habitId === habitId && c.date === today
    );

    let newCount = 1;
    let xpToAdd = XP_PER_COMPLETION;

    if (existing) {
      // Already completed today - increment if under goal
      if (existing.count >= habit.goalPerPeriod) {
        return; // Already hit goal, no more XP
      }
      newCount = existing.count + 1;
    } else {
      // First completion today - update streak
      const allHabitCompletions = completions
        .filter((c) => c.habitId === habitId)
        .sort((a, b) => b.date.localeCompare(a.date));

      let newStreak = 1;
      if (allHabitCompletions.length > 0) {
        const lastDate = allHabitCompletions[0].date;
        if (isYesterday(lastDate, today)) {
          newStreak = (progress.streakByHabit[habitId] || 0) + 1;
        }
      }

      set((state) => ({
        progress: {
          ...state.progress,
          streakByHabit: {
            ...state.progress.streakByHabit,
            [habitId]: newStreak,
          },
        },
      }));
    }

    // Update completion
    const updatedCompletions = existing
      ? completions.map((c) =>
          c.habitId === habitId && c.date === today
            ? { ...c, count: newCount }
            : c
        )
      : [...completions, { habitId, date: today, count: newCount }];

    // Add XP
    const newXp = progress.xp + xpToAdd;

    // Check for reward
    const rewardCheck = checkForReward(
      newXp,
      progress.lastRewardCheckpointXp,
      progress.earnedPokemon
    );

    if (rewardCheck.shouldAward && rewardCheck.pokemon) {
      // Fetch Pokemon name from API
      const pokemonData = await fetchPokemonById(rewardCheck.pokemon.id);
      const earnedPokemon: EarnedPokemon = {
        id: rewardCheck.pokemon.id,
        name: pokemonData?.name || `Pokemon #${rewardCheck.pokemon.id}`,
        rarity: rewardCheck.pokemon.rarity,
        earnedAt: Date.now(),
      };

      set((state) => ({
        completions: updatedCompletions,
        progress: {
          ...state.progress,
          xp: newXp,
          earnedPokemon: [...state.progress.earnedPokemon, earnedPokemon],
          lastRewardCheckpointXp: newXp,
        },
        rewardModal: { visible: true, pokemon: earnedPokemon },
      }));
    } else {
      set((state) => ({
        completions: updatedCompletions,
        progress: {
          ...state.progress,
          xp: newXp,
        },
      }));
    }

    get().saveState();
  },

  // Close reward modal
  closeRewardModal: () => {
    set({ rewardModal: { visible: false, pokemon: null } });
  },
}));
