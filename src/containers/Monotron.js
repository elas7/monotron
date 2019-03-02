// @flow
import React, { useRef, useEffect } from "react";
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
 * Initializes an AudioGenerator and updates it after every render
 */
const useAudioGenerator = (audioContext, audioData) => {
  const audioGenerator = useRef(null);

  useEffect(() => {
    const initAudioGenerator = () => {
      if (audioGenerator.current) {
        return;
      }

      // Initialize monotron audio generator
      if (audioContext) {
        audioGenerator.current = new MonotronAudio(audioContext, audioData);
      }
    };

    initAudioGenerator();

    // Send audio data to the monotron audio generator
    if (audioGenerator.current) {
      audioGenerator.current.update(audioData);
    }
  });
};

/**
 * Keep track of keyboard events
 */
const useKeyboard = (onKeyDownGlobal, onKeyUpGlobal) => {
  useEffect(() => {
    // Keep track of which keys are down, to avoid repetitive 'keydown' events
    const qwertyDown = {};

    const keyDownHandler = e => {
      const keyCode = e.keyCode;
      if (!qwertyDown[keyCode]) {
        // first press
        const midiValue = qwertytoMidi(keyCode);
        if (midiValue) {
          onKeyDownGlobal(midiValue);
          qwertyDown[keyCode] = true;
        }
      }
    };

    const keyUpHandler = e => {
      const keyCode = e.keyCode;
      const midiValue = qwertytoMidi(keyCode);
      if (midiValue) {
        onKeyUpGlobal(midiValue);
        delete qwertyDown[keyCode];
      }
    };

    // Track QWERTY events
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      // remove handlers
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);
};

/**
 * Keep track of pointer events
 */
const usePointers = (
  dragging,
  onPointerDownGlobal,
  onPointerUpGlobal,
  onPointerMoveGlobal
) => {
  // put dragging in a ref, so that it can be used from 'touchMoveHandler'
  const draggingRef = useRef(dragging);
  useEffect(() => {
    draggingRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    const touchMoveHandler = event => {
      // If dragging, prevent default to disable scrolling in mobile.
      //
      // This is a hack. Normally we would only be using pointer events, but pointer
      // events don't allow to programmatically change touch-action behaviour when a
      // pointer action already started, so we have to use the touch event here.
      if (draggingRef.current) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchmove", touchMoveHandler, {
      passive: false
    });

    return () => {
      window.removeEventListener("touchmove", touchMoveHandler);
    };
  }, []);

  // Keep track of the pointer move events since the last tick. Maps pointerId to event
  const latestPointerMoves = useRef({});

  // true if an animation frame was requested
  const ticking = useRef(false);

  useEffect(() => {
    const getPointerEventTarget = (event: Event) => {
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

    const processPointerMoveEvents = () => {
      Object.keys(latestPointerMoves.current).forEach(pointerId => {
        const event = latestPointerMoves.current[pointerId];

        const target = getPointerEventTarget(event);
        onPointerMoveGlobal(target, event);
      });

      // reset the tick so we can capture the next event
      ticking.current = false;
      latestPointerMoves.current = {};
    };

    const pointerDownHandler = event => {
      const target = getPointerEventTarget(event);

      onPointerDownGlobal(target, event);
    };

    const pointerUpHandler = event => {
      // prevent mouse event to fire after touch event
      event.preventDefault();

      // make sure 'pointer move' for this pointer is not handled at the next tick
      // because the pointer is now up.
      if (ticking.current) {
        const pointerId = event.pointerId;
        delete latestPointerMoves.current[pointerId];
      }

      onPointerUpGlobal(event);
    };

    const pointerMoveHandler = event => {
      // ignore event if the pointer is not down
      const isMouseUp = event.pointerType === "mouse" && event.buttons === 0;
      const isPointerDown = !isMouseUp;
      if (isPointerDown) {
        const pointerId = event.pointerId;

        // store latest pointer move for the pointer id
        latestPointerMoves.current[pointerId] = event;

        // request animation frame if not requested already
        if (!ticking.current) {
          requestAnimationFrame(processPointerMoveEvents);
          ticking.current = true;
        }
      }
    };

    window.addEventListener("pointerdown", pointerDownHandler);
    window.addEventListener("pointerup", pointerUpHandler);
    window.addEventListener("pointermove", pointerMoveHandler);
    window.addEventListener("pointercancel", pointerUpHandler);
    return () => {
      // Remove all handlers
      window.removeEventListener("pointerdown", pointerDownHandler);
      window.removeEventListener("pointerup", pointerUpHandler);
      window.removeEventListener("pointermove", pointerMoveHandler);
      window.removeEventListener("pointercancel", pointerUpHandler);
    };
  }, []);
};

/**
 * Monotron container component
 */
function MonotronContainer({
  dragging,
  audioData,
  audioContext,
  onPointerDownGlobal,
  onPointerUpGlobal,
  onPointerMoveGlobal,
  onKeyDownGlobal,
  onKeyUpGlobal
}) {
  useAudioGenerator(audioContext, audioData);
  useKeyboard(onKeyDownGlobal, onKeyUpGlobal);
  usePointers(
    dragging,
    onPointerDownGlobal,
    onPointerUpGlobal,
    onPointerMoveGlobal
  );

  return <Monotron dragging={dragging} />;
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
