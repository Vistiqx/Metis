import { test, expect } from '@playwright/test';

test('Dashboard New Case button navigates correctly', async ({ page }) => {
  await page.goto('http://192.168.239.197:3001/');
  await page.waitForLoadState('networkidle');
  
  // Find and click New Case from Dashboard
  const newCaseLink = page.locator('a', { hasText: /New Case/i });
  await expect(newCaseLink).toBeVisible();
  
  // Get the href
  const href = await newCaseLink.getAttribute('href');
  console.log('New Case href:', href);
  
  // Click it
  await newCaseLink.click();
  
  // Wait for navigation
  await page.waitForURL('**/investigations', { timeout: 10000 });
  
  // Verify we're on investigations page
  expect(page.url()).toContain('/investigations');
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/dashboard-new-case.png', fullPage: true });
  
  // Check page loaded
  const title = await page.title();
  expect(title).toContain('Metis');
});

test('Investigations page New Case button opens modal', async ({ page }) => {
  await page.goto('http://192.168.239.197:3001/investigations');
  await page.waitForLoadState('networkidle');
  
  // Click New Case button on Investigations page
  const newCaseBtn = page.locator('button', { hasText: /New Case/i });
  await expect(newCaseBtn).toBeVisible();
  await newCaseBtn.click();
  
  // Wait for modal
  await page.waitForTimeout(1000);
  
  // Check modal appeared
  const modal = page.locator('text=/Create New Case/i');
  await expect(modal).toBeVisible();
  
  console.log('✅ Modal opened successfully!');
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/investigations-new-case-modal.png', fullPage: true });
});
