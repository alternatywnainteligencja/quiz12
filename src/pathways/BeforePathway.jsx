/**
 * src/components/pathways/BeforePathway.jsx
 *
 * �CIE�KA "PRZED �LUBEM":
 * - Wy�wietla seri� pyta� dotycz�cych sytuacji przed�lubnej.
 * - Na ko�cu wywo�uje onResult(result) z wynikiem obliczonym przez calculateBefore z utils/calculations.js
 *
 * Props:
 * - onResult(result)  -> callback zwracaj�cy obliczony wynik
 * - onBack() -> cofni�cie do wyboru �cie�ki
 *
 * Zale�no�ci:
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
    { id: 'together_time', q: 'Jak d�ugo jeste�cie razem?', opts: ['Poni�ej roku', '1-2 lata', '2-5 lat', 'Ponad 5 lat'] },
    { id: 'prenup', q: 'Czy rozmawiali�cie o intercyzie?', opts: ['Tak, zgodzi�a si�', 'Tak, odm�wi�a', 'Nie, boj� si� tematu', 'Nie, niepotrzebne'] },
    { id: 'prenup_reaction', q: 'Jej reakcja na intercyz�?', opts: ['Racjonalna', 'Zraniona', 'Histeria', 'Rodzina przeciwko mnie'] },
    { id: 'kids_when', q: 'Kiedy chce dzieci?', opts: ['Jak najszybciej', 'Za rok-dwa', 'Za kilka lat', 'Nie planujemy', 'Konflikt - ja nie chc�'] },
    { id: 'kids_how_many', q: 'Ile dzieci?', opts: ['�adnych', 'Jedno', 'Dwoje', 'Troje+', 'Ona chce wi�cej'] },
    { id: 'her_career', q: 'Jej plany zawodowe?', opts: ['Kariera priorytet', 'Balans', 'Zwolni tempo', 'W domu z dzie�mi', 'Rzuci prac�'] },
    { id: 'income_now', q: 'Kto wi�cej zarabia teraz?', opts: ['Ja 3x+', 'Ja 2x', 'Podobnie', 'Ona wi�cej', 'Ona nie pracuje'] },
    { id: 'income_future', q: 'Kto b�dzie �ywicielem?', opts: ['Tylko ja', 'G��wnie ja 70%', 'Ja 60%', 'R�wno', 'Ona wi�cej'] },
    { id: 'her_debt', q: 'Jej d�ugi?', opts: ['Brak', 'Ma�e', 'Kredyt studencki', 'Znaczne', 'Nie wiem'] },
    { id: 'her_spending', q: 'Jak wydaje pieni�dze?', opts: ['Oszcz�dna', 'Zbalansowana', 'Lubi shopping', 'Luksusowe gusta', 'Impulsywna, d�ugi'] },
    { id: 'transparency', q: 'Przejrzysto�� finansowa?', opts: ['Pe�na', 'Cz�ciowa', 'Ograniczona', 'Tajemnicza'] },
    { id: 'pressure', q: 'Kto naciska na �lub?', opts: ['Oboje r�wno', 'Ja bardziej', 'Ona bardziej', 'Ona ultimatum'] },
    { id: 'red_flags', q: 'Red flags?', opts: ['Brak', 'Drobne', 'Kilka rzeczy', 'Powa�ne', 'Ignoruj� je'] },
    { id: 'family_opinion', q: 'Opinia rodziny o niej?', opts: ['Kochaj�', 'Lubi�', 'Neutralni', 'Obawy', 'Odradzaj�', 'Izoluje mnie'] },
    { id: 'living', q: 'Mieszkacie razem?', opts: ['Tak, ponad rok', 'Tak, kr�tko', 'Nie', 'Po �lubie dopiero'] }
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
      title="?? Przed �lubem"
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