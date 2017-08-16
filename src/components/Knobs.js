// @flow
import React, { Component } from 'react';
import KnobContainer from '../containers/Knob';

/**
 * Knobs Component.
 */
export default class Knobs extends Component {
  render() {
    const { names } = this.props;

    return (
      <g className="knobs">
        {names.map(name => <KnobContainer key={name} name={name} />)}
      </g>
    );
  }
}
