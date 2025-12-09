/**
 * Reusable component: PokemonCard for displaying earned Pokemon
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { EarnedPokemon, RarityType } from '../types';
import { fetchPokemonById, getPokemonImageUrl } from '../api/pokeapi';
import { Badge } from './StyledComponents';
import { colors, typography, spacing, radius, shadows } from '../theme';

interface PokemonCardProps {
  pokemon: EarnedPokemon;
  onPress: () => void;
}

const rarityColors: Record<RarityType, string> = {
  common: colors.textSecondary,
  rare: colors.secondary,
  legendary: colors.accent,
};

const rarityBgColors: Record<RarityType, string> = {
  common: colors.surfaceVariant,
  rare: '#E3F2FD',
  legendary: '#FFF9C4',
};

export function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonById(pokemon.id).then((data) => {
      if (data) {
        setImageUrl(getPokemonImageUrl(data));
      }
      setLoading(false);
    });
  }, [pokemon.id]);

  return (
    <TouchableOpacity
      testID={`pokemon-card-${pokemon.id}`}
      accessibilityLabel={`pokemon-card-${pokemon.id}`}
      accessibilityRole="button"
      style={[
        styles.card,
        { backgroundColor: rarityBgColors[pokemon.rarity] },
        shadows.base,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : imageUrl ? (
        <>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
          <Text style={styles.name} numberOfLines={1}>
            {pokemon.name}
          </Text>
          <Badge
            text={pokemon.rarity}
            color={rarityColors[pokemon.rarity]}
            textColor={colors.textInverse}
          />
        </>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>?</Text>
          <Text style={styles.name}>{pokemon.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.sm,
    borderRadius: radius.lg,
    padding: spacing.base,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
  },
  loadingContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: spacing.sm,
  },
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderRadius: radius.md,
  },
  placeholderText: {
    fontSize: 48,
    color: colors.textTertiary,
  },
  name: {
    ...typography.bodySmall,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.xs,
    textTransform: 'capitalize',
    color: colors.text,
  },
});
