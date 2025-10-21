/**
 * src/utils/calculations.js
 *
 * Funkcje pomocnicze wykonuj�ce "analizy" (logika biznesowa quizu).
 * - calculateBefore(answers)
 * - calculateMarried(answers)
 * - calculateCrisis(answers)
 * - calculateDivorce(answers)
 *
 * Ka�da funkcja przyjmuje obiekt answers (klucz=id pytania, value=odpowied�)
 * i zwraca obiekt z polami, kt�re ResultDisplay oczekuje:
 * - riskLevel: 'low'|'medium'|'high'|'critical'
 * - mainTitle: string
 * - mainDescription: string
 * - scenarios: [{ scenario, probability, impact }, ...]
 * - recommendations: [string, ...]
 * - opcjonalne: actionItems, warnings, redFlags, tacticalAdvice, tacticalMoves, courtReality, longTermStrategy, threats, risks, immediateActions
 *
 * Uwaga:
 * - To proste heurystyki. Dostosuj do w�asnych regu�. Nie zast�puje porady prawnej.
 */

export const calculateBefore = (a) => {
  const prenup = a.prenup || '';
  const reaction = a.prenup_reaction || '';
  const kids = a.kids_when || '';
  const income = a.income_future || '';
  
  let risk = 'medium';
  let title = 'Analiza';
  let desc = 'Twoja sytuacja';
  const scenarios = [];
  const recs = [];

  if (prenup.includes('odm�wi�a') || reaction.includes('Histeria')) {
    risk = 'critical';
    title = '?? CZERWONA FLAGA';
    desc = 'Odmowa intercyzy to powa�ny znak ostrzegawczy.';
    scenarios.push({ scenario: 'Rozw�d z utrat� 50%', probability: 50, impact: 'Tracisz po�ow� maj�tku' });
    recs.push('?? ULTIMATUM: Intercyza albo brak �lubu');
  } else if (prenup.includes('zgodzi�a')) {
    risk = 'low';
    title = '? Dobry znak';
    desc = 'Zgoda na intercyz� pokazuje dojrza�o��.';
    recs.push('Upewnij si� �e jest dobrze napisana');
  }

  if (kids.includes('Jak najszybciej') || kids.includes('najszybciej')) {
    if (income.includes('Tylko ja')) {
      scenarios.push({ scenario: 'Pu�apka: dzieci + alimenty', probability: 65, impact: 'Alimenty na dziecko + na ni� + 50% maj�tku' });
      recs.push('Porozmawiaj o finansach i podziale odpowiedzialno�ci przed decyzj� o dziecku');
    }
  }

  return { riskLevel: risk, mainTitle: title, mainDescription: desc, scenarios, recommendations: recs };
};

export const calculateMarried = (a) => {
  const cheat = a.her_cheat || '';
  const quality = a.quality || '';
  
  let risk = 'medium';
  let title = 'Analiza ma��e�stwa';
  const scenarios = [];
  const recs = [];

  if (cheat.includes('kochanka') || cheat.includes('Wielokrotnie') || cheat.includes('Wielokrotnie')) {
    risk = 'critical';
    title = '?? ZDRADA POTWIERDZONA';
    scenarios.push({ scenario: 'Rozw�d nieunikniony', probability: 85, impact: 'Ona prawdopodobnie si� przygotowuje' });
    recs.push('Konsultacja z adwokatem - DYSKRETNIE');
    recs.push('Zabezpiecz dowody');
  } else if (quality.includes('�wietne') || quality.includes('Dobre')) {
    risk = 'low';
    title = '? Stabilne ma��e�stwo';
    recs.push('Dbaj o komunikacj� i regularne check-iny z partnerk�');
  } else if (quality.includes('Pogarsza si�') || quality.includes('�le') || quality.includes('Katastrofa')) {
    risk = 'high';
    title = '?? Problemy w zwi�zku';
    recs.push('Rozwa� terapi� dla par lub indywidualn�');
  }

  return { riskLevel: risk, mainTitle: title, mainDescription: 'Twoja sytuacja', scenarios, recommendations: recs };
};

export const calculateCrisis = (a) => {
  const threats = a.threats || '';
  const alienation = a.alienation || '';
  
  const scenarios = [];
  const actions = [];

  scenarios.push({ scenario: 'Rozw�d w 6-12 m-cy', probability: 90, impact: 'Przygotuj si�' });

  if (threats.includes('Fa�szywymi')) {
    actions.push({ priority: 'KRYTYCZNY', action: '?? NAGRYWAJ wszystkie interakcje' });
  }

  if (alienation.includes('Aktywnie') || alienation.includes('Odwr�ci�y')) {
    actions.push({ priority: 'KRYTYCZNY', action: 'Dokumentuj alienacj� - daty, fakty' });
  }

  return {
    riskLevel: 'critical',
    mainTitle: '?? WOJNA - Strategia',
    mainDescription: 'Ka�dy ruch ma konsekwencje. Potrzebujesz strategii.',
    scenarios,
    actionItems: actions,
    recommendations: ['Znajd� najlepszego prawnika', 'Nie opuszczaj domu', 'Kontroluj emocje']
  };
};

export const calculateDivorce = (a) => {
  const yourLaw = a.your_lawyer || '';
  const herLaw = a.her_lawyer || '';
  const tactics = a.her_tactics || '';
  
  const scenarios = [];
  const recs = [];

  if (yourLaw.includes('S�aby') && herLaw.includes('Rekin')) {
    scenarios.push({ scenario: 'Przewaga prawna - ona', probability: 80, impact: 'Przegrywasz rozprawy' });
    recs.push('?? Zmie� prawnika NATYCHMIAST');
  }

  if (tactics.includes('Fa�szywe')) {
    scenarios.push({ scenario: 'Fa�szywe oskar�enia', probability: 75, impact: 'Zakaz zbli�ania, utrata dzieci' });
    recs.push('Zbieraj alibi i �wiadk�w');
  }

  return {
    riskLevel: 'critical',
    mainTitle: '?? BITWA S�DOWA',
    mainDescription: 'Liczy si� strategia, prawnik i dowody.',
    scenarios,
    recommendations: recs.length > 0 ? recs : ['S�uchaj prawnika', 'Kontroluj emocje', 'Dokumentuj wszystko']
  };
};