# LITTLE CREED — Boxing Academy for Kids (7–12)

Not a fitness app. A **journey**: it takes a complete beginner from
"I don't know how to throw a jab" to "I move like a real boxer" — one
mission at a time. Kids come back not for workouts, but because they're
*becoming someone*.

- **Identity:** "I'm becoming a boxer."
- **Story:** "I'm training to become a champion."
- **Progression:** every mission unlocks the next skill.
- **Mastery:** nothing advances until the previous skill is done.

## The journey

A 24-mission curriculum across six belts, each mission teaching **one
concept** — stance → guard → balance → footwork → movement → pivot →
jab → moving jab → cross → one-two → hooks → uppercuts → combinations →
body shots → slips → rolls → blocks → counters → angles → ring IQ.

Every mission is the same adventure arc:

1. **Coach Duke's intro** — why this skill matters, in kid language.
2. **Learn it** — step-by-step technique with an animated demo boxer.
3. **Watch out!** — the common mistakes, framed as funny traps.
4. **Practice rounds** — a real round timer (work/rest, bell sounds).
5. **Mini-game** — Quick Hands (reaction), Combo Caller (memory), or
   Slip School (decision speed), matched to the skill being learned.
6. **Celebration** — confetti, XP, coins, and sometimes a new belt.

## The evolving gym

Instead of a progress bar, the child's **gym grows with them** — from a
garage with one bulb, to a neighborhood gym, to a ring, banners and
trophies, and finally a packed arena on Championship Night. Skills
mastered are what build it.

## Also inside

- **Training Camp** — a fresh, age-appropriate training day generated
  daily: warm-up, footwork, shadowboxing, reaction games, kid-strength
  moves and a cool-down, each with its own station timer.
- **Rewards** — XP, coins, belts, daily streaks and achievement badges;
  coins buy gloves, trunks and headbands for the avatar.
- **Coach Duke** — encourages, celebrates, welcomes kids back after
  missed days (never shames), and pops in when the gym levels up.
- **Parents' Corner** — gated behind a grown-ups-only question: progress
  per belt, practice minutes for the last 7 days, milestones, and
  safety/coaching tips. All data stays on the device (localStorage).

## Safety by design

100% shadowboxing and bodyweight play. No contact, no sparring, no
equipment needed. Short rounds with built-in rests and water breaks.

## Running it

**Live app:** https://ericjimm44.github.io/little-creed/ — on a phone use
*Add to Home Screen* and it runs full-screen with its own icon, offline.

For local development there's no build step and no dependencies:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Pushes to `main` deploy automatically
to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

## Stack

Vanilla HTML/CSS/JS. All artwork is inline SVG (the demo boxer, Coach
Duke and the evolving gym are drawn and animated in code). Sounds are
synthesized with the Web Audio API — no assets to download.

---

*Not affiliated with any film or studio. Not medical advice — kids
should train in a clear space, with a grown-up nearby.*
