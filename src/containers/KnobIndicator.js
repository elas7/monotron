// @flow
import { connect } from "react-redux";
import KnobIndicator from "../components/KnobIndicator";

const mapStateToProps = (state, ownProps) => {
  const knobName = ownProps.knobName;
  const knob = state.knobs.byName[knobName];
  const isIndicatorVisible = knob.dragging;

  return {
    knobPosition: knob.position,
    domPosition: ownProps.domPosition,
    visible: isIndicatorVisible
  };
};

/**
 * Knob indicator container component
 */
const KnobIndicatorContainer = connect(mapStateToProps)(KnobIndicator);

export default KnobIndicatorContainer;
