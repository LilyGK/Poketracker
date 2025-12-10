/**
 * Locators for Today/Home screen
 */
export const TodayLocators = {
    habitsList: '~habit-list',
    addHabitButton: '~add-habit-btn',
    todayTab: '~tab-today',
    completeHabitButton: '~complete-habit-btn',
    // XPath for complete habit buttons that start with the testID
    completeHabitButtonXPath: '//android.view.ViewGroup[starts-with(@content-desc, "complete-habit-btn")]',
} as const;
