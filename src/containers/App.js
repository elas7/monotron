// @flow
import React, { Component } from "react";
import PEP from "pepjs"; // eslint-disable-line no-unused-vars

import "../scss/main.scss";
import App from "../components/App";

/**
 * App container component
 */
export default class AppContainer extends Component {
  componentWillMount() {
    // Create audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    this.audioContext = new AudioContext();
  }

  audioContext: AudioContext;

  render() {
    return <App audioContext={this.audioContext} />;
  }
}
