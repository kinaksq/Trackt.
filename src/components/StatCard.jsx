import React from 'react';
import { formatCurrency } from '../utils/helpers';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function StatCard({ title, amount, icon: Icon, color, trend, currency }) {
  const iconMap = {
    TrendingUp: 'arrow_upward',
    TrendingDown: 'arrow_downward',
    Wallet: 'account_balance_wallet'
  };

  const colorClasses = {
    green: 'bg-income/20 text-income',
    red: 'bg-expense/20 text-expense',
    blue: 'bg-primary/20 text-primary',
  };

  const materialIcon = iconMap[Icon.name] || 'account_balance_wallet';

  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl min-w-[15rem] p-4 bg-glass-bg-light border border-glass-border-light backdrop-blur-xl shadow-lg shadow-secondary/10 dark:bg-glass-bg-dark dark:border-glass-border-dark">
      <div className={`flex items-center justify-center size-10 rounded-full ${colorClasses[color]}`}>
        <span className="material-symbols-outlined">{materialIcon}</span>
      </div>
      <div>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">
          {title}
        </p>
        <p className="text-text-light dark:text-text-dark text-2xl font-bold leading-tight">
          {formatCurrency(amount, currency)}
        </p>
        {trend && (
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}
