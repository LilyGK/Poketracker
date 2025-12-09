/**
 * Date utilities with test override support
 * Set TEST_TODAY_OVERRIDE env var to freeze date for testing
 */

// For test determinism, allow overriding today's date
let testTodayOverride: Date | null = null;

export function setTestToday(date: Date | null) {
  testTodayOverride = date;
}

export function getToday(): Date {
  if (testTodayOverride) {
    return new Date(testTodayOverride);
  }
  return new Date();
}

/**
 * Format date as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayString(): string {
  return formatDate(getToday());
}

/**
 * Parse YYYY-MM-DD string to Date
 */
export function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return formatDate(date1) === formatDate(date2);
}

/**
 * Get date N days ago from today
 */
export function getDaysAgo(days: number): Date {
  const date = new Date(getToday());
  date.setDate(date.getDate() - days);
  return date;
}

/**
 * Check if date1 is the day before date2
 */
export function isYesterday(date1Str: string, date2Str: string): boolean {
  const date1 = parseDate(date1Str);
  const date2 = parseDate(date2Str);
  const diff = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
  return diff === 1;
}

/**
 * Get last N days as YYYY-MM-DD strings (including today)
 */
export function getLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    days.push(formatDate(getDaysAgo(i)));
  }
  return days;
}
