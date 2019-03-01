// @flow
import React from "react";
import classNames from "classnames";

import { convertRange } from "../utils/func";
import { rangeMax, rangeMin, angleMax, angleMin, knobNames } from "../lib/knob";

type Props = {
  name: string,
  position: number
};

const knobStaticComponents = {
  // 'outside' is the transparent rect covering the knob area
  // 'inside' is the actual rotating knob
  knobOsc1: {
    outside: React.memo(function Outside() {
      return (
        <rect
          x="150"
          y="350"
          fill="#2C2C2E"
          width="60"
          height="90"
          fillOpacity="0"
        />
      );
    }),
    inside: React.memo(function Inside() {
      return (
        <>
          <circle
            fill="#FFFFFF"
            stroke="#414042"
            strokeWidth="1"
            strokeMiterlimit="10"
            cx="180.2"
            cy="393.7"
            r="14.1"
          />
          <circle
            fill="#414042"
            stroke="#414042"
            strokeMiterlimit="10"
            cx="180.2"
            cy="393.7"
            r="12.7"
          />
          <path
            fill="#FFFFFF"
            stroke="#414042"
            strokeWidth="0.5"
            strokeMiterlimit="10"
            d="M182.6,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H182.6z"
          />
        </>
      );
    })
  },
  knobOsc2: {
    outside: React.memo(function Outside() {
      return (
        <rect
          x="318"
          y="350"
          fill="#2C2C2E"
          width="60"
          height="90"
          fillOpacity="0"
        />
      );
    }),
    inside: React.memo(function Inside() {
      return (
        <>
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
        </>
      );
    })
  },
  knobCutoff: {
    outside: React.memo(function Outside() {
      return (
        <rect
          x="402"
          y="350"
          fill="#2C2C2E"
          width="60"
          height="90"
          fillOpacity="0"
        />
      );
    }),
    inside: React.memo(function Inside() {
      return (
        <>
          <circle
            fill="#FFFFFF"
            stroke="#414042"
            strokeWidth="1"
            strokeMiterlimit="10"
            cx="431.6"
            cy="393.7"
            r="14.1"
          />
          <circle
            fill="#414042"
            stroke="#414042"
            strokeMiterlimit="10"
            cx="431.6"
            cy="393.7"
            r="12.7"
          />
          <path
            fill="#FFFFFF"
            stroke="#414042"
            strokeWidth="0.5"
            strokeMiterlimit="10"
            d="M433.9,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H433.9z"
          />
        </>
      );
    })
  },
  knobPeak: {
    outside: React.memo(function Outside() {
      return (
        <rect
          x="485"
          y="350"
          fill="#2C2C2E"
          width="60"
          height="90"
          fillOpacity="0"
        />
      );
    }),
    inside: React.memo(function Inside() {
      return (
        <>
          <circle
            fill="#FFFFFF"
            stroke="#414042"
            strokeWidth="1"
            strokeMiterlimit="10"
            cx="514.3"
            cy="393.7"
            r="14.1"
          />
          <circle
            fill="#414042"
            stroke="#414042"
            strokeMiterlimit="10"
            cx="514.3"
            cy="393.7"
            r="12.7"
          />
          <path
            fill="#FFFFFF"
            stroke="#414042"
            strokeWidth="0.5"
            strokeMiterlimit="10"
            d="M516.6,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H516.6z"
          />
        </>
      );
    })
  },
  knobXmod: {
    outside: React.memo(function Outside() {
      return (
        <rect
          x="234"
          y="350"
          fill="#2C2C2E"
          width="60"
          height="90"
          fillOpacity="0"
        />
      );
    }),
    inside: React.memo(function Inside() {
      return (
        <>
          <circle
            fill="#FFFFFF"
            stroke="#414042"
            strokeWidth="1"
            strokeMiterlimit="10"
            cx="264"
            cy="393.7"
            r="14.1"
          />
          <circle
            fill="#414042"
            stroke="#414042"
            strokeMiterlimit="10"
            cx="264"
            cy="393.7"
            r="12.7"
          />
          <path
            fill="#FFFFFF"
            stroke="#414042"
            strokeWidth="0.5"
            strokeMiterlimit="10"
            d="M266.4,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H266.4z"
          />
        </>
      );
    })
  }
};

const getKnobFactories = () => {
  const getTargetClassName = name => `POINTER_TARGET-knob-${name}`;
  const getKnobClassName = name => classNames(`knob-${name}`, "knob", name);
  const getStyle = dialAngle => ({
    transform: `rotate(${dialAngle}rad)`
  });

  return knobNames.reduce((factories, knobName) => {
    const staticComponents = knobStaticComponents[knobName];
    const Outside = staticComponents.outside;
    const Inside = staticComponents.inside;

    const targetClassName = getTargetClassName(knobName);
    const knobClassName = getKnobClassName(knobName);

    factories[knobName] = dialAngle => {
      return (
        <g className={targetClassName}>
          <Outside />
          <g className={knobClassName} style={getStyle(dialAngle)}>
            <Inside />
          </g>
        </g>
      );
    };

    return factories;
  }, {});
};

const knobFactories = getKnobFactories();

/**
 * Knob Component.
 */
export default function Knob({ name, position }: Props) {
  // Get the amount in radians that the knob needs to be moved from the center
  // so that the position is the correct one.
  const dialAngle = convertRange(
    rangeMin,
    rangeMax,
    angleMin,
    angleMax,
    position
  );

  const KnobFactory = knobFactories[name];
  return KnobFactory(dialAngle);
}
