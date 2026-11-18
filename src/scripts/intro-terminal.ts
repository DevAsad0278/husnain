import { animate, stagger } from "framer-motion/dom";
import gsap from "gsap";
import { prefersReducedMotion } from "./accessibility";
import {
  goToScene,
  isSceneTransitioning,
  registerSceneHooks,
} from "./scene-controller";

const TERMINAL_LINES = [
  "> initializing a special moment...",
  "> preparing something just for you...",
  "> recipient detected: HUSNAIN YASEEN",
  "> all systems ready.",
];

let bootTimeline: gsap.core.Timeline | null = null;
let welcomeShown = false;

function showWelcomeMessage(immediate = false): void {
  if (welcomeShown) return;
  welcomeShown = true;

  const welcomeBlock = document.querySelector<HTMLElement>(
    "[data-welcome-block]"
  );
  const lines = document.querySelectorAll<HTMLElement>("[data-welcome-line]");
  const copy = document.querySelector<HTMLElement>("[data-welcome-copy]");
  const cta = document.querySelector<HTMLElement>("[data-welcome-cta]");

  if (!welcomeBlock) return;

  if (immediate || prefersReducedMotion()) {
    welcomeBlock.style.opacity = "1";
    return;
  }

  welcomeBlock.style.opacity = "1";

  if (lines.length > 0) {
    animate(
      lines,
      { opacity: [0, 1], y: [32, 0] },
      {
        duration: 0.75,
        delay: stagger(0.14),
        ease: [0.22, 1, 0.36, 1],
      }
    );
  }

  if (copy) {
    animate(
      copy,
      { opacity: [0, 1], y: [14, 0] },
      { duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }
    );
  }

  if (cta) {
    animate(
      cta,
      { opacity: [0, 1], scale: [0.96, 1] },
      { duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }
    );
  }
}

export function playIntroTerminal(): void {
  welcomeShown = false;
  if (bootTimeline) {
    bootTimeline.kill();
    bootTimeline = null;
  }

  const lineEls = document.querySelectorAll<HTMLElement>(
    "[data-terminal-line]"
  );
  const progressFill = document.querySelector<HTMLElement>(
    "[data-terminal-progress]"
  );
  const welcomeBlock = document.querySelector<HTMLElement>(
    "[data-welcome-block]"
  );
  const skipBtn = document.querySelector<HTMLButtonElement>("[data-skip-intro]");

  if (skipBtn) skipBtn.disabled = false;

  if (prefersReducedMotion()) {
    lineEls.forEach((line, idx) => {
      line.style.visibility = "visible";
      const cursor = line.querySelector(".terminal-cursor");
      line.textContent = TERMINAL_LINES[idx] ?? "";
      if (cursor) line.appendChild(cursor);
    });
    if (progressFill) progressFill.style.width = "100%";
    showWelcomeMessage(true);
    return;
  }

  if (welcomeBlock) welcomeBlock.style.opacity = "0";
  if (progressFill) progressFill.style.width = "0%";

  bootTimeline = gsap.timeline({
    onComplete: () => {
      bootTimeline = null;
      if (skipBtn) skipBtn.disabled = true;
      showWelcomeMessage(false);
    },
  });

  if (progressFill) {
    bootTimeline.to(
      progressFill,
      {
        width: "100%",
        duration: 2.8,
        ease: "power1.inOut",
      },
      0
    );
  }

  lineEls.forEach((line, index) => {
    const fullText = TERMINAL_LINES[index] ?? "";
    const cursor = line.querySelector(".terminal-cursor");
    line.textContent = "";
    if (cursor) line.appendChild(cursor);
    line.style.visibility = "visible";

    const state = { length: 0 };
    bootTimeline!.to(state, {
      length: fullText.length,
      duration: Math.max(0.32, fullText.length * 0.024),
      ease: "none",
      onUpdate: () => {
        const slice = fullText.slice(0, Math.floor(state.length));
        line.textContent = slice;
        if (cursor) line.appendChild(cursor);
      },
    });
    bootTimeline!.to({}, { duration: 0.14 });
  });
}

export function resetIntroTerminal(): void {
  welcomeShown = false;
  if (bootTimeline) {
    bootTimeline.kill();
    bootTimeline = null;
  }
  const startBtn = document.querySelector<HTMLButtonElement>(
    "[data-start-experience]"
  );
  if (startBtn) startBtn.disabled = false;
}

export function initIntroTerminal(): () => void {
  const skipBtn = document.querySelector<HTMLButtonElement>("[data-skip-intro]");
  const startBtn = document.querySelector<HTMLButtonElement>(
    "[data-start-experience]"
  );

  const onSkip = (): void => {
    if (bootTimeline) {
      bootTimeline.progress(1);
    }
    const lineEls = document.querySelectorAll<HTMLElement>(
      "[data-terminal-line]"
    );
    const progressFill = document.querySelector<HTMLElement>(
      "[data-terminal-progress]"
    );
    lineEls.forEach((line, idx) => {
      line.style.visibility = "visible";
      const cursor = line.querySelector(".terminal-cursor");
      line.textContent = TERMINAL_LINES[idx] ?? "";
      if (cursor) line.appendChild(cursor);
    });
    if (progressFill) progressFill.style.width = "100%";
    if (skipBtn) skipBtn.disabled = true;
    showWelcomeMessage(false);
  };

  const onStart = (): void => {
    if (!startBtn || isSceneTransitioning()) return;
    startBtn.disabled = true;
    goToScene("code");
    window.setTimeout(() => {
      if (startBtn) startBtn.disabled = false;
    }, 900);
  };

  skipBtn?.addEventListener("click", onSkip);
  startBtn?.addEventListener("click", onStart);

  registerSceneHooks("intro", {
    onEnter: playIntroTerminal,
  });

  playIntroTerminal();

  return () => {
    skipBtn?.removeEventListener("click", onSkip);
    startBtn?.removeEventListener("click", onStart);
    if (bootTimeline) {
      bootTimeline.kill();
      bootTimeline = null;
    }
  };
}
