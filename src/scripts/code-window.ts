import gsap from "gsap";
import { prefersReducedMotion } from "./accessibility";
import { goToScene, registerSceneHooks } from "./scene-controller";
import { soundController } from "./sound";

let codeTimeline: gsap.core.Timeline | null = null;

export function resetCodeWindow(): void {
  if (codeTimeline) {
    codeTimeline.kill();
    codeTimeline = null;
  }

  const card = document.querySelector<HTMLElement>("[data-editor-card]");
  const lines = document.querySelectorAll<HTMLElement>("[data-code-line]");
  const highlight = document.querySelector<HTMLElement>(
    "[data-code-highlight]"
  );
  const status = document.querySelector<HTMLElement>("[data-code-status]");
  const ring = document.querySelector<SVGCircleElement>("[data-code-ring]");
  const runBtn = document.querySelector<HTMLButtonElement>(
    "[data-run-surprise]"
  );

  if (status) {
    status.textContent = "COMPILING SURPRISE...";
    status.classList.remove("is-complete");
  }
  if (runBtn) runBtn.disabled = true;
  if (ring) {
    const r = 8;
    const c = 2 * Math.PI * r;
    ring.style.strokeDasharray = `${c}`;
    ring.style.strokeDashoffset = `${c}`;
  }

  gsap.set([card, ...lines, highlight].filter(Boolean), { clearProps: "all" });
}

function playCodeSequence(): void {
  resetCodeWindow();

  const card = document.querySelector<HTMLElement>("[data-editor-card]");
  const lines = gsap.utils.toArray<HTMLElement>("[data-code-line]");
  const highlight = document.querySelector<HTMLElement>(
    "[data-code-highlight]"
  );
  const status = document.querySelector<HTMLElement>("[data-code-status]");
  const ring = document.querySelector<SVGCircleElement>("[data-code-ring]");
  const runBtn = document.querySelector<HTMLButtonElement>(
    "[data-run-surprise]"
  );

  if (!card || lines.length === 0) return;

  const circumference = 2 * Math.PI * 8;
  if (ring) {
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${circumference}`;
  }

  if (prefersReducedMotion()) {
    if (ring) ring.style.strokeDashoffset = "0";
    if (status) {
      status.textContent = "BUILD SUCCESS";
      status.classList.add("is-complete");
    }
    if (runBtn) runBtn.disabled = false;
    return;
  }

  codeTimeline = gsap.timeline({
    onComplete: () => {
      codeTimeline = null;
      if (status) {
        status.textContent = "BUILD SUCCESS";
        status.classList.add("is-complete");
      }
      if (runBtn) runBtn.disabled = false;
    },
  });

  codeTimeline.fromTo(
    card,
    { opacity: 0, y: 24, rotateX: 8 },
    { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: "power3.out" }
  );

  if (ring) {
    codeTimeline.to(
      ring,
      {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power1.inOut",
      },
      0.2
    );
  }

  if (highlight) {
    codeTimeline.set(highlight, { opacity: 1 }, 0.35);
  }

  lines.forEach((line, index) => {
    const pos = 0.35 + index * 0.22;
    codeTimeline!.fromTo(
      line,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
      pos
    );

    if (highlight) {
      codeTimeline!.to(
        highlight,
        {
          y: index * line.offsetHeight,
          duration: 0.22,
          ease: "power2.out",
        },
        pos
      );
    }
  });
}

export function initCodeWindow(): () => void {
  const runBtn = document.querySelector<HTMLButtonElement>(
    "[data-run-surprise]"
  );

  const onRun = (): void => {
    if (!runBtn || runBtn.disabled) return;
    runBtn.disabled = true;
    soundController.playGiftShimmer();
    goToScene("gift");
  };

  runBtn?.addEventListener("click", onRun);

  registerSceneHooks("code", {
    onEnter: playCodeSequence,
    onLeave: () => {
      if (codeTimeline) {
        codeTimeline.kill();
        codeTimeline = null;
      }
    },
  });

  return () => {
    runBtn?.removeEventListener("click", onRun);
    if (codeTimeline) {
      codeTimeline.kill();
      codeTimeline = null;
    }
  };
}
