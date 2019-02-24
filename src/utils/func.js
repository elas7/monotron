// @flow

/**
 * Takes a pointer event and return object with 'x' and 'y' positions of cursor.
 */
export const getPointerPosition = function(event: any) {
  return {
    x: event.clientX,
    y: event.clientY
  };
};

/**
 * Convert a value in an old range to the corresponding value in a new range
 */
export const convertRange = function(
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  oldValue: number
) {
  const oldRange = oldMax - oldMin;
  const newRange = newMax - newMin;
  return ((oldValue - oldMin) * newRange) / oldRange + newMin;
};

/**
 * Return value if within bounds, otherwise return corresponding bound
 */
export const clamp = function(value: number, low: number, high: number) {
  return Math.min(high, Math.max(low, value));
};

/**
 * Get the mean of two values.
 * On this project, this is used to get the middle value of a range
 */
export const mean = function(first: number, second: number) {
  return (parseFloat(first) + parseFloat(second)) / 2;
};
