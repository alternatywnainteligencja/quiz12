import React, { useState } from 'react';
import QuestionScreen from '../components/QuestionScreen';
import { calculateMarried } from '../calculations/calculations';

interface MarriedPathwayProps {
  onResult: (result: any) => void;
  onBack: () => void;
}

const MarriedPathway: React.FC<MarriedPathwayProps> = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { id: 'years', q: 'Ile lat w małżeństwie?', opts: ['<1 rok', '1-2 lata', '2-5 lat', '5-10 lat', '10-15 lat', '15+ lat'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, przed ślubem', 'Tak, po ślubie', 'Nie mamy', 'Próbuję wprowadzić'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'W ciąży', 'Tak'] },
    { id: 'quality', q: 'Jakość małżeństwa?', opts: ['Świetne', 'Dobre', 'OK, rutyna', 'Pogarsza się', 'Źle', 'Katastrofa'] },
    { id: 'sex', q: 'Życie seksualne?', opts: ['Świetne', 'Dobre', 'Rzadziej', 'Rzadko', 'Prawie nie ma', 'Z obowiązku'] },
    { id: 'emotional', q: 'Połączenie emocjonalne?', opts: ['Silne', 'Przeciętne', 'Słabe', 'Jak współlokatorzy', 'Jak obcy'] },
    { id: 'my_cheat', q: 'Czy ty zdradzałeś?', opts: ['Nigdy', 'Raz dawno', 'Kilka razy', 'Romans', 'Mam drugą relację'] },
    { id: 'her_cheat', q: 'Czy ona zdradza?', opts: ['Nie, ufam', 'Chyba nie', 'Podejrzenia', 'Prawdopodobnie', 'Wiem o jednej', 'Wielokrotnie', 'Ma kochanka'] },
    { id: 'income', q: 'Kto więcej zarabia?', opts: ['Tylko ja', 'Ja 3x+', 'Ja 2x', 'Podobnie', 'Ona więcej'] },
    { id: 'finance_control', q: 'Kto kontroluje finanse?', opts: ['Ja', 'Wspólnie', 'Ona', 'Osobne'] },
    { id: 'property', q: 'Główne mieszkanie?', opts: ['Moje sprzed', 'Jej sprzed', 'Wspólne', 'Kredyt w małżeństwie', 'Wynajem'] },
    { id: 'assets', q: 'Inne aktywa?', opts: ['Brak', 'Oszczędności', 'Inwestycje', 'Firma', 'Nieruchomości', 'Kilka'] },
    { id: 'conflicts', q: 'Jak często kłótnie?', opts: ['Rzadko', 'Czasami', 'Często', 'Bardzo często', 'Codziennie'] },
    { id: 'her_change', q: 'Zmiana w jej zachowaniu?', opts: ['Nie', 'Na lepsze', 'Na gorsze', 'Dystansowa', 'Wroga'] },
    { id: 'paternity', q: 'Pewność ojcostwa? (jeśli dzieci)', opts: ['Pewien', 'Prawie pewien', 'Wątpliwości', 'Test - OK', 'Test - nie moje', 'Boję się'] }
  ];

const handleAnswer = (value: string) => {
  const currentQuestion = questions[step];
  const newAnswers = { ...answers, [currentQuestion.id]: value };
  setAnswers(newAnswers);

  // znajdź wybraną opcję (może być string lub obiekt)
  const chosenOpt = currentQuestion.opts.find(opt =>
    typeof opt === 'object' ? opt.text === value : opt === value
  );

  let nextStep = step + 1; // domyślnie następne pytanie

  // jeśli odpowiedź ma pole "next", to przeskocz do tego pytania
  if (chosenOpt && typeof chosenOpt === 'object' && chosenOpt.next) {
    const nextIndex = questions.findIndex(q => q.id === chosenOpt.next);
    if (nextIndex !== -1) {
      nextStep = nextIndex;
    }
  }

  // jeśli jeszcze są pytania — idź dalej, w przeciwnym razie zakończ
  if (nextStep < questions.length) {
    setStep(nextStep);
  } else {
    const res = calculateMarried(newAnswers);
    onResult(res);
  }
};


  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <QuestionScreen
      title="💚 W małżeństwie"
      question={q.q}
      options={q.opts.map(opt => typeof opt === 'string' ? opt : opt.text)}
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
