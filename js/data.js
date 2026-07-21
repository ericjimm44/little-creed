/* ============================================================
   LITTLE CREED — data
   Curriculum, coach lines, training camp pools, gym stages,
   shop items and badges. No logic in this file.
   ============================================================ */

/* ---------- Belts (curriculum chapters) ---------- */
const BELTS = [
  { id: "white",  name: "White Belt",  title: "The First Bell",    color: "#f6f3ec", ink: "#3b3b3b" },
  { id: "yellow", name: "Yellow Belt", title: "Learning to Move",  color: "#ffd34d", ink: "#6b4d00" },
  { id: "orange", name: "Orange Belt", title: "First Punches",     color: "#ff9a3d", ink: "#7a3c00" },
  { id: "green",  name: "Green Belt",  title: "Power School",      color: "#5ecb73", ink: "#0e4d20" },
  { id: "blue",   name: "Blue Belt",   title: "The Defense",       color: "#5aa9ff", ink: "#0b3a75" },
  { id: "red",    name: "Red Belt",    title: "Ring IQ",           color: "#ff5a5a", ink: "#6d0d0d" },
];

/* ---------- Skills (one concept per mission) ----------
   pose  — which animation the demo boxer performs
   game  — which mini-game ends the mission
   drill — the practice-timer block (seconds)             */
const SKILLS = [

  /* ===== WHITE BELT — The First Bell ===== */
  {
    id: "stance", belt: 0, name: "The Fighting Stance", emoji: "🦶",
    tagline: "Every champion starts with how they stand.",
    coach: "Welcome to the gym, champ! Before you ever throw a punch, you learn how to STAND. A boxer's stance is like the roots of a tree — strong, steady, ready for anything.",
    steps: [
      { t: "Feet apart", d: "Stand with your feet as wide as your shoulders — like you're standing on train tracks." },
      { t: "Step back", d: "Slide your right foot back a small step (lefties: left foot back). Front toes point at your target." },
      { t: "Bend your knees", d: "Soft knees, like you're about to sit on an invisible chair. Springy, never stiff!" },
      { t: "Chin down, hands up", d: "Tuck your chin like you're holding a tennis ball under it. Hands float up by your cheeks." },
    ],
    mistakes: [
      { t: "Feet on a tightrope", d: "If your feet line up one behind the other you'll tip over. Keep them on the train tracks!" },
      { t: "Standing like a statue", d: "Straight, locked knees are slow knees. Stay bouncy." },
    ],
    drill: { name: "Statue → Stance", desc: "Walk around your room. When the bell rings, SNAP into your perfect stance and freeze for 3 seconds. Repeat until the round ends.", rounds: 3, work: 30, rest: 15 },
    pose: "stance", game: "quickHands", xp: 60,
  },
  {
    id: "guard", belt: 0, name: "The Guard", emoji: "🛡️",
    tagline: "Your hands are your castle walls.",
    coach: "A boxer's guard is a shield you carry everywhere. Hands up means you're safe — and hands up means you're ready. The number one rule of the gym: protect yourself at all times!",
    steps: [
      { t: "Gloves to your cheeks", d: "Bring both fists up so your knuckles touch your cheekbones. Like holding a phone to each ear!" },
      { t: "Elbows in", d: "Squeeze your elbows close to your ribs — they guard your body like doors." },
      { t: "Look through the window", d: "Peek out between your gloves. You can always see your target." },
      { t: "Stay relaxed", d: "Shoulders loose, not squeezed up to your ears. A tight boxer is a tired boxer." },
    ],
    mistakes: [
      { t: "Droopy hands", d: "Hands that fall to your belly can't protect your head. Cheeks, not chest!" },
      { t: "Chicken wings", d: "Elbows sticking out sideways leave your ribs open. Tuck them in." },
    ],
    drill: { name: "The Mirror Guard", desc: "Stand in your stance with a perfect guard. Slowly count to ten out loud without letting your hands drop even one centimeter. Shake out, reset, repeat.", rounds: 3, work: 30, rest: 15 },
    pose: "guard", game: "quickHands", xp: 60,
  },
  {
    id: "balance", belt: 0, name: "Rock-Solid Balance", emoji: "⚖️",
    tagline: "A boxer who can't be tipped can't be stopped.",
    coach: "Great boxers are impossible to push over. Today we train your secret superpower: balance. Your legs learn to be springs and anchors at the same time.",
    steps: [
      { t: "Weight in the middle", d: "In your stance, feel your weight resting evenly between both feet — not leaning forward or back." },
      { t: "Heels light", d: "Your back heel floats a tiny bit off the floor, like there's a grape under it you don't want to squish." },
      { t: "Freeze test", d: "Lift your front foot for one second. Put it down. Lift the back foot. A balanced stance barely wobbles." },
      { t: "Head over your belt", d: "Keep your head stacked above your belly button. If your head leans past your knees, you're tipping!" },
    ],
    mistakes: [
      { t: "Leaning tower", d: "Leaning way forward to reach makes you easy to tip. Move your feet instead of leaning." },
      { t: "Crossing your feet", d: "Crossed feet = tangled feet. They never cross, ever." },
    ],
    drill: { name: "Flamingo Rounds", desc: "Stand on one leg in your guard for 10 slow seconds, then switch legs. Too easy? Close your eyes for the last 3 seconds!", rounds: 3, work: 30, rest: 15 },
    pose: "balance", game: "quickHands", xp: 70,
  },
  {
    id: "footposition", belt: 0, name: "Champion Feet", emoji: "👣",
    tagline: "Where your feet go, your power goes.",
    coach: "Punches come from your FEET, not your arms — that's a real boxing secret. Today your feet learn their home position so power can travel from the floor to your fists.",
    steps: [
      { t: "Front toes forward", d: "Your front foot points at your target, turned in just a little — like it's shy." },
      { t: "Back foot at an angle", d: "Your back foot turns out sideways, about as much as the hands of a clock at 2 o'clock." },
      { t: "Stay on the balls", d: "Weight on the front-middle part of your feet, ready to move — never flat and heavy on your heels." },
      { t: "Same width, always", d: "After every move, your feet return home: shoulder-width, one in front. Home base!" },
    ],
    mistakes: [
      { t: "Duck feet", d: "Both toes pointing sideways drains your power. Front toes at the target." },
      { t: "Giant steps", d: "Big hops break your stance. Boxers take small, quiet steps." },
    ],
    drill: { name: "Home Base", desc: "Scatter and stomp around the room. On the bell, jump into perfect foot position without looking down. Then peek — did your feet find home?", rounds: 3, work: 30, rest: 15 },
    pose: "stance", game: "quickHands", xp: 70,
  },

  /* ===== YELLOW BELT — Learning to Move ===== */
  {
    id: "forward", belt: 1, name: "Marching Forward", emoji: "⬆️",
    tagline: "Step forward like you own the ring.",
    coach: "Time to move! Boxers glide — they never walk or run in the ring. The rule is simple: the foot closest to where you're going moves FIRST, and the other foot slides after it.",
    steps: [
      { t: "Front foot first", d: "Going forward? Your front foot takes a small step first." },
      { t: "Back foot follows", d: "Slide your back foot the same distance, so your stance stays the exact same size." },
      { t: "Step-slide, step-slide", d: "Say it while you do it: 'step... slide'. Smooth as an ice skater." },
      { t: "Guard stays up", d: "Your hands don't know you're moving. Cheeks guarded the whole time!" },
    ],
    mistakes: [
      { t: "Bouncing bunny hops", d: "Both feet in the air = no balance. One foot always touches the floor." },
      { t: "Stance shrinks", d: "If the back foot doesn't follow, your feet end up together. Keep the train tracks!" },
    ],
    drill: { name: "Glide Practice", desc: "Pick a line on the floor. Step-slide forward along it for the whole round — small steps, hands up, quiet feet like a ninja.", rounds: 3, work: 30, rest: 15 },
    pose: "forward", game: "quickHands", xp: 80,
  },
  {
    id: "backward", belt: 1, name: "The Getaway", emoji: "⬇️",
    tagline: "Moving back isn't retreating — it's reloading.",
    coach: "Champions know when to step back — not because they're scared, but to make the other glove miss! Backward is just forward in reverse: back foot leads the way.",
    steps: [
      { t: "Back foot first", d: "Going backward? The back foot steps first this time." },
      { t: "Front foot follows", d: "Slide the front foot back the same distance. Stance stays the same size." },
      { t: "Don't look down", d: "Eyes stay forward on your target — your feet know the way." },
      { t: "Stay tall-ish", d: "Knees bent, but don't lean backward like you're falling. Head over your belt." },
    ],
    mistakes: [
      { t: "The panic run", d: "Turning around or running backward means you can't see! Always glide facing forward." },
      { t: "Heel landing", d: "Landing hard on your heels tips you backward. Stay on the balls of your feet." },
    ],
    drill: { name: "Forward & Back", desc: "Step-slide forward 3 times, then backward 3 times, back to where you started. Repeat all round. Finish exactly on your starting spot!", rounds: 3, work: 30, rest: 15 },
    pose: "backward", game: "quickHands", xp: 80,
  },
  {
    id: "lateral", belt: 1, name: "Side-to-Side", emoji: "↔️",
    tagline: "Slide sideways and disappear from trouble.",
    coach: "Now the fun one — moving sideways! In the ring, going side-to-side makes you hard to catch, like a crab that took boxing lessons. Same rule: nearest foot moves first.",
    steps: [
      { t: "Left means left foot", d: "Moving left? Left foot steps first, right foot slides after." },
      { t: "Right means right foot", d: "Moving right? Right foot leads, left foot follows." },
      { t: "Never cross", d: "Your feet NEVER cross each other. Cross feet and you trip yourself." },
      { t: "Small quiet steps", d: "Little slides, staying low and springy. No big leaps." },
    ],
    mistakes: [
      { t: "The scissor step", d: "Crossing one foot over the other tangles your legs. Step-slide only." },
      { t: "Standing up tall", d: "Popping up straight while you slide steals your spring. Stay in your stance." },
    ],
    drill: { name: "Crab Boxing", desc: "Slide 3 steps left, 3 steps right, all round long. Keep your eyes forward and your guard glued to your cheeks.", rounds: 3, work: 30, rest: 15 },
    pose: "lateral", game: "quickHands", xp: 80,
  },
  {
    id: "pivot", belt: 1, name: "The Pivot", emoji: "🌀",
    tagline: "Spin like a door and make the whole ring yours.",
    coach: "The pivot is boxing magic. You swing your back leg around like a door on a hinge — and suddenly you're facing a whole new direction while everyone else is still turning around!",
    steps: [
      { t: "Front foot is the hinge", d: "All your weight goes onto the ball of your front foot. That foot stays put — it's the door hinge." },
      { t: "Swing the back leg", d: "Sweep your back foot around behind you, like drawing a rainbow on the floor with your toes." },
      { t: "Quarter turn", d: "Start small: turn just a quarter of a circle. Land back in your perfect stance." },
      { t: "Guard up the whole spin", d: "Hands stay home on your cheeks while your feet do the magic." },
    ],
    mistakes: [
      { t: "Flat-foot spin", d: "Pivoting on a flat foot squeaks and sticks. Spin on the BALL of your foot." },
      { t: "The helicopter", d: "Spinning your whole body wildly loses your stance. The hinge foot never travels." },
    ],
    drill: { name: "Compass Drill", desc: "Pivot a quarter turn, freeze in your stance, check your feet. Keep pivoting the same way until you've drawn a full circle — then go the other way!", rounds: 3, work: 30, rest: 15 },
    pose: "pivot", game: "quickHands", xp: 90,
  },

  /* ===== ORANGE BELT — First Punches ===== */
  {
    id: "jab", belt: 2, name: "The Jab", emoji: "🥊",
    tagline: "The most important punch in all of boxing.",
    coach: "The moment you've trained for — your FIRST punch! The jab is your front hand shooting straight out like an arrow. It's not the strongest punch, but it's the smartest. Every great combination starts with it.",
    steps: [
      { t: "Shoot straight out", d: "Your front fist fires in a straight line, like a dart — no swinging, no winding up." },
      { t: "Turn the glove", d: "As your arm straightens, rotate your fist so your palm faces the floor. Like turning a doorknob." },
      { t: "Snap it back", d: "The jab comes back even FASTER than it goes out — straight back to your cheek." },
      { t: "Other hand stays home", d: "While one glove works, the other guards your cheek. Always." },
    ],
    mistakes: [
      { t: "The wind-up", d: "Pulling your fist back first tells everyone the punch is coming. Fire from your guard!" },
      { t: "Leaving it out there", d: "A jab that hangs in the air comes home late. Out fast, back faster." },
    ],
    drill: { name: "100 Arrows", desc: "Shadowbox jabs at your own pace: jab, snap back, reset. Make each one straight and quick. Quality over speed — every jab starts and ends at your cheek.", rounds: 3, work: 40, rest: 20 },
    pose: "jab", game: "comboCall", xp: 100,
  },
  {
    id: "movingjab", belt: 2, name: "The Moving Jab", emoji: "🏃",
    tagline: "Hit without getting hit — the whole secret of boxing.",
    coach: "Today we join your two superpowers: moving AND jabbing at the same time. Step and punch land together — that's how a small glove hits with big power.",
    steps: [
      { t: "Step and punch together", d: "As your front foot steps forward, your jab shoots out. They land at the SAME moment — step-POW!" },
      { t: "Slide completes it", d: "Your back foot slides up as the jab snaps back. You're back in your stance, ready again." },
      { t: "Jab going backward too", d: "You can even jab while stepping back — that surprises everyone." },
      { t: "Eyes on target", d: "Pick a spot (a pillow, a shadow) and make every moving jab aim at it." },
    ],
    mistakes: [
      { t: "Punch then step", d: "If the punch and step happen at different times, the power leaks out. Land them together." },
      { t: "Reaching and leaning", d: "Don't lean forward to reach — take a bigger step instead." },
    ],
    drill: { name: "Step-POW", desc: "Step-slide forward with a jab, then step-slide back with a jab. Say 'step-POW' out loud each time until it feels like one single move.", rounds: 3, work: 40, rest: 20 },
    pose: "movingjab", game: "comboCall", xp: 100,
  },
  {
    id: "cross", belt: 2, name: "The Cross", emoji: "💥",
    tagline: "Your thunder punch, straight from the back.",
    coach: "Meet your power hand! The cross fires from your back side and gets its thunder from your legs and hips — your whole body turns into the punch like a twisting spring.",
    steps: [
      { t: "Push the floor", d: "Your back foot pushes the floor and your heel lifts, like squishing a bug with your toes." },
      { t: "Hips whip around", d: "Your hips and shoulders turn toward the target. The punch rides on that turn." },
      { t: "Straight down the middle", d: "Your back fist travels in a straight line, right past your chin — no big swings." },
      { t: "Snap back home", d: "Just like the jab: fire, then snap straight back to your cheek." },
    ],
    mistakes: [
      { t: "Arm-only punch", d: "Punching with just your arm is a whisper. Turn your hips and it becomes thunder." },
      { t: "Flat back foot", d: "If your back heel stays glued down, your hips can't turn. Squish the bug!" },
    ],
    drill: { name: "Thunder Rounds", desc: "Slow-motion crosses: feel the foot push, the hip turn, the straight arm — then snap back. Every 5th one, do it at full speed. POW!", rounds: 3, work: 40, rest: 20 },
    pose: "cross", game: "comboCall", xp: 100,
  },
  {
    id: "jabcross", belt: 2, name: "The One-Two", emoji: "⚡",
    tagline: "Jab. Cross. The most famous combo on Earth.",
    coach: "Every boxer in history knows this one: the ONE-TWO. The jab opens the door, the cross walks through it. When these two punches flow together, you're officially boxing!",
    steps: [
      { t: "One — the jab", d: "Fire your jab straight and snap it back. It clears the path." },
      { t: "Two — the cross", d: "The instant the jab lands home, the cross fires with the hip twist." },
      { t: "Like a drumbeat", d: "It has a rhythm: ba-BAM! Not ba... BAM. The two punches almost touch." },
      { t: "End in your stance", d: "After the two, you're back in your guard, balanced, ready for anything." },
    ],
    mistakes: [
      { t: "Both at once", d: "Two punches together means neither is strong. One, THEN two." },
      { t: "Forgetting the guard", d: "When the cross fires, the jab hand must already be back guarding your cheek." },
    ],
    drill: { name: "Ba-BAM Rounds", desc: "Shadowbox one-twos with the rhythm 'ba-BAM'. Start slow and smooth. Smooth becomes fast all by itself — that's a champion's secret.", rounds: 3, work: 40, rest: 20 },
    pose: "onetwo", game: "comboCall", xp: 120,
  },

  /* ===== GREEN BELT — Power School ===== */
  {
    id: "hook", belt: 3, name: "The Hook", emoji: "🪝",
    tagline: "The punch that comes around the corner.",
    coach: "The hook is sneaky — it doesn't come straight, it swings around the side like a gate slamming shut. Your elbow comes up, your body turns, and BAM, from the corner!",
    steps: [
      { t: "Elbow up level", d: "Lift your front elbow up until your arm looks like an L held sideways, level with the floor." },
      { t: "Turn your whole side", d: "Your foot, hip and shoulder all turn together — the arm just comes along for the ride." },
      { t: "Short and tight", d: "The hook is a short punch. Keep the L shape — don't let your arm open wide." },
      { t: "Pivot the front foot", d: "Your front foot swivels like you're squishing a bug, letting your hip whip around." },
    ],
    mistakes: [
      { t: "The wide swing", d: "A giant swinging arm is slow and easy to see. Keep the L tight." },
      { t: "Arm before body", d: "If only the arm swings, there's no power. Body turns first, arm rides along." },
    ],
    drill: { name: "Gate Slammer", desc: "Slow-motion hooks: elbow up, body turns, snap back to guard. Feel your foot, hip and shoulder move as one piece. Add a little speed each round.", rounds: 3, work: 40, rest: 20 },
    pose: "hook", game: "comboCall", xp: 120,
  },
  {
    id: "uppercut", belt: 3, name: "The Uppercut", emoji: "🚀",
    tagline: "Power that launches from the ground up.",
    coach: "The uppercut is your rocket punch — it starts low and launches UP. You dip your legs like a spring, then the floor itself pushes the punch upward. Whoosh!",
    steps: [
      { t: "Small dip", d: "Bend your knees a little extra — you're loading the spring." },
      { t: "Drop the fist a bit", d: "Your punching hand dips down to your chest level. Just a little — not to your knees!" },
      { t: "Launch with your legs", d: "Push the floor away as your fist travels UP, palm facing you, like scooping ice cream to the sky." },
      { t: "Short trip, quick return", d: "The fist only travels a short way up — then straight back to your guard." },
    ],
    mistakes: [
      { t: "The bowling ball", d: "Dropping your hand all the way down is a giveaway. Small dip, quick launch." },
      { t: "All arm, no legs", d: "The power is in the leg push. No dip, no rocket." },
    ],
    drill: { name: "Rocket Launch", desc: "Dip-and-launch uppercuts in slow motion, feeling your legs do the pushing. Alternate hands. Say 'whoosh' on every launch — it helps, honest!", rounds: 3, work: 40, rest: 20 },
    pose: "uppercut", game: "comboCall", xp: 120,
  },
  {
    id: "jch", belt: 3, name: "The Triple", emoji: "🔥",
    tagline: "Jab, cross, hook — your first three-punch storm.",
    coach: "Time to chain three punches into one flowing storm: jab, cross, HOOK. The jab and cross turn your body one way — which winds up the spring for the hook to whip back. It's all connected!",
    steps: [
      { t: "One-two first", d: "Fire your beautiful one-two: jab, cross, snappy and straight." },
      { t: "The cross winds the hook", d: "Notice the cross turns your body — that turn loads your front hook like a spring." },
      { t: "Three — release the hook", d: "Let the hook whip around as your body unwinds. One-two-THREE!" },
      { t: "Rhythm: ba-ba-BAM", d: "Three beats that flow. End balanced in your guard, like nothing happened." },
    ],
    mistakes: [
      { t: "Three separate punches", d: "If you stop between punches, the spring unloads. Let each punch load the next." },
      { t: "Wild finish", d: "Don't let the hook spin you around. End in your stance, guard up." },
    ],
    drill: { name: "Storm Rounds", desc: "Shadowbox jab-cross-hook slowly until it feels like ONE move with three beats. Then try five in a row without losing your balance.", rounds: 3, work: 45, rest: 20 },
    pose: "onetwo", game: "comboCall", xp: 130,
  },
  {
    id: "bodyshots", belt: 3, name: "Going Downstairs", emoji: "🎯",
    tagline: "Champions attack the body too.",
    coach: "Boxers call it 'going downstairs' — punching the body instead of the head. The trick is you BEND YOUR LEGS to get low. Your punches stay straight; your legs change the floor you punch from.",
    steps: [
      { t: "Bend, don't lean", d: "To punch low, bend your knees so your whole body sinks. Never bend your back over like a droopy flower." },
      { t: "Eyes stay up", d: "Even when you're low, your eyes look at your target. Never stare at the floor." },
      { t: "Same punches, lower floor", d: "A body jab is just your jab from a lower stance. The technique never changes." },
      { t: "Spring back up", d: "After going downstairs, your legs bring you right back up into your tall guard." },
    ],
    mistakes: [
      { t: "The droop", d: "Bending your back to reach low leaves your head hanging out. Legs bend, back stays proud." },
      { t: "Guard falls asleep", d: "When you sink down, your guard sinks with your body — it never opens up." },
    ],
    drill: { name: "Upstairs–Downstairs", desc: "Jab high, then bend your knees and jab low, then back up high. Elevator legs! Keep your back straight the entire round.", rounds: 3, work: 45, rest: 20 },
    pose: "bodyshot", game: "comboCall", xp: 130,
  },

  /* ===== BLUE BELT — The Defense ===== */
  {
    id: "slip", belt: 4, name: "The Slip", emoji: "🌊",
    tagline: "Make them miss by THIS much.",
    coach: "Defense time — my favorite! The slip is when you move your head just a tiny bit to the side and the punch whooshes past your ear. Not a big jump. A tiny, cool, last-second lean.",
    steps: [
      { t: "Small head move", d: "Tilt your head and shoulders a little to one side — just enough that your head isn't where it was." },
      { t: "Bend from the knees", d: "The lean comes from your knees and waist together, not from bending your neck." },
      { t: "Eyes never leave", d: "Keep watching your target while you slip. Slipping blind is just dodging." },
      { t: "Snap back to center", d: "After the punch misses, your head comes right back to home position." },
    ],
    mistakes: [
      { t: "The giant dodge", d: "Leaping way over means you can't punch back. Small slips keep you close and ready." },
      { t: "Closing your eyes", d: "Eyes open, always! Champions watch the glove go by." },
    ],
    drill: { name: "Whoosh Rounds", desc: "Imagine a slow jab coming at you. Slip left... center... slip right... center. Make a 'whoosh' sound for every punch you imagine missing you!", rounds: 3, work: 40, rest: 20 },
    pose: "slip", game: "slipSchool", xp: 140,
  },
  {
    id: "roll", belt: 4, name: "The Roll", emoji: "🎢",
    tagline: "Duck under the rainbow.",
    coach: "When a hook swings at you, don't back up — go UNDER it! The roll is like ducking under a rainbow: down one side, under, up the other side. The punch sails over your head.",
    steps: [
      { t: "Bend your knees", d: "Sink straight down by bending your legs — your back stays straight and proud." },
      { t: "Draw the rainbow", d: "Move your head in a U-shape: down, across, and up on the other side." },
      { t: "Guard glued on", d: "Your hands stay on your cheeks the whole trip under the rainbow." },
      { t: "Come up ready", d: "You pop up on the other side in your perfect stance, ready to answer back." },
    ],
    mistakes: [
      { t: "Bowing forward", d: "Bending your back to duck drops your eyes to the floor. Sit DOWN with your legs instead." },
      { t: "The slow submarine", d: "Rolling too deep and slow leaves you stuck down there. Small quick rainbows." },
    ],
    drill: { name: "Rainbow Rounds", desc: "Roll under an imaginary hook: down-under-up, left to right, then right to left. Keep a smooth rhythm — like a slow-motion wave.", rounds: 3, work: 40, rest: 20 },
    pose: "roll", game: "slipSchool", xp: 140,
  },
  {
    id: "block", belt: 4, name: "The Block & Catch", emoji: "🧤",
    tagline: "Let your gloves do the guarding.",
    coach: "Sometimes the simplest defense is best: put your glove in the way! Catch a jab in your open glove like catching a baseball, or tighten your shield and let the punch bounce off.",
    steps: [
      { t: "The catch", d: "See a straight punch coming? Catch it in your open back glove, right in front of your face — like a goalkeeper." },
      { t: "The shield", d: "For bigger punches, glue your glove against your own cheek and take the hit ON the glove." },
      { t: "Elbows block the body", d: "Punch coming low? Drop your elbow to your ribs and let it bounce off." },
      { t: "Answer back", d: "The moment you catch or block, you're safe to fire back. Catch — then POW!" },
    ],
    mistakes: [
      { t: "Reaching for the catch", d: "Don't reach far out to catch — that opens your face. Catch it close, near your chin." },
      { t: "The flinch", d: "Turning away or shutting your eyes means more punches find you. Stay calm behind your shield." },
    ],
    drill: { name: "Goalkeeper Rounds", desc: "Imagine jabs flying at you: catch with the back hand, then fire a jab back. Catch-POW! Catch-POW! Keep your feet in your stance all round.", rounds: 3, work: 40, rest: 20 },
    pose: "block", game: "slipSchool", xp: 140,
  },
  {
    id: "hitnothit", belt: 4, name: "Hit & Don't Get Hit", emoji: "🧠",
    tagline: "Punch, then vanish. The art of boxing.",
    coach: "Here's boxing's golden rule, the one everything else serves: HIT and DON'T GET HIT. Today you learn to punch and then immediately move or slip — so by the time anyone answers, you're gone.",
    steps: [
      { t: "Punch then move", d: "Fire your one-two, then instantly step-slide to the side. Never stand and admire your work!" },
      { t: "Punch then slip", d: "Jab, then slip — as if the answer is already coming back at you. It usually is!" },
      { t: "In and out", d: "Glide in with a jab, glide right back out. Like a wave: in... out... in... out." },
      { t: "Never straight back twice", d: "Mix it up! Sometimes step left, sometimes right, sometimes slip. Be unpredictable." },
    ],
    mistakes: [
      { t: "The statue", d: "Standing still after punching is how you get caught. Punch and VANISH." },
      { t: "Same escape every time", d: "If you always step the same way, you're easy to find. Surprise them." },
    ],
    drill: { name: "Ghost Rounds", desc: "One-two, step left. One-two, step right. Jab, slip. Never the same escape twice in a row. Be everywhere and nowhere!", rounds: 3, work: 45, rest: 20 },
    pose: "onetwo", game: "slipSchool", xp: 150,
  },

  /* ===== RED BELT — Ring IQ ===== */
  {
    id: "counter", belt: 5, name: "The Counter", emoji: "↩️",
    tagline: "Their miss is your moment.",
    coach: "A counter is the smartest punch in boxing: they punch, you make it miss, and you answer INSTANTLY — while their glove is still out there and their door is open. Defense and attack become one move.",
    steps: [
      { t: "Slip and fire", d: "Slip their jab, and while your head is off-center, fire your cross. Slip-POW — one motion." },
      { t: "Catch and jab", d: "Catch their jab in your glove and shoot your own jab back at the same time." },
      { t: "The open door", d: "When someone punches, that side of their guard is open for a moment. Counters go through that door." },
      { t: "Speed comes from calm", d: "Counters aren't rushed. Stay calm, see the punch, answer. Calm IS fast." },
    ],
    mistakes: [
      { t: "Waiting too long", d: "Dodge, think about it, THEN punch = too late. The counter lives inside the dodge." },
      { t: "Wild answers", d: "A counter is a clean, straight answer — not a wild swing of excitement." },
    ],
    drill: { name: "Answer Rounds", desc: "Imagine the jab coming: slip right and fire your cross in one smooth motion. Then: catch and jab back. Trade between the two all round.", rounds: 3, work: 45, rest: 20 },
    pose: "slip", game: "slipSchool", xp: 160,
  },
  {
    id: "angles", belt: 5, name: "Finding Angles", emoji: "📐",
    tagline: "Don't be where they're aiming.",
    coach: "Champions don't fight in a straight line — they use ANGLES. A small pivot or side-step puts you where you can hit them, but they'd have to turn all the way around to hit you. It's like teleporting!",
    steps: [
      { t: "Step off the tracks", d: "After you punch, step diagonally — forward-left or forward-right — instead of straight back." },
      { t: "Pivot to a new door", d: "Use your pivot! Jab, then swing your back leg around. Now you're facing their side." },
      { t: "Punch from the new spot", d: "From your new angle, fire again before they finish turning. That's the prize." },
      { t: "Never stop facing them", d: "Every step and pivot ends with your toes and eyes pointing at the target." },
    ],
    mistakes: [
      { t: "The straight line", d: "Only moving forward and back makes you easy to find. Use the whole compass." },
      { t: "Angle without attack", d: "A new angle is a gift — use it! Step, then punch, or the moment is wasted." },
    ],
    drill: { name: "Teleport Rounds", desc: "Jab, pivot a quarter turn, jab again from the new angle. Then jab, diagonal step, one-two. Imagine your shadow can never find you.", rounds: 3, work: 45, rest: 20 },
    pose: "pivot", game: "slipSchool", xp: 160,
  },
  {
    id: "combos", belt: 5, name: "Combination Master", emoji: "🎼",
    tagline: "Punches that flow like music.",
    coach: "Now you know every punch — it's time to write music with them. Combinations mix straight punches, hooks, uppercuts, high and low, with slips and steps in between. Every combo tells a little story.",
    steps: [
      { t: "Start with the classics", d: "One-two-hook. One-two-hook-cross. Jab-jab-cross. These are your greatest hits." },
      { t: "Mix upstairs & downstairs", d: "Jab high, cross LOW, hook high. Changing floors makes combos impossible to guess." },
      { t: "Breathe with your punches", d: "Make a little 'tss' sound with each punch. It times your breathing and your rhythm." },
      { t: "End safe", d: "Every combo ends the same way: guard up, balanced, moving. Always land the ending." },
    ],
    mistakes: [
      { t: "The endless combo", d: "Throwing ten punches leaves you wide open and out of breath. 2–4 crisp punches, then move." },
      { t: "Speed over form", d: "A sloppy fast combo is worth less than a clean smooth one. Clean first. Speed follows." },
    ],
    drill: { name: "Greatest Hits", desc: "One round each: (1) one-two-hook, (2) jab-cross-low-cross, (3) your own invention — make up a 3-punch combo and repeat it until it's smooth as silk.", rounds: 3, work: 45, rest: 20 },
    pose: "onetwo", game: "comboCall", xp: 170,
  },
  {
    id: "ringiq", belt: 5, name: "Ring General", emoji: "👑",
    tagline: "The ring belongs to the one who thinks.",
    coach: "The final lesson isn't a punch — it's your MIND. A ring general controls where the fight happens: the center of the ring, the pace, the distance. You've built the body of a boxer. This makes you a smart one.",
    steps: [
      { t: "Own the center", d: "The middle of the ring is the throne. From the center, you can go anywhere; from the corner, you can't." },
      { t: "Control the distance", d: "Too far to be hit, close enough to strike — use your step-slide to live right on that edge." },
      { t: "Set the rhythm", d: "Fast when you choose, slow when you choose. The boxer who picks the tempo wins the dance." },
      { t: "Think one move ahead", d: "Jab to make them block, so the cross finds the door. Every move sets up the next one." },
    ],
    mistakes: [
      { t: "Following, not leading", d: "If you only react, the other boxer writes the story. You hold the pen." },
      { t: "Fighting angry", d: "The calm boxer sees everything; the angry boxer sees nothing. Champions breathe." },
    ],
    drill: { name: "The Throne", desc: "Imagine a ring around you. Shadowbox while always working back to the center — jab in, angle out, return to your throne. Fight the whole round as the general.", rounds: 3, work: 60, rest: 20 },
    pose: "onetwo", game: "comboCall", xp: 200,
  },
];

/* ---------- Training Camp pools (daily training generator) ---------- */
const CAMP = {
  warmup: [
    { n: "Jumping Jacks",       e: "⭐", s: 30, d: "Big stars! Arms all the way up, light on your feet." },
    { n: "High Knees",          e: "🦵", s: 30, d: "March fast, knees up to your hands. Pump those arms." },
    { n: "Arm Circles",         e: "🌀", s: 30, d: "Big slow circles forward, then backward. Wake up those shoulders." },
    { n: "Invisible Jump Rope", e: "🪢", s: 30, d: "Hop on the balls of your feet and spin your invisible rope." },
    { n: "Butt Kicks",          e: "🔥", s: 30, d: "Jog in place, heels tapping your backside. Quick feet!" },
    { n: "Shoulder Rolls",      e: "😌", s: 20, d: "Roll your shoulders back slowly. Loose and relaxed, like a champ." },
  ],
  footwork: [
    { n: "Step-Slide Lines",  e: "👣", s: 40, d: "Glide forward and back along a line — small steps, guard up." },
    { n: "Box Drill",         e: "🔲", s: 40, d: "Step-slide in a square: forward, right, back, left. Never cross your feet." },
    { n: "Pivot Circles",     e: "🌀", s: 40, d: "Quarter-pivots around your front foot. Draw a circle, then reverse it." },
    { n: "Ninja Feet",        e: "🥷", s: 30, d: "Move around the room SILENTLY on the balls of your feet." },
    { n: "Mirror Steps",      e: "🪞", s: 40, d: "Shadow an imaginary partner: they step, you step. Stay facing them." },
  ],
  boxing: [
    { n: "Jab Practice",        e: "🥊", s: 40, d: "Clean jabs at your own pace. Straight out, snap back to your cheek." },
    { n: "One-Two Flow",        e: "⚡", s: 40, d: "Ba-BAM! Smooth one-twos, ending balanced every time." },
    { n: "Shadowbox Freestyle", e: "🌪️", s: 60, d: "Your round: mix punches, steps and slips you've mastered. Be creative!" },
    { n: "Slow-Motion Form",    e: "🐢", s: 40, d: "Your favorite combo in super slow motion. Perfect every inch of it." },
    { n: "Pillow Target",       e: "🎯", s: 40, d: "Grown-up holds a pillow (or use your bed): controlled jabs — technique, not smash!" },
  ],
  games: [
    { n: "Slip the Sock",  e: "🧦", s: 40, d: "Hang a sock at head height (or imagine one). Slip left and right past it." },
    { n: "Reaction Claps", e: "👏", s: 30, d: "A grown-up claps at random — snap into your stance the instant you hear it." },
    { n: "Balance Battle", e: "🦩", s: 30, d: "Guard up, one leg. Switch legs halfway. Wobble but don't fall!" },
    { n: "Speed Hands",    e: "💨", s: 20, d: "How many tiny straight punches in 20 seconds? Count out loud!" },
  ],
  strength: [
    { n: "Bear Crawl",     e: "🐻", s: 30, d: "Crawl on hands and feet across the room. Strong like a bear." },
    { n: "Plank Hold",     e: "🧱", s: 20, d: "Straight as a board on your forearms. Squeeze your belly." },
    { n: "Squat Jumps",    e: "🦘", s: 30, d: "Sit low, jump high, land soft like a cat." },
    { n: "Superhero Hold", e: "🦸", s: 20, d: "On your tummy, lift arms and legs — fly like a superhero." },
    { n: "Crab Walk",      e: "🦀", s: 30, d: "Belly to the sky, walk on hands and feet. Sideways, of course." },
  ],
  cooldown: [
    { n: "Reach for the Sky",  e: "🌤️", s: 20, d: "Stretch up tall on your tiptoes, then slowly melt down to your toes." },
    { n: "Butterfly Stretch",  e: "🦋", s: 20, d: "Sit, feet together, knees flapping gently like wings." },
    { n: "Big Slow Breaths",   e: "🫁", s: 30, d: "Breathe in through your nose for 4, out through your mouth for 4. Champion calm." },
    { n: "Neck & Shoulders",   e: "😌", s: 20, d: "Slow head tilts side to side, shoulders rolling loose." },
  ],
};

/* ---------- Coach Duke — lines ---------- */
const COACH = {
  name: "Coach Duke",
  greetings: [
    "Ready to work, champ?",
    "The gym's open — gloves on!",
    "There's my favorite boxer!",
    "Big day at the gym today.",
    "Champions show up. And here you are!",
  ],
  streak: [
    "day streak! That's what discipline looks like.",
    "days in a row — the bell rings for YOU.",
    "day streak. Champions are built one day at a time.",
  ],
  comeback: [
    "Welcome back, champ! The gym missed you. Every champion rests — what matters is you came back.",
    "There you are! Doesn't matter how long you were gone. The ring is right where you left it.",
  ],
  practice: [
    "Beautiful form!", "That's it — stay springy!", "Guard up, eyes up!",
    "Smooth is fast!", "You're looking sharp!", "Breathe, champ, breathe!",
  ],
  celebrate: [
    "THAT'S my champ! Skill mastered!",
    "Ring the bell — you EARNED that one!",
    "Textbook! Absolutely textbook!",
    "You move more like a boxer every single day.",
    "I've trained a lot of fighters. You listen better than most grown-ups!",
  ],
  gymUpgrade: [
    "Look around, champ... the gym is GROWING. Your hard work built this.",
    "New gear just arrived — you earned every piece of it!",
  ],
};

/* ---------- The evolving gym ---------- */
const GYM_STAGES = [
  { need: 0,  name: "The Garage",           d: "One bulb, a mat, and a dream. Every legend starts somewhere." },
  { need: 3,  name: "The Basement Gym",     d: "A real heavy bag! Now we're talking." },
  { need: 7,  name: "Duke's Neighborhood Gym", d: "Speed bag, posters on the wall — this place is coming alive." },
  { need: 11, name: "The Contender Club",   d: "A real ring! You've earned your corner." },
  { need: 15, name: "The Champions' Gym",   d: "Banners, trophies, big lights. People are noticing you." },
  { need: 19, name: "The Legend's Arena",   d: "Crowd seats installed. They're coming to watch YOU." },
  { need: 24, name: "Championship Night",   d: "A packed arena, lights blazing. This is YOUR night, champ." },
];

/* ---------- Shop (avatar gear) ---------- */
const SHOP = [
  { id: "glove-red",    kind: "gloves", name: "Rookie Reds",     color: "#e03131", cost: 0 },
  { id: "glove-blue",   kind: "gloves", name: "Ice Blues",       color: "#3f8efc", cost: 60 },
  { id: "glove-green",  kind: "gloves", name: "Venom Greens",    color: "#37b24d", cost: 60 },
  { id: "glove-purple", kind: "gloves", name: "Thunder Purples", color: "#845ef7", cost: 90 },
  { id: "glove-black",  kind: "gloves", name: "Shadow Blacks",   color: "#343a40", cost: 120 },
  { id: "glove-gold",   kind: "gloves", name: "Champion Golds",  color: "#f5b301", cost: 200 },
  { id: "trunk-navy",   kind: "trunks", name: "Classic Navy",    color: "#2b3a67", cost: 0 },
  { id: "trunk-red",    kind: "trunks", name: "Creed Red",       color: "#c92a2a", cost: 50 },
  { id: "trunk-stars",  kind: "trunks", name: "Royal Purple",    color: "#5f3dc4", cost: 80 },
  { id: "trunk-teal",   kind: "trunks", name: "Tide Teal",       color: "#0ca678", cost: 80 },
  { id: "trunk-gold",   kind: "trunks", name: "Title Gold",      color: "#e8a10a", cost: 150 },
  { id: "band-red",     kind: "band",   name: "Red Headband",    color: "#e03131", cost: 40 },
  { id: "band-blue",    kind: "band",   name: "Blue Headband",   color: "#3f8efc", cost: 40 },
  { id: "band-gold",    kind: "band",   name: "Gold Headband",   color: "#f5b301", cost: 100 },
];

/* ---------- Badges ---------- */
const BADGES = [
  { id: "first",     e: "🌟", name: "First Bell",      d: "Complete your first mission" },
  { id: "five",      e: "✋", name: "High Five",        d: "Master 5 skills" },
  { id: "belt1",     e: "🥋", name: "Belt Up",          d: "Earn your first new belt" },
  { id: "streak3",   e: "🔥", name: "On Fire",          d: "Train 3 days in a row" },
  { id: "streak7",   e: "⚡", name: "Unstoppable",      d: "Train 7 days in a row" },
  { id: "games10",   e: "🎮", name: "Game Champ",       d: "Win 10 mini-games" },
  { id: "camp5",     e: "⛺", name: "Camp Regular",     d: "Finish 5 training camps" },
  { id: "puncher",   e: "🥊", name: "Real Puncher",     d: "Master the whole Orange Belt" },
  { id: "defense",   e: "🛡️", name: "Untouchable",      d: "Master the whole Blue Belt" },
  { id: "champion",  e: "🏆", name: "Champion",         d: "Master every skill in the academy" },
  { id: "partner",   e: "🤝", name: "Tag Team",         d: "Finish a partner workout with a grown-up" },
];

/* ---------- Partner Rounds (grown-up + kid, gloves on) ----------
   The grown-up is the coach here, so cards speak to THEM.
   mode: "learn"  — guided steps, gentle encouragement calls
         "pads"   — grown-up holds mitts/cushions, app calls punches
         "defense"— grown-up throws slow, light shots; app calls the answer
   Every call has { say } (spoken aloud) and { show } (big on screen).  */
const PARTNER = [
  {
    id: "gloveup", name: "Glove Up", emoji: "🥊", mode: "learn",
    stage: "Getting started · no pads yet",
    gear: ["Kids' boxing gloves (6–8 oz)", "A clear 2×2 m space", "Water"],
    parentCue: "This one's about getting comfortable IN the gloves before any target work. Help them get the gloves on snug, then do the respect glove-touch — that little tap is how every round begins and ends.",
    steps: [
      { t: "Wrists first", d: "Slide each hand in, fist closed. Pull the strap firm (not tight) around the wrist and press the velcro. Snug gloves = safe gloves." },
      { t: "Make a fist", d: "Have them squeeze a proper fist inside the glove — knuckles flat, thumb OUTSIDE and wrapped over the fingers, never tucked in." },
      { t: "The glove touch", d: "Face each other, both tap gloves gently. 'Good luck, have fun.' Every round starts and ends with this — it's respect." },
      { t: "Stance check", d: "Both of you get in your boxing stance facing each other. Mirror them. Guard up by the cheeks, chin down, knees soft." },
    ],
    rounds: 2, work: 40, rest: 25, callEvery: 8,
    pool: [
      { say: "Guard up!", show: "GUARD UP" }, { say: "Stay bouncy!", show: "BOUNCE" },
      { say: "Show me your stance!", show: "STANCE" }, { say: "Looking sharp!", show: "SHARP ✨" },
      { say: "Chin down!", show: "CHIN DOWN" },
    ],
    xp: 60,
  },
  {
    id: "pads1", name: "First Targets", emoji: "🎯", mode: "pads",
    stage: "Pad work · your first real target",
    gear: ["Kids' gloves", "Focus mitts — or two firm couch cushions", "Water"],
    parentCue: "Hold the pads (or cushions) up at HIS shoulder height, palms facing him, arms bent and braced. When the app calls a punch, give him that target. Absorb it — don't push back. Praise every single one!",
    rounds: 3, work: 40, rest: 30, callEvery: 5,
    pool: [
      { say: "Jab!", show: "JAB" },
      { say: "Jab!", show: "JAB" },
      { say: "One... two!", show: "1 – 2" },
      { say: "Double jab!", show: "JAB JAB" },
      { say: "One two!", show: "1 – 2" },
      { say: "Nice and easy... jab!", show: "JAB" },
    ],
    xp: 90,
  },
  {
    id: "pads2", name: "Combo Targets", emoji: "🔥", mode: "pads",
    stage: "Pad work · putting punches together",
    gear: ["Kids' gloves", "Focus mitts or firm cushions", "Water"],
    parentCue: "Same as before, but now combos. Move the pads a little between rounds so he has to aim. Keep calling out great feedback — 'beautiful one-two!' After each combo, have him reset his guard before the next call.",
    rounds: 3, work: 45, rest: 30, callEvery: 6,
    pool: [
      { say: "One... two!", show: "1 – 2" },
      { say: "One two, hook!", show: "1 – 2 – 3" },
      { say: "Double jab, cross!", show: "JAB JAB – 2" },
      { say: "Body jab!", show: "BODY JAB" },
      { say: "High jab, low jab!", show: "HIGH – LOW" },
      { say: "One two, back to guard!", show: "1 – 2 – GUARD" },
    ],
    xp: 110,
  },
  {
    id: "reactions", name: "Catch & Block", emoji: "🛡️", mode: "defense",
    stage: "Reactions · gloves on, super light",
    gear: ["Kids' gloves for both of you", "Water"],
    parentCue: "YOU throw slow, light jabs toward his GLOVES — never his face, never with power. Move at half speed. The app tells him how to answer each one. This teaches real reactions with zero risk. If he misses, slow down and smile — it's a game.",
    safetyExtra: "Aim for the gloves only. No head contact. Half speed the whole way.",
    rounds: 3, work: 40, rest: 30, callEvery: 6,
    pool: [
      { say: "Block it!", show: "BLOCK 🧤" },
      { say: "Catch it!", show: "CATCH" },
      { say: "Slip left!", show: "SLIP ◀" },
      { say: "Slip right!", show: "SLIP ▶" },
      { say: "Step back!", show: "STEP BACK" },
      { say: "Block, then jab back!", show: "BLOCK → JAB" },
    ],
    xp: 120,
  },
];

/* Safety checklist shown before every contact round. */
const PARTNER_SAFETY = [
  "Gloves are on and snug on both of us",
  "The space is clear — no sharp corners or furniture",
  "We'll keep it light and controlled — pads and body only, never the head",
  "Water is nearby and we'll break between rounds",
];

/* ---------- Parent tips ---------- */
const PARENT_TIPS = [
  "Sessions are designed for 15–25 minutes. Short and consistent beats long and rare — especially at ages 7–12.",
  "Solo missions are 100% shadowboxing. The new Team workouts add gloves-on pad work with a grown-up — the safest way to get a child used to real gloves and a moving target. Keep it light: pads and body only, never the head.",
  "For Team pad work you'll want kids' 6–8 oz gloves and a pair of focus mitts (couch cushions work to start). The grown-up always controls the pace.",
  "Clear a 2×2 metre space free of sharp corners, and train in shoes or grippy socks.",
  "Water break between every round — kids overheat faster than adults.",
  "Praise effort and form, not toughness. 'Your stance looked so solid!' goes further than 'be tough'.",
  "If your child wants real boxing classes, look for a gym with a dedicated kids' program and padded, non-contact fundamentals.",
  "Muscle soreness is normal; joint pain is not. Any joint pain means rest and, if it persists, a doctor.",
];
