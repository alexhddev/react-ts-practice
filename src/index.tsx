import React from 'react';
import ReactDOM from 'react-dom/client';
import App2 from './components/App2';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
///  <React.StrictMode> // causes double rendering calls!
    <App2 />
//  </React.StrictMode>
);
