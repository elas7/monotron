// @flow
import { POINTER_DOWN_GLOBAL, POINTER_UP_GLOBAL, POINTER_MOVE_GLOBAL } from '../actions/global';
import { KEY_DOWN_GLOBAL, KEY_UP_GLOBAL } from '../actions/keyboard';

import type { KeysDown, KeyboardState, PointersById } from '../types';

/**
 * Initial state of keysDown.
 * Contains data and order of each key currently pressed.
 */
const keysDownInitialState = {
  // number: {number, pressedCount}
  // 'pressedCount' is the number of devices (QWERTY or mouse) that are
  // currently pressing the key.
  byId: {},

  // key numbers ordered by most recently pressed
  ordered: [],
};

/**
 * Initial state
 */
const initialState = {
  keysDown: keysDownInitialState,
};

/**
 * Returns a new keysDown state obtained by pressing the key with the
 * provided number.
 */
const pressKey = (keysDownState, keyNumber) => {
  const alreadyPressed = keysDownState.byId[keyNumber];

  // new states
  const newById = { ...keysDownState.byId };
  const newOrdered = [...keysDownState.ordered];

  // If the key is already pressed, new pressedCount is 2
  const pressedCount = alreadyPressed ? keysDownState.byId[keyNumber].pressedCount + 1 : 1;
  newById[keyNumber] = { number: keyNumber, pressedCount: pressedCount };

  // Add key number at the top of 'ordered' if it wasn't pressed
  if (!alreadyPressed) {
    newOrdered.unshift(keyNumber);
  }

  return { byId: newById, ordered: newOrdered };
};

/**
 * Returns a new keysDown state obtained by releasing the key with the
 * provided number.
 */
const releaseKey = (keysDownState, keyNumber) => {
  const pressedCount = keysDownState.byId[keyNumber].pressedCount;
  const pressedOnce = pressedCount === 1;

  // new states
  const newById = { ...keysDownState.byId };
  const newOrdered = [...keysDownState.ordered];

  if (pressedOnce) {
    // delete key from 'byId' and 'ordered'
    delete newById[keyNumber];
    newOrdered.splice(newOrdered.indexOf(keyNumber), 1);
  } else {
    // reduce pressedCount by 1
    newById[keyNumber] = { number: keyNumber, pressedCount: pressedCount - 1 };
  }

  return { byId: newById, ordered: newOrdered };
};

/**
 * keysDown reducer
 * It Additionally gets the current state.global.pointers.byId and draggingPointers
 */
const keysDown = (state: KeysDown = initialState.keysDown, action, pointers, draggingPointers) => {
  switch (action.type) {
    case POINTER_DOWN_GLOBAL: {
      const isPressingKey = action.payload.target.type === 'key';
      if (isPressingKey) {
        const keyNumber = Number(action.payload.target.name);
        return pressKey(state, keyNumber);
      }
      return state;
    }
    case POINTER_UP_GLOBAL: {
      if (pointers) {
        // release key only if the pointer is not dragging a knob
        const pointerId = action.payload.pointerId;
        const pointer = pointers[pointerId];
        const wasPressingKey = pointer.target.type === 'key';
        const isDraggingKnob = draggingPointers.includes(pointerId);
        if (wasPressingKey && !isDraggingKnob) {
          const keyNumber = Number(pointer.target.name);
          return releaseKey(state, keyNumber);
        }
      }
      return state;
    }
    case POINTER_MOVE_GLOBAL: {
      if (pointers) {
        const pointerId = action.payload.pointerId;
        const pointer = pointers[pointerId];
        const isPressingKey = action.payload.target.type === 'key';
        const wasPressingKey = pointer.target.type === 'key';
        const isNewTarget = action.payload.target.name !== pointer.target.name;

        const movingOverKey = isPressingKey && isNewTarget;
        const movingOutOfKey = wasPressingKey && isNewTarget;

        const isDraggingKnob = draggingPointers.includes(pointerId);

        // press key only if pointer was down and is not dragging a knob
        if (movingOverKey && !isDraggingKnob) {
          const keyNumber = Number(action.payload.target.name);
          state = pressKey(state, keyNumber);
        }

        // release key only if pointer was down and is not dragging a knob
        if (movingOutOfKey && !isDraggingKnob) {
          const keyNumber = Number(pointer.target.name);
          state = releaseKey(state, keyNumber);
        }
      }

      return state;
    }
    case KEY_DOWN_GLOBAL:
      return pressKey(state, action.payload.number);
    case KEY_UP_GLOBAL:
      return releaseKey(state, action.payload.number);
    default:
      return state;
  }
};

/**
 * keyboard Reducer
 */
const keyboard = (
  state: KeyboardState = initialState,
  action: Object,
  pointers: ?PointersById,
  draggingPointers: Array<number>
) => ({
  // Pass 'global.pointer' and 'draggingPointers' to keysDown reducer
  keysDown: keysDown(state.keysDown, action, pointers, draggingPointers),
});

export default keyboard;
