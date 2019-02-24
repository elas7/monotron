// @flow
import { connect } from "react-redux";
import Knobs from "../components/Knobs";

const mapStateToProps = state => ({
  names: state.knobs.names
});

/**
 * Knobs container component
 */
const KnobsContainer = connect(mapStateToProps)(Knobs);

export default KnobsContainer;
