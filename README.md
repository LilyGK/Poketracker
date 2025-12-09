# PokeTracker

A React Native habit tracker app where completing habits earns you Pokémon! Built with Expo, TypeScript, and React Navigation.

## Features

- ✅ Create and track daily/weekly habits
- 🔥 Build streaks by completing habits consistently
- ⭐ Earn XP and unlock Pokémon rewards
- 📊 View stats and progress
- 🎮 Collect Pokémon in your Pokédex
- 💾 Local data persistence with AsyncStorage
- 🧪 Appium-friendly with stable test IDs

## Tech Stack

- **Framework**: Expo (SDK 51)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: Zustand
- **Data Persistence**: AsyncStorage
- **API**: PokeAPI (https://pokeapi.co/)

## Reward System (Deterministic)

The app uses a deterministic reward system perfect for automated testing:

- **10 XP** per habit completion
- **50 XP** → Common Pokémon (e.g., Bulbasaur, Charmander)
- **150 XP** → Rare Pokémon (e.g., Vulpix, Eevee)
- **300 XP** → Legendary Pokémon (e.g., Articuno, Zapdos)

Pokémon are awarded in a fixed order from predefined lists (see `src/data/pokemonIds.ts`), ensuring predictable behavior for tests.

## Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS: Xcode and iOS Simulator
- For Android: Android Studio and Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

## Running the App

### iOS

```bash
npm run ios
```

Or press `i` in the Expo terminal after running `npm start`.

### Android

```bash
npm run android
```

Or press `a` in the Expo terminal after running `npm start`.

### Web (Preview)

```bash
npm run web
```

## Project Structure

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
├── package.json
├── tsconfig.json
└── app.json
```

## Appium Test Support

All interactive elements have stable test identifiers:

- **testID**: Primary identifier for Appium
- **accessibilityLabel**: Matches testID for consistency
- **accessibilityRole**: Semantic role (button, tab, etc.)

### Key Test IDs

**Today Screen:**
- `habit-list` - Main habits list
- `habit-card-{habitId}` - Individual habit cards
- `complete-btn-{habitId}` - Completion buttons
- `add-habit-btn` - Add new habit button

**Add/Edit Habit:**
- `habit-title-input` - Title input field
- `habit-desc-input` - Description input
- `frequency-daily-btn` / `frequency-weekly-btn` - Frequency toggles
- `goal-input` - Goal number input
- `save-habit-btn` / `cancel-habit-btn` - Action buttons

**Habit Detail:**
- `habit-detail-title` - Habit name
- `detail-complete-btn` - Complete button
- `edit-habit-btn` - Edit button
- `archive-habit-btn` - Archive button

**Streaks:**
- `stats-total-xp` - Total XP display
- `stats-weekly-completions` - Weekly completion count
- `stats-streak-list` - Streaks list container
- `stats-streak-item-{habitId}` - Individual streak items

**Pokédex:**
- `pokedex-list` - Pokemon grid
- `filter-all` / `filter-common` / `filter-rare` / `filter-legendary` - Filter tabs
- `pokemon-card-{pokemonId}` - Pokemon cards

**Pokemon Detail:**
- `pokemon-detail-name` - Pokemon name
- `pokemon-detail-rarity` - Rarity label
- `pokemon-detail-image` - Pokemon image

**Settings:**
- `reset-data-btn` - Reset all data button
- `reset-confirm-btn` - Confirmation button in alert

**Bottom Tabs:**
- `tab-today` - Today tab
- `tab-streaks` - Streaks tab
- `tab-pokedex` - Pokédex tab
- `tab-settings` - Settings tab

### Test Determinism

For predictable tests:
- Use `setTestToday(date)` from `src/utils/date.ts` to freeze time
- Rewards are deterministic based on XP thresholds
- Pokemon unlock order is fixed
- No random UI changes or timers

## Data Persistence & Caching

### Local Storage (AsyncStorage)

- **App State**: Stored at key `poketracker:state`
  - Contains: habits, completions, progress
  - Auto-saved after each modification

### Pokemon Cache

- **Cache Key**: `pokemonCache:{id}`
- Stores full PokeAPI response for offline access
- Images are cached by React Native automatically
- Clear cache via Settings → Reset All Data

## API Usage

The app fetches Pokemon data from [PokeAPI](https://pokeapi.co/):

```
GET https://pokeapi.co/api/v2/pokemon/{id}
```

Key fields used:
- `name` - Pokemon name
- `sprites.other["official-artwork"].front_default` - High-quality image
- `sprites.front_default` - Fallback image

All responses are cached locally to enable offline functionality.

## Development Notes

- **No animations by default** - Keeps UI stable for testing
- **Minimal external dependencies** - Focus on stability
- **Type-safe** - Full TypeScript coverage
- **No backend required** - Everything runs locally

## Troubleshooting

### App won't start
```bash
# Clear cache and restart
rm -rf node_modules
npm install
expo start -c
```

### AsyncStorage errors
```bash
# Rebuild the app
expo start -c
# Then reload in simulator/emulator
```

### Pokemon images not loading
- Check internet connection
- API may be slow - images will load when available
- Cached images work offline after first load

## License

This project uses the PokeAPI for Pokemon data. All Pokemon names, images, and related content are property of Nintendo/Game Freak. This app is for educational purposes only.

---

Built with ❤️ and Pokémon
