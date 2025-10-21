/**
 * src/index.js
 *
 * G£ÓWNY PLIK WEJŒCIOWY Create React App:
 * - Renderuje <App /> do DOM.
 * - Tutaj mo¿esz do³¹czyæ globalne style (index.css) lub CSS od Tailwind je¿eli u¿ywasz Tailwind.
 *
 * Wymagania:
 * - Projekt utworzony przez Create React App (react-scripts).
 * - Je¿eli u¿ywasz Tailwind — upewnij siê, ¿e index.css importuje Tailwind (postcss config itd).
 *
 * Jak uruchomiæ:
 * - npm start
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // globalne style — dostosuj (Tailwind lub zwyk³y CSS)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);