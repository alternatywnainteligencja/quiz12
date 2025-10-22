import React from "react";
import { TrendingDown, Shield, FileText, RefreshCw, Brain } from "lucide-react";

const riskColors = {
  low: "bg-green-500",
  medium: "bg-yellow-400",
  high: "bg-orange-500",
  critical: "bg-red-600",
};

const RiskBadge = ({ level, confidence }) => {
  const color = riskColors[level] || "bg-gray-500";
  return (
    <div className={`rounded-xl p-4 ${color} bg-opacity-90 shadow-lg text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold uppercase">Poziom ryzyka</div>
          <div className="text-2xl font-extrabold tracking-tight">{level.toUpperCase()}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">Pewność</div>
          <div className="text-2xl font-bold">{confidence}%</div>
        </div>
      </div>
    </div>
  );
};

const PercentBar = ({ label, value }) => {
  const v = Math.round(value);
  const barColor =
    v >= 75 ? "bg-red-500" : v >= 45 ? "bg-orange-400" : "bg-green-500";
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-sm font-mono">{v}%</div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div className={`${barColor} h-3`} style={{ width: `${v}%` }} />
      </div>
    </div>
  );
};

const ScenarioCard = ({ s }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-bold text-lg">{s.scenario}</h4>
      <div className="text-2xl font-extrabold text-red-400">
        {Math.round(s.probability)}%
      </div>
    </div>
    <p className="text-gray-300">{s.why || s.impact || ""}</p>
  </div>
);

const ActionItem = ({ a }) => {
  const bg =
    a.priority === "KRYTYCZNY"
      ? "bg-red-700"
      : a.priority === "WYSOKI"
      ? "bg-orange-600"
      : "bg-gray-700";
  return (
    <div
      className={`rounded-md p-3 ${bg} bg-opacity-30 border-l-4 ${
        a.priority === "KRYTYCZNY" ? "border-red-500" : "border-gray-600"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold uppercase px-2 py-1 bg-black bg-opacity-30 rounded">
          {a.priority}
        </span>
        <div className="text-gray-200">{a.action}</div>
      </div>
    </div>
  );
};

const RecommendationList = ({ recs }) => {
  const grouped = recs.reduce((acc, r) => {
    acc[r.type] = acc[r.type] || [];
    acc[r.type].push(r.text);
    return acc;
  }, {});
  return (
    <div className="space-y-3">
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="capitalize font-bold">{type}</div>
          </div>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {items.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const DebugMeta = ({ meta }) => {
  if (!meta) return null;
  return (
    <details className="bg-black bg-opacity-30 rounded p-3 text-xs text-gray-300">
      <summary className="cursor-pointer font-medium">Debug / meta</summary>
      <pre className="whitespace-pre-wrap mt-2 text-xs">
        {JSON.stringify(meta, null, 2)}
      </pre>
    </details>
  );
};

const ResultDisplay = ({ result, onRestart }) => {
  if (!result) return null;

  const {
    riskLevel,
    confidence,
    mainTitle,
    mainDescription,
    probabilities,
    scenarios,
    actionItems,
    recommendations,
    meta,
  } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Główna sekcja */}
        <div className="md:flex md:gap-6 md:items-start">
          <div className="md:flex-1">
            <RiskBadge level={riskLevel} confidence={confidence} />
            <div className="mt-4 bg-gray-800 rounded-lg p-5 border border-gray-700">
              <h1 className="text-2xl font-bold mb-2">{mainTitle}</h1>
              <p className="text-gray-300 leading-relaxed text-justify">{mainDescription}</p>
            </div>
          </div>

          <div className="md:w-80 mt-6 md:mt-0 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold">Kluczowe ryzyka</div>
              </div>
              <div className="space-y-3">
                <PercentBar label="Rozwód / separacja" value={probabilities.divorce || 0} />
                <PercentBar label="Fałszywe oskarżenia" value={probabilities.falseAccusation || 0} />
                <PercentBar label="Alienacja dzieci" value={probabilities.alienation || 0} />
                <PercentBar label="Strata finansowa" value={probabilities.financialLoss || 0} />
              </div>
            </div>

            <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold">Szybkie akcje</div>
                <div className="text-xs text-gray-400">co zrobić teraz</div>
              </div>
              <div className="space-y-2">
                {(actionItems || []).slice(0, 3).map((a, i) => (
                  <ActionItem key={i} a={a} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scenariusze */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingDown /> Scenariusze — prawdopodobieństwa
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarios && scenarios.length > 0 ? (
              scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)
            ) : (
              <div className="col-span-full text-gray-300">
                Brak doprecyzowanych scenariuszy — ryzyko jest niskie lub brak danych.
              </div>
            )}
          </div>
        </div>

        {/* Rekomendacje */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Shield /> Rekomendacje taktyczne
              </h3>
            </div>
            <RecommendationList recs={recommendations || []} />
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Brain /> Strategiczne kroki
              </h3>
            </div>
            <div className="space-y-2">
              {(actionItems || []).map((a, i) => (
                <ActionItem key={i} a={a} />
              ))}
            </div>
          </div>
        </div>

        {/* Przyciski i meta */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={onRestart}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded text-white font-bold"
            >
              <RefreshCw size={16} /> Rozpocznij od nowa
            </button>
            <button
              onClick={() => {
                const txt = `${mainTitle}\n${mainDescription}\nProbabilities: ${JSON.stringify(
                  probabilities
                )}\nActions: ${(actionItems || [])
                  .map((a) => a.action)
                  .join("; ")}`;
                navigator.clipboard?.writeText(txt);
                alert("Podsumowanie skopiowane do schowka.");
              }}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded text-gray-200"
            >
              <FileText size={16} /> Kopiuj podsumowanie
            </button>
          </div>

          <div className="w-full md:w-1/2 text-right">
            <div className="text-sm text-gray-400">
              Meta: score {meta?.score ?? "-"} | breakdown available
            </div>
          </div>
        </div>
        <DebugMeta meta={meta} />
      </div>
    </div>
  );
};

export default ResultDisplay;
