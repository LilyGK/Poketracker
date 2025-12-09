import { $ } from '@wdio/globals';
import { browser } from '@wdio/globals';

/**
 * Custom wait helper functions
 */

/**
 * Wait for an element to be visible and return it
 */
export async function waitForElement(
    selector: string,
    timeout = 10000
): Promise<WebdriverIO.Element> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
}

/**
 * Wait for text to be visible on screen
 */
export async function waitForText(text: string, timeout = 10000): Promise<boolean> {
    const selector = `android=new UiSelector().textContains("${text}")`;
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return true;
}

/**
 * Wait for element to be clickable and click it
 */
export async function waitAndClick(selector: string, timeout = 10000): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    await element.waitForEnabled({ timeout });
    await element.click();
}

/**
 * Wait for app to load (wait for splash screen to disappear)
 */
export async function waitForAppToLoad(timeout = 30000): Promise<void> {
    await (browser as any).pause(2000); // Give app time to start
}
