import { test, expect } from '@playwright/test';

test('Static build on port 3005 works', async ({ page }) => {
  await page.goto('http://192.168.239.197:3005/');
  await page.waitForLoadState('networkidle');
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/static-build.png', fullPage: true });
  
  // Check title
  const title = await page.title();
  console.log('Title:', title);
  expect(title).toBe('Metis - OSINT Intelligence Platform');
  
  // Check root has content
  const rootContent = await page.evaluate(() => {
    const root = document.getElementById('root');
    return {
      exists: !!root,
      childCount: root ? root.childElementCount : 0,
      text: root ? root.innerText.substring(0, 100) : 'No root'
    };
  });
  
  console.log('Root content:', rootContent);
  expect(rootContent.exists).toBe(true);
  expect(rootContent.childCount).toBeGreaterThan(0);
  expect(rootContent.text).toContain('Dashboard');
});
