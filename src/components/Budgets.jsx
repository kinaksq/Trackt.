import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../utils/helpers';
import { CURRENCIES } from '../utils/constants';

export default function Budgets({ budgets, transactions, currency, onClose, onAddBudget, onDeleteBudget }) {
  const [showAddBudget, setShowAddBudget] = useState(false);

  // Get current month and year
  const now = new Date();
  const currentMonth = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Calculate spending per category for current month
  const categorySpending = useMemo(() => {
    const spending = {};

    transactions
      .filter(t => t.type === 'expense' && new Date(t.date) >= startOfMonth)
      .forEach(t => {
        const category = t.category;
        spending[category] = (spending[category] || 0) + t.amount;
      });

    return spending;
  }, [transactions, startOfMonth]);

  // Calculate total budget and total spent
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => {
    const spent = categorySpending[b.categoryId] || 0;
    return sum + spent;
  }, 0);
  const totalPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  // Calculate progress for individual budgets
  const budgetsWithProgress = budgets.map(budget => {
    const spent = categorySpending[budget.categoryId] || 0;
    const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
    const isOverBudget = percentage > 100;
    return { ...budget, spent, percentage, isOverBudget };
  });

  // Circular progress component
  const CircularProgress = ({ percentage }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center" style={{ width: '180px', height: '180px' }}>
        <svg width="180" height="180" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#E8E8E8"
            strokeWidth="16"
            className="dark:stroke-white/10"
          />
          {/* Progress circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={percentage > 100 ? '#D84315' : '#6EAD6E'}
            strokeWidth="16"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-5xl font-bold text-text-light dark:text-text-dark">{totalPercentage}%</p>
          <p className="text-base font-normal text-text-muted dark:text-dark-text-secondary">Spent</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-y-auto pb-20 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background-light/80 dark:bg-background-dark/80">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button
            onClick={onClose}
            className="flex size-12 shrink-0 items-center justify-start"
          >
            <span className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-text-light dark:text-text-dark">
            Budgets
          </h1>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center p-0">
              <span className="material-symbols-outlined text-2xl text-secondary dark:text-text-dark">notifications</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 pb-6">
        {/* Monthly Budgets Title */}
        <div className="pt-4 pb-6">
          <h2 className="text-4xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">
            Monthly Budgets
          </h2>
          <p className="text-base font-normal leading-normal pt-1 text-text-muted dark:text-dark-text-secondary">
            {currentMonth}
          </p>
        </div>

        {/* Circular Progress Card */}
        <div className="rounded-2xl p-6 mb-6 bg-white dark:bg-surface-dark">
          <div className="flex flex-col items-center">
            <CircularProgress percentage={totalPercentage} />

            <div className="mt-6 text-center">
              <p className="text-sm font-medium mb-1 text-text-muted dark:text-dark-text-secondary">
                Total Spent
              </p>
              <p className="text-4xl font-bold mb-1 text-text-light dark:text-text-dark">
                {formatCurrency(totalSpent, currency)}
              </p>
              <p className="text-base font-normal text-text-muted dark:text-dark-text-secondary">
                of {formatCurrency(totalBudget, currency)} budget
              </p>
            </div>
          </div>
        </div>

        {/* Budget Items List */}
        {budgetsWithProgress.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="material-symbols-outlined text-6xl mb-4 text-border-forest-light dark:text-dark-text-secondary">
              account_balance_wallet
            </span>
            <p className="text-base font-medium text-text-muted dark:text-dark-text-secondary">No budgets yet</p>
            <p className="text-sm text-text-muted dark:text-dark-text-secondary">Create your first budget to start tracking</p>
          </div>
        ) : (
          <div className="space-y-4">
            {budgetsWithProgress.map((budget) => (
              <div
                key={budget.id}
                className="rounded-xl p-4 bg-white dark:bg-surface-dark"
              >
                <div className="flex items-center gap-4">
                  {/* Category Icon */}
                  <div className="text-4xl shrink-0">
                    {budget.icon}
                  </div>

                  {/* Budget Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold leading-tight text-text-light dark:text-text-dark">
                        {budget.name}
                      </h3>
                      {budget.isOverBudget && (
                        <span className="material-symbols-outlined text-xl text-accent">
                          warning
                        </span>
                      )}
                    </div>

                    <p className="text-base font-normal mb-3 text-text-muted dark:text-dark-text-secondary">
                      {formatCurrency(budget.spent, currency)} / {formatCurrency(budget.limit, currency)}
                    </p>

                    {/* Progress Bar */}
                    <div className="relative w-full h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-white/10">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full transition-all ${
                          budget.isOverBudget ? 'bg-expense' : 'bg-primary'
                        }`}
                        style={{
                          width: `${Math.min(budget.percentage, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Budget Button */}
        <div className="px-4 pb-6 pt-4">
          <button
            onClick={() => setShowAddBudget(true)}
            className="flex w-full h-14 items-center justify-center gap-2 rounded-xl text-lg font-bold text-white transition-opacity hover:opacity-90 bg-primary"
          >
            <span className="material-symbols-outlined text-2xl">add</span>
            Add Budget
          </button>
        </div>
      </main>

      {/* Add Budget Modal */}
      {showAddBudget && (
        <AddBudgetForm
          onAdd={onAddBudget}
          onClose={() => setShowAddBudget(false)}
          currency={currency}
          existingBudgets={budgets}
        />
      )}
    </div>
  );
}

// Add Budget Form Component
function AddBudgetForm({ onAdd, onClose, currency, existingBudgets }) {
  // Get the currency symbol from the CURRENCIES array
  const currencySymbol = CURRENCIES.find(c => c.code === currency)?.symbol || '$';

  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    icon: '',
    limit: '',
  });

  // Budget categories with icons
  const budgetCategories = [
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'food', name: 'Food & Dining', icon: '🍽️' },
    { id: 'utilities', name: 'Utilities', icon: '💡' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'pets', name: 'Pets', icon: '🐾' },
    { id: 'other', name: 'Other', icon: '📦' },
  ];

  // Filter out categories that already have budgets
  const availableCategories = budgetCategories.filter(
    cat => !existingBudgets.some(b => b.categoryId === cat.id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.categoryId || !formData.limit) {
      alert('Please select a category and enter a budget limit');
      return;
    }

    const selectedCategory = budgetCategories.find(c => c.id === formData.categoryId);

    const budget = {
      id: Date.now().toString(),
      categoryId: formData.categoryId,
      name: selectedCategory.name,
      icon: selectedCategory.icon,
      limit: parseFloat(formData.limit),
      createdAt: new Date().toISOString(),
    };

    onAdd(budget);
    onClose();
  };

  const handleCategorySelect = (category) => {
    setFormData({
      categoryId: category.id,
      name: category.name,
      icon: category.icon,
      limit: formData.limit,
    });
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
            Add Budget
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity text-text-light dark:text-text-dark"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 pb-6 space-y-4">
          {/* Amount Input */}
          <div className="text-center py-6">
            <label className="text-sm font-medium mb-2 block text-text-muted dark:text-dark-text-secondary">
              Monthly Budget Limit
            </label>
            <div className="flex items-center justify-center">
              <span className="text-3xl font-medium pr-2 text-text-muted dark:text-dark-text-secondary">{currencySymbol}</span>
              <input
                type="number"
                value={formData.limit}
                onChange={(e) => setFormData(prev => ({ ...prev, limit: e.target.value }))}
                step="0.01"
                min="0"
                placeholder="0.00"
                className="w-full border-none bg-transparent p-0 text-center text-6xl font-bold focus:ring-0 focus:outline-none text-primary"
                required
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block text-text-muted dark:text-dark-text-secondary">
              Select Category
            </label>
            <div className="grid grid-cols-3 gap-3">
              {availableCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    formData.categoryId === category.id
                      ? 'ring-2 ring-primary ring-offset-2 bg-primary text-white'
                      : 'bg-light-surface-contrast dark:bg-dark-background text-text-light dark:text-text-dark'
                  }`}
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="text-xs font-medium text-center">{category.name}</span>
                </button>
              ))}
            </div>
            {availableCategories.length === 0 && (
              <p className="text-sm text-center py-4 text-text-muted dark:text-dark-text-secondary">
                All categories already have budgets
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 border-t border-border-light dark:border-dark-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center rounded-xl border-2 border-border-light dark:border-dark-border text-base font-bold transition-colors hover:opacity-80 text-text-light dark:text-text-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={availableCategories.length === 0}
              className="flex h-12 w-full items-center justify-center rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 bg-primary"
            >
              Add Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
