export const DEFAULT_CATEGORIES = {
  expense: [
    { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#ef4444' },
    { id: 'transport', name: 'Transportation', icon: '🚗', color: '#3b82f6' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#ec4899' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎮', color: '#8b5cf6' },
    { id: 'bills', name: 'Bills & Utilities', icon: '📄', color: '#f59e0b' },
    { id: 'health', name: 'Health & Fitness', icon: '💊', color: '#10b981' },
    { id: 'education', name: 'Education', icon: '📚', color: '#06b6d4' },
    { id: 'other', name: 'Other', icon: '💰', color: '#6b7280' },
  ],
  income: [
    { id: 'salary', name: 'Salary', icon: '💼', color: '#10b981' },
    { id: 'freelance', name: 'Freelance', icon: '💻', color: '#3b82f6' },
    { id: 'investment', name: 'Investment', icon: '📈', color: '#8b5cf6' },
    { id: 'gift', name: 'Gift', icon: '🎁', color: '#ec4899' },
    { id: 'other-income', name: 'Other', icon: '💵', color: '#6b7280' },
  ],
};

export const DEFAULT_BUDGETS = [
  { categoryId: 'food', limit: 500 },
  { categoryId: 'transport', limit: 200 },
  { categoryId: 'shopping', limit: 300 },
  { categoryId: 'entertainment', limit: 150 },
  { categoryId: 'bills', limit: 400 },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
];

export const DEFAULT_CURRENCY = 'USD';
