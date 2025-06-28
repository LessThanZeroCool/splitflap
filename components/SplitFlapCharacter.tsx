import React, { useState, useEffect, memo } from 'react';

interface SplitFlapCharacterProps {
  targetChar: string;
  delay: number;
}

// Using React.memo to prevent re-renders if the props haven't changed.
export const SplitFlapCharacter: React.FC<SplitFlapCharacterProps> = memo(({ targetChar, delay }) => {
  const [currentChar, setCurrentChar] = useState(' ');
  const [previousChar, setPreviousChar] = useState(' ');
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (targetChar !== currentChar) {
      const flipTimeout = setTimeout(() => {
        setPreviousChar(currentChar);
        setIsFlipping(true);
      }, delay);
      
      return () => clearTimeout(flipTimeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetChar, delay]); // currentChar is intentionally omitted to allow re-triggering flips to the same char if needed

  const handleTransitionEnd = () => {
    if (isFlipping) {
      setCurrentChar(targetChar);
      setPreviousChar(targetChar); // Sync previous char after flip
      setIsFlipping(false);
    }
  };

  const flapChar = isFlipping ? previousChar : currentChar;
  const staticChar = isFlipping ? targetChar : currentChar;

  return (
    <div className="relative w-[1.5vw] h-[2.5vw] min-w-[14px] min-h-[24px] max-w-[24px] max-h-[40px] [perspective:300px] font-medium">
      {/* Static Top Half (shows top half of destination character) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-black rounded-t-sm overflow-hidden flex items-start justify-center">
        <span className="text-gray-200 text-[1.4vw] sm:text-lg md:text-xl transform scale-y-105">{staticChar}</span>
      </div>
      
      {/* Static Bottom Half (shows bottom half of current character before it's covered) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black rounded-b-sm overflow-hidden flex items-end justify-center">
        <span className="text-gray-200 text-[1.4vw] sm:text-lg md:text-xl transform scale-y-105">{flapChar}</span>
      </div>

      {/* The main animated flap */}
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`absolute top-0 left-0 w-full h-1/2 origin-bottom [transform-style:preserve-3d] transition-transform duration-500 ease-in-out
          ${isFlipping ? '[transform:rotateX(-180deg)]' : '[transform:rotateX(0deg)]'}`
        }
      >
        {/* Front of the flap (top half of old character) */}
        <div className="absolute inset-0 bg-gray-900 rounded-t-sm [backface-visibility:hidden] flex items-start justify-center overflow-hidden border-b border-black/50">
          <span className="text-gray-200 text-[1.4vw] sm:text-lg md:text-xl transform scale-y-105">{flapChar}</span>
        </div>
        {/* Back of the flap (bottom half of new character) */}
        <div className="absolute inset-0 bg-black rounded-b-sm [backface-visibility:hidden] [transform:rotateX(180deg)] flex items-end justify-center overflow-hidden">
          <span className="text-gray-200 text-[1.4vw] sm:text-lg md:text-xl transform scale-y-105">{staticChar}</span>
        </div>
      </div>
    </div>
  );
});