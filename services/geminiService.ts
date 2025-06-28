import { GoogleGenAI } from "@google/genai";
import { BOARD_ROWS, BOARD_COLS } from '../constants';

let ai: GoogleGenAI;

export function initializeAi(apiKey: string) {
  if (!apiKey) {
    throw new Error("API key is not provided for Gemini initialization.");
  }
  ai = new GoogleGenAI({ apiKey });
}

export async function generateVestaboardMessage(query: string): Promise<string> {
  if (!ai) {
    throw new Error("Gemini service has not been initialized. Call initializeAi() first.");
  }
  
  const systemInstruction = `
    You are an assistant that formats answers for a Vestaboard, which is a split-flap display.
    The board has dimensions of ${BOARD_ROWS} rows and ${BOARD_COLS} characters per row.
    The user will provide a query. Your task is to answer it and format the response to fit the display.

    RULES:
    1.  Your response must be a single string.
    2.  Use the newline character '\\n' to separate lines.
    3.  Do NOT horizontally center the text by padding with spaces. The display component handles centering automatically. Just return the raw text for each line.
    4.  The entire message must not exceed ${BOARD_ROWS} lines.
    5.  Each line must not exceed ${BOARD_COLS} characters.
    6.  The message should be family-friendly and generally positive.
    7.  Only use uppercase letters, numbers, and basic punctuation like . , ' ! ? -
    8.  Be concise and to the point.
    9.  Do not wrap your response in markdown fences like \`\`\`.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: query,
      config: {
        systemInstruction,
        tools: [{googleSearch: {}}],
      },
    });
    
    return response.text.trim();

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
}