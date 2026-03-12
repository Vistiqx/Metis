import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", label: "dashboard" },
  { path: "/graph", label: "graph" },
  { path: "/investigations", label: "investigations" },
];

const viewports = [
  { width: 1728, height: 1117, label: "wide" },
  { width: 1440, height: 900, label: "laptop" },
  { width: 1280, height: 800, label: "small-laptop" },
  { width: 1024, height: 768, label: "tablet-landscape" },
  { width: 768, height: 1024, label: "tablet-portrait" },
  { width: 430, height: 932, label: "mobile-430" },
  { width: 390, height: 844, label: "mobile-390" },
];

test.describe("Canonical shell remediation validation", () => {
  for (const viewport of viewports) {
    for (const route of routes) {
      test(`${route.label} @ ${viewport.label}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route.path);
        await page.waitForLoadState("networkidle");

        const overflow = await page.evaluate(() => {
          const root = document.documentElement;
          const body = document.body;
          const appRoot = document.getElementById("root");
          const contextBar = document.querySelector(".metis-context-bar") as HTMLElement | null;

          return {
            rootOverflow: root.scrollWidth > root.clientWidth,
            bodyOverflow: body.scrollWidth > body.clientWidth,
            appOverflow: appRoot ? appRoot.scrollWidth > appRoot.clientWidth : false,
            topBarOverflow: contextBar ? contextBar.scrollWidth > contextBar.clientWidth : false,
          };
        });

        expect.soft(overflow.rootOverflow, "root horizontal overflow").toBeFalsy();
        expect.soft(overflow.bodyOverflow, "body horizontal overflow").toBeFalsy();
        expect.soft(overflow.appOverflow, "root app horizontal overflow").toBeFalsy();
        expect.soft(overflow.topBarOverflow, "top bar overflow").toBeFalsy();

        const shellSidebar = page.locator("aside.metis-shell-sidebar");
        const drawerToggle = page.getByRole("button", { name: "Toggle navigation" });
        const inspectorPanel = page.locator("aside.metis-right-panel");

        if (viewport.width >= 1280) {
          await expect(shellSidebar).toBeVisible();
        } else {
          await expect(drawerToggle).toBeVisible();
        }

        if (viewport.width >= 1440) {
          await expect(inspectorPanel).toBeVisible();
          const inspectorWidth = await inspectorPanel.evaluate((node) =>
            Math.round(node.getBoundingClientRect().width),
          );
          expect.soft(inspectorWidth).toBeGreaterThanOrEqual(296);
          expect.soft(inspectorWidth).toBeLessThanOrEqual(304);
        }

        await page.screenshot({
          path: `artifacts/screenshots-remediation/${route.label}-${viewport.width}x${viewport.height}.png`,
          fullPage: false,
        });
      });
    }
  }
});
