import gsap from "gsap";
import { prefersReducedMotion } from "./accessibility";
import { particleEngine } from "./particles";
import { registerSceneHooks } from "./scene-controller";
import { soundController } from "./sound";

let candlesBlown = false;
let blowTimeline: gsap.core.Timeline | null = null;

export function resetCake(): void {
  candlesBlown = false;
  if (blowTimeline) {
    blowTimeline.kill();
    blowTimeline = null;
  }

  const blowWrap = document.querySelector<HTMLElement>("[data-blow-wrap]");
  const blowBtn = document.querySelector<HTMLButtonElement>("[data-blow-candles]");
  const heading = document.querySelector<HTMLElement>("#final-heading");
  const preface = document.querySelector<HTMLElement>("[data-final-preface]");
  const finaleMsg = document.querySelector<HTMLElement>(
    "[data-finale-message]"
  );
  const flames = document.querySelectorAll<HTMLElement>("[data-candle-flame]");
  const halos = document.querySelectorAll<HTMLElement>("[data-flame-halo]");
  const smokes = document.querySelectorAll<HTMLElement>("[data-smoke-wisp]");
  const windSwish = document.querySelector<HTMLElement>("[data-wind-swish]");
  const wishPulse = document.querySelector<HTMLElement>("[data-wish-pulse]");
  const cakeGlow = document.querySelector<HTMLElement>("[data-cake-glow]");
  const shareFeedback = document.querySelector<HTMLElement>(
    "[data-share-feedback]"
  );

  if (blowBtn) blowBtn.disabled = false;
  if (blowWrap) blowWrap.hidden = false;
  if (preface) preface.hidden = false;
  if (heading) heading.textContent = "Make a wish.";
  if (finaleMsg) {
    finaleMsg.hidden = true;
    finaleMsg.setAttribute("aria-hidden", "true");
  }
  if (shareFeedback) shareFeedback.textContent = "";

  gsap.set(
    [
      ...flames,
      ...halos,
      ...smokes,
      windSwish,
      wishPulse,
      cakeGlow,
      finaleMsg,
      blowWrap,
      heading,
    ].filter(Boolean),
    { clearProps: "all" }
  );

  flames.forEach((f) => f.classList.add("is-lit"));
  halos.forEach((h) => h.classList.add("is-lit"));
}

export function initCakeChapter(onFullReplay: () => void): () => void {
  const blowBtn = document.querySelector<HTMLButtonElement>("[data-blow-candles]");
  const blowWrap = document.querySelector<HTMLElement>("[data-blow-wrap]");
  const heading = document.querySelector<HTMLElement>("#final-heading");
  const preface = document.querySelector<HTMLElement>("[data-final-preface]");
  const finaleMsg = document.querySelector<HTMLElement>(
    "[data-finale-message]"
  );
  const replayBtn = document.querySelector<HTMLButtonElement>(
    "[data-replay-experience]"
  );
  const copyBtn = document.querySelector<HTMLButtonElement>("[data-copy-link]");
  const shareFeedback = document.querySelector<HTMLElement>(
    "[data-share-feedback]"
  );

  const flames = document.querySelectorAll<HTMLElement>("[data-candle-flame]");
  const halos = document.querySelectorAll<HTMLElement>("[data-flame-halo]");
  const smokes = document.querySelectorAll<HTMLElement>("[data-smoke-wisp]");
  const windSwish = document.querySelector<HTMLElement>("[data-wind-swish]");
  const wishPulse = document.querySelector<HTMLElement>("[data-wish-pulse]");
  const cakeGlow = document.querySelector<HTMLElement>("[data-cake-glow]");
  const cakeStage = document.querySelector<HTMLElement>("[data-cake-stage]");

  flames.forEach((f) => f.classList.add("is-lit"));
  halos.forEach((h) => h.classList.add("is-lit"));

  const onBlowCandles = (): void => {
    if (candlesBlown || !blowBtn) return;
    candlesBlown = true;
    blowBtn.disabled = true;

    soundController.playCandleWhoosh();
    flames.forEach((f) => f.classList.remove("is-lit"));
    halos.forEach((h) => h.classList.remove("is-lit"));

    if (prefersReducedMotion()) {
      gsap.set([...flames, ...halos], { opacity: 0 });
      if (blowWrap) blowWrap.hidden = true;
      if (preface) preface.hidden = true;
      if (heading) heading.textContent = "Happy Birthday, Husnain Yaseen.";
      if (finaleMsg) {
        finaleMsg.hidden = false;
        finaleMsg.setAttribute("aria-hidden", "false");
      }
      return;
    }

    blowTimeline = gsap.timeline({
      onComplete: () => {
        blowTimeline = null;
      },
    });

    if (windSwish) {
      blowTimeline.fromTo(
        windSwish,
        { opacity: 0, x: -90 },
        { opacity: 0.9, x: 110, duration: 0.45, ease: "power2.out" }
      );
      blowTimeline.to(windSwish, { opacity: 0, duration: 0.25 }, "-=0.15");
    }

    blowTimeline.to(
      flames,
      {
        scaleY: 0.2,
        scaleX: 0.35,
        opacity: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.in",
      },
      0.14
    );

    blowTimeline.to(
      halos,
      {
        opacity: 0,
        scale: 0.4,
        duration: 0.35,
        ease: "power2.out",
      },
      0.14
    );

    if (cakeGlow) {
      blowTimeline.to(cakeGlow, { opacity: 0.25, duration: 0.5 }, 0.25);
    }

    blowTimeline.fromTo(
      smokes,
      { opacity: 0, y: 0, scaleY: 0.5 },
      {
        opacity: 0.65,
        y: -26,
        scaleY: 1.4,
        duration: 0.65,
        stagger: 0.08,
        ease: "power1.out",
      },
      0.34
    );
    blowTimeline.to(
      smokes,
      { opacity: 0, y: -42, duration: 0.65, ease: "power1.in" },
      "-=0.2"
    );

    if (wishPulse) {
      blowTimeline.fromTo(
        wishPulse,
        { opacity: 0.85, scale: 0.4 },
        { opacity: 0, scale: 2.8, duration: 1.15, ease: "power2.out" },
        0.38
      );
    }

    blowTimeline.call(
      () => {
        if (cakeStage) {
          const rect = cakeStage.getBoundingClientRect();
          particleEngine.burstGoldParticles(
            rect.left + rect.width / 2,
            rect.top + rect.height * 0.45
          );
        }
      },
      [],
      0.42
    );

    if (blowWrap) {
      blowTimeline.to(
        blowWrap,
        {
          opacity: 0,
          y: -8,
          duration: 0.35,
          onComplete: () => {
            blowWrap.hidden = true;
          },
        },
        0.45
      );
    }

    if (preface) {
      preface.hidden = true;
    }

    if (heading) {
      blowTimeline.to(
        heading,
        {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            heading.textContent = "Happy Birthday, Husnain Yaseen.";
          },
        },
        0.5
      );
      blowTimeline.to(heading, { opacity: 1, duration: 0.55 });
    }

    if (finaleMsg) {
      blowTimeline.call(() => {
        finaleMsg.hidden = false;
        finaleMsg.setAttribute("aria-hidden", "false");
      });
      blowTimeline.fromTo(
        finaleMsg,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
      );
    }
  };

  const onCopyLink = async (): Promise<void> => {
    const shareData = {
      title: "A Moment for Husnain — Husnain Yaseen",
      text: "A personal birthday experience crafted for Husnain Yaseen.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        if (shareFeedback) shareFeedback.textContent = "SHARED.";
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        if (shareFeedback) {
          shareFeedback.textContent = "LINK COPIED TO CLIPBOARD.";
        }
        return;
      }
      if (shareFeedback) {
        shareFeedback.textContent = "COPY URL FROM ADDRESS BAR.";
      }
    } catch {
      if (shareFeedback) {
        shareFeedback.textContent = "";
      }
    }
  };

  blowBtn?.addEventListener("click", onBlowCandles);
  replayBtn?.addEventListener("click", onFullReplay);
  copyBtn?.addEventListener("click", () => {
    void onCopyLink();
  });

  registerSceneHooks("final", {
    onEnter: () => {
      if (!candlesBlown && !prefersReducedMotion()) {
        flames.forEach((f) => f.classList.add("is-lit"));
        halos.forEach((h) => h.classList.add("is-lit"));
      }
    },
  });

  return () => {
    blowBtn?.removeEventListener("click", onBlowCandles);
    replayBtn?.removeEventListener("click", onFullReplay);
    if (blowTimeline) {
      blowTimeline.kill();
      blowTimeline = null;
    }
  };
}
