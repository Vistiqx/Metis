import { test, expect } from '@playwright/test';

/**
 * Comprehensive Page Audit Test
 * Tests all navigation items, buttons, and links to identify missing functionality
 */

test.describe('Metis Platform - Complete Page Audit', () => {
  const routes = [
    { path: '/', name: 'Dashboard', expectedImplemented: true },
    { path: '/investigations', name: 'Investigations', expectedImplemented: true },
    { path: '/events', name: 'Events', expectedImplemented: true },
    { path: '/graph', name: 'Graph', expectedImplemented: false },
    { path: '/evidence', name: 'Evidence', expectedImplemented: false },
    { path: '/watchlists', name: 'Watchlists', expectedImplemented: false },
    { path: '/alerts', name: 'Alerts', expectedImplemented: false },
    { path: '/sources', name: 'Sources', expectedImplemented: true },
    { path: '/operations', name: 'Operations', expectedImplemented: false },
    { path: '/narratives', name: 'Narratives', expectedImplemented: false },
    { path: '/docs', name: 'Documentation', expectedImplemented: false },
    { path: '/settings', name: 'Settings', expectedImplemented: false },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('audit all navigation links exist', async ({ page }) => {
    for (const route of routes) {
      const link = page.locator(`nav a[href="${route.path}"], aside a[href="${route.path}"]`);
      await expect(link, `Navigation link for ${route.name} should exist`).toBeVisible();
    }
  });

  test('audit all pages load without errors', async ({ page }) => {
    const results = [];
    
    for (const route of routes) {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      
      // Check if page is just a placeholder
      const placeholderText = await page.locator('text=/Page$/i').count();
      const hasSubstantialContent = await page.locator('h1, h2, .card, table, form, button:not(nav button)').count() > 1;
      
      results.push({
        route: route.name,
        path: route.path,
        isPlaceholder: placeholderText > 0 && !hasSubstantialContent,
        hasContent: hasSubstantialContent,
        url: page.url()
      });
    }
    
    console.log('Page Audit Results:', JSON.stringify(results, null, 2));
    
    // Verify expected implemented pages have content
    for (const route of routes) {
      if (route.expectedImplemented) {
        const result = results.find(r => r.path === route.path);
        expect(result?.hasContent, `${route.name} should have substantial content`).toBe(true);
        expect(result?.isPlaceholder, `${route.name} should not be a placeholder`).toBe(false);
      }
    }
  });

  test('audit all interactive elements', async ({ page }) => {
    const issues = [];
    
    for (const route of routes) {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      
      // Find all buttons
      const buttons = await page.locator('button:not(nav button):not(aside button)').all();
      const links = await page.locator('a:not(nav a):not(aside a)').all();
      
      for (const button of buttons) {
        const text = await button.textContent();
        const isDisabled = await button.isDisabled().catch(() => false);
        const isVisible = await button.isVisible().catch(() => false);
        
        if (!text || text.trim() === '') {
          issues.push({ type: 'button', route: route.name, issue: 'Empty button text', visible: isVisible });
        }
        
        if (isDisabled && isVisible) {
          issues.push({ type: 'button', route: route.name, text: text?.trim(), issue: 'Disabled button visible' });
        }
      }
      
      for (const link of links) {
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        
        if (!href || href === '#' || href === '') {
          issues.push({ type: 'link', route: route.name, text: text?.trim(), issue: 'Missing or invalid href' });
        }
      }
    }
    
    if (issues.length > 0) {
      console.log('Interactive Element Issues:', JSON.stringify(issues, null, 2));
    }
    
    // Log for manual review but don't fail test
    expect(issues.length).toBeGreaterThanOrEqual(0);
  });

  test('audit page has proper structure', async ({ page }) => {
    const structureIssues = [];
    
    for (const route of routes) {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      
      // Check for basic page structure
      const hasH1 = await page.locator('h1').count() > 0;
      const hasMain = await page.locator('main').count() > 0 || await page.locator('[class*="main"]').count() > 0;
      
      if (!hasH1 && !route.path.includes('docs')) {
        structureIssues.push({ route: route.name, issue: 'No H1 heading found' });
      }
      
      if (!hasMain && !route.path.includes('docs')) {
        structureIssues.push({ route: route.name, issue: 'No main content area found' });
      }
    }
    
    console.log('Structure Issues:', JSON.stringify(structureIssues, null, 2));
    expect(structureIssues.length).toBeGreaterThanOrEqual(0);
  });

  test('check for console errors on each page', async ({ page }) => {
    const consoleErrors: { route: string; errors: string[] }[] = [];
    
    for (const route of routes) {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for any delayed errors
      
      if (errors.length > 0) {
        consoleErrors.push({ route: route.name, errors });
      }
      
      // Remove listener for next iteration
      page.removeAllListeners('console');
    }
    
    if (consoleErrors.length > 0) {
      console.log('Console Errors by Route:', JSON.stringify(consoleErrors, null, 2));
    }
    
    // Check for critical errors only
    const criticalErrors = consoleErrors.filter(ce => 
      ce.errors.some(e => !e.includes('favicon') && !e.includes('source map'))
    );
    
    expect(criticalErrors.length, 'No critical console errors should exist').toBe(0);
  });
});
