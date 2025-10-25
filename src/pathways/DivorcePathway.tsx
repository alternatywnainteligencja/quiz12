import React, { useState, useEffect } from 'react';
import QuestionScreen from '../components/QuestionScreen';
import { calculateDivorce } from '../calculations/calculations'; // Użyj odpowiedniej funkcji
import { fetchQuestionsWithCache, Question, QuestionOption } from '../services/googleSheetsService';

interface DivorcePathwayProps {
  onResult: (result: any) => void;
  onBack: () => void;
}

const DivorcePathway: React.FC<DivorcePathwayProps> = ({ onResult, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback questions - wklej tutaj swoje oryginalne pytania
  const fallbackQuestions: Question[] = [
    { id: 'example1', q: 'Przykładowe pytanie 1?', opts: [
      { text: 'Opcja 1' }, 
      { text: 'Opcja 2' }
    ]},
    // ... dodaj wszystkie swoje pytania
  ];

  // Fetch questions on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await fetchQuestionsWithCache('divorce');
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

    const chosenOpt = currentQuestion.opts.find(opt =>
      typeof opt === 'string' ? opt === value : opt.text === value
    );

    let nextStep = step + 1;

    if (chosenOpt && typeof chosenOpt === 'object' && chosenOpt.next) {
      const nextIndex = questions.findIndex(q => q.id === chosenOpt.next);
      if (nextIndex !== -1) {
        nextStep = nextIndex;
      }
    }

    if (nextStep < questions.length) {
      setStep(nextStep);
    } else {
      const res = calculateDivorce(newAnswers); // Użyj odpowiedniej funkcji
      onResult(res);
    }
  };

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
        title="💔 Rozwód"
        question={q.q}
        options={q.opts.map(opt => typeof opt === 'string' ? opt : opt.text)}
        onAnswer={handleAnswer}
        onBack={step > 0 ? () => setStep(step - 1) : onBack}
        progress={progress}
        step={step + 1}
        total={questions.length}
        color="red"
      />
    </>
  );
};

export default DivorcePathway;
