// @flow
import {
  POINTER_DOWN_GLOBAL,
  POINTER_UP_GLOBAL,
  POINTER_MOVE_GLOBAL
} from "../actions/global";
import { rangeMin, rangeMax, rangeCenter, responsivity, knobNames } from "../lib/knob";
import { clamp } from "../utils/func";

import type { KnobsState, Knobs, PointersById } from "../types";

/**
 * Initial state of byName.
 * It has one key for every type of knob.
 * name: {name, position, dragging}
 * 'position' is the value of the knob, the full range is 0 to 1.
 * 'dragging' is whether the knobs is being dragged
 */
const byNameInitialState = () => {
  const state = {};

  for (const name of knobNames) {
    state[name] = {
      name: name,
      position: rangeCenter,
      dragging: false,
      pointerId: null,
      pointerYPosition: null,
      lastDownTime: null
    };
  }

  return state;
};

/**
 * Initial state
 */
const initialState = {
  byName: byNameInitialState(),
  names: knobNames
};

/**
 * byName Reducer
 */
const byName = (state: Knobs = initialState.byName, action) => {
  switch (action.type) {
    case POINTER_DOWN_GLOBAL: {
      if (action.payload.target.type === "knob") {
        const knobName = action.payload.target.name;
        const knob = state[knobName];

        // figure out is this is a double click/tap
        let isDoubleClick = false;
        const previousTime = knob && knob.lastDownTime;
        const currentTime = action.payload.time;
        if (previousTime != null) {
          const timeSinceLastPointerDown = currentTime - previousTime;
          const doubleClickTime = 250; // milliseconds
          isDoubleClick = timeSinceLastPointerDown < doubleClickTime;
        }

        const newState = { ...state };
        const newKnobState = {
          ...knob,
          pointerId: action.payload.pointerId,
          pointerYPosition: action.payload.pointerYPosition,
          lastDownTime: currentTime
        };

        if (isDoubleClick) {
          // Set knob position to initial position
          newKnobState.position = rangeCenter;
        } else {
          // Set dragging true in knob
          newKnobState.dragging = true;
        }
        newState[knobName] = newKnobState;
        return newState;
      }
      return state;
    }
    case POINTER_MOVE_GLOBAL: {
      // set new data in the dragging knob
      const pointerId = action.payload.pointerId;
      const draggingKnob = Object.keys(state).find(
        name => state[name].pointerId === pointerId
      );

      if (draggingKnob && state[draggingKnob].pointerYPosition != null) {
        const deltaY =
          action.payload.pointerYPosition -
          state[draggingKnob].pointerYPosition;
        // Change knob position based on delta.
        // 'clamp' prevents the knob position from leaving the range
        const newPosition = clamp(
          state[draggingKnob].position - deltaY * responsivity,
          rangeMin,
          rangeMax
        );
        const newState = { ...state };
        newState[draggingKnob] = {
          ...state[draggingKnob],
          position: newPosition,
          pointerYPosition: action.payload.pointerYPosition
        };
        return newState;
      }
      return state;
    }
    case POINTER_UP_GLOBAL: {
      // Reset knob state if a knob is dragging
      const pointerId = action.payload.pointerId;
      const draggingKnob = Object.keys(state).find(
        name => state[name].pointerId === pointerId
      );
      if (draggingKnob) {
        const newState = { ...state };
        newState[draggingKnob] = {
          ...state[draggingKnob],
          dragging: false,
          pointerId: null,
          pointerYPosition: null
        };
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

/**
 * names Reducer
 */
const names = (state = initialState.names) => state;

/**
 * knobs Reducer
 */
const knobs = (
  state: KnobsState = initialState,
  action: Object,
  pointers: ?PointersById
) => ({
  // Pass 'state.mouseYPosition' and 'global.pointer' to byName reducer
  byName: byName(state.byName, action, pointers),
  names: names(state.names, action)
});

export default knobs;
