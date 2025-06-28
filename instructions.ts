export type Instruction = {
  type: 'static' | 'ai';
  content: string;
};

/**
 * ## Vestaboard Message Instructions (Reference Only)
 *
 * NOTE: For embedding the Vestaboard on a website, you should define your
 * instructions in a <script> tag on your main HTML page, not in this file.
 * See the `index.html` file for a complete example of the embed snippet.
 *
 * This file and the array below are now only for reference or for running
 * the application in a standalone development environment.
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
 */
export const instructions: Instruction[] = [
  {
    type: 'static',
    content: '\n\nTHIS IS A DEMO\n\nCONFIGURE MESSAGES\n\nIN YOUR WEBPAGE'
  },
  {
    type: 'ai',
    content: 'Tell me a short, inspiring quote.'
  },
];