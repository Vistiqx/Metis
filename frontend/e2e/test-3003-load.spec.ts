import { test, expect } from '@playwright/test';

test('Check page loads on port 3003', async ({ page }) => {
  // Capture console logs
  const logs = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[ERROR] ${err.message}`));
  
  try {
    await page.goto('http://192.168.239.197:3003/', { timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    console.log('Page loaded successfully');
    console.log('Console logs:', logs);
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/port-3003-homepage.png', fullPage: true });
    
    // Check if we have content
    const title = await page.title();
    console.log('Page title:', title);
    
    expect(title).toContain('Metis');
  } catch (e) {
    console.log('Error loading page:', e.message);
    console.log('Console logs so far:', logs);
    throw e;
  }
});
