import React, { useState } from 'react';
import QuestionScreen from '../components/QuestionScreen';
import { calculateDivorce } from '../calculations/calculations';

interface DivorcePathwayProps {
  onResult: (result: any) => void;
  onBack: () => void;
}

const DivorcePathway: React.FC<DivorcePathwayProps> = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { id: 'who_filed', q: 'Kto złożył pozew?',  opts: [
      { text: 'Ja' },
      { text: 'Ona' },
      { text: 'Wspólny' },
      { text: 'Jeszcze nie złożony', next: 'prenup' } // przykład skoku
    ] },
    { id: 'duration', q: 'Jak długo trwa?', opts: ['0-2 m-ce', '3-6 m-cy', '6-12 m-cy', 'Rok+', '2+ lata'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'Tak'] },
    { id: 'custody', q: 'Opieka?', opts: ['Dogadani 50/50', 'Dogadani - ona', 'Walczę o 50/50', 'Walczę o pełną', 'Przegrywam', 'Straciłem'] },
    { id: 'kids_pos', q: 'Dzieci chcą?', opts: ['Ze mną', 'Neutralne', 'Z nią', 'Przeciwko mnie', 'Za małe'] },
    { id: 'alienation', q: 'Nadal alienuje?', opts: ['Nie', 'Subtelnie', 'Aktywnie', 'Ciężko', 'Blokuje kontakt'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, pomaga', 'Tak, kwestionuje', 'Nie'] },
    { id: 'property', q: 'Podział majątku?', opts: ['Dogadani', 'Negocjacje', 'Walka', 'Sąd decyduje', 'Ona ukrywa', 'Ja ukryłem'] },
    { id: 'assets', q: 'Aktywa?', opts: ['Niewiele', 'Dom', 'Oszczędności', 'Firma', 'Kilka'] },
    { id: 'alimony', q: 'Alimenty na nią?', opts: ['Nie', 'Żąda', 'Sąd - niskie', 'Sąd - wysokie', 'Ja żądam'] },
    { id: 'her_tactics', q: 'Jej taktyki?', opts: ['Fair', 'Przeciąga', 'Kłamie', 'Wyolbrzymia', 'Fałszywe oskarżenia', 'Wszystko'] },
    { id: 'false_acc', q: 'Jakie oskarżenia?', opts: ['Brak', 'Przemoc fizyczna', 'Przemoc psychiczna', 'Krzywdzenie dzieci', 'Alkohol', 'Kilka'] },
    { id: 'your_lawyer', q: 'Twój prawnik?', opts: ['Wyśmienity', 'Dobry', 'Przeciętny', 'Słaby', 'Nie mam'] },
    { id: 'her_lawyer', q: 'Jej prawnik?', opts: ['Nie ma', 'Słaby', 'Przeciętny', 'Dobry', 'Rekin'] },
    { id: 'bias', q: 'Stronniczość sądu?', opts: ['Nie', 'Lekko', 'Wyraźnie', 'Pro-kobieca'] },
    { id: 'strategy', q: 'Twoja strategia?', opts: ['Polubownie', 'Obrona', 'Atak', 'Wojna totalna'] },
    { id: 'finance', q: 'Wpływ finansowy?', opts: ['Minimalny', 'Umiarkowany', 'Znaczący', 'Druzgocący', 'Bankructwo'] },
    { id: 'emotional', q: 'Stan emocjonalny?', opts: ['Dobry', 'Stres ale OK', 'Walczę', 'Depresja', 'Załamanie'] }
  ];

  const handleAnswer = (value: string) => {
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
      title="⚖️ Rozwód"
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
