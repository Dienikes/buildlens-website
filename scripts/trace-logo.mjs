import potrace from 'potrace';
import fs from 'fs';
import path from 'path';

const srcPng = path.resolve('..', 'OneDrive', 'Desktop', 'BuildLens Website', 'buildlens-logo.png');
const outDir = path.resolve('src', 'assets', 'logo');

// Trace with blackOnWhite=false to extract light elements on dark bg
potrace.trace(srcPng, {
  threshold: 120,
  turdSize: 3,
  optTolerance: 0.3,
  color: 'currentColor',
  background: 'transparent',
  blackOnWhite: false,
}, (err, svg) => {
  if (err) { console.error('Trace error:', err); process.exit(1); }
  fs.writeFileSync(path.join(outDir, 'buildlens-traced.svg'), svg);
  console.log('Traced logo (inverted) to buildlens-traced.svg');
  console.log('Size:', svg.length, 'bytes');
});
