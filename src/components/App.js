// @flow
import React from 'react';
import MonotronContainer from '../containers/Monotron';

/**
 * App Component.
 */
export default function App({ audioContext }: { audioContext: AudioContext }) {
  return (
    <div className="page">
      <div className="background-gradient" />
      <div className="page-content">
        <div className="section section-monotron">
          <MonotronContainer audioContext={audioContext} />
        </div>
      </div>
    </div>
  );
}
