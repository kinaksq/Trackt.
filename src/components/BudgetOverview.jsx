import React from 'react';
import { formatCurrency, calculateCategoryTotals, getCurrentMonthTransactions } from '../utils/helpers';
import { DEFAULT_CATEGORIES, DEFAULT_BUDGETS } from '../utils/constants';

export default function BudgetOverview({ transactions, currency }) {
  const monthlyTransactions = getCurrentMonthTransactions(transactions);
  const categoryTotals = calculateCategoryTotals(monthlyTransactions);

  const totalBudget = DEFAULT_BUDGETS.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = DEFAULT_BUDGETS.reduce((sum, b) => sum + (categoryTotals[b.categoryId] || 0), 0);
  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-text-light dark:text-text-dark tracking-tight text-[32px] font-bold leading-tight mb-1">
          Monthly Budgets
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Overall Budget Card */}
      <div className="flex flex-col items-stretch justify-start rounded-xl md:flex-row md:items-center bg-surface-light dark:bg-surface-dark shadow-sm">
        <div className="flex-shrink-0 p-4 md:p-6 flex items-center justify-center">
          <div className="relative size-32">
            <svg className="size-full" viewBox="0 0 36 36">
              <path
                className="stroke-current text-border-light dark:text-dark-border"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
              />
              <path
                className="stroke-current text-primary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeDasharray={`${Math.min(overallPercentage, 100)}, 100`}
                strokeLinecap="round"
                strokeWidth="3"
                transform="rotate(90 18 18)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-text-light dark:text-text-dark">
                {Math.round(overallPercentage)}%
              </span>
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Spent</span>
            </div>
          </div>
        </div>

        <div className="flex w-full min-w-0 grow flex-col items-stretch justify-center gap-2 py-4 px-4 md:px-2 md:py-6">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Total Spent</p>
          <p className="text-text-light dark:text-text-dark text-2xl font-bold leading-tight tracking-[-0.015em]">
            {formatCurrency(totalSpent, currency)}
          </p>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal">
            of {formatCurrency(totalBudget, currency)} budget
          </p>
        </div>
      </div>

      {/* Individual Budgets */}
      <div className="flex flex-col gap-1">
        {DEFAULT_BUDGETS.map(budget => {
          const category = DEFAULT_CATEGORIES.expense.find(cat => cat.id === budget.categoryId);
          const spent = categoryTotals[budget.categoryId] || 0;
          const percentage = (spent / budget.limit) * 100;
          const isOverBudget = percentage > 100;
          const isWarning = percentage > 80 && percentage <= 100;

          return (
            <div key={budget.categoryId} className="flex items-center gap-4 bg-transparent py-3 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center shrink-0 size-12 rounded-lg bg-surface-light dark:bg-surface-dark text-2xl shadow-sm">
                  {category.icon}
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                    {category.name}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">
                    {formatCurrency(spent, currency)} / {formatCurrency(budget.limit, currency)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isOverBudget && (
                  <span className="material-symbols-outlined text-accent text-xl">warning</span>
                )}
                <div className="w-20 overflow-hidden rounded-full bg-border-light dark:bg-dark-border h-2">
                  <div
                    className={`h-full rounded-full ${
                      isOverBudget ? 'bg-accent' :
                      isWarning ? 'bg-yellow-500' :
                      'bg-primary'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {DEFAULT_BUDGETS.length === 0 && (
        <div className="rounded-xl p-4 bg-surface-light dark:bg-surface-dark shadow-sm text-center py-12">
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            No budgets set. Add budgets to track your spending!
          </p>
        </div>
      )}
    </div>
  );
}
