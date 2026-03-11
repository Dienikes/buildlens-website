import fs from 'fs';
import path from 'path';

const svgRaw = fs.readFileSync(path.resolve('src', 'assets', 'logo', 'buildlens-traced.svg'), 'utf8');

// Extract the d attribute from the path element
const dMatch = svgRaw.match(/d="([^"]+)"/);
if (!dMatch) { console.error('No path d attribute found'); process.exit(1); }

const fullD = dMatch[1];

// Split into subpaths by " M " (each subpath starts with M)
const subpaths = [];
let current = '';
const tokens = fullD.split(/(?= M )/);
for (const t of tokens) {
  subpaths.push(t.trim());
}

// Categorize each subpath by its starting Y coordinate
const categorized = subpaths.map(sp => {
  const yMatch = sp.match(/^M\s+[\d.]+\s+([\d.]+)/);
  const y = yMatch ? parseFloat(yMatch[1]) : 999;
  const xMatch = sp.match(/^M\s+([\d.]+)/);
  const x = xMatch ? parseFloat(xMatch[1]) : 0;
  return { path: sp, y, x };
});

console.log('All subpaths:');
categorized.forEach((c, i) => {
  console.log(`  ${i}: x=${c.x.toFixed(0)} y=${c.y.toFixed(0)} len=${c.path.length}`);
});

// Categories:
// Monogram: y < 500 (the BL letters + lens circle)
// Wordmark text: 500 <= y < 610 (BUILDLENS)
// Tagline text: 610 <= y < 660 (CONSTRUCTION LOGISTICS)
// Star/watermark: y >= 660

const monogramPaths = categorized.filter(c => c.y < 500);
const wordmarkPaths = categorized.filter(c => c.y >= 500 && c.y < 610);
const taglinePaths = categorized.filter(c => c.y >= 610 && c.y < 660);
const starPaths = categorized.filter(c => c.y >= 660);

console.log(`\nMonogram: ${monogramPaths.length} subpaths`);
console.log(`Wordmark: ${wordmarkPaths.length} subpaths`);
console.log(`Tagline: ${taglinePaths.length} subpaths`);
console.log(`Star (removed): ${starPaths.length} subpaths`);

function buildSVG(paths, padding = 10) {
  const d = paths.map(p => p.path).join(' ');

  // Calculate bounding box from all coordinates
  const allCoords = [];
  const coordRegex = /[\d.]+/g;
  let match;
  for (const p of paths) {
    const nums = p.path.match(/[\d.]+/g) || [];
    for (let i = 0; i < nums.length - 1; i += 2) {
      allCoords.push({ x: parseFloat(nums[i]), y: parseFloat(nums[i + 1]) });
    }
  }

  const xs = allCoords.map(c => c.x);
  const ys = allCoords.map(c => c.y);
  const minX = Math.min(...xs) - padding;
  const minY = Math.min(...ys) - padding;
  const maxX = Math.max(...xs) + padding;
  const maxY = Math.max(...ys) + padding;
  const w = maxX - minX;
  const h = maxY - minY;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX.toFixed(0)} ${minY.toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}" fill="currentColor">
  <path d="${d}" fill-rule="evenodd"/>
</svg>`;
}

const outDir = path.resolve('src', 'assets', 'logo');

// 1. Full logo (monogram + wordmark + tagline, NO star)
const fullPaths = [...monogramPaths, ...wordmarkPaths, ...taglinePaths];
fs.writeFileSync(path.join(outDir, 'buildlens-full.svg'), buildSVG(fullPaths));
console.log('\nWrote buildlens-full.svg');

// 2. Wordmark (monogram + BUILDLENS text, no tagline)
const wmPaths = [...monogramPaths, ...wordmarkPaths];
fs.writeFileSync(path.join(outDir, 'buildlens-wordmark.svg'), buildSVG(wmPaths));
console.log('Wrote buildlens-wordmark.svg');

// 3. Monogram only (BL)
fs.writeFileSync(path.join(outDir, 'buildlens-monogram.svg'), buildSVG(monogramPaths));
console.log('Wrote buildlens-monogram.svg');

// 4. Favicon (monogram in 32x32 viewBox)
const monoD = monogramPaths.map(p => p.path).join(' ');
const monoCoords = [];
for (const p of monogramPaths) {
  const nums = p.path.match(/[\d.]+/g) || [];
  for (let i = 0; i < nums.length - 1; i += 2) {
    monoCoords.push({ x: parseFloat(nums[i]), y: parseFloat(nums[i + 1]) });
  }
}
const mxs = monoCoords.map(c => c.x);
const mys = monoCoords.map(c => c.y);
const mMinX = Math.min(...mxs) - 5;
const mMinY = Math.min(...mys) - 5;
const mW = Math.max(...mxs) - mMinX + 10;
const mH = Math.max(...mys) - mMinY + 10;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mMinX.toFixed(0)} ${mMinY.toFixed(0)} ${mW.toFixed(0)} ${mH.toFixed(0)}" width="32" height="32" fill="currentColor">
  <path d="${monoD}" fill-rule="evenodd"/>
</svg>`;
fs.writeFileSync(path.resolve('public', 'favicon.svg'), faviconSvg);
console.log('Wrote public/favicon.svg');

// Report sizes
for (const f of ['buildlens-full.svg', 'buildlens-wordmark.svg', 'buildlens-monogram.svg']) {
  const size = fs.statSync(path.join(outDir, f)).size;
  console.log(`  ${f}: ${(size / 1024).toFixed(1)} KB`);
}
const favSize = fs.statSync(path.resolve('public', 'favicon.svg')).size;
console.log(`  public/favicon.svg: ${(favSize / 1024).toFixed(1)} KB`);
