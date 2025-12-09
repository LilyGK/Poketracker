import { $ } from '@wdio/globals';
import BasePage from './base.page';

/**
 * Page object for the Pokedex screen
 */
class PokedexPage extends BasePage {
    /**
     * Define selectors - using testID from PokedexScreen.tsx
     */
    get pokemonList() {
        return $('~pokedex-list');
    }

    get pokedexTab() {
        return $('~tab-pokedex');  // testID="tab-pokedex" from AppNavigator
    }

    /**
     * Find Pokemon card by name
     */
    async getPokemonCard(pokemonName: string) {
        return await this.findByText(pokemonName);
    }

    /**
     * Check if Pokemon is unlocked
     */
    async isPokemonUnlocked(pokemonName: string): Promise<boolean> {
        const pokemon = await this.getPokemonCard(pokemonName);
        return await this.isDisplayed(pokemon);
    }

    /**
     * Open Pokemon details
     */
    async openPokemonDetails(pokemonName: string) {
        const pokemon = await this.getPokemonCard(pokemonName);
        await this.clickElement(pokemon);
    }

    /**
     * Navigate to Pokedex tab
     */
    async navigateToPokedex() {
        await this.clickElement(await this.pokedexTab);
    }

    /**
     * Wait for Pokedex screen to load
     */
    async waitForLoad() {
        // Check for the Pokédex title or filter buttons to verify screen loaded
        const titleElement = await this.findByText('Pokédex');
        await this.waitForDisplayed(titleElement, 15000);
    }
}

export default new PokedexPage();
