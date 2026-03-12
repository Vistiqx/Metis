import { test, expect } from '@playwright/test';

test('Debug New Case button click', async ({ page }) => {
  const consoleLogs = [];
  const errors = [];
  
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    errors.push(err.message);
  });
  
  // Navigate to Investigations page
  await page.goto('http://localhost:3001/investigations');
  await page.waitForLoadState('networkidle');
  
  // Click the "New Case" button using JavaScript to bypass any issues
  const buttonClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const newCaseBtn = buttons.find(b => b.textContent?.includes('New Case'));
    if (newCaseBtn) {
      console.log('Found button:', newCaseBtn.textContent);
      newCaseBtn.click();
      return true;
    }
    return false;
  });
  
  console.log('Button clicked via JS:', buttonClicked);
  
  // Wait and check
  await page.waitForTimeout(2000);
  
  // Check for any dialogs/modals
  const dialogs = await page.locator('[class*="dialog"], [class*="modal"], .fixed, [role="dialog"]').count();
  console.log('Dialogs found:', dialogs);
  
  // Log all console messages
  console.log('Console logs:', consoleLogs);
  console.log('Errors:', errors);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/debug-click.png', fullPage: true });
  
  // Check if any modal content exists
  const hasModalContent = await page.evaluate(() => {
    const modalTexts = ['Create New Case', 'Case Title', 'Description'];
    const bodyText = document.body.innerText;
    return modalTexts.some(text => bodyText.includes(text));
  });
  
  console.log('Has modal content:', hasModalContent);
  expect(hasModalContent).toBe(true);
});
