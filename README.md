# Technical Assessment Feeld - PokeTracker Automation Testing

A React Native habit tracker app where completing habits earns you Pokémon! Built with Expo, TypeScript, and React Navigation.

## React Native Project

### Project description

**PokeTracker** is a habit-tracking application built with React Native that gamifies personal development by rewarding users with Pokémon for completing daily habits. The app combines productivity tracking with the engaging mechanics of Pokémon collection.


## Features

-  Create and track daily/weekly habits
-  Build streaks by completing habits consistently
-  Earn XP and unlock Pokémon rewards
-  View stats and progress
-  Collect Pokémon in your Pokédex
-  Local data persistence with AsyncStorage
-  Appium-friendly with stable test IDs


## Reward system


- **10 XP** per habit completion
- **50 XP** → Common Pokémon 
- **150 XP** → Rare Pokémon 
- **300 XP** → Legendary Pokémon 

Pokémon are awarded in a fixed order from predefined lists (see `src/data/pokemonIds.ts`), ensuring predictable behavior for tests.

## How to setup and run the React Native project

### Prerequisites

- Node.js 18+ 
- Java 17 (configured as default)
- Android Studio with Android SDK
- Expo CLI (`npm install -g expo-cli`)
- Git
- For iOS: Xcode and iOS Simulator (not yet tested)
- For testing: Appium 3.1.2+

### Setup steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/LilyGK/Poketracker.git
   cd Poketracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Java environment**
   ```bash
   # Add to ~/.zshrc
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
   source ~/.zshrc
   ```

4. **Run the application**
   
   For development:
   ```bash
   npm start
   # Then press 'a' for Android or 'i' for iOS
   ```
   
   For Android directly:
   ```bash
   npm run android
   ```
   
   *Note: For speed purposes, it only was opened and tested on Android*

5. **Build release APK (for testing)**
   ```bash
   npx expo run:android --variant release
   ```


#### Areas chosen for automation testing

**1. Core user flows**
- App launch and initial screen load
- Habit creation workflow
- Habit completion interaction
- Navigation between screens

**2. Pokédex functionality**
- Navigation to Pokédex screen
- Empty state display
- Pokémon display after rewards

**Rationale for test coverage:**
- Focused on critical user journeys that represent core value proposition
- Selected screens with frequent user interaction
- Prioritized features that could cause significant UX issues if broken
- Tested navigation flows to ensure smooth user experience

## Running the app

### Development mode

```bash
npm start
```

### Android 

```bash
npm run android
```

*Note: For speed purposes, this app was primarily developed and tested on Android*

### iOS

```bash
npm run ios
```

*Note: iOS testing not yet validated*

## Project structure

```
poketracker/
├── App.tsx                 # Main app entry point
├── src/
│   ├── api/
│   │   └── pokeapi.ts     # PokeAPI integration with caching
│   ├── components/
│   │   ├── HabitCard.tsx  # Habit list item component
│   │   ├── PokemonCard.tsx # Pokemon grid item component
│   │   └── RewardModal.tsx # Pokemon earned modal
│   ├── data/
│   │   └── pokemonIds.ts  # Predefined Pokemon ID lists
│   ├── navigation/
│   │   ├── AppNavigator.tsx # Navigation setup
│   │   └── types.ts       # Navigation type definitions
│   ├── screens/
│   │   ├── TodayScreen.tsx        # Home/Today's habits
│   │   ├── AddEditHabitScreen.tsx # Habit form
│   │   ├── HabitDetailScreen.tsx  # Habit details
│   │   ├── StreaksScreen.tsx      # Stats and streaks
│   │   ├── PokedexScreen.tsx      # Pokemon collection
│   │   ├── PokemonDetailScreen.tsx # Pokemon details
│   │   └── SettingsScreen.tsx     # App settings
│   ├── store/
│   │   └── index.ts       # Zustand store with persistence
│   ├── types/
│   │   └── index.ts       # TypeScript type definitions
│   └── utils/
│       ├── date.ts        # Date utilities with test support
│       └── rewards.ts     # Reward calculation logic
├── test/
│   ├── locators/          # Centralized element locators
│   │   ├── today.locators.ts      # Today screen selectors
│   │   ├── addhabit.locators.ts   # Add habit form selectors
│   │   ├── pokedex.locators.ts    # Pokédex selectors
│   │   └── common.locators.ts     # Shared selectors & helpers
│   ├── pageobjects/       # Page Object Model pattern
│   │   ├── base.page.ts           # Base page with common methods
│   │   ├── today.page.ts          # Today screen interactions
│   │   ├── addhabit.page.ts       # Add habit interactions
│   │   └── pokedex.page.ts        # Pokédex interactions
│   └── specs/             # E2E test suites
│       ├── appLaunch.test.ts      # App launch tests
│       ├── habits.test.ts         # Habit management tests
│       └── browserstack-e2e-tests.yml  # BrowserStack CI/CD
        ├── wdio.conf.ts           # Local Appium config
        ├── wdio.browserstack.conf.ts  # BrowserStack config
├── package.json
├── tsconfig.json
└── app.json
```

## Automation Tests

### Frameworks considered

#### 1. **Detox**
**Pros:**
- Built specifically for React Native
- Gray box testing with access to React Native internals
- Fast execution with synchronization
- Good community support
- Excellent documentation

**Cons:**
- Don't cover E2E testing, but totally recommended for component testing 
- Can have issues with complex native modules
- Requires recompilation for some test scenarios

#### 2. **Appium + WebDriverIO**
**Pros:**
- Cross-platform (Android, iOS, Web)
- Industry standard with extensive community
- Black box testing - tests like a real user
- Works with any mobile app (React Native, native, hybrid)
- Mature ecosystem with many integrations
- Powerful reporting tools available (Allure)
- Easy integration with device farms (LambdaTest, BrowserStack) to avoid using emulators
- CI/CD friendly

**Cons:**
- Slower than Detox due to client-server architecture
- Requires native element selectors (testID)
- More setup complexity initially

### Selected framework: **Appium + WebDriverIO**

#### Rationale

**Primary reasons:**
1. **Industry standard**: Appium is widely used in professional environments, making the tests maintainable by any automation engineer
2. **Cross-Platform**: Future-proofs the test suite for iOS testing without framework changes
3. **Real user simulation**: Black box testing approach validates actual user experience
4. **Enterprise tooling**: Integration with Allure Reports, CI/CD systems, and monitoring tools

**Trade-offs accepted:**
- Slightly slower execution compared to Detox (acceptable for CI/CD runs)
- More initial setup complexity (one-time cost)
- Need to add testID props to components (improves component quality)

**Technical stack:**
- **Appium 3.1.2**: Mobile automation server
- **WebDriverIO 9.21.0**: Test runner and framework
- **Mocha**: Test framework for BDD-style tests
- **UiAutomator2**: Android driver for native app interaction
- **BrowserStack**: Cloud devices farm for remotely execution with real devices 
- **Allure Reporter**: Test reporting with history tracking - prepared, but needs to be hosted for CI/CD runs

### Test architecture

#### Page Object Model (POM)
Implemented a scalable Page Object Model pattern:

```
test/
├── locators/
│   ├── today.locators.ts      # Today screen selectors
│   ├── addhabit.locators.ts   # Add habit form selectors
│   ├── pokedex.locators.ts    # Pokédex selectors
│   └── common.locators.ts     # Shared selectors & helpers
├── pageobjects/
│   ├── base.page.ts           # Base class with common methods
│   ├── today.page.ts          # Today screen page object
│   ├── addhabit.page.ts       # Add/Edit habit screen
│   └── pokedex.page.ts        # Pokedex screen
├── specs/
│   ├── appLaunch.test.ts      # App initialization tests
│   ├── habits.test.ts         # Habit CRUD operations
│   └── pokedex.test.ts        # Pokedex functionality
└── tsconfig.json              # TypeScript configuration
```

#### Test coverage

**App Launch Tests (2 tests)**
- ✅ App launches successfully
- ✅ Correct package name verification

**Habit Management Tests (3 tests)**
- ✅ Today screen loads with habit list
- ✅ Navigate to Add Habit screen
- ✅ Complete habit and earn Pokémon reward

**Pokedex Tests (2 tests)**
- ✅ Navigate to Pokedex tab
- ✅ Display Pokémon in Pokédex

**Total: 7 tests with 100% pass rate**

### How to run automation tests

#### Prerequisites Setup

1. **Start Android Emulator**
   ```bash
   # List available emulators
   emulator -list-avds
   
   # Start emulator
   emulator -avd <emulator_name> &
   ```

2. **Build release APK** (Required for testing)
   ```bash
   npx expo run:android --variant release
   ```
   
   *Note: Debug builds contain Expo DevLauncher which blocks test automation*

#### Running tests

**Run all E2E tests:**
```bash
npm run test:e2e
```

**Run all E2E tests using BrowserStack:**
```bash
npm run test:browserstack
```
*Important: User keys needed*

**Run specific test file:**
```bash
npm run test:e2e:spec -- test/specs/habits.test.ts
```

**Generate and view Allure report:**
```bash
# Generate static report
npm run allure:generate

# Open report in browser
npm run allure:open

# Generate and serve report
npm run allure:serve
```

#### Test execution details

- **Execution Mode**: Sequential (maxInstances: 1)
- **Timeout**: 120 seconds per test 
- **Wait Timeout**: 10 seconds for element visibility
- **Retry Count**: 3 connection retries
- **APK Location**: `android/app/build/outputs/apk/release/app-release.apk`


### Improvements and next steps

1. **Expand test coverage**
   - Add tests for Streaks screen
   - Add tests for Settings functionality
   - Test habit editing and deletion flows
   - Add tests for Pokémon reward mechanics

2. **Visual testing**
   - Integrate screenshot comparison
   - Add visual regression tests for UI changes
   - Test responsive layouts

3. **Data-driven testing**
   - Parameterize tests with different habit data
   - Test edge cases (long titles, special characters)
   - Boundary value testing for streaks
   
4. **Cloud device testing**
   - Setup test execution against LambdaTest/BrowserStack for faster and more consistent experience with real devices
   - Traceability
   - Test on multiple device configurations
   - Test different Android/iOS versions 

5. **iOS testing**
   - Add iOS capabilities to wdio.conf.ts
   - Create iOS-specific page objects where needed
   - Run parallel tests on both platforms

6. **API mocking**
   - Mock PokéAPI responses for consistent tests
   - Test offline functionality
   - Test error handling scenarios

7. **Test data management**
   - Implement test database seeding
   - Add data cleanup between test runs
   - Create reusable test fixtures
   
8. **Advanced test patterns**
   - Implement component testing with Detox
   - Add integration tests for store logic
   - Create smoke test suite for quick validation

9. **Accessibility testing**
   - Validate screen reader compatibility
   - Test keyboard navigation
   - Verify color contrast ratios

## AI usage and judgement

### How AI was used

AI (GitHub Copilot) was used throughout this project for rapid development and problem-solving. The approach was iterative: provide context, receive solution, review and refine.

### AI prompts and review process

#### Initial setup
**Prompt:** "We are going to add Android e2e test with Appium for this project, install everything we need to start writing tests"

**AI Provided:** Complete Appium + WebDriverIO installation commands
- Installed 623 packages
- Set up TypeScript configuration
- Created basic project structure

**Review process:**
- Verified all packages installed correctly
- Checked package.json for correct versions
- Tested basic Appium connectivity

#### Configuration and architecture
**Prompt:** "Create Page Object Model structure with base class and page objects"

**AI generated:** 
- Base page class with waitForDisplayed, clickElement, setValue
- Three page object files with proper inheritance
- TypeScript interfaces for type safety

**Review process:**
- Validated page object methods work with actual app elements
- Ensured async/await patterns are correct
- Added missing methods discovered during testing

#### Critical problem solving

**Prompt:** "can we update the java version, so we don't need to use export Java every time"

**AI Solution:** Add Java 17 export to ~/.zshrc

**Review:** 
- Initially suggested Java 24 (latest)
- Tested and found Gradle incompatibility
- Rolled back to Java 17 (correct version for Gradle 8.8)

#### Allure reporting integration
**Prompt:** "lets add allure report to the project"

**AI provided:**
- Allure reporter installation
- Configuration in wdio.conf.ts
- NPM scripts for report generation
- .gitignore updates

**Review process:**
- Tested report generation locally
- Verified report displays all test data

### Where AI was most helpful

1. **Boilerplate reduction** 
   - Generated repetitive code structures (Page Objects, test specs)
   - Created configuration files (wdio.conf.ts, tsconfig.json)
   - Saved hours of initial setup time

2. **Troubleshooting**
   - Quickly identified Java version compatibility issues
   - Suggested APK build approach for DevLauncher problem
   - Provided Node.js ESM solutions

3. **Documentation**
   - Created detailed setup instructions
   - Wrote clear error messages and comments

### Where AI was least helpful

1. **Environment-specific issues**
   - Couldn't predict Gradle 8.8 + Java 24 incompatibility
   - Needed iteration to find correct Node.js version for CI

2. **App-specific logic**
   - Didn't know testID values without being told
   - Couldn't understand app navigation flow initially
   - Required manual verification of element selectors

### Code review process

**For Every AI-Generated Code:**
1. Read through line by line
2. Run TypeScript compiler to catch type errors
3. Execute tests to verify functionality
4. Check async/await patterns
5. Validate against app behavior
6. Test edge cases manually
7. Refactor if needed for clarity

**Key Principle:** AI is a powerful assistant but requires expert oversight. Never blindly accept generated code without testing and understanding.

## Additional/Bonus work

### CI/CD integration with GitHub Actions

#### Implementation details

**Workflow File:** `.github/workflows/browserstack-e2e-tests.yml`

**Trigger:** Manual workflow dispatch (Actions tab → Run workflow button)

**Workflow Steps:**
1. Environment setup (Java 17, Node.js 20, Android SDK)
2. Release APK build
3. APK upload to BrowserStack
4. E2E test execution on BrowserStack real devices
5. Allure report generation
6. Artifact upload (reports, screenshots)

**Optimizations:**
- Dependency caching (Gradle, npm)
- Real device testing (Google Pixel 7, Android 13)
- Video recording and network logs
- Parallel-ready architecture (currently sequential for stability)

#### CI execution results

**GitHub Actions Link:** 
[View Workflow Runs](https://github.com/LilyGK/Poketracker/actions/workflows/browserstack-e2e-tests.yml)

**Typical Execution Time:** ~5-8 minutes
- Setup & APK build: ~3-4 minutes
- Test execution: ~2-3 minutes
- Report generation: ~1 minute

**Artifacts Generated:**
1. **Allure Report** - Interactive HTML test report (30-day retention)
2. **Allure Results** - Raw test data for history tracking (30-day retention)
3. **Screenshots** - Test failure screenshots (7-day retention)

#### How to access CI results

1. Go to repository: https://github.com/LilyGK/Poketracker
2. Click "Actions" tab
3. Select "BrowserStack E2E Tests" workflow
4. Click on any run to see details
5. Download artifacts from "Artifacts" section at bottom of run page
6. Extract and open `allure-report/index.html` in browser

#### Why no emulator CI/CD?

GitHub Actions for android emulators was creating frecuent timeouts in some tests, due to emulators being slow, for this reason Browserstack was choosen, and also because it offers read devices, which make test results more realstic and closer to a real  required for Android emulators, causing extremely slow performance and frequent timeouts. BrowserStack provides real device testing in the cloud as the CI/CD solution.

#### Future CI enhancements

- Add test status badge to README
- Integrate with Slack notifications
- Add scheduled nightly runs
- Add triggers for PRs, merge
- Implement test result trending
- Create separate smoke test job (faster feedback)

---

## Conclusion

This project successfully demonstrates a production-ready E2E testing framework for React Native applications using industry-standard tools. The combination of Appium, WebDriverIO, BrowserStack, and Allure provides a scalable, maintainable. testing solution that can grow with the application.


---



