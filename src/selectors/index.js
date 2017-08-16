// @flow
import { createSelector } from 'reselect';

const getKnobs = state => {
  if (state.knobs && state.knobs.byName) {
    return state.knobs.byName;
  }
  return {};
};

const getToggles = state => state.toggles;

const getKeys = state => state.keyboard.keysDown.ordered;

/**
 * Returns the data needed from the Monotron state to render audio
 * with Web Audio API
 */
export const getAudioData = createSelector([getKnobs, getToggles, getKeys], (knobs, toggles, keys) => ({
  knobs,
  toggles,
  keys,
}));

/**
 * Returns true if a knob is being dragged
 * with Web Audio API
 */
export const isDragging = createSelector([getKnobs], knobs => {
  if (knobs) {
    return Object.keys(knobs).some(name => knobs[name].dragging);
  }
  return false;
});

/**
 * Returns array of pointer ids that are dragging knobs
 * with Web Audio API
 */
export const getDraggingPointers = createSelector([getKnobs], knobs => {
  if (knobs) {
    return Object.keys(knobs).reduce((accumulator, knobName) => {
      const knob = knobs[knobName];
      if (knob.dragging) {
        return accumulator.concat(knob.pointerId);
      }
      return accumulator;
    }, []);
  }
  return [];
});
