import { test } from '@playwright/test';

test('Debug blank page issue on port 3003', async ({ page }) => {
  const errors = [];
  const logs = [];
  
  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    errors.push(err.message);
  });
  
  // Try accessing via IP
  console.log('Accessing via IP: 192.168.239.197:3003');
  await page.goto('http://192.168.239.197:3003/', { timeout: 30000 });
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/debug-blank-page.png', fullPage: true });
  
  // Check if body has content
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  const bodyText = await page.evaluate(() => document.body.innerText);
  
  console.log('Body HTML length:', bodyHTML.length);
  console.log('Body text length:', bodyText.length);
  console.log('Console logs:', logs);
  console.log('Errors:', errors);
  
  // Check for root div
  const rootDiv = await page.locator('#root').count();
  console.log('Root div found:', rootDiv);
  
  // Check if there are any visible elements
  const visibleElements = await page.locator('*:visible').count();
  console.log('Visible elements:', visibleElements);
});
