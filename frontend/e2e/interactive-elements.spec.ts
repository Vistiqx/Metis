import { test, expect } from '@playwright/test';

test.describe('Interactive Elements Test', () => {
  test('buttons should be clickable', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Test sidebar navigation
    const investigationsLink = page.locator('nav a[href="/investigations"], aside a[href="/investigations"]').first();
    await expect(investigationsLink).toBeVisible();
    
    // Click and verify navigation
    await investigationsLink.click();
    await page.waitForURL('**/investigations');
    
    // Verify we're on the investigations page
    await expect(page.locator('h1')).toContainText('Investigations');
  });

  test('sidebar collapse/expand should work', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Find collapse button (should be in the header)
    const collapseButton = page.locator('aside button, nav button').first();
    await expect(collapseButton).toBeVisible();
    
    // Click to collapse
    await collapseButton.click();
    await page.waitForTimeout(300);
    
    // Verify sidebar is collapsed (should be narrower)
    const sidebar = page.locator('aside').first();
    const width = await sidebar.evaluate(el => el.offsetWidth);
    expect(width).toBeLessThan(100);
    
    // Find and click expand button
    const expandButton = page.locator('aside button, nav button').first();
    await expandButton.click();
    await page.waitForTimeout(300);
    
    // Verify sidebar is expanded
    const expandedWidth = await sidebar.evaluate(el => el.offsetWidth);
    expect(expandedWidth).toBeGreaterThan(200);
  });

  test('dock buttons should be clickable', async ({ page }) => {
    await page.goto('http://localhost:3001/investigations');
    await page.waitForLoadState('networkidle');
    
    // Find dock buttons
    const dockButtons = page.locator('.fixed.bottom-6 button, [class*="dock"] button');
    const count = await dockButtons.count();
    expect(count).toBeGreaterThan(0);
    
    // Try to click first dock button
    const firstButton = dockButtons.first();
    await expect(firstButton).toBeVisible();
    await firstButton.click();
  });
});
