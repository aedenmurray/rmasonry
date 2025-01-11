/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';

import ResponsiveColumns from './ResponsiveColumns';
import Masonry from './Masonry';

function Demo() {
  const columns = 5;
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
            (index) => (
              <div key={index} style={{ backgroundColor: 'red', height: heights.current[index] }}>
                <span>{heights.current[index]}</span>
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
