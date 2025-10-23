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

    { id: 'who_filed', q: 'Kto złożył pozew?', opts: [{ text: 'Ja' }, { text: 'Ona' }, { text: 'Wspólny' }, { text: 'Jeszcze nie złożony', next: 'she_knows' }] },
    { id: 'who_wants', q: 'Kto chce rozwodu?', opts: ['Ja', 'Ona', 'Oboje', 'Ja, ale jej nie mówiłem', 'Nikt jeszcze'] },
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
  const currentQuestion = questions[step];
  const newAnswers = { ...answers, [currentQuestion.id]: value };
  setAnswers(newAnswers);

  // znajdź obiekt opcji (bo niektóre są stringami, inne obiektami)
  const chosenOpt = currentQuestion.opts.find(opt => 
    typeof opt === 'object' ? opt.text === value : opt === value
  );

  let nextStep = step + 1; // domyślnie idziemy dalej

  // jeśli odpowiedź ma "next" -> znajdź indeks pytania o tym id
  if (chosenOpt && typeof chosenOpt === 'object' && chosenOpt.next) {
    const nextIndex = questions.findIndex(q => q.id === chosenOpt.next);
    if (nextIndex !== -1) {
      nextStep = nextIndex;
    }
  }

  // jeśli są jeszcze pytania, idziemy dalej
  if (nextStep < questions.length) {
    setStep(nextStep);
  } else {
    // koniec — oblicz wynik
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
      options={q.opts.map(opt => typeof opt === 'string' ? opt : opt.text)}
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
