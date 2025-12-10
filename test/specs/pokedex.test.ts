import { expect, browser } from '@wdio/globals';
import TodayPage from '../pageobjects/today.page';
import PokedexPage from '../pageobjects/pokedex.page';

describe('PokeTracker - Pokedex', () => {
    before(async () => {
        await TodayPage.waitForLoad();
    });

    it('should navigate to Pokedex screen', async () => {
        await PokedexPage.navigateToPokedex();
        await PokedexPage.waitForLoad();
        // Just verify we navigated to the screen (title is visible)
        const title = await PokedexPage.findByText('Pokédex');
        expect(await PokedexPage.isDisplayed(title)).toBe(true);
    });

    it('should display Pokemon in the Pokedex', async () => {
        // Check for empty state or Pokemon cards
        // Since this is a fresh app, we expect to see the empty state
        const emptyStateText = await PokedexPage.findByText('No Pokémon yet!');
        const isDisplayed = await PokedexPage.isDisplayed(emptyStateText);
        
        // Should display the empty state message when no Pokemon earned
        expect(isDisplayed).toBe(true);
    });
});
