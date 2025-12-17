import { $ } from '@wdio/globals';
import BasePage from './base.page';
import { PokedexLocators } from '../locators/pokedex.locators';

/**
 * Page object for the Pokedex screen
 */
class PokedexPage extends BasePage {
    /**
     * Define selectors - using testID from PokedexScreen.tsx
     */
    get pokemonList() {
        return $(PokedexLocators.pokemonList);
    }

    get pokedexTab() {
        return $(PokedexLocators.pokedexTab);
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
        await this.clickElement(this.pokedexTab);
    }

    /**
     * Wait for Pokedex screen to load
     */
    async waitForLoad() {
        const titleElement = await this.findByText('Pokédex');
        await this.waitForDisplayed(titleElement);
    }
}

export default new PokedexPage();
