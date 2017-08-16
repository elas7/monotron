// @flow
import { getPointerPosition } from '../utils/func';

import type { PointerTarget } from '../types';

/**
 * Global action types
 */
// Emitted when doing pointer down anywhere
export const POINTER_DOWN_GLOBAL = 'POINTER_DOWN_GLOBAL';
// Emitted when doing pointer up anywhere
export const POINTER_UP_GLOBAL = 'POINTER_UP_GLOBAL';
// Emitted when doing pointer move anywhere (touch move or mouse move while clicking)
export const POINTER_MOVE_GLOBAL = 'POINTER_MOVE_GLOBAL';

/**
 * POINTER_DOWN_GLOBAL Action creator.
 * @param target
 * @param event
 */
export const pointerDownGlobal = (target: PointerTarget, event: any) => {
  // get current time, used to detect double tap
  const currentTimeUTC = performance.now();

  // Calculate pointer y position
  const pointerYPosition = getPointerPosition(event).y;

  const pointerId: number = event.pointerId;

  return {
    type: POINTER_DOWN_GLOBAL,
    payload: {
      target: target,
      pointerYPosition: pointerYPosition,
      pointerId: pointerId,
      time: currentTimeUTC,
    },
  };
};

/**
 * POINTER_UP_GLOBAL Action creator.
 */
export const pointerUpGlobal = (event: any) => {
  const pointerId: number = event.pointerId;

  return {
    type: POINTER_UP_GLOBAL,
    payload: {
      pointerId: pointerId,
    },
  };
};

/**
 * POINTER_MOVE_GLOBAL Action creator.
 * @param target
 * @param event
 */
export const pointerMoveGlobal = (target: PointerTarget, event: any) => {
  // Calculate pointer y position
  const pointerYPosition = getPointerPosition(event).y;

  const pointerId: number = event.pointerId;

  return {
    type: POINTER_MOVE_GLOBAL,
    payload: {
      target,
      pointerYPosition,
      pointerId,
    },
  };
};
