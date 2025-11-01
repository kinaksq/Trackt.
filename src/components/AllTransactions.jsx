import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../utils/helpers';
import { DEFAULT_CATEGORIES } from '../utils/constants';

export default function AllTransactions({ transactions, currency, onClose }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTimeFilter, setActiveTimeFilter] = useState('all-time');

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter by type
    if (activeFilter === 'income') {
      filtered = filtered.filter(t => t.type === 'income');
    } else if (activeFilter === 'expenses') {
      filtered = filtered.filter(t => t.type === 'expense');
    }

    // Filter by time period
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (activeTimeFilter === 'this-month') {
      filtered = filtered.filter(t => new Date(t.date) >= startOfMonth);
    } else if (activeTimeFilter === 'last-30-days') {
      filtered = filtered.filter(t => new Date(t.date) >= thirtyDaysAgo);
    }

    // Sort by date and time (newest first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date);
      const dateB = new Date(b.createdAt || b.date);
      return dateB - dateA;
    });

    return filtered;
  }, [transactions, activeFilter, activeTimeFilter]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups = {};
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    filteredTransactions.forEach(transaction => {
      const txDate = new Date(transaction.date);
      const txDateOnly = new Date(txDate.getFullYear(), txDate.getMonth(), txDate.getDate());

      let groupKey;
      if (txDateOnly.getTime() === today.getTime()) {
        groupKey = 'Today';
      } else if (txDateOnly.getTime() === yesterday.getTime()) {
        groupKey = 'Yesterday';
      } else {
        groupKey = txDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(transaction);
    });

    return groups;
  }, [filteredTransactions]);

  const getCategory = (transaction) => {
    const categories = DEFAULT_CATEGORIES[transaction.type];
    return categories.find(cat => cat.id === transaction.category) || categories[categories.length - 1];
  };

  const formatTime = (transaction) => {
    const date = new Date(transaction.createdAt || transaction.date);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const FilterPill = ({ label, value, timeFilter = false }) => {
    const isActive = timeFilter
      ? activeTimeFilter === value
      : activeFilter === value;

    const handleClick = () => {
      if (timeFilter) {
        setActiveTimeFilter(value);
      } else {
        setActiveFilter(value);
        // Reset time filter when changing type filter to "all"
        if (value === 'all') {
          setActiveTimeFilter('all-time');
        }
      }
    };

    return (
      <button
        onClick={handleClick}
        className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 transition-colors ${
          isActive
            ? 'bg-primary text-white'
            : 'bg-surface-sage-light dark:bg-surface-dark border border-border-forest-light dark:border-dark-border text-secondary dark:text-text-dark'
        }`}
      >
        <p className="text-sm font-medium leading-normal">
          {label}
        </p>
      </button>
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
            All Transactions
          </h1>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center p-0">
              <span className="material-symbols-outlined text-2xl text-secondary dark:text-primary">filter_list</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filter Pills */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          <FilterPill label="All" value="all" />
          <FilterPill label="Income" value="income" />
          <FilterPill label="Expenses" value="expenses" />
          <FilterPill label="All Time" value="all-time" timeFilter />
          <FilterPill label="This Month" value="this-month" timeFilter />
          <FilterPill label="Last 30 Days" value="last-30-days" timeFilter />
        </div>
      </div>

      {/* Transactions List */}
      <main className="flex-grow px-4 pb-6">
        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="material-symbols-outlined text-6xl mb-4 text-border-forest-light dark:text-dark-text-secondary">receipt_long</span>
            <p className="text-base font-medium text-text-muted dark:text-dark-text-secondary">No transactions found</p>
            <p className="text-sm text-text-muted dark:text-dark-text-secondary">Try adjusting your filters</p>
          </div>
        ) : (
          Object.entries(groupedTransactions).map(([dateGroup, txs]) => (
            <div key={dateGroup}>
              {/* Sticky Date Header */}
              <div
                className="sticky z-10 -mx-4 px-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm"
                style={{ top: '72px' }}
              >
                <h2 className="text-sm font-bold leading-tight tracking-wide py-3 uppercase text-text-muted dark:text-dark-text-secondary">
                  {dateGroup}
                </h2>
              </div>

              {/* Transaction Items */}
              {txs.map((transaction) => {
                const category = getCategory(transaction);
                const isIncome = transaction.type === 'income';

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-4 min-h-[72px] py-2 justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center rounded-full shrink-0 size-12 ${
                          isIncome ? 'bg-income/10' : 'bg-expense/10'
                        }`}
                      >
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-base font-medium leading-normal line-clamp-1 text-text-light dark:text-text-dark">
                          {category.name}
                        </p>
                        <p className="text-sm font-normal leading-normal line-clamp-2 text-text-muted dark:text-dark-text-secondary">
                          {transaction.description || 'No description'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-base font-medium leading-normal ${isIncome ? 'text-income' : 'text-expense'}`}>
                        {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount), currency)}
                      </p>
                      <p className="text-xs font-normal leading-normal text-text-muted dark:text-dark-text-secondary">
                        {formatTime(transaction)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
