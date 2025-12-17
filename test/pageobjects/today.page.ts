import { $ } from '@wdio/globals';
import BasePage from './base.page';
import { TodayLocators } from '../locators/today.locators';

/**
 * Page object for the Today/Home screen
 */
class TodayPage extends BasePage {
    /**
     * Define selectors - using testID from TodayScreen.tsx
     */
    get habitsList() {
        return $(TodayLocators.habitsList);
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
        return $(TodayLocators.addHabitButton);
    }

    /**
     * Get the today tab button
     */
    get todayTab() {
        return $(TodayLocators.todayTab);
    }

    /**
     * Get the complete habit button (Pokéball button) for a specific habit
     */
    getCompleteHabitButton(habitName: string) {
        return $(TodayLocators.completeHabitButton);
    }

    /**
     * Check if habit is visible
     */
    async isHabitVisible(habitName: string): Promise<boolean> {
        const habit = await this.getHabitCard(habitName);
        return await this.isDisplayed(habit);
    }

    /**
     * Complete a habit by name - clicks the Pokéball completion button
     */
    async completeHabit(habitName: string) {
        const button = await $(TodayLocators.completeHabitButtonXPath);
        await this.clickElement(button);
        // Wait for completion animation and UI update
        await this.pause(1500);
    }

    /**
     * Navigate to add habit screen
     */
    async goToAddHabit() {
        await this.clickElement(this.addHabitButton);
    }

    /**
     * Navigate to Today tab
     */
    async navigateToToday() {
        await this.clickElement(this.todayTab);
    }

    /**
     * Wait for today screen to load
     */
    async waitForLoad() {
        await this.waitForDisplayed(this.addHabitButton);
    }
}

export default new TodayPage();
