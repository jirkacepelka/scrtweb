/**
 * Pulls the official Secret dApp registry (the list behind dash.scrt.network/apps) and
 * normalises every app icon into a square 256px WebP tile.
 *
 *   node scripts/sync-ecosystem.mjs
 *
 * Writes:
 *   public/ecosystem/<slug>.webp          app icons, opaque square tiles
 *   src/data/ecosystem.generated.json     name, slug, link, description, tags, icon
 *
 * Don't edit the generated JSON by hand. Hide, feature or re-label apps in src/data/ecosystem.ts.
 * Source: https://github.com/SecretFoundation/DappRegistry
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const RAW = "https://raw.githubusercontent.com/SecretFoundation/DappRegistry/main";
const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const SIZE = 256;
const DARK_TILE = { r: 22, g: 22, b: 22 };
const LIGHT_TILE = { r: 244, g: 243, b: 241 };

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Average luminance of the visible (non-transparent) pixels, 0..255. */
async function visibleLuminance(buf) {
  const { data } = await sharp(buf).resize(64, 64, { fit: "inside" }).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  let sum = 0;
  let n = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 40) continue;
    sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    n++;
  }
  return n ? sum / n : 255;
}

async function normalise(buf, isSvg) {
  const input = sharp(buf, isSvg ? { density: 400 } : {});
  const meta = await input.metadata();
  const transparent = isSvg || meta.hasAlpha;

  if (!transparent) {
    // Opaque square logos already have their own background: just crop to a square.
    return sharp(buf).resize(SIZE, SIZE, { fit: "cover" }).webp({ quality: 90 }).toBuffer();
  }
  // Transparent marks: place on a tile that contrasts with the mark itself.
  const bg = (await visibleLuminance(await input.png().toBuffer())) < 90 ? LIGHT_TILE : DARK_TILE;
  const inner = Math.round(SIZE * 0.68);
  const mark = await sharp(buf, isSvg ? { density: 400 } : {})
    .resize(inner, inner, { fit: "contain", background: { ...bg, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: SIZE, height: SIZE, channels: 3, background: bg } })
    .composite([{ input: mark, gravity: "center" }])
    .webp({ quality: 90 })
    .toBuffer();
}

/** Secret's own products use the generic black logo in the registry; give them a brand tile. */
async function brandTile() {
  const src = await (
    await import("node:fs/promises")
  ).readFile(root("src/components/ui/logo-paths.ts"), "utf8");
  const symbol = src.match(/symbolPath =\s*"([^"]+)"/)[1];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffc4ad"/><stop offset=".45" stop-color="#ff7d4a"/><stop offset="1" stop-color="#ff3912"/>
    </linearGradient></defs>
    <rect width="256" height="256" fill="#0d0d0d"/>
    <path d="${symbol}" fill="url(#g)" transform="translate(56 55) scale(5.85)"/>
  </svg>`;
  return sharp(Buffer.from(svg)).resize(SIZE, SIZE).webp({ quality: 92 }).toBuffer();
}
const isSecretLogo = (icon) => /SECRET_BLACK-ICON/i.test(icon);

const registry = await (await fetch(`${RAW}/dAppRegistry.json`)).json();
await mkdir(root("public/ecosystem"), { recursive: true });

const apps = [];
for (const app of registry) {
  const slug = slugify(app.name);
  const url = `${RAW}/${app.icon.replace(/^\/+/, "")}`;
  try {
    if (isSecretLogo(app.icon)) {
      await writeFile(root(`public/ecosystem/${slug}.webp`), await brandTile());
      throw { skip: true };
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(
      root(`public/ecosystem/${slug}.webp`),
      await normalise(buf, url.endsWith(".svg")),
    );
  } catch (err) {
    if (!err?.skip) {
      console.warn(`! ${app.name}: icon failed (${err.message})`);
      continue;
    }
  }
  apps.push({
    name: app.name.trim(),
    slug,
    link: app.link,
    description: app.description.trim(),
    tags: (app.tags ?? []).filter(Boolean),
    icon: `/ecosystem/${slug}.webp`,
  });
  console.log(`✓ ${app.name}`);
}

await writeFile(root("src/data/ecosystem.generated.json"), JSON.stringify(apps, null, 2) + "\n");
console.log(`\n${apps.length} apps written to src/data/ecosystem.generated.json`);
