/**
 * src/components/pathways/MarriedPathway.jsx
 *
 * �CIE�KA "W MA��E�STWIE":
 * - Zadaje pytania dotycz�ce relacji po �lubie.
 * - Po zako�czeniu uruchamia calculateMarried z utils/calculations.js i zwraca wynik przez onResult.
 *
 * Props:
 * - onResult(result)
 * - onBack()
 *
 * Zale�no�ci:
 * - react, QuestionScreen, calculateMarried
 */

import React, { useState } from 'react';
import QuestionScreen from '../QuestionScreen';
import { calculateMarried } from '../../utils/calculations';

const MarriedPathway = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'years', q: 'Ile lat w ma��e�stwie?', opts: ['<1 rok', '1-2 lata', '2-5 lat', '5-10 lat', '10-15 lat', '15+ lat'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, przed �lubem', 'Tak, po �lubie', 'Nie mamy', 'Pr�buj� wprowadzi�'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'W ci��y', 'Tak'] },
    { id: 'quality', q: 'Jako�� ma��e�stwa?', opts: ['�wietne', 'Dobre', 'OK, rutyna', 'Pogarsza si�', '�le', 'Katastrofa'] },
    { id: 'sex', q: '�ycie seksualne?', opts: ['�wietne', 'Dobre', 'Rzadziej', 'Rzadko', 'Prawie nie ma', 'Z obowi�zku'] },
    { id: 'emotional', q: 'Po��czenie emocjonalne?', opts: ['Silne', 'Przeci�tne', 'S�abe', 'Jak wsp�lokatorzy', 'Jak obcy'] },
    { id: 'my_cheat', q: 'Czy ty zdradzi�e�?', opts: ['Nigdy', 'Raz dawno', 'Kilka razy', 'Romans', 'Mam drug� relacj�'] },
    { id: 'her_cheat', q: 'Czy ona zdradza?', opts: ['Nie, ufam', 'Chyba nie', 'Podejrzenia', 'Prawdopodobnie', 'Wiem o jednej', 'Wielokrotnie', 'Ma kochanka'] },
    { id: 'income', q: 'Kto wi�cej zarabia?', opts: ['Tylko ja', 'Ja 3x+', 'Ja 2x', 'Podobnie', 'Ona wi�cej'] },
    { id: 'finance_control', q: 'Kto kontroluje finanse?', opts: ['Ja', 'Wsp�lnie', 'Ona', 'Osobne'] },
    { id: 'property', q: 'G��wne mieszkanie?', opts: ['Moje sprzed', 'Jej sprzed', 'Wsp�lne', 'Kredyt w ma��e�stwie', 'Wynajem'] },
    { id: 'assets', q: 'Inne aktywa?', opts: ['Brak', 'Oszcz�dno�ci', 'Inwestycje', 'Firma', 'Nieruchomo�ci', 'Kilka'] },
    { id: 'conflicts', q: 'Jak cz�sto k��tnie?', opts: ['Rzadko', 'Czasami', 'Cz�sto', 'Bardzo cz�sto', 'Codziennie'] },
    { id: 'her_change', q: 'Zmiana w jej zachowaniu?', opts: ['Nie', 'Na lepsze', 'Na gorsze', 'Dystansowa', 'Wroga'] },
    { id: 'paternity', q: 'Pewno�� ojcostwa? (je�li dzieci)', opts: ['Pewien', 'Prawie pewien', 'W�tpliwo�ci', 'Test - OK', 'Test - nie moje', 'Boj� si�'] }
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
      title="?? W ma��e�stwie"
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