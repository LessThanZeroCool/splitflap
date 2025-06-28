
import React, { useState } from 'react';

interface InputControlsProps {
  onSubmit: (text: string) => void;
  onSuggest: (topic: string) => void;
  isLoading: boolean;
  rows: number;
  cols: number;
}

export const InputControls: React.FC<InputControlsProps> = ({ onSubmit, onSuggest, isLoading, rows, cols }) => {
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n');
    if (lines.length <= rows) {
      const validLines = lines.map(line => line.substring(0, cols));
      setText(validLines.join('\n'));
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
  };
  
  const handleSuggestClick = () => {
    onSuggest(topic || 'an inspirational quote');
  };

  return (
    <div className="w-full max-w-2xl bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <label htmlFor="message-input" className="text-gray-700 font-semibold">Your Message ({rows} lines, {cols} chars/line)</label>
        <textarea
          id="message-input"
          value={text}
          onChange={handleTextChange}
          rows={rows}
          placeholder="Type your message here..."
          className="bg-white border border-gray-300 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-shadow font-mono resize-none"
        />
        <button type="submit" disabled={isLoading} className="w-full bg-teal-600 text-white font-bold py-3 rounded-md hover:bg-teal-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
          Update Board
        </button>
      </form>
      
      <div className="border-t border-gray-300 my-6"></div>
      
      <div className="flex flex-col gap-4">
        <label htmlFor="topic-input" className="text-gray-700 font-semibold">AI Suggestion</label>
        <input
          id="topic-input"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Optional: Enter a topic (e.g., space, coffee)"
          className="bg-white border border-gray-300 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-shadow"
        />
        <button onClick={handleSuggestClick} disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : 'Ask Gemini for a Message'}
        </button>
      </div>
    </div>
  );
};