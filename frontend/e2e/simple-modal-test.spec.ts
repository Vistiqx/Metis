import { test, expect } from '@playwright/test';

test('Verify New Case modal works', async ({ page }) => {
  await page.goto('http://192.168.239.197:3001/investigations');
  await page.waitForTimeout(2000);
  
  // Click New Case button
  const newCaseBtn = page.locator('button', { hasText: /New Case/i });
  await newCaseBtn.click();
  
  // Wait
  await page.waitForTimeout(1000);
  
  // Check for modal content
  const pageText = await page.locator('body').textContent();
  const hasCreateNewCase = pageText?.includes('Create New Case');
  const hasCaseTitle = pageText?.includes('Case Title');
  
  console.log('Has "Create New Case":', hasCreateNewCase);
  console.log('Has "Case Title":', hasCaseTitle);
  
  await page.screenshot({ path: 'test-results/new-case-modal-check.png', fullPage: true });
  
  expect(hasCreateNewCase).toBe(true);
});
