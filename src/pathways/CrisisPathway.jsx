/**
 * src/components/pathways/CrisisPathway.jsx
 *
 * �CIE�KA "KRYZYS":
 * - Seria pyta� dotycz�cych trwaj�cego kryzysu i zagro�e�.
 * - Po zako�czeniu korzysta z calculateCrisis z utils/calculations.js i zwraca wynik przez onResult.
 *
 * Props:
 * - onResult(result)
 * - onBack()
 *
 * Zale�no�ci:
 * - react, QuestionScreen, calculateCrisis
 */

import React, { useState } from 'react';
import QuestionScreen from '../QuestionScreen';
import { calculateCrisis } from '../../utils/calculations';

const CrisisPathway = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'duration', q: 'Jak d�ugo trwa kryzys?', opts: ['1-3 miesi�ce', '3-6 miesi�cy', '6-12 miesi�cy', 'Ponad rok', 'Kilka lat', 'Od pocz�tku'] },
    { id: 'who_wants', q: 'Kto chce rozwodu?', opts: ['Ja', 'Ona', 'Oboje', 'Ja, ale jej nie m�wi�em', 'Nikt jeszcze'] },
    { id: 'she_knows', q: 'Ona wie o rozwodzie?', opts: ['Tak, zgadza si�', 'Tak, walczy', 'Tak, grozi', 'Podejrzewa', 'Nie wie'] },
    { id: 'threats', q: 'Czym grozi?', opts: ['Nie grozi', 'Dzie�mi', 'Pieni�dzmi', 'Reputacj�', 'Fa�szywymi oskar�eniami', 'Przemoc�', 'Wszystkim'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, dobra', 'Tak, s�aba', 'Nie mamy', 'Pr�buj� (bez szans)'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'Tak'] },
    { id: 'alienation', q: 'Alienacja dzieci?', opts: ['Nie', 'Zaczyna', 'Subtelnie', 'Aktywnie', 'Utrudnia kontakt', 'Odwr�ci�y si�'] },
    { id: 'prep_finance', q: 'Przygotowanie finansowe?', opts: ['Nic', 'Dokumenty', 'Prawnik', 'Przerzucam $', 'Ukrywam aktywa', 'Pe�ne'] },
    { id: 'evidence', q: 'Zbierasz dowody?', opts: ['Nie', 'Czasami', 'Regularnie', 'System nagra�', 'Wszystko'] },
    { id: 'her_behavior', q: 'Jej zachowanie?', opts: ['Ch�odna', 'Z�a', 'Manipulacyjna', 'Wroga', 'Przemoc', 'Udaje �e OK'] },
    { id: 'her_prep', q: 'Ona si� przygotowuje?', opts: ['Nie wiem', 'Chyba nie', 'Prawdopodobnie', 'Na pewno', 'Ma prawnika'] },
    { id: 'income', q: 'Dochody?', opts: ['Tylko ja', 'Ja znacznie wi�cej', 'Ja wi�cej', 'Podobnie', 'Ona wi�cej'] },
    { id: 'main_asset', q: 'G��wny maj�tek?', opts: ['Brak', 'Dom - m�j przed', 'Dom - jej przed', 'Dom wsp�lny', 'Firma', 'Kilka'] },
    { id: 'access', q: 'Jej dost�p do $?', opts: ['Pe�ny', 'Wsp�lne konta', 'Ograniczony', 'Nie ma'] },
    { id: 'tactics', q: 'Brudna walka - gotowy?', opts: ['Nie, fair play', 'Je�li ona zacznie', 'Tak', 'Ju� stosuj�'] },
    { id: 'support', q: 'Wsparcie?', opts: ['Silne', 'Kilka os�b', 'S�abe', 'Odizolowany'] },
    { id: 'timeline', q: 'Kiedy dzia�a�?', opts: ['ASAP', 'Tygodnie', 'Miesi�ce', 'Czekam na moment', 'Nie wiem'] }
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