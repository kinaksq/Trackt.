import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DEFAULT_CATEGORIES, CURRENCIES } from '../utils/constants';
import { generateId } from '../utils/helpers';

export default function TransactionForm({ onAdd, onClose, currency }) {
  // Get the currency symbol from the CURRENCIES array
  const currencySymbol = CURRENCIES.find(c => c.code === currency)?.symbol || '$';
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = DEFAULT_CATEGORIES[formData.type];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const transaction = {
      id: generateId(),
      ...formData,
      amount: parseFloat(formData.amount),
      createdAt: new Date().toISOString(),
    };

    onAdd(transaction);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && { category: '' }), // Reset category when type changes
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-surface-linen dark:bg-surface-dark rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Drag Handle */}
        <div className="flex h-5 w-full items-center justify-center pt-3">
          <div className="h-1.5 w-10 rounded-full bg-light-surface-contrast dark:bg-dark-border"></div>
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-center px-4 pt-2 pb-4">
          <h2 className="text-lg font-bold leading-normal tracking-wide text-center text-text-light dark:text-text-dark">
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity text-text-light dark:text-text-dark"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 pb-6 space-y-3">
          {/* Type Toggle */}
          <div className="flex px-0 py-3">
            <div className="flex h-12 flex-1 items-center justify-center rounded-xl p-1 bg-light-surface-contrast dark:bg-dark-background">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: '' }))}
                className={`flex h-full flex-1 items-center justify-center rounded-lg transition-all text-sm font-medium ${
                  formData.type === 'expense'
                    ? 'font-semibold shadow-lg text-white bg-expense'
                    : 'text-text-muted dark:text-dark-text-secondary'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: '' }))}
                className={`flex h-full flex-1 items-center justify-center rounded-lg transition-all text-sm font-medium ${
                  formData.type === 'income'
                    ? 'font-semibold shadow-lg text-white bg-income'
                    : 'text-text-muted dark:text-dark-text-secondary'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="relative flex items-center justify-center px-4 pt-6 pb-4">
            <span className="text-3xl font-medium pr-2 text-text-muted dark:text-dark-text-secondary">{currencySymbol}</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full border-none bg-transparent p-0 text-center text-6xl font-bold focus:ring-0 focus:outline-none"
              style={{ color: formData.type === 'expense' ? '#D84315' : '#4CAF50' }}
              required
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto px-0 py-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full pl-3 pr-4 transition-all ${
                  formData.category === cat.id
                    ? 'ring-2 ring-primary ring-offset-2 bg-primary text-white'
                    : 'bg-light-surface-contrast dark:bg-dark-background text-text-light dark:text-text-dark'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className={`text-sm leading-normal ${formData.category === cat.id ? 'font-semibold' : 'font-medium'}`}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="relative">
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder=" "
                className="peer h-12 w-full rounded-lg border-2 px-4 placeholder-transparent focus:outline-none focus:ring-0 bg-light-surface-contrast dark:bg-dark-background border-border-light dark:border-dark-border text-text-light dark:text-text-dark"
              />
              <label
                htmlFor="description"
                className="absolute -top-2 left-3 px-1 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs bg-surface-linen dark:bg-surface-dark text-text-muted dark:text-dark-text-secondary"
              >
                Description (optional)
              </label>
            </div>

            <div className="relative">
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="peer h-12 w-full rounded-lg border-2 px-4 focus:outline-none focus:ring-0 bg-light-surface-contrast dark:bg-dark-background border-border-light dark:border-dark-border text-text-light dark:text-text-dark [color-scheme:light] dark:[color-scheme:dark]"
                required
              />
              <label
                htmlFor="date"
                className="absolute -top-2 left-3 px-1 text-xs bg-surface-linen dark:bg-surface-dark text-text-muted dark:text-dark-text-secondary"
              >
                Date
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 border-t border-border-light dark:border-dark-border pt-4 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center rounded-xl border-2 border-border-light dark:border-dark-border text-base font-bold transition-colors hover:opacity-80 text-text-light dark:text-text-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90 bg-primary"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
