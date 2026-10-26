/**
 * Generates favicon.svg, apple-touch-icon.png and og-default.png from the logo paths.
 * Run after changing the logo or brand colours:  node scripts/generate-brand-assets.mjs
 * Uses `sharp`, which ships with Astro.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const src = await readFile(new URL("../src/components/ui/logo-paths.ts", import.meta.url), "utf8");
const symbol = src.match(/symbolPath =\s*"([^"]+)"/)[1];
const wordmark = src.match(/wordmarkPath =\s*"([^"]+)"/)[1];

const INK = "#050505";
const ORANGE = "#ff3912";
const FG = "#f4f3f1";
const out = (p) => fileURLToPath(new URL(`../public/${p}`, import.meta.url));

// Favicon: orange mark on a rounded dark tile.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${INK}"/>
  <path d="${symbol}" fill="${ORANGE}" transform="translate(4.2 4) scale(0.96)"/>
</svg>`;
await writeFile(out("favicon.svg"), favicon);
await sharp(Buffer.from(favicon.replace('rx="7"', 'rx="0"')), { density: 600 })
  .resize(180, 180)
  .png()
  .toFile(out("apple-touch-icon.png"));

// Open Graph image, 1200x630.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="0.85" cy="0.1" r="0.8">
      <stop offset="0" stop-color="${ORANGE}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="m" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffc4ad"/><stop offset="0.4" stop-color="#ff7d4a"/>
      <stop offset="0.8" stop-color="${ORANGE}"/><stop offset="1" stop-color="#b32000"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(80 80) scale(2.4)" fill="${FG}"><path d="${symbol}"/><path d="${wordmark}"/></g>
  <text x="80" y="470" font-family="Geist, Arial, sans-serif" font-size="88" font-weight="600" letter-spacing="-3" fill="${FG}">Privacy for everyone.</text>
  <text x="80" y="540" font-family="Geist, Arial, sans-serif" font-size="32" fill="#a3a3a3">Get SCRT, stake it, and use apps that keep your data encrypted.</text>
  <path d="${symbol}" fill="url(#m)" transform="translate(860 110) scale(11)" opacity="0.95"/>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(out("og-default.png"));

console.log("Generated favicon.svg, apple-touch-icon.png, og-default.png");
