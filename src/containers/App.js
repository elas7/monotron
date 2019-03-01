// @flow
import React, { useState, useEffect } from "react";
import PEP from "pepjs"; // eslint-disable-line no-unused-vars

import "../scss/main.scss";
import GithubCorner from "react-github-corner";
import MonotronContainer from "./Monotron";

const useAudioContext = () => {
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    setAudioContext(new window.AudioContext());
  }, []);

  return audioContext;
};

/**
 * App container component
 */
export default function App() {
  const audioContext = useAudioContext();

  return (
    <div className="page">
      <div className="background-gradient" />
      <div className="page-content">
        <GithubCorner
          href="https://github.com/elas7/monotron"
          bannerColor="#000"
          octoColor="#fff"
          svgStyle={{ mixBlendMode: "darken" }}
        />
        <div className="section section-monotron">
          <MonotronContainer audioContext={audioContext} />
        </div>
      </div>
    </div>
  );
}
