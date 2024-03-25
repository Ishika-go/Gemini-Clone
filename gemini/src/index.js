import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextProvider from './context/Contex';

const root = createRoot(document.getElementById('root'));

root.render(
  
    <ContextProvider>
      <App />
    </ContextProvider>
  
);

reportWebVitals();
