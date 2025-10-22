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
    { id: 'duration', q: 'Jak długo trwa kryzys?', opts: ['1-3 miesiące', '3-6 miesięcy', '6-12 miesięcy', 'Ponad rok', 'Kilka lat', 'Od początku'] },
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
      title="⚠️ Kryzys"
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
