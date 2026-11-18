import { isMobileViewport, prefersReducedMotion } from "./accessibility";

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  depth: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  gravity: number;
  color: string;
  isConfetti?: boolean;
  rotation?: number;
  vRot?: number;
}

const GOLD_PALETTE = [
  "240, 217, 166",
  "214, 183, 121",
  "245, 240, 231",
  "199, 164, 96",
];

class ParticleEngine {
  private ambientCanvas: HTMLCanvasElement | null = null;
  private celebrationCanvas: HTMLCanvasElement | null = null;
  private ambientCtx: CanvasRenderingContext2D | null = null;
  private celebrationCtx: CanvasRenderingContext2D | null = null;

  private dust: DustParticle[] = [];
  private bursts: BurstParticle[] = [];
  private rafId = 0;
  private width = 0;
  private height = 0;
  private fireworkTimerIds: number[] = [];

  public init(): () => void {
    this.ambientCanvas = document.getElementById(
      "ambient-particles"
    ) as HTMLCanvasElement | null;
    this.celebrationCanvas = document.getElementById(
      "celebration-canvas"
    ) as HTMLCanvasElement | null;

    if (!this.ambientCanvas || !this.celebrationCanvas) {
      return () => {};
    }

    this.ambientCtx = this.ambientCanvas.getContext("2d");
    this.celebrationCtx = this.celebrationCanvas.getContext("2d");

    const handleResize = (): void => {
      this.resize();
      this.seedDust();
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    if (prefersReducedMotion()) {
      this.drawStaticDust();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const loop = (): void => {
      this.renderAmbient();
      this.renderCelebration();
      this.rafId = window.requestAnimationFrame(loop);
    };

    this.rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(this.rafId);
      window.removeEventListener("resize", handleResize);
      this.clearCelebrationParticles();
    };
  }

  private resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    [this.ambientCanvas, this.celebrationCanvas].forEach((canvas) => {
      if (!canvas) return;
      canvas.width = Math.floor(this.width * dpr);
      canvas.height = Math.floor(this.height * dpr);
      canvas.style.width = `${this.width}px`;
      canvas.style.height = `${this.height}px`;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  }

  private seedDust(): void {
    const count = isMobileViewport() ? 22 : 48;
    this.dust = Array.from({ length: count }, () => {
      const depth = 0.4 + Math.random() * 0.9;
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: (0.7 + Math.random() * 1.4) * depth,
        vx: (Math.random() - 0.5) * 0.18 * depth,
        vy: (-0.08 - Math.random() * 0.22) * depth,
        alpha: 0.14 + Math.random() * 0.35,
        depth,
      };
    });
  }

  private drawStaticDust(): void {
    if (!this.ambientCtx) return;
    this.ambientCtx.clearRect(0, 0, this.width, this.height);
    for (const p of this.dust) {
      this.ambientCtx.beginPath();
      this.ambientCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ambientCtx.fillStyle = `rgba(214, 183, 121, ${p.alpha * 0.7})`;
      this.ambientCtx.fill();
    }
  }

  private renderAmbient(): void {
    if (!this.ambientCtx) return;
    const ctx = this.ambientCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (const p of this.dust) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) p.y = this.height + 10;
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 217, 166, ${p.alpha})`;
      ctx.fill();
    }
  }

  private renderCelebration(): void {
    if (!this.celebrationCtx) return;
    const ctx = this.celebrationCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.vx *= 0.985;
      b.vy += b.gravity;
      b.x += b.vx;
      b.y += b.vy;
      b.alpha -= b.decay;

      if (b.alpha <= 0.01) {
        this.bursts.splice(i, 1);
        continue;
      }

      if (b.isConfetti) {
        ctx.save();
        ctx.translate(b.x, b.y);
        b.rotation = (b.rotation ?? 0) + (b.vRot ?? 0.03);
        ctx.rotate(b.rotation);
        ctx.fillStyle = `rgba(${b.color}, ${b.alpha})`;
        ctx.fillRect(-b.size, -b.size * 0.45, b.size * 2, b.size * 0.9);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${b.color}, ${b.alpha})`;
        ctx.fill();
      }
    }
  }

  public burstGoldParticles(originX: number, originY: number): void {
    if (prefersReducedMotion()) return;
    const count = isMobileViewport() ? 28 : 56;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
      const speed = 2.2 + Math.random() * 5.2;
      this.bursts.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.4,
        size: 1.4 + Math.random() * 2.4,
        alpha: 0.95,
        decay: 0.013 + Math.random() * 0.01,
        gravity: 0.055,
        color: GOLD_PALETTE[i % GOLD_PALETTE.length],
      });
    }
  }

  public triggerDistantFireworks(): void {
    if (prefersReducedMotion()) return;
    this.clearFireworkTimers();

    // Place bursts in outer sky quadrants so central typography stays clear
    const spots = [
      { x: this.width * 0.16, y: this.height * 0.22 },
      { x: this.width * 0.84, y: this.height * 0.2 },
      { x: this.width * 0.22, y: this.height * 0.72 },
      { x: this.width * 0.8, y: this.height * 0.68 },
    ];

    spots.forEach((spot, index) => {
      const id = window.setTimeout(() => {
        this.spawnFirework(spot.x, spot.y);
      }, index * 460);
      this.fireworkTimerIds.push(id);
    });

    // Restrained floating confetti
    const confettiCount = isMobileViewport() ? 16 : 32;
    const confettiId = window.setTimeout(() => {
      for (let i = 0; i < confettiCount; i++) {
        const edgeX =
          i % 2 === 0
            ? Math.random() * (this.width * 0.28)
            : this.width - Math.random() * (this.width * 0.28);
        this.bursts.push({
          x: edgeX,
          y: -12 - Math.random() * 80,
          vx: (Math.random() - 0.5) * 0.9,
          vy: 0.9 + Math.random() * 1.1,
          size: 3 + Math.random() * 2.4,
          alpha: 0.75,
          decay: 0.0022,
          gravity: 0.008,
          color: GOLD_PALETTE[i % GOLD_PALETTE.length],
          isConfetti: true,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.06,
        });
      }
    }, 350);
    this.fireworkTimerIds.push(confettiId);
  }

  private spawnFirework(x: number, y: number): void {
    const rays = isMobileViewport() ? 18 : 30;
    for (let i = 0; i < rays; i++) {
      const angle = (Math.PI * 2 * i) / rays;
      const speed = 1.4 + Math.random() * 2.6;
      this.bursts.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.2 + Math.random() * 1.6,
        alpha: 0.82,
        decay: 0.011 + Math.random() * 0.007,
        gravity: 0.025,
        color: GOLD_PALETTE[i % GOLD_PALETTE.length],
      });
    }
  }

  private clearFireworkTimers(): void {
    this.fireworkTimerIds.forEach((id) => window.clearTimeout(id));
    this.fireworkTimerIds = [];
  }

  public clearCelebrationParticles(): void {
    this.clearFireworkTimers();
    this.bursts = [];
    this.celebrationCtx?.clearRect(0, 0, this.width, this.height);
  }
}

export const particleEngine = new ParticleEngine();
