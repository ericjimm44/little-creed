/* ============================================================
   LITTLE CREED — art manifest
   The locked art style + every image to generate via fal.ai.
   Edit prompts here; generate-art.mjs reads this file.
   ============================================================ */

/* One style preamble prepended to EVERY prompt so the whole pack
   looks like it came from a single illustrator. */
export const STYLE =
  "children's storybook illustration, hand-drawn dark ink outlines, " +
  "warm aged parchment paper background with subtle paper texture, " +
  "vintage muted palette of cream, brick red, mustard gold, teal and navy blue, " +
  "soft flat cel shading with light cross-hatching, wholesome and friendly, " +
  "boxing academy adventure theme for kids aged 7 to 12, " +
  "clean composition, no text, no words, no letters, no watermark";

/* The recurring hero character — keep this identical everywhere. */
export const HERO =
  "a cheerful energetic 8-year-old boy boxer with light skin and short curly coily brown hair, " +
  "big friendly smile, wearing a teal sleeveless tank top, navy blue boxing shorts with a gold waistband, " +
  "and red boxing gloves";

const NEG =
  "photo, realistic, 3d render, text, letters, words, logo, watermark, " +
  "scary, violent, blood, adult, gore, deformed hands, extra limbs";

/* size presets fal understands (flux "image_size") */
const SQ = "square_hd";        // 1024x1024 — characters, emblems
const LAND = "landscape_16_9"; // gym scenes, comic panels

export const NEGATIVE = NEG;

export const IMAGES = [
  /* ---- Coach ---- */
  { name: "coach-duke", size: SQ,
    prompt: `friendly wise older boxing coach, bald with a short grey beard, warm smile, ` +
      `wearing a grey hoodie, circular head-and-shoulders portrait, centered` },

  /* ---- Hero kid poses (static hero art; the animated demo boxer stays SVG) ---- */
  { name: "hero-guard",   size: SQ, prompt: `${HERO}, standing in a proud boxing guard stance, hands up by his cheeks, full body, facing viewer` },
  { name: "hero-jab",     size: SQ, prompt: `${HERO}, throwing a straight jab punch with his left glove, dynamic action pose, full body` },
  { name: "hero-cross",   size: SQ, prompt: `${HERO}, throwing a powerful cross punch with his right glove, hips turning, full body` },
  { name: "hero-victory", size: SQ, prompt: `${HERO}, celebrating with both gloves raised triumphantly in the air, huge happy grin, full body` },

  /* ---- The 6 belt emblems (round medallion badges) ---- */
  { name: "belt-white",  size: SQ, prompt: `a round medallion badge for a white karate/boxing belt, small crossed boxing gloves emblem, gold rope border` },
  { name: "belt-yellow", size: SQ, prompt: `a round medallion badge for a yellow belt, small crossed boxing gloves emblem, gold rope border` },
  { name: "belt-orange", size: SQ, prompt: `a round medallion badge for an orange belt, small crossed boxing gloves emblem, gold rope border` },
  { name: "belt-green",  size: SQ, prompt: `a round medallion badge for a green belt, small crossed boxing gloves emblem, gold rope border` },
  { name: "belt-blue",   size: SQ, prompt: `a round medallion badge for a blue belt, small crossed boxing gloves emblem, gold rope border` },
  { name: "belt-red",    size: SQ, prompt: `a round medallion badge for a red belt with a small gold crown, crossed boxing gloves emblem, gold rope border` },

  /* ---- The 6 evolving gym scenes (wide, no characters) ---- */
  { name: "gym-1", size: LAND, prompt: `interior of a small humble garage boxing gym, a single hanging light bulb, a worn floor mat, bare walls, cozy but empty, wide view` },
  { name: "gym-2", size: LAND, prompt: `interior of a modest basement boxing gym, one red heavy punching bag hanging from the ceiling, a floor mat, brick wall, wide view` },
  { name: "gym-3", size: LAND, prompt: `interior of a lively neighborhood boxing gym, a heavy bag and a speed bag, vintage boxing posters on the walls, warm lighting, wide view` },
  { name: "gym-4", size: LAND, prompt: `interior of a real boxing gym with a proper boxing ring with red ropes in the center, a heavy bag, posters, trophies on a shelf, wide view` },
  { name: "gym-5", size: LAND, prompt: `interior of a champions boxing gym, a boxing ring, colorful championship banners hanging from the ceiling, a row of gold trophies, bright lights, wide view` },
  { name: "gym-6", size: LAND, prompt: `a packed championship boxing arena at night, a bright spotlit boxing ring in the center, cheering crowd in the stands, dramatic lights, wide view` },

  /* ---- Comic mission splash panels (one per belt chapter) ---- */
  { name: "panel-white",  size: LAND, prompt: `${HERO}, learning his boxing stance and guard, an older coach pointing encouragingly, comic book panel with a dynamic action burst` },
  { name: "panel-yellow", size: LAND, prompt: `${HERO}, gliding and moving his feet with motion lines, footwork practice, comic book panel with a dynamic action burst` },
  { name: "panel-orange", size: LAND, prompt: `${HERO}, throwing his first jab and cross punches at a bag, impact stars, comic book panel with a dynamic POW action burst` },
  { name: "panel-green",  size: LAND, prompt: `${HERO}, throwing powerful hooks and uppercuts, big impact effects, comic book panel with a dynamic BAM action burst` },
  { name: "panel-blue",   size: LAND, prompt: `${HERO}, slipping and dodging a punch with a cool confident look, motion swoosh lines, comic book panel with a WHOOSH action burst` },
  { name: "panel-red",    size: LAND, prompt: `${HERO}, standing tall as a smart ring general in the center of a boxing ring, crown sparkle, comic book panel with a dynamic action burst` },
];
