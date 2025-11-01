import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SpendingChart from './components/SpendingChart';
import Settings from './components/Settings';
import AllTransactions from './components/AllTransactions';
import Budgets from './components/Budgets';
import BottomNav from './components/BottomNav';
import SplashScreen from './components/SplashScreen';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getMonthlyStats } from './utils/helpers';
import { DEFAULT_CURRENCY } from './utils/constants';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [currency, setCurrency] = useLocalStorage('currency', DEFAULT_CURRENCY);
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useLocalStorage('profile', {
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatarColor1: '#6EAD6E',
    avatarColor2: '#2D5F3F'
  });

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify({ transactions, currency, darkMode }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fintrack-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.transactions) {
              setTransactions(data.transactions);
            }
            if (data.currency) {
              setCurrency(data.currency);
            }
            if (typeof data.darkMode === 'boolean') {
              setDarkMode(data.darkMode);
            }
            alert('Data imported successfully!');
          } catch (error) {
            alert('Error importing data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleDeleteAllData = () => {
    if (window.confirm('Are you sure you want to delete ALL data? This action cannot be undone.')) {
      if (window.confirm('This will permanently delete all your transactions and settings. Are you absolutely sure?')) {
        setTransactions([]);
        setBudgets([]);
        localStorage.clear();
        alert('All data has been deleted.');
        setActiveTab('home');
      }
    }
  };

  const handleAddBudget = (budget) => {
    setBudgets(prev => [...prev, budget]);
  };

  const handleDeleteBudget = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setBudgets(prev => prev.filter(b => b.id !== id));
    }
  };

  const stats = getMonthlyStats(transactions);
  const sortedTransactions = [...transactions].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  // Show splash screen while loading
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden pb-16">
      {/* Home Tab */}
      {activeTab === 'home' && (
        <>
          <Header
            currency={currency}
            onCurrencyChange={setCurrency}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />

          {/* Horizontal Scrolling Stats */}
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-4">
              <StatCard
                title="Total Balance"
                amount={stats.balance}
                icon={Wallet}
                color="blue"
                currency={currency}
              />
              <StatCard
                title="This Month's Income"
                amount={stats.income}
                icon={TrendingUp}
                color="green"
                currency={currency}
              />
              <StatCard
                title="This Month's Expenses"
                amount={stats.expenses}
                icon={TrendingDown}
                color="red"
                currency={currency}
              />
            </div>
          </div>

          {/* Spending Breakdown */}
          <SpendingChart transactions={transactions} currency={currency} />

          {/* Recent Activity */}
          <div className="flex items-center justify-between px-4 pb-3 pt-5">
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Recent Activity
            </h2>
          </div>
          <div className="flex flex-col px-4 gap-3 pb-6">
            <TransactionList
              transactions={sortedTransactions.slice(0, 5)}
              onDelete={handleDeleteTransaction}
              currency={currency}
            />
          </div>
        </>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <AllTransactions
          transactions={transactions}
          currency={currency}
          onClose={() => setActiveTab('home')}
        />
      )}

      {/* Budgets Tab */}
      {activeTab === 'budgets' && (
        <Budgets
          budgets={budgets}
          transactions={transactions}
          currency={currency}
          onClose={() => setActiveTab('home')}
          onAddBudget={handleAddBudget}
          onDeleteBudget={handleDeleteBudget}
        />
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <Settings
          onClose={() => setActiveTab('home')}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          currency={currency}
          onCurrencyChange={setCurrency}
          onExportData={handleExportData}
          onImportData={handleImportData}
          onDeleteAllData={handleDeleteAllData}
          profile={profile}
          onProfileChange={setProfile}
        />
      )}

      {/* Floating Action Button - Show on Home and Transactions tabs */}
      {(activeTab === 'home' || activeTab === 'transactions') && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-20 right-6 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-background-light dark:text-background-dark shadow-lg shadow-primary/40 transition-all hover:scale-110 active:scale-95 z-40"
          aria-label="Add transaction"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}

      {/* Transaction Form Modal */}
      {showForm && (
        <TransactionForm
          onAdd={handleAddTransaction}
          onClose={() => setShowForm(false)}
          currency={currency}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
