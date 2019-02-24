// @flow
import React from "react";
import classNames from "classnames";
import MonotronStatic from "./MonotronStatic";
import ToggleContainer from "../containers/Toggle";
import KnobsContainer from "../containers/Knobs";
import KeyboardContainer from "../containers/Keyboard";
import KnobIndicatorsContainer from "../containers/KnobIndicators";

/**
 * Monotron Component.
 */
function Monotron({ dragging }: { dragging: boolean }) {
  const divClassName = classNames("monotron", {
    dragging
  });

  return (
    <div touch-action="pan-y" className={divClassName}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xlinkHref="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 215.5 609.9 359"
        enableBackground="new 0 215.5 609.9 359"
        xmlSpace="preserve"
      >
        <MonotronStatic />

        <ToggleContainer name="toggleOsc2" />

        <KnobsContainer />
        <KeyboardContainer />
      </svg>
      <KnobIndicatorsContainer />
    </div>
  );
}

export default React.memo(Monotron);
