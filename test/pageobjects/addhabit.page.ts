import { $ } from '@wdio/globals';
import BasePage from './base.page';
import { AddHabitLocators } from '../locators/addhabit.locators';

/**
 * Page object for the Add/Edit Habit screen
 */
class AddHabitPage extends BasePage {
    /**
     * Define selectors
     */
    get habitNameInput() {
        return $(AddHabitLocators.habitNameInput);
    }

    get habitDescriptionInput() {
        return $(AddHabitLocators.habitDescriptionInput);
    }

    get saveButton() {
        return $(AddHabitLocators.saveButton);
    }

    get cancelButton() {
        return $(AddHabitLocators.cancelButton);
    }

    get goalInput() {
        return $(AddHabitLocators.goalInput);
    }

    /**
     * Create a new habit
     */
    async createHabit(name: string, description?: string, goal?: number) {
        await this.setValue(this.habitNameInput, name);
        
        if (description) {
            await this.setValue(this.habitDescriptionInput, description);
        }
        
        if (goal !== undefined) {
            await this.setValue(this.goalInput, goal.toString());
        }
        
        await this.clickElement(this.saveButton);
    }

    /**
     * Cancel habit creation
     */
    async cancel() {
        await this.clickElement(this.cancelButton);
    }

    /**
     * Wait for add habit screen to load
     */
    async waitForLoad() {
        await this.waitForDisplayed(this.habitNameInput);
    }
}

export default new AddHabitPage();
