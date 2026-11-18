import { isTouchDevice, prefersReducedMotion } from "./accessibility";

export function initCustomCursor(): () => void {
  const container = document.querySelector<HTMLElement>("[data-custom-cursor]");
  const dot = document.querySelector<HTMLElement>("[data-cursor-dot]");
  const ring = document.querySelector<HTMLElement>("[data-cursor-ring]");

  if (
    !container ||
    !dot ||
    !ring ||
    isTouchDevice() ||
    prefersReducedMotion() ||
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return () => {};
  }

  document.body.classList.add("has-custom-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let rafId = 0;

  const onMouseMove = (event: MouseEvent): void => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    if (!container.classList.contains("is-visible")) {
      container.classList.add("is-visible");
    }

    const target = event.target as HTMLElement | null;
    const isInteractive = Boolean(
      target?.closest("button, a, [role='button'], input, textarea")
    );
    container.classList.toggle("is-hovering", isInteractive);
  };

  const onMouseLeave = (): void => {
    container.classList.remove("is-visible");
  };

  const tick = (): void => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    rafId = window.requestAnimationFrame(tick);
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("mouseleave", onMouseLeave);
  rafId = window.requestAnimationFrame(tick);

  return () => {
    window.cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseleave", onMouseLeave);
    document.body.classList.remove("has-custom-cursor");
    container.classList.remove("is-visible", "is-hovering");
  };
}
