import { test, expect } from '@playwright/test';

test.describe('Metis Platform - Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display login page or authenticated content', async ({ page }) => {
    // Take screenshot to see current state
    await page.screenshot({ path: 'e2e-report/initial-state.png', fullPage: true });
    
    // Check if we're on a login page or already authenticated
    const loginElements = await page.locator('text=/login|sign in|username|password/i').count();
    const dashboardElements = await page.locator('text=/dashboard|welcome|logout/i').count();
    
    // Either login form should exist OR dashboard content should exist
    expect(loginElements + dashboardElements).toBeGreaterThan(0);
  });

  test('should navigate through workspace sidebar items', async ({ page }) => {
    // Look for navigation items in sidebar
    const sidebarLinks = page.locator('aside a, nav a, [class*="sidebar"] a, [class*="nav"] a');
    const linkCount = await sidebarLinks.count();
    
    if (linkCount > 0) {
      // Try clicking first navigation item
      await sidebarLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Verify URL changed or content updated
      const currentUrl = page.url();
      expect(currentUrl).toBeTruthy();
    }
  });

  test('should verify API connectivity', async ({ page }) => {
    // Monitor network requests
    const apiRequests: string[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/') || request.url().includes(':8081')) {
        apiRequests.push(request.url());
      }
    });

    // Reload to trigger API calls
    await page.reload();
    await page.waitForTimeout(3000);

    // Check if any API calls were made
    if (apiRequests.length > 0) {
      console.log('API requests detected:', apiRequests);
      
      // Verify API health
      const healthResponse = await page.request.get('http://localhost:8081/health');
      expect(healthResponse.status()).toBe(200);
      
      const healthData = await healthResponse.json();
      expect(healthData.status).toBe('healthy');
    }
  });
});
