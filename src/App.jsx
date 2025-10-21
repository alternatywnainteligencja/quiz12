/**
 * src/App.jsx
 *
 * G��WNY KOMPONENT APLIKACJI:
 * - �aduje komponent MarriageQuiz (g��wny quiz/flow).
 * - Mo�e by� miejsce do dodawania nawigacji, headera, layoutu itd.
 *
 * Uwagi:
 * - Importuje komponent z 'src/components/MarriageQuiz.jsx'.
 * - Upewnij si�, �e masz zainstalowane 'lucide-react' (u�ywane w komponentach).
 */

import React from 'react';
import MarriageQuiz from './components/MarriageQuiz';

const App = () => {
  return (
    <div className="App">
      {/* Mo�esz tu doda� header, footer, czy wrapper layoutowy */}
      <MarriageQuiz />
    </div>
  );
};

export default App;