import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import { DEFAULT_CATEGORIES } from '../utils/constants';

export default function TransactionList({ transactions, onDelete, currency }) {
  const getCategoryInfo = (type, categoryId) => {
    const categories = DEFAULT_CATEGORIES[type];
    return categories.find(cat => cat.id === categoryId) || categories[categories.length - 1];
  };

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg p-3 bg-surface-light dark:bg-surface-dark shadow-lg shadow-secondary/10 text-center py-12">
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          No transactions yet. Add your first transaction to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      {transactions.map(transaction => {
        const category = getCategoryInfo(transaction.type, transaction.category);

        return (
          <div
            key={transaction.id}
            className="flex items-center gap-4 rounded-lg p-3 bg-surface-light dark:bg-surface-dark shadow-lg shadow-secondary/10"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-[#EFEBE9] dark:bg-[#2D2420] text-xl">
              {category.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-text-light dark:text-text-dark font-medium">
                {category.name}
              </p>
              {transaction.description && (
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm truncate">
                  {transaction.description}
                </p>
              )}
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                {formatDate(transaction.date)}
              </p>
            </div>

            <p
              className={`font-semibold ${
                transaction.type === 'income'
                  ? 'text-income'
                  : 'text-expense'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount, currency)}
            </p>
          </div>
        );
      })}
    </>
  );
}
