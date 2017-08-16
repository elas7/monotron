// @flow
import { connect } from 'react-redux';
import Toggle from '../components/Toggle';

const makeMapStateToProps = (initialState, initialProps) => {
  const { name } = initialProps;

  const mapStateToProps = state => {
    const toggle = state.toggles[name];

    return {
      name: name,
      position: toggle.position,
    };
  };
  return mapStateToProps;
};

/**
 * Toggle container component
 */
const ToggleContainer = connect(makeMapStateToProps)(Toggle);

export default ToggleContainer;
