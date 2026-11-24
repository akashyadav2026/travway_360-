import type { AudioChannelId } from '../data/destinations';

interface ActiveChannelNodes {
  gain: GainNode;
  cleanup: () => void;
}

/**
 * Zero-404 procedural multi-channel Web Audio soundscape engine.
 * Strictly muted by default (no autoplay) and starts only on explicit user action.
 */
export class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private activeChannels = new Map<AudioChannelId, ActiveChannelNodes>();

  private ensureContext(): AudioContext | null {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private createPinkNoiseBuffer(ctx: AudioContext, seconds = 5): AudioBuffer {
    const bufferSize = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965164;
      b2 = 0.57 * b2 + white * 1.0526913;
      const pink = (b0 + b1 + b2 + white * 0.1848) * 0.12;
      data[i] = Math.max(-1, Math.min(1, pink));
    }
    return buffer;
  }

  private createBrownNoiseBuffer(ctx: AudioContext, seconds = 6): AudioBuffer {
    const bufferSize = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = Math.max(-1, Math.min(1, lastOut * 3.2));
    }
    return buffer;
  }

  private createCrackleBuffer(ctx: AudioContext, seconds = 6): AudioBuffer {
    const bufferSize = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let env = 0;
    for (let i = 0; i < bufferSize; i++) {
      // Sparse sharp driftwood pops + gentle ember hiss
      if (Math.random() < 0.0014) {
        env = 0.55 + Math.random() * 0.45;
      }
      const impulse = (Math.random() * 2 - 1) * env;
      const softHiss = (Math.random() * 2 - 1) * 0.035;
      data[i] = Math.max(-1, Math.min(1, impulse + softHiss));
      env *= 0.988;
    }
    return buffer;
  }

  private startMountainWind(ctx: AudioContext): ActiveChannelNodes {
    const noise = ctx.createBufferSource();
    noise.buffer = this.createPinkNoiseBuffer(ctx, 4);
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

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 0.7);

    noise.connect(lowFilter);
    noise.connect(highFilter);
    lowFilter.connect(gain);
    highFilter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    lfo1.start();
    lfo2.start();

    return {
      gain,
      cleanup: () => {
        try {
          gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.12);
          noise.stop(ctx.currentTime + 0.25);
          lfo1.stop(ctx.currentTime + 0.25);
          lfo2.stop(ctx.currentTime + 0.25);
        } catch {
          // Ignore already stopped nodes
        }
      },
    };
  }

  private startOceanWaves(ctx: AudioContext): ActiveChannelNodes {
    const swellNoise = ctx.createBufferSource();
    swellNoise.buffer = this.createBrownNoiseBuffer(ctx, 6);
    swellNoise.loop = true;

    const surfFilter = ctx.createBiquadFilter();
    surfFilter.type = 'lowpass';
    surfFilter.frequency.value = 380;
    surfFilter.Q.value = 0.7;

    // Gentle foam layer
    const foamNoise = ctx.createBufferSource();
    foamNoise.buffer = this.createPinkNoiseBuffer(ctx, 5);
    foamNoise.loop = true;

    const foamFilter = ctx.createBiquadFilter();
    foamFilter.type = 'bandpass';
    foamFilter.frequency.value = 920;
    foamFilter.Q.value = 0.85;

    const waveEnvelope = ctx.createGain();
    waveEnvelope.gain.value = 0.45;

    const swellLfo = ctx.createOscillator();
    swellLfo.type = 'sine';
    swellLfo.frequency.value = 0.125; // ~8-second gentle shore wave cycle
    const swellDepth = ctx.createGain();
    swellDepth.gain.value = 0.38;
    swellLfo.connect(swellDepth);
    swellDepth.connect(waveEnvelope.gain);

    const freqLfo = ctx.createOscillator();
    freqLfo.type = 'sine';
    freqLfo.frequency.value = 0.125;
    const freqDepth = ctx.createGain();
    freqDepth.gain.value = 260;
    freqLfo.connect(freqDepth);
    freqDepth.connect(surfFilter.frequency);

    const foamGain = ctx.createGain();
    foamGain.gain.value = 0.16;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.32, ctx.currentTime + 0.8);

    swellNoise.connect(surfFilter);
    surfFilter.connect(waveEnvelope);
    foamNoise.connect(foamFilter);
    foamFilter.connect(foamGain);
    foamGain.connect(waveEnvelope);
    waveEnvelope.connect(masterGain);
    masterGain.connect(ctx.destination);

    swellNoise.start();
    foamNoise.start();
    swellLfo.start();
    freqLfo.start();

    return {
      gain: masterGain,
      cleanup: () => {
        try {
          masterGain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.12);
          swellNoise.stop(ctx.currentTime + 0.25);
          foamNoise.stop(ctx.currentTime + 0.25);
          swellLfo.stop(ctx.currentTime + 0.25);
          freqLfo.stop(ctx.currentTime + 0.25);
        } catch {
          // Ignore already stopped nodes
        }
      },
    };
  }

  private startNightWind(ctx: AudioContext): ActiveChannelNodes {
    const noise = ctx.createBufferSource();
    noise.buffer = this.createPinkNoiseBuffer(ctx, 5);
    noise.loop = true;

    const softFilter = ctx.createBiquadFilter();
    softFilter.type = 'bandpass';
    softFilter.frequency.value = 310;
    softFilter.Q.value = 1.4;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 85;
    lfo.connect(lfoGain);
    lfoGain.connect(softFilter.frequency);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.8);

    noise.connect(softFilter);
    softFilter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    lfo.start();

    return {
      gain,
      cleanup: () => {
        try {
          gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.12);
          noise.stop(ctx.currentTime + 0.25);
          lfo.stop(ctx.currentTime + 0.25);
        } catch {
          // Ignore already stopped nodes
        }
      },
    };
  }

  private startBonfireCrackle(ctx: AudioContext): ActiveChannelNodes {
    // Low warm fire bed
    const bedNoise = ctx.createBufferSource();
    bedNoise.buffer = this.createBrownNoiseBuffer(ctx, 5);
    bedNoise.loop = true;

    const bedFilter = ctx.createBiquadFilter();
    bedFilter.type = 'lowpass';
    bedFilter.frequency.value = 160;
    const bedGain = ctx.createGain();
    bedGain.gain.value = 0.22;

    // Crisp driftwood crackles & pops
    const crackleSource = ctx.createBufferSource();
    crackleSource.buffer = this.createCrackleBuffer(ctx, 6);
    crackleSource.loop = true;

    const crackleBand = ctx.createBiquadFilter();
    crackleBand.type = 'bandpass';
    crackleBand.frequency.value = 2600;
    crackleBand.Q.value = 1.1;

    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.55;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.5);

    bedNoise.connect(bedFilter);
    bedFilter.connect(bedGain);
    bedGain.connect(masterGain);

    crackleSource.connect(crackleBand);
    crackleBand.connect(crackleGain);
    crackleGain.connect(masterGain);

    masterGain.connect(ctx.destination);

    bedNoise.start();
    crackleSource.start();

    return {
      gain: masterGain,
      cleanup: () => {
        try {
          masterGain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.12);
          bedNoise.stop(ctx.currentTime + 0.25);
          crackleSource.stop(ctx.currentTime + 0.25);
        } catch {
          // Ignore already stopped nodes
        }
      },
    };
  }

  public startChannel(channelId: AudioChannelId): void {
    if (this.activeChannels.has(channelId)) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    let nodes: ActiveChannelNodes;
    switch (channelId) {
      case 'mountain-wind':
        nodes = this.startMountainWind(ctx);
        break;
      case 'ocean-waves':
        nodes = this.startOceanWaves(ctx);
        break;
      case 'night-wind':
        nodes = this.startNightWind(ctx);
        break;
      case 'bonfire-crackle':
        nodes = this.startBonfireCrackle(ctx);
        break;
    }

    this.activeChannels.set(channelId, nodes);
  }

  public stopChannel(channelId: AudioChannelId): void {
    const existing = this.activeChannels.get(channelId);
    if (!existing) return;
    existing.cleanup();
    this.activeChannels.delete(channelId);
  }

  public muteAll(): void {
    for (const [id, nodes] of this.activeChannels.entries()) {
      nodes.cleanup();
      this.activeChannels.delete(id);
    }
  }

  public dispose(): void {
    this.muteAll();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}
