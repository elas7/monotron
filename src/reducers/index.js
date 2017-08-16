// @flow
import get from 'lodash.get';

import global from './global';
import keyboard from './keyboard';
import knobs from './knobs';
import toggles from './toggles';
import { getDraggingPointers } from '../selectors';

import type { State } from '../types';

/**
 * Monotron App main reducer
 */
const monotronApp = (state: State = {}, action: Object) => {
  const draggingPointers = getDraggingPointers(state);
  const pointers = get(state, ['global', 'pointers', 'byId']);

  return {
    global: global(state.global, action),
    knobs: knobs(state.knobs, action, pointers),
    toggles: toggles(state.toggles, action),

    // Pass extra state to keyboard reducer
    keyboard: keyboard(state.keyboard, action, pointers, draggingPointers),
  };
};

export default monotronApp;
