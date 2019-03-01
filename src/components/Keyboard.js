// @flow
import React from "react";
import range from "lodash.range";
import KeyboardKey from "./KeyboardKey";

type Props = { keysDown: Array<number> };

// array of midi keys available in the visible keyboard
const keyNumbers = range(45, 63);

/**
 * Keyboard Component.
 */
export function Keyboard({ keysDown }: Props) {
  const keyComponents = keyNumbers.map(keyNumber => (
    <KeyboardKey
      key={keyNumber}
      number={keyNumber}
      pressed={keysDown.includes(keyNumber)}
    />
  ));

  return <g className="keyboard">{keyComponents}</g>;
}
