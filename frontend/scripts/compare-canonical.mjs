import fs from "node:fs/promises";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import sharp from "sharp";

const repoRoot = path.resolve(process.cwd(), "..");
const frontendRoot = process.cwd();

const capturesDir = path.join(frontendRoot, "artifacts", "screenshots-remediation");
const outputDir = path.join(frontendRoot, "artifacts", "canonical-diff");
const referenceOutDir = path.join(outputDir, "reference-normalized");
const diffOutDir = path.join(outputDir, "diff");

const routeConfig = {
  dashboard: {
    route: "/",
    canonical: "docs/canonical/06-brand-assets/Metis-Mockup-UI-General-Layer.png",
    secondaryCanonical:
      "docs/canonical/03-product-screens/metis_screen_final_package/mockups/02-dashboard.png",
  },
  investigations: {
    route: "/investigations",
    canonical: "docs/canonical/06-brand-assets/Metis-Mockup-UI-General-Layer.png",
    secondaryCanonical:
      "docs/canonical/03-product-screens/metis_screen_final_package/mockups/03-investigations-list.png",
  },
  graph: {
    route: "/graph",
    canonical: "docs/canonical/06-brand-assets/Metis-Mockup-UI-Signal-Layer.png",
    secondaryCanonical:
      "docs/canonical/03-product-screens/metis_screen_final_package/mockups/05-graph-explorer.png",
  },
};

const viewports = [
  { width: 1728, height: 1117 },
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
];

// Canonical enforcement is strict; prior loose thresholds hide visible drift.
const mismatchThresholdPercent = 5;
const warmthDriftLimit = 0.07;

function viewportLabel({ width, height }) {
  return `${width}x${height}`;
}

async function ensureDirectories() {
  await fs.mkdir(referenceOutDir, { recursive: true });
  await fs.mkdir(diffOutDir, { recursive: true });
}

async function loadPng(filePath) {
  const data = await fs.readFile(filePath);
  return PNG.sync.read(data);
}

async function normalizeReference(referencePath, width, height, outputPath) {
  await sharp(referencePath)
    .resize(width, height, {
      fit: "cover",
      position: "centre",
    })
    .png()
    .toFile(outputPath);
}

function computeWarmthIndex(png) {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < png.data.length; i += 4) {
    const alpha = png.data[i + 3] / 255;
    if (alpha === 0) continue;
    const r = png.data[i] / 255;
    const b = png.data[i + 2] / 255;
    sum += (r - b) * alpha;
    count += 1;
  }
  return count === 0 ? 0 : sum / count;
}

async function compareSingle({ routeKey, canonicalPath, screenshotPath, viewport }) {
  const canonicalOutputPath = path.join(
    referenceOutDir,
    `${routeKey}-${viewportLabel(viewport)}-${path.basename(canonicalPath, ".png")}.png`,
  );

  await normalizeReference(canonicalPath, viewport.width, viewport.height, canonicalOutputPath);

  const [actual, expected] = await Promise.all([
    loadPng(screenshotPath),
    loadPng(canonicalOutputPath),
  ]);

  const diff = new PNG({ width: viewport.width, height: viewport.height });
  const mismatchPixels = pixelmatch(
    actual.data,
    expected.data,
    diff.data,
    viewport.width,
    viewport.height,
    {
      threshold: 0.18,
      includeAA: true,
    },
  );

  const totalPixels = viewport.width * viewport.height;
  const mismatchPercent = (mismatchPixels / totalPixels) * 100;
  const diffPath = path.join(
    diffOutDir,
    `${routeKey}-${viewportLabel(viewport)}-${path.basename(canonicalPath, ".png")}-diff.png`,
  );
  await fs.writeFile(diffPath, PNG.sync.write(diff));

  const actualWarmth = computeWarmthIndex(actual);
  const expectedWarmth = computeWarmthIndex(expected);
  const warmthDrift = Math.abs(actualWarmth - expectedWarmth);

  return {
    canonicalPath,
    canonicalOutputPath,
    diffPath,
    mismatchPixels,
    mismatchPercent,
    actualWarmth,
    expectedWarmth,
    warmthDrift,
  };
}

async function run() {
  await ensureDirectories();

  const results = [];
  for (const [routeKey, config] of Object.entries(routeConfig)) {
    for (const viewport of viewports) {
      const screenshotName = `${routeKey}-${viewportLabel(viewport)}.png`;
      const screenshotPath = path.join(capturesDir, screenshotName);

      const screenshotExists = await fs
        .access(screenshotPath)
        .then(() => true)
        .catch(() => false);

      if (!screenshotExists) {
        throw new Error(`Missing screenshot: ${screenshotPath}`);
      }

      const primaryCanonicalPath = path.join(repoRoot, config.canonical);
      const secondaryCanonicalPath = path.join(repoRoot, config.secondaryCanonical);

      const [primary, secondary] = await Promise.all([
        compareSingle({
          routeKey,
          canonicalPath: primaryCanonicalPath,
          screenshotPath,
          viewport,
        }),
        compareSingle({
          routeKey,
          canonicalPath: secondaryCanonicalPath,
          screenshotPath,
          viewport,
        }),
      ]);

      const pass =
        primary.mismatchPercent <= mismatchThresholdPercent &&
        primary.warmthDrift <= warmthDriftLimit;

      results.push({
        route: config.route,
        routeKey,
        viewport: viewportLabel(viewport),
        screenshotPath,
        primaryCanonical: primaryCanonicalPath,
        secondaryCanonical: secondaryCanonicalPath,
        selectedCanonical: primary.canonicalPath,
        selectedCanonicalNormalized: primary.canonicalOutputPath,
        selectedDiffPath: primary.diffPath,
        mismatchPixels: primary.mismatchPixels,
        mismatchPercent: Number(primary.mismatchPercent.toFixed(2)),
        secondaryMismatchPercent: Number(secondary.mismatchPercent.toFixed(2)),
        warmthDrift: Number(primary.warmthDrift.toFixed(4)),
        pass,
      });
    }
  }

  const sorted = [...results].sort((a, b) => b.mismatchPercent - a.mismatchPercent);
  const averageMismatch =
    results.reduce((acc, entry) => acc + entry.mismatchPercent, 0) / results.length;
  const passCount = results.filter((entry) => entry.pass).length;

  const report = {
    generatedAt: new Date().toISOString(),
    thresholdPercent: mismatchThresholdPercent,
    capturesDir,
    outputDir,
    averageMismatchPercent: Number(averageMismatch.toFixed(2)),
    passCount,
    totalCount: results.length,
    highestDrift: sorted.slice(0, 6),
    results,
  };

  const jsonPath = path.join(outputDir, "report.json");
  await fs.writeFile(jsonPath, JSON.stringify(report, null, 2));

  const markdown = [
    "# Canonical Screenshot Diff Report",
    "",
    `- Generated: ${report.generatedAt}`,
    `- Threshold: ${mismatchThresholdPercent}% mismatch`,
    `- Warmth drift limit: ${warmthDriftLimit}`,
    `- Average mismatch: ${report.averageMismatchPercent}%`,
    `- Pass rate: ${passCount}/${results.length}`,
    "",
    "## Highest Drift Regions",
    "",
    "| Route | Viewport | Mismatch % | Diff |",
    "| --- | --- | ---: | --- |",
    ...report.highestDrift.map(
      (item) =>
        `| ${item.route} | ${item.viewport} | ${item.mismatchPercent}% | ${path.relative(frontendRoot, item.selectedDiffPath)} |`,
    ),
    "",
    "## Full Matrix",
    "",
    "| Route | Viewport | Canonical Reference | Mismatch % | Warmth Drift | Status |",
    "| --- | --- | --- | ---: | --- |",
    ...results.map(
      (item) =>
        `| ${item.route} | ${item.viewport} | ${path.relative(repoRoot, item.selectedCanonical)} | ${item.mismatchPercent}% | ${item.warmthDrift} | ${item.pass ? "PASS" : "FAIL"} |`,
    ),
    "",
  ].join("\n");

  const markdownPath = path.join(outputDir, "report.md");
  await fs.writeFile(markdownPath, markdown);

  console.log(`Canonical diff report written to ${jsonPath}`);
  console.log(`Canonical diff markdown written to ${markdownPath}`);
  console.log(`Average mismatch: ${report.averageMismatchPercent}%`);
  console.log(`Pass rate: ${passCount}/${results.length}`);

  if (passCount !== results.length) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
