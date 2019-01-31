// @flow
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import classNames from 'classnames';

import { convertRange } from '../utils/func';
import { rangeMax, rangeMin, angleMax, angleMin } from '../lib/knob';

/**
 * Knob Component.
 */
export default class Knob extends Component {
  render() {
    const { name, position } = this.props;

    const targetClassName = `POINTER_TARGET-knob-${name}`;
    const knobClassName = classNames(`knob-${name}`, 'knob', name);

    // Get the amount in radians that the knob needs to be moved from the center
    // so that the position is the correct one.
    const dialAngle = convertRange(rangeMin, rangeMax, angleMin, angleMax, position);

    const style = {
      transform: `rotate(${dialAngle}rad)`,
    };

    const knobs = {
      knobOsc1: (
        <g className={targetClassName}>
          {/* transparent rect covering the knob area */}
          <rect x="150" y="350" fill="#2C2C2E" width="60" height="90" fillOpacity="0" />

          {/* rotating knob */}
          <g className={knobClassName} style={style}>
            <circle
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="1"
              strokeMiterlimit="10"
              cx="180.2"
              cy="393.7"
              r="14.1"
            />
            <circle fill="#414042" stroke="#414042" strokeMiterlimit="10" cx="180.2" cy="393.7" r="12.7" />
            <path
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              d="M182.6,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H182.6z"
            />
          </g>
        </g>
      ),
      knobOsc2: (
        <g className={targetClassName}>
          {/* transparent rect covering the knob area */}
          <rect x="318" y="350" fill="#2C2C2E" width="60" height="90" fillOpacity="0" />

          {/* rotating knob */}
          <g className={knobClassName} style={style}>
            <circle
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="1"
              strokeMiterlimit="10"
              cx="347.5"
              cy="393.7"
              r="14.1"
            />
            <circle fill="#EC7C76" cx="347.5" cy="393.7" r="12.7" />
            <path
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              d="M349.9,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H349.9z"
            />
          </g>
        </g>
      ),
      knobCutoff: (
        <g className={targetClassName}>
          {/* transparent rect covering the knob area */}
          <rect x="402" y="350" fill="#2C2C2E" width="60" height="90" fillOpacity="0" />

          {/* rotating knob */}
          <g className={knobClassName} style={style}>
            <circle
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="1"
              strokeMiterlimit="10"
              cx="431.6"
              cy="393.7"
              r="14.1"
            />
            <circle fill="#414042" stroke="#414042" strokeMiterlimit="10" cx="431.6" cy="393.7" r="12.7" />
            <path
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              d="M433.9,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H433.9z"
            />
          </g>
        </g>
      ),
      knobPeak: (
        <g className={targetClassName}>
          {/* transparent rect covering the knob area */}
          <rect x="485" y="350" fill="#2C2C2E" width="60" height="90" fillOpacity="0" />

          {/* rotating knob */}
          <g className={knobClassName} style={style}>
            <circle
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="1"
              strokeMiterlimit="10"
              cx="514.3"
              cy="393.7"
              r="14.1"
            />
            <circle fill="#414042" stroke="#414042" strokeMiterlimit="10" cx="514.3" cy="393.7" r="12.7" />
            <path
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              d="M516.6,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H516.6z"
            />
          </g>
        </g>
      ),
      knobXmod: (
        <g className={targetClassName}>
          {/* transparent rect covering the knob area */}
          <rect x="234" y="350" fill="#2C2C2E" width="60" height="90" fillOpacity="0" />

          {/* rotating knob */}
          <g className={knobClassName} style={style}>
            <circle
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="1"
              strokeMiterlimit="10"
              cx="264"
              cy="393.7"
              r="14.1"
            />
            <circle fill="#414042" stroke="#414042" strokeMiterlimit="10" cx="264" cy="393.7" r="12.7" />
            <path
              fill="#FFFFFF"
              stroke="#414042"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              d="M266.4,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H266.4z"
            />
            b{' '}
          </g>
        </g>
      ),
    };

    return knobs[name];
  }
}

Knob.propTypes = {
  name: PropTypes.string.isRequired,
};
