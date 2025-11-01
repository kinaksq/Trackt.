import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { DEFAULT_CURRENCY } from './constants';

export const formatCurrency = (amount, currencyCode = DEFAULT_CURRENCY) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export const formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const getCurrentMonthTransactions = (transactions) => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return isWithinInterval(transactionDate, { start, end });
  });
};

export const calculateCategoryTotals = (transactions) => {
  const totals = {};
  
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      if (!totals[transaction.category]) {
        totals[transaction.category] = 0;
      }
      totals[transaction.category] += transaction.amount;
    }
  });
  
  return totals;
};

export const calculateBalance = (transactions) => {
  return transactions.reduce((balance, transaction) => {
    return transaction.type === 'income' 
      ? balance + transaction.amount 
      : balance - transaction.amount;
  }, 0);
};

export const getMonthlyStats = (transactions) => {
  const monthlyTransactions = getCurrentMonthTransactions(transactions);
  
  const income = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return { income, expenses, balance: income - expenses };
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
