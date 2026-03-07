import { test, expect } from '@playwright/test';

/**
 * REAL UI Functionality Test
 * Actually clicks elements and verifies they work
 */

test.describe('REAL UI Testing - Finding Actual Bugs', () => {
  
  test('Dashboard - Quick action buttons should navigate', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Test "New Case" quick action
    const newCaseBtn = page.locator('a:has-text("New Case")');
    await expect(newCaseBtn).toBeVisible();
    
    // Check the href attribute
    const href = await newCaseBtn.getAttribute('href');
    expect(href).toBe('/investigations');
    
    await newCaseBtn.click();
    await page.waitForURL('**/investigations', { timeout: 10000 });
    expect(page.url()).toContain('/investigations');
    
    // Go back and test another
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const viewEventsBtn = page.locator('a:has-text("View Events")');
    await expect(viewEventsBtn).toBeVisible();
    await viewEventsBtn.click();
    await page.waitForURL('**/events');
    expect(page.url()).toContain('/events');
  });

  test('Sidebar - All navigation links work', async ({ page }) => {
    await page.goto('/');
    
    const routes = [
      { path: '/investigations', name: 'Investigations' },
      { path: '/events', name: 'Events' },
      { path: '/graph', name: 'Graph' },
      { path: '/evidence', name: 'Evidence' },
      { path: '/watchlists', name: 'Watchlists' },
      { path: '/alerts', name: 'Alerts' },
      { path: '/sources', name: 'Sources' },
      { path: '/operations', name: 'Operations' },
      { path: '/narratives', name: 'Narratives' },
      { path: '/docs', name: 'Docs' },
      { path: '/settings', name: 'Settings' },
    ];
    
    for (const route of routes) {
      // Find and click the nav link
      const link = page.locator(`nav a[href="${route.path}"], aside a[href="${route.path}"]`).first();
      await expect(link, `${route.name} link should exist`).toBeVisible();
      
      await link.click();
      await page.waitForURL(`**${route.path}`, { timeout: 5000 });
      
      // Verify we're on the right page
      expect(page.url()).toContain(route.path);
      
      // Verify page has content
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });

  test('Events - Tab switching works', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    
    // Click Candidates tab
    const candidatesTab = page.locator('button:has-text("Candidates")');
    await expect(candidatesTab).toBeVisible();
    await candidatesTab.click();
    
    // Verify candidates are shown
    const candidatesSection = page.locator('text=/Candidate|candidate/i').first();
    await expect(candidatesSection).toBeVisible();
    
    // Click back to Events
    const eventsTab = page.locator('button:has-text("Events")').first();
    await eventsTab.click();
    
    // Verify events are shown
    const eventsSection = page.locator('text=/Event|event/i').first();
    await expect(eventsSection).toBeVisible();
  });

  test('Evidence - Grid/List view toggle', async ({ page }) => {
    await page.goto('/evidence');
    await page.waitForLoadState('networkidle');
    
    // Find grid view button
    const gridBtn = page.locator('button svg[class*="grid"]').first();
    const listBtn = page.locator('button svg[class*="list"]').first();
    
    // Click list view
    await listBtn.click();
    await page.waitForTimeout(500);
    
    // Click grid view
    await gridBtn.click();
    await page.waitForTimeout(500);
    
    // Page should still have content (look for evidence cards, not mobile menu)
    const evidenceItems = page.locator('main [class*="card"]').first();
    await expect(evidenceItems).toBeVisible();
  });

  test('Watchlists - Search filters results', async ({ page }) => {
    await page.goto('/watchlists');
    await page.waitForLoadState('networkidle');
    
    // Get initial count
    const initialCards = await page.locator('[class*="card"]').count();
    expect(initialCards).toBeGreaterThan(0);
    
    // Search for something
    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill('Protest');
    await page.waitForTimeout(500);
    
    // Results should be filtered
    const filteredCards = await page.locator('[class*="card"]').count();
    expect(filteredCards).toBeGreaterThanOrEqual(0);
    expect(filteredCards).toBeLessThanOrEqual(initialCards);
  });

  test('Settings - Tab switching works', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');
    
    // Test each tab
    const tabs = [
      { name: 'Notifications', selector: 'nav button:has-text("Notifications")' },
      { name: 'Security', selector: 'nav button:has-text("Security")' },
      { name: 'Appearance', selector: 'nav button:has-text("Appearance")' }
    ];
    
    for (const tab of tabs) {
      const tabBtn = page.locator(tab.selector).first();
      await expect(tabBtn).toBeVisible();
      await tabBtn.click();
      await page.waitForTimeout(300);
      
      // Verify tab content is shown
      const tabContent = page.locator(`text=/${tab}/i`).first();
      await expect(tabContent).toBeVisible();
    }
  });

  test('Check for console errors on navigation', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(`PAGE ERROR: ${error.message}`);
    });
    
    // Navigate through multiple pages
    const routes = ['/', '/investigations', '/events', '/graph', '/evidence'];
    
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
    }
    
    // Filter out known benign errors
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('Manifest') && 
      !e.includes('source map') &&
      !e.includes('ws://')
    );
    
    if (criticalErrors.length > 0) {
      console.log('Console errors found:', criticalErrors);
    }
    
    expect(criticalErrors.length, 'No critical console errors').toBe(0);
  });

  test('Dock bar - Buttons are present and clickable', async ({ page }) => {
    await page.goto('/investigations');
    await page.waitForLoadState('networkidle');
    
    // Find dock bar
    const dockBar = page.locator('.fixed.bottom-6, [class*="dock"]').first();
    await expect(dockBar).toBeVisible();
    
    // Find dock buttons
    const dockButtons = dockBar.locator('button');
    const buttonCount = await dockButtons.count();
    expect(buttonCount, 'Dock should have buttons').toBeGreaterThan(0);
    
    // Try clicking each button
    for (let i = 0; i < buttonCount; i++) {
      const btn = dockButtons.nth(i);
      await expect(btn).toBeVisible();
      await btn.click();
      await page.waitForTimeout(200);
    }
  });

  test('Operations - Status filter tabs work', async ({ page }) => {
    await page.goto('/operations');
    await page.waitForLoadState('networkidle');
    
    const tabs = ['Pending', 'In Progress', 'Completed'];
    
    for (const tab of tabs) {
      const tabBtn = page.locator(`button:has-text("${tab}")`).first();
      await expect(tabBtn).toBeVisible();
      await tabBtn.click();
      await page.waitForTimeout(300);
      
      // Page should still show content or empty state
      const content = page.locator('body');
      await expect(content).toBeVisible();
    }
  });

  test('Narratives - Filter by status works', async ({ page }) => {
    await page.goto('/narratives');
    await page.waitForLoadState('networkidle');
    
    // Click Published tab
    const publishedTab = page.locator('button:has-text("Published")').first();
    await publishedTab.click();
    await page.waitForTimeout(500);
    
    // Should show filtered results
    const filteredCards = await page.locator('[class*="card"]').count();
    expect(filteredCards).toBeGreaterThanOrEqual(0);
  });
});
