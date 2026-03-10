import { test, expect } from '@playwright/test';

test('Check for JS errors that cause blank page', async ({ page }) => {
  const jsErrors = [];
  const consoleErrors = [];
  
  page.on('pageerror', error => {
    jsErrors.push(error.message);
    console.log('PAGE ERROR:', error.message);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log('CONSOLE ERROR:', msg.text());
    }
  });
  
  // Try to load the page
  try {
    await page.goto('http://192.168.239.197:3003/', { timeout: 30000 });
    await page.waitForTimeout(5000); // Wait longer for any JS errors
    
    console.log('Page errors found:', jsErrors.length);
    console.log('Console errors found:', consoleErrors.length);
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/js-error-check.png', fullPage: true });
    
    // Check if React root is empty
    const rootContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return {
        exists: !!root,
        childCount: root ? root.childElementCount : 0,
        innerHTML: root ? root.innerHTML.substring(0, 500) : 'No root found'
      };
    });
    
    console.log('Root element:', rootContent);
    
    // The root should have children if React rendered
    expect(rootContent.exists).toBe(true);
    expect(rootContent.childCount).toBeGreaterThan(0);
  } catch (e) {
    console.log('Navigation error:', e.message);
    throw e;
  }
});
