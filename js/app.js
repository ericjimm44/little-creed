/* ============================================================
   LITTLE CREED — app logic
   Vanilla JS. All data stays in localStorage on this device.
   ============================================================ */
"use strict";

/* ---------------- helpers ---------------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const choice = (a) => a[Math.floor(Math.random() * a.length)];
const todayKey = () => new Date().toISOString().slice(0, 10);
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

/* ---------------- state ---------------- */
const KEY = "littleCreedV1";
const DEFAULT_STATE = {
  xp: 0, coins: 0, streak: 0, bestStreak: 0, lastDay: null,
  mastered: [], gamesWon: 0, campsDone: 0, partnersDone: 0,
  log: {},                                     // "YYYY-MM-DD" -> minutes practiced
  owned: ["glove-red", "trunk-navy"],
  equip: { gloves: "glove-red", trunks: "trunk-navy", band: null },
  badges: {},                                  // id -> ISO date earned
  belts: {},                                   // belt index -> ISO date earned
  sound: true,
  camp: null,                                  // { date, items:[{pool,idx,done}], finished }
};
let S = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    return Object.assign(structuredClone(DEFAULT_STATE), JSON.parse(raw));
  } catch { return structuredClone(DEFAULT_STATE); }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* storage full/blocked */ } }

function addMinutes(mins) {
  const k = todayKey();
  S.log[k] = Math.round(((S.log[k] || 0) + mins) * 10) / 10;
}

/* Streak: bumps once per calendar day, on any completed mission or camp. */
function markActiveDay() {
  const t = todayKey();
  if (S.lastDay === t) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  const yk = y.toISOString().slice(0, 10);
  S.streak = (S.lastDay === yk) ? S.streak + 1 : 1;
  S.bestStreak = Math.max(S.bestStreak, S.streak);
  S.lastDay = t;
}

/* ---------------- audio ---------------- */
let AC = null;
function ac() {
  if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch { /* no audio */ } }
  if (AC && AC.state === "suspended") AC.resume();
  return AC;
}
function tone(freq, dur, type, vol, when) {
  if (!S.sound) return;
  const ctx = ac(); if (!ctx) return;
  const t0 = ctx.currentTime + (when || 0);
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type || "sine"; o.frequency.value = freq;
  g.gain.setValueAtTime(vol || 0.12, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t0); o.stop(t0 + dur);
}
const sfx = {
  pop:  () => tone(520, 0.08, "triangle", 0.1),
  ding: () => { tone(880, 0.25, "sine", 0.12); tone(1320, 0.35, "sine", 0.06, 0.02); },
  bell: () => { tone(660, 0.7, "triangle", 0.16); tone(1320, 0.9, "sine", 0.05, 0.01); },
  miss: () => tone(180, 0.18, "square", 0.06),
  win:  () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, "triangle", 0.12, i * 0.11)),
  coin: () => { tone(988, 0.09, "square", 0.07); tone(1319, 0.16, "square", 0.07, 0.08); },
};

/* ---------------- spoken coach voice (Web Speech API) ---------------- */
function say(text) {
  if (!S.sound || !("speechSynthesis" in window)) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02; u.pitch = 1.15; u.volume = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch { /* voice unavailable */ }
}
function stopVoice() { try { if ("speechSynthesis" in window) speechSynthesis.cancel(); } catch { /* noop */ } }

/* ---------------- boxer SVG (avatar + demos) ---------------- */
function gearColor(kind, fallback) {
  const id = S.equip[kind];
  const item = SHOP.find(x => x.id === id);
  return item ? item.color : fallback;
}
function boxerSVG(opts) {
  const o = opts || {};
  const glove = o.glove || gearColor("gloves", "#e03131");
  const trunks = o.trunks || gearColor("trunks", "#2b3a67");
  const band = o.band !== undefined ? o.band : gearColor("band", null);
  const skin = "#f2c191";
  const ink = "#3a2e20";
  return `
  <svg class="bx" viewBox="0 0 120 150" aria-hidden="true">
    <g class="bx-all" stroke="${ink}" stroke-width="2.4">
      <g class="bx-legs">
        <rect x="44" y="104" width="12" height="28" rx="6" fill="${skin}"/>
        <rect class="bx-leg-b" x="64" y="104" width="12" height="28" rx="6" fill="${skin}"/>
        <rect x="40" y="128" width="20" height="10" rx="5" fill="#4a3b2a"/>
        <rect class="bx-shoe-b" x="61" y="128" width="20" height="10" rx="5" fill="#4a3b2a"/>
      </g>
      <g class="bx-body">
        <rect x="38" y="66" width="44" height="34" rx="12" fill="#2a9d8f"/>
        <rect x="38" y="88" width="44" height="20" rx="9" fill="${trunks}"/>
        <rect x="38" y="86" width="44" height="5" rx="2.5" fill="#e0a72e"/>
        <g class="bx-head">
          <circle cx="60" cy="40" r="24" fill="${skin}"/>
          ${band ? `<path d="M37 32 a24 24 0 0 1 46 0 l0 8 a24 24 0 0 0 -46 0 z" fill="${band}"/>` : ""}
          <path d="M38 30 a24 24 0 0 1 33 -12 q-2 8 -14 9 q12 1 17 8 l-8 2 z" fill="#6b4a2a" stroke-width="2"/>
          <circle class="bx-eye" cx="52" cy="42" r="2.6" fill="${ink}" stroke="none"/>
          <circle class="bx-eye" cx="68" cy="42" r="2.6" fill="${ink}" stroke="none"/>
          <path class="bx-smile" d="M53 51 q7 6 14 0" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <ellipse cx="47" cy="48" rx="3.4" ry="2.2" fill="#e79c73" opacity="0.7" stroke="none"/>
          <ellipse cx="73" cy="48" rx="3.4" ry="2.2" fill="#e79c73" opacity="0.7" stroke="none"/>
        </g>
        <g class="bx-arm bx-arm-l">
          <rect x="28" y="70" width="12" height="22" rx="6" fill="${skin}"/>
          <g class="bx-glove bx-glove-l">
            <circle cx="30" cy="62" r="12" fill="${glove}"/>
            <circle cx="25" cy="66" r="5" fill="${glove}" stroke-width="1.8"/>
          </g>
        </g>
        <g class="bx-arm bx-arm-r">
          <rect x="80" y="70" width="12" height="22" rx="6" fill="${skin}"/>
          <g class="bx-glove bx-glove-r">
            <circle cx="90" cy="62" r="12" fill="${glove}"/>
            <circle cx="95" cy="66" r="5" fill="${glove}" stroke-width="1.8"/>
          </g>
        </g>
      </g>
    </g>
  </svg>`;
}
function coachSVG() {
  return `
  <svg viewBox="0 0 80 80" aria-hidden="true">
    <circle cx="40" cy="40" r="37" fill="#f8e3c9" stroke="#3a2e20" stroke-width="2.5"/>
    <circle cx="40" cy="44" r="26" fill="#a9713d" stroke="#3a2e20" stroke-width="2.5"/>
    <path d="M14 40 a26 26 0 0 1 52 0 l0 -6 a26 26 0 0 0 -52 0 z" fill="#8a8578" stroke="#3a2e20" stroke-width="2"/>
    <rect x="12" y="30" width="56" height="8" rx="4" fill="#8a8578" stroke="#3a2e20" stroke-width="2"/>
    <circle cx="31" cy="46" r="3" fill="#2e2618"/>
    <circle cx="49" cy="46" r="3" fill="#2e2618"/>
    <path d="M30 57 q10 7 20 0" stroke="#2e2618" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M24 38 q7 -4 12 0 M44 38 q7 -4 12 0" stroke="#efe6d5" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* ---------------- coach toast ---------------- */
let toastTimer = null;
function coachSay(text, ms) {
  let t = $("#coachToast");
  if (!t) {
    t = document.createElement("div");
    t.id = "coachToast"; t.className = "coachToast";
    t.innerHTML = `<div class="coachToast__face">${coachSVG()}</div><p id="coachToastText"></p>`;
    document.body.appendChild(t);
  }
  $("#coachToastText").textContent = text;
  t.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-on"), ms || 3200);
}

/* ---------------- derived progress ---------------- */
const isMastered = (id) => S.mastered.includes(id);
function nextSkill() { return SKILLS.find(sk => !isMastered(sk.id)) || null; }
function beltSkills(bi) { return SKILLS.filter(sk => sk.belt === bi); }
function beltDone(bi) { return beltSkills(bi).every(sk => isMastered(sk.id)); }
function currentBeltIdx() {
  for (let i = 0; i < BELTS.length; i++) if (!beltDone(i)) return i;
  return BELTS.length - 1;
}
function gymStageIdx() {
  let idx = 0;
  GYM_STAGES.forEach((g, i) => { if (S.mastered.length >= g.need) idx = i; });
  return idx;
}

/* ---------------- badges ---------------- */
function checkBadges(announce) {
  const earn = (id) => {
    if (S.badges[id]) return;
    S.badges[id] = new Date().toISOString();
    const b = BADGES.find(x => x.id === id);
    if (announce && b) { coachSay(`Badge earned: ${b.e} ${b.name}!`, 4000); sfx.win(); }
  };
  if (S.mastered.length >= 1) earn("first");
  if (S.mastered.length >= 5) earn("five");
  if (Object.keys(S.belts).length >= 1) earn("belt1");
  if (S.bestStreak >= 3) earn("streak3");
  if (S.bestStreak >= 7) earn("streak7");
  if (S.gamesWon >= 10) earn("games10");
  if (S.campsDone >= 5) earn("camp5");
  if (beltDone(2)) earn("puncher");
  if (beltDone(4)) earn("defense");
  if (S.mastered.length >= SKILLS.length) earn("champion");
  if (S.partnersDone >= 1) earn("partner");
}

/* ============================================================
   RENDER — top bar
   ============================================================ */
function renderTop() {
  $("#chipStreak").textContent = `🔥 ${S.streak}`;
  $("#chipXP").textContent = `⭐ ${S.xp}`;
  $("#chipCoins").textContent = `🪙 ${S.coins}`;
  $("#soundBtn").textContent = S.sound ? "🔔" : "🔕";
}
function renderGreeting() {
  const gap = S.lastDay ? (new Date(todayKey()) - new Date(S.lastDay)) / 86400000 : 0;
  let line;
  if (S.lastDay && gap >= 2) line = choice(COACH.comeback);
  else if (S.streak >= 2) line = `${S.streak} ${choice(COACH.streak)}`;
  else line = choice(COACH.greetings);
  $("#coachGreet").textContent = line;
}

/* ============================================================
   RENDER — journey (hero + belt bar + path)
   ============================================================ */
function renderJourney() {
  const nxt = nextSkill();
  const hero = $("#heroCard");
  if (nxt) {
    const num = SKILLS.indexOf(nxt) + 1;
    const belt = BELTS[nxt.belt];
    $("#heroBelt").textContent = `${belt.name} · ${belt.title}`;
    $("#heroTitle").innerHTML = `Mission ${num}<br />${nxt.name}`;
    $("#heroCoachline").textContent = `Coach says: “${nxt.tagline}”`;
    $("#heroStart").onclick = () => openMission(nxt.id);
    hero.style.setProperty("--beltc", belt.color);
  } else {
    $("#heroBelt").textContent = "Academy complete";
    $("#heroTitle").innerHTML = `You did it,<br />CHAMPION! 🏆`;
    $("#heroCoachline").textContent = "Coach says: “Replay any mission to keep your skills razor sharp.”";
    $("#heroStart").onclick = () => switchPane("gym");
    $("#heroStart").textContent = "Visit your arena  🏟️";
  }
  const hb = $("#heroBoxer");
  hb.innerHTML = boxerSVG();
  hb.dataset.pose = nxt ? nxt.pose : "onetwo";

  // belt bar
  $("#beltBar").innerHTML = BELTS.map((b, i) => {
    const done = beltDone(i);
    const cur = i === currentBeltIdx() && !done;
    return `<span class="beltpip ${done ? "is-done" : ""} ${cur ? "is-cur" : ""}"
      style="--bc:${b.color}" title="${b.name}">${done ? "✓" : ""}</span>`;
  }).join(`<span class="beltbar__link"></span>`);

  // skill path
  const path = $("#path");
  path.innerHTML = BELTS.map((belt, bi) => {
    const nodes = beltSkills(bi).map(sk => {
      const gi = SKILLS.indexOf(sk);
      const done = isMastered(sk.id);
      const unlocked = done || (nextSkill() && nextSkill().id === sk.id);
      const cls = done ? "is-done" : unlocked ? "is-current" : "is-locked";
      return `
      <button class="node ${cls}" data-skill="${sk.id}" ${unlocked ? "" : "disabled"}
        style="--bc:${belt.color}" aria-label="${sk.name}${done ? " — mastered" : unlocked ? " — ready" : " — locked"}">
        <span class="node__ring"><span class="node__emoji">${done ? sk.emoji : unlocked ? sk.emoji : "🔒"}</span></span>
        <span class="node__label">
          <strong>Lv ${gi + 1} · ${sk.name}</strong>
          <em>${done ? "Mastered ✓ — tap to replay" : unlocked ? "Ready! Tap to start" : "Locked"}</em>
        </span>
        ${done ? `<span class="node__star">⭐</span>` : ""}
      </button>`;
    }).join("");
    const earned = beltDone(bi);
    return `
    <section class="beltblock ${earned ? "is-earned" : ""}" style="--bc:${belt.color};--bink:${belt.ink}">
      <header class="beltblock__head">
        <span class="beltblock__belt"></span>
        <div><h3>${belt.name}</h3><p>${belt.title}</p></div>
        ${earned ? `<span class="beltblock__done">EARNED 🎉</span>` : ""}
      </header>
      <div class="beltblock__nodes">${nodes}</div>
    </section>`;
  }).join("");

  $$(".node:not(.is-locked)", path).forEach(n =>
    n.addEventListener("click", () => openMission(n.dataset.skill)));
}

/* ============================================================
   MISSION PLAYER
   ============================================================ */
let M = null; // { skill, phases, idx, timer }

function openMission(skillId) {
  const sk = SKILLS.find(x => x.id === skillId);
  if (!sk) return;
  const phases = ["intro"];
  sk.steps.forEach((_, i) => phases.push("step" + i));
  phases.push("watch", "practice", "game", "done");
  M = { skill: sk, phases, idx: 0, replay: isMastered(sk.id) };
  $("#mission").hidden = false;
  document.body.classList.add("no-scroll");
  sfx.bell();
  renderMissionPhase();
}
function closeMission() {
  stopTimers();
  M = null;
  $("#mission").hidden = true;
  document.body.classList.remove("no-scroll");
  renderAll();
}
$("#mClose").addEventListener("click", () => {
  if (M && M.phases[M.idx] !== "done") {
    if (!confirm("Leave this mission? Your progress in it won't be saved.")) return;
  }
  closeMission();
});

function missionProgressHTML() {
  return M.phases.map((_, i) =>
    `<span class="${i < M.idx ? "is-past" : i === M.idx ? "is-now" : ""}"></span>`).join("");
}
function nextPhase() { M.idx = clamp(M.idx + 1, 0, M.phases.length - 1); renderMissionPhase(); }

function renderMissionPhase() {
  stopTimers();
  const sk = M.skill, ph = M.phases[M.idx], body = $("#mBody");
  $("#mProg").innerHTML = missionProgressHTML();
  const num = SKILLS.indexOf(sk) + 1;

  if (ph === "intro") {
    body.innerHTML = `
      <div class="mphase mphase--intro">
        <p class="mission__eyebrow">Mission ${num} · ${BELTS[sk.belt].name}</p>
        <h2 class="mission__title">${sk.emoji} ${sk.name}</h2>
        <div class="coachcard">
          <div class="coachcard__face">${coachSVG()}</div>
          <p><strong>${COACH.name} says:</strong> ${sk.coach}</p>
        </div>
        <button class="btn btn--go btn--big" id="mNext">Let's train!&nbsp;&nbsp;🥊</button>
      </div>`;
  }
  else if (ph.startsWith("step")) {
    const i = Number(ph.slice(4));
    const st = sk.steps[i];
    body.innerHTML = `
      <div class="mphase">
        <p class="mission__eyebrow">Learn it · step ${i + 1} of ${sk.steps.length}</p>
        <div class="demo" data-pose="${sk.pose}">${boxerSVG()}</div>
        <h2 class="mission__step">${st.t}</h2>
        <p class="mission__text">${st.d}</p>
        <div class="mphase__row">
          ${i > 0 ? `<button class="btn btn--ghost" id="mBack">‹ Back</button>` : ""}
          <button class="btn btn--go" id="mNext">${i + 1 < sk.steps.length ? "Next step ›" : "Got it! ›"}</button>
        </div>
      </div>`;
    if ($("#mBack")) $("#mBack").onclick = () => { M.idx--; renderMissionPhase(); };
  }
  else if (ph === "watch") {
    body.innerHTML = `
      <div class="mphase">
        <p class="mission__eyebrow">Watch out!</p>
        <h2 class="mission__step">Don't fall for these</h2>
        <div class="oops">
          ${sk.mistakes.map(m => `
            <div class="oops__card"><span>🙈</span><div><strong>${m.t}</strong><p>${m.d}</p></div></div>`).join("")}
        </div>
        <button class="btn btn--go" id="mNext">I'll watch for those! ›</button>
      </div>`;
  }
  else if (ph === "practice") renderPractice(body, sk);
  else if (ph === "game") {
    const g = sk.game;
    if (g === "quickHands") gameQuickHands(body);
    else if (g === "comboCall") gameComboCall(body);
    else gameSlipSchool(body);
  }
  else if (ph === "done") renderCelebration(body, sk);

  const nb = $("#mNext");
  if (nb) nb.onclick = () => { sfx.pop(); nextPhase(); };
}

/* ---------------- practice timer ---------------- */
let tickInt = null, gameTimers = [];
function stopTimers() {
  clearInterval(tickInt); tickInt = null;
  gameTimers.forEach(t => clearTimeout(t)); gameTimers = [];
}

function renderPractice(body, sk) {
  const d = sk.drill;
  body.innerHTML = `
    <div class="mphase">
      <p class="mission__eyebrow">Practice time · ${d.rounds} rounds</p>
      <h2 class="mission__step">${d.name}</h2>
      <p class="mission__text">${d.desc}</p>
      <div class="ptimer">
        <div class="ptimer__ring">
          <svg viewBox="0 0 120 120">
            <circle class="ptimer__track" cx="60" cy="60" r="52"/>
            <circle class="ptimer__fill" id="ptFill" cx="60" cy="60" r="52"/>
          </svg>
          <div class="ptimer__mid">
            <span class="ptimer__phase" id="ptPhase">READY</span>
            <span class="ptimer__num" id="ptNum">${d.work}</span>
          </div>
        </div>
        <p class="ptimer__round" id="ptRound">Round 1 of ${d.rounds}</p>
        <p class="ptimer__coach" id="ptCoach"></p>
      </div>
      <div class="mphase__row">
        <button class="btn btn--go btn--big" id="ptStart">Start round 1&nbsp;&nbsp;🔔</button>
        <button class="btn btn--ghost btn--sm" id="ptSkip">Skip practice</button>
      </div>
    </div>`;

  const CIRC = 2 * Math.PI * 52;
  const fill = $("#ptFill");
  fill.style.strokeDasharray = CIRC;
  let round = 1, phase = "idle", left = 0;

  function setRing(frac) { fill.style.strokeDashoffset = CIRC * (1 - frac); }
  setRing(1);

  function startWork() {
    phase = "work"; left = d.work;
    $("#ptPhase").textContent = "GO!"; $("#ptRound").textContent = `Round ${round} of ${d.rounds}`;
    $("#ptCoach").textContent = choice(COACH.practice);
    sfx.bell(); tick();
    tickInt = setInterval(tick, 1000);
  }
  function tick() {
    $("#ptNum").textContent = left;
    setRing(left / (phase === "work" ? d.work : d.rest));
    if (left <= 0) {
      clearInterval(tickInt);
      if (phase === "work") {
        addMinutes(d.work / 60); save();
        if (round >= d.rounds) return finishPractice();
        phase = "rest"; left = d.rest;
        $("#ptPhase").textContent = "REST"; $("#ptCoach").textContent = "Shake it out. Sip of water!";
        sfx.ding();
        tickInt = setInterval(tick, 1000);
      } else {
        round++; startWork();
      }
      return;
    }
    if (left <= 3 && phase === "work") sfx.pop();
    left--;
  }
  function finishPractice() {
    $("#ptPhase").textContent = "DONE!"; $("#ptNum").textContent = "🎉";
    $("#ptCoach").textContent = "Great work — now let's play!";
    sfx.bell();
    const b = $("#ptStart");
    b.textContent = "On to the game!  🎮";
    b.disabled = false;
    b.onclick = () => nextPhase();
  }
  $("#ptStart").onclick = (e) => { e.target.disabled = true; startWork(); };
  $("#ptSkip").onclick = () => nextPhase();
}

/* ============================================================
   MINI-GAMES  (each calls gameOver(win, scoreText))
   ============================================================ */
function gameShell(body, title, sub, inner) {
  body.innerHTML = `
    <div class="mphase">
      <p class="mission__eyebrow">Mini-game</p>
      <h2 class="mission__step">${title}</h2>
      <p class="mission__text">${sub}</p>
      ${inner}
    </div>`;
}
function gameOver(win, text) {
  stopTimers();
  if (win) { S.gamesWon++; S.coins += 10; save(); sfx.win(); }
  else sfx.miss();
  const arena = $("#gArena");
  if (arena) {
    arena.innerHTML = `
      <div class="gameover">
        <p class="gameover__big">${win ? "🏆 You won!" : "💪 Nice try!"}</p>
        <p class="gameover__sub">${text}${win ? " · +10 🪙" : ""}</p>
        <button class="btn btn--go" id="gNext">${win ? "Claim your reward ›" : "Continue ›"}</button>
      </div>`;
    $("#gNext").onclick = () => nextPhase();
  }
}

/* --- Quick Hands: tap the pads before they vanish --- */
function gameQuickHands(body) {
  gameShell(body, "⚡ Quick Hands", "Pads will pop up — tap them FAST before they disappear! Hit 12 to win.",
    `<div class="gArena" id="gArena">
       <div class="gHud"><span id="gScore">0 hits</span><span id="gClock">25s</span></div>
       <div class="gField" id="gField"></div>
       <button class="btn btn--go btn--big" id="gStart">Start!&nbsp;&nbsp;⚡</button>
     </div>`);
  const field = $("#gField");
  let score = 0, left = 25, running = false;

  function spawn() {
    if (!running) return;
    const pad = document.createElement("button");
    pad.className = "gPad";
    pad.textContent = "🥊";
    pad.style.left = (8 + Math.random() * 74) + "%";
    pad.style.top = (8 + Math.random() * 70) + "%";
    pad.onclick = () => {
      score++; sfx.pop();
      $("#gScore").textContent = `${score} hits`;
      pad.remove();
    };
    field.appendChild(pad);
    gameTimers.push(setTimeout(() => pad.remove(), 1400 - Math.min(score * 25, 500)));
    gameTimers.push(setTimeout(spawn, 550 + Math.random() * 450));
  }
  $("#gStart").onclick = (e) => {
    e.target.remove(); running = true; sfx.bell(); spawn();
    tickInt = setInterval(() => {
      left--; $("#gClock").textContent = left + "s";
      if (left <= 0) { running = false; gameOver(score >= 12, `You hit ${score} pads!`); }
    }, 1000);
  };
}

/* --- Combo Caller: repeat the combo Coach calls (Simon) --- */
function gameComboCall(body) {
  const MOVES = [
    { id: "jab", n: "Jab", e: "🥊" }, { id: "cross", n: "Cross", e: "💥" },
    { id: "hook", n: "Hook", e: "🪝" }, { id: "upper", n: "Upper", e: "🚀" },
  ];
  gameShell(body, "🎼 Combo Caller", "Watch Coach call the combo, then throw it back in the same order. Three combos to win!",
    `<div class="gArena" id="gArena">
       <div class="gHud"><span id="gScore">Combo 1 of 3</span><span id="gCall">👀 Watch...</span></div>
       <div class="gCombo" id="gCombo"></div>
       <div class="gMoves">
         ${MOVES.map(m => `<button class="gMove" data-m="${m.id}"><span>${m.e}</span>${m.n}</button>`).join("")}
       </div>
       <button class="btn btn--go btn--big" id="gStart">Start!&nbsp;&nbsp;🎼</button>
     </div>`);
  let seq = [], input = 0, comboNum = 1, accepting = false;

  const comboEl = $("#gCombo");
  function showSeq() {
    accepting = false; input = 0;
    $("#gCall").textContent = "👀 Watch...";
    comboEl.innerHTML = seq.map(() => `<span class="gDot">?</span>`).join("");
    seq.forEach((mid, i) => {
      gameTimers.push(setTimeout(() => {
        const m = MOVES.find(x => x.id === mid);
        comboEl.children[i].textContent = m.e;
        comboEl.children[i].classList.add("is-flash");
        sfx.pop();
        gameTimers.push(setTimeout(() => {
          comboEl.children[i].textContent = "?";
          comboEl.children[i].classList.remove("is-flash");
        }, 520));
      }, 700 * (i + 1)));
    });
    gameTimers.push(setTimeout(() => {
      accepting = true;
      $("#gCall").textContent = "🥊 Your turn!";
    }, 700 * (seq.length + 1)));
  }
  function newCombo() {
    seq = Array.from({ length: comboNum + 2 }, () => choice(MOVES).id);
    $("#gScore").textContent = `Combo ${comboNum} of 3`;
    showSeq();
  }
  $$(".gMove").forEach(b => b.addEventListener("click", () => {
    if (!accepting) return;
    if (b.dataset.m === seq[input]) {
      comboEl.children[input].textContent = MOVES.find(x => x.id === seq[input]).e;
      comboEl.children[input].classList.add("is-good");
      sfx.pop(); input++;
      if (input >= seq.length) {
        accepting = false; sfx.ding(); comboNum++;
        if (comboNum > 3) return gameOver(true, "You threw every combo perfectly!");
        gameTimers.push(setTimeout(newCombo, 900));
      }
    } else {
      accepting = false; sfx.miss();
      $("#gCall").textContent = "🙈 Oops! Watch again...";
      gameTimers.push(setTimeout(showSeq, 1100));
    }
  }));
  $("#gStart").onclick = (e) => { e.target.remove(); newCombo(); };
}

/* --- Slip School: react the right way, fast --- */
function gameSlipSchool(body) {
  const CUES = [
    { id: "left", label: "SLIP LEFT!", key: "⬅️" },
    { id: "right", label: "SLIP RIGHT!", key: "➡️" },
    { id: "duck", label: "DUCK!", key: "⬇️" },
  ];
  gameShell(body, "🌊 Slip School", "Coach calls a move — hit the right button before the glove arrives! Get 7 of 10 to win.",
    `<div class="gArena" id="gArena">
       <div class="gHud"><span id="gScore">0 / 10</span><span id="gCall">Get ready…</span></div>
       <div class="gBigcue" id="gBigcue">🛎️</div>
       <div class="gMoves gMoves--three">
         <button class="gMove" data-c="left"><span>⬅️</span>Slip left</button>
         <button class="gMove" data-c="duck"><span>⬇️</span>Duck</button>
         <button class="gMove" data-c="right"><span>➡️</span>Slip right</button>
       </div>
       <button class="btn btn--go btn--big" id="gStart">Start!&nbsp;&nbsp;🌊</button>
     </div>`);
  let n = 0, good = 0, cur = null, deadline = null;

  function nextCue() {
    if (n >= 10) return gameOver(good >= 7, `You dodged ${good} of 10!`);
    n++;
    cur = choice(CUES);
    $("#gBigcue").textContent = cur.key;
    $("#gCall").textContent = cur.label;
    sfx.pop();
    deadline = setTimeout(() => {
      $("#gBigcue").textContent = "💤";
      $("#gCall").textContent = "Too slow!";
      sfx.miss(); cur = null;
      gameTimers.push(setTimeout(nextCue, 800));
    }, 1600);
    gameTimers.push(deadline);
  }
  $$(".gMove").forEach(b => b.addEventListener("click", () => {
    if (!cur) return;
    clearTimeout(deadline);
    const hit = b.dataset.c === cur.id;
    if (hit) { good++; sfx.ding(); $("#gBigcue").textContent = "✨"; $("#gCall").textContent = "Whoosh — it missed you!"; }
    else { sfx.miss(); $("#gBigcue").textContent = "🙈"; $("#gCall").textContent = "Wrong way!"; }
    $("#gScore").textContent = `${good} / 10`;
    cur = null;
    gameTimers.push(setTimeout(nextCue, 700));
  }));
  $("#gStart").onclick = (e) => { e.target.remove(); nextCue(); };
}

/* ============================================================
   CELEBRATION
   ============================================================ */
function renderCelebration(body, sk) {
  const first = !isMastered(sk.id);
  const gainXP = first ? sk.xp : 20;
  const gainCoins = first ? 25 : 5;
  const prevStage = gymStageIdx();
  const prevBelts = Object.keys(S.belts).length;

  if (first) S.mastered.push(sk.id);
  S.xp += gainXP; S.coins += gainCoins;
  markActiveDay();
  BELTS.forEach((_, bi) => { if (beltDone(bi) && !S.belts[bi]) S.belts[bi] = new Date().toISOString(); });
  const newBelt = Object.keys(S.belts).length > prevBelts ? BELTS[currentBeltIdxEarned()] : null;
  const newStage = gymStageIdx() > prevStage ? GYM_STAGES[gymStageIdx()] : null;
  checkBadges(false);
  save();

  function currentBeltIdxEarned() {
    return Math.max(...Object.keys(S.belts).map(Number));
  }

  body.innerHTML = `
    <div class="mphase mphase--party">
      <div class="powburst">${choice(["POW!", "BOOM!", "WHAM!", "CRASH!", "BAM!"])}</div>
      <p class="party__pop">${first ? "SKILL MASTERED!" : "SHARPENED!"}</p>
      <h2 class="mission__title">${sk.emoji} ${sk.name}</h2>
      <div class="coachcard">
        <div class="coachcard__face">${coachSVG()}</div>
        <p><strong>${COACH.name}:</strong> ${choice(COACH.celebrate)}</p>
      </div>
      <div class="party__loot">
        <span class="loot">⭐ +${gainXP} XP</span>
        <span class="loot">🪙 +${gainCoins} coins</span>
        ${S.streak > 1 ? `<span class="loot">🔥 ${S.streak}-day streak</span>` : ""}
      </div>
      ${newBelt ? `<div class="party__belt" style="--bc:${newBelt.color}">🥋 NEW BELT: <strong>${newBelt.name}</strong>!</div>` : ""}
      ${newStage ? `<div class="party__gym">🏟️ Your gym grew: <strong>${newStage.name}</strong>! <button class="btn btn--ghost btn--sm" id="seeGym">See it ›</button></div>` : ""}
      <button class="btn btn--go btn--big" id="mFinish">Back to the journey&nbsp;&nbsp;🗺️</button>
    </div>`;

  confettiBurst();
  sfx.win(); setTimeout(() => sfx.coin(), 400);
  if (newStage) coachSay(choice(COACH.gymUpgrade), 4500);

  $("#mFinish").onclick = () => closeMission();
  const sg = $("#seeGym");
  if (sg) sg.onclick = () => { closeMission(); switchPane("gym"); };
}

/* ---------------- confetti ---------------- */
function confettiBurst() {
  const cv = $("#confetti"), ctx = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  cv.classList.add("is-on");
  const COLORS = ["#ffd34d", "#ff5a5a", "#5aa9ff", "#5ecb73", "#f5b301", "#845ef7", "#fff"];
  const parts = Array.from({ length: 130 }, () => ({
    x: cv.width / 2 + (Math.random() - 0.5) * cv.width * 0.5,
    y: cv.height * 0.25,
    vx: (Math.random() - 0.5) * 11,
    vy: -(4 + Math.random() * 9),
    s: 5 + Math.random() * 7,
    c: choice(COLORS),
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
  }));
  let frames = 0;
  (function loop() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.28; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx.restore();
    });
    if (++frames < 150) requestAnimationFrame(loop);
    else { ctx.clearRect(0, 0, cv.width, cv.height); cv.classList.remove("is-on"); }
  })();
}

/* ============================================================
   TRAINING CAMP
   ============================================================ */
function buildCampPlan() {
  const pick = (pool, n) => {
    const src = [...CAMP[pool].keys()];
    const out = [];
    while (out.length < n && src.length) {
      const i = src.splice(Math.floor(Math.random() * src.length), 1)[0];
      out.push({ pool, idx: i, done: false });
    }
    return out;
  };
  const extra = S.mastered.length >= 9 ? 1 : 0; // more boxing once punches unlock
  return {
    date: todayKey(), finished: false,
    items: [
      ...pick("warmup", 2), ...pick("footwork", 2),
      ...pick("boxing", 2 + extra), ...pick("games", 1),
      ...pick("strength", 2), ...pick("cooldown", 1),
    ],
  };
}
const POOL_LABEL = {
  warmup: "Warm-up", footwork: "Footwork", boxing: "Boxing",
  games: "Reaction game", strength: "Strong like a boxer", cooldown: "Cool-down",
};

function ensureCamp() {
  if (!S.camp || S.camp.date !== todayKey()) { S.camp = buildCampPlan(); save(); }
}
function renderCamp() {
  ensureCamp();
  const c = S.camp;
  const list = $("#campList");
  const doneCount = c.items.filter(i => i.done).length;
  $("#campSub").textContent = c.finished
    ? "Today's camp is stamped. Come back tomorrow for a brand-new plan!"
    : `A fresh training day, built just for you — ${doneCount} of ${c.items.length} stations done.`;

  list.innerHTML = c.items.map((it, i) => {
    const ex = CAMP[it.pool][it.idx];
    return `
    <div class="station ${it.done ? "is-done" : ""}" data-i="${i}">
      <span class="station__emoji">${ex.e}</span>
      <div class="station__text">
        <em>${POOL_LABEL[it.pool]}</em>
        <strong>${ex.n}</strong>
        <p>${ex.d}</p>
      </div>
      <button class="station__go" data-i="${i}" ${it.done || c.finished ? "disabled" : ""}>
        ${it.done ? "✓" : ex.s + "s"}
      </button>
    </div>`;
  }).join("");

  $$(".station__go", list).forEach(b => b.addEventListener("click", () => runStation(Number(b.dataset.i))));
  $("#campFinish").disabled = c.finished || doneCount < c.items.length;
  $("#campDoneBox").hidden = !c.finished;
  if (c.finished) $("#campDoneSub").textContent = `Camp #${S.campsDone} in the books. Rest up, champ!`;
}

function runStation(i) {
  const it = S.camp.items[i];
  const ex = CAMP[it.pool][it.idx];
  const row = $(`.station[data-i="${i}"]`);
  const btn = $(".station__go", row);
  let left = ex.s;
  btn.disabled = true;
  row.classList.add("is-running");
  sfx.bell();
  tickInt && clearInterval(tickInt);
  tickInt = setInterval(() => {
    btn.textContent = left + "s";
    if (left <= 0) {
      clearInterval(tickInt);
      it.done = true;
      addMinutes(ex.s / 60);
      save(); sfx.ding();
      renderCamp();
      return;
    }
    if (left <= 3) sfx.pop();
    left--;
  }, 1000);
}

$("#campFinish").addEventListener("click", () => {
  const c = S.camp;
  if (c.finished || c.items.some(i => !i.done)) return;
  c.finished = true;
  S.campsDone++; S.xp += 40; S.coins += 15;
  markActiveDay(); checkBadges(true); save();
  confettiBurst(); sfx.win();
  coachSay("Camp complete! That's a real day's work, champ. ⭐ +40 XP · 🪙 +15", 4200);
  renderAll();
});
$("#campReroll").addEventListener("click", () => {
  if (S.camp && S.camp.items.some(i => i.done) && !confirm("Get a new plan? Today's finished stations will reset.")) return;
  S.camp = buildCampPlan(); save(); sfx.pop(); renderCamp();
});

/* ============================================================
   MY GYM  (evolving scene + avatar shop + badges)
   ============================================================ */
function gymSceneSVG(stage) {
  const s = stage; // 0..6
  const has = (n) => s >= n;
  const ink = "#3a2e20";
  return `
  <svg viewBox="0 0 360 220" class="gymsvg" aria-hidden="true">
    <defs>
      <linearGradient id="wallg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${has(6) ? "#f2dca8" : "#e9d9b5"}"/>
        <stop offset="1" stop-color="${has(6) ? "#e5bb84" : "#ddc99d"}"/>
      </linearGradient>
      <radialGradient id="lampg" cx="0.5" cy="0" r="1">
        <stop offset="0" stop-color="#f7d87c" stop-opacity="0.45"/>
        <stop offset="1" stop-color="#f7d87c" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="360" height="180" fill="url(#wallg)"/>
    <rect y="180" width="360" height="40" fill="${has(3) ? "#a97e4f" : "#b08d5f"}"/>
    <rect y="176" width="360" height="6" fill="#3a2e2033"/>
    <line x1="0" y1="180" x2="360" y2="180" stroke="${ink}" stroke-width="2.5"/>

    ${has(6) ? `
      <polygon points="60,0 130,180 190,180 100,0" fill="#fff3c9" opacity="0.5"/>
      <polygon points="300,0 230,180 170,180 260,0" fill="#fff3c9" opacity="0.5"/>` : `
      <rect x="172" y="0" width="4" height="26" fill="${ink}"/>
      <circle cx="174" cy="32" r="9" fill="#f7d87c" stroke="${ink}" stroke-width="2"/>
      <ellipse cx="174" cy="60" rx="60" ry="46" fill="url(#lampg)"/>`}

    ${has(5) ? `
      <g>
        <rect x="0" y="120" width="360" height="26" fill="#8a5c3a" stroke="${ink}" stroke-width="2"/>
        ${Array.from({ length: 18 }, (_, i) => `
          <circle cx="${12 + i * 20}" cy="${130 + (i % 2) * 5}" r="7" fill="${["#c98a5a", "#8a5a3a", "#e3b088", "#6a4a32"][i % 4]}" stroke="${ink}" stroke-width="1.5"/>
          <rect x="${5 + i * 20}" y="${137 + (i % 2) * 5}" width="14" height="9" rx="3" fill="${["#4a7fb5", "#c73a2e", "#2a9d8f", "#e0a72e"][i % 4]}" stroke="${ink}" stroke-width="1.5"/>`).join("")}
      </g>` : `
      <rect x="22" y="56" width="50" height="60" rx="4" fill="#fdf6e6" stroke="${ink}" stroke-width="2.5"/>
      <path d="M47 66 l3.5 8 8.8 0.8 -6.6 5.8 2 8.6 -7.7 -4.6 -7.7 4.6 2 -8.6 -6.6 -5.8 8.8 -0.8 z" fill="#e0a72e" stroke="${ink}" stroke-width="1.5"/>
      <rect x="32" y="94" width="30" height="5" rx="2.5" fill="#b3a284"/>
      <rect x="37" y="103" width="20" height="4" rx="2" fill="#c5b696"/>`}

    ${has(1) ? `
      <g class="g-bag">
        <rect x="296" y="30" width="4" height="18" fill="${ink}"/>
        <rect x="284" y="48" width="28" height="58" rx="12" fill="#c73a2e" stroke="${ink}" stroke-width="2.5"/>
        <rect x="284" y="48" width="28" height="12" rx="6" fill="#9c2b21" stroke="${ink}" stroke-width="2"/>
        <rect x="295" y="70" width="6" height="20" rx="3" fill="#ffffff44"/>
      </g>` : ""}

    ${has(2) ? `
      <rect x="238" y="34" width="34" height="8" rx="3" fill="#8a5c3a" stroke="${ink}" stroke-width="2"/>
      <rect x="252" y="42" width="4" height="8" fill="${ink}"/>
      <g class="g-speed"><ellipse cx="254" cy="60" rx="10" ry="13" fill="#e0a72e" stroke="${ink}" stroke-width="2.5"/></g>
      <rect x="90" y="52" width="34" height="46" rx="3" fill="#d9c69b" stroke="${ink}" stroke-width="2.5"/>
      <circle cx="107" cy="68" r="8" fill="#c73a2e" stroke="${ink}" stroke-width="2"/>
      <rect x="97" y="82" width="20" height="4" rx="2" fill="#8a765a"/>
      <rect x="100" y="89" width="14" height="3" rx="1.5" fill="#8a765a"/>` : ""}

    ${has(3) ? `
      <g>
        <rect x="120" y="98" width="150" height="86" rx="6" fill="#8a5c3a" stroke="${ink}" stroke-width="2.5"/>
        <rect x="120" y="98" width="150" height="10" rx="5" fill="#a3714a" stroke="${ink}" stroke-width="2"/>
        ${[0, 1].map(k => `
          <rect x="${124 + k * 138}" y="70" width="8" height="46" rx="3" fill="#c73a2e" stroke="${ink}" stroke-width="2"/>
          <circle cx="${128 + k * 138}" cy="68" r="6" fill="#e0a72e" stroke="${ink}" stroke-width="2"/>`).join("")}
        <line x1="128" y1="84" x2="266" y2="84" stroke="#fdf6e6" stroke-width="3"/>
        <line x1="128" y1="96" x2="266" y2="96" stroke="#c73a2e" stroke-width="3"/>
        <line x1="128" y1="108" x2="266" y2="108" stroke="#4a7fb5" stroke-width="3"/>
      </g>` : ""}

    ${has(4) ? `
      <g stroke="${ink}" stroke-width="2">
        <path d="M150 8 h32 l0 26 -16 -9 -16 9 z" fill="#c73a2e"/>
        <path d="M192 8 h32 l0 26 -16 -9 -16 9 z" fill="#4a7fb5"/>
        <path d="M234 8 h32 l0 26 -16 -9 -16 9 z" fill="#e0a72e"/>
        <rect x="18" y="112" width="76" height="8" rx="3" fill="#8a5c3a"/>
        ${[0, 1, 2].map(k => `
          <path d="M${30 + k * 24} 96 h12 v10 a6 6 0 0 1 -12 0 z" fill="#e0a72e"/>
          <rect x="${33 + k * 24}" y="106" width="6" height="6" fill="#b9820f"/>`).join("")}
      </g>` : ""}

    ${has(6) ? `
      <rect x="96" y="30" width="168" height="26" rx="8" fill="#e0a72e" stroke="${ink}" stroke-width="2.5"/>
      <text x="180" y="48" text-anchor="middle" font-family="'Bangers','Baloo 2',sans-serif" font-size="15" letter-spacing="1" fill="${ink}">CHAMPIONSHIP NIGHT</text>
      <circle cx="60" cy="24" r="10" fill="#f7d87c" stroke="${ink}" stroke-width="2"><animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite"/></circle>
      <circle cx="300" cy="24" r="10" fill="#f7d87c" stroke="${ink}" stroke-width="2"><animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite"/></circle>` : ""}
  </svg>`;
}

function renderGym() {
  const si = gymStageIdx();
  const st = GYM_STAGES[si];
  $("#gymName").textContent = st.name;
  $("#gymDesc").textContent = st.d;
  $("#gymScene").innerHTML = gymSceneSVG(si);

  const nxt = GYM_STAGES[si + 1];
  $("#gymNext").innerHTML = nxt
    ? `<div class="gymNext__bar"><span style="width:${clamp(S.mastered.length / nxt.need * 100, 4, 100)}%"></span></div>
       <p>Master <strong>${nxt.need - S.mastered.length} more skill${nxt.need - S.mastered.length === 1 ? "" : "s"}</strong> to unlock <strong>${nxt.name}</strong> 🔓</p>`
    : `<p class="gymNext__max">🏆 Your gym is at its greatest form. The arena is packed — for YOU.</p>`;

  // avatar + shop
  const av = $("#avatarBox");
  av.innerHTML = boxerSVG();
  av.dataset.pose = "guard";

  const kinds = [["gloves", "Gloves"], ["trunks", "Trunks"], ["band", "Headband"]];
  $("#shopBox").innerHTML = kinds.map(([kind, label]) => `
    <div class="shop__group">
      <p class="shop__label">${label}</p>
      <div class="shop__row">
        ${SHOP.filter(x => x.kind === kind).map(item => {
          const owned = S.owned.includes(item.id);
          const on = S.equip[kind] === item.id;
          return `<button class="swatch ${on ? "is-on" : ""} ${owned ? "" : "is-locked"}"
            style="--c:${item.color}" data-id="${item.id}"
            title="${item.name}${owned ? "" : " — " + item.cost + " coins"}">
            ${owned ? "" : `<span class="swatch__cost">🪙${item.cost}</span>`}
          </button>`;
        }).join("")}
        ${kind === "band" ? `<button class="swatch swatch--none ${S.equip.band === null ? "is-on" : ""}" data-id="band-none" title="No headband">✕</button>` : ""}
      </div>
    </div>`).join("");

  $$(".swatch", $("#shopBox")).forEach(b => b.addEventListener("click", () => {
    const id = b.dataset.id;
    if (id === "band-none") { S.equip.band = null; save(); sfx.pop(); renderGym(); return; }
    const item = SHOP.find(x => x.id === id);
    if (!S.owned.includes(id)) {
      if (S.coins < item.cost) { coachSay(`You need ${item.cost - S.coins} more coins for ${item.name}. Missions pay coins, champ!`); sfx.miss(); return; }
      S.coins -= item.cost; S.owned.push(id); sfx.coin();
      coachSay(`${item.name} — yours! Looking sharp. 🧤`);
    } else sfx.pop();
    S.equip[item.kind] = id;
    save(); renderTop(); renderGym();
  }));

  // badges
  $("#badgeGrid").innerHTML = BADGES.map(b => {
    const got = !!S.badges[b.id];
    return `<div class="badge ${got ? "is-got" : ""}" title="${b.d}">
      <span class="badge__e">${got ? b.e : "❔"}</span><strong>${b.name}</strong><em>${b.d}</em>
    </div>`;
  }).join("");
}

/* ============================================================
   PARENTS' CORNER
   ============================================================ */
let gateAnswer = null;
function armGate() {
  const a = 3 + Math.floor(Math.random() * 6), b = 4 + Math.floor(Math.random() * 6);
  gateAnswer = a * b;
  $("#gateQ").textContent = `What is ${a} × ${b}?`;
  $("#gateA").value = "";
  $("#gateNope").hidden = true;
}
$("#gateForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (Number($("#gateA").value) === gateAnswer) {
    $("#parentGate").hidden = true;
    $("#parentBoard").hidden = false;
    renderParents();
  } else { $("#gateNope").hidden = false; armGate(); }
});
$("#gateLock").addEventListener("click", () => {
  $("#parentBoard").hidden = true;
  $("#parentGate").hidden = false;
  armGate();
});

function renderParents() {
  const weekKeys = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
  const weekMins = weekKeys.reduce((t, k) => t + (S.log[k] || 0), 0);

  $("#pStats").innerHTML = [
    [S.mastered.length + " / " + SKILLS.length, "skills mastered"],
    [S.streak, "day streak"],
    [Math.round(weekMins) + " min", "practiced this week"],
    [S.campsDone, "training camps"],
    [S.gamesWon, "games won"],
    [S.xp, "total XP"],
  ].map(([n, l]) => `<div class="pstat"><strong>${n}</strong><span>${l}</span></div>`).join("");

  const maxM = Math.max(10, ...weekKeys.map(k => S.log[k] || 0));
  $("#weekBars").innerHTML = weekKeys.map(k => {
    const m = S.log[k] || 0;
    const day = new Date(k + "T12:00:00").toLocaleDateString(undefined, { weekday: "short" });
    return `<div class="wbar"><span class="wbar__col"><i style="height:${clamp(m / maxM * 100, m > 0 ? 8 : 0, 100)}%"></i></span><em>${day}</em><b>${m ? Math.round(m) + "m" : "–"}</b></div>`;
  }).join("");

  $("#pSkills").innerHTML = BELTS.map((b, bi) => `
    <div class="pbelt">
      <span class="pbelt__chip" style="--bc:${b.color}">${b.name}</span>
      <div class="pbelt__list">
        ${beltSkills(bi).map(sk => `<span class="${isMastered(sk.id) ? "is-done" : ""}">${isMastered(sk.id) ? "✅" : "⬜"} ${sk.name}</span>`).join("")}
      </div>
    </div>`).join("");

  const miles = [
    ...Object.entries(S.belts).map(([bi, iso]) => ({ iso, t: `Earned the ${BELTS[bi].name} 🥋` })),
    ...Object.entries(S.badges).map(([id, iso]) => {
      const b = BADGES.find(x => x.id === id);
      return { iso, t: `Badge: ${b.e} ${b.name}` };
    }),
  ].sort((a, b) => b.iso.localeCompare(a.iso)).slice(0, 12);
  $("#pMiles").innerHTML = miles.length
    ? miles.map(m => `<li><span>${new Date(m.iso).toLocaleDateString()}</span>${m.t}</li>`).join("")
    : `<li><span></span>Milestones will appear here as your child progresses.</li>`;

  $("#pTips").innerHTML = PARENT_TIPS.map(t => `<li>${t}</li>`).join("");
}

/* ============================================================
   TEAM — partner rounds (grown-up + kid, gloves on)
   ============================================================ */
function renderPartner() {
  const list = $("#partnerList");
  list.innerHTML = PARTNER.map(r => `
    <button class="pcard" data-p="${r.id}">
      <span class="pcard__emoji">${r.emoji}</span>
      <span class="pcard__text">
        <em>${r.stage}</em>
        <strong>${r.name}</strong>
        <span class="pcard__gear">🧰 ${r.gear.join(" · ")}</span>
      </span>
      <span class="pcard__go">▶</span>
    </button>`).join("");
  $$(".pcard", list).forEach(b => b.addEventListener("click", () => openPartner(b.dataset.p)));
}

let PA = null; // { routine, phase, round, timers }
function openPartner(id) {
  const r = PARTNER.find(x => x.id === id);
  if (!r) return;
  PA = { routine: r };
  $("#partnerOv").hidden = false;
  document.body.classList.add("no-scroll");
  renderPartnerCard();
}
function closePartner() {
  stopTimers(); stopVoice();
  PA = null;
  $("#partnerOv").hidden = true;
  document.body.classList.remove("no-scroll");
  renderAll();
}
$("#paClose").addEventListener("click", () => {
  if (PA && PA.phase === "rounds") { if (!confirm("Leave this workout?")) return; }
  closePartner();
});

/* intro card: gear, grown-up cue, safety checklist gate */
function renderPartnerCard() {
  const r = PA.routine; PA.phase = "card";
  $("#paProg").innerHTML = "";
  const stepsHTML = r.steps ? `
    <div class="psteps">
      ${r.steps.map((s, i) => `<div class="pstep"><span>${i + 1}</span><div><strong>${s.t}</strong><p>${s.d}</p></div></div>`).join("")}
    </div>` : "";
  const checks = PARTNER_SAFETY.concat(r.safetyExtra ? [r.safetyExtra] : []);
  $("#paBody").innerHTML = `
    <div class="mphase">
      <p class="mission__eyebrow">Team workout · ${r.stage}</p>
      <h2 class="mission__title">${r.emoji} ${r.name}</h2>
      <div class="coachcard">
        <div class="coachcard__face">${coachSVG()}</div>
        <p><strong>Grown-up:</strong> ${r.parentCue}</p>
      </div>
      <div class="pgear">
        <p class="pgear__h">You'll need</p>
        <ul>${r.gear.map(g => `<li>🧰 ${g}</li>`).join("")}</ul>
      </div>
      ${stepsHTML}
      <div class="safety">
        <p class="safety__h">🛡️ Grown-up, tap each to confirm:</p>
        ${checks.map((c, i) => `
          <label class="safety__row"><input type="checkbox" data-chk="${i}" /> <span>${c}</span></label>`).join("")}
      </div>
      <button class="btn btn--go btn--big" id="paStart" disabled>Start the rounds&nbsp;&nbsp;🔔</button>
      <p class="pdisclaim">Light and controlled — pads and body only, never the head. The grown-up sets the pace and stops any time.</p>
    </div>`;

  const boxes = $$('[data-chk]', $("#paBody"));
  const startBtn = $("#paStart");
  const refresh = () => { startBtn.disabled = !boxes.every(b => b.checked); };
  boxes.forEach(b => b.addEventListener("change", () => { sfx.pop(); refresh(); }));
  startBtn.addEventListener("click", () => { sfx.bell(); runPartnerRounds(); });
}

/* the rounds: countdown timer + spoken/animated combo caller */
function runPartnerRounds() {
  stopTimers();
  const r = PA.routine; PA.phase = "rounds";
  $("#paBody").innerHTML = `
    <div class="mphase">
      <p class="mission__eyebrow" id="paStage">Round 1 of ${r.rounds}</p>
      <div class="pcaller" id="paCue">GET READY…</div>
      <div class="ptimer">
        <div class="ptimer__ring">
          <svg viewBox="0 0 120 120">
            <circle class="ptimer__track" cx="60" cy="60" r="52"/>
            <circle class="ptimer__fill" id="paFill" cx="60" cy="60" r="52"/>
          </svg>
          <div class="ptimer__mid">
            <span class="ptimer__phase" id="paPhase">READY</span>
            <span class="ptimer__num" id="paNum">${r.work}</span>
          </div>
        </div>
        <p class="ptimer__coach" id="paNote">Gloves up — here we go!</p>
      </div>
      <button class="btn btn--ghost btn--sm" id="paStop">End workout</button>
    </div>`;
  $("#paStop").addEventListener("click", () => { if (confirm("End this workout?")) closePartner(); });

  const CIRC = 2 * Math.PI * 52;
  const fill = $("#paFill");
  fill.style.strokeDasharray = CIRC;
  const setRing = (frac) => { fill.style.strokeDashoffset = CIRC * (1 - frac); };

  let round = 1, phase = "work", left = r.work, since = -1;

  function callOne() {
    const c = choice(r.pool);
    const cue = $("#paCue");
    cue.textContent = c.show;
    cue.classList.remove("is-hit"); void cue.offsetWidth; cue.classList.add("is-hit");
    say(c.say); sfx.pop();
  }
  function startPhase(p) {
    phase = p; left = (p === "work") ? r.work : r.rest; since = -1;
    if (p === "work") {
      $("#paPhase").textContent = "BOX!"; $("#paStage").textContent = `Round ${round} of ${r.rounds}`;
      $("#paNote").textContent = choice(COACH.practice); sfx.bell();
    } else {
      $("#paPhase").textContent = "REST"; $("#paCue").textContent = "💧 Water!";
      $("#paNote").textContent = "Great work — shake it out, sip some water."; say("Rest. Water break."); sfx.ding();
    }
    tick();
    tickInt = setInterval(tick, 1000);
  }
  function tick() {
    $("#paNum").textContent = left;
    setRing(left / (phase === "work" ? r.work : r.rest));
    if (phase === "work") {
      since++;
      if (since % r.callEvery === 0 && left > 1) callOne();
    }
    if (left <= 0) {
      clearInterval(tickInt);
      if (phase === "work") {
        addMinutes(r.work / 60); save();
        if (round >= r.rounds) return finishRounds();
        startPhase("rest");
      } else { round++; startPhase("work"); }
      return;
    }
    if (left <= 3 && phase === "work") sfx.pop();
    left--;
  }
  function finishRounds() {
    stopVoice();
    S.partnersDone = (S.partnersDone || 0) + 1;
    S.xp += r.xp; S.coins += 20;
    markActiveDay(); checkBadges(true); save();
    say("Amazing work, champ!");
    $("#paBody").innerHTML = `
      <div class="mphase mphase--party">
        <div class="powburst">TEAM!</div>
        <p class="party__pop">WORKOUT COMPLETE</p>
        <h2 class="mission__title">🤝 ${r.name}</h2>
        <div class="coachcard">
          <div class="coachcard__face">${coachSVG()}</div>
          <p><strong>Coach Duke:</strong> ${choice(COACH.celebrate)} Give your grown-up a glove touch!</p>
        </div>
        <div class="party__loot">
          <span class="loot">⭐ +${r.xp} XP</span>
          <span class="loot">🪙 +20 coins</span>
          ${S.streak > 1 ? `<span class="loot">🔥 ${S.streak}-day streak</span>` : ""}
        </div>
        <button class="btn btn--go btn--big" id="paDone">Back to Team&nbsp;&nbsp;🥊</button>
      </div>`;
    confettiBurst(); sfx.win();
    $("#paDone").addEventListener("click", () => closePartner());
  }

  startPhase("work");
}

/* ============================================================
   TABS & BOOT
   ============================================================ */
function switchPane(name) {
  $$(".tabpane").forEach(p => p.classList.toggle("is-active", p.id === "pane-" + name));
  $$(".tabbar__tab").forEach(t => t.classList.toggle("is-active", t.dataset.pane === name));
  if (name === "gym") renderGym();
  if (name === "camp") renderCamp();
  if (name === "team") renderPartner();
  window.scrollTo({ top: 0 });
}
$$(".tabbar__tab").forEach(t => t.addEventListener("click", () => { sfx.pop(); switchPane(t.dataset.pane); }));

$("#soundBtn").addEventListener("click", () => {
  S.sound = !S.sound; save(); renderTop();
  if (S.sound) sfx.ding();
});

function renderAll() {
  renderTop(); renderJourney(); renderCamp(); renderGym();
  if (!$("#parentBoard").hidden) renderParents();
}

/* boot */
$("#coachHead").innerHTML = coachSVG();
armGate();
renderGreeting();
renderAll();
checkBadges(false); save();
