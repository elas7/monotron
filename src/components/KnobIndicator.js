// @flow
import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import type { KnobPosition } from "../types";

type Props = {
  knobPosition: number,
  domPosition: KnobPosition,
  visible: boolean
};

const layer = document.createElement("div");
document.body.appendChild(layer);

/**
 * Knob Indicator Component.
 */
export default function KnobIndicator({
  knobPosition,
  domPosition,
  visible
}: Props) {
  const positionPercentage = Math.floor(knobPosition * 100);
  const style = domPosition || {};
  const innerBarStyle = {
    transform: `scaleX(${knobPosition})`
  };

  const className = classNames("knob-indicator", {
    visible: visible
  });

  return ReactDOM.createPortal(
    <div className={className} style={style}>
      <div className="bar">
        <div className="inner-bar" style={innerBarStyle} />
      </div>
      <div className="number">{positionPercentage}</div>
    </div>,
    layer
  );
}
