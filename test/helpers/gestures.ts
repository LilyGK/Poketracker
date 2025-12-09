import { browser } from '@wdio/globals';

/**
 * Gesture helper functions for mobile testing
 */

/**
 * Perform a swipe gesture from coordinates to coordinates
 */
export async function swipe(from: { x: number; y: number }, to: { x: number; y: number }) {
    await (browser as any).performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 1000, x: to.x, y: to.y },
                { type: 'pointerUp', button: 0 }
            ]
        }
    ]);
    await (browser as any).releaseActions();
}

/**
 * Swipe down on an element
 */
export async function swipeDown(element: WebdriverIO.Element, percentage = 0.5) {
    const rect = await (element as any).getRect();
    const { x, y, width, height } = rect;
    const fromX = x + width / 2;
    const fromY = y + height * (1 - percentage);
    const toX = fromX;
    const toY = y + height * percentage;
    
    await swipe({ x: fromX, y: fromY }, { x: toX, y: toY });
}

/**
 * Swipe up on an element
 */
export async function swipeUp(element: WebdriverIO.Element, percentage = 0.5) {
    const rect = await (element as any).getRect();
    const { x, y, width, height } = rect;
    const fromX = x + width / 2;
    const fromY = y + height * percentage;
    const toX = fromX;
    const toY = y + height * (1 - percentage);
    
    await swipe({ x: fromX, y: fromY }, { x: toX, y: toY });
}

/**
 * Scroll to element using UiScrollable (Android)
 */
export async function scrollToElement(text: string, maxSwipes = 10) {
    const selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`;
    return await (browser as any).$(`android=${selector}`);
}
