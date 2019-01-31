// @flow
import React from "react";
import MonotronContainer from "../containers/Monotron";
import GithubCorner from "react-github-corner";

/**
 * App Component.
 */
export default function App({ audioContext }: { audioContext: AudioContext }) {
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
