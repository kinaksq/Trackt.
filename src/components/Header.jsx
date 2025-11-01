import React from 'react';
import CurrencySelector from './CurrencySelector';

export default function Header({ currency, onCurrencyChange, darkMode, onToggleDarkMode }) {
  return (
    <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl p-4 pb-2 justify-between">
      <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1">
        FinTrack
      </h2>

      <div className="flex items-center gap-2">
        <CurrencySelector
          selectedCurrency={currency}
          onCurrencyChange={onCurrencyChange}
        />
        <button
          onClick={onToggleDarkMode}
          className="flex items-center justify-center h-12 w-12 rounded-lg bg-transparent text-text-light dark:text-text-dark hover:bg-glass-bg-light dark:hover:bg-glass-bg-dark transition-colors"
          aria-label="Toggle dark mode"
        >
          <span className="material-symbols-outlined">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </header>
  );
}
