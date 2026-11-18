import gsap from "gsap";
import { isTouchDevice, prefersReducedMotion } from "./accessibility";
import {
  initAppreciationChapter,
  resetAppreciation,
} from "./appreciation";
import {
  initBirthdayRevealChapter,
  resetBirthdayReveal,
} from "./birthday-reveal";
import { initCakeChapter, resetCake } from "./cake";
import { initCodeWindow, resetCodeWindow } from "./code-window";
import { initCustomCursor } from "./cursor";
import { initGiftChapter, resetGift } from "./gift";
import { initIntroTerminal, resetIntroTerminal } from "./intro-terminal";
import { particleEngine } from "./particles";
import {
  goToScene,
  initSceneDots,
  isSceneTransitioning,
} from "./scene-controller";
import { soundController } from "./sound";

let spotlightTween: gsap.core.Tween | null = null;

function initAmbientSpotlight(): () => void {
  const spotlight = document.querySelector<HTMLElement>(
    "[data-ambient-spotlight]"
  );
  if (!spotlight || prefersReducedMotion()) {
    return () => {};
  }

  spotlightTween = gsap.to(spotlight, {
    x: 42,
    y: -30,
    scale: 1.08,
    opacity: 0.9,
    duration: 9,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  return () => {
    spotlightTween?.kill();
    spotlightTween = null;
  };
}

function initMagneticButtons(): () => void {
  if (isTouchDevice() || prefersReducedMotion()) {
    return () => {};
  }

  const buttons = document.querySelectorAll<HTMLElement>("[data-magnetic]");
  const cleanups: Array<() => void> = [];

  buttons.forEach((btn) => {
    const onMove = (event: MouseEvent): void => {
      if ((btn as HTMLButtonElement).disabled) return;
      const rect = btn.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.14;
      const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.18;
      btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${(
        dy - 2
      ).toFixed(1)}px, 0)`;
    };

    const onLeave = (): void => {
      btn.style.transform = "";
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
  };
}

export function initApp(): () => void {
  const replayExperience = (): void => {
    if (isSceneTransitioning()) return;
    particleEngine.clearCelebrationParticles();
    resetIntroTerminal();
    resetCodeWindow();
    resetGift();
    resetBirthdayReveal();
    resetAppreciation();
    resetCake();
    goToScene("intro");
  };

  const cleanups: Array<() => void> = [
    particleEngine.init(),
    soundController.init(),
    initCustomCursor(),
    initAmbientSpotlight(),
    initMagneticButtons(),
    initSceneDots(),
    initIntroTerminal(),
    initCodeWindow(),
    initGiftChapter(),
    initBirthdayRevealChapter(),
    initAppreciationChapter(),
    initCakeChapter(replayExperience),
  ];

  return () => {
    cleanups.forEach((fn) => fn());
  };
}
