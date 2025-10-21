/**
 * src/components/pathways/DivorcePathway.jsx
 *
 * ŒCIE¯KA "ROZWÓD":
 * - Pytania dotycz¹ce trwaj¹cego procesu rozwodowego.
 * - Na koñcu wywo³uje calculateDivorce z utils/calculations.js i zwraca wynik przez onResult.
 *
 * Props:
 * - onResult(result)
 * - onBack()
 *
 * Zale¿noœci:
 * - react, QuestionScreen, calculateDivorce
 */

import React, { useState } from 'react';
import QuestionScreen from '../QuestionScreen';
import { calculateDivorce } from '../../utils/calculations';

const DivorcePathway = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'who_filed', q: 'Kto z³o¿y³ pozew?', opts: ['Ja', 'Ona', 'Wspólny'] },
    { id: 'duration', q: 'Jak d³ugo trwa?', opts: ['0-2 m-ce', '3-6 m-cy', '6-12 m-cy', 'Rok+', '2+ lata'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'Tak'] },
    { id: 'custody', q: 'Opieka?', opts: ['Dogadani 50/50', 'Dogadani - ona', 'Walczê o 50/50', 'Walczê o pe³n¹', 'Przegrywam', 'Straci³em'] },
    { id: 'kids_pos', q: 'Dzieci chc¹?', opts: ['Ze mn¹', 'Neutralne', 'Z ni¹', 'Przeciwko mnie', 'Za ma³e'] },
    { id: 'alienation', q: 'Nadal alienuje?', opts: ['Nie', 'Subtelnie', 'Aktywnie', 'Ciê¿ko', 'Blokuje kontakt'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, pomaga', 'Tak, kwestionuje', 'Nie'] },
    { id: 'property', q: 'Podzia³ maj¹tku?', opts: ['Dogadani', 'Negocjacje', 'Walka', 'S¹d decyduje', 'Ona ukrywa', 'Ja ukry³em'] },
    { id: 'assets', q: 'Aktywa?', opts: ['Niewiele', 'Dom', 'Oszczêdnoœci', 'Firma', 'Kilka'] },
    { id: 'alimony', q: 'Alimenty na ni¹?', opts: ['Nie', '¯¹da', 'S¹d - niskie', 'S¹d - wysokie', 'Ja ¿¹dam'] },
    { id: 'her_tactics', q: 'Jej taktyki?', opts: ['Fair', 'Przeci¹ga', 'K³amie', 'Wyolbrzymia', 'Fa³szywe oskar¿enia', 'Wszystko'] },
    { id: 'false_acc', q: 'Jakie oskar¿enia?', opts: ['Brak', 'Przemoc fizyczna', 'Przemoc psychiczna', 'Krzywdzenie dzieci', 'Alkohol', 'Kilka'] },
    { id: 'your_lawyer', q: 'Twój prawnik?', opts: ['Wyœmienity', 'Dobry', 'Przeciêtny', 'S³aby', 'Nie mam'] },
    { id: 'her_lawyer', q: 'Jej prawnik?', opts: ['Nie ma', 'S³aby', 'Przeciêtny', 'Dobry', 'Rekin'] },
    { id: 'bias', q: 'Stronniczoœæ s¹du?', opts: ['Nie', 'Lekko', 'WyraŸnie', 'Pro-kobieca'] },
    { id: 'strategy', q: 'Twoja strategia?', opts: ['Polubownie', 'Obrona', 'Atak', 'Wojna totalna'] },
    { id: 'finance', q: 'Wp³yw finansowy?', opts: ['Minimalny', 'Umiarkowany', 'Znacz¹cy', 'Druzgoc¹cy', 'Bankructwo'] },
    { id: 'emotional', q: 'Stan emocjonalny?', opts: ['Dobry', 'Stres ale OK', 'Walczê', 'Depresja', 'Za³amanie'] }
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
      title="?? Rozwód"
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