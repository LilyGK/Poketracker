/**
 * Navigation type definitions
 */

export type HomeStackParamList = {
  Today: undefined;
  HabitDetail: { habitId: string };
  AddEditHabit: { habitId?: string };
};

export type StreaksStackParamList = {
  Streaks: undefined;
};

export type PokedexStackParamList = {
  Pokedex: undefined;
  PokemonDetail: { pokemonId: number };
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  StreaksTab: undefined;
  PokedexTab: undefined;
  SettingsTab: undefined;
};
