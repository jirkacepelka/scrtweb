/**
 * Renders PNG versions of the logo SVGs in public/brand/ for the Brand assets page.
 * Run after changing a logo SVG: node scripts/generate-logo-pngs.mjs
 */
import sharp from "sharp";

const dir = "public/brand";
const sizes = { symbol: 512, wordmark: 1600 };

for (const [name, width] of Object.entries(sizes)) {
  for (const colour of ["white", "black", "orange"]) {
    const src = `${dir}/secret-${name}-${colour}.svg`;
    await sharp(src, { density: 600 }).resize({ width }).png().toFile(src.replace(".svg", ".png"));
    console.log("wrote", src.replace(".svg", ".png"));
  }
}
