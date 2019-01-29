// @flow
import type { AudioData } from '../types';

/**
 * Renders audio using the Web Audio API from a Monotron state
 */
export default class MonotronAudio {
  context: AudioContext;
  audioData: Object;
  knobOsc1Val: number;
  knobOsc2Val: number;

  masterGain: GainNode;
  lowpassFilter: BiquadFilterNode;
  osc1: OscillatorNode;
  osc1Gain: GainNode;
  osc1XmodMix: GainNode;
  osc2: OscillatorNode;
  osc2Gain: GainNode;
  osc2XmodMix: GainNode;

  constructor(context: AudioContext, audioData: AudioData) {
    // Web Audio API context
    this.context = context;

    this.initAudioNodes();
    this.update(audioData);
  }

  /**
   * Create and connect all the audio nodes used by the Monotron
   */
  initAudioNodes() {
    this.masterGain = this.context.createGain();
    this.lowpassFilter = this.context.createBiquadFilter();

    // Set a low volume in the master gain to avoid clipping.
    // Setting up a DynamicsCompressorNode could be another
    // (or a complementing) solution
    this.masterGain.gain.value = 0.3;

    this.masterGain.connect(this.lowpassFilter);
    this.lowpassFilter.connect(this.context.destination);

    // Connect oscillator 1, mute it, and start it.
    // This also connects osc1XmodMix to the master gain, which is the
    // node that contains the Amplitude Modulation of Ocs2 into Osc1
    this.osc1 = this.context.createOscillator();
    this.osc1Gain = this.context.createGain();
    this.osc1XmodMix = this.context.createGain();
    this.osc1.type = 'square';
    this.osc1.connect(this.osc1Gain);
    this.osc1Gain.connect(this.masterGain);
    this.osc1Gain.gain.value = 0.0;
    this.osc1Gain.connect(this.osc1XmodMix);
    this.osc1XmodMix.connect(this.masterGain);
    this.osc1XmodMix.gain.value = 0.0;
    this.osc1.start(0);

    // Connect oscillator 2, mute it, and start it
    this.osc2 = this.context.createOscillator();
    this.osc2Gain = this.context.createGain();
    this.osc2.type = 'square';
    this.osc2.connect(this.osc2Gain);
    this.osc2Gain.connect(this.masterGain);
    this.osc2Gain.gain.value = 0.0;
    this.osc2.start(0);

    this.osc2XmodMix = this.context.createGain();

    // Initialize the modulation with a value of 0.5,
    // which is the middle of the range of the modulation knob
    this.osc2XmodMix.gain.value = 0.5;

    // Here's the key part. The signal of osc2 is connected to the GAIN of
    // osc1XmodMix which until that point contained only the signal of Osc 1.
    // This performs AM synthesis: harmonics are created because Osc 2 is a signal
    // in the audible range, not an LFO.
    this.osc2.connect(this.osc2XmodMix);
    this.osc2XmodMix.connect(this.osc1XmodMix.gain);

    // Initialize the filter with the frequency of the semitone 72.5,
    // which is the middle of the range of the cutoff knob
    this.lowpassFilter.frequency.setValueAtTime(MonotronAudio.getFrequency(72.5), this.context.currentTime);
  }

  /**
   * Update audio nodes.
   * audioData is the Monotron state as returned from the audioData selector
   */
  update(audioData: AudioData) {
    // AudioContext must be resumed after the document received a user gesture to enable audio playback.
    if (this.context.state === 'suspended') {
      this.context.resume();
    }

    // Save new audio data
    this.audioData = audioData;

    // KNOBS

    // The oscillator knobs represent a variation of semitones.
    // knobOsc1 has a range of +-16 semitones, knobOsc2 has a range of +-28 semitones.
    // The initial position for both is 0 semitones, meaning no variation.

    // We need to declare variables for the values of the knobs because these
    // don't map to the frequency of their oscillators. This is not needed for the
    // other knobs because they map exactly to a certain value in a Web Audio Node.
    this.knobOsc1Val = 0;
    this.knobOsc2Val = 0;

    // Handle knobOsc1
    {
      const position = audioData.knobs.knobOsc1.position;
      const oldRange = 1 - 0;
      const newRange = 16 - -16; // 2 octaves = 16 semitones
      this.knobOsc1Val = position * newRange / oldRange + -16;
      if (audioData.keys.length !== 0) {
        this.osc1.frequency.setValueAtTime(this.getOsc1Freq(), this.context.currentTime);
        this.osc2.frequency.setValueAtTime(this.getOsc2Freq(), this.context.currentTime);
      }
    }

    // Handle knobOsc2
    {
      const position = audioData.knobs.knobOsc2.position;
      const oldRange = 1 - 0;
      const newRange = 28 - -28; // 3.5 octaves = 28 semitones
      this.knobOsc2Val = position * newRange / oldRange + -28;
      if (audioData.keys.length !== 0) {
        this.osc2.frequency.setValueAtTime(this.getOsc2Freq(), this.context.currentTime);
      }
    }

    // Handle knobXmod
    this.osc2XmodMix.gain.value = audioData.knobs.knobXmod.position;
    if (audioData.keys.length !== 0) {
      this.osc1.frequency.setValueAtTime(this.getOsc1Freq(), this.context.currentTime);
      this.osc2.frequency.setValueAtTime(this.getOsc2Freq(), this.context.currentTime);
    }

    // Handle knobCutoff
    // The cutoff frequency goes from C#1 (semitone 25) to C9 (semitone 120)
    {
      const position = audioData.knobs.knobCutoff.position;
      const oldRange = 1 - 0;
      const newRange = 120 - 25;
      const semitones = position * newRange / oldRange + 25;
      this.lowpassFilter.frequency.setValueAtTime(MonotronAudio.getFrequency(semitones), this.context.currentTime);
    }

    // Handle knobPeak
    // The cutoff peak goes from 10**-1 to 10**1.5, it's an exponential
    // range that loosely imitates the original device's sound.
    {
      const position = audioData.knobs.knobPeak.position;
      const oldRange = 1 - 0;
      const newRange = 1.5 - -1;
      const value = 10 ** (position * newRange / oldRange + -1);
      this.lowpassFilter.Q.setValueAtTime(value, this.context.currentTime);
    }

    // TOGGLES

    // Handle toggleOsc2
    // Toggle that activates or deactivates Osc2
    {
      const position = audioData.toggles.toggleOsc2.position;
      if (!position) {
        this.osc2Gain.gain.value = 0.0;
      } else if (audioData.keys.length !== 0) {
        this.osc2Gain.gain.value = 1.0;
      }
    }

    // KEYBOARD
    {
      const keys = audioData.keys;
      if (keys.length === 0) {
        this.stop();
      } else {
        this.play();
      }
    }
  }

  /**
   * Returns the frequency of a semitone number
   */
  static getFrequency(note: number) {
    return 440 * 2 ** ((note - 69) / 12);
  }

  /**
   * Osc1's frequency depends on the note played, the value of the Osc1 knob, and the
   * value of the modulation knob. The modulation knob can modify the frequency of
   * Osc1 by up to 1 semitone.
   */
  getOsc1Freq() {
    const semitones = this.audioData.keys[0] + this.knobOsc1Val + this.audioData.knobs.knobXmod.position * 1;
    return MonotronAudio.getFrequency(semitones);
  }

  /**
   * Osc2's frequency depends on the note played, the value of the Osc2 knob, and the
   * frequency of Osc1
   */
  getOsc2Freq() {
    const semitones = this.audioData.keys[0] + this.knobOsc2Val;
    return MonotronAudio.getFrequency(semitones) + this.getOsc1Freq();
  }

  /**
   * Set oscillators to the correct frequency and unmute them.
   */
  play() {
    this.osc1.frequency.setValueAtTime(this.getOsc1Freq(), this.context.currentTime);
    this.osc2.frequency.setValueAtTime(this.getOsc2Freq(), this.context.currentTime);
    this.osc1Gain.gain.value = 1.0;
    if (this.audioData.toggles.toggleOsc2.position) {
      this.osc2Gain.gain.value = 1.0;
    }
  }

  /**
   * Mute both oscillators
   */
  stop() {
    this.osc1Gain.gain.value = 0.0;
    this.osc2Gain.gain.value = 0.0;
  }
}
