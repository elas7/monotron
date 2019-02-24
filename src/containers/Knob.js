// @flow
import { connect } from "react-redux";
import Knob from "../components/Knob";

const makeMapStateToProps = (initialState, initialProps) => {
  const { name } = initialProps;

  const mapStateToProps = state => {
    const knob = state.knobs.byName[name];

    return {
      name: name,
      position: knob.position
    };
  };
  return mapStateToProps;
};

/**
 * Knob container component
 */
const KnobContainer = connect(makeMapStateToProps)(Knob);

export default KnobContainer;
