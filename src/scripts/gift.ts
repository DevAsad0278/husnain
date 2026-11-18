import gsap from "gsap";
import { isTouchDevice, prefersReducedMotion } from "./accessibility";
import { particleEngine } from "./particles";
import { goToScene, registerSceneHooks } from "./scene-controller";
import { soundController } from "./sound";

let giftOpened = false;
let openTimeline: gsap.core.Timeline | null = null;

export function resetGift(): void {
  giftOpened = false;
  if (openTimeline) {
    openTimeline.kill();
    openTimeline = null;
  }

  const openBtn = document.querySelector<HTMLButtonElement>("[data-open-gift]");
  const floatEl = document.querySelector<HTMLElement>("[data-gift-float]");
  const tiltEl = document.querySelector<HTMLElement>("[data-gift-tilt]");
  const lid = document.querySelector<HTMLElement>("[data-gift-lid]");
  const glow = document.querySelector<HTMLElement>("[data-gift-glow]");
  const bow = document.querySelector<HTMLElement>("[data-gift-bow]");
  const ribbons = document.querySelectorAll<HTMLElement>("[data-gift-ribbon]");
  const mintSeam = document.querySelector<HTMLElement>("[data-mint-seam]");
  const burstRing = document.querySelector<HTMLElement>(
    "[data-gift-burst-ring]"
  );

  if (openBtn) openBtn.disabled = false;
  if (floatEl) floatEl.classList.add("is-idle");
  if (tiltEl) tiltEl.style.transform = "";

  gsap.set(
    [lid, glow, bow, ...ribbons, mintSeam, burstRing].filter(Boolean),
    { clearProps: "all" }
  );
}

export function initGiftChapter(): () => void {
  const stage = document.querySelector<HTMLElement>("[data-gift-stage]");
  const tiltEl = document.querySelector<HTMLElement>("[data-gift-tilt]");
  const floatEl = document.querySelector<HTMLElement>("[data-gift-float]");
  const openBtn = document.querySelector<HTMLButtonElement>("[data-open-gift]");
  const lid = document.querySelector<HTMLElement>("[data-gift-lid]");
  const glow = document.querySelector<HTMLElement>("[data-gift-glow]");
  const bow = document.querySelector<HTMLElement>("[data-gift-bow]");
  const ribbons = document.querySelectorAll<HTMLElement>("[data-gift-ribbon]");
  const mintSeam = document.querySelector<HTMLElement>("[data-mint-seam]");
  const burstRing = document.querySelector<HTMLElement>(
    "[data-gift-burst-ring]"
  );

  if (!stage || !openBtn || !lid || !glow) {
    return () => {};
  }

  if (floatEl && !prefersReducedMotion()) {
    floatEl.classList.add("is-idle");
  }

  const onPointerMove = (event: PointerEvent): void => {
    if (giftOpened || isTouchDevice() || prefersReducedMotion() || !tiltEl) {
      return;
    }
    const rect = stage.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    tiltEl.style.transform = `translateY(-4px) rotateX(${(-ny * 12).toFixed(
      2
    )}deg) rotateY(${(nx * 16).toFixed(2)}deg)`;
  };

  const onPointerEnter = (): void => {
    if (!giftOpened) stage.classList.add("is-hovered");
  };

  const onPointerLeave = (): void => {
    stage.classList.remove("is-hovered");
    if (tiltEl && !giftOpened) {
      tiltEl.style.transform = "";
    }
  };

  const onOpen = (): void => {
    if (giftOpened) return;
    giftOpened = true;
    openBtn.disabled = true;
    stage.classList.remove("is-hovered");
    floatEl?.classList.remove("is-idle");

    soundController.playGiftShimmer();

    if (prefersReducedMotion()) {
      goToScene("reveal");
      return;
    }

    const stageRect = stage.getBoundingClientRect();
    const originX = stageRect.left + stageRect.width / 2;
    const originY = stageRect.top + stageRect.height / 2;

    openTimeline = gsap.timeline({
      onComplete: () => {
        openTimeline = null;
        goToScene("reveal");
      },
    });

    openTimeline
      .to(ribbons, {
        scale: 0.25,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      })
      .to(
        bow,
        {
          y: -18,
          scale: 0.8,
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        lid,
        {
          rotateX: -125,
          y: -26,
          duration: 0.85,
          ease: "power3.inOut",
        },
        "-=0.08"
      )
      .to(
        glow,
        {
          opacity: 1,
          scale: 1.7,
          background:
            "radial-gradient(circle, rgba(255,240,200,0.98) 0%, rgba(214,183,121,0.72) 48%, transparent 74%)",
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.45"
      )
      .call(
        () => {
          particleEngine.burstGoldParticles(originX, originY);
        },
        [],
        "-=0.35"
      );

    if (mintSeam) {
      openTimeline.to(mintSeam, { opacity: 0, duration: 0.3 }, "-=0.5");
    }

    if (burstRing) {
      openTimeline.to(
        burstRing,
        {
          opacity: 0,
          scale: 2.35,
          duration: 0.9,
          ease: "power2.out",
          startAt: { opacity: 0.85, scale: 0.45 },
        },
        "-=0.4"
      );
    }

    openTimeline.to({}, { duration: 0.4 });
  };

  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerenter", onPointerEnter);
  stage.addEventListener("pointerleave", onPointerLeave);
  openBtn.addEventListener("click", onOpen);

  registerSceneHooks("gift", {
    onEnter: () => {
      if (!giftOpened && floatEl && !prefersReducedMotion()) {
        floatEl.classList.add("is-idle");
      }
    },
  });

  return () => {
    stage.removeEventListener("pointermove", onPointerMove);
    stage.removeEventListener("pointerenter", onPointerEnter);
    stage.removeEventListener("pointerleave", onPointerLeave);
    openBtn.removeEventListener("click", onOpen);
    if (openTimeline) {
      openTimeline.kill();
      openTimeline = null;
    }
  };
}
