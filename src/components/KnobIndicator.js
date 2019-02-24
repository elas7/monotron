// @flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

/**
 * Knob Indicator Component.
 */
export default class KnobIndicator extends Component {
  render() {
    const { knobPosition, domPosition, visible } = this.props;

    const positionPercentage = Math.floor(knobPosition * 100);
    const style = domPosition || {};
    const innerBarStyle = {
      transform: `scaleX(${knobPosition})`
    };

    const className = classNames("knob-indicator", {
      visible: visible
    });

    if (!this.layer) {
      this.layer = document.createElement("div");
      document.body.appendChild(this.layer);
    }

    return ReactDOM.createPortal(
      <div className={className} style={style}>
        <div className="bar">
          <div className="inner-bar" style={innerBarStyle} />
        </div>
        <div className="number">{positionPercentage}</div>
      </div>,
      this.layer
    );
  }
}
