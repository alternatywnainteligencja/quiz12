/**
 * src/components/pathways/BeforePathway.jsx
 *
 * ŒCIE¯KA "PRZED ŒLUBEM":
 * - Wyœwietla seriê pytañ dotycz¹cych sytuacji przedœlubnej.
 * - Na koñcu wywo³uje onResult(result) z wynikiem obliczonym przez calculateBefore z utils/calculations.js
 *
 * Props:
 * - onResult(result)  -> callback zwracaj¹cy obliczony wynik
 * - onBack() -> cofniêcie do wyboru œcie¿ki
 *
 * Zale¿noœci:
 * - react (useState)
 * - QuestionScreen (components)
 * - calculateBefore (src/utils/calculations.js)
 */

import React, { useState } from 'react';
import QuestionScreen from '../QuestionScreen';
import { calculateBefore } from '../../utils/calculations';

const BeforePathway = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'together_time', q: 'Jak d³ugo jesteœcie razem?', opts: ['Poni¿ej roku', '1-2 lata', '2-5 lat', 'Ponad 5 lat'] },
    { id: 'prenup', q: 'Czy rozmawialiœcie o intercyzie?', opts: ['Tak, zgodzi³a siê', 'Tak, odmówi³a', 'Nie, bojê siê tematu', 'Nie, niepotrzebne'] },
    { id: 'prenup_reaction', q: 'Jej reakcja na intercyzê?', opts: ['Racjonalna', 'Zraniona', 'Histeria', 'Rodzina przeciwko mnie'] },
    { id: 'kids_when', q: 'Kiedy chce dzieci?', opts: ['Jak najszybciej', 'Za rok-dwa', 'Za kilka lat', 'Nie planujemy', 'Konflikt - ja nie chcê'] },
    { id: 'kids_how_many', q: 'Ile dzieci?', opts: ['¯adnych', 'Jedno', 'Dwoje', 'Troje+', 'Ona chce wiêcej'] },
    { id: 'her_career', q: 'Jej plany zawodowe?', opts: ['Kariera priorytet', 'Balans', 'Zwolni tempo', 'W domu z dzieæmi', 'Rzuci pracê'] },
    { id: 'income_now', q: 'Kto wiêcej zarabia teraz?', opts: ['Ja 3x+', 'Ja 2x', 'Podobnie', 'Ona wiêcej', 'Ona nie pracuje'] },
    { id: 'income_future', q: 'Kto bêdzie ¿ywicielem?', opts: ['Tylko ja', 'G³ównie ja 70%', 'Ja 60%', 'Równo', 'Ona wiêcej'] },
    { id: 'her_debt', q: 'Jej d³ugi?', opts: ['Brak', 'Ma³e', 'Kredyt studencki', 'Znaczne', 'Nie wiem'] },
    { id: 'her_spending', q: 'Jak wydaje pieni¹dze?', opts: ['Oszczêdna', 'Zbalansowana', 'Lubi shopping', 'Luksusowe gusta', 'Impulsywna, d³ugi'] },
    { id: 'transparency', q: 'Przejrzystoœæ finansowa?', opts: ['Pe³na', 'Czêœciowa', 'Ograniczona', 'Tajemnicza'] },
    { id: 'pressure', q: 'Kto naciska na œlub?', opts: ['Oboje równo', 'Ja bardziej', 'Ona bardziej', 'Ona ultimatum'] },
    { id: 'red_flags', q: 'Red flags?', opts: ['Brak', 'Drobne', 'Kilka rzeczy', 'Powa¿ne', 'Ignorujê je'] },
    { id: 'family_opinion', q: 'Opinia rodziny o niej?', opts: ['Kochaj¹', 'Lubi¹', 'Neutralni', 'Obawy', 'Odradzaj¹', 'Izoluje mnie'] },
    { id: 'living', q: 'Mieszkacie razem?', opts: ['Tak, ponad rok', 'Tak, krótko', 'Nie', 'Po œlubie dopiero'] }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const res = calculateBefore(newAnswers);
      onResult(res);
    }
  };

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <QuestionScreen 
      title="?? Przed œlubem"
      question={q.q}
      options={q.opts}
      onAnswer={handleAnswer}
      onBack={step > 0 ? () => setStep(step - 1) : onBack}
      progress={progress}
      step={step + 1}
      total={questions.length}
      color="blue"
    />
  );
};

export default BeforePathway;