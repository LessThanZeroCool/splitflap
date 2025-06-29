import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Instruction } from './instructions';

// Extend the Window interface to avoid TypeScript errors
declare global {
  interface Window {
    vestaboardInstructions?: Instruction[];
  }
}

// Wait for the DOM to be fully loaded before running the script
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('vestaboard-container');

  // Helper function to display errors directly on the page
  const showError = (message: string) => {
    if (container) {
      container.innerHTML = `<div style="max-width: 600px; margin: 20px; padding: 20px; border: 1px solid #ff4d4d; background-color: #fff2f2; color: #cc0000; font-family: sans-serif; border-radius: 8px;">
        <strong>Vestaboard Error:</strong> ${message}
      </div>`;
    }
    console.error(`Vestaboard Error: ${message}`);
  };

  if (!container) {
    // This should not happen with DOMContentLoaded, but it's a good safeguard.
    console.error("Vestaboard Error: Could not find container element with id 'vestaboard-container'.");
    return;
  }
  
  const instructions = window.vestaboardInstructions;
  
  if (!instructions || instructions.length === 0) {
    showError("Instructions are missing. Please set 'window.vestaboardInstructions' in your HTML script tag.");
    return;
  }
  
  try {
    // API Key is no longer needed on the client.
    // The Gemini AI service is initialized on the secure proxy server.
    
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App instructions={instructions} />
      </React.StrictMode>
    );
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    showError(`Failed to initialize the application. ${errorMessage}`);
  }
});
