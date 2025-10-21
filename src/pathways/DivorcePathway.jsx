/**
 * src/components/pathways/DivorcePathway.jsx
 *
 * �CIE�KA "ROZW�D":
 * - Pytania dotycz�ce trwaj�cego procesu rozwodowego.
 * - Na ko�cu wywo�uje calculateDivorce z utils/calculations.js i zwraca wynik przez onResult.
 *
 * Props:
 * - onResult(result)
 * - onBack()
 *
 * Zale�no�ci:
 * - react, QuestionScreen, calculateDivorce
 */

import React, { useState } from 'react';
import QuestionScreen from '../QuestionScreen';
import { calculateDivorce } from '../../utils/calculations';

const DivorcePathway = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'who_filed', q: 'Kto z�o�y� pozew?', opts: ['Ja', 'Ona', 'Wsp�lny'] },
    { id: 'duration', q: 'Jak d�ugo trwa?', opts: ['0-2 m-ce', '3-6 m-cy', '6-12 m-cy', 'Rok+', '2+ lata'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'Tak'] },
    { id: 'custody', q: 'Opieka?', opts: ['Dogadani 50/50', 'Dogadani - ona', 'Walcz� o 50/50', 'Walcz� o pe�n�', 'Przegrywam', 'Straci�em'] },
    { id: 'kids_pos', q: 'Dzieci chc�?', opts: ['Ze mn�', 'Neutralne', 'Z ni�', 'Przeciwko mnie', 'Za ma�e'] },
    { id: 'alienation', q: 'Nadal alienuje?', opts: ['Nie', 'Subtelnie', 'Aktywnie', 'Ci�ko', 'Blokuje kontakt'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, pomaga', 'Tak, kwestionuje', 'Nie'] },
    { id: 'property', q: 'Podzia� maj�tku?', opts: ['Dogadani', 'Negocjacje', 'Walka', 'S�d decyduje', 'Ona ukrywa', 'Ja ukry�em'] },
    { id: 'assets', q: 'Aktywa?', opts: ['Niewiele', 'Dom', 'Oszcz�dno�ci', 'Firma', 'Kilka'] },
    { id: 'alimony', q: 'Alimenty na ni�?', opts: ['Nie', '��da', 'S�d - niskie', 'S�d - wysokie', 'Ja ��dam'] },
    { id: 'her_tactics', q: 'Jej taktyki?', opts: ['Fair', 'Przeci�ga', 'K�amie', 'Wyolbrzymia', 'Fa�szywe oskar�enia', 'Wszystko'] },
    { id: 'false_acc', q: 'Jakie oskar�enia?', opts: ['Brak', 'Przemoc fizyczna', 'Przemoc psychiczna', 'Krzywdzenie dzieci', 'Alkohol', 'Kilka'] },
    { id: 'your_lawyer', q: 'Tw�j prawnik?', opts: ['Wy�mienity', 'Dobry', 'Przeci�tny', 'S�aby', 'Nie mam'] },
    { id: 'her_lawyer', q: 'Jej prawnik?', opts: ['Nie ma', 'S�aby', 'Przeci�tny', 'Dobry', 'Rekin'] },
    { id: 'bias', q: 'Stronniczo�� s�du?', opts: ['Nie', 'Lekko', 'Wyra�nie', 'Pro-kobieca'] },
    { id: 'strategy', q: 'Twoja strategia?', opts: ['Polubownie', 'Obrona', 'Atak', 'Wojna totalna'] },
    { id: 'finance', q: 'Wp�yw finansowy?', opts: ['Minimalny', 'Umiarkowany', 'Znacz�cy', 'Druzgoc�cy', 'Bankructwo'] },
    { id: 'emotional', q: 'Stan emocjonalny?', opts: ['Dobry', 'Stres ale OK', 'Walcz�', 'Depresja', 'Za�amanie'] }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const res = calculateDivorce(newAnswers);
      onResult(res);
    }
  };

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <QuestionScreen 
      title="?? Rozw�d"
      question={q.q}
      options={q.opts}
      onAnswer={handleAnswer}
      onBack={step > 0 ? () => setStep(step - 1) : onBack}
      progress={progress}
      step={step + 1}
      total={questions.length}
      color="red"
    />
  );
};

export default DivorcePathway;