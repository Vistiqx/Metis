import { test, expect } from '@playwright/test';

test.describe('Metis Platform - Basic Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display the application title', async ({ page }) => {
    await expect(page).toHaveTitle(/Metis/);
  });

  test('should display main navigation elements', async ({ page }) => {
    // Check if sidebar exists
    const sidebar = page.locator('aside, [class*="sidebar"], nav');
    await expect(sidebar.first()).toBeVisible();
    
    // Check if main content area exists
    const mainContent = page.locator('main, [class*="main"], #root > div');
    await expect(mainContent.first()).toBeVisible();
  });

  test('should render without JavaScript errors', async ({ page }) => {
    // Monitor console for errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Reload page to capture any errors during load
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Allow some known benign errors but catch critical ones
    const criticalErrors = consoleErrors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('Manifest') &&
      !err.includes('source map')
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
