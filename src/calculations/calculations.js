/**
 * src/utils/calculations.js
 *
 * Funkcje pomocnicze wykonuj¹ce "analizy" (logika biznesowa quizu).
 * - calculateBefore(answers)
 * - calculateMarried(answers)
 * - calculateCrisis(answers)
 * - calculateDivorce(answers)
 *
 * Ka¿da funkcja przyjmuje obiekt answers (klucz=id pytania, value=odpowiedŸ)
 * i zwraca obiekt z polami, które ResultDisplay oczekuje:
 * - riskLevel: 'low'|'medium'|'high'|'critical'
 * - mainTitle: string
 * - mainDescription: string
 * - scenarios: [{ scenario, probability, impact }, ...]
 * - recommendations: [string, ...]
 * - opcjonalne: actionItems, warnings, redFlags, tacticalAdvice, tacticalMoves, courtReality, longTermStrategy, threats, risks, immediateActions
 *
 * Uwaga:
 * - To proste heurystyki. Dostosuj do w³asnych regu³. Nie zastêpuje porady prawnej.
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

  if (prenup.includes('odmówi³a') || reaction.includes('Histeria')) {
    risk = 'critical';
    title = '?? CZERWONA FLAGA';
    desc = 'Odmowa intercyzy to powa¿ny znak ostrzegawczy.';
    scenarios.push({ scenario: 'Rozwód z utrat¹ 50%', probability: 50, impact: 'Tracisz po³owê maj¹tku' });
    recs.push('?? ULTIMATUM: Intercyza albo brak œlubu');
  } else if (prenup.includes('zgodzi³a')) {
    risk = 'low';
    title = '? Dobry znak';
    desc = 'Zgoda na intercyzê pokazuje dojrza³oœæ.';
    recs.push('Upewnij siê ¿e jest dobrze napisana');
  }

  if (kids.includes('Jak najszybciej') || kids.includes('najszybciej')) {
    if (income.includes('Tylko ja')) {
      scenarios.push({ scenario: 'Pu³apka: dzieci + alimenty', probability: 65, impact: 'Alimenty na dziecko + na ni¹ + 50% maj¹tku' });
      recs.push('Porozmawiaj o finansach i podziale odpowiedzialnoœci przed decyzj¹ o dziecku');
    }
  }

  return { riskLevel: risk, mainTitle: title, mainDescription: desc, scenarios, recommendations: recs };
};

export const calculateMarried = (a) => {
  const cheat = a.her_cheat || '';
  const quality = a.quality || '';
  
  let risk = 'medium';
  let title = 'Analiza ma³¿eñstwa';
  const scenarios = [];
  const recs = [];

  if (cheat.includes('kochanka') || cheat.includes('Wielokrotnie') || cheat.includes('Wielokrotnie')) {
    risk = 'critical';
    title = '?? ZDRADA POTWIERDZONA';
    scenarios.push({ scenario: 'Rozwód nieunikniony', probability: 85, impact: 'Ona prawdopodobnie siê przygotowuje' });
    recs.push('Konsultacja z adwokatem - DYSKRETNIE');
    recs.push('Zabezpiecz dowody');
  } else if (quality.includes('Œwietne') || quality.includes('Dobre')) {
    risk = 'low';
    title = '? Stabilne ma³¿eñstwo';
    recs.push('Dbaj o komunikacjê i regularne check-iny z partnerk¹');
  } else if (quality.includes('Pogarsza siê') || quality.includes('le') || quality.includes('Katastrofa')) {
    risk = 'high';
    title = '?? Problemy w zwi¹zku';
    recs.push('Rozwa¿ terapiê dla par lub indywidualn¹');
  }

  return { riskLevel: risk, mainTitle: title, mainDescription: 'Twoja sytuacja', scenarios, recommendations: recs };
};

export const calculateCrisis = (a) => {
  const threats = a.threats || '';
  const alienation = a.alienation || '';
  
  const scenarios = [];
  const actions = [];

  scenarios.push({ scenario: 'Rozwód w 6-12 m-cy', probability: 90, impact: 'Przygotuj siê' });

  if (threats.includes('Fa³szywymi')) {
    actions.push({ priority: 'KRYTYCZNY', action: '?? NAGRYWAJ wszystkie interakcje' });
  }

  if (alienation.includes('Aktywnie') || alienation.includes('Odwróci³y')) {
    actions.push({ priority: 'KRYTYCZNY', action: 'Dokumentuj alienacjê - daty, fakty' });
  }

  return {
    riskLevel: 'critical',
    mainTitle: '?? WOJNA - Strategia',
    mainDescription: 'Ka¿dy ruch ma konsekwencje. Potrzebujesz strategii.',
    scenarios,
    actionItems: actions,
    recommendations: ['ZnajdŸ najlepszego prawnika', 'Nie opuszczaj domu', 'Kontroluj emocje']
  };
};

export const calculateDivorce = (a) => {
  const yourLaw = a.your_lawyer || '';
  const herLaw = a.her_lawyer || '';
  const tactics = a.her_tactics || '';
  
  const scenarios = [];
  const recs = [];

  if (yourLaw.includes('S³aby') && herLaw.includes('Rekin')) {
    scenarios.push({ scenario: 'Przewaga prawna - ona', probability: 80, impact: 'Przegrywasz rozprawy' });
    recs.push('?? Zmieñ prawnika NATYCHMIAST');
  }

  if (tactics.includes('Fa³szywe')) {
    scenarios.push({ scenario: 'Fa³szywe oskar¿enia', probability: 75, impact: 'Zakaz zbli¿ania, utrata dzieci' });
    recs.push('Zbieraj alibi i œwiadków');
  }

  return {
    riskLevel: 'critical',
    mainTitle: '?? BITWA S¥DOWA',
    mainDescription: 'Liczy siê strategia, prawnik i dowody.',
    scenarios,
    recommendations: recs.length > 0 ? recs : ['S³uchaj prawnika', 'Kontroluj emocje', 'Dokumentuj wszystko']
  };
};