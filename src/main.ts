import "./styles/base.css";
import "./styles/design-system.css";
import "./styles/scenes.css";
import "./styles/animations.css";
import "./styles/responsive.css";

import { initApp } from "./scripts/app";

let teardown: (() => void) | null = null;

function boot(): void {
  teardown?.();
  teardown = initApp();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
