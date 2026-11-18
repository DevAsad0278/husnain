# A Moment for Husnain — Husnain Yaseen

A personal, developer-crafted six-scene interactive birthday microsite for **Husnain Yaseen**, built with **pure HTML5, CSS3, TypeScript, GSAP + ScrollTrigger, and Framer Motion's verified vanilla DOM API (`framer-motion/dom`)**.

No Next.js, no React, no JSX, and no company branding.

## Setup & Scripts

```bash
npm install
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # Type-check with tsc and build static bundle in dist/
npm run preview  # Preview production build
```

## Project Structure

- `index.html` — Semantic HTML5 structure for all 6 scenes, top status bar, progress system, custom cursor, and canvases
- `src/main.ts` — Stylesheet and application entry point
- `src/types/experience.ts` — Central `Scene` union type and `sceneOrder`
- `src/styles/` — `base.css`, `design-system.css`, `scenes.css`, `animations.css`, `responsive.css`
- `src/scripts/`
  - `app.ts` — Orchestrates all 6 scenes, ambient spotlight, magnetic buttons, and full replay
  - `scene-controller.ts` — Central scene state, `SCENE 01 / 06` progress, and GSAP transitions
  - `intro-terminal.ts` — Scene 0 terminal typing sequence, progress bar, skip-intro, and welcome reveal
  - `code-window.ts` — Scene 1 `birthday.ts` code reveal, moving line highlight, SVG progress ring, and `BUILD SUCCESS`
  - `gift.ts` — Scene 2 CSS 3D charcoal gift box, mint seam to gold glow, lid/ribbon opening, and particle burst
  - `birthday-reveal.ts` — Scene 3 `Happy Birthday` / `Husnain Yaseen` reveal, SVG underline, orbiting ring, and fireworks
  - `appreciation.ts` — Scene 4 GSAP ScrollTrigger personal note, typed closing line, and `READ AGAIN`
  - `cake.ts` — Scene 5 minimal luxury cake, `BLOW OUT THE CANDLES` finale, `REPLAY EXPERIENCE`, and `COPY LINK`
  - `particles.ts` — Ambient gold/mint particles, gift burst, and distant fireworks
  - `cursor.ts` — Fine-pointer custom mint dot + gold trailing ring
  - `sound.ts` — Optional Web Audio API synthesized chimes/whoosh (never autoplays)
  - `accessibility.ts` — Reduced-motion, touch detection, and focus management
