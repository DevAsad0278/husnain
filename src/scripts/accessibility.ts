export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchDevice(): boolean {
  return (
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

export function isMobileViewport(): boolean {
  return window.innerWidth <= 640;
}

/**
 * Moves focus to the primary heading or first interactive control of a newly
 * activated chapter so keyboard and screen-reader users stay oriented.
 */
export function focusChapter(section: HTMLElement): void {
  const heading = section.querySelector<HTMLElement>("h1, h2");
  if (heading) {
    if (!heading.hasAttribute("tabindex")) {
      heading.setAttribute("tabindex", "-1");
    }
    heading.focus({ preventScroll: true });
    return;
  }

  const fallbackButton = section.querySelector<HTMLElement>(
    "button:not([disabled])"
  );
  fallbackButton?.focus({ preventScroll: true });
}
