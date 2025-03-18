/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import ResponsiveColumns from '../ResponsiveColumns';
import Masonry from '../Masonry';

function Demo() {
  const columns = 7;
  const heights = useRef(
    new Array(columns).fill().map(
      () => Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    ),
  );

  return (
    <ResponsiveColumns>
      <Masonry>
        {
          [...Array(columns).keys()].map(
            (idx) => (
              <div key={idx} style={{ backgroundColor: 'red', height: heights.current[idx] }}>
                <span>{idx}</span>
                <br />
                <span>{heights.current[idx]}</span>
              </div>
            ),
          )
        }
      </Masonry>
    </ResponsiveColumns>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root'),
);

root.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
);
