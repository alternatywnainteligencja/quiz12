/**
 * src/components/pathways/CrisisPathway.jsx
 *
 * ŒCIE¯KA "KRYZYS":
 * - Seria pytañ dotycz¹cych trwaj¹cego kryzysu i zagro¿eñ.
 * - Po zakoñczeniu korzysta z calculateCrisis z utils/calculations.js i zwraca wynik przez onResult.
 *
 * Props:
 * - onResult(result)
 * - onBack()
 *
 * Zale¿noœci:
 * - react, QuestionScreen, calculateCrisis
 */

import React, { useState } from 'react';
import QuestionScreen from '../QuestionScreen';
import { calculateCrisis } from '../../utils/calculations';

const CrisisPathway = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'duration', q: 'Jak d³ugo trwa kryzys?', opts: ['1-3 miesi¹ce', '3-6 miesiêcy', '6-12 miesiêcy', 'Ponad rok', 'Kilka lat', 'Od pocz¹tku'] },
    { id: 'who_wants', q: 'Kto chce rozwodu?', opts: ['Ja', 'Ona', 'Oboje', 'Ja, ale jej nie mówi³em', 'Nikt jeszcze'] },
    { id: 'she_knows', q: 'Ona wie o rozwodzie?', opts: ['Tak, zgadza siê', 'Tak, walczy', 'Tak, grozi', 'Podejrzewa', 'Nie wie'] },
    { id: 'threats', q: 'Czym grozi?', opts: ['Nie grozi', 'Dzieæmi', 'Pieniêdzmi', 'Reputacj¹', 'Fa³szywymi oskar¿eniami', 'Przemoc¹', 'Wszystkim'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, dobra', 'Tak, s³aba', 'Nie mamy', 'Próbujê (bez szans)'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'Tak'] },
    { id: 'alienation', q: 'Alienacja dzieci?', opts: ['Nie', 'Zaczyna', 'Subtelnie', 'Aktywnie', 'Utrudnia kontakt', 'Odwróci³y siê'] },
    { id: 'prep_finance', q: 'Przygotowanie finansowe?', opts: ['Nic', 'Dokumenty', 'Prawnik', 'Przerzucam $', 'Ukrywam aktywa', 'Pe³ne'] },
    { id: 'evidence', q: 'Zbierasz dowody?', opts: ['Nie', 'Czasami', 'Regularnie', 'System nagrañ', 'Wszystko'] },
    { id: 'her_behavior', q: 'Jej zachowanie?', opts: ['Ch³odna', 'Z³a', 'Manipulacyjna', 'Wroga', 'Przemoc', 'Udaje ¿e OK'] },
    { id: 'her_prep', q: 'Ona siê przygotowuje?', opts: ['Nie wiem', 'Chyba nie', 'Prawdopodobnie', 'Na pewno', 'Ma prawnika'] },
    { id: 'income', q: 'Dochody?', opts: ['Tylko ja', 'Ja znacznie wiêcej', 'Ja wiêcej', 'Podobnie', 'Ona wiêcej'] },
    { id: 'main_asset', q: 'G³ówny maj¹tek?', opts: ['Brak', 'Dom - mój przed', 'Dom - jej przed', 'Dom wspólny', 'Firma', 'Kilka'] },
    { id: 'access', q: 'Jej dostêp do $?', opts: ['Pe³ny', 'Wspólne konta', 'Ograniczony', 'Nie ma'] },
    { id: 'tactics', q: 'Brudna walka - gotowy?', opts: ['Nie, fair play', 'Jeœli ona zacznie', 'Tak', 'Ju¿ stosujê'] },
    { id: 'support', q: 'Wsparcie?', opts: ['Silne', 'Kilka osób', 'S³abe', 'Odizolowany'] },
    { id: 'timeline', q: 'Kiedy dzia³aæ?', opts: ['ASAP', 'Tygodnie', 'Miesi¹ce', 'Czekam na moment', 'Nie wiem'] }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const res = calculateCrisis(newAnswers);
      onResult(res);
    }
  };

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <QuestionScreen 
      title="?? Kryzys"
      question={q.q}
      options={q.opts}
      onAnswer={handleAnswer}
      onBack={step > 0 ? () => setStep(step - 1) : onBack}
      progress={progress}
      step={step + 1}
      total={questions.length}
      color="orange"
    />
  );
};

export default CrisisPathway;