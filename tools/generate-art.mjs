/* ============================================================
   LITTLE CREED — art generator (fal.ai)
   Generates every image in art-manifest.mjs and saves PNGs to img/.
   Idempotent: skips images that already exist (use --force to redo).

   Requires:
     - env FAL_KEY  (your fal.ai API key)
     - network access to queue.fal.run + fal.media / v3.fal.media

   Usage:
     node tools/generate-art.mjs                 # generate missing
     node tools/generate-art.mjs --force         # regenerate all
     node tools/generate-art.mjs coach-duke gym-1  # only named images
     MODEL=fal-ai/flux-pro/v1.1 node tools/generate-art.mjs   # override model
   ============================================================ */

import { writeFile, mkdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { STYLE, NEGATIVE, IMAGES } from "./art-manifest.mjs";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "img");
const KEY = process.env.FAL_KEY;
const MODEL = process.env.MODEL || "fal-ai/flux/dev";
const BASE = "https://queue.fal.run";

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

if (!KEY) {
  console.error("✗ FAL_KEY is not set. Add it as an environment variable and retry.");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);

async function fal(path, opts = {}) {
  const res = await fetch(`${BASE}/${path}`, {
    ...opts,
    headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  if (!res.ok) throw new Error(`fal ${res.status} on ${path}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

async function generateOne(item) {
  const dest = join(OUT, `${item.name}.png`);
  if (!FORCE && (await exists(dest))) { console.log(`• skip ${item.name} (exists)`); return; }

  const prompt = `${item.prompt}. ${STYLE}`;
  // submit to queue
  const sub = await fal(MODEL, {
    method: "POST",
    body: JSON.stringify({
      prompt,
      negative_prompt: NEGATIVE,
      image_size: item.size,
      num_images: 1,
      enable_safety_checker: true,
      output_format: "png",
    }),
  });
  const id = sub.request_id;
  process.stdout.write(`… ${item.name} `);

  // poll status
  let out = null;
  for (let i = 0; i < 90; i++) {
    const st = await fal(`${MODEL}/requests/${id}/status`);
    if (st.status === "COMPLETED") { out = await fal(`${MODEL}/requests/${id}`); break; }
    if (st.status === "FAILED" || st.status === "ERROR") throw new Error(`generation failed for ${item.name}`);
    process.stdout.write(".");
    await sleep(2000);
  }
  if (!out) throw new Error(`timed out waiting for ${item.name}`);

  const url = out?.images?.[0]?.url;
  if (!url) throw new Error(`no image url for ${item.name}`);
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  await writeFile(dest, buf);
  console.log(` ✓ saved img/${item.name}.png (${(buf.length / 1024).toFixed(0)} KB)`);
}

(async () => {
  await mkdir(OUT, { recursive: true });
  const list = only.length ? IMAGES.filter((i) => only.includes(i.name)) : IMAGES;
  if (!list.length) { console.error("No matching images in manifest."); process.exit(1); }
  console.log(`Generating ${list.length} image(s) with ${MODEL}…\n`);
  let ok = 0, fail = 0;
  for (const item of list) {
    try { await generateOne(item); ok++; }
    catch (e) { console.error(`✗ ${item.name}: ${e.message}`); fail++; }
  }
  console.log(`\nDone. ${ok} ok, ${fail} failed. Images in tools/../img/`);
  console.log("Next: shrink them (tools/optimize-art.mjs), then wire into the app.");
})();
