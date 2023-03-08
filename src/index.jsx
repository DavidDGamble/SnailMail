import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Removed <React.StrictMode> because it was causing multiple renders after a successful checkout creating 2 postcards
  <>
    <App />
  </>
);