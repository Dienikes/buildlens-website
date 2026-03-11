/**
 * Captures 4 product screenshots from product-screenshots.jsx
 * Uses Playwright + React CDN to render the component headlessly
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// Read the JSX source
const jsxSource = readFileSync(resolve(projectRoot, 'product-screenshots.jsx'), 'utf-8');

// Convert JSX to plain JS by:
// 1. Removing the React import (we'll use CDN)
// 2. Converting className to class for inline approach
// Actually, we'll just use Babel standalone in-browser to transpile JSX

const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; padding: 0; background: #05060A; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module">
    const { useState } = React;
    ${jsxSource.replace("import React, { useState } from 'react';", '')}
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(ProductScreenshots));
  </script>
</body>
</html>`;

// Write temp HTML file
const tmpHtmlPath = resolve(projectRoot, 'scripts', '_tmp-screenshots.html');
writeFileSync(tmpHtmlPath, htmlContent);

const outputDir = resolve(projectRoot, 'src', 'assets', 'images');
mkdirSync(outputDir, { recursive: true });

const screenshots = [
  { index: 0, name: 'screenshot-gantt.png' },
  { index: 1, name: 'screenshot-dashboard.png' },
  { index: 2, name: 'screenshot-pipeline.png' },
  { index: 3, name: 'screenshot-rfi.png' },
];

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Loading page...');
  await page.goto(`file://${tmpHtmlPath.replace(/\\\\/g, '/')}`, { waitUntil: 'networkidle' });

  // Wait for fonts to load and React to render
  await page.waitForTimeout(3000);

  // Get all screenshot sections (the browser-chrome wrappers)
  const sections = await page.$$('.screenshot-section .browser-chrome');
  console.log(`Found ${sections.length} screenshot sections`);

  for (const shot of screenshots) {
    if (shot.index < sections.length) {
      const outputPath = resolve(outputDir, shot.name);
      await sections[shot.index].screenshot({ path: outputPath });
      console.log(`Captured: ${shot.name}`);
    } else {
      console.warn(`Section ${shot.index} not found, skipping ${shot.name}`);
    }
  }

  await browser.close();

  // Clean up temp file
  const { unlinkSync } = await import('fs');
  try { unlinkSync(tmpHtmlPath); } catch {}

  console.log('Done! Screenshots saved to src/assets/images/');
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
