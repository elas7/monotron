// @flow
import React, { Component } from 'react';
import KnobIndicatorContainer from '../containers/KnobIndicator';

/**
 * Knob Indicators Component.
 */
export default class KnobIndicators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      knobPositions: {},
    };
  }

  componentDidMount() {
    this.updateKnobPositions();

    window.addEventListener('resize', this.updateKnobPositions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateKnobPositions);
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
          width: rect.right - rect.left,
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
          <KnobIndicatorContainer knobName={knobName} domPosition={this.state.knobPositions[knobName]} key={knobName} />
        ))}
      </div>
    );
  }
}
