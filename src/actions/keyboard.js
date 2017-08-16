// @flow
/**
 * Keyboard action types
 */
// Emitted when doing QWERTY key down anywhere
export const KEY_DOWN_GLOBAL = 'KEY_DOWN_GLOBAL';
// Emitted when doing QWERTY key up anywhere
export const KEY_UP_GLOBAL = 'KEY_UP_GLOBAL';

/**
 * KEY_DOWN_GLOBAL Action creator.
 * Takes a MIDI number
 */
export const keyDownGlobal = (number: number) => ({
  type: KEY_DOWN_GLOBAL,
  payload: {
    number,
  },
});

/**
 * KEY_UP_GLOBAL Action creator.
 * Takes a MIDI number
 */
export const keyUpGlobal = (number: number) => ({
  type: KEY_UP_GLOBAL,
  payload: {
    number,
  },
});
