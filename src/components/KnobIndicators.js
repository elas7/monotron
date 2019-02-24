// @flow
import React, { useState, useLayoutEffect } from "react";
import KnobIndicatorContainer from "../containers/KnobIndicator";
import type { KnobPosition } from "../types";

function useKnobPositions(
  knobNames: string[]
): { [knobName: string]: KnobPosition } {
  const getKnobPositions = () => {
    return knobNames.reduce((accumulator, knobName) => {
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
  };

  const [knobPositions, setKnobPositions] = useState({});

  useLayoutEffect(() => {
    const handleNewPositions = () => {
      setKnobPositions(getKnobPositions());
    };

    handleNewPositions();

    // In development, the DOM renders before the styles are loaded.
    // This makes sure the initial DOM positions are calculated after
    // all styles are loaded.
    if (process.env.NODE_ENV !== "production") {
      window.addEventListener("load", handleNewPositions);
    }

    window.addEventListener("resize", handleNewPositions);

    return () => {
      window.removeEventListener("resize", handleNewPositions);
    };
  }, []);

  return knobPositions;
}

/**
 * Knob Indicators Component.
 */
export default function KnobIndicators({ knobNames }) {
  const knobPositions = useKnobPositions(knobNames);

  return (
    <div className="knob-indicators">
      {knobNames.map(knobName => (
        <KnobIndicatorContainer
          knobName={knobName}
          domPosition={knobPositions[knobName]}
          key={knobName}
        />
      ))}
    </div>
  );
}
