
/**
 * Nowa wersja obliczeń używająca wag z Google Sheets
 * Kalkuluje rzeczywiste ryzyko na podstawie odpowiedzi użytkownika
 */

import { fetchWeightsWithCache, type WeightsData } from '../services/googleSheetsService';

interface CalculationResult {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  mainTitle: string;
  mainDescription: string;
  
  // NOWE: Procentowe ryzyka
  overallRiskPercentage: number;
  riskBreakdown: Record<string, number>; // { "Rozstanie/Rozwód": 45, ... }
  
  probabilities: {
    divorce: number;
    falseAccusation: number;
    alienation: number;
    financialLoss: number;
  };
  scenarios: Array<{
    scenario: string;
    probability: number;
    why: string;
    impactScore: number;
  }>;
  actionItems: Array<{
    priority: string;
    action: string;
  }>;
  recommendations: Array<{
    type: string;
    text: string;
  }>;
  timeline: {
    days30: string[];
    days90: string[];
    days365: string[];
  };
  readingList: Array<{
    title: string;
    author: string;
    description: string;
  }>;
  psychologicalProfiles: {
    user: Array<{ label: string; value: string }>;
    partner: Array<{ label: string; value: string }>;
  };
  conclusion: {
    summary: string;
    cta: string;
  };
  meta: {
    source: string;
    score: number;
    generatedAt: string;
    totalQuestions: number;
    answeredQuestions: number;
  };
}

// Cache dla wag
let weightsDataCache: WeightsData | null = null;

async function getWeightsData(): Promise<WeightsData> {
  if (!weightsDataCache) {
    weightsDataCache = await fetchWeightsWithCache();
  }
  return weightsDataCache;
}

/**
 * Główna funkcja kalkulująca ryzyko
 */
async function calculateRisk(
  answers: Record<string, string>,
  pathway: string
): Promise<CalculationResult> {
  const weightsData = await getWeightsData();
  
  // 1. Zbierz punkty ryzyka dla każdej odpowiedzi
  let totalRiskPoints = 0;
  let maxPossiblePoints = 0;
  const riskScores: Record<string, number> = {};
  
  Object.entries(answers).forEach(([questionId, answerText]) => {
    // Znajdź wagę dla tej kombinacji pytanie + odpowiedź
    const weight = weightsData.weights.find(
      w => w.questionId === questionId && w.answer === answerText
    );
    
    if (weight) {
      totalRiskPoints += weight.riskPoints;
      
      // Dodaj do głównego ryzyka
      if (weight.mainRisk && weight.mainRisk !== '-') {
        riskScores[weight.mainRisk] = (riskScores[weight.mainRisk] || 0) + weight.riskPoints;
      }
      
      // Dodaj do ryzyk pobocznych (z mniejszą wagą)
      weight.sideRisks.forEach(sideRisk => {
        if (sideRisk && sideRisk !== '-') {
          riskScores[sideRisk] = (riskScores[sideRisk] || 0) + (weight.riskPoints * 0.5);
        }
      });
    }
    
    // Zakładamy max 10 punktów na pytanie
    maxPossiblePoints += 10;
  });
  
  // 2. Oblicz procentowe ryzyko ogólne
  const overallRiskPercentage = maxPossiblePoints > 0 
    ? Math.round((totalRiskPoints / maxPossiblePoints) * 100)
    : 0;
  
  // 3. Oblicz procentowy breakdown dla każdej kategorii
  const totalCategoryPoints = Object.values(riskScores).reduce((sum, val) => sum + val, 0);
  const riskBreakdown: Record<string, number> = {};
  
  Object.entries(riskScores).forEach(([category, points]) => {
    riskBreakdown[category] = totalCategoryPoints > 0
      ? Math.round((points / totalCategoryPoints) * 100)
      : 0;
  });
  
  // 4. Określ poziom ryzyka
  let riskLevel: 'low' | 'medium' | 'high' | 'critical';
  if (overallRiskPercentage < 25) riskLevel = 'low';
  else if (overallRiskPercentage < 50) riskLevel = 'medium';
  else if (overallRiskPercentage < 75) riskLevel = 'high';
  else riskLevel = 'critical';
  
  // 5. Pobierz szablon contentu dla pathway
  const template = getContentTemplate(pathway, riskLevel);
  
  // 6. Zwróć wynik
  return {
    ...template,
    riskLevel,
    overallRiskPercentage,
    riskBreakdown,
    confidence: Math.min(95, 70 + (Object.keys(answers).length * 0.5)),
    meta: {
      source: pathway,
      score: overallRiskPercentage,
      generatedAt: new Date().toISOString(),
      totalQuestions: 50, // Zakładamy 50 pytań na ścieżkę
      answeredQuestions: Object.keys(answers).length
    }
  };
}

/**
 * Szablony contentu dla różnych ścieżek i poziomów ryzyka
 */
function getContentTemplate(pathway: string, riskLevel: string): Partial<CalculationResult> {
  // Mapowanie pathway -> content
  const templates: Record<string, any> = {
    before: {
      low: {
        mainTitle: "Stabilny początek - obserwuj i buduj",
        mainDescription: "Twój związek wydaje się być na dobrej drodze. Większość wskaźników jest pozytywna, ale nie zapominaj o ciągłej pracy nad komunikacją i wzajemnym zrozumieniem.",
      },
      medium: {
        mainTitle: "Wczesny etap - obserwuj sygnały ostrzegawcze",
        mainDescription: "Związek wydaje się stabilny, ale powoli coś zaczyna się przesuwać pod powierzchnią. Drobne zmiany w tonie rozmów, coraz krótsze wiadomości, mniej spontaniczności - to nie przypadek.",
      },
      high: {
        mainTitle: "Sygnały ostrzegawcze - czas na działanie",
        mainDescription: "Twój związek wykazuje niepokojące wzorce. Nie ignoruj tego co widzisz. To moment na poważną analizę i potencjalne działania korygujące.",
      },
      critical: {
        mainTitle: "Wysokie ryzyko - natychmiastowa interwencja",
        mainDescription: "Sytuacja jest poważna. Wzorce zachowań wskazują na wysokie prawdopodobieństwo problemów. Potrzebujesz profesjonalnej pomocy i konkretnego planu działania.",
      }
    },
    crisis: {
      low: {
        mainTitle: "Kryzys opanowany - kontynuuj pracę",
        mainDescription: "Mimo trudności, jesteś na dobrej drodze do rozwiązania kryzysu. Kontynuuj obecne działania.",
      },
      medium: {
        mainTitle: "Kryzys - relacja na ostrzu noża",
        mainDescription: "To moment, w którym emocje zaczynają dominować nad rozsądkiem. Każde słowo może zostać źle zinterpretowane, każda reakcja może sprowokować konflikt.",
      },
      high: {
        mainTitle: "Głęboki kryzys - pilna interwencja",
        mainDescription: "Sytuacja eskaluje. Potrzebujesz natychmiastowego wsparcia profesjonalistów i strategicznego podejścia.",
      },
      critical: {
        mainTitle: "Kryzys krytyczny - zabezpiecz się",
        mainDescription: "Jesteś w epicentrum kryzysu. Priorytetem jest Twoje bezpieczeństwo i zabezpieczenie interesów. Działaj szybko i mądrze.",
      }
    },
    divorce: {
      low: {
        mainTitle: "Proces pod kontrolą",
        mainDescription: "Mimo rozstania, proces przebiega relatywnie spokojnie. Utrzymuj ten stan.",
      },
      medium: {
        mainTitle: "Rozstanie - czas na zimną analizę",
        mainDescription: "Rozstanie to nie tylko emocjonalne trzęsienie ziemi – to również test charakteru, spokoju i odporności.",
      },
      high: {
        mainTitle: "Trudne rozstanie - maksymalne zabezpieczenie",
        mainDescription: "Proces rozwodowy jest konfliktowy. Każdy krok musi być przemyślany i skonsultowany z prawnikiem.",
      },
      critical: {
        mainTitle: "Rozwód wysokiego konfliktu - ochrona priorytetem",
        mainDescription: "Jesteś w sytuacji ekstremalnie trudnej. Zabezpieczenie Twoje i Twoich dzieci jest najważniejsze. Nie działaj samodzielnie.",
      }
    },
    married: {
      low: {
        mainTitle: "Zdrowy związek - utrzymuj balans",
        mainDescription: "Twój związek jest stabilny i zdrowy. Kontynuuj dobre praktyki i nie zapominaj o rozwoju osobistym.",
      },
      medium: {
        mainTitle: "Stały związek - utrzymaj równowagę",
        mainDescription: "Stabilny związek to nie koniec czujności – to dopiero początek innej formy odpowiedzialności.",
      },
      high: {
        mainTitle: "Rutyna zabija - ożyw związek",
        mainDescription: "Związek popadł w rutynę, która zaczyna być toksyczna. Potrzeba świeżych bodźców i odnowy.",
      },
      critical: {
        mainTitle: "Stagnacja zaawansowana - pilne zmiany",
        mainDescription: "Związek jest w stanie zaawansowanej stagnacji. Bez radykalnych zmian może to doprowadzić do rozpadu.",
      }
    }
  };

  const pathwayTemplates = templates[pathway] || templates.before;
  const template = pathwayTemplates[riskLevel] || pathwayTemplates.medium;

  // Uzupełnij resztę contentu (można to rozbudować)
  return {
    ...template,
    probabilities: generateProbabilities(riskLevel),
    scenarios: generateScenarios(pathway, riskLevel),
    actionItems: generateActionItems(riskLevel),
    recommendations: generateRecommendations(pathway),
    timeline: generateTimeline(pathway),
    readingList: generateReadingList(pathway),
    psychologicalProfiles: generateProfiles(pathway, riskLevel),
    conclusion: generateConclusion(riskLevel)
  };
}

// Pomocnicze funkcje generujące content (możesz je dostosować)
function generateProbabilities(riskLevel: string) {
  const base = {
    low: { divorce: 15, falseAccusation: 5, alienation: 10, financialLoss: 10 },
    medium: { divorce: 35, falseAccusation: 10, alienation: 15, financialLoss: 20 },
    high: { divorce: 70, falseAccusation: 25, alienation: 30, financialLoss: 55 },
    critical: { divorce: 95, falseAccusation: 35, alienation: 60, financialLoss: 80 }
  };
  return base[riskLevel as keyof typeof base] || base.medium;
}

function generateScenarios(pathway: string, riskLevel: string) {
  return [
    {
      scenario: "Stopniowe oddalanie się",
      probability: 50,
      why: "Brak komunikacji i wspólnych celów",
      impactScore: 6
    }
  ];
}

function generateActionItems(riskLevel: string) {
  const items = {
    low: [
      { priority: "NISKI", action: "Kontynuuj obecne dobre praktyki" }
    ],
    medium: [
      { priority: "ŚREDNI", action: "Zwiększ obserwację wzorców zachowań" },
      { priority: "ŚREDNI", action: "Rozważ rozmowę o stanie relacji" }
    ],
    high: [
      { priority: "WYSOKI", action: "Zasięgnij profesjonalnej porady" },
      { priority: "WYSOKI", action: "Zabezpiecz ważne dokumenty" }
    ],
    critical: [
      { priority: "KRYTYCZNY", action: "Natychmiastowa konsultacja prawna" },
      { priority: "KRYTYCZNY", action: "Zabezpiecz finanse i komunikację" }
    ]
  };
  return items[riskLevel as keyof typeof items] || items.medium;
}

function generateRecommendations(pathway: string) {
  return [
    { type: "komunikacja", text: "Mów krótko i konkretnie" },
    { type: "mentalne", text: "Zachowaj spokój i obiektywizm" }
  ];
}

function generateTimeline(pathway: string) {
  const timelines: Record<string, any> = {
    before: {
      days30: [
        "Zacznij prowadzić dziennik obserwacji - zapisuj zmiany w zachowaniu, rozmowach i emocjach",
        "Wzmocnij swoją niezależność: spotkania ze znajomymi, hobby, rozwój osobisty",
        "Nie konfrontuj się emocjonalnie - zachowaj spokój i zbieraj fakty"
      ],
      days90: [
        "Oceń czy sytuacja się poprawia czy pogarsza - bądź obiektywny",
        "Rozważ rozmowę z terapeutą lub coachem relacji, aby lepiej zrozumieć dynamikę",
        "Ustanów granice - jasno komunikuj swoje potrzeby bez agresji"
      ],
      days365: [
        "Podejmij decyzję: czy chcesz kontynuować związek czy przygotować się na rozstanie",
        "Jeśli decydujesz się na kontynuację - ustal wspólne cele i plan naprawy relacji",
        "Jeśli decydujesz się na rozstanie - przygotuj się prawnie i finansowo"
      ]
    },
    crisis: {
      days30: [
        "Skonsultuj się z prawnikiem specjalizującym się w prawie rodzinnym - poznaj swoje prawa",
        "Zabezpiecz wszystkie ważne dokumenty: finansowe, własności, komunikację",
        "Ogranicz kontakt do minimum - komunikuj się krótkimi wiadomościami, tylko o konkretach",
        "NIE podpisuj żadnych dokumentów bez konsultacji prawnej"
      ],
      days90: [
        "Jeśli są dzieci: ustal tymczasowy harmonogram kontaktów z pomocą prawnika lub mediatora",
        "Oddziel finanse: osobne konta, kontrola wydatków, dokumentacja przepływów pieniężnych",
        "Zacznij budować sieć wsparcia: zaufani przyjaciele, terapeuta, grupa wsparcia",
        "Przygotuj plan awaryjny na różne scenariusze (nagły wyjazd partnerki, eskalacja konfliktu)"
      ],
      days365: [
        "Jeśli dojdzie do rozwodu: doprowadź sprawę do końca z pełnym wsparciem prawnym",
        "Odbuduj stabilność finansową i emocjonalną - nowe cele, rutyny, nawyki",
        "Pracuj z terapeutą nad przetworzeniem doświadczeń i odzyskaniem równowagi",
        "Jeśli są dzieci: buduj silną, stabilną relację z nimi mimo okoliczności"
      ]
    },
    divorce: {
      days30: [
        "NATYCHMIAST: Zabezpiecz wszystkie dokumenty finansowe, umowy, akty własności",
        "KRYTYCZNE: Nie rób ŻADNYCH ruchów finansowych bez prawnika (przelewy, kredyty, sprzedaż)",
        "Zmień hasła do wszystkich kont online, email, bankowość elektroniczna",
        "Dokumentuj WSZYSTKO: SMS-y, email, rozmowy (jeśli legalne), zdarzenia - zachowuj obiektywność",
        "Jeśli są dzieci: ustal natychmiastowy plan kontaktów przez prawnika lub sąd"
      ],
      days90: [
        "Sfinalizuj podział majątku z pomocą prawnika - nie ustępuj pod presją emocjonalną",
        "Ustabilizuj sytuację finansową: nowe konto, budżet, kontrola wydatków",
        "Jeśli są dzieci: walcz o sprawiedliwy harmonogram kontaktów - nie akceptuj dobroci drugiej strony",
        "Zacznij pracę z terapeutą nad przetworzeniem traumy i odbudową pewności siebie",
        "Odciąć toksyczne kontakty - priorytetem jest Twoje zdrowie psychiczne"
      ],
      days365: [
        "Zamknij prawnie wszystkie sprawy rozwodowe - nie zostawiaj luźnych końców",
        "Odbuduj życie: nowe cele zawodowe, społeczne, fizyczne",
        "Jeśli są dzieci: utrzymuj stabilną, przewidywalną relację z nimi - bądź obecny i spokojny",
        "Pracuj nad sobą: trening, rozwój, nowe znajomości - odzyskaj siłę i autonomię",
        "Wyciągnij wnioski: co byś zrobił inaczej? Jak uniknąć podobnej sytuacji w przyszłości?"
      ]
    },
    married: {
      days30: [
        "Oceń obecny stan relacji: czy oboje rozwijają się czy stoi w miejscu?",
        "Zaplanuj wspólną aktywność poza rutyną: wycieczka, nowe hobby, kurs",
        "Zadbaj o swoją przestrzeń: regularny trening, spotkania z przyjaciółmi, rozwój osobisty"
      ],
      days90: [
        "Wprowadź małe zmiany: nowe nawyki, wspólne projekty, odmieniona komunikacja",
        "Oceń czy partnerka też rozwija się i ma swoje cele - niezależność to klucz",
        "Upewnij się, że finanse są przejrzyste i oboje macie kontrolę nad budżetem"
      ],
      days365: [
        "Podsumuj rok: co się udało, co wymaga poprawy?",
        "Ustalcie wspólnie cele na kolejny rok - zarówno relacyjne jak i indywidualne",
        "Dbaj o równowagę: nie zaniedbuj siebie ani relacji - stała praca to podstawa"
      ]
    }
  };
  
  return timelines[pathway] || timelines.before;
}

function generateReadingList(pathway: string) {
  const lists: Record<string, any> = {
    before: [
      {
        title: "Męska energia w związku",
        author: "David Deida",
        description: "Jak utrzymać siłę i autonomię w relacji nie tracąc bliskości"
      },
      {
        title: "Attached",
        author: "Amir Levine",
        description: "Zrozumienie stylów przywiązania i ich wpływu na relacje"
      },
      {
        title: "No More Mr. Nice Guy",
        author: "Robert Glover",
        description: "Jak przestać się dostosowywać i odzyskać męską pewność siebie"
      }
    ],
    crisis: [
      {
        title: "Prawo rodzinne dla ojców",
        author: "Zespół prawników",
        description: "Praktyczny przewodnik po prawach ojców w Polsce - alimenty, kontakty, podział majątku"
      },
      {
        title: "48 praw władzy",
        author: "Robert Greene",
        description: "Strategiczne myślenie w trudnych sytuacjach - nie daj się manipulować"
      },
      {
        title: "Emocjonalna inteligencja 2.0",
        author: "Travis Bradberry",
        description: "Jak kontrolować emocje w sytuacjach kryzysowych"
      },
      {
        title: "Granice w związkach",
        author: "Henry Cloud",
        description: "Jak ustalać i utrzymywać zdrowe granice"
      }
    ],
    divorce: [
      {
        title: "Rozwód i alimenty - praktyczny poradnik",
        author: "Kancelaria prawna",
        description: "Kompleksowy przewodnik po procesie rozwodowym w Polsce"
      },
      {
        title: "Ojcowie po rozwodzie",
        author: "Eksperci prawa rodzinnego",
        description: "Jak walczyć o prawa do dzieci i uniknąć alienacji rodzicielskiej"
      },
      {
        title: "Sztuka wojny",
        author: "Sun Tzu",
        description: "Starożytna mądrość o strategii - zachowaj spokój i myśl długoterminowo"
      },
      {
        title: "Odporność psychiczna",
        author: "Monika Górska",
        description: "Jak przetrwać najtrudniejsze momenty i wyjść silniejszym"
      },
      {
        title: "Medytacje",
        author: "Marek Aureliusz",
        description: "Stoicka filozofia w czasach chaosu - kontroluj tylko to, co kontrolować możesz"
      }
    ],
    married: [
      {
        title: "5 języków miłości",
        author: "Gary Chapman",
        description: "Jak skutecznie komunikować uczucia i potrzeby w długoletnim związku"
      },
      {
        title: "Paradoks wyboru",
        author: "Barry Schwartz",
        description: "Dlaczego w stabilnym związku warto doceniać to, co masz"
      },
      {
        title: "Siła woli",
        author: "Kelly McGonigal",
        description: "Jak kontrolować impulsywne reakcje i budować dobre nawyki"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        description: "Małe zmiany, wielkie efekty - rozwój osobisty w praktyce"
      }
    ]
  };
  
  return lists[pathway] || lists.before;
}

function generateProfiles(pathway: string, riskLevel: string) {
  const profiles: Record<string, any> = {
    before: {
      user: [
        { label: "Stan emocjonalny", value: "Niepewność i wyczulenie na sygnały" },
        { label: "Dominujący wzorzec", value: "Analityczne podejście, próba zrozumienia sytuacji" },
        { label: "Główne wyzwanie", value: "Balansowanie między troską a niepotrzebnym przejmowaniem się" }
      ],
      partner: [
        { label: "Obserwowane zachowanie", value: "Stopniowe dystansowanie się, mniejsze zaangażowanie" },
        { label: "Możliwy wzorzec", value: "Unikanie konfrontacji lub przygotowanie do zmiany" },
        { label: "Sygnały ostrzegawcze", value: "Krótsze rozmowy, mniej spontaniczności, emocjonalny chłód" }
      ]
    },
    crisis: {
      user: [
        { label: "Stan emocjonalny", value: "Wysoki stres, walka o zachowanie kontroli nad sytuacją" },
        { label: "Dominujący wzorzec", value: "Próba ratowania relacji vs świadomość nieuchronności zmian" },
        { label: "Ryzyko", value: "Impulsywne reakcje pod wpływem stresu - MUSISZ zachować spokój" },
        { label: "Siła", value: "Zdolność do strategicznego myślenia jeśli opanujesz emocje" }
      ],
      partner: [
        { label: "Obserwowane zachowanie", value: "Eskalacja napięcia, możliwa manipulacja emocjonalna" },
        { label: "Możliwy wzorzec", value: "Przygotowanie do rozstania lub próba odzyskania kontroli przez konflikt" },
        { label: "Sygnały alarmowe", value: "Agresja werbalna, groźby, izolowanie Cię od dzieci lub majątku" },
        { label: "Prawdopodobna strategia", value: "Może próbować kontrolować narrację i przedstawić siebie jako ofiarę" }
      ]
    },
    divorce: {
      user: [
        { label: "Stan emocjonalny", value: "Ekstremalne przeciążenie - żal, złość, poczucie krzywdy, strach o przyszłość" },
        { label: "Ryzyko", value: "WYSOKIE - możliwe impulsywne decyzje, które będą miały długoterminowe konsekwencje" },
        { label: "Priorytet", value: "Zachowanie spokoju i kontroli nad emocjami - NIE reaguj impulsywnie" },
        { label: "Długoterminowy cel", value: "Odbudowa życia i poczucia własnej wartości po traumie" }
      ],
      partner: [
        { label: "Możliwe zachowanie", value: "Agresja, manipulacja, używanie dzieci jako narzędzia nacisku" },
        { label: "Strategia", value: "Kontrola narracji: przedstawienie siebie jako ofiary, Ciebie jako agresora" },
        { label: "Zagrożenia", value: "Fałszywe oskarżenia, izolowanie od dzieci, walka o majątek za wszelką cenę" },
        { label: "Twoja obrona", value: "Dokumentacja, prawnik, spokój, ZERO emocjonalnych reakcji" }
      ]
    },
    married: {
      user: [
        { label: "Stan emocjonalny", value: "Stabilny, jednak ryzyko rutyny i stagnacji" },
        { label: "Dominujący wzorzec", value: "Potrzeba równowagi między bliskością a autonomią" },
        { label: "Priorytet", value: "Rozwój osobisty i utrzymanie niezależności w relacji" },
        { label: "Wyzwanie", value: "Nie zatracić się w relacji - pozostań sobą" }
      ],
      partner: [
        { label: "Obserwowane zachowanie", value: "Stabilne, ale może potrzebować nowych bodźców" },
        { label: "Możliwy wzorzec", value: "Zadowolenie lub powolne wypalanie się przez rutynę" },
        { label: "Co obserwować", value: "Czy partnerka rozwija się i ma swoje cele? Czy komunikacja jest otwarta?" },
        { label: "Sygnały ostrzegawcze", value: "Coraz mniej rozmów o przyszłości, marazm, brak inicjatyw" }
      ]
    }
  };
  
  return profiles[pathway] || profiles.before;
}

function generateConclusion(riskLevel: string) {
  return {
    summary: "Zachowaj spokój i działaj strategicznie.",
    cta: "Rozpocznij działanie już dziś"
  };
}

// Eksportowane funkcje dla każdej ścieżki
export async function calculateBefore(answers: Record<string, string>) {
  return calculateRisk(answers, 'before');
}

export async function calculateCrisis(answers: Record<string, string>) {
  return calculateRisk(answers, 'crisis');
}

export async function calculateDivorce(answers: Record<string, string>) {
  return calculateRisk(answers, 'divorce');
}

export async function calculateMarried(answers: Record<string, string>) {
  return calculateRisk(answers, 'married');
}
