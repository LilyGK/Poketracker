import { expect, browser, $ } from '@wdio/globals';
import TodayPage from '../pageobjects/today.page';
import AddHabitPage from '../pageobjects/addhabit.page';
import { CommonLocators } from '../locators/common.locators';

describe('PokeTracker - Habit Management', () => {
    it('should load Today screen', async () => {
        const addHabitBtn = await TodayPage.addHabitButton;
        await addHabitBtn.waitForDisplayed({ timeout: 15000 });
        const isDisplayed = await addHabitBtn.isDisplayed();
        expect(isDisplayed).toBe(true);
    });

    it('should navigate to Add Habit screen', async () => {
        await TodayPage.waitForLoad();
        await TodayPage.goToAddHabit();
        await AddHabitPage.waitForLoad();
        const habitNameInput = await AddHabitPage.habitNameInput;
        const isDisplayed = await habitNameInput.isDisplayed();
        expect(isDisplayed).toBe(true);
        
        // Navigate back to Today screen for next test
        await (browser as any).back();
        await TodayPage.waitForLoad();
    });

    it('should earn Pokemon after completing 5 habits', async () => {
        const habitName = 'Daily Reading';
        const habitDescription = 'Read for 30 minutes';
        const goal = 5; // Need to complete 5 times to get 50 XP (first Pokemon)
        
        // Navigate to Add Habit screen
        await TodayPage.waitForLoad();
        await TodayPage.goToAddHabit();
        await AddHabitPage.waitForLoad();
        
        // Create habit with goal of 5
        await AddHabitPage.createHabit(habitName, habitDescription, goal);
        
        // Verify habit was created
        await TodayPage.waitForLoad();
        const isVisible = await TodayPage.isHabitVisible(habitName);
        expect(isVisible).toBe(true);
        
        // Complete the habit 5 times to earn 50 XP (10 XP per completion)
        for (let i = 0; i < 5; i++) {
            console.log(`Completing habit ${i + 1}/5...`);
            await TodayPage.completeHabit(habitName);
        }
        
        // Verify reward modal appears with Bulbasaur
        const rewardModalBtn = await $(CommonLocators.rewardModalCloseButton);
        await rewardModalBtn.waitForDisplayed({ timeout: 10000 });
        
        // Click the "Awesome!" button to close modal
        await rewardModalBtn.click();
    });
});
