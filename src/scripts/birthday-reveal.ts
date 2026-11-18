import { animate } from "framer-motion/dom";
import gsap from "gsap";
import { prefersReducedMotion } from "./accessibility";
import { particleEngine } from "./particles";
import {
  getActiveScene,
  goToScene,
  registerSceneHooks,
} from "./scene-controller";
import { soundController } from "./sound";

let revealTimeline: gsap.core.Timeline | null = null;
let revealDone = false;

export function resetBirthdayReveal(): void {
  revealDone = false;
  if (revealTimeline) {
    revealTimeline.kill();
    revealTimeline = null;
  }

  const eyebrow = document.querySelector<HTMLElement>("[data-reveal-eyebrow]");
  const greetingInner = document.querySelector<HTMLElement>(
    "[data-reveal-greeting-inner]"
  );
  const name = document.querySelector<HTMLElement>("[data-recipient-name]");
  const underline = document.querySelector<SVGPathElement>("[data-underline]");
  const supporting = document.querySelector<HTMLElement>(
    "[data-reveal-supporting]"
  );
  const actions = document.querySelector<HTMLElement>("[data-reveal-actions]");

  gsap.set(
    [eyebrow, greetingInner, name, supporting, actions].filter(Boolean),
    { clearProps: "all" }
  );

  if (underline) {
    const length = underline.getTotalLength();
    underline.style.strokeDasharray = `${length}`;
    underline.style.strokeDashoffset = `${length}`;
  }
}

function playRevealSequence(): void {
  revealDone = false;
  if (revealTimeline) {
    revealTimeline.kill();
    revealTimeline = null;
  }

  const eyebrow = document.querySelector<HTMLElement>("[data-reveal-eyebrow]");
  const greetingInner = document.querySelector<HTMLElement>(
    "[data-reveal-greeting-inner]"
  );
  const name = document.querySelector<HTMLElement>("[data-recipient-name]");
  const underline = document.querySelector<SVGPathElement>("[data-underline]");
  const supporting = document.querySelector<HTMLElement>(
    "[data-reveal-supporting]"
  );
  const actions = document.querySelector<HTMLElement>("[data-reveal-actions]");

  if (!name) return;

  soundController.playBirthdaySting();

  if (prefersReducedMotion()) {
    if (underline) {
      underline.style.strokeDashoffset = "0";
    }
    revealDone = true;
    return;
  }

  if (underline) {
    const length = underline.getTotalLength();
    underline.style.strokeDasharray = `${length}`;
    underline.style.strokeDashoffset = `${length}`;
  }

  if (eyebrow) {
    animate(
      eyebrow,
      { opacity: [0, 1], y: [14, 0] },
      { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    );
  }

  if (greetingInner) {
    animate(
      greetingInner,
      { opacity: [0, 1], y: [36, 0] },
      { duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }
    );
  }

  revealTimeline = gsap.timeline({
    onComplete: () => {
      revealDone = true;
    },
  });

  revealTimeline.fromTo(
    name,
    { y: 32, opacity: 0, filter: "blur(10px)" },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.0,
      delay: 0.36,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(name, { clearProps: "filter" });
      },
    }
  );

  if (underline) {
    revealTimeline.to(
      underline,
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.25"
    );
  }

  revealTimeline.call(
    () => {
      particleEngine.triggerDistantFireworks();
    },
    [],
    "-=0.2"
  );

  if (supporting) {
    revealTimeline.fromTo(
      supporting,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
      "-=0.2"
    );
  }

  if (actions) {
    revealTimeline.fromTo(
      actions,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
  }
}

export function initBirthdayRevealChapter(): () => void {
  const continueBtn =
    document.querySelector<HTMLButtonElement>("[data-to-message]");

  const onContinue = (): void => {
    goToScene("message");
  };

  const onWheel = (event: WheelEvent): void => {
    if (getActiveScene() !== "reveal" || !revealDone) return;
    if (event.deltaY > 45) {
      goToScene("message");
    }
  };

  continueBtn?.addEventListener("click", onContinue);
  window.addEventListener("wheel", onWheel, { passive: true });

  registerSceneHooks("reveal", {
    onEnter: playRevealSequence,
    onLeave: () => {
      if (revealTimeline) {
        revealTimeline.kill();
        revealTimeline = null;
      }
    },
  });

  return () => {
    continueBtn?.removeEventListener("click", onContinue);
    window.removeEventListener("wheel", onWheel);
    if (revealTimeline) {
      revealTimeline.kill();
      revealTimeline = null;
    }
  };
}
