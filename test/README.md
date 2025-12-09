# Appium Testing Setup for PokeTracker

This directory contains Appium tests for the PokeTracker Android app using WebDriverIO.

## Prerequisites

1. **Java Development Kit (JDK 17)**
   - Already configured in your environment

2. **Android SDK & Emulator**
   - Already configured with ANDROID_HOME set

3. **Appium Server** (installed)
   - UiAutomator2 driver (installed)

4. **Node.js packages** (installed)
   - All testing dependencies are already installed

## Project Structure

```
test/
├── specs/              # Test specification files
│   ├── appLaunch.test.ts
│   ├── habits.test.ts
│   └── pokedex.test.ts
├── pageobjects/        # Page Object Model files
│   ├── base.page.ts
│   ├── today.page.ts
│   ├── addhabit.page.ts
│   └── pokedex.page.ts
├── helpers/            # Helper utilities
│   ├── gestures.ts
│   └── waiters.ts
└── tsconfig.json       # TypeScript configuration
```

## Running Tests

### Step 1: Build the APK
First, build the debug APK:
```bash
cd android
./gradlew assembleDebug
cd ..
```

### Step 2: Start Android Emulator
Start your Android emulator:
```bash
emulator -avd <your-emulator-name> &
```

Or use an existing running emulator.

### Step 3: Run All Tests
```bash
npm run wdio
```

### Run Specific Test File
```bash
npx wdio run ./wdio.conf.ts --spec ./test/specs/appLaunch.test.ts
```

### Run with Appium Server Manually (Optional)
If you want to start Appium server separately:
```bash
# Terminal 1: Start Appium
npx appium

# Terminal 2: Run tests
npm run wdio
```

## Configuration

The main configuration file is `wdio.conf.ts` in the root directory.

Key settings:
- **Platform**: Android
- **Automation**: UiAutomator2
- **App Path**: `./android/app/build/outputs/apk/debug/app-debug.apk`
- **Package**: `com.anonymous.poketracker`
- **Activity**: `.MainActivity`

## Writing Tests

### Page Object Pattern
Tests use the Page Object Model (POM) pattern for better maintainability:

```typescript
import TodayPage from '../pageobjects/today.page';
import AddHabitPage from '../pageobjects/addhabit.page';

describe('My Test Suite', () => {
    it('should perform an action', async () => {
        await TodayPage.waitForLoad();
        await TodayPage.goToAddHabit();
        await AddHabitPage.createHabit('Test Habit', 'Description');
    });
});
```

### Helper Functions
Use helper functions for common actions:

```typescript
import { waitForElement, waitForText } from '../helpers/waiters';
import { swipeUp, scrollToElement } from '../helpers/gestures';

// Wait for element
const element = await waitForElement('~myAccessibilityId');

// Scroll to element
await scrollToElement('My Text');
```

## Finding Elements

### Android Strategies:
1. **UiSelector** (recommended for complex queries)
   ```typescript
   $('android=new UiSelector().text("Button Text")')
   $('android=new UiSelector().className("android.widget.Button")')
   ```

2. **Accessibility ID**
   ```typescript
   $('~myAccessibilityId')
   ```

3. **XPath** (slower, use as last resort)
   ```typescript
   $('//android.widget.Button[@text="Click Me"]')
   ```

## Debugging Tests

### Enable Debug Logs
Set `logLevel: 'debug'` in `wdio.conf.ts`.

### Add Breakpoints
Add `await driver.pause(5000)` to pause execution.

### Inspect App Structure
Use Appium Inspector:
```bash
npx appium-inspector
```

### Take Screenshots
```typescript
await driver.saveScreenshot('./screenshot.png');
```

## Common Issues

### Issue: App doesn't install
- Ensure APK is built: `cd android && ./gradlew assembleDebug`
- Check APK path in `wdio.conf.ts`

### Issue: Element not found
- Add explicit waits
- Verify element selector using Appium Inspector
- Check if element is in view (may need to scroll)

### Issue: Tests timeout
- Increase timeout in `wdio.conf.ts` (`waitforTimeout`)
- Ensure emulator has enough resources
- Check app performance

### Issue: Connection errors
- Ensure emulator is running: `adb devices`
- Restart ADB: `adb kill-server && adb start-server`
- Check Appium logs for connection issues

## Best Practices

1. **Use Page Objects** - Keep test logic separate from element selectors
2. **Add Explicit Waits** - Always wait for elements to be visible/enabled
3. **Use Meaningful Names** - Make test descriptions clear
4. **Keep Tests Independent** - Each test should be able to run standalone
5. **Clean Up After Tests** - Reset app state or use `noReset: false`
6. **Use Accessibility IDs** - Add testID/accessibilityLabel to React Native components

## Adding Test IDs to Components

To make element location easier, add test IDs in your React Native code:

```typescript
<TouchableOpacity testID="add-habit-button">
  <Text>Add Habit</Text>
</TouchableOpacity>
```

Then in tests:
```typescript
const button = await $('~add-habit-button');
```

## CI/CD Integration

For CI/CD pipelines, you can run tests headlessly on cloud services:
- BrowserStack
- Sauce Labs
- AWS Device Farm

Example CI configuration would start emulator, build APK, and run tests.

## Resources

- [WebDriverIO Documentation](https://webdriver.io/docs/gettingstarted)
- [Appium Documentation](https://appium.io/docs/)
- [UiAutomator2 Selector Guide](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)
