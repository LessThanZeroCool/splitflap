
import React, { useMemo } from 'react';
import { SplitFlapCharacter } from './SplitFlapCharacter';
import { BOARD_ROWS, BOARD_COLS } from '../constants';

interface VestaboardProps {
  text: string;
}

const processText = (text: string): string[][] => {
  const lines = text.toUpperCase().split('\n');
  const grid: string[][] = [];

  for (let i = 0; i < BOARD_ROWS; i++) {
    const line = lines[i] || '';
    // Pad to center the text line by line
    const padding = Math.floor(Math.max(0, BOARD_COLS - line.length) / 2);
    const paddedLine = ' '.repeat(padding) + line;
    const finalLine = paddedLine.padEnd(BOARD_COLS, ' ');
    const chars = finalLine.substring(0, BOARD_COLS).split('');
    grid.push(chars);
  }
  return grid;
};

export const Vestaboard: React.FC<VestaboardProps> = ({ text }) => {
  const charGrid = useMemo(() => processText(text), [text]);

  return (
    <div className="bg-black p-2 sm:p-3 md:p-4 rounded-lg shadow-lg">
      <div 
        className="grid gap-1 sm:gap-1.5"
        style={{
          gridTemplateRows: `repeat(${BOARD_ROWS}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))`,
        }}
      >
        {charGrid.flat().map((char, index) => (
          <SplitFlapCharacter
            key={index}
            targetChar={char}
            delay={Math.random() * 700 + 50} // Random delay for each character
          />
        ))}
      </div>
    </div>
  );
};
