import React, { useState, useEffect } from 'react';
import QuestionScreen from '../components/QuestionScreen';
import { calculateMarried } from '../calculations/calculations';
import { fetchQuestionsWithCache, Question, QuestionOption } from '../services/googleSheetsService';

interface MarriedPathwayProps {
  onResult: (result: any) => void;
  onBack: () => void;
}

const MarriedPathway: React.FC<MarriedPathwayProps> = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback questions (your original hardcoded questions with conditional navigation)
  const fallbackQuestions: Question[] = [
    { id: 'years', q: 'Ile lat w małżeństwie?', opts: [
      { text: '<1 rok' }, 
      { text: '1-2 lata' }, 
      { text: '2-5 lat' }, 
      { text: '5-10 lat' }, 
      { text: '10-15 lat' }, 
      { text: '15+ lat' }
    ]},
    { id: 'prenup', q: 'Intercyza?', opts: [
      { text: 'Tak, przed ślubem' }, 
      { text: 'Tak, po ślubie' }, 
      { text: 'Nie mamy' }, 
      { text: 'Próbuję wprowadzić' }
    ]},
    { id: 'kids', q: 'Dzieci?', opts: [
      { text: 'Nie' }, 
      { text: 'W ciąży' }, 
      { text: 'Tak' }
    ]},
    { id: 'quality', q: 'Jakość małżeństwa?', opts: [
      { text: 'Świetne' }, 
      { text: 'Dobre' }, 
      { text: 'OK, rutyna' }, 
      { text: 'Pogarsza się' }, 
      { text: 'Źle' }, 
      { text: 'Katastrofa' }
    ]},
    { id: 'sex', q: 'Życie seksualne?', opts: [
      { text: 'Świetne' }, 
      { text: 'Dobre' }, 
      { text: 'Rzadziej' }, 
      { text: 'Rzadko' }, 
      { text: 'Prawie nie ma' }, 
      { text: 'Z obowiązku' }
    ]},
    { id: 'emotional', q: 'Połączenie emocjonalne?', opts: [
      { text: 'Silne' }, 
      { text: 'Przeciętne' }, 
      { text: 'Słabe' }, 
      { text: 'Jak współlokatorzy' }, 
      { text: 'Jak obcy' }
    ]},
    { id: 'my_cheat', q: 'Czy ty zdradzałeś?', opts: [
      { text: 'Nigdy' }, 
      { text: 'Raz dawno' }, 
      { text: 'Kilka razy' }, 
      { text: 'Romans' }, 
      { text: 'Mam drugą relację' }
    ]},
    { id: 'her_cheat', q: 'Czy ona zdradza?', opts: [
      { text: 'Nie, ufam' }, 
      { text: 'Chyba nie' }, 
      { text: 'Podejrzenia' }, 
      { text: 'Prawdopodobnie' }, 
      { text: 'Wiem o jednej' }, 
      { text: 'Wielokrotnie' }, 
      { text: 'Ma kochanka' }
    ]},
    { id: 'income', q: 'Kto więcej zarabia?', opts: [
      { text: 'Tylko ja' }, 
      { text: 'Ja 3x+' }, 
      { text: 'Ja 2x' }, 
      { text: 'Podobnie' }, 
      { text: 'Ona więcej' }
    ]},
    { id: 'finance_control', q: 'Kto kontroluje finanse?', opts: [
      { text: 'Ja' }, 
      { text: 'Wspólnie' }, 
      { text: 'Ona' }, 
      { text: 'Osobne' }
    ]},
    { id: 'property', q: 'Główne mieszkanie?', opts: [
      { text: 'Moje sprzed' }, 
      { text: 'Jej sprzed' }, 
      { text: 'Wspólne' }, 
      { text: 'Kredyt w małżeństwie' }, 
      { text: 'Wynajem' }
    ]},
    { id: 'assets', q: 'Inne aktywa?', opts: [
      { text: 'Brak' }, 
      { text: 'Oszczędności' }, 
      { text: 'Inwestycje' }, 
      { text: 'Firma' }, 
      { text: 'Nieruchomości' }, 
      { text: 'Kilka' }
    ]},
    { id: 'conflicts', q: 'Jak często kłótnie?', opts: [
      { text: 'Rzadko' }, 
      { text: 'Czasami' }, 
      { text: 'Często' }, 
      { text: 'Bardzo często' }, 
      { text: 'Codziennie' }
    ]},
    { id: 'her_change', q: 'Zmiana w jej zachowaniu?', opts: [
      { text: 'Nie' }, 
      { text: 'Na lepsze' }, 
      { text: 'Na gorsze' }, 
      { text: 'Dystansowa' }, 
      { text: 'Wroga' }
    ]},
    { id: 'paternity', q: 'Pewność ojcostwa? (jeśli dzieci)', opts: [
      { text: 'Pewien' }, 
      { text: 'Prawie pewien' }, 
      { text: 'Wątpliwości' }, 
      { text: 'Test - OK' }, 
      { text: 'Test - nie moje' }, 
      { text: 'Boję się' }
    ]},
    // Example with conditional navigation
    { id: 'who_filed', q: 'Kto złożył pozew?', opts: [
      { text: 'Ja' }, 
      { text: 'Ona' }, 
      { text: 'Wspólny' }, 
      { text: 'Jeszcze nie złożony', next: 'she_knows' }
    ]},
    { id: 'she_knows', q: 'Czy ona wie o twoich planach?', opts: [
      { text: 'Tak' }, 
      { text: 'Nie' }, 
      { text: 'Podejrzewa' }
    ]}
  ];

  // Fetch questions on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await fetchQuestionsWithCache('married');
        setQuestions(fetchedQuestions);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch questions, using fallback:', err);
        setError('Używam lokalnych pytań');
        setQuestions(fallbackQuestions);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[step];
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // Find the chosen option - handle both string and QuestionOption format
    const chosenOpt = currentQuestion.opts.find(opt =>
      typeof opt === 'string' ? opt === value : opt.text === value
    );

    let nextStep = step + 1; // Default: go to next question in sequence

    // Check if the chosen option has conditional navigation
    if (chosenOpt && typeof chosenOpt === 'object' && chosenOpt.next) {
      const nextIndex = questions.findIndex(q => q.id === chosenOpt.next);
      if (nextIndex !== -1) {
        nextStep = nextIndex;
      } else {
        console.warn(`Next question with id "${chosenOpt.next}" not found. Proceeding to next question.`);
      }
    }

    // Continue to next question or finish quiz
    if (nextStep < questions.length) {
      setStep(nextStep);
    } else {
      const res = calculateMarried(newAnswers);
      onResult(res);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '2rem' }}>⏳</div>
        <div>Ładowanie pytań...</div>
      </div>
    );
  }

  // Current question
  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <>
      {error && (
        <div style={{ 
          padding: '0.5rem', 
          backgroundColor: '#fff3cd', 
          color: '#856404',
          textAlign: 'center',
          fontSize: '0.875rem'
        }}>
          ⚠️ {error}
        </div>
      )}
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
    </>
  );
};

export default MarriedPathway;
