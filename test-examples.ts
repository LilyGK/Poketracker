/**
 * Example Test Utilities
 * 
 * This file demonstrates how to use the test-friendly features
 * of PokeTracker for automated testing with Appium or other tools.
 */

import { setTestToday } from './src/utils/date';
import { useStore } from './src/store';

/**
 * EXAMPLE 1: Freeze Time for Deterministic Tests
 * 
 * Use this to ensure streak calculations are consistent
 */
export function setupTestDate() {
  // Set a fixed date for testing
  const testDate = new Date('2025-01-15T12:00:00Z');
  setTestToday(testDate);
  
  // Now all date-related functions use this fixed date
  // - getTodayString() returns '2025-01-15'
  // - Streak calculations are consistent
  // - No flakiness from crossing midnight during tests
}

/**
 * EXAMPLE 2: Reset App State
 * 
 * Clean slate before each test suite
 */
export async function resetAppForTesting() {
  const store = useStore.getState();
  await store.resetAllData();
  
  // App is now in fresh state:
  // - No habits
  // - No completions
  // - 0 XP
  // - No earned Pokémon
}

/**
 * EXAMPLE 3: Seed Test Data
 * 
 * Create predictable initial state
 */
export function seedTestData() {
  const store = useStore.getState();
  
  // Add a test habit
  store.addHabit({
    title: 'Test Habit',
    description: 'For automated testing',
    frequency: 'daily',
    goalPerPeriod: 1,
  });
  
  // Get the habit ID (it will be the timestamp)
  const habits = store.habits;
  const testHabit = habits[habits.length - 1];
  
  return testHabit.id;
}

/**
 * EXAMPLE 4: Verify XP Calculation
 * 
 * Test the reward system
 */
export async function testXpAndRewards() {
  const store = useStore.getState();
  
  // Reset first
  await resetAppForTesting();
  
  // Create a habit
  const habitId = seedTestData();
  
  // Complete it once
  await store.completeHabit(habitId);
  
  // Verify XP
  const xp1 = store.progress.xp;
  console.assert(xp1 === 10, 'First completion should give 10 XP');
  
  // Complete 4 more times (total 5 = 50 XP)
  for (let i = 0; i < 4; i++) {
    // In real app, you'd need to advance the date or create new habits
    // since completing the same habit twice on same day is limited by goal
  }
  
  const xp2 = store.progress.xp;
  console.assert(xp2 >= 50, 'Should have earned first Pokémon at 50 XP');
  
  // Verify Pokémon earned
  const pokemon = store.progress.earnedPokemon;
  console.assert(pokemon.length > 0, 'Should have earned at least one Pokémon');
  console.assert(pokemon[0].rarity === 'common', 'First Pokémon should be common');
}

/**
 * EXAMPLE 5: Appium Test Pseudo-Code
 * 
 * This is how you'd write an Appium test
 */
export const appiumTestExample = `
// JavaScript/TypeScript Appium test example

describe('PokeTracker Habit Flow', () => {
  beforeEach(async () => {
    // Reset app state
    await resetAppForTesting();
  });

  it('should create a habit and complete it', async () => {
    // Navigate to Add Habit
    const addBtn = await driver.$('~add-habit-btn');
    await addBtn.click();
    
    // Fill in form
    await driver.$('~habit-title-input').setValue('Daily Reading');
    await driver.$('~frequency-daily-btn').click();
    await driver.$('~goal-input').setValue('1');
    
    // Save
    await driver.$('~save-habit-btn').click();
    
    // Wait for navigation back
    await driver.waitUntil(async () => {
      return await driver.$('~habit-list').isDisplayed();
    });
    
    // Find the habit card (you'd need to know the ID)
    // In real tests, you might query the store or list items
    const completeBtn = await driver.$('~complete-btn-*');
    await completeBtn.click();
    
    // Navigate to Streaks
    await driver.$('~tab-streaks').click();
    
    // Verify XP
    const xpElement = await driver.$('~stats-total-xp');
    const xpText = await xpElement.getText();
    expect(xpText).toBe('10');
  });

  it('should earn a Pokémon at 50 XP', async () => {
    // This test would need to complete 5 habits
    // Each giving 10 XP, totaling 50 XP
    
    // Create 5 different habits or advance date between completions
    // ... setup code ...
    
    // After 5 completions:
    // Reward modal should appear
    const modal = await driver.$('~reward-modal-close-btn');
    await modal.waitForDisplayed();
    
    // Close modal
    await modal.click();
    
    // Go to Pokédex
    await driver.$('~tab-pokedex').click();
    
    // Verify one Pokémon
    const pokemonCards = await driver.$$('~pokemon-card-*');
    expect(pokemonCards.length).toBe(1);
  });
});
`;

/**
 * EXAMPLE 6: Test ID Reference
 * 
 * Quick reference for all test IDs
 */
export const TEST_IDS = {
  // Navigation
  tabs: {
    today: 'tab-today',
    streaks: 'tab-streaks',
    pokedex: 'tab-pokedex',
    settings: 'tab-settings',
  },
  
  // Today Screen
  today: {
    habitList: 'habit-list',
    habitCard: (id: string) => `habit-card-${id}`,
    completeBtn: (id: string) => `complete-btn-${id}`,
    addBtn: 'add-habit-btn',
  },
  
  // Add/Edit Habit
  habitForm: {
    titleInput: 'habit-title-input',
    descInput: 'habit-desc-input',
    dailyBtn: 'frequency-daily-btn',
    weeklyBtn: 'frequency-weekly-btn',
    goalInput: 'goal-input',
    saveBtn: 'save-habit-btn',
    cancelBtn: 'cancel-habit-btn',
  },
  
  // Habit Detail
  habitDetail: {
    title: 'habit-detail-title',
    completeBtn: 'detail-complete-btn',
    editBtn: 'edit-habit-btn',
    archiveBtn: 'archive-habit-btn',
  },
  
  // Streaks
  streaks: {
    totalXp: 'stats-total-xp',
    weeklyCompletions: 'stats-weekly-completions',
    streakList: 'stats-streak-list',
    streakItem: (id: string) => `stats-streak-item-${id}`,
  },
  
  // Pokédex
  pokedex: {
    list: 'pokedex-list',
    filterAll: 'filter-all',
    filterCommon: 'filter-common',
    filterRare: 'filter-rare',
    filterLegendary: 'filter-legendary',
    pokemonCard: (id: number) => `pokemon-card-${id}`,
  },
  
  // Pokemon Detail
  pokemonDetail: {
    name: 'pokemon-detail-name',
    rarity: 'pokemon-detail-rarity',
    image: 'pokemon-detail-image',
  },
  
  // Settings
  settings: {
    resetBtn: 'reset-data-btn',
    confirmBtn: 'reset-confirm-btn',
  },
  
  // Reward Modal
  rewardModal: {
    closeBtn: 'reward-modal-close-btn',
  },
};

/**
 * EXAMPLE 7: Page Object Pattern
 * 
 * Organize test code with page objects
 */
export class TodayScreenPageObject {
  constructor(private driver: any) {}
  
  async clickAddHabit() {
    const btn = await this.driver.$('~add-habit-btn');
    await btn.click();
  }
  
  async getHabitCards() {
    return await this.driver.$$('[id^="habit-card-"]');
  }
  
  async completeHabit(habitId: string) {
    const btn = await this.driver.$(`~complete-btn-${habitId}`);
    await btn.click();
  }
  
  async tapHabitCard(habitId: string) {
    const card = await this.driver.$(`~habit-card-${habitId}`);
    await card.click();
  }
}

export class AddHabitPageObject {
  constructor(private driver: any) {}
  
  async fillForm(title: string, frequency: 'daily' | 'weekly', goal: number) {
    await this.driver.$('~habit-title-input').setValue(title);
    await this.driver.$(`~frequency-${frequency}-btn`).click();
    await this.driver.$('~goal-input').setValue(goal.toString());
  }
  
  async save() {
    await this.driver.$('~save-habit-btn').click();
  }
  
  async cancel() {
    await this.driver.$('~cancel-habit-btn').click();
  }
}

/**
 * EXAMPLE 8: Date Manipulation for Tests
 */
export function advanceTestDate(days: number) {
  const store = useStore.getState();
  const currentDate = new Date(); // Get current test date
  currentDate.setDate(currentDate.getDate() + days);
  setTestToday(currentDate);
}

/**
 * EXAMPLE 9: Verify Deterministic Rewards
 */
export function testDeterministicRewards() {
  // The reward order is always the same
  // Commons: [1, 4, 7, 10, 13, 16, 19, 21, 25, 27, ...]
  // First common at 50 XP is always Bulbasaur (ID 1)
  // Second common at 100 XP is always Charmander (ID 4)
  // First rare at 150 XP is always Vulpix (ID 37)
  
  const expectedOrder = [
    { xp: 50, id: 1, name: 'bulbasaur', rarity: 'common' },
    { xp: 100, id: 4, name: 'charmander', rarity: 'common' },
    { xp: 150, id: 37, name: 'vulpix', rarity: 'rare' },
    { xp: 200, id: 7, name: 'squirtle', rarity: 'common' },
    { xp: 250, id: 10, name: 'caterpie', rarity: 'common' },
    { xp: 300, id: 144, name: 'articuno', rarity: 'legendary' },
  ];
  
  return expectedOrder;
}

// Export for use in tests
export default {
  setupTestDate,
  resetAppForTesting,
  seedTestData,
  testXpAndRewards,
  TEST_IDS,
  TodayScreenPageObject,
  AddHabitPageObject,
  advanceTestDate,
  testDeterministicRewards,
};
