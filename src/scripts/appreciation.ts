import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./accessibility";
import { goToScene, registerSceneHooks } from "./scene-controller";

gsap.registerPlugin(ScrollTrigger);

const FINAL_SENTENCE = "Have an amazing birthday, Husnain!";
let appreciationCtx: gsap.Context | null = null;

function cleanupAppreciation(): void {
  if (appreciationCtx) {
    appreciationCtx.revert();
    appreciationCtx = null;
  }
}

export function resetAppreciation(): void {
  cleanupAppreciation();
  const finalEl = document.querySelector<HTMLElement>("[data-note-final]");
  if (finalEl) {
    finalEl.textContent = FINAL_SENTENCE;
  }
}

function playAppreciationSequence(): void {
  cleanupAppreciation();

  const section = document.querySelector<HTMLElement>('[data-scene="message"]');
  const card = document.querySelector<HTMLElement>("[data-note-card]");
  const rail = document.querySelector<HTMLElement>("[data-note-rail]");
  const paragraphs = gsap.utils.toArray<HTMLElement>("[data-note-p]");
  const finalEl = document.querySelector<HTMLElement>("[data-note-final]");

  if (!section || !card) return;

  if (finalEl) {
    finalEl.textContent = FINAL_SENTENCE;
  }

  if (prefersReducedMotion()) {
    return;
  }

  appreciationCtx = gsap.context(() => {
    ScrollTrigger.refresh();

    gsap.from(card, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        once: true,
      },
    });

    if (rail) {
      gsap.from(rail, {
        scaleY: 0,
        duration: 1.05,
        delay: 0.18,
        ease: "power2.out",
      });
    }

    gsap.from(paragraphs, {
      y: 16,
      opacity: 0,
      duration: 0.65,
      stagger: 0.2,
      delay: 0.25,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        once: true,
      },
    });

    if (finalEl) {
      finalEl.textContent = "";
      const state = { length: 0 };
      gsap.to(state, {
        length: FINAL_SENTENCE.length,
        duration: 1.05,
        delay: 1.15,
        ease: "none",
        onUpdate: () => {
          finalEl.textContent = FINAL_SENTENCE.slice(
            0,
            Math.floor(state.length)
          );
        },
      });
    }
  }, section);
}

export function initAppreciationChapter(): () => void {
  const replayBtn =
    document.querySelector<HTMLButtonElement>("[data-replay-note]");
  const continueBtn =
    document.querySelector<HTMLButtonElement>("[data-to-final]");

  const onReplayText = (): void => {
    playAppreciationSequence();
  };

  const onContinue = (): void => {
    goToScene("final");
  };

  replayBtn?.addEventListener("click", onReplayText);
  continueBtn?.addEventListener("click", onContinue);

  registerSceneHooks("message", {
    onEnter: playAppreciationSequence,
    onLeave: cleanupAppreciation,
  });

  return () => {
    replayBtn?.removeEventListener("click", onReplayText);
    continueBtn?.removeEventListener("click", onContinue);
    cleanupAppreciation();
  };
}
