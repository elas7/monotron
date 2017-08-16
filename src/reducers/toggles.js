// @flow
import { POINTER_DOWN_GLOBAL } from '../actions/global';

import type { Toggles } from '../types';

/**
 * Initial state of toggles.
 */
const initialState = {
  toggleOsc2: {
    name: 'toggleOsc2',

    // The knob positions are 1 if on, 0 if off
    position: 0,
  },
};

/**
 * toggles Reducer
 */
const toggles = (state: Toggles = initialState, action: Object) => {
  switch (action.type) {
    case POINTER_DOWN_GLOBAL: {
      if (action.payload.target.type === 'toggle') {
        // Change toggle position
        const toggleName = action.payload.target.name;
        const newPosition = state[toggleName].position ? 0 : 1;
        const newState = { ...state };
        newState[toggleName] = { ...state[toggleName], position: newPosition };
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

export default toggles;
