import React from 'react';
import { CURRENCIES } from '../utils/constants';

export default function CurrencySelector({ selectedCurrency, onCurrencyChange }) {
  return (
    <select
      value={selectedCurrency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      className="p-2 rounded-lg bg-transparent hover:bg-surface-contrast dark:hover:bg-surface-dark text-text-light dark:text-text-dark border-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer text-sm font-medium"
      aria-label="Select currency"
    >
      {CURRENCIES.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.symbol} {currency.code}
        </option>
      ))}
    </select>
  );
}
