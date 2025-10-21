/**
 * src/components/ResultDisplay.jsx
 *
 * KOMPONENT WYSWIETLAJ¥CY WYNIK:
 * - Prezentuje wynik analizy (pole result).
 * - Oczekuje struktury, któr¹ zwracaj¹ funkcje z utils/calculations.js.
 *
 * Props:
 * - result: obiekt z polami (riskLevel, mainTitle, mainDescription, scenarios, recommendations, actionItems, itd.)
 * - onRestart: funkcja restartuj¹ca quiz
 *
 * Zale¿noœci:
 * - react
 * - lucide-react (TrendDown, AlertTriangle, Shield ikony)
 *
 * Uwaga:
 * - Dopasuj style do swojego projektu (Tailwind lub zwyk³y CSS).
 */

import React from 'react';
import { TrendingDown, AlertTriangle, Shield } from 'lucide-react';

const ResultDisplay = ({ result, onRestart }) => {
  const getRiskColor = (level) => {
    const colors = { low: 'bg-green-500', medium: 'bg-yellow-500', high: 'bg-orange-500', critical: 'bg-red-500' };
    return colors[level] || 'bg-gray-500';
  };

  const getRiskLabel = (level) => {
    const labels = { low: 'Niskie ryzyko', medium: 'Œrednie ryzyko', high: 'Wysokie ryzyko', critical: 'KRYTYCZNE RYZYKO' };
    return labels[level] || 'Nieokreœlone';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
          
          <div className={`${getRiskColor(result.riskLevel)} text-white px-6 py-4 rounded-lg mb-6 text-center`}>
            <h2 className="text-3xl font-bold">{getRiskLabel(result.riskLevel)}</h2>
          </div>

          <h1 className="text-4xl font-bold mb-4">{result.mainTitle}</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">{result.mainDescription}</p>

          {result.scenarios && result.scenarios.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingDown className="text-red-400" />
                Scenariusze i prawdopodobieñstwa
              </h3>
              <div className="space-y-4">
                {result.scenarios.map((s, idx) => (
                  <div key={idx} className="bg-gray-700 rounded-lg p-5 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-xl flex-1">{s.scenario}</h4>
                      <span className="text-3xl font-bold text-red-400 ml-4">{s.probability}%</span>
                    </div>
                    <p className="text-gray-200">{s.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.warnings && result.warnings.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-yellow-400" />
                Ostrze¿enia
              </h3>
              <div className="space-y-4">
                {result.warnings.map((w, idx) => (
                  <div key={idx} className="bg-gray-700 rounded-lg p-5 border border-yellow-600">
                    <h4 className="font-bold text-xl mb-3 text-yellow-400">{w.title}</h4>
                    <p className="text-gray-200 leading-relaxed">{w.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.redFlags && result.redFlags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-400" />
                Czerwone flagi
              </h3>
              <div className="bg-red-900 bg-opacity-30 rounded-lg p-5 border border-red-600">
                <ul className="space-y-2">
                  {result.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-400 text-xl mt-1">?</span>
                      <span className="text-gray-200">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {result.actionItems && result.actionItems.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="text-red-400" />
                Natychmiastowe akcje
              </h3>
              <div className="space-y-3">
                {result.actionItems.map((item, idx) => (
                  <div key={idx} className="bg-red-900 bg-opacity-20 rounded-lg p-4 border-l-4 border-red-500">
                    <div className="flex items-start gap-3">
                      <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
                        {item.priority}
                      </span>
                      <p className="text-gray-200 flex-1">{item.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.tacticalAdvice && result.tacticalAdvice.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="text-blue-400" />
                Porady taktyczne
              </h3>
              <div className="space-y-4">
                {result.tacticalAdvice.map((advice, idx) => (
                  <div key={idx} className="bg-blue-900 bg-opacity-20 rounded-lg p-5 border border-blue-600">
                    <h4 className="font-bold text-lg mb-2 text-blue-400">{advice.title}</h4>
                    <p className="text-gray-200 leading-relaxed">{advice.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* inne sekcje (tacticalMoves, courtReality, longTermStrategy, threats, risks, immediateActions) */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="text-blue-400" />
                Rekomendacje
              </h3>
              <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
                <ul className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-400 text-lg mt-1">?</span>
                      <span className="text-gray-200 leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
          >
            Rozpocznij od nowa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;