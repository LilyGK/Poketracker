/**
 * PokeAPI integration with AsyncStorage caching
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PokemonApiResponse } from '../types';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const CACHE_PREFIX = 'pokemonCache:';

/**
 * Fetch Pokemon details from PokeAPI with caching
 */
export async function fetchPokemonById(id: number): Promise<PokemonApiResponse | null> {
  const cacheKey = `${CACHE_PREFIX}${id}`;
  
  try {
    // Check cache first
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      console.log(`Using cached data for pokemon ${id}`);
      return JSON.parse(cached);
    }

    // Fetch from API with timeout
    const url = `${POKEAPI_BASE}/pokemon/${id}`;
    console.log(`Fetching pokemon ${id} from ${url}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn(`Failed to fetch pokemon ${id}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: PokemonApiResponse = await response.json();
    console.log(`Successfully fetched pokemon ${id}: ${data.name}`);

    // Cache the response
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching pokemon ${id}:`, error.message, error.name);
      if (error.name === 'AbortError') {
        console.error('Request timed out');
      }
    } else {
      console.error(`Error fetching pokemon ${id}:`, error);
    }
    return null;
  }
}

/**
 * Batch fetch multiple Pokemon (with caching)
 */
export async function fetchMultiplePokemon(ids: number[]): Promise<Map<number, PokemonApiResponse>> {
  const results = new Map<number, PokemonApiResponse>();
  
  // Fetch in parallel but limit concurrency to avoid rate limits
  const promises = ids.map(id => fetchPokemonById(id));
  const responses = await Promise.all(promises);
  
  responses.forEach((data, index) => {
    if (data) {
      results.set(ids[index], data);
    }
  });
  
  return results;
}

/**
 * Get the best image URL for a Pokemon
 */
export function getPokemonImageUrl(pokemon: PokemonApiResponse): string {
  // Prefer official artwork, fallback to front_default
  return (
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    ''
  );
}

/**
 * Clear all Pokemon cache (for testing/reset)
 */
export async function clearPokemonCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
    await AsyncStorage.multiRemove(cacheKeys);
  } catch (error) {
    console.error('Error clearing pokemon cache:', error);
  }
}
