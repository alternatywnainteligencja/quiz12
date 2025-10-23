import React from "react";
import { TrendingDown, Shield, ClipboardCheck, FileText, RefreshCw, Brain, BookOpenText, Heading1Icon, Heading2, Scale } from "lucide-react";

const levelMap = {
  LOW: "NISKI",
  MEDIUM: "ŚREDNI",
  HIGH: "WYSOKI",
  CRITICAL: "KRYTYCZNY"
};

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
          <div className="text-2xl font-extrabold tracking-tight">{levelMap[level.toUpperCase()] || level.toUpperCase()}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">Pewność prognozy</div>
          <div className="text-2xl font-bold">{confidence}%</div>
        </div>
      </div>
    </div>
  );
};

//jak wygląda PercentBar
const PercentBar = ({ label, value }) => {
  const v = Math.round(value);
  const barColor =
    v >= 50 ? "bg-red-500" : v >= 20 ? "bg-orange-400" : "bg-green-500";
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-lg font-mono">{v}%</div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div className={`${barColor} h-3`} style={{ width: `${v}%` }} />
      </div>
    </div>
  );
};
//jak wygląda ScenarioCard
const ScenarioCard = ({ s }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <div className="flex items-start justify-between mb-2">
      <h4 className="text-lg font-semibold">{s.scenario}</h4>
      <div className="text-lg  font-semibold text-red-400">
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
      className={`rounded-md p-3 ${bg} bg-opacity-30 border-l-4 ${a.priority === "KRYTYCZNY" ? "border-red-500" : "border-gray-600"
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

const TimelineCard = ({ period, tasks }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-3">
      <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-sm">
        {period}
      </div>
    </div>
    <ul className="space-y-2">
      {tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-2 text-gray-300">
          <span className="text-blue-400 mt-1">•</span>
          <span>{task}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PsychologicalProfile = ({ title, traits }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <h4 className="font-bold text-lg mb-3 text-blue-400">{title}</h4>
    <div className="space-y-2">
      {traits.map((trait, i) => (
        <div key={i} className="text-gray-300">
          <span className="font-semibold text-white">{trait.label}:</span> {trait.value}
        </div>
      ))}
    </div>
  </div>
);

const BookRecommendation = ({ book }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:bg-gray-750 transition">
    <div className="font-semibold text-white">{book.title}</div>
    <div className="text-sm text-gray-400">{book.author}</div>
    {book.description && (
      <p className="text-xs text-gray-300 mt-2">{book.description}</p>
    )}
  </div>
);

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
    timeline,
    readingList,
    psychologicalProfiles,
    conclusion,
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

        </div>

        {/* Kontener flex wypełniający ekran */}
        <div className="flex w-full gap-4 p-0 bg-gray-850">
          {/* Lewa sekcja */}
          <div className="flex-1 bg-gray-800 rounded-lg p-5 border border-gray-700 overflow-auto">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-7">
              <TrendingDown /> Kluczowe ryzyka
            </h2>

            {/* Kontener z odstępami między blokami */}
            <div className="space-y-6">
              <div>
                <PercentBar label="Rozwód / separacja" value={probabilities.divorce || 0} />
                <h3 className="text-sm"><div className="text-gray-300">
                  {probabilities.divorce <= 20 && "Ryzyko rozstania jest niskie — sytuacja jest stabilna."}
                  {probabilities.divorce > 20 && probabilities.divorce <= 49 && "Ryzyko rozstania jest umiarkowane — warto zachować czujność."}
                  {probabilities.divorce > 49 && probabilities.divorce <= 74 && "Ryzyko rozstania jest wysokie — sytuacja jest napięta."}
                  {probabilities.divorce > 74 && "Ryzyko rozstania krytyczne — rozstanie wydaje się już nieuniknione."}</div></h3>
              </div>
              <div>
                <PercentBar label="Fałszywe oskarżenia" value={probabilities.falseAccusation || 0} />
                <h3 className="text-sm"><div className="text-gray-300">
                  
                  {probabilities.falseAccusation <= 20 && "Ryzyko fałszywych oskarżeń jest niskie — sytuacja jest stabilna."}
                  {probabilities.falseAccusation > 20 && probabilities.falseAccusation <= 49 && "Ryzyko fałszywych oskarżeń jest umiarkowane — warto zachować czujność."}
                  {probabilities.falseAccusation > 49 && probabilities.falseAccusation <= 74 && "Ryzyko fałszywych oskarżeń jest wysokie — sytuacja jest napięta."}
                  {probabilities.falseAccusation > 74 && "Ryzyko fałszywych oskarżeń krytyczne — fałszywych oskarżeń wydają się już nieuniknione."}</div></h3>
              </div>
              <div>
                <PercentBar label="Alienacja dzieci" value={probabilities.alienation || 0} />
                <h3 className="text-sm"><div className="text-gray-300">
                  
                  {probabilities.alienation <= 20 && "Ryzyko alienacji jest niskie — sytuacja jest stabilna."}
                  {probabilities.alienation > 20 && probabilities.alienation <= 49 && "Ryzyko alienacji jest umiarkowane — warto zachować czujność."}
                  {probabilities.alienation > 49 && probabilities.alienation <= 74 && "Ryzyko alienacji jest wysokie — sytuacja jest napięta."}
                  {probabilities.alienation > 74 && "Ryzyko alienacji krytyczne — alienacja wydaje się już nieunikniona."}</div></h3>
              </div>
              <div>
                <PercentBar label="Znacząca strata finansowa" value={probabilities.financialLoss || 0} />
                <h3 className="text-sm"><div className="text-gray-300">
                  
                  
                  {probabilities.financialLoss <= 20 && "Ryzyko znaczących strat finansowych jest niskie — sytuacja jest stabilna."}
                  {probabilities.financialLoss > 20 && probabilities.financialLoss <= 49 && "Ryzyko znaczących strat finansowych jest umiarkowane — warto zachować czujność."}
                  {probabilities.financialLoss > 49 && probabilities.financialLoss <= 74 && "Ryzyko znaczących strat finansowych jest wysokie — sytuacja jest napięta."}
                  {probabilities.financialLoss > 74 && "Ryzyko znaczących strat finansowych krytyczne — straty są nieuniknione."}</div></h3>
              </div>
            </div>
          </div>

          {/* Prawa sekcja */}
          <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700 overflow-auto">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <TrendingDown /> Pomniejsze ryzyka
            </h3>
            <div className="space-y-2">
              {scenarios && scenarios.length > 0 ? (
                scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)
              ) : (
                <div className="text-gray-300">
                  Brak doprecyzowanych scenariuszy — ryzyko jest niskie lub brak danych.
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Zakończenie i CTA */}
        {conclusion && (
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 border border-blue-700">
            <div className="text-center">
              <p className="text-lg text-gray-200 mb-4 leading-relaxed">
                {conclusion.summary}
              </p>
              {conclusion.cta && (
                <div className="mt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-bold text-lg shadow-lg transition transform hover:scale-105">
                    {conclusion.cta}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
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

        {/* Plan Działania - Oś Czasu */}
        {timeline && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ClipboardCheck /> Plan działania — oś czasu
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {timeline.days30 && <TimelineCard period="30 dni" tasks={timeline.days30} />}
              {timeline.days90 && <TimelineCard period="90 dni" tasks={timeline.days90} />}
              {timeline.days365 && <TimelineCard period="365 dni" tasks={timeline.days365} />}
            </div>
          </div>
        )}

        {/* Profile Psychologiczne */}
        {psychologicalProfiles && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Brain /> Wasze profile psychologiczne
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {psychologicalProfiles.user && (
                <PsychologicalProfile
                  title="Twój Profil"
                  traits={psychologicalProfiles.user}
                />
              )}
              {psychologicalProfiles.partner && (
                <PsychologicalProfile
                  title="Profil Partnerki"
                  traits={psychologicalProfiles.partner}
                />
              )}
            </div>
          </div>
        )}


        {/* Rekomendowane Lektury */}
        {readingList && readingList.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpenText /> Przydatne lektury
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {readingList.map((book, i) => (
                <BookRecommendation key={i} book={book} />
              ))}
            </div>
          </div>
        )}





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
