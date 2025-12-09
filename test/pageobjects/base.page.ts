import { $ } from '@wdio/globals';

/**
 * Base page class that all page objects inherit from
 */
export default class BasePage {
    /**
     * Wait for element to be displayed
     */
    async waitForDisplayed(element: WebdriverIO.Element, timeout = 600000) { // 10 minutes to rule out timing
        await (element as any).waitForDisplayed({ timeout });
    }

    /**
     * Wait for element and click
     */
    async clickElement(element: WebdriverIO.Element) {
        await this.waitForDisplayed(element);
        await (element as any).click();
    }

    /**
     * Wait for element and set value
     */
    async setValue(element: WebdriverIO.Element, value: string) {
        await this.waitForDisplayed(element);
        await (element as any).setValue(value);
    }

    /**
     * Get text from element
     */
    async getText(element: WebdriverIO.Element): Promise<string> {
        await this.waitForDisplayed(element);
        return await (element as any).getText();
    }

    /**
     * Check if element is displayed
     */
    async isDisplayed(element: WebdriverIO.Element): Promise<boolean> {
        try {
            return await (element as any).isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Find element by text
     */
    async findByText(text: string): Promise<WebdriverIO.Element> {
        return await $(`android=new UiSelector().textContains("${text}")`);
    }

    /**
     * Find element by content description
     */
    async findByContentDesc(desc: string): Promise<WebdriverIO.Element> {
        return await $(`~${desc}`);
    }

    /**
     * Scroll to text (Android)
     */
    async scrollToText(text: string): Promise<WebdriverIO.Element> {
        const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`;
        return await $(selector);
    }
}
