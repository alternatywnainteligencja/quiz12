import React, { useState } from 'react';
import QuestionScreen from '../components/QuestionScreen';
import { calculateCrisis } from '../calculations/calculations';

interface CrisisPathwayProps {
  onResult: (result: any) => void;
  onBack: () => void;
}

const CrisisPathway: React.FC<CrisisPathwayProps> = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { id: 'crisis', q: 'Od jak dawna trwa kryzys?', opts: [{ text: 'Właśnie się o nim dowiedziałem' }, { text: 'Poniżej miesiąca' }, { text: '2-3 miesiące' }, { text: 'Więcej niż 3 miesiące' }] },
    { id: 'who_wants', q: 'Kto chce rozwodu?', opts: ['Ja', 'Ona', 'Oboje', 'Ja, ale jej nie mówiłem', 'Nikt jeszcze'] },
    { id: 'she_knows', q: 'Ona wie o rozwodzie?', opts: ['Tak, zgadza się', 'Tak, walczy', 'Tak, grozi', 'Podejrzewa', 'Nie wie'] },
    { id: 'threats', q: 'Czym grozi?', opts: ['Nie grozi', 'Dziećmi', 'Pieniędzmi', 'Reputacją', 'Fałszywymi oskarżeniami', 'Przemocą', 'Wszystkim'] },
    { id: 'prenup', q: 'Intercyza?', opts: ['Tak, dobra', 'Tak, słaba', 'Nie mamy', 'Próbuję (bez szans)'] },
    { id: 'kids', q: 'Dzieci?', opts: ['Nie', 'Tak'] },
    { id: 'alienation', q: 'Alienacja dzieci?', opts: ['Nie', 'Zaczyna', 'Subtelnie', 'Aktywnie', 'Utrudnia kontakt', 'Odwróciły się'] },
    { id: 'prep_finance', q: 'Przygotowanie finansowe?', opts: ['Nic', 'Dokumenty', 'Prawnik', 'Przerzucam $', 'Ukrywam aktywa', 'Pełne'] },
    { id: 'evidence', q: 'Zbierasz dowody?', opts: ['Nie', 'Czasami', 'Regularnie', 'System nagrań', 'Wszystko'] },
    { id: 'her_behavior', q: 'Jej zachowanie?', opts: ['Chłodna', 'Zła', 'Manipulacyjna', 'Wroga', 'Przemoc', 'Udaje że OK'] },
    { id: 'her_prep', q: 'Ona się przygotowuje?', opts: ['Nie wiem', 'Chyba nie', 'Prawdopodobnie', 'Na pewno', 'Ma prawnika'] },
    { id: 'income', q: 'Dochody?', opts: ['Tylko ja', 'Ja znacznie więcej', 'Ja więcej', 'Podobnie', 'Ona więcej'] },
    { id: 'main_asset', q: 'Główny majątek?', opts: ['Brak', 'Dom - mój przed', 'Dom - jej przed', 'Dom wspólny', 'Firma', 'Kilka'] },
    { id: 'access', q: 'Jej dostęp do $?', opts: ['Pełny', 'Wspólne konta', 'Ograniczony', 'Nie ma'] },
    { id: 'tactics', q: 'Brudna walka - gotowy?', opts: ['Nie, fair play', 'Jeśli ona zacznie', 'Tak', 'Już stosuję'] },
    { id: 'support', q: 'Wsparcie?', opts: ['Silne', 'Kilka osób', 'Słabe', 'Odizolowany'] },
    { id: 'timeline', q: 'Kiedy działać?', opts: ['ASAP', 'Tygodnie', 'Miesiące', 'Czekam na moment', 'Nie wiem'] }
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
    const res = calculateCrisis(newAnswers);
    onResult(res);
  }
};


  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <QuestionScreen
      title="⚠️ Kryzys"
      question={q.q}
      options={q.opts.map(opt => typeof opt === 'string' ? opt : opt.text)}
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
