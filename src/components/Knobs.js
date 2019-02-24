// @flow
import React from "react";
import KnobContainer from "../containers/Knob";

type Props = {
  names: string[]
};

/**
 * Knobs Component.
 */
export default function Knobs({ names }: Props) {
  return (
    <g className="knobs">
      {names.map(name => (
        <KnobContainer key={name} name={name} />
      ))}
    </g>
  );
}
