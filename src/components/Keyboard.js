// @flow
import React from "react";
import range from "lodash.range";
import KeyboardKey from "./KeyboardKey";

type Props = { keysDown: Array<number> };

/**
 * Keyboard Component.
 */
export function Keyboard({ keysDown }: Props) {
  // Return true if 'keyNumber' is in 'keysDown'
  const isKeyDown = function(keyNumber) {
    return keysDown.includes(keyNumber);
  };

  // array of midi keys available in the visible keyboard
  const keyNumbers = range(45, 63);

  return (
    <g className="keyboard">
      {keyNumbers.map(keyNumber => (
        <KeyboardKey
          key={keyNumber}
          number={keyNumber}
          pressed={isKeyDown(keyNumber)}
        />
      ))}
    </g>
  );
}
