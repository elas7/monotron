// @flow
export type PointerTarget = {
  name: ?string,
  type: ?boolean
};

export type Pointer = {
  id: number,
  target: PointerTarget
};

export type PointersById = {
  [pointerId: number]: Pointer
};

export type PointersState = {
  byId: PointersById
};

export type GlobalState = {
  pointers: PointersState
};

export type Knob = {
  name: string,
  position: number,
  dragging: boolean,
  pointerId: ?number,
  pointerYPosition: ?number,
  lastDownTime: ?number
};

export type Knobs = {
  [knobName: string]: Knob
};

export type KnobsState = {
  byName: Knobs,
  dragging: boolean
};

export type Toggle = {
  name: string,
  position: number
};

export type Toggles = {
  [toggleName: string]: Toggle
};

export type KeyDown = {
  number: number,
  pressedCount: number
};

export type KeysDownById = {
  [number: number]: KeyDown
};

export type KeysDown = {
  byId: KeysDownById,
  ordered: Array<number>
};

export type KeyboardState = {
  keysDown: KeysDown
};

export type State = {
  global?: GlobalState,
  knobs?: KnobsState,
  toggles?: Toggles,
  keyboard?: KeyboardState
};

export type AudioData = {
  knobs: Knobs,
  toggles: Toggles,
  keys: Array<number>
};
