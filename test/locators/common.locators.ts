/**
 * Common locators used across multiple screens
 */
export const CommonLocators = {
    rewardModalCloseButton: '~reward-modal-close-btn',
} as const;

/**
 * Helper function to create text locator for Android
 */
export const textLocator = (text: string) => `android=new UiSelector().textContains("${text}")`;

/**
 * Helper function to create content description locator
 */
export const contentDescLocator = (desc: string) => `~${desc}`;

/**
 * Helper function to create scrollable text locator for Android
 */
export const scrollableTextLocator = (text: string) => 
    `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`;
