import React from 'react';
import { calculateCategoryTotals, getCurrentMonthTransactions, formatCurrency } from '../utils/helpers';
import { DEFAULT_CATEGORIES } from '../utils/constants';

export default function SpendingChart({ transactions, currency }) {
  const monthlyTransactions = getCurrentMonthTransactions(transactions);
  const categoryTotals = calculateCategoryTotals(monthlyTransactions);

  const totalSpent = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  const chartData = Object.entries(categoryTotals).map(([categoryId, amount]) => {
    const category = DEFAULT_CATEGORIES.expense.find(cat => cat.id === categoryId);
    return {
      name: category?.name || 'Other',
      value: amount,
      percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
      color: category?.color || '#6b7280',
    };
  }).sort((a, b) => b.value - a.value);

  if (chartData.length === 0) {
    return (
      <div className="px-4">
        <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Spending Breakdown</h2>
        <div className="text-center py-12">
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            No expenses this month to display
          </p>
        </div>
      </div>
    );
  }

  // Calculate cumulative percentages for donut segments
  let cumulativePercentage = 0;
  const segments = chartData.map(item => {
    const segment = {
      ...item,
      offset: cumulativePercentage
    };
    cumulativePercentage += item.percentage;
    return segment;
  });

  return (
    <div>
      <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Spending Breakdown</h2>

      <div className="flex flex-col items-center justify-center gap-4 px-4 py-6">
        {/* Donut Chart */}
        <div className="relative flex items-center justify-center size-48">
          <svg className="size-full" viewBox="0 0 36 36">
            {segments.map((segment, index) => (
              <circle
                key={index}
                className="origin-center -rotate-90"
                cx="18"
                cy="18"
                fill="none"
                r="15.9155"
                stroke={segment.color}
                strokeDasharray={`${segment.percentage}, 100`}
                strokeDashoffset={-segment.offset}
                strokeWidth="3"
              />
            ))}
          </svg>
          <div className="absolute flex flex-col items-center">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Total Spent</p>
            <p className="text-text-light dark:text-text-dark text-2xl font-bold">{formatCurrency(totalSpent, currency)}</p>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                {item.name} ({Math.round(item.percentage)}%)
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
