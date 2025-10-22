import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface QuestionScreenProps {
  title: string;
  question: string;
  options: string[];
  onAnswer: (value: string) => void;
  onBack: () => void;
  progress: number;
  step: number;
  total: number;
  color: 'blue' | 'green' | 'orange' | 'red';
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ title, question, options, onAnswer, onBack, progress, step, total, color }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };

  const borderColors = {
    blue: 'hover:border-blue-500',
    green: 'hover:border-green-500',
    orange: 'hover:border-orange-500',
    red: 'hover:border-red-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <button onClick={onBack} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg">
              <ArrowLeft size={20} /> Wstecz
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-gray-700 rounded-full h-2 mb-2">
              <div className={`${colors[color]} h-2 rounded-full transition-all`} style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-gray-400 text-center">Pytanie {step} z {total}</p>
          </div>

          <h2 className="text-xl font-semibold mb-6">{question}</h2>

          <div className="space-y-3">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(opt)}
                className={`w-full bg-gray-700 hover:bg-gray-600 text-left p-4 rounded-lg transition-colors border border-gray-600 ${borderColors[color]}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
