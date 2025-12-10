import { config as baseConfig } from './wdio.conf';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Global declarations for WebdriverIO
declare const browser: WebdriverIO.Browser;

// Get environment variables with type safety
const env = process.env as any;

export const config: any = {
    ...baseConfig,
    
    // BrowserStack specific settings
    user: env.BROWSERSTACK_USERNAME,
    key: env.BROWSERSTACK_ACCESS_KEY,
    
    // Override hostname and port for BrowserStack
    hostname: 'hub-cloud.browserstack.com',
    port: 443,
    protocol: 'https',
    path: '/wd/hub',
    
    // BrowserStack capabilities
    capabilities: [{
        // BrowserStack specific capabilities
        'bstack:options': {
            userName: env.BROWSERSTACK_USERNAME,
            accessKey: env.BROWSERSTACK_ACCESS_KEY,
            projectName: 'PokeTracker',
            buildName: `Build ${new Date().toISOString()}`,
            sessionName: 'E2E Tests',
            debug: true,
            networkLogs: true,
            video: true,
            appiumLogs: true,
        },
        
        // Device capabilities
        platformName: 'Android',
        'appium:platformVersion': '13.0',
        'appium:deviceName': 'Google Pixel 7',
        'appium:automationName': 'UiAutomator2',
        'appium:app': env.BROWSERSTACK_APP_URL || 'bs://your-app-id',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
    }],
    
    // Increase timeouts for BrowserStack
    waitforTimeout: 60000,  // 1 minute
    connectionRetryTimeout: 180000,  // 3 minutes
    connectionRetryCount: 3,
    
    // Mocha timeout for BrowserStack
    mochaOpts: {
        ui: 'bdd',
        timeout: 300000  // 5 minutes for BrowserStack
    },
    
    // Services - remove appium service for BrowserStack
    services: ['visual'],
    
    // BrowserStack specific hooks
    beforeSession: function (config: any, capabilities: any, specs: any) {
        console.log('Starting BrowserStack session...');
        console.log('App URL:', env.BROWSERSTACK_APP_URL);
    },
    
    // Override beforeTest to skip video recording (BrowserStack handles it automatically)
    beforeTest: async function (test: any, context: any) {
        // BrowserStack automatically records videos, no manual recording needed
    },
    
    afterTest: async function(test: any, context: any, { error, result, duration, passed, retries }: any) {
        // BrowserStack automatically captures videos
        // Only capture screenshots on failures
        if (!passed) {
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const testName = test.title.replace(/\s+/g, '-').toLowerCase();
            
            // Save screenshot
            const screenshotPath = `./screenshots/${testName}-${timestamp}.png`;
            try {
                await (browser as any).saveScreenshot(screenshotPath);
                console.log(`Screenshot saved: ${screenshotPath}`);
            } catch (screenshotError) {
                console.error('Failed to capture screenshot:', screenshotError);
            }
        }
    },
    
    after: async function (result: number, capabilities: any, specs: any) {
        // BrowserStack automatically captures videos, no need to retrieve
        console.log('BrowserStack session ended. Videos available in dashboard.');
    },
};
