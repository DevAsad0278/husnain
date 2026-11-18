/**
 * Synthesized Web Audio API soundscape.
 * - Never autoplays.
 * - Requires explicit user toggle (or user gesture once enabled).
 * - Zero external audio files that could fail or 404.
 */
class SoundController {
  private ctx: AudioContext | null = null;
  private enabled = false;
  private toggleBtn: HTMLButtonElement | null = null;
  private labelEl: HTMLElement | null = null;

  public init(): () => void {
    this.toggleBtn = document.querySelector<HTMLButtonElement>(
      "[data-sound-toggle]"
    );
    this.labelEl = document.querySelector<HTMLElement>("[data-sound-label]");

    if (!this.toggleBtn) {
      return () => {};
    }

    const onToggle = (): void => {
      this.enabled = !this.enabled;
      if (this.enabled) {
        this.ensureContext();
        this.playChime(523.25, 0.08, 0.35);
      }
      this.updateUI();
    };

    this.toggleBtn.addEventListener("click", onToggle);
    this.updateUI();

    return () => {
      this.toggleBtn?.removeEventListener("click", onToggle);
      if (this.ctx && this.ctx.state !== "closed") {
        void this.ctx.close();
      }
      this.ctx = null;
    };
  }

  private ensureContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private updateUI(): void {
    if (!this.toggleBtn) return;
    this.toggleBtn.setAttribute("aria-pressed", String(this.enabled));
    this.toggleBtn.setAttribute(
      "aria-label",
      this.enabled ? "Mute ambient sound" : "Enable ambient sound"
    );
    if (this.labelEl) {
      this.labelEl.textContent = this.enabled ? "SOUND: ON" : "SOUND: OFF";
    }
  }

  private playChime(freq: number, gainPeak: number, duration: number): void {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playGiftShimmer(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      window.setTimeout(() => {
        this.playChime(freq, 0.055, 0.75);
      }, i * 85);
    });
  }

  public playBirthdaySting(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const chord = [261.63, 329.63, 392.0, 523.25, 659.25];
    chord.forEach((freq, i) => {
      window.setTimeout(() => {
        this.playChime(freq, 0.05, 1.35);
      }, i * 70);
    });
  }

  public playCandleWhoosh(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const duration = 0.55;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(650, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + duration);
    filter.Q.value = 1.6;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.11, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + duration);

    window.setTimeout(() => {
      this.playChime(587.33, 0.05, 1.2);
    }, 340);
  }
}

export const soundController = new SoundController();
