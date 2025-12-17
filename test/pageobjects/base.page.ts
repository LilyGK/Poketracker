import { $, browser } from '@wdio/globals';

/**
 * Base page class that all page objects inherit from
 */
export default class BasePage {
    /**
     * Wait for element to be displayed
     */
    async waitForDisplayed(element: ReturnType<typeof $>, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for element and click
     */
    async clickElement(element: ReturnType<typeof $>) {
        await this.waitForDisplayed(element);
        await element.click();
    }

    /**
     * Wait for element and set value
     */
    async setValue(element: ReturnType<typeof $>, value: string) {
        await this.waitForDisplayed(element);
        await element.setValue(value);
    }

    /**
     * Get text from element
     */
    async getText(element: ReturnType<typeof $>): Promise<string> {
        await this.waitForDisplayed(element);
        return await element.getText();
    }

    /**
     * Check if element is displayed
     */
    async isDisplayed(element: ReturnType<typeof $>): Promise<boolean> {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Find element by text
     */
    async findByText(text: string): Promise<ReturnType<typeof $>> {
        return $(`android=new UiSelector().textContains("${text}")`);
    }

    /**
     * Find element by content description
     */
    async findByContentDesc(desc: string): Promise<ReturnType<typeof $>> {
        return $(`~${desc}`);
    }

    /**
     * Scroll to text (Android)
     */
    async scrollToText(text: string): Promise<ReturnType<typeof $>> {
        const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`;
        return $(selector);
    }

    /**
     * Pause execution for a specified time
     */
    async pause(ms: number) {
        await (browser as any).pause(ms);
    }
}
