// @flow

// The full range of a knob is [0, 1]
export const rangeMin = 0;
export const rangeMax = 1;
export const rangeCenter = 0.5;

// The range in terms of radian angle from the center of the knob
export const angleMin = (-5 / 6) * Math.PI;
export const angleMax = (+5 / 6) * Math.PI;

// Knob responsivity when dragging
export const responsivity = 0.009;

export const knobNames = [
  "knobOsc1",
  "knobXmod",
  "knobOsc2",
  "knobCutoff",
  "knobPeak"
];