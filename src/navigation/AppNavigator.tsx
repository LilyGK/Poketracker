/**
 * Main navigation configuration
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type {
  HomeStackParamList,
  StreaksStackParamList,
  PokedexStackParamList,
  SettingsStackParamList,
  BottomTabParamList,
} from './types';

// Screens
import { TodayScreen } from '../screens/TodayScreen';
import { HabitDetailScreen } from '../screens/HabitDetailScreen';
import { AddEditHabitScreen } from '../screens/AddEditHabitScreen';
import { StreaksScreen } from '../screens/StreaksScreen';
import { PokedexScreen } from '../screens/PokedexScreen';
import { PokemonDetailScreen } from '../screens/PokemonDetailScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { CustomTabBar } from '../components/CustomTabBar';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const StreaksStack = createNativeStackNavigator<StreaksStackParamList>();
const PokedexStack = createNativeStackNavigator<PokedexStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Today"
        component={TodayScreen}
        options={{ title: 'Today' }}
      />
      <HomeStack.Screen
        name="HabitDetail"
        component={HabitDetailScreen}
        options={{ title: 'Habit Details' }}
      />
      <HomeStack.Screen
        name="AddEditHabit"
        component={AddEditHabitScreen}
        options={({ route }) => ({
          title: route.params.habitId ? 'Edit Habit' : 'Add Habit',
        })}
      />
    </HomeStack.Navigator>
  );
}

function StreaksNavigator() {
  return (
    <StreaksStack.Navigator screenOptions={{ headerShown: false }}>
      <StreaksStack.Screen
        name="Streaks"
        component={StreaksScreen}
        options={{ title: 'Streaks' }}
      />
    </StreaksStack.Navigator>
  );
}

function PokedexNavigator() {
  return (
    <PokedexStack.Navigator screenOptions={{ headerShown: false }}>
      <PokedexStack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{ title: 'Pokédex' }}
      />
      <PokedexStack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{ title: 'Pokémon' }}
      />
    </PokedexStack.Navigator>
  );
}

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </SettingsStack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <BottomTab.Screen
          name="HomeTab"
          component={HomeNavigator}
          options={{
            title: 'Today',
            tabBarTestID: 'tab-today',
            tabBarAccessibilityLabel: 'tab-today',
          }}
        />
        <BottomTab.Screen
          name="StreaksTab"
          component={StreaksNavigator}
          options={{
            title: 'Streaks',
            tabBarTestID: 'tab-streaks',
            tabBarAccessibilityLabel: 'tab-streaks',
          }}
        />
        <BottomTab.Screen
          name="PokedexTab"
          component={PokedexNavigator}
          options={{
            title: 'Pokédex',
            tabBarTestID: 'tab-pokedex',
            tabBarAccessibilityLabel: 'tab-pokedex',
          }}
        />
        <BottomTab.Screen
          name="SettingsTab"
          component={SettingsNavigator}
          options={{
            title: 'Settings',
            tabBarTestID: 'tab-settings',
            tabBarAccessibilityLabel: 'tab-settings',
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
