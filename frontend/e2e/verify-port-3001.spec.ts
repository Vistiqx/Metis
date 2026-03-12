import { test, expect } from '@playwright/test';

test('Verify New Case button works on port 3001', async ({ page }) => {
  await page.goto('http://192.168.239.197:3001/investigations');
  await page.waitForLoadState('networkidle');
  
  // Find and click New Case
  const newCaseBtn = page.locator('button', { hasText: /New Case/i });
  await expect(newCaseBtn).toBeVisible();
  await newCaseBtn.click();
  
  // Wait and check for modal
  await page.waitForTimeout(1000);
  
  // Check if CreateCaseDialog rendered
  const modalTitle = page.locator('text=/Create New Case/i');
  const isVisible = await modalTitle.isVisible().catch(() => false);
  
  console.log('Modal visible:', isVisible);
  
  if (!isVisible) {
    // Debug: list all h2 elements
    const h2s = await page.locator('h2').all();
    console.log('H2 elements found:', h2s.length);
    for (const h2 of h2s) {
      console.log('  H2 text:', await h2.textContent());
    }
  }
  
  await page.screenshot({ path: 'test-results/port-3001-new-case.png', fullPage: true });
  
  expect(isVisible).toBe(true);
});
