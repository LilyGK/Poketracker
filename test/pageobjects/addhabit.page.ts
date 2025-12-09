import { $ } from '@wdio/globals';
import BasePage from './base.page';

/**
 * Page object for the Add/Edit Habit screen
 */
class AddHabitPage extends BasePage {
    /**
     * Define selectors
     */
    get habitNameInput() {
        return $('~habit-title-input');
    }

    get habitDescriptionInput() {
        return $('~habit-desc-input');
    }

    get saveButton() {
        return $('~save-habit-btn');
    }

    get cancelButton() {
        return $('~cancel-habit-btn');
    }

    /**
     * Create a new habit
     */
    async createHabit(name: string, description?: string) {
        await this.setValue(await this.habitNameInput, name);
        
        if (description) {
            await this.setValue(await this.habitDescriptionInput, description);
        }
        
        await this.clickElement(await this.saveButton);
    }

    /**
     * Cancel habit creation
     */
    async cancel() {
        await this.clickElement(await this.cancelButton);
    }

    /**
     * Wait for add habit screen to load
     */
    async waitForLoad() {
        await this.waitForDisplayed(await this.habitNameInput, 10000);
    }
}

export default new AddHabitPage();
