import { $ } from '@wdio/globals';
import BasePage from './base.page';

/**
 * Page object for the Today/Home screen
 */
class TodayPage extends BasePage {
    /**
     * Define selectors - using testID from TodayScreen.tsx
     */
    get habitsList() {
        return $('~habit-list');  // testID="habit-list"
    }

    /**
     * Find habit card by name
     */
    async getHabitCard(habitName: string) {
        return await this.findByText(habitName);
    }

    /**
     * Get the add habit button
     */
    get addHabitButton() {
        return $('~add-habit-btn');  // testID="add-habit-btn"
    }

    /**
     * Check if habit is visible
     */
    async isHabitVisible(habitName: string): Promise<boolean> {
        const habit = await this.getHabitCard(habitName);
        return await this.isDisplayed(habit);
    }

    /**
     * Complete a habit by name
     */
    async completeHabit(habitName: string) {
        const habit = await this.getHabitCard(habitName);
        await this.clickElement(habit);
    }

    /**
     * Navigate to add habit screen
     */
    async goToAddHabit() {
        await this.clickElement(await this.addHabitButton);
    }

    /**
     * Wait for today screen to load
     */
    async waitForLoad() {
        await this.waitForDisplayed(await this.habitsList, 45000);
    }
}

export default new TodayPage();
