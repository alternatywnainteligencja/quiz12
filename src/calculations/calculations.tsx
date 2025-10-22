/**
 * Stabilna wersja obliczeń — bez losowości.
 * Dłuższe, realistyczne opisy dla każdego etapu.
 * Zwraca dane spójne z ResultDisplay.tsx.
 */

export function calculateBefore() {
  return makeResult("before");
}

export function calculateCrisis() {
  return makeResult("crisis");
}

export function calculateDivorce() {
  return makeResult("divorce");
}

export function calculateMarried() {
  return makeResult("married");
}

// ======== wspólna funkcja generująca wynik =========
function makeResult(type: string) {
  const map = {
    before: {
      riskLevel: "medium",
      confidence: 82,
      mainTitle: "Wczesny etap — obserwuj sygnały ostrzegawcze",
      mainDescription:
        "Związek wydaje się stabilny, ale powoli coś zaczyna się przesuwać pod powierzchnią. Drobne zmiany w tonie rozmów, coraz krótsze wiadomości, mniej spontaniczności — to nie przypadek. To etap, w którym rodzi się dystans, często niezauważony, dopóki nie jest za późno. Jeśli czujesz, że coś się zmienia, nie ignoruj tego. Nie atakuj, nie szukaj winnych — po prostu obserwuj i zapisuj fakty. To moment na analizę, nie reakcję. Wczesne rozpoznanie wzorców chłodu, unikania lub lekceważenia pozwala zachować kontrolę nad kierunkiem relacji. Mądrość polega na tym, by wiedzieć, kiedy mówić, a kiedy milczeć. Zaufanie jest ważne, ale ślepa wiara – zabójcza.",
      probabilities: {
        divorce: 35,
        falseAccusation: 10,
        alienation: 15,
        financialLoss: 20,
      },
      scenarios: [
        {
          scenario: "Wypalenie emocjonalne",
          probability: 40,
          why: "Rutyna i brak wspólnych celów.",
          impactScore: 5,
        },
        {
          scenario: "Napięcia komunikacyjne",
          probability: 55,
          why: "Nieporozumienia i brak otwartości.",
          impactScore: 6,
        },
      ],
      actionItems: [
        { priority: "WYSOKI", action: "Zwiększ dystans emocjonalny i obserwuj wzorce zachowań." },
        { priority: "ŚREDNI", action: "Nie próbuj na siłę „naprawiać” — słuchaj i analizuj fakty." },
      ],
      recommendations: [
        { type: "komunikacja", text: "Mów krótko i konkretnie. Unikaj emocjonalnych argumentów." },
        { type: "mentalne", text: "Nie idealizuj partnerki — patrz na czyny, nie słowa." },
      ],
    },

    crisis: {
      riskLevel: "high",
      confidence: 88,
      mainTitle: "Kryzys — relacja na ostrzu noża",
      mainDescription:
        "To moment, w którym emocje zaczynają dominować nad rozsądkiem. Każde słowo może zostać źle zinterpretowane, każda reakcja może sprowokować konflikt. Kryzys nie przychodzi nagle — narasta powoli, aż w końcu napięcie staje się codziennością. W tym stanie wiele par traci kontrolę i zaczyna walczyć, zamiast rozmawiać. Nie popełniaj tego błędu. Zachowaj spokój i planuj ruchy jak strateg, nie jak emocjonalny wojownik. Każdy krok powinien mieć cel: utrzymanie godności, bezpieczeństwa i przewagi. Nie próbuj przekonać kogoś, kto nie chce słuchać. Czasem najlepszą reakcją jest cisza i dystans. Kryzys nie musi oznaczać końca – ale zawsze ujawnia, kto naprawdę panuje nad sobą.",
      probabilities: {
        divorce: 70,
        falseAccusation: 25,
        alienation: 30,
        financialLoss: 55,
      },
      scenarios: [
        {
          scenario: "Rozstanie w emocjach",
          probability: 75,
          why: "Brak kontroli nad emocjami i obwinianie.",
          impactScore: 8,
        },
        {
          scenario: "Chłodny dystans",
          probability: 60,
          why: "Partnerka się oddala, unika rozmów.",
          impactScore: 7,
        },
      ],
      actionItems: [
        { priority: "KRYTYCZNY", action: "Nie wdawaj się w kłótnie — każde słowo może być użyte przeciwko Tobie." },
        { priority: "WYSOKI", action: "Zabezpiecz komunikację i dane osobiste." },
        { priority: "ŚREDNI", action: "Rozmawiaj tylko o konkretach — żadnych emocjonalnych wybuchów." },
      ],
      recommendations: [
        { type: "prawne", text: "Zasięgnij konsultacji prawnika rodzinnego." },
        { type: "mentalne", text: "Zachowuj spokój. Nie reaguj impulsywnie." },
        { type: "finanse", text: "Oddziel wspólne finanse, kontroluj przelewy." },
      ],
    },

    divorce: {
      riskLevel: "critical",
      confidence: 91,
      mainTitle: "Rozstanie — czas na zimną analizę",
      mainDescription:
        "Rozstanie to nie tylko emocjonalne trzęsienie ziemi – to również test charakteru, spokoju i odporności. Emocje będą chciały przejąć ster, ale to właśnie w tym momencie potrzebujesz chłodnej analizy. Każda decyzja ma konsekwencje: prawne, finansowe, a czasem nawet wizerunkowe. Partnerka może działać chaotycznie lub manipulacyjnie, a Ty musisz pozostać nieporuszony. Pamiętaj, że siła nie polega na głośnych gestach, tylko na milczeniu, kiedy inni tracą panowanie. Skup się na faktach i planie działania – krok po kroku. Oddziel to, co musisz zrobić, od tego, co chciałbyś zrobić. Utrzymuj dystans, a odzyskasz kontrolę. To nie czas na emocje – to czas na precyzję, logikę i spokój wojownika.",
      probabilities: {
        divorce: 95,
        falseAccusation: 35,
        alienation: 60,
        financialLoss: 80,
      },
      scenarios: [
        {
          scenario: "Konflikt o dzieci",
          probability: 65,
          why: "Silne emocje i brak porozumienia.",
          impactScore: 9,
        },
        {
          scenario: "Agresywne zachowania partnerki",
          probability: 45,
          why: "Próby kontroli narracji i manipulacji.",
          impactScore: 7,
        },
      ],
      actionItems: [
        { priority: "KRYTYCZNY", action: "Nie podpisuj niczego bez konsultacji z prawnikiem." },
        { priority: "WYSOKI", action: "Zabezpiecz dokumenty, majątek i dowody komunikacji." },
        { priority: "ŚREDNI", action: "Ustal plan działania — krok po kroku." },
      ],
      recommendations: [
        { type: "prawne", text: "Działaj strategicznie, nie emocjonalnie." },
        { type: "finanse", text: "Przygotuj plan budżetu po rozstaniu." },
        { type: "mentalne", text: "Nie szukaj sprawiedliwości — szukaj równowagi." },
      ],
    },

    married: {
      riskLevel: "low",
      confidence: 85,
      mainTitle: "Stały związek — utrzymaj równowagę",
      mainDescription:
        "Stabilny związek to nie koniec czujności – to dopiero początek innej formy odpowiedzialności. Z czasem bliskość może przerodzić się w rutynę, a rutyna w emocjonalne oddalenie. Partnerka może nie mówić wprost, że czegoś jej brakuje, ale jej zachowania zaczną to zdradzać: mniejsze zaangażowanie, więcej krytyki, chłód. Nie lekceważ tych sygnałów. Silny mężczyzna dba o rozwój – nie tylko zawodowy, ale i emocjonalny. Utrzymuj autonomię, miej swoje cele, spotykaj się z ludźmi, trenuj, inwestuj w siebie. Wtedy związek pozostaje równowagą dwóch dojrzałych jednostek, a nie układem zależności. Stałość nie oznacza stagnacji. To dynamiczna równowaga, w której spokój idzie w parze z siłą i świadomością własnej wartości.",
      probabilities: {
        divorce: 15,
        falseAccusation: 5,
        alienation: 10,
        financialLoss: 10,
      },
      scenarios: [
        {
          scenario: "Codzienna rutyna",
          probability: 30,
          why: "Brak wspólnych inicjatyw i stagnacja.",
          impactScore: 4,
        },
      ],
      actionItems: [
        { priority: "ŚREDNI", action: "Zachowuj równowagę między bliskością a niezależnością." },
        { priority: "NISKI", action: "Dbaj o rozwój osobisty i siłę fizyczną." },
      ],
      recommendations: [
        { type: "mentalne", text: "Nie trać siebie w relacji. Pozostań autonomiczny." },
        { type: "komunikacja", text: "Ustal zasady rozmów o trudnych tematach." },
      ],
    },
  } as const;

  const data = map[type as keyof typeof map];
  return {
    ...data,
    meta: {
      source: type,
      score: Math.round(data.confidence * 1.1),
      generatedAt: new Date().toISOString(),
    },
  };
}
