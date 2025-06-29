export type Instruction = {
  type: 'static';
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
 */
export const instructions: Instruction[] = [
  {
    type: 'static',
    content: '\n\nTHIS IS A DEMO\n\nCONFIGURE MESSAGES\n\nIN YOUR WEBPAGE'
  },
  {
    type: 'static',
    content: 'HELLO WORLD'
  },
];