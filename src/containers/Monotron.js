// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { qwertytoMidi } from "../lib/keyboard";
import {
  pointerDownGlobal,
  pointerUpGlobal,
  pointerMoveGlobal
} from "../actions/global";
import { keyUpGlobal, keyDownGlobal } from "../actions/keyboard";
import { getAudioData, isDragging } from "../selectors";
import Monotron from "../components/Monotron";
import MonotronAudio from "../utils/MonotronAudio";
import { getPointerPosition } from "../utils/func";

/**
 * Monotron container component
 */
class MonotronContainer extends Component {
  constructor(props) {
    super(props);

    // Keep track of which keys are down, to avoid repetitive 'keydown' events
    this.qwertyDown = {};

    // Keep track of the pointer move events since the last tick. Maps pointerId to event
    this.lastestPointerMoves = {};

    // true if an animation frame was requested
    this.ticking = false;
  }

  componentDidMount() {
    window.addEventListener("pointerdown", this.pointerDownHandler);
    window.addEventListener("pointerup", this.pointerUpHandler);
    window.addEventListener("pointermove", this.pointerMoveHandler);
    window.addEventListener("touchmove", this.touchMoveHandler, {
      passive: false
    });
    window.addEventListener("pointercancel", this.pointerUpHandler);

    // Track QWERTY events
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);

    this.initAudioGenerator();
  }

  componentDidUpdate() {
    this.initAudioGenerator();

    // Send audio data to the monotron audio generator
    if (this.audioGenerator) {
      this.audioGenerator.update(this.props.audioData);
    }
  }

  componentWillUnmount() {
    // Remove all handlers
    window.removeEventListener("pointerdown", this.pointerDownHandler);
    window.removeEventListener("pointerup", this.pointerUpHandler);
    window.removeEventListener("pointermove", this.pointerMoveHandler);
    window.removeEventListener("touchmove", this.touchMoveHandler);
    window.removeEventListener("pointercancel", this.pointerUpHandler);

    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  }

  initAudioGenerator() {
    if (this.audioGenerator) {
      return;
    }

    // Initialize monotron audio generator
    if (this.props.audioContext) {
      this.audioGenerator = new MonotronAudio(
        this.props.audioContext,
        this.props.audioData
      );
    }
  }

  getPointerEventTarget = (event: Event) => {
    const target = {
      type: null,
      name: null
    };

    const position = getPointerPosition(event);
    const targetElement = document.elementFromPoint(position.x, position.y);

    // get closest parent element (or the element itself) that is a pointer target, if any.
    const pointerTargetElement: ?Element = targetElement.closest(
      '[class^="POINTER_TARGET"]'
    );

    if (pointerTargetElement) {
      const targetClass = pointerTargetElement.getAttribute("class");

      if (targetClass) {
        // DOM elements that are pointer targets have the class POINTER_TARGET-{type}-{name}
        // We use class names because some of the targets are SVG elements, and we can't use
        // data attributes in SVG.
        const targetRegEx = /POINTER_TARGET-(\S+)-(\S+)/;
        const match = targetRegEx.exec(targetClass);
        if (match && match.length) {
          target.type = match[1];
          target.name = match[2];
        }
      }
    }

    return target;
  };

  qwertyDown: { [keyCode: number]: ?true };
  audioGenerator: MonotronAudio;

  processPointerMoveEvents = () => {
    Object.keys(this.lastestPointerMoves).forEach(pointerId => {
      const event = this.lastestPointerMoves[pointerId];

      const target = this.getPointerEventTarget(event);
      this.props.onPointerMoveGlobal(target, event);
    });

    // reset the tick so we can capture the next event
    this.ticking = false;
    this.lastestPointerMoves = {};
  };

  pointerDownHandler = event => {
    const target = this.getPointerEventTarget(event);

    this.props.onPointerDownGlobal(target, event);
  };

  pointerUpHandler = event => {
    // prevent mouse event to fire after touch event
    event.preventDefault();

    // make sure 'pointer move' for this pointer is not handled at the next tick
    // because the pointer is now up.
    if (this.ticking) {
      const pointerId = event.pointerId;
      delete this.lastestPointerMoves[pointerId];
    }

    this.props.onPointerUpGlobal(event);
  };

  pointerMoveHandler = event => {
    // ignore event if the pointer is not down
    const pointerId = event.pointerId;
    const isMouseUp = event.pointerType === "mouse" && event.buttons === 0;
    const isPointerDown = !isMouseUp;
    if (isPointerDown) {
      // store latest pointer move for the pointer id
      this.lastestPointerMoves[pointerId] = event;

      // request animation frame if not requested already
      if (!this.ticking) {
        requestAnimationFrame(this.processPointerMoveEvents);
        this.ticking = true;
      }
    }
  };

  touchMoveHandler = event => {
    // If dragging, prevent default to disable scrolling in mobile.
    //
    // This is a hack. Normally we would only be using pointer events, but pointer
    // events don't allow to programmatically change touch-action behaviour when a
    // pointer action already started, so we have to use the touch event here.
    if (this.props.dragging) {
      event.preventDefault();
    }
  };

  keyDownHandler = e => {
    const keyCode = e.keyCode;
    if (this.qwertyDown[keyCode] == null) {
      // first press
      const midiValue = qwertytoMidi(keyCode);
      if (midiValue) {
        this.props.onKeyDownGlobal(midiValue);
        this.qwertyDown[keyCode] = true;
      }
    }
  };

  keyUpHandler = e => {
    const keyCode = e.keyCode;
    const midiValue = qwertytoMidi(keyCode);
    if (midiValue) {
      this.props.onKeyUpGlobal(midiValue);
      this.qwertyDown[keyCode] = null;
    }
  };

  render() {
    const { dragging } = this.props;

    return <Monotron dragging={dragging} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  dragging: isDragging(state),
  audioData: getAudioData(state),
  audioContext: ownProps.audioContext
});

const mapDispatchToProps = dispatch => ({
  onPointerDownGlobal: (target, event) => {
    dispatch(pointerDownGlobal(target, event));
  },
  onPointerUpGlobal: event => {
    dispatch(pointerUpGlobal(event));
  },
  onPointerMoveGlobal: (target, event) => {
    dispatch(pointerMoveGlobal(target, event));
  },
  onKeyDownGlobal: midiValue => {
    dispatch(keyDownGlobal(midiValue));
  },
  onKeyUpGlobal: midiValue => {
    dispatch(keyUpGlobal(midiValue));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonotronContainer);
