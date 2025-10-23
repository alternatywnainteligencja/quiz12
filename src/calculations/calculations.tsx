/**
 * Stabilna wersja obliczeń - bez losowości.
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
      mainTitle: "Wczesny etap - obserwuj sygnały ostrzegawcze",
      mainDescription:
        "Związek wydaje się stabilny, ale powoli coś zaczyna się przesuwać pod powierzchnią. Drobne zmiany w tonie rozmów, coraz krótsze wiadomości, mniej spontaniczności - to nie przypadek. To etap, w którym rodzi się dystans, często niezauważony, dopóki nie jest za późno. Jeśli czujesz, że coś się zmienia, nie ignoruj tego. Nie atakuj, nie szukaj winnych - po prostu obserwuj i zapisuj fakty. To moment na analizę, nie reakcję. Wczesne rozpoznanie wzorców chłodu, unikania lub lekceważenia pozwala zachować kontrolę nad kierunkiem relacji. Mądrość polega na tym, by wiedzieć, kiedy mówić, a kiedy milczeć. Zaufanie jest ważne, ale ślepa wiara – zabójcza.",
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
        { priority: "ŚREDNI", action: "Nie próbuj na siłę naprawiać - słuchaj i analizuj fakty." },
      ],
      recommendations: [
        { type: "komunikacja", text: "Mów krótko i konkretnie. Unikaj emocjonalnych argumentów." },
        { type: "mentalne", text: "Nie idealizuj partnerki - patrz na czyny, nie słowa." },
      ],
      // NOWE SEKCJE
      timeline: {
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
      readingList: [
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
      psychologicalProfiles: {
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
      conclusion: {
        summary: "Jesteś na etapie, gdzie świadomość i obserwacja są twoją największą bronią. Nie panikuj, nie reaguj impulsywnie - zbieraj dane i działaj strategicznie. Przyszłość zależy od tego, jak mądrze wykorzystasz ten czas.",
        cta: "Zacznij prowadzić dziennik obserwacji już dziś"
      }
    },

    crisis: {
      riskLevel: "high",
      confidence: 88,
      mainTitle: "Kryzys - relacja na ostrzu noża",
      mainDescription:
        "To moment, w którym emocje zaczynają dominować nad rozsądkiem. Każde słowo może zostać źle zinterpretowane, każda reakcja może sprowokować konflikt. Kryzys nie przychodzi nagle - narasta powoli, aż w końcu napięcie staje się codziennością. W tym stanie wiele par traci kontrolę i zaczyna walczyć, zamiast rozmawiać. Nie popełniaj tego błędu. Zachowaj spokój i planuj ruchy jak strateg, nie jak emocjonalny wojownik. Każdy krok powinien mieć cel: utrzymanie godności, bezpieczeństwa i przewagi. Nie próbuj przekonać kogoś, kto nie chce słuchać. Czasem najlepszą reakcją jest cisza i dystans. Kryzys nie musi oznaczać końca – ale zawsze ujawnia, kto naprawdę panuje nad sobą.",
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
        { priority: "KRYTYCZNY", action: "Nie wdawaj się w kłótnie - każde słowo może być użyte przeciwko Tobie." },
        { priority: "WYSOKI", action: "Zabezpiecz komunikację i dane osobiste." },
        { priority: "ŚREDNI", action: "Rozmawiaj tylko o konkretach - żadnych emocjonalnych wybuchów." },
      ],
      recommendations: [
        { type: "prawne", text: "Zasięgnij konsultacji prawnika rodzinnego." },
        { type: "mentalne", text: "Zachowuj spokój. Nie reaguj impulsywnie." },
        { type: "finanse", text: "Oddziel wspólne finanse, kontroluj przelewy." },
      ],
      // NOWE SEKCJE
      timeline: {
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
      readingList: [
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
      psychologicalProfiles: {
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
      conclusion: {
        summary: "Kryzys to test Twojego charakteru. Emocje będą chciały przejąć kontrolę, ale Ty musisz pozostać zimny i analityczny. Każda decyzja ma konsekwencje. Działaj mądrze, nie impulsywnie. Zaufaj procesowi i profesjonalistom.",
        cta: "Umów się z prawnikiem w ciągu 48 godzin"
      }
    },

    divorce: {
      riskLevel: "critical",
      confidence: 91,
      mainTitle: "Rozstanie - czas na zimną analizę",
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
        { priority: "ŚREDNI", action: "Ustal plan działania - krok po kroku." },
      ],
      recommendations: [
        { type: "prawne", text: "Działaj strategicznie, nie emocjonalnie." },
        { type: "finanse", text: "Przygotuj plan budżetu po rozstaniu." },
        { type: "mentalne", text: "Nie szukaj sprawiedliwości - szukaj równowagi." },
      ],
      // NOWE SEKCJE
      timeline: {
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
      readingList: [
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
      psychologicalProfiles: {
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
      conclusion: {
        summary: "To najtrudniejszy moment Twojego życia, ale przetrwasz. Kluczem jest spokój, strategia i otoczenie się właściwymi ludźmi. Nie jesteś sam. Miliony mężczyzn przeszły przez to przed Tobą i wyszły silniejsze. Ty też to zrobisz.",
        cta: "Zabezpiecz swoją przyszłość - działaj teraz"
      }
    },

    married: {
      riskLevel: "low",
      confidence: 85,
      mainTitle: "Stały związek - utrzymaj równowagę",
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
      // NOWE SEKCJE
      timeline: {
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
      },
      readingList: [
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
      
      psychologicalProfiles: {
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
      },
      conclusion: {
        summary: "Stabilność to dobra baza, ale nie cel sam w sobie. Związek to żywy organizm - wymaga stałej pracy, rozwoju i świadomości. Nie pozwól, by rutyna zabiła to, co zbudowaliście. Dbaj o siebie, dbaj o partnerkę, ale nigdy nie zapomnij kim jesteś.",
        cta: "Zaplanuj coś nowego na ten miesiąc"
      }
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
