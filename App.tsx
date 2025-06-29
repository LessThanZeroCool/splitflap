import React, { useState, useEffect } from 'react';
import { Vestaboard } from './components/Vestaboard';
import { Instruction } from './instructions';

const CYCLE_INTERVAL_MS = 15000; // 15 seconds

interface AppProps {
  instructions: Instruction[];
}

const App: React.FC<AppProps> = ({ instructions }) => {
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [boardText, setBoardText] = useState<string>('');

  useEffect(() => {
    if (!instructions || instructions.length === 0) {
      return;
    }

    const processInstruction = (instruction: Instruction) => {
      // This app now only supports static messages.
      if (instruction.type === 'static') {
        setBoardText(instruction.content);
      }
    };

    // Process the first instruction immediately on load
    processInstruction(instructions[currentInstructionIndex]);

    // Set up the interval to cycle through the rest
    const intervalId = setInterval(() => {
      setCurrentInstructionIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % instructions.length;
        processInstruction(instructions[nextIndex]);
        return nextIndex;
      });
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructions]); // Rerun if instructions are ever dynamically changed

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <main className="w-full flex flex-col items-center">
        <Vestaboard text={boardText} />
      </main>
    </div>
  );
};

export default App;