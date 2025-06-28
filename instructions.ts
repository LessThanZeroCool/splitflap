
export type Instruction = {
  type: 'static' | 'ai';
  content: string;
};

/**
 * ## Vestaboard Message Instructions
 *
 * This is where you can define the messages that will be displayed on the board.
 * The board will cycle through these instructions one by one.
 *
 * ### Instruction Types
 *
 * 1.  `type: 'static'`
 *     - Displays a fixed message.
 *     - `content` should be the message string you want to show.
 *
 * 2.  `type: 'ai'`
 *     - Sends a query to the Gemini AI to get a dynamic message.
 *     - `content` should be the question you want to ask the AI.
 *     - The AI uses Google Search for up-to-date information.
 *
 * ### Formatting Tips
 *
 * - **Line Breaks:** Use `\n` to create a new line.
 * - **Vertical Position:** To push a message down, start your `content` string with one or more `\n` characters. Each one will add a blank line at the top.
 * - **Centering:** Text is centered horizontally on each line automatically.
 *
 * ### Examples
 *
 * Static message pushed down from the top:
 * { type: 'static', content: '\n\nHELLO\nWORLD' }
 *
 * AI query for real-time weather:
 * { type: 'ai', content: 'What is the current weather in New York, NY?' }
 */
export const instructions: Instruction[] = [
  {
    type: 'static',
    content: '\n\nWELCOME\nTO THE JUNGLE. Meow.'
  },
  {
    type: 'ai',
    content: 'What is the current weather in Boston, MA?'
  },
  {
    type: 'static',
    content: '\n Hello Beautiful! \n YOU ARE INCREDIBLE!'
  },
  {
    type: 'ai',
    content: 'Tell me a short, inspiring quote about creativity.'
  },
  {
    type: 'ai',
    content: 'What are the top headlines in the news right now?'
  }
];
