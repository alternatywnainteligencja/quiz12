// src/services/googleSheetsService.ts
// FREE VERSION - No API key needed!

import axios from 'axios';

// Your published CSV URLs for each pathway
// For Vite: use import.meta.env.VITE_* instead of process.env.REACT_APP_*
const CSV_URLS = {
  married: import.meta.env.VITE_SHEET_CSV_URL_MARRIED || '',
  relationship: import.meta.env.VITE_SHEET_CSV_URL_RELATIONSHIP || '',
  single: import.meta.env.VITE_SHEET_CSV_URL_SINGLE || '',
  divorce: import.meta.env.VITE_SHEET_CSV_URL_DIVORCE || '',
};

export type PathwayType = 'married' | 'relationship' | 'single' | 'divorce';

export interface QuestionOption {
  text: string;
  next?: string;
}

export interface Question {
  id: string;
  q: string;
  opts: (string | QuestionOption)[];
}

/**
 * Fetches questions from published Google Sheets CSV
 * FREE - No API key required!
 * @param pathway - The pathway type (married, relationship, single, divorce)
 */
export async function fetchQuestionsFromSheets(pathway: PathwayType): Promise<Question[]> {
  const csvUrl = CSV_URLS[pathway];
  
  if (!csvUrl) {
    throw new Error(`No CSV URL configured for pathway: ${pathway}`);
  }
  try {
    const response = await axios.get(PUBLISHED_CSV_URL, {
      responseType: 'text',
      headers: {
        'Accept': 'text/csv; charset=utf-8'
      }
    });
    const csvData = response.data;
    
    // Split into lines and remove header
    const lines = csvData.trim().split('\n');
    const dataLines = lines.slice(1); // Skip header row
    
    const questions: Question[] = dataLines
      .filter((line: string) => line.trim())
      .map((line: string) => {
        // Parse CSV line
        const columns = parseCSVLine(line);
        
        if (columns.length < 3) {
          console.warn('Invalid row:', line);
          return null;
        }
        
        const [id, question, optionsStr, nextConditionsStr = ''] = columns;
        
        // Parse options - split by | delimiter
        const optionsArray = optionsStr
          .split('|')
          .map(opt => opt.trim())
          .filter(opt => opt.length > 0);

        // Parse next conditions if they exist
        let opts: QuestionOption[] = [];
        
        if (nextConditionsStr && nextConditionsStr.trim()) {
          // Format: "option1->nextId1;option2->nextId2"
          const conditions = nextConditionsStr.split(';').map(c => c.trim());
          const nextMap: Record<string, string> = {};
          
          conditions.forEach(condition => {
            const [option, nextId] = condition.split('->').map(s => s.trim());
            if (option && nextId) {
              nextMap[option] = nextId;
            }
          });

          // Convert to QuestionOption format
          opts = optionsArray.map(opt => {
            if (nextMap[opt]) {
              return { text: opt, next: nextMap[opt] };
            }
            return { text: opt };
          });
        } else {
          // No conditions - return all as objects for consistency
          opts = optionsArray.map(opt => ({ text: opt }));
        }

        return {
          id: id.trim(),
          q: question.trim(),
          opts
        };
      })
      .filter((q): q is Question => q !== null);

    if (questions.length === 0) {
      throw new Error('No valid questions found in sheet');
    }

    return questions;
  } catch (error) {
    console.error('Error fetching questions from Google Sheets:', error);
    throw error;
  }
}

/**
 * Parse a CSV line handling quoted strings properly
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      // Handle double quotes "" as escaped quote
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result.map(col => col.trim());
}

/**
 * Cache questions to avoid repeated requests
 */
let cachedQuestions: Question[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchQuestionsWithCache(): Promise<Question[]> {
  const now = Date.now();
  
  if (cachedQuestions && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('Using cached questions');
    return cachedQuestions;
  }
  
  console.log('Fetching fresh questions from Google Sheets');
  const questions = await fetchQuestionsFromSheets();
  cachedQuestions = questions;
  cacheTimestamp = now;
  
  return questions;
}

/**
 * Clear the cache manually if needed
 */
export function clearQuestionsCache(): void {
  cachedQuestions = null;
  cacheTimestamp = 0;
}
