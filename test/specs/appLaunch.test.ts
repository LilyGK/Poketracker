import { expect, browser } from '@wdio/globals';

describe('PokeTracker - App Launch', () => {
    it('should launch the app successfully', async () => {
        // Verify app context
        const context = await (browser as any).getContext();
        expect(context).toContain('NATIVE');
        
        // Verify app is running
        const activity = await (browser as any).getCurrentActivity();
        // Accept either MainActivity or DevLauncherActivity (dev builds)
        expect(activity).toMatch(/MainActivity|DevLauncherActivity/);
    });

    it('should have the correct package name', async () => {
        const packageName = await (browser as any).getCurrentPackage();
        expect(packageName).toBe('com.poketracker.app');
    });
});
