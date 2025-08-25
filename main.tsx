import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css'; // Ensure global styles are imported

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} 