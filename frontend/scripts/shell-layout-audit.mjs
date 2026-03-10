import { chromium, firefox, webkit } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.METIS_AUDIT_URL ?? "http://127.0.0.1:3001/";
const outputDir = path.resolve(process.cwd(), "artifacts", "layout-audit");

const browserTypes = [
  ["chromium", chromium],
  ["firefox", firefox],
  ["webkit", webkit],
];

const viewports = [1920, 1600, 1440, 1366, 1280, 1024, 768, 540, 430].map(
  (width) => ({ width, height: Math.max(720, Math.round(width * 0.62)) }),
);

const chromiumZooms = [0.8, 0.9, 1, 1.1, 1.25];
const routes = ["/", "/investigations", "/graph", "/evidence", "/sources", "/narratives", "/docs", "/analytics", "/reports", "/settings"];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function slugify(value) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "root";
}

async function captureMetrics(page, meta) {
  return page.evaluate((input) => {
    const query = (selector) => document.querySelector(selector);
    const rect = (selector) => {
      const node = query(selector);
      if (!node) return null;
      const box = node.getBoundingClientRect();
      return {
        width: Number(box.width.toFixed(2)),
        height: Number(box.height.toFixed(2)),
        left: Number(box.left.toFixed(2)),
        right: Number(box.right.toFixed(2)),
      };
    };

    const metricCards = [...document.querySelectorAll(".metis-command-strip .metis-metric-cell")].map((node) => {
      const box = node.getBoundingClientRect();
      return Number(box.width.toFixed(2));
    });

    const commandStrip = query(".metis-command-strip");
    const body = document.body;
    const doc = document.documentElement;
    const horizontalOverflow = Math.max(body.scrollWidth, doc.scrollWidth) - window.innerWidth;

    return {
      meta: input,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      },
      rootFontSize: getComputedStyle(doc).fontSize,
      pageScale: doc.style.getPropertyValue("--metis-viewport-scale") || "",
      shell: rect(".metis-shell-grid"),
      sidebar: rect(".metis-shell-sidebar"),
      workspace: rect('[data-shell-region="workspace"]'),
      analysis: rect('[data-shell-region="analysis"]'),
      inspector: rect(".metis-right-panel"),
      topBar: rect(".metis-context-bar"),
      commandStrip: commandStrip
        ? {
            width: Number(commandStrip.getBoundingClientRect().width.toFixed(2)),
            scrollWidth: commandStrip.scrollWidth,
            clientWidth: commandStrip.clientWidth,
          }
        : null,
      metricCards,
      page: {
        scrollWidth: Math.max(body.scrollWidth, doc.scrollWidth),
        clientWidth: doc.clientWidth,
        horizontalOverflow: Number(horizontalOverflow.toFixed(2)),
        hasHorizontalOverflow: horizontalOverflow > 1,
      },
      visibility: {
        sidebarVisible: !!query(".metis-shell-sidebar") && getComputedStyle(query(".metis-shell-sidebar")).display !== "none",
        inspectorVisible: !!query(".metis-right-panel") && getComputedStyle(query(".metis-right-panel")).display !== "none",
      },
    };
  }, meta);
}

async function run() {
  await ensureDir(outputDir);
  const summary = [];

  for (const [browserName, browserType] of browserTypes) {
    let browser;
    try {
      browser = await browserType.launch({ headless: true });
    } catch (error) {
      summary.push({ browser: browserName, skipped: true, reason: String(error) });
      continue;
    }

    const browserDir = path.join(outputDir, browserName);
    await ensureDir(browserDir);

    for (const route of routes) {
      const routeSlug = slugify(route);

      for (const viewport of viewports) {
        const zooms = browserName === "chromium" && viewport.width >= 1280 ? chromiumZooms : [1];

        for (const zoom of zooms) {
          const context = await browser.newContext({ viewport });
          const page = await context.newPage();

          if (browserName === "chromium") {
            const session = await context.newCDPSession(page);
            await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: zoom });
          }

          const targetUrl = new URL(route, baseUrl).toString();
          await page.goto(targetUrl, { waitUntil: "networkidle" });
          await page.screenshot({ path: path.join(browserDir, `${routeSlug}-${viewport.width}-z${String(zoom).replace(".", "_")}.png`), fullPage: false });

          summary.push(await captureMetrics(page, { browser: browserName, route, viewport, zoom }));
          await context.close();
        }
      }
    }

    await browser.close();
  }

  await fs.writeFile(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));
  console.log(`Wrote ${summary.length} audit records to ${path.join(outputDir, "summary.json")}`);
}

await run();
