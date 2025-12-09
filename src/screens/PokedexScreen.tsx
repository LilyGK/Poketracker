/**
 * Screen: Pokédex
 * Grid of earned Pokémon with rarity filters
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../store';
import { PokemonCard } from '../components/PokemonCard';
import type { RarityType } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PokedexStackParamList } from '../navigation/types';
import { colors, typography, spacing, radius, shadows } from '../theme';

type Props = NativeStackScreenProps<PokedexStackParamList, 'Pokedex'>;

type FilterType = 'all' | RarityType;

export function PokedexScreen({ navigation }: Props) {
  const earnedPokemon = useStore((state) => state.progress.earnedPokemon);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredPokemon =
    filter === 'all'
      ? earnedPokemon
      : earnedPokemon.filter((p) => p.rarity === filter);

  const filters: { key: FilterType; label: string; testID: string }[] = [
    { key: 'all', label: 'All', testID: 'filter-all' },
    { key: 'common', label: 'Common', testID: 'filter-common' },
    { key: 'rare', label: 'Rare', testID: 'filter-rare' },
    { key: 'legendary', label: 'Legendary', testID: 'filter-legendary' },
  ];

  return (
    <LinearGradient
      colors={colors.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.screenTitle}>Pokédex</Text>
      {/* Filter Pills */}
      <View style={styles.filters}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            testID={f.testID}
            accessibilityLabel={f.testID}
            accessibilityRole="tab"
            style={[
              styles.filterPill,
              filter === f.key && styles.filterPillActive,
            ]}
            onPress={() => setFilter(f.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                filter === f.key && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredPokemon.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>⚪</Text>
          <Text style={styles.emptyTitle}>No Pokémon yet!</Text>
          <Text style={styles.emptySubtitle}>
            Complete habits to earn Pokémon
          </Text>
        </View>
      ) : (
        <FlatList
          testID="pokedex-list"
          accessibilityLabel="pokedex-list"
          data={filteredPokemon}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={() =>
                navigation.navigate('PokemonDetail', { pokemonId: item.id })
              }
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    ...typography.title,
    color: colors.text,
    marginTop: 60,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  filterPill: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
  },
  filterPillActive: {
    backgroundColor: colors.secondary,
  },
  filterText: {
    ...typography.captionSmall,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.textInverse,
  },
  list: {
    padding: spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.huge,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
