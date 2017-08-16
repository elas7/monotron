// @flow
import { connect } from 'react-redux';
import KnobIndicators from '../components/KnobIndicators';

const mapStateToProps = state => ({
  knobNames: state.knobs.names,
});

/**
 * Knobs indicators container component
 */
const KnobIndicatorsContainer = connect(mapStateToProps)(KnobIndicators);

export default KnobIndicatorsContainer;
