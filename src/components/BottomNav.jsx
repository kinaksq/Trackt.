import React from 'react';

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'transactions', label: 'Transactions', icon: 'receipt_long' },
    { id: 'budgets', label: 'Budgets', icon: 'account_balance_wallet' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-light dark:border-dark-border bg-white dark:bg-surface-dark shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
              aria-label={tab.label}
            >
              <span
                className={`material-symbols-outlined transition-all text-2xl ${
                  isActive
                    ? 'text-primary'
                    : 'text-border-forest-light dark:text-dark-text-secondary'
                }`}
                style={{
                  fontVariationSettings: isActive ? '"FILL" 1, "wght" 600' : '"FILL" 0, "wght" 400'
                }}
              >
                {tab.icon}
              </span>
              <span
                className={`text-xs font-medium mt-1 transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-border-forest-light dark:text-dark-text-secondary'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
