# 🎪 Mira & Maia's Game Arcade

A big collection of bright, kid-friendly math games that run **entirely in the browser** — no
install, no build step, no internet required once loaded. Made for a 5-year-old (and everyone else).

**▶️ Play online:** https://markeichenlaub.github.io/mira-and-maia-games/

## What's inside

### 🐻 Beast Academy Playground (playable versions)
Playable simulations of the free tabletop activities from
[Beast Academy Playground](https://beastacademy.com/playground). Every game links to its official
Beast Academy page from its **Rules** screen. Categories:

- **Thinking Games** — Sim, Circuit Breaker, Fifteen, Anywhere Nim, Odd Knights, Bumper Cars,
  High Ground, Troll Hole, Fruit Flies, Fox & Hare, Hexagon vs Triangle, Sprouts, Cookie Cutter,
  Blind Heist, Carronade, Cartographer
- **Dice & Luck** — Pig, Pick Your Pony, Odds & Evens, Towers, X-Ray Dice
- **Card Games** — Tens Go Fish, Hungry Monster, Speed
- **Memory** — Memory Match, Ten Apart
- **Aim & Action** — Wrecking Ball, Trashketball, Kanga-Ruler
- **Make & Explore** (interactive math toys) — Möbius Madness, Magic Fortune Teller,
  Candle Conundrum, Flexagon, Fractal Fold-Out, Spin-a-Dodecahedron, Number Deck (printable)

Most games offer **🤖 vs Computer**, **🧑‍🤝‍🧑 2-player pass-and-play**, and/or **🙂 solo** modes.
Where a game is mathematically *solved* (e.g. Sim, Fifteen, the Nim games, Fox & Hare), the computer
plays a verified perfect/near-perfect strategy — usually with an **Easy** setting so little kids can win.

### ⭐ Mira & Maia's Own Games
Games Mark made with Claude, imported and made fully offline: Penguin Maze, Six vs. Nine,
Time to Get Up?, Photo Memory, Piano Garden.

### 🔎 Spot It Puzzles
p5.js projective-plane matching puzzles: Order 3, Order 5, and the Fano Plane.

## How it works
- `index.html` — the arcade hub (reads `assets/games.js` for the game list).
- `assets/common.css` + `assets/common.js` — the shared "engine": kid-friendly design system,
  Web-Audio sound effects (no audio files), confetti, dice/cards, and the standard page chrome
  (back-to-arcade, Rules modal with the Beast Academy link, mode select, sound toggle).
- `ba/<slug>/index.html`, `mine/<slug>/index.html`, `spot-it/<slug>/` — the games.
- `assets/vendor/` — local copies of React/Tailwind/d3/etc. so the imported games work offline.

Everything is plain HTML/CSS/JS.

### ▶️ Play locally (offline)
- **Easiest:** double-click **`launch-arcade.cmd`** (or press **`CapsLock + A`** — wired up in
  `autohotkey-scripts/default.ahk`). It starts a tiny local web server on port 8777 and opens the
  arcade in your browser. Run it again any time — it reuses the server if it's already running.
- **By hand:** from this folder run `python -m http.server 8777` and open `http://localhost:8777/`.
- **Simplest of all:** just open `index.html` directly. Every game works from `file://` **except** a
  couple of imported ones that load data files (Cartographer's maps, Photo Memory's geocoding) — those
  need the local server above.

## Credits
The Beast Academy games are fan-made playable versions of activities from **Beast Academy Playground**
(© Art of Problem Solving). This project is not affiliated with or endorsed by Beast Academy.
