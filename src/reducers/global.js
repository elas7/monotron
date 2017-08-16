// @flow
import { POINTER_DOWN_GLOBAL, POINTER_UP_GLOBAL, POINTER_MOVE_GLOBAL } from '../actions/global';

import type { PointersById, GlobalState } from '../types';

/**
 * Initial state
 */
const initialState = {
  pointers: {
    byId: {},
  },
};

/**
 * Returns a new keysDown state obtained by pressing the key with the
 * provided number.
 */
const updatePointer = (pointersByIdState, action) => {
  // update state
  const newState = { ...pointersByIdState };
  const pointerId = action.payload.pointerId;
  newState[pointerId] = {
    id: pointerId,
    target: action.payload.target,
  };

  return newState;
};

/**
 * Returns a new keysDown state obtained by releasing the key with the
 * provided number.
 */
const removePointer = (pointersByIdState, pointerId) => {
  // update state
  const newState = { ...pointersByIdState };
  delete newState[pointerId];

  return newState;
};

/**
 * pointersById Reducer
 */
const pointersById = (state: PointersById = initialState.pointers.byId, action) => {
  switch (action.type) {
    case POINTER_DOWN_GLOBAL: {
      return updatePointer(state, action);
    }
    case POINTER_UP_GLOBAL: {
      const pointerId = action.payload.pointerId;
      return removePointer(state, pointerId);
    }
    case POINTER_MOVE_GLOBAL: {
      return updatePointer(state, action);
    }
    default:
      return state;
  }
};

/**
 * global Reducer
 */
const global = (state: GlobalState = initialState, action: Object) => ({
  pointers: {
    byId: pointersById(state.pointers.byId, action),
  },
});

export default global;
