import { expect, browser } from '@wdio/globals';
import TodayPage from '../pageobjects/today.page';
import AddHabitPage from '../pageobjects/addhabit.page';

describe('PokeTracker - Habit Management', () => {
    before(async () => {
        // Wait for app to load
        await (browser as any).pause(3000);
    });

    it('should load the Today screen', async () => {
        await TodayPage.waitForLoad();
        expect(await TodayPage.habitsList.isDisplayed()).toBe(true);
    });

    it('should navigate to Add Habit screen', async () => {
        await TodayPage.goToAddHabit();
        await AddHabitPage.waitForLoad();
        expect(await AddHabitPage.habitNameInput.isDisplayed()).toBe(true);
    });

    it('should create a new habit', async () => {
        const habitName = 'Morning Exercise';
        const habitDescription = 'Do 20 push-ups every morning';

        await AddHabitPage.createHabit(habitName, habitDescription);
        
        // Wait for return to Today screen
        await TodayPage.waitForLoad();
        
        // Verify habit was created
        const isVisible = await TodayPage.isHabitVisible(habitName);
        expect(isVisible).toBe(true);
    });

    it('should complete a habit', async () => {
        const habitName = 'Morning Exercise';
        
        // Complete the habit
        await TodayPage.completeHabit(habitName);
        
        // Wait a bit for animation
        await (browser as any).pause(1000);
        
        // Verify habit can still be found (marked as complete)
        const isVisible = await TodayPage.isHabitVisible(habitName);
        expect(isVisible).toBe(true);
    });
});
