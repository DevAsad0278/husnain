import gsap from "gsap";
import { sceneOrder, type Scene } from "../types/experience";
import { focusChapter, prefersReducedMotion } from "./accessibility";

type SceneHook = () => void;

const enterHooks = new Map<Scene, SceneHook>();
const leaveHooks = new Map<Scene, SceneHook>();

let activeScene: Scene = "intro";
let transitioning = false;
let activeTimeline: gsap.core.Timeline | null = null;

export function registerSceneHooks(
  scene: Scene,
  hooks: { onEnter?: SceneHook; onLeave?: SceneHook }
): void {
  if (hooks.onEnter) enterHooks.set(scene, hooks.onEnter);
  if (hooks.onLeave) leaveHooks.set(scene, hooks.onLeave);
}

export function getActiveScene(): Scene {
  return activeScene;
}

export function isSceneTransitioning(): boolean {
  return transitioning;
}

export function updateProgress(scene: Scene = activeScene): void {
  const index = sceneOrder.indexOf(scene);
  const progress = ((index + 1) / sceneOrder.length) * 100;

  const bar = document.querySelector<HTMLElement>("[data-progress]");
  if (bar) {
    bar.style.width = `${progress}%`;
  }

  const label = document.querySelector<HTMLElement>("[data-scene-label]");
  if (label) {
    label.textContent = `SCENE ${String(index + 1).padStart(2, "0")} / ${String(
      sceneOrder.length
    ).padStart(2, "0")}`;
  }

  const dots = document.querySelectorAll<HTMLButtonElement>("[data-scene-dot]");
  dots.forEach((dot) => {
    const isCurrent = dot.dataset.sceneDot === scene;
    dot.classList.toggle("is-active", isCurrent);
    if (isCurrent) {
      dot.setAttribute("aria-current", "step");
    } else {
      dot.removeAttribute("aria-current");
    }
  });
}

export function goToScene(next: Scene): void {
  if (transitioning || next === activeScene) return;

  const current = document.querySelector<HTMLElement>(
    `[data-scene="${activeScene}"]`
  );
  const target = document.querySelector<HTMLElement>(`[data-scene="${next}"]`);

  if (!target) return;

  const previous = activeScene;
  transitioning = true;
  activeScene = next;
  updateProgress(next);

  leaveHooks.get(previous)?.();

  if (activeTimeline) {
    activeTimeline.kill();
    activeTimeline = null;
  }

  if (prefersReducedMotion()) {
    if (current) {
      current.classList.remove("is-active");
      current.setAttribute("aria-hidden", "true");
      current.hidden = true;
      gsap.set(current, { clearProps: "opacity,transform" });
    }
    target.hidden = false;
    target.setAttribute("aria-hidden", "false");
    target.classList.add("is-active");
    gsap.set(target, { opacity: 1, y: 0 });
    window.scrollTo({ top: 0, behavior: "auto" });
    transitioning = false;
    enterHooks.get(next)?.();
    focusChapter(target);
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      activeTimeline = null;
      transitioning = false;
    },
  });
  activeTimeline = tl;

  if (current) {
    tl.to(current, {
      opacity: 0,
      y: -16,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        current.classList.remove("is-active");
        current.setAttribute("aria-hidden", "true");
        current.hidden = true;
        gsap.set(current, { clearProps: "opacity,transform" });
      },
    });
  }

  tl.call(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    target.hidden = false;
    target.setAttribute("aria-hidden", "false");
    target.classList.add("is-active");
    gsap.set(target, { opacity: 0, y: 18 });
    enterHooks.get(next)?.();
  });

  tl.to(target, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    ease: "power3.out",
    onComplete: () => {
      gsap.set(target, { clearProps: "transform" });
      focusChapter(target);
    },
  });
}

export function initSceneDots(): () => void {
  const dots = document.querySelectorAll<HTMLButtonElement>("[data-scene-dot]");
  const handlers: Array<{ el: HTMLButtonElement; fn: () => void }> = [];

  dots.forEach((dot) => {
    const scene = dot.dataset.sceneDot as Scene | undefined;
    if (!scene || !sceneOrder.includes(scene)) return;
    const fn = (): void => goToScene(scene);
    dot.addEventListener("click", fn);
    handlers.push({ el: dot, fn });
  });

  updateProgress("intro");

  return () => {
    handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    if (activeTimeline) {
      activeTimeline.kill();
      activeTimeline = null;
    }
  };
}
