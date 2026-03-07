import { test, expect } from '@playwright/test';

/**
 * Comprehensive Page Audit Test - UI Remediation Validation
 * Tests all navigation items, buttons, and links to identify missing functionality
 * Generated: 2026-03-06
 */

test.describe('Metis Platform - Complete Page Audit', () => {
  const routes = [
    { path: '/', name: 'Dashboard', expectedImplemented: true },
    { path: '/investigations', name: 'Investigations', expectedImplemented: true },
    { path: '/events', name: 'Events', expectedImplemented: true },
    { path: '/graph', name: 'Graph', expectedImplemented: true },
    { path: '/evidence', name: 'Evidence', expectedImplemented: true },
    { path: '/watchlists', name: 'Watchlists', expectedImplemented: true },
    { path: '/alerts', name: 'Alerts', expectedImplemented: true },
    { path: '/sources', name: 'Sources', expectedImplemented: true },
    { path: '/operations', name: 'Operations', expectedImplemented: true },
    { path: '/narratives', name: 'Narratives', expectedImplemented: true },
    { path: '/docs', name: 'Documentation', expectedImplemented: true },
    { path: '/settings', name: 'Settings', expectedImplemented: true },
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
      
      // Check for substantial content
      const hasH1 = await page.locator('h1').count() > 0;
      const hasCards = await page.locator('.card, [class*="card"]').count() > 0;
      const hasButtons = await page.locator('button').count() > 0;
      const hasSubstantialContent = hasH1 && (hasCards || hasButtons);
      
      results.push({
        route: route.name,
        path: route.path,
        hasContent: hasSubstantialContent,
        hasH1,
        hasCards,
        hasButtons,
        url: page.url()
      });
    }
    
    console.log('Page Audit Results:', JSON.stringify(results, null, 2));
    
    // Verify all pages have content
    for (const route of routes) {
      const result = results.find(r => r.path === route.path);
      expect(result?.hasContent, `${route.name} should have substantial content`).toBe(true);
      expect(result?.hasH1, `${route.name} should have H1 heading`).toBe(true);
    }
  });

  test('audit sidebar navigation works for all routes', async ({ page }) => {
    for (const route of routes.slice(1)) { // Skip dashboard since we're already there
      // Click sidebar link
      const link = page.locator(`nav a[href="${route.path}"], aside a[href="${route.path}"]`);
      await link.click();
      
      // Wait for navigation
      await page.waitForURL(`**${route.path}`);
      
      // Verify we're on the correct page
      await expect(page).toHaveURL(new RegExp(`${route.path.replace(/\//g, '\\/')}$`));
      
      // Verify page has loaded
      const hasH1 = await page.locator('h1').count() > 0;
      expect(hasH1, `${route.name} page should have H1 after navigation`).toBe(true);
      
      // Go back to dashboard for next iteration
      await page.goto('/');
      await page.waitForLoadState('networkidle');
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
          issues.push({ 
            type: 'button', 
            route: route.name, 
            issue: 'Empty button text', 
            visible: isVisible 
          });
        }
        
        if (isDisabled && isVisible) {
          issues.push({ 
            type: 'button', 
            route: route.name, 
            text: text?.trim(), 
            issue: 'Disabled button visible' 
          });
        }
      }
      
      for (const link of links) {
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        
        if (!href || href === '#' || href === '') {
          issues.push({ 
            type: 'link', 
            route: route.name, 
            text: text?.trim(), 
            issue: 'Missing or invalid href' 
          });
        }
      }
    }
    
    if (issues.length > 0) {
      console.log('Interactive Element Issues:', JSON.stringify(issues, null, 2));
    }
    
    // No critical issues expected
    const criticalIssues = issues.filter(i => 
      i.issue !== 'Disabled button visible' // Disabled buttons can be intentional
    );
    
    expect(criticalIssues.length, 'No critical interactive element issues').toBe(0);
  });

  test('audit page has proper structure', async ({ page }) => {
    const structureIssues = [];
    
    for (const route of routes) {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      
      // Check for basic page structure
      const hasH1 = await page.locator('h1').count() > 0;
      const hasMain = await page.locator('main').count() > 0 || await page.locator('[class*="main"]').count() > 0;
      
      if (!hasH1) {
        structureIssues.push({ route: route.name, issue: 'No H1 heading found' });
      }
      
      if (!hasMain) {
        structureIssues.push({ route: route.name, issue: 'No main content area found' });
      }
    }
    
    console.log('Structure Issues:', JSON.stringify(structureIssues, null, 2));
    expect(structureIssues.length, 'No structure issues should exist').toBe(0);
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
      ce.errors.some(e => !e.includes('favicon') && !e.includes('source map') && !e.includes('Manifest'))
    );
    
    expect(criticalErrors.length, 'No critical console errors should exist').toBe(0);
  });

  test('audit dock bar presence and functionality', async ({ page }) => {
    const dockRoutes = routes.filter(r => r.name !== 'Dashboard');
    
    for (const route of dockRoutes) {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      
      // Check for dock bar (fixed at bottom)
      const dockBar = page.locator('.fixed.bottom-6, [class*="dock"], [class*="Dock"]').first();
      const hasDockBar = await dockBar.isVisible().catch(() => false);
      
      expect(hasDockBar, `${route.name} should have dock bar`).toBe(true);
      
      if (hasDockBar) {
        // Try clicking first dock button
        const dockButtons = dockBar.locator('button');
        const buttonCount = await dockButtons.count();
        expect(buttonCount, `${route.name} dock should have buttons`).toBeGreaterThan(0);
      }
    }
  });

  test('audit responsive layout', async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Mobile menu toggle should be visible
    const mobileMenuToggle = page.locator('button').filter({ has: page.locator('svg') }).first();
    await expect(mobileMenuToggle).toBeVisible();
  });

  test('capture screenshots for visual validation', async ({ page }) => {
    for (const route of routes) {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      // Take screenshot for visual comparison
      await page.screenshot({
        path: `artifacts/screenshots/${route.name.toLowerCase()}/validated/page-load.png`,
        fullPage: false
      });
    }
  });
});
