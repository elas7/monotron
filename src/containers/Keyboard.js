// @flow
import { connect } from "react-redux";
import { Keyboard } from "../components/Keyboard";

const mapStateToProps = state => ({
  keysDown: state.keyboard.keysDown.ordered
});

/**
 * Keyboard container component
 */
const KeyboardContainer = connect(mapStateToProps)(Keyboard);

export default KeyboardContainer;
