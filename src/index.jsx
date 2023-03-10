import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Removed <React.StrictMode> because it was causing multiple renders after a successful checkout creating 2 postcards
  <div>
    <App />
  </div>
);