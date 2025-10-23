import React, { useState } from 'react';
import QuestionScreen from '../components/QuestionScreen';
import { calculateBefore } from '../calculations/calculations';

interface BeforePathwayProps {
  onResult: (result: any) => void;
  onBack: () => void;
}

const BeforePathway: React.FC<BeforePathwayProps> = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { id: 'together_time', q: 'Jak długo jesteście razem?', opts: ['Poniżej roku', '1-2 lata', '2-5 lat', 'Ponad 5 lat'] },
    { id: 'prenup', q: 'Czy rozmawialiście o intercyzie?', opts: ['Tak, zgodziła się', 'Tak, odmówiła', 'Nie, boję się tematu', 'Nie, kochamy się'] },
    { id: 'prenup_reaction', q: 'Jaka była jej reakcja na intercyzę?', opts: ['Racjonalna', 'Zraniona', 'Histeria', 'Gniew'] },
    { id: 'kids_when', q: 'Kiedy chcecie mieć dzieci?', opts: ['Jak najszybciej', 'Za rok-dwa', 'Za kilka lat', 'Nie planujemy', 'Konflikt - ja nie chcę'] },
    { id: 'kids_how_many', q: 'Ile dzieci?', opts: ['Żadnych', 'Jedno', 'Dwoje', 'Troje+', 'Ona chce więcej'] },
    { id: 'her_career', q: 'Jakie są jej plany zawodowe?', opts: ['Kariera to priorytet', 'Balans mi', 'Zwolni tempo', 'W domu z dziećmi', 'Rzuci pracę'] },
    { id: 'income_now', q: 'Kto z Was więcej teraz zarabia?', opts: ['Ja 3x+', 'Ja 2x', 'Podobnie', 'Ona więcej', 'Ona nie pracuje'] },
    { id: 'income_future', q: 'Kto będzie żywicielem rodziny?', opts: ['Tylko ja', 'Głównie ja 70%', 'Ja 60%', 'Równo', 'Ona więcej'] },
    { id: 'her_debt', q: 'Czy ona ma długi', opts: ['Brak', 'Małe', 'Kredyt studencki', 'Znaczne', 'Nie wiem'] },
    { id: 'her_spending', q: 'Jak ona wydaje pieniądze?', opts: ['Oszczędna', 'Zbalansowana', 'Lubi shopping', 'Luksusowe gusta', 'Impulsywna, długi'] },
    { id: 'transparency', q: 'Przejrzystość finansowa między Wami?', opts: ['Pełna', 'Częściowa', 'Ograniczona', 'Tajemnicza'] },
    { id: 'pressure', q: 'Kto naciska na ślub?', opts: ['Oboje równo', 'Ja bardziej', 'Ona bardziej', 'Ona ultimatum'] },
    { id: 'red_flags', q: 'Red flags?', opts: ['Brak', 'Drobne', 'Kilka rzeczy', 'Poważne', 'Ignoruję je'] },
     
    { id: 'test', q: 'Ile dzieci?', opts: ['Żadnych', 'Jedno', 'Dwoje', 'Troje+', 'Ona chce więcej'] },
    { id: 'test2', q: 'Jej plany zawodowe?', opts: ['Kariera priorytet', 'Balans', 'Zwolni tempo', 'W domu z dziećmi', 'Rzuci pracę'] },
    { id: 'test3', q: 'Kto z Was więcej teraz zarabia?', opts: ['Ja 3x+', 'Ja 2x', 'Podobnie', 'Ona więcej', 'Ona nie pracuje'] },
    { id: 'test', q: 'Kto będzie żywicielem rodziny?', opts: ['Tylko ja', 'Głównie ja 70%', 'Ja 60%', 'Równo', 'Ona więcej'] },
    { id: 'test', q: 'Czy ona ma długi?', opts: ['Brak', 'Małe', 'Kredyt studencki', 'Znaczne', 'Nie wiem'] },
    { id: 'test', q: 'Jak ona wydaje pieniądze?', opts: ['Oszczędna', 'Zbalansowana', 'Lubi shopping', 'Luksusowe gusta', 'Impulsywna, długi'] },
    { id: 'test', q: 'Przejrzystość finansowa między Wami?', opts: ['Pełna', 'Częściowa', 'Ograniczona', 'Tajemnicza'] },
    { id: 'test', q: 'Kto naciska na ślub?', opts: ['Oboje równo', 'Ja bardziej', 'Ona bardziej', 'Ona ultimatum'] },
    { id: 'test', q: 'Red flags?', opts: ['Brak', 'Drobne', 'Kilka rzeczy', 'Poważne', 'Ignoruję je'] },
   
    { id: 'family_opinion', q: 'Opinia rodziny o niej?', opts: ['Kochają', 'Lubią', 'Neutralni', 'Obawy', 'Odradzają', 'Izoluje mnie'] },
    { id: 'living', q: 'Mieszkacie razem?', opts: ['Tak, ponad rok', 'Tak, krótko', 'Nie', 'Po ślubie dopiero'] }
  ];

  const handleAnswer = (value: string) => {
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
      title="💍 Przed ślubem"
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
