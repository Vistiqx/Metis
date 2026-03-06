import { test, expect } from '@playwright/test';

/**
 * Debug test to capture console errors and screenshots
 */

test.describe('Debug Page Rendering', () => {
  const pagesToTest = [
    { path: '/graph', name: 'Graph' },
    { path: '/evidence', name: 'Evidence' },
    { path: '/watchlists', name: 'Watchlists' },
    { path: '/alerts', name: 'Alerts' },
    { path: '/operations', name: 'Operations' },
    { path: '/narratives', name: 'Narratives' },
  ];

  for (const pageInfo of pagesToTest) {
    test(`capture ${pageInfo.name} page errors and screenshot`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const consoleLogs: string[] = [];
      
      // Capture console messages
      page.on('console', msg => {
        const text = msg.text();
        if (msg.type() === 'error') {
          consoleErrors.push(text);
        } else {
          consoleLogs.push(`[${msg.type()}] ${text}`);
        }
      });

      // Capture page errors
      page.on('pageerror', error => {
        consoleErrors.push(`PAGE ERROR: ${error.message}`);
      });

      // Navigate to page
      await page.goto(pageInfo.path);
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Take screenshot
      await page.screenshot({ 
        path: `test-results/${pageInfo.name.toLowerCase()}-screenshot.png`,
        fullPage: true 
      });

      // Log console output
      console.log(`\n=== ${pageInfo.name} Page ===`);
      console.log('Console logs:', consoleLogs);
      console.log('Console errors:', consoleErrors);

      // Check if page has content
      const bodyText = await page.locator('body').textContent();
      console.log(`Body text length: ${bodyText?.length || 0}`);
      console.log(`Body text preview: ${bodyText?.substring(0, 200)}...`);

      // Check for root element
      const rootContent = await page.locator('#root').textContent();
      console.log(`Root content length: ${rootContent?.length || 0}`);

      // Verify page loaded
      expect(consoleErrors.length).toBe(0);
    });
  }
});
