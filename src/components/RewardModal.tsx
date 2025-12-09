/**
 * Reusable component: RewardModal for showing earned Pokemon
 */

import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { EarnedPokemon } from '../types';
import { fetchPokemonById, getPokemonImageUrl } from '../api/pokeapi';

interface RewardModalProps {
  visible: boolean;
  pokemon: EarnedPokemon | null;
  onClose: () => void;
}

export function RewardModal({ visible, pokemon, onClose }: RewardModalProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemon) {
      setLoading(true);
      fetchPokemonById(pokemon.id).then((data) => {
        if (data) {
          setImageUrl(getPokemonImageUrl(data));
        }
        setLoading(false);
      });
    }
  }, [pokemon]);

  if (!pokemon) return null;

  const rarityColor = {
    common: '#8BC34A',
    rare: '#2196F3',
    legendary: '#FF9800',
  }[pokemon.rarity];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { borderColor: rarityColor }]}>
          <Text style={styles.title}>🎉 New Pokémon!</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color={rarityColor} />
          ) : imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>?</Text>
            </View>
          )}

          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={[styles.rarity, { color: rarityColor }]}>
            {pokemon.rarity.toUpperCase()}
          </Text>

          <TouchableOpacity
            testID="reward-modal-close-btn"
            accessibilityLabel="reward-modal-close-btn"
            accessibilityRole="button"
            style={[styles.closeBtn, { backgroundColor: rarityColor }]}
            onPress={onClose}
          >
            <Text style={styles.closeBtnText}>Awesome!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    borderWidth: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
  },
  placeholderText: {
    fontSize: 80,
    color: '#999',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  rarity: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 24,
  },
  closeBtn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
