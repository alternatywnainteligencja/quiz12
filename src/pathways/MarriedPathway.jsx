/**
 * src/components/pathways/MarriedPathway.jsx
 *
 * ŒCIE¯KA "W MA£¯EÑSTWIE":
 * - Zadaje pytania dotycz¹ce relacji po œlubie.
 * - Po zakoñczeniu uruchamia calculateMarried z utils/calculations.js i zwraca wynik przez onResult.
 *
 * Props:
 * - onResult(result)
 * - onBack()
 *
 * Zale¿noœci:
 * - react, QuestionScreen, calculateMarried
 */

import React, { useState } from 'react';
import QuestionScreen from '../QuestionScreen';
import { calculateMarried } from '../../utils/calculations';

const MarriedPathway = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'years', q: 'Ile lat w ma³¿eñstwie?', opts: ['<1 rok', '1-2 lata', '2-5 lat', '5-10 lat', '10-15 lat', '15+ lat'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, przed œlubem', 'Tak, po œlubie', 'Nie mamy', 'Próbujê wprowadziæ'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'W ci¹¿y', 'Tak'] },
    { id: 'quality', q: 'Jakoœæ ma³¿eñstwa?', opts: ['Œwietne', 'Dobre', 'OK, rutyna', 'Pogarsza siê', 'le', 'Katastrofa'] },
    { id: 'sex', q: '¯ycie seksualne?', opts: ['Œwietne', 'Dobre', 'Rzadziej', 'Rzadko', 'Prawie nie ma', 'Z obowi¹zku'] },
    { id: 'emotional', q: 'Po³¹czenie emocjonalne?', opts: ['Silne', 'Przeciêtne', 'S³abe', 'Jak wspó³lokatorzy', 'Jak obcy'] },
    { id: 'my_cheat', q: 'Czy ty zdradzi³eœ?', opts: ['Nigdy', 'Raz dawno', 'Kilka razy', 'Romans', 'Mam drug¹ relacjê'] },
    { id: 'her_cheat', q: 'Czy ona zdradza?', opts: ['Nie, ufam', 'Chyba nie', 'Podejrzenia', 'Prawdopodobnie', 'Wiem o jednej', 'Wielokrotnie', 'Ma kochanka'] },
    { id: 'income', q: 'Kto wiêcej zarabia?', opts: ['Tylko ja', 'Ja 3x+', 'Ja 2x', 'Podobnie', 'Ona wiêcej'] },
    { id: 'finance_control', q: 'Kto kontroluje finanse?', opts: ['Ja', 'Wspólnie', 'Ona', 'Osobne'] },
    { id: 'property', q: 'G³ówne mieszkanie?', opts: ['Moje sprzed', 'Jej sprzed', 'Wspólne', 'Kredyt w ma³¿eñstwie', 'Wynajem'] },
    { id: 'assets', q: 'Inne aktywa?', opts: ['Brak', 'Oszczêdnoœci', 'Inwestycje', 'Firma', 'Nieruchomoœci', 'Kilka'] },
    { id: 'conflicts', q: 'Jak czêsto k³ótnie?', opts: ['Rzadko', 'Czasami', 'Czêsto', 'Bardzo czêsto', 'Codziennie'] },
    { id: 'her_change', q: 'Zmiana w jej zachowaniu?', opts: ['Nie', 'Na lepsze', 'Na gorsze', 'Dystansowa', 'Wroga'] },
    { id: 'paternity', q: 'Pewnoœæ ojcostwa? (jeœli dzieci)', opts: ['Pewien', 'Prawie pewien', 'W¹tpliwoœci', 'Test - OK', 'Test - nie moje', 'Bojê siê'] }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const res = calculateMarried(newAnswers);
      onResult(res);
    }
  };

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <QuestionScreen 
      title="?? W ma³¿eñstwie"
      question={q.q}
      options={q.opts}
      onAnswer={handleAnswer}
      onBack={step > 0 ? () => setStep(step - 1) : onBack}
      progress={progress}
      step={step + 1}
      total={questions.length}
      color="green"
    />
  );
};

export default MarriedPathway;