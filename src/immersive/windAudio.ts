/**
 * Zero-404 procedural ambient mountain wind audio controller using Web Audio API.
 * Strictly muted by default and activated only on explicit user action.
 */
export class MountainWindAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private lfo1: OscillatorNode | null = null;
  private lfo2: OscillatorNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private isPlaying = false;

  public start(): void {
    if (this.isPlaying) return;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = this.ctx ?? new AudioCtx();
    this.ctx = ctx;

    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    // 4-second looping pink-tinted wind noise buffer
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965164;
      b2 = 0.57 * b2 + white * 1.0526913;
      const pink = b0 + b1 + b2 + white * 0.1848;
      b3 = pink * 0.12;
      data[i] = Math.max(-1, Math.min(1, b3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const lowFilter = ctx.createBiquadFilter();
    lowFilter.type = 'bandpass';
    lowFilter.frequency.value = 240;
    lowFilter.Q.value = 1.6;

    const highFilter = ctx.createBiquadFilter();
    highFilter.type = 'bandpass';
    highFilter.frequency.value = 520;
    highFilter.Q.value = 2.4;

    const lfo1 = ctx.createOscillator();
    lfo1.type = 'sine';
    lfo1.frequency.value = 0.11;
    const lfo1Gain = ctx.createGain();
    lfo1Gain.gain.value = 95;
    lfo1.connect(lfo1Gain);
    lfo1Gain.connect(lowFilter.frequency);

    const lfo2 = ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.value = 0.07;
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.value = 140;
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(highFilter.frequency);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 0.8);

    noise.connect(lowFilter);
    noise.connect(highFilter);
    lowFilter.connect(masterGain);
    highFilter.connect(masterGain);
    masterGain.connect(ctx.destination);

    noise.start();
    lfo1.start();
    lfo2.start();

    this.noiseSource = noise;
    this.lfo1 = lfo1;
    this.lfo2 = lfo2;
    this.masterGain = masterGain;
    this.isPlaying = true;
  }

  public stop(): void {
    if (!this.isPlaying) return;
    try {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.12);
      }
      this.noiseSource?.stop(this.ctx ? this.ctx.currentTime + 0.25 : 0);
      this.lfo1?.stop(this.ctx ? this.ctx.currentTime + 0.25 : 0);
      this.lfo2?.stop(this.ctx ? this.ctx.currentTime + 0.25 : 0);
    } catch {
      // Ignore already-stopped nodes
    }
    this.noiseSource = null;
    this.lfo1 = null;
    this.lfo2 = null;
    this.isPlaying = false;
  }

  public dispose(): void {
    this.stop();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}
