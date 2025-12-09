/**
 * Screen: Pokémon Detail
 * Shows full Pokémon details with image and info
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../store';
import { fetchPokemonById, getPokemonImageUrl } from '../api/pokeapi';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PokedexStackParamList } from '../navigation/types';
import { PokeCard, Badge } from '../components/StyledComponents';
import { colors, typography, spacing, radius, shadows } from '../theme';
import { RarityType } from '../types';

type Props = NativeStackScreenProps<PokedexStackParamList, 'PokemonDetail'>;

const rarityColors: Record<RarityType, string> = {
  common: colors.textSecondary,
  rare: colors.secondary,
  legendary: colors.accent,
};

const rarityGradients: Record<RarityType, string[]> = {
  common: ['#E0E0E0', '#BDBDBD'],
  rare: ['#42A5F5', '#1E88E5'],
  legendary: ['#FFD54F', '#FFA000'],
};

export function PokemonDetailScreen({ route }: Props) {
  const { pokemonId } = route.params;

  const earnedPokemon = useStore((state) =>
    state.progress.earnedPokemon.find((p) => p.id === pokemonId)
  );

  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonById(pokemonId).then((data) => {
      if (data) {
        setImageUrl(getPokemonImageUrl(data));
      }
      setLoading(false);
    });
  }, [pokemonId]);

  if (!earnedPokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pokémon not found</Text>
      </View>
    );
  }

  const earnedDate = new Date(earnedPokemon.earnedAt).toLocaleDateString();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Area with Gradient */}
      <LinearGradient
        colors={rarityGradients[earnedPokemon.rarity]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        {loading ? (
          <ActivityIndicator size="large" color={colors.textInverse} />
        ) : imageUrl ? (
          <Image
            testID="pokemon-detail-image"
            accessibilityLabel="pokemon-detail-image"
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>?</Text>
          </View>
        )}
      </LinearGradient>

      {/* Info Card */}
      <View style={styles.content}>
        <PokeCard elevation="md" style={styles.infoCard}>
          <View style={styles.headerRow}>
            <View style={styles.nameContainer}>
              <Text
                testID="pokemon-detail-name"
                accessibilityLabel="pokemon-detail-name"
                style={styles.name}
              >
                {earnedPokemon.name}
              </Text>
              <Text style={styles.pokedexNumber}>#{earnedPokemon.id}</Text>
            </View>
            <Badge
              text={earnedPokemon.rarity}
              color={rarityColors[earnedPokemon.rarity]}
              textColor={colors.textInverse}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Earned On</Text>
            <Text style={styles.infoValue}>{earnedDate}</Text>
          </View>

          <View style={styles.caughtStamp}>
            <Text style={styles.caughtText}>★ CAUGHT ★</Text>
          </View>
        </PokeCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
    paddingHorizontal: spacing.lg,
  },
  image: {
    width: 260,
    height: 260,
  },
  placeholder: {
    width: 260,
    height: 260,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.xl,
  },
  placeholderText: {
    fontSize: 120,
    color: colors.textTertiary,
  },
  content: {
    padding: spacing.lg,
    marginTop: -spacing.lg, // overlap hero
  },
  infoCard: {
    paddingVertical: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    ...typography.title,
    color: colors.text,
    textTransform: 'capitalize',
    marginBottom: spacing.xs - 2,
  },
  pokedexNumber: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.base,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  infoLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  caughtStamp: {
    alignItems: 'center',
    paddingVertical: spacing.base,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.success,
    borderStyle: 'dashed',
  },
  caughtText: {
    ...typography.heading,
    color: colors.success,
    fontWeight: '700',
    letterSpacing: 2,
  },
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
