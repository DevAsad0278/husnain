# Husnain Yaseen --- Premium Birthday Experience

## Pure HTML + CSS + TypeScript + Framer Motion + GSAP

### Complete implementation brief, interactions, animation timelines and AI prompts

**Recipient:** Husnain Yaseen\
**Presented by:** Stack Fellows\
**Concept:** A Moment Made for You\
**Build type:** Front-end static microsite --- no Next.js, no React, no
server required\
**Core technologies:** HTML5, CSS3, TypeScript, Framer Motion, GSAP +
ScrollTrigger\
**Optional tooling:** Vite, Three.js (optional only), canvas particles\
**Design reference discovery:** https://www.framer.com/marketplace/

------------------------------------------------------------------------

# 1. Important Technology Decision

Build this as a standard front-end website using:

-   Semantic HTML5 for page structure.
-   CSS3 for layout, responsive design, 3D transforms, lighting and
    visual effects.
-   TypeScript for application state, interactions, utilities and DOM
    behavior.
-   GSAP + ScrollTrigger for cinematic timelines, SVG drawing and
    scroll-linked effects.
-   Framer Motion only if using its vanilla JavaScript/TypeScript API
    (`framer-motion` mini / `animate` API supported by the installed
    version) for DOM animation. Do not use React components or React
    hooks.
-   Vite as a lightweight development server and TypeScript build tool.
    Vite is not a framework and does not require Next.js.

**No Next.js. No React. No JSX. No React components. No React hooks.**

If the installed Framer Motion version does not expose a compatible
vanilla API, use GSAP for all DOM animation and retain Framer Motion as
a design/interaction reference; do not add React merely to use its React
API. Confirm package API compatibility before implementation.

## Suggested project structure

``` text
husnain-birthday/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.ts
│   ├── styles/
│   │   ├── main.css
│   │   ├── chapters.css
│   │   ├── animations.css
│   │   └── responsive.css
│   ├── scripts/
│   │   ├── experience.ts
│   │   ├── navigation.ts
│   │   ├── gift.ts
│   │   ├── birthday-reveal.ts
│   │   ├── appreciation.ts
│   │   ├── cake.ts
│   │   ├── particles.ts
│   │   ├── cursor.ts
│   │   ├── sound.ts
│   │   └── accessibility.ts
│   └── assets/
│       ├── images/
│       ├── audio/
│       └── fonts/
├── public/
│   └── favicon.svg
└── README.md
```

------------------------------------------------------------------------

# 2. Creative Direction

Create a premium, cinematic birthday microsite. It should feel like a
bespoke digital gift rather than a generic birthday template.

## Visual identity

  Element                Specification
  ---------------------- -------------------------
  Background             `#080A0C`
  Secondary background   `#111518`
  Elevated surface       `#171D20`
  Champagne gold         `#D6B779`
  Soft gold              `#F0D9A6`
  Warm ivory             `#F5F0E7`
  Muted text             `#A9A69F`
  Border                 `rgba(214,183,121,.22)`

**Typography** - Display: Cormorant Garamond or Playfair Display. -
Body/UI: Inter or Manrope. - Large headlines with elegant line breaks
and restrained letter spacing. - Use `clamp()` for fluid typography.

**Visual details** - Deep charcoal canvas. - Fine film grain. - Subtle
gold particles. - Soft moving spotlight. - Thin champagne borders. -
Elegant light blooms. - Restrained fireworks. - No random icons, emojis,
childish illustrations or excessive gradients.

Do not invent personal memories, job titles, achievements, photos or
personality claims about Husnain. Only use information supplied by the
team.

------------------------------------------------------------------------

# 3. Full Experience --- Five Chapters

## Chapter 0 --- The Arrival

### Content

Small label: `STACK FELLOWS PRESENTS`

Main headline: \> A little something\
\> extraordinary awaits.

Supporting line: \> Made with appreciation, just for you.

CTA: `UNWRAP THE MOMENT`

Footer: `A birthday experience for Husnain Yaseen`

### Visual and animation

-   Full viewport dark background.
-   Moving warm spotlight behind the heading.
-   Tiny particles moving slowly at different depths.
-   Main headline revealed with a masked upward movement.
-   Supporting copy fades in after the heading.
-   CTA enters with a soft scale and gold highlight.
-   Fine progress line at the bottom.

### Interactions

1.  Initial background fade-in.
2.  Label reveals.
3.  Heading lines animate with stagger.
4.  Supporting text fades in.
5.  CTA becomes active.
6.  Clicking CTA transitions to Chapter 1.
7.  Disable CTA briefly during transition to prevent duplicate clicks.

### Suggested timing

-   Background: 900ms.
-   Eyebrow: 500ms.
-   Heading: 800ms.
-   Supporting copy: 550ms.
-   CTA: 450ms.

------------------------------------------------------------------------

## Chapter 1 --- The Gift

### Content

> Every great person deserves\
> a moment worth remembering.

CTA: `OPEN YOUR SURPRISE`

### Visual

-   Premium matte-black gift box.
-   Champagne-gold ribbon and bow.
-   Soft studio reflection.
-   Ground shadow.
-   Warm light inside the box.
-   Build the box using HTML elements and CSS 3D transforms, or use a
    generated transparent asset.

### Interactions

1.  Box gently floats.
2.  Desktop pointer movement tilts the box slightly.
3.  Hover brightens ribbon and raises the box.
4.  Click opens the lid.
5.  Ribbon separates.
6.  Warm light blooms from the center.
7.  Small gold particles burst outward.
8.  Transition to Chapter 2.

### Timing

-   Idle float: 4--6 seconds.
-   Hover: 300ms.
-   Lid opening: 900ms.
-   Inner glow: 600ms.
-   Particle burst: 1200ms.

Use GSAP for the coordinated opening timeline. Make the CTA a semantic
HTML button.

------------------------------------------------------------------------

## Chapter 2 --- The Grand Reveal

### Content

Eyebrow: `TODAY IS YOUR DAY`

Main: \> Happy Birthday

Name: \> Husnain Yaseen

Supporting: \> Wishing you a year filled with meaningful milestones, new
opportunities and moments worth celebrating.

### Visual

-   Large editorial typography.
-   Name is the focal point.
-   Gold underline draws itself from left to right.
-   Soft spotlight.
-   Fine gold particles.
-   Distant fireworks after the name reveal.
-   Keep the text area clear and readable.

### Interactions

1.  `Happy Birthday` reveals with a masked upward motion.
2.  `Husnain Yaseen` transitions from blur to sharp.
3.  Gold underline draws using SVG stroke animation.
4.  Fireworks appear in distant background.
5.  Confetti floats gently.
6.  Continue control appears.
7.  Scroll or button moves to Chapter 3.

------------------------------------------------------------------------

## Chapter 3 --- A Note of Appreciation

### Suggested message

> Great moments are made even better by the people who bring energy,
> commitment and positivity to the journey.
>
> Today is a chance to celebrate you and wish you continued growth,
> happiness and success in everything ahead.
>
> May the year ahead bring fresh opportunities, memorable achievements
> and plenty of reasons to smile.
>
> **Happy Birthday, Husnain!**

### Visual

-   Editorial typography.
-   Dark panel with fine gold border.
-   Large opening quotation mark.
-   Thin gold vertical line.
-   Optional real team photo only if provided and approved.

### Interactions

1.  Panel reveals on scroll.
2.  Paragraphs animate sequentially.
3.  Final line receives a subtle gold light sweep.
4.  Optional `Read Again` control replays text reveal.
5.  Continue button moves to final chapter.

------------------------------------------------------------------------

## Chapter 4 --- The Celebration

### Content

> Make a wish.

Button: `BLOW OUT THE CANDLES`

After activation: \> May every good thing find its way to you.

Signature: \> With best wishes,\
\> **Team Stack Fellows**

### Visual

-   Minimal premium birthday cake.
-   Ivory frosting and champagne-gold details.
-   Three slim candles with warm flames.
-   Dark cinematic background.
-   Gentle candlelight.

### Interactions

1.  Candle flames flicker.
2.  User clicks the button.
3.  Flames shrink and fade.
4.  Soft wind/swish effect.
5.  Warm light pulse expands.
6.  Final message fades in.
7.  Replay button resets the complete experience.
8.  Optional share action uses Web Share API with copy-link fallback.

Do not infer the recipient's age from candle count.

------------------------------------------------------------------------

# 4. Site-Wide Interaction Details

## Custom cursor

-   Desktop fine-pointer devices only.
-   Small gold dot and subtle trailing ring.
-   Ring expands over interactive controls.
-   Disable on touch devices.
-   Do not hide the native cursor if custom cursor fails.

## Scroll

-   Native scroll should remain usable.
-   Use GSAP ScrollTrigger for reveals.
-   Do not hijack wheel or touch input.
-   Do not force scroll snapping.
-   Each chapter should be a distinct section.
-   Add a progress indicator and accessible chapter status.

## Buttons

-   Gold outline or solid gold CTA.
-   Hover lift: 2--3px.
-   Subtle highlight sweep.
-   Active scale: 0.98.
-   Visible focus outline.
-   Minimum touch target: 44px.

## Audio

-   Never autoplay.
-   Start only after a user gesture.
-   Include mute/unmute control.
-   Use licensed or original audio only.

## Mobile

-   No custom cursor.
-   Reduce particle count.
-   Replace hover-only effects with tap behavior.
-   Keep text readable.
-   Avoid horizontal overflow.
-   Reduce expensive blur and 3D effects on low-power devices.

------------------------------------------------------------------------

# 5. TypeScript Interaction Architecture

## Chapter state

Use one central state value:

``` ts
export type Chapter =
  | "intro"
  | "gift"
  | "reveal"
  | "message"
  | "celebration";

export const chapterOrder: Chapter[] = [
  "intro",
  "gift",
  "reveal",
  "message",
  "celebration",
];
```

## Main experience controller

``` ts
import { chapterOrder, type Chapter } from "./types";

let activeChapter: Chapter = "intro";
let isTransitioning = false;

const chapters = document.querySelectorAll<HTMLElement>("[data-chapter]");

export function goToChapter(next: Chapter): void {
  if (isTransitioning || next === activeChapter) return;

  const current = document.querySelector<HTMLElement>(
    `[data-chapter="${activeChapter}"]`
  );
  const target = document.querySelector<HTMLElement>(
    `[data-chapter="${next}"]`
  );

  if (!target) return;

  isTransitioning = true;

  if (current) {
    current.setAttribute("aria-hidden", "true");
    current.classList.remove("is-active");
  }

  target.hidden = false;
  target.setAttribute("aria-hidden", "false");
  target.classList.add("is-active");

  activeChapter = next;
  updateProgress();

  window.setTimeout(() => {
    if (current) current.hidden = true;
    isTransitioning = false;
  }, 800);
}

export function updateProgress(): void {
  const index = chapterOrder.indexOf(activeChapter);
  const progress = ((index + 1) / chapterOrder.length) * 100;

  const bar = document.querySelector<HTMLElement>("[data-progress]");
  if (bar) bar.style.width = `${progress}%`;

  const status = document.querySelector<HTMLElement>("[data-chapter-status]");
  if (status) status.textContent = `Chapter ${index + 1} of ${chapterOrder.length}`;
}
```

**Implementation note:** This controller is a starting pattern. The
final transition should use GSAP timelines or the chosen Framer Motion
vanilla API rather than relying only on the timeout. Ensure
outgoing/incoming sections are correctly hidden after animation and
focus is managed when chapters change.

## Gift timeline example

``` ts
import gsap from "gsap";

const giftButton = document.querySelector<HTMLButtonElement>(
  "[data-open-gift]"
);

const giftLid = document.querySelector<HTMLElement>("[data-gift-lid]");
const giftGlow = document.querySelector<HTMLElement>("[data-gift-glow]");

let giftOpened = false;

giftButton?.addEventListener("click", () => {
  if (giftOpened || !giftLid || !giftGlow) return;
  giftOpened = true;
  giftButton.disabled = true;

  const timeline = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => {
      // Call the chapter navigation function here.
    },
  });

  timeline
    .to(giftLid, { rotateX: -125, y: -25, duration: 0.9 })
    .to(giftGlow, { opacity: 1, scale: 1.5, duration: 0.6 }, "-=0.4");
});
```

## Birthday reveal example

``` ts
import gsap from "gsap";

export function animateBirthdayReveal(): void {
  const title = document.querySelector("[data-birthday-title]");
  const name = document.querySelector("[data-recipient-name]");
  const underline = document.querySelector<SVGPathElement>(
    "[data-name-underline]"
  );

  if (!title || !name) return;

  const timeline = gsap.timeline();

  timeline
    .fromTo(title, { y: 55, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "power3.out"
    })
    .fromTo(name, { y: 35, opacity: 0, filter: "blur(12px)" }, {
      y: 0, opacity: 1, filter: "blur(0px)",
      duration: 1.1, ease: "power3.out"
    }, "-=0.35");

  if (underline) {
    const length = underline.getTotalLength();
    underline.style.strokeDasharray = `${length}`;
    underline.style.strokeDashoffset = `${length}`;

    timeline.to(underline, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");
  }
}
```

------------------------------------------------------------------------

# 6. Framer Motion --- Vanilla DOM API

**Important:** Framer Motion is widely used through React, but this
project must remain plain HTML/CSS/TypeScript. Do not write JSX or
import React. Before coding, inspect the installed Framer Motion package
and confirm its vanilla `animate` API and supported imports.

If the installed version supports the vanilla API, use it for simple DOM
transitions such as:

``` ts
// Confirm the exact import/API against the installed Framer Motion version.
import { animate } from "motion";

const heading = document.querySelector<HTMLElement>(
  "[data-intro-heading]"
);

if (heading) {
  animate(
    heading,
    { opacity: [0, 1], y: [28, 0] },
    { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  );
}
```

If the package does not support this API, do not force a React
integration. Use GSAP for the actual animations and CSS transitions for
simple hover/focus interactions. Keep the project framework-free.

------------------------------------------------------------------------

# 7. GSAP Animation Requirements

Use GSAP for: - Gift box opening sequence. - SVG underline drawing. -
Coordinated chapter transitions. - Scroll-triggered appreciation text. -
Ambient spotlight movement. - Fireworks and particle timeline. - Candle
extinguish finale.

Rules: 1. Animate transforms and opacity where possible. 2. Avoid
layout-heavy animation. 3. Use `gsap.context()` or scoped selectors
where suitable. 4. Kill/revert timelines and ScrollTriggers when
components/sections are disposed. 5. Avoid duplicate listeners and
duplicate click triggers. 6. Never animate the same property on the same
element with Framer Motion and GSAP simultaneously. 7. Respect
reduced-motion preference.

------------------------------------------------------------------------

# 8. AI Image Generation Prompts

Generate assets without text. All headings and names must be HTML text.

## Prompt A --- Cinematic background

> Premium cinematic background for a luxury birthday microsite, deep
> charcoal-black environment, restrained champagne-gold light bloom,
> very fine floating gold dust, subtle film grain, elegant depth,
> generous negative space in the center for typography, no text, no
> logo, no people, no watermark, 16:9.

## Prompt B --- Gift box

> Single sculptural matte-black gift box with elegant champagne-gold
> satin ribbon and bow, realistic studio lighting, subtle gold
> reflections, dark cinematic background, premium luxury product
> photography, isolated centered composition, no text, no logo, no
> watermark, 1:1.

## Prompt C --- Particle burst

> Delicate champagne-gold metallic particle burst expanding outward,
> tiny sparkling points, elegant restrained celebration, transparent
> background if supported, no text, no logo, no watermark.

## Prompt D --- Cake

> Premium minimal birthday cake, ivory frosting, fine champagne-gold
> detailing, three slim gold candles with warm realistic flames,
> cinematic dark background, centered composition, no numbers, no
> writing, no logo, no watermark, 1:1.

## Prompt E --- Fireworks

> Distant elegant champagne-gold fireworks against a midnight-black sky,
> subtle sparkling trails, clean negative space in the center for
> birthday typography, restrained luxury celebration, no text, no
> people, no logo, no watermark, 16:9.

## Prompt F --- Metallic texture

> Seamless subtle champagne-gold brushed metallic texture, fine grain,
> low contrast, premium editorial material, no text, no logo, no
> watermark, square tile.

------------------------------------------------------------------------

# 9. Master Coding-Agent Prompt

Copy this into your coding agent:

> Act as a senior front-end creative developer, motion designer and
> TypeScript engineer. Build a complete premium interactive birthday
> website for **Husnain Yaseen**, presented by **Stack Fellows**.
>
> **Strict technology requirement:** Use plain HTML5, CSS3 and
> TypeScript. Use GSAP and ScrollTrigger for advanced timelines and
> scroll animation. Use Framer Motion only through its supported vanilla
> DOM animation API if available in the installed package. Use Vite only
> as a lightweight dev server/build tool. Do not use Next.js, React,
> JSX, React components or React hooks. This must remain a
> framework-free front-end microsite.
>
> Build a five-chapter cinematic journey: intro, interactive gift
> opening, grand birthday reveal, appreciation message and interactive
> cake finale. Each chapter must have real working interactions, not
> static mockups.
>
> Use a premium charcoal-black, champagne-gold and warm-ivory design
> system. Use elegant serif display typography and modern sans-serif
> body typography. Add restrained particles, subtle film grain, moving
> ambient spotlight, gold line drawing, distant fireworks and refined
> page transitions. Avoid generic templates, childish graphics, emojis,
> random icons, clutter and excessive gradients.
>
> The gift must open through a semantic button and keyboard activation.
> The recipient's name must appear exactly as "Husnain Yaseen". The cake
> button must extinguish the candles and reveal the final message.
> Replay must reset all application state and animation timelines. Add
> progress indication, mobile-friendly interactions, responsive layouts,
> visible focus states, reduced-motion support and touch support.
>
> Use a central TypeScript chapter state and separate modules for
> navigation, gift, reveal, appreciation, cake, particles, cursor and
> sound. Use semantic HTML and CSS custom properties. Clean up event
> listeners, GSAP timelines and ScrollTriggers. Do not animate the same
> property on the same element with both animation libraries.
>
> Never autoplay audio. If sound is included, provide a mute toggle and
> start only after user interaction. Do not invent personal details,
> achievements, job title, memories or photos. Use HTML for text, not
> text baked into images.
>
> First inspect the installed Framer Motion package to verify whether
> its vanilla animation API is supported. Do not add React to make
> Framer Motion work. If no compatible vanilla API exists, implement the
> animation with GSAP and CSS while keeping the project framework-free.
>
> Deliver a fully working project with all source files, package
> configuration, setup instructions and QA checklist. Test desktop,
> tablet and mobile. Resolve all TypeScript errors, broken interactions,
> horizontal overflow, console errors and hydration issues (there should
> be no React/Next.js hydration system).

------------------------------------------------------------------------

# 10. Individual Coding Prompts

## Prompt 1 --- HTML structure and CSS system

> Create the complete semantic index.html structure for the five
> birthday chapters. Add all required IDs/data attributes for TypeScript
> interactions. Create a premium responsive CSS design system with
> charcoal, champagne gold and ivory. No React, no JSX, no Next.js. Use
> semantic buttons and headings. Keep all copy editable as HTML.

## Prompt 2 --- Intro animation

> Implement the opening chapter in TypeScript. Animate the label,
> heading, supporting text and CTA. Use GSAP timelines for the
> coordinated sequence and the supported Framer Motion vanilla API only
> if available. Add ambient light and subtle particles. Add
> reduced-motion fallback.

## Prompt 3 --- Gift interaction

> Implement the CSS 3D gift box and GSAP opening timeline. Add floating
> idle animation, desktop pointer tilt, hover glow, ribbon/lid opening
> and particle burst. Prevent double activation. Use a
> keyboard-accessible button.

## Prompt 4 --- Birthday reveal

> Animate Happy Birthday and Husnain Yaseen with an elegant editorial
> reveal. Draw the SVG gold underline, then trigger distant gold
> fireworks. Use real HTML text. Ensure the reveal can be replayed
> without duplicate timelines.

## Prompt 5 --- Appreciation chapter

> Build the editorial appreciation chapter and reveal paragraphs as they
> enter the viewport using GSAP ScrollTrigger. Add a replay-text action.
> Ensure ScrollTriggers are cleaned up and mobile behavior is smooth.

## Prompt 6 --- Cake finale

> Build the cake with CSS or an image asset. Add candle flicker and a
> working blow-out button. Animate flames out, show a warm glow and
> reveal the final Stack Fellows message. Add replay of the entire
> experience.

## Prompt 7 --- QA and performance

> Review the full plain HTML/CSS/TypeScript project. Verify no React,
> Next.js or JSX has been introduced. Check all interactions, responsive
> layouts, keyboard support, reduced-motion mode, GSAP cleanup, Framer
> Motion vanilla API compatibility, performance, image optimization and
> console errors. Fix all problems and deliver the final setup guide.

------------------------------------------------------------------------

# 11. Ready-to-Use Website Copy

### Intro

**A little something extraordinary awaits.**\
Made with appreciation, just for you.

### Gift

**Every great person deserves a moment worth remembering.**

### Birthday reveal

**HAPPY BIRTHDAY**\
**HUSNAIN YASEEN**

Wishing you a year filled with meaningful milestones, new opportunities
and moments worth celebrating.

### Appreciation

Great moments are made even better by the people who bring energy,
commitment and positivity to the journey.

Today is a chance to celebrate you and wish you continued growth,
happiness and success in everything ahead.

May the year ahead bring fresh opportunities, memorable achievements and
plenty of reasons to smile.

**Happy Birthday, Husnain!**

### Finale

**Make a wish.**

May every good thing find its way to you.

**With best wishes,\
Team Stack Fellows**

------------------------------------------------------------------------

# 12. Final QA Checklist

## Technology

-   [ ] Plain HTML5, CSS3 and TypeScript.
-   [ ] No Next.js.
-   [ ] No React.
-   [ ] No JSX.
-   [ ] Vite used only as dev server/build tool if needed.
-   [ ] GSAP + ScrollTrigger work correctly.
-   [ ] Framer Motion vanilla API verified before use.

## Experience

-   [ ] Intro CTA works.
-   [ ] Gift opens.
-   [ ] Birthday name reveal works.
-   [ ] SVG underline animates.
-   [ ] Appreciation text reveals.
-   [ ] Candle action works.
-   [ ] Final message appears.
-   [ ] Replay resets every chapter.

## Quality

-   [ ] Exact spelling: Husnain Yaseen.
-   [ ] Mobile, tablet and desktop layouts tested.
-   [ ] No horizontal overflow.
-   [ ] Keyboard navigation works.
-   [ ] Reduced-motion mode works.
-   [ ] No autoplay audio.
-   [ ] No duplicate event listeners.
-   [ ] GSAP timelines and ScrollTriggers cleaned up.
-   [ ] No console errors.
-   [ ] No fake personal details or unapproved photos.

------------------------------------------------------------------------

# Final Signature

**A special birthday experience, crafted with appreciation by Stack
Fellows.**

Recipient: Husnain Yaseen\
Occasion: Birthday\
Brand: Stack Fellows\
Concept: A Moment Made for You
