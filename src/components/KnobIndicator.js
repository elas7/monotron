// @flow
import React, { Component } from 'react';
import RenderToLayer from 'material-ui/internal/RenderToLayer';
import classNames from 'classnames';

/**
 * Knob Indicator Component.
 */
export default class KnobIndicator extends Component {
  renderKnobIndicator() {
    const { knobPosition, domPosition, visible } = this.props;

    const positionPercentage = Math.floor(knobPosition * 100);
    const style = domPosition || {};
    const innerBarStyle = {
      transform: `scaleX(${knobPosition})`,
    };

    const className = classNames('knob-indicator', {
      visible: visible,
    });

    return (
      <div className={className} style={style}>
        <div className="bar">
          <div className="inner-bar" style={innerBarStyle} />
        </div>
        <div className="number">{positionPercentage}</div>
      </div>
    );
  }

  render() {
    return <RenderToLayer open useLayerForClickAway={false} render={() => this.renderKnobIndicator()} />;
  }
}
