import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeAi } from './services/geminiService';
import { Instruction } from './instructions';

// Extend the Window interface to avoid TypeScript errors
declare global {
  interface Window {
    vestaboardApiKey?: string;
    vestaboardInstructions?: Instruction[];
  }
}

const container = document.getElementById('vestaboard-container');
const apiKey = window.vestaboardApiKey;
const instructions = window.vestaboardInstructions;

if (!container) {
  console.error("Vestaboard Error: Could not find container element with id 'vestaboard-container'.");
} else if (!apiKey) {
  console.error("Vestaboard Error: API key is missing. Please set 'window.vestaboardApiKey'.");
} else if (!instructions || instructions.length === 0) {
  console.error("Vestaboard Error: Instructions are missing. Please set 'window.vestaboardInstructions'.");
} else {
  try {
    // Initialize the Gemini AI service with the key provided
    initializeAi(apiKey);
    
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App instructions={instructions} />
      </React.StrictMode>
    );
  } catch (e) {
    console.error("Vestaboard Error: Failed to initialize the application.", e);
    container.innerHTML = `<p style="color: red; font-family: sans-serif;">Error loading Vestaboard. See console for details.</p>`
  }
}