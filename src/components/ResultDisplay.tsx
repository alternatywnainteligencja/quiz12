// ResultDisplay.tsx
// Główny komponent prezentujący wyniki analizy ryzyka z dodatkowymi sekcjami,
// profilami psychologicznymi, planem działań, rekomendacjami, lekturami i CTA.

import React from "react";
import {
  TrendingDown,
  Shield,
  FileText,
  RefreshCw,
  Brain,
  BookOpen,
  Calendar,
  Target,
  Lightbulb,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ProbabilityKeys =
  | "divorce"
  | "falseAccusation"
  | "alienation"
  | "financialLoss";

interface ActionItem {
  priority: string;
  action: string;
}

interface Recommendation {
  type: string;
  text: string;
}

interface Scenario {
  scenario: string;
  probability: number;
  why?: string;
  impact?: string;
}

interface Reading {
  title: string;
  link: string;
}

interface ResultData {
  riskLevel: string;
  confidence: number;
  mainTitle: string;
  mainDescription: string;
  probabilities: Record<ProbabilityKeys, number>;
  scenarios?: Scenario[];
  actionItems?: ActionItem[];
  recommendations?: Recommendation[];
  meta?: any;

  // nowe pola:
  meaningForYou?: string;
  profileYou?: string;
  profilePartner?: string;
  plan30?: string[];
  plan90?: string[];
  plan365?: string[];
  readings?: Reading[];
  callToAction?: string;
}

interface ResultDisplayProps {
  result: ResultData | null;
  onRestart: () => void;
}

const riskColors: Record<string, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-400",
  high: "bg-orange-500",
  critical: "bg-red-600",
};

const RiskBadge: React.FC<{ level: string; confidence: number }> = ({
  level,
  confidence,
}) => {
  const color = riskColors[level] || "bg-gray-500";
  return (
    <div className={`rounded-xl p-4 ${color} bg-opacity-90 shadow-lg text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold uppercase">Poziom ryzyka</div>
          <div className="text-2xl font-extrabold tracking-tight">
            {level?.toUpperCase?.() || "N/A"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm">Pewność</div>
          <div className="text-2xl font-bold">{confidence ?? 0}%</div>
        </div>
      </div>
    </div>
  );
};

const PercentBar: React.FC<{ label: string; value: number; tooltip: string }> = ({
  label,
  value,
  tooltip,
}) => {
  const v = Math.round(value || 0);
  const barColor =
    v >= 75 ? "bg-red-500" : v >= 45 ? "bg-orange-400" : "bg-green-500";
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <div className="flex justify-between mb-1">
              <div className="text-sm font-semibold">{label}</div>
              <div className="text-sm font-mono">{v}%</div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div className={`${barColor} h-3`} style={{ width: `${v}%` }} />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ScenarioCard: React.FC<{ s: Scenario }> = ({ s }) => (
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

const ActionItemBlock: React.FC<{ a: ActionItem }> = ({ a }) => {
  const bg =
    a.priority === "KRYTYCZNY"
      ? "bg-red-700 border-red-500"
      : a.priority === "WYSOKI"
      ? "bg-orange-600 border-orange-400"
      : "bg-gray-700 border-gray-600";
  return (
    <div className={`rounded-md p-3 bg-opacity-30 border-l-4 ${bg}`}>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold uppercase px-2 py-1 bg-black bg-opacity-30 rounded">
          {a.priority}
        </span>
        <div className="text-gray-200">{a.action}</div>
      </div>
    </div>
  );
};

const RecommendationList: React.FC<{ recs: Recommendation[] }> = ({ recs }) => {
  const grouped = recs.reduce((acc: Record<string, string[]>, r) => {
    acc[r.type] = acc[r.type] || [];
    acc[r.type].push(r.text);
    return acc;
  }, {});
  return (
    <div className="space-y-3">
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="capitalize font-bold mb-2">{type}</div>
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

const ProfileSection: React.FC<{ title: string; description?: string; icon: any; tooltip: string }> = ({
  title,
  description,
  icon: Icon,
  tooltip,
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
            <Icon className="text-blue-400" /> {title}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {description || "Brak danych do analizy."}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const PlanItem: React.FC<{ days: number; actions?: string[] }> = ({
  days,
  actions = [],
}) => (
  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
    <h4 className="text-lg font-bold mb-2">Plan na {days} dni</h4>
    <ul className="list-disc list-inside text-gray-300 space-y-1">
      {actions.length > 0
        ? actions.map((a, i) => <li key={i}>{a}</li>)
        : "Brak zaleceń na ten okres."}
    </ul>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onRestart }) => {
  if (!result) return null;
  const {
    riskLevel,
    confidence,
    mainTitle,
    mainDescription,
    probabilities,
    scenarios,
    actionItems = [],
    recommendations = [],
    meta,
    meaningForYou,
    profileYou,
    profilePartner,
    plan30,
    plan90,
    plan365,
    readings = [],
    callToAction,
  } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* --- Poziom ryzyka --- */}
        <RiskBadge level={riskLevel} confidence={confidence} />

        {/* --- Co to znaczy dla Ciebie --- */}
        <div className="mt-4 bg-gray-800 rounded-lg p-5 border border-gray-700">
          <h2 className="text-xl font-bold mb-2">Co to znaczy dla Ciebie</h2>
          <p className="text-gray-300">
            {meaningForYou ||
              "Obecny poziom ryzyka sugeruje, że warto przyjrzeć się bliżej dynamice relacji i własnym wzorcom zachowań."}
          </p>
        </div>

        {/* --- Profil psychologiczny Twój / Partnerki --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileSection
            title="Twój profil psychologiczny"
            description={profileYou}
            icon={Brain}
            tooltip="Analiza Twoich wzorców emocjonalnych, reakcji i postaw."
          />
          <ProfileSection
            title="Profil psychologiczny partnerki"
            description={profilePartner}
            icon={Shield}
            tooltip="Analiza przewidywanych schematów zachowań partnerki."
          />
        </div>

        {/* --- Scenariusze --- */}
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

        {/* --- Kluczowe ryzyka --- */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Target /> Kluczowe ryzyka
          </h3>
          <PercentBar
            label="Rozwód / separacja"
            value={probabilities.divorce}
            tooltip="Prawdopodobieństwo rozpadu relacji w ciągu najbliższego roku."
          />
          <PercentBar
            label="Fałszywe oskarżenia"
            value={probabilities.falseAccusation}
            tooltip="Ryzyko doświadczenia niesprawiedliwych zarzutów."
          />
          <PercentBar
            label="Alienacja dzieci"
            value={probabilities.alienation}
            tooltip="Prawdopodobieństwo utrudnionego kontaktu z dziećmi."
          />
          <PercentBar
            label="Strata finansowa"
            value={probabilities.financialLoss}
            tooltip="Potencjalne straty majątkowe wynikające z relacji lub rozpadu."
          />
        </div>

        {/* --- Plan działań --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlanItem days={30} actions={plan30} />
          <PlanItem days={90} actions={plan90} />
          <PlanItem days={365} actions={plan365} />
        </div>

        {/* --- Rekomendacje --- */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb /> Rekomendacje
          </h3>
          <RecommendationList recs={recommendations} />
        </div>

        {/* --- Proponowane lektury --- */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BookOpen /> Proponowane lektury
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {readings.length > 0
              ? readings.map((r, i) => (
                  <li key={i}>
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {r.title}
                    </a>
                  </li>
                ))
              : "Brak proponowanych materiałów."}
          </ul>
        </div>

        {/* --- Call to Action --- */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
          <h3 className="text-2xl font-bold mb-2">Podsumowanie i dalsze kroki</h3>
          <p className="text-gray-300 mb-4">
            {callToAction ||
              "Podejmij pierwszy krok już dziś — zidentyfikuj obszary, w których możesz wprowadzić zmianę."}
          </p>
          <button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold text-white flex items-center gap-2 mx-auto"
          >
            <RefreshCw /> Zacznij ponownie
          </button>
        </div>

        {/* --- Debug / meta --- */}
        {meta && (
          <details className="bg-black bg-opacity-30 rounded p-3 text-xs text-gray-300">
            <summary className="cursor-pointer font-medium">Debug / meta</summary>
            <pre className="whitespace-pre-wrap mt-2 text-xs">
              {JSON.stringify(meta, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
