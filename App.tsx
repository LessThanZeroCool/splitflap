import React, { useState, useEffect, useCallback } from 'react';
import { Vestaboard } from './components/Vestaboard';
import { generateVestaboardMessage } from './services/geminiService';
import { Instruction } from './instructions';

const CYCLE_INTERVAL_MS = 15000; // 15 seconds

interface AppProps {
  instructions: Instruction[];
}

const App: React.FC<AppProps> = ({ instructions }) => {
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [boardText, setBoardText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const processInstruction = useCallback(async (instruction: Instruction) => {
    setError(null);
    try {
      if (instruction.type === 'static') {
        setBoardText(instruction.content);
      } else if (instruction.type === 'ai') {
        setBoardText('THINKING...');
        const message = await generateVestaboardMessage(instruction.content);
        setBoardText(message);
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to process instruction. ${errorMessage}`);
      setBoardText(`ERROR\n\nCOULD NOT GET DATA\n\nCHECK API KEY`);
    }
  }, []);

  useEffect(() => {
    if (!instructions || instructions.length === 0) {
      return;
    }

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
        {error && <p className="text-red-700 mt-4 text-center bg-red-100 px-4 py-2 rounded-md">{error}</p>}
      </main>
    </div>
  );
};

export default App;