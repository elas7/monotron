// @flow
import React, { Component } from "react";
import KnobIndicatorContainer from "../containers/KnobIndicator";

/**
 * Knob Indicators Component.
 */
export default class KnobIndicators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      knobPositions: {}
    };
  }

  componentDidMount() {
    this.updateKnobPositions();

    // In development, the DOM renders before the styles are loaded.
    // This makes sure the initial DOM positions are calculated after
    // all styles are loaded.
    if (process.env.NODE_ENV !== "production") {
      window.addEventListener("load", this.updateKnobPositions);
    }

    window.addEventListener("resize", this.updateKnobPositions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateKnobPositions);
  }

  updateKnobPositions = () => {
    const knobNames = this.props.knobNames;
    const knobPositions = knobNames.reduce((accumulator, knobName) => {
      let positions = null;
      const className = `POINTER_TARGET-knob-${knobName}`;
      const DOMElement = document.querySelector(`[class^="${className}"]`);
      if (DOMElement) {
        const rect = DOMElement.getBoundingClientRect();

        positions = {
          top: rect.top + window.scrollY,
          left: rect.left,
          width: rect.right - rect.left
        };
      }

      accumulator[knobName] = positions;
      return accumulator;
    }, {});

    this.setState({ knobPositions: knobPositions });
  };

  render() {
    const { knobNames } = this.props;

    return (
      <div className="knob-indicators">
        {knobNames.map(knobName => (
          <KnobIndicatorContainer
            knobName={knobName}
            domPosition={this.state.knobPositions[knobName]}
            key={knobName}
          />
        ))}
      </div>
    );
  }
}
