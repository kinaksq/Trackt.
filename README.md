# 💰 Trackt - Personal Finance Management App

A beautiful, mobile-responsive finance tracking application with a focus on simplicity and elegant design. Built with React, Tailwind CSS, and modern web technologies to help you manage your personal finances effortlessly.

![Finance Tracker](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality
- **📊 Transaction Management**: Add, view, and delete income/expense transactions with ease
- **📈 Visual Analytics**: Interactive pie charts showing spending breakdown by category
- **💵 Budget Tracking**: Set and monitor monthly budgets with real-time progress tracking
- **💱 Multi-Currency Support**: Track finances in multiple currencies (USD, EUR, GBP, JPY, and more)
- **📱 Mobile-First Design**: Fully responsive interface optimized for mobile and desktop
- **🌓 Dark Mode**: Seamless dark/light theme switching with system preference detection
- **💾 Local Storage**: All data stored locally in browser (no backend required, privacy-focused)
- **📥 Export/Import**: Backup and restore your data via JSON export/import
- **⚡ Fast & Lightweight**: Built with Vite for lightning-fast performance

### User Experience
- **🎨 Animated Splash Screen**: Beautiful branded loading experience on app start
- **🎯 Intuitive Interface**: Clean, modern design with smooth animations and transitions
- **😊 Smart Categories**: Pre-configured expense and income categories with emoji icons
- **📊 Monthly Overview**: Comprehensive dashboard with income, expenses, and balance statistics
- **⚠️ Budget Alerts**: Visual warnings when approaching or exceeding budget limits
- **📜 Transaction History**: View all transactions sorted chronologically with detailed breakdowns
- **➕ Quick Actions**: Floating action button for instant transaction entry
- **👤 User Profile**: Customizable profile with avatar color theming
- **🗂️ Bottom Navigation**: Easy tab-based navigation for Home, Transactions, Budgets, and Settings

## 🎬 Demo

> **Note**: Add screenshots or a live demo link here when deployed!

### Key Screens
- **Splash Screen**: Animated gradient background with loading progress
- **Dashboard**: Monthly statistics with income, expenses, and balance overview
- **Transactions**: Full transaction history with category filtering
- **Budgets**: Budget management with progress tracking
- **Settings**: Theme toggle, currency selection, profile customization, and data management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed on your machine
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   cd finance-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deployment

You can deploy this to any static hosting service:

- **Vercel**:
  ```bash
  npm install -g vercel
  vercel deploy
  ```
- **Netlify**: Drag and drop the `dist` folder or connect your Git repository
- **GitHub Pages**: Use GitHub Actions workflow
- **Cloudflare Pages**: Connect your repository and auto-deploy on push

## 💾 Data Management

### Local Storage
- All data is stored locally in your browser using localStorage
- No backend server required - complete privacy
- Data persists between sessions

### Export/Import
- **Export Data**: Download your transactions and settings as a JSON file
- **Import Data**: Restore from a previously exported JSON file
- **Delete All Data**: Clear all transactions and reset the app (with confirmation)

### Data Stored
- `transactions`: Array of all income/expense transactions
- `budgets`: Array of budget configurations
- `darkMode`: Theme preference (light/dark)
- `currency`: Selected currency preference
- `profile`: User profile information (name, email, avatar colors)

## 🎨 Customization

### Adding New Categories

Edit `src/utils/constants.js`:

```javascript
export const DEFAULT_CATEGORIES = {
  expense: [
    { id: 'custom', name: 'Custom Category', icon: '🎯', color: '#ff6b6b' },
    // Add more categories...
  ],
};
```

### Adjusting Budgets

Modify the `DEFAULT_BUDGETS` array in `src/utils/constants.js`:

```javascript
export const DEFAULT_BUDGETS = [
  { categoryId: 'food', limit: 500 },
  { categoryId: 'transport', limit: 200 },
  // Add or modify budget limits...
];
```

### Changing Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize primary colors
      }
    }
  }
}
```

## 🏗️ Project Structure

```
finance-tracker/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── AllTransactions.jsx    # Full transaction history view
│   │   ├── BottomNav.jsx          # Bottom navigation bar
│   │   ├── BudgetOverview.jsx     # Budget display component
│   │   ├── Budgets.jsx            # Budget management page
│   │   ├── CurrencySelector.jsx   # Currency selection dropdown
│   │   ├── Header.jsx             # App header with currency display
│   │   ├── Settings.jsx           # Settings page
│   │   ├── SpendingChart.jsx      # Pie chart visualization
│   │   ├── SplashScreen.jsx       # Animated splash screen
│   │   ├── StatCard.jsx           # Statistics card component
│   │   ├── TransactionForm.jsx    # Add/edit transaction modal
│   │   └── TransactionList.jsx    # Transaction list display
│   ├── hooks/
│   │   └── useLocalStorage.js     # Custom hook for localStorage
│   ├── utils/
│   │   ├── constants.js           # App constants, categories, currencies
│   │   └── helpers.js             # Utility functions (stats, formatting)
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles & animations
├── theme/                         # Design reference files
│   ├── splash.png                 # Splash screen design reference
│   ├── splash-code.html           # Splash screen HTML reference
│   └── ...                        # Other design references
├── index.html                     # HTML template
├── package.json                   # Dependencies & scripts
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── vite.config.js                 # Vite build configuration
```

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library with hooks
- **Vite 5.0.8** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework for responsive design

### UI Components & Icons
- **Recharts 2.10.3** - Interactive chart visualizations (pie charts)
- **Lucide React 0.263.1** - Beautiful, consistent icon library
- **date-fns 2.30.0** - Modern JavaScript date utility library

### Development Tools
- **PostCSS** - CSS transformations
- **Autoprefixer** - Automatic vendor prefixing

### Design Features
- **Custom CSS Animations** - Smooth fade-in, scale, and gradient animations
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- **Dark Mode Support** - System preference detection with manual toggle
- **Sustainable Sage Color Palette** - Custom color scheme for light/dark themes

## 🎯 Future Enhancements

Potential features to expand functionality:

### Data & Analytics
- [ ] Advanced analytics dashboard with trends over time
- [ ] Monthly/yearly comparison charts
- [ ] Spending predictions based on historical data
- [ ] Custom date range filtering

### Transaction Management
- [ ] Recurring transactions (subscriptions, bills)
- [ ] Transaction search and advanced filters
- [ ] Bulk transaction editing
- [ ] Receipt photo attachments
- [ ] Transaction tags and notes

### Budget & Goals
- [ ] Financial goal tracking (savings targets)
- [ ] Debt tracking and payoff calculator
- [ ] Custom budget periods (weekly, quarterly)
- [ ] Budget rollover to next month

### Advanced Features
- [ ] Multiple accounts/wallets support
- [ ] Cloud sync across devices (Firebase/Supabase)
- [ ] PWA offline support with service workers
- [ ] Bank account integration (Plaid API)
- [ ] Export to CSV/PDF reports
- [ ] Notification reminders for bills
- [ ] Category spending insights

### UI/UX Improvements
- [ ] Custom category management UI
- [ ] Drag-and-drop transaction organization
- [ ] More chart types (line, bar, area)
- [ ] Onboarding tutorial for new users
- [ ] Keyboard shortcuts

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 About This Project

**Trackt** is a portfolio project showcasing modern web development skills and best practices:

### Key Highlights
✅ **Modern React Patterns** - Functional components, custom hooks, and clean state management
✅ **Responsive Design** - Mobile-first approach with Tailwind CSS utilities
✅ **User Experience** - Smooth animations, intuitive navigation, and accessible UI
✅ **Data Visualization** - Interactive charts with Recharts library
✅ **Theme Support** - Complete dark/light mode implementation
✅ **Local-First Architecture** - Privacy-focused with localStorage persistence
✅ **Clean Code** - Well-organized component structure and reusable utilities
✅ **Performance** - Optimized builds with Vite and lazy loading

### Built With Care For
- Demonstrating frontend development expertise
- Showcasing UI/UX design sensibilities
- Proving problem-solving abilities
- Portfolio presentation to potential employers
- Learning and implementing best practices

Perfect for showcasing React development skills in technical interviews!

## 📞 Contact & Support

For questions, suggestions, or collaboration opportunities:
- 🐛 Open an issue on GitHub
- 📧 Reach out via email (add your email)
- 💼 Connect on LinkedIn (add your LinkedIn)
- 🌐 Visit my portfolio (add your portfolio URL)

---

**Made with ❤️ as a portfolio project**
If you found this helpful, please give it a ⭐ on GitHub!
