# Little Creed — AI art pipeline (fal.ai)

Generates the illustrated art (hero kid, Coach Duke, evolving-gym scenes,
belt emblems, comic mission panels) and bakes them into the app as static
files — so the app stays fast, free to run, and fully offline. The app
never calls fal.ai at runtime; only these tools do, once.

## Character (locked)

A cheerful 8-year-old **boy** boxer, **light skin**, short **curly/coily**
brown hair, teal tank top, navy trunks with a gold waistband, red gloves.
Defined once as `HERO` in `art-manifest.mjs` and reused in every prompt.

## Prerequisites (set up in the environment, then start a NEW session)

1. **fal.ai API key** → environment variable `FAL_KEY`.
2. **Network access** to: `queue.fal.run`, `fal.run`, `fal.media`, `v3.fal.media`.

Env-var and network changes usually apply only to a freshly-started
session, not a running one.

## Run it

```sh
node tools/generate-art.mjs            # generate every missing image → img/
node tools/generate-art.mjs --force    # regenerate everything
node tools/generate-art.mjs coach-duke # just one (to test the style first)
```

Model defaults to `fal-ai/flux/dev`; override with `MODEL=…`.
Edit prompts in `tools/art-manifest.mjs`.

## After generating

1. Eyeball `img/`. Re-run any weak ones with `--force <name>`.
2. Shrink for the web (target < ~150 KB each). If Pillow is available:
   `python3 tools/optimize-art.py`
3. Wire into the app (done by Claude): the generated images replace the
   drawn-in-code art on the journey hero card, Coach Duke portrait, the six
   gym stages, belt medallions, and mission intro panels. The **animated
   demo boxer** in lessons stays as SVG so it keeps moving.
4. Bump the service-worker cache version in `sw.js` and add the new files to
   its asset list, then push. GitHub Pages redeploys automatically.

## Cost

~24 images at a few cents each ≈ a couple of dollars for the full pack.
