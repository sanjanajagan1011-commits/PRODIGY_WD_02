# ⏱️ Stopwatch

A sleek, animated stopwatch with a dark neon aesthetic — built with pure HTML, CSS, and JavaScript. No frameworks. No dependencies.

---

## ✨ Features

- ▶️ **Start / Pause / Resume / Reset** controls
- 🏁 **Lap recording** with automatic best & slowest lap highlighting
- 🔵 **Animated SVG ring** — progress indicator cycles per minute
- 🟢 **Millisecond precision** display (`.00` centiseconds)
- 🎞️ Smooth rendering via `requestAnimationFrame` — no drift
- 💡 Pulsing live status indicator

---

## 🗂️ File Structure

```
stopwatch/
├── index.html       # Markup & layout
├── css/
│   └── style.css    # All styles, animations, variables
└── js/
    └── app.js       # Timer logic, lap tracking, SVG ring
```

---

## 🚀 Usage

```bash
# Just open in your browser — no build step required
open index.html
```

Or drag `index.html` into any browser window.

---

## 🧠 How It Works

| Feature | Implementation |
|---|---|
| Accurate timing | `Date.now()` delta — avoids `setInterval` drift |
| Smooth animation | `requestAnimationFrame` loop |
| SVG ring progress | `stroke-dashoffset` on a circle with `r=130` (circumference ≈ 816px) |
| Lap analysis | `Math.min/max` computed across all laps on each render |

**Timing accuracy:** Instead of incrementing a counter with `setInterval`, the timer records `startTime = Date.now()` and computes `elapsed = Date.now() - startTime` on every frame. This ensures the display stays accurate even when the browser tab is backgrounded or the JS event loop is busy.

---

## 🎨 Design

- **Theme:** Dark neon / cyberpunk
- **Fonts:** [Orbitron](https://fonts.google.com/specimen/Orbitron) (display) + Inter (UI)
- **Colors:** Deep violet `#7c3aed` + cyan `#06b6d4` accent
- **Animations:** CSS `@keyframes` + `requestAnimationFrame`

---

## 🔧 Customization

Edit `css/style.css` to change colors via CSS variables at the top:

```css
:root {
  --accent: #7c3aed;   /* Primary purple */
  --accent2: #06b6d4;  /* Cyan accent */
  --accent3: #f59e0b;  /* Amber (lap button) */
  --bg: #0a0a12;       /* Background */
}
```

---

## 📄 License

MIT — see [LICENSE](../LICENSE)
