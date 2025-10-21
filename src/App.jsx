/**
 * src/App.jsx
 *
 * G£ÓWNY KOMPONENT APLIKACJI:
 * - £aduje komponent MarriageQuiz (g³ówny quiz/flow).
 * - Mo¿e byæ miejsce do dodawania nawigacji, headera, layoutu itd.
 *
 * Uwagi:
 * - Importuje komponent z 'src/components/MarriageQuiz.jsx'.
 * - Upewnij siê, ¿e masz zainstalowane 'lucide-react' (u¿ywane w komponentach).
 */

import React from 'react';
import MarriageQuiz from './components/MarriageQuiz';

const App = () => {
  return (
    <div className="App">
      {/* Mo¿esz tu dodaæ header, footer, czy wrapper layoutowy */}
      <MarriageQuiz />
    </div>
  );
};

export default App;