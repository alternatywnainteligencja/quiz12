import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import BeforePathway from '../pathways/BeforePathway';
import MarriedPathway from '../pathways/MarriedPathway';
import CrisisPathway from '../pathways/CrisisPathway';
import DivorcePathway from '../pathways/DivorcePathway';
import ResultDisplay from './ResultDisplay';

const MarriageQuiz = () => {
  const [pathway, setPathway] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  if (result) {
    return <ResultDisplay result={result} onRestart={() => { setResult(null); setPathway(null); }} />;
  }

  if (!pathway) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Heart className="text-red-500" size={32} />
              <h1 className="text-3xl font-bold">Analiza sytuacji małżeńskiej</h1>
            </div>
            <div className="space-y-4">
              <button onClick={() => setPathway('before')} className="w-full bg-blue-600 hover:bg-blue-700 text-left p-6 rounded-lg transition-colors border-2 border-blue-500">
                <h3 className="text-xl font-bold mb-2">💍 Planuję wziąć ślub</h3>
                <p className="text-gray-300 text-sm">Przed ślubem - ocena sytuacji</p>
              </button>
              <button onClick={() => setPathway('married')} className="w-full bg-green-600 hover:bg-green-700 text-left p-6 rounded-lg transition-colors border-2 border-green-500">
                <h3 className="text-xl font-bold mb-2">💚 Jestem w małżeństwie</h3>
                <p className="text-gray-300 text-sm">Po ślubie - ocena bieżącej sytuacji</p>
              </button>
              <button onClick={() => setPathway('crisis')} className="w-full bg-orange-600 hover:bg-orange-700 text-left p-6 rounded-lg transition-colors border-2 border-orange-500">
                <h3 className="text-xl font-bold mb-2">⚠️ Małżeństwo w kryzysie</h3>
                <p className="text-gray-300 text-sm">Poważne problemy, rozważasz rozwód</p>
              </button>
              <button onClick={() => setPathway('divorce')} className="w-full bg-red-600 hover:bg-red-700 text-left p-6 rounded-lg transition-colors border-2 border-red-500">
                <h3 className="text-xl font-bold mb-2">⚖️ W trakcie rozwodu</h3>
                <p className="text-gray-300 text-sm">Proces rozwodowy już trwa</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pathway === 'before') return <BeforePathway onResult={setResult} onBack={() => setPathway(null)} />;
  if (pathway === 'married') return <MarriedPathway onResult={setResult} onBack={() => setPathway(null)} />;
  if (pathway === 'crisis') return <CrisisPathway onResult={setResult} onBack={() => setPathway(null)} />;
  if (pathway === 'divorce') return <DivorcePathway onResult={setResult} onBack={() => setPathway(null)} />;

  return null;
};

export default MarriageQuiz;
