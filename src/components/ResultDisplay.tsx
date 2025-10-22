import React from "react";
import {
  TrendingDown,
  Shield,
  RefreshCw,
  Brain,
  BookOpen,
  Target,
  Lightbulb,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Typy i interfejsy
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
  mainTitle?: string;
  mainDescription?: string;
  probabilities: Partial<Record<ProbabilityKeys, number>>;
  scenarios?: Scenario[];
  actionItems?: ActionItem[];
  recommendations?: Recommendation[];
  meta?: any;
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
  result: ResultData;
  onRestart: () => void;
}

// Komponenty pomocnicze
const RiskBadge: React.FC<{ level: string; confidence: number }> = ({
  level = "unknown",
  confidence = 0,
}) => {
  const riskColors: Record<string, string> = {
    low: "bg-green-500",
    medium: "bg-yellow-400",
    high: "bg-orange-500",
    critical: "bg-red-600",
    unknown: "bg-gray-500",
  };

  const color = riskColors[level.toLowerCase()] || riskColors.unknown;

  return (
    <div className={`rounded-xl p-4 ${color} bg-opacity-90 shadow-lg text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold uppercase">Poziom ryzyka</div>
          <div className="text-2xl font-extrabold tracking-tight">
            {level.toUpperCase()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm">Pewność</div>
          <div className="text-2xl font-bold">{confidence}%</div>
        </div>
      </div>
    </div>
  );
};

const PercentBar: React.FC<{ label: string; value?: number; tooltip: string }> = ({
  label,
  value = 0,
  tooltip,
}) => {
  const v = Math.round(value);
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
              <div
                className={`${barColor} h-3 transition-all duration-500`}
                style={{ width: `${v}%` }}
              />
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

const ScenarioCard: React.FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-bold text-lg">{scenario.scenario}</h4>
      <div className="text-2xl font-extrabold text-red-400">
        {Math.round(scenario.probability)}%
      </div>
    </div>
    <p className="text-gray-300">{scenario.why || scenario.impact || ""}</p>
  </div>
);

const ProfileSection: React.FC<{
  title: string;
  description?: string;
  icon: any;
  tooltip: string;
}> = ({ title, description, icon: Icon, tooltip }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
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

const PlanSection: React.FC<{ days: number; actions?: string[] }> = ({
  days,
  actions = [],
}) => (
  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
    <h4 className="text-lg font-bold mb-2">Plan na {days} dni</h4>
    <ul className="list-disc list-inside text-gray-300 space-y-1">
      {actions.length > 0 ? (
        actions.map((action, idx) => <li key={idx}>{action}</li>)
      ) : (
        <li>Brak zaleceń na ten okres.</li>
      )}
    </ul>
  </div>
);

// Główny komponent
const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onRestart }) => {
  if (!result?.riskLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Brak danych do wyświetlenia</h2>
          <button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold text-white flex items-center gap-2 mx-auto"
          >
            <RefreshCw /> Rozpocznij ponownie
          </button>
        </div>
      </div>
    );
  }

  const {
    riskLevel,
    confidence = 0,
    meaningForYou,
    profileYou,
    profilePartner,
    probabilities = {},
    scenarios = [],
    recommendations = [],
    plan30 = [],
    plan90 = [],
    plan365 = [],
    readings = [],
    callToAction,
  } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <RiskBadge level={riskLevel} confidence={confidence} />

        <div className="mt-4 bg-gray-800 rounded-lg p-5 border border-gray-700">
          <h2 className="text-xl font-bold mb-2">Co to znaczy dla Ciebie</h2>
          <p className="text-gray-300">
            {meaningForYou ||
              "Na podstawie analizy Twoich odpowiedzi, przygotowaliśmy szczegółową ocenę sytuacji."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileSection
            title="Twój profil psychologiczny"
            description={profileYou}
            icon={Brain}
            tooltip="Analiza Twoich wzorców emocjonalnych i zachowań"
          />
          <ProfileSection
            title="Profil psychologiczny partnerki"
            description={profilePartner}
            icon={Shield}
            tooltip="Analiza przewidywanych schematów zachowań partnerki"
          />
        </div>

        {scenarios.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <TrendingDown /> Scenariusze — prawdopodobieństwa
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarios.map((s, idx) => (
                <ScenarioCard key={idx} scenario={s} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Target /> Kluczowe ryzyka
          </h3>
          <PercentBar
            label="Rozwód / separacja"
            value={probabilities.divorce}
            tooltip="Prawdopodobieństwo rozpadu relacji"
          />
          <PercentBar
            label="Fałszywe oskarżenia"
            value={probabilities.falseAccusation}
            tooltip="Ryzyko doświadczenia niesprawiedliwych zarzutów"
          />
          <PercentBar
            label="Alienacja dzieci"
            value={probabilities.alienation}
            tooltip="Prawdopodobieństwo utrudnionego kontaktu z dziećmi"
          />
          <PercentBar
            label="Strata finansowa"
            value={probabilities.financialLoss}
            tooltip="Potencjalne straty majątkowe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlanSection days={30} actions={plan30} />
          <PlanSection days={90} actions={plan90} />
          <PlanSection days={365} actions={plan365} />
        </div>

        {recommendations.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Lightbulb /> Rekomendacje
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-gray-700 rounded-lg p-4 border border-gray-600"
                >
                  <div className="font-bold mb-2 capitalize">{rec.type}</div>
                  <p className="text-gray-300">{rec.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {readings.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <BookOpen /> Proponowane lektury
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {readings.map((r, idx) => (
                <li key={idx}>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
          <h3 className="text-2xl font-bold mb-2">Podsumowanie i dalsze kroki</h3>
          <p className="text-gray-300 mb-4">
            {callToAction ||
              "Podejmij pierwszy krok już dziś — zidentyfikuj obszary, w których możesz wprowadzić zmianę."}
          </p>
          <button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold text-white flex items-center gap-2 mx-auto transition-colors"
          >
            <RefreshCw /> Zacznij ponownie
          </button>
        </div>

        {result.meta && (
          <details className="bg-black bg-opacity-30 rounded p-3 text-xs text-gray-300">
            <summary className="cursor-pointer font-medium">Debug / meta</summary>
            <pre className="whitespace-pre-wrap mt-2 text-xs">
              {JSON.stringify(result.meta, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
