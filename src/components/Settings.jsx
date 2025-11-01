import React from 'react';
import { CURRENCIES } from '../utils/constants';

export default function Settings({
  onClose,
  darkMode,
  toggleDarkMode,
  currency,
  onCurrencyChange,
  onExportData,
  onImportData,
  onDeleteAllData,
  profile,
  onProfileChange
}) {
  const [showCurrencySelector, setShowCurrencySelector] = React.useState(false);
  const [showEditProfile, setShowEditProfile] = React.useState(false);

  return (
    <div className="min-h-screen overflow-y-auto pb-20 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
        <button
          onClick={onClose}
          className="flex size-10 shrink-0 items-center justify-start text-text-light dark:text-text-dark"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-text-light dark:text-text-dark">
          Settings
        </h1>
        <button
          onClick={onClose}
          className="flex items-center justify-end"
        >
          <p className="text-base font-bold leading-normal tracking-[0.015em] text-primary">Done</p>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-4 space-y-8 pb-6">
        {/* Profile Section */}
        <button
          onClick={() => setShowEditProfile(true)}
          className="flex w-full flex-col gap-4 sm:flex-row sm:items-center hover:opacity-80 transition-opacity text-left"
        >
          <div className="flex gap-4 items-center">
            <div
              className="bg-gradient-to-br bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 sm:h-24 sm:w-24"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${profile.avatarColor1}, ${profile.avatarColor2})`
              }}
              aria-label="User avatar"
            />
            <div className="flex flex-col justify-center">
              <p className="text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">
                {profile.name}
              </p>
              <p className="text-base font-normal text-text-muted dark:text-text-secondary-dark">
                {profile.email}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-sm text-primary">edit</span>
                <p className="text-sm font-normal leading-normal text-text-muted dark:text-text-secondary-dark">
                  Tap to edit profile
                </p>
              </div>
            </div>
          </div>
        </button>

        {/* Preferences Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] px-1 text-text-light dark:text-text-dark">
            Preferences
          </h2>
          <div className="flex flex-col overflow-hidden rounded-xl shadow-sm bg-white dark:bg-surface-dark">
            {/* Currency */}
            <button
              onClick={() => setShowCurrencySelector(!showCurrencySelector)}
              className="flex items-center gap-4 px-4 min-h-16 justify-between border-b border-border-light dark:border-border-dark transition-colors hover:opacity-90"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">attach_money</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Currency
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <p className="text-base font-normal leading-normal text-text-muted dark:text-text-secondary-dark">
                  {currency}
                </p>
                <span
                  className="material-symbols-outlined text-xl text-text-muted dark:text-text-secondary-dark transition-transform"
                  style={{ transform: showCurrencySelector ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  chevron_right
                </span>
              </div>
            </button>

            {/* Currency List Dropdown */}
            {showCurrencySelector && (
              <div className="border-b border-border-light dark:border-border-dark bg-light-surface-contrast dark:bg-dark-background">
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      onCurrencyChange(curr.code);
                      setShowCurrencySelector(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 w-full transition-colors hover:opacity-80 ${
                      currency === curr.code
                        ? 'bg-primary/10'
                        : 'bg-transparent'
                    }`}
                  >
                    <span className="text-2xl">{curr.symbol}</span>
                    <div className="flex-1 text-left">
                      <p className="text-base font-medium text-text-light dark:text-text-dark">
                        {curr.code}
                      </p>
                      <p className="text-sm text-text-muted dark:text-text-secondary-dark">
                        {curr.name}
                      </p>
                    </div>
                    {currency === curr.code && (
                      <span className="material-symbols-outlined text-xl text-primary">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Dark Mode */}
            <div className="flex items-center gap-4 px-4 min-h-16 justify-between border-b border-border-light dark:border-border-dark">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Dark Mode
                </p>
              </div>
              <div className="shrink-0">
                <button
                  onClick={toggleDarkMode}
                  className="relative inline-flex cursor-pointer items-center"
                  aria-label="Toggle dark mode"
                >
                  <div
                    className="h-7 w-12 rounded-full transition-colors"
                    style={{ backgroundColor: darkMode ? '#6EAD6E' : '#E0D8CE' }}
                  />
                  <div
                    className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${darkMode ? 'translate-x-5' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Language */}
            <button
              onClick={() => alert('Language settings coming soon! Currently available in English.')}
              className="flex items-center gap-4 px-4 min-h-16 justify-between transition-colors hover:opacity-90"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">language</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Language
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <p className="text-base font-normal leading-normal text-text-muted dark:text-text-secondary-dark">
                  English
                </p>
                <span className="material-symbols-outlined text-xl text-text-muted dark:text-text-secondary-dark">
                  chevron_right
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] px-1 text-text-light dark:text-text-dark">
            Data Management
          </h2>
          <div className="flex flex-col overflow-hidden rounded-xl shadow-sm bg-white dark:bg-surface-dark">
            {/* Export Data */}
            <button
              onClick={onExportData}
              className="flex items-center gap-4 px-4 min-h-16 justify-between border-b border-border-light dark:border-border-dark transition-colors hover:opacity-90"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">upload_file</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Export Data
                </p>
              </div>
              <div className="shrink-0">
                <span className="material-symbols-outlined text-xl text-text-muted dark:text-text-secondary-dark">
                  chevron_right
                </span>
              </div>
            </button>

            {/* Import Data */}
            <button
              onClick={onImportData}
              className="flex items-center gap-4 px-4 min-h-16 justify-between border-b border-border-light dark:border-border-dark transition-colors hover:opacity-90"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">download</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Import Data
                </p>
              </div>
              <div className="shrink-0">
                <span className="material-symbols-outlined text-xl text-text-muted dark:text-text-secondary-dark">
                  chevron_right
                </span>
              </div>
            </button>

            {/* Backup to Cloud */}
            <button
              onClick={() => alert('Cloud backup feature coming soon! Use Export Data to save your data locally for now.')}
              className="flex items-center gap-4 px-4 min-h-16 justify-between transition-colors hover:opacity-90"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Backup to Cloud
                </p>
              </div>
              <div className="shrink-0">
                <span className="material-symbols-outlined text-xl text-text-muted dark:text-text-secondary-dark">
                  chevron_right
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] px-1 text-text-light dark:text-text-dark">
            About
          </h2>
          <div className="flex flex-col overflow-hidden rounded-xl shadow-sm bg-white dark:bg-surface-dark">
            {/* App Version */}
            <div className="flex items-center gap-4 px-4 min-h-16 justify-between border-b border-border-light dark:border-border-dark">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  App Version
                </p>
              </div>
              <div className="shrink-0">
                <p className="text-base font-normal leading-normal text-text-muted dark:text-text-secondary-dark">
                  1.0.0
                </p>
              </div>
            </div>

            {/* Privacy Policy */}
            <button
              onClick={() => alert('Privacy Policy\n\nFinTrack respects your privacy. All your financial data is stored locally on your device. We do not collect, transmit, or share any of your personal or financial information.\n\nFor more information, visit our website.')}
              className="flex items-center gap-4 px-4 min-h-16 justify-between border-b border-border-light dark:border-border-dark transition-colors hover:opacity-90"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">policy</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Privacy Policy
                </p>
              </div>
              <div className="shrink-0">
                <span className="material-symbols-outlined text-xl text-text-muted dark:text-text-secondary-dark">
                  chevron_right
                </span>
              </div>
            </button>

            {/* Terms of Service */}
            <button
              onClick={() => alert('Terms of Service\n\nBy using FinTrack, you agree to use the app responsibly for personal finance tracking. The app is provided "as is" without warranties.\n\nFor full terms, visit our website.')}
              className="flex items-center gap-4 px-4 min-h-16 justify-between border-b border-border-light dark:border-border-dark transition-colors hover:opacity-90"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">gavel</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Terms of Service
                </p>
              </div>
              <div className="shrink-0">
                <span className="material-symbols-outlined text-xl text-text-muted dark:text-text-secondary-dark">
                  chevron_right
                </span>
              </div>
            </button>

            {/* Rate App */}
            <button
              onClick={() => {
                if (window.confirm('Thank you for using FinTrack! Would you like to rate us?\n\n(This would normally open your app store)')) {
                  alert('⭐⭐⭐⭐⭐\n\nThank you for your feedback!');
                }
              }}
              className="flex items-center gap-4 px-4 min-h-16 justify-between transition-colors hover:opacity-90"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg shrink-0 size-10 bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">star</span>
                </div>
                <p className="text-base font-medium leading-normal flex-1 truncate text-text-light dark:text-text-dark">
                  Rate App
                </p>
              </div>
              <div className="shrink-0">
                <span className="material-symbols-outlined text-xl text-text-muted dark:text-text-secondary-dark">
                  chevron_right
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] px-1 text-accent">
            Danger Zone
          </h2>
          <div>
            <button
              onClick={onDeleteAllData}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-accent px-4 py-3 text-base font-bold text-accent transition-colors hover:bg-accent/20 active:bg-accent/30"
            >
              <span className="material-symbols-outlined">delete_forever</span>
              Delete All Data
            </button>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          profile={profile}
          onSave={onProfileChange}
          onClose={() => setShowEditProfile(false)}
        />
      )}
    </div>
  );
}

// Edit Profile Modal Component
function EditProfileModal({ profile, onSave, onClose }) {
  const [formData, setFormData] = React.useState({
    name: profile.name,
    email: profile.email,
    avatarColor1: profile.avatarColor1,
    avatarColor2: profile.avatarColor2
  });

  const avatarColorPresets = [
    { color1: '#6EAD6E', color2: '#2D5F3F', name: 'Sage Green' },
    { color1: '#FF6B6B', color2: '#C92A2A', name: 'Red' },
    { color1: '#4DABF7', color2: '#1971C2', name: 'Blue' },
    { color1: '#FFD93D', color2: '#F59F00', name: 'Yellow' },
    { color1: '#B197FC', color2: '#7950F2', name: 'Purple' },
    { color1: '#FF922B', color2: '#E8590C', name: 'Orange' },
    { color1: '#51CF66', color2: '#2F9E44', name: 'Green' },
    { color1: '#FF6B9D', color2: '#E64980', name: 'Pink' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-surface-linen dark:bg-surface-dark rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Drag Handle */}
        <div className="flex h-5 w-full items-center justify-center pt-3">
          <div className="h-1.5 w-10 rounded-full bg-light-surface-contrast dark:bg-dark-border"></div>
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-center px-4 pt-2 pb-4">
          <h2 className="text-lg font-bold leading-normal tracking-wide text-center text-text-light dark:text-text-dark">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity text-text-light dark:text-text-dark"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 pb-6 space-y-6">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center py-4">
            <div
              className="bg-gradient-to-br rounded-full h-24 w-24 mb-3"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${formData.avatarColor1}, ${formData.avatarColor2})`
              }}
            />
            <p className="text-sm font-medium text-text-muted dark:text-dark-text-secondary mb-3">
              Choose Avatar Color
            </p>
            <div className="grid grid-cols-4 gap-3">
              {avatarColorPresets.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    avatarColor1: preset.color1,
                    avatarColor2: preset.color2
                  }))}
                  className={`h-12 w-12 rounded-full bg-gradient-to-br transition-all ${
                    formData.avatarColor1 === preset.color1 && formData.avatarColor2 === preset.color2
                      ? 'ring-4 ring-primary ring-offset-2'
                      : 'hover:scale-110'
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${preset.color1}, ${preset.color2})`
                  }}
                  aria-label={preset.name}
                />
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder=" "
              className="peer h-12 w-full rounded-lg border-2 px-4 placeholder-transparent focus:outline-none focus:ring-0 bg-light-surface-contrast dark:bg-dark-background border-border-light dark:border-dark-border text-text-light dark:text-text-dark"
              required
            />
            <label
              htmlFor="name"
              className="absolute -top-2 left-3 px-1 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs bg-surface-linen dark:bg-surface-dark text-text-muted dark:text-dark-text-secondary"
            >
              Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder=" "
              className="peer h-12 w-full rounded-lg border-2 px-4 placeholder-transparent focus:outline-none focus:ring-0 bg-light-surface-contrast dark:bg-dark-background border-border-light dark:border-dark-border text-text-light dark:text-text-dark"
              required
            />
            <label
              htmlFor="email"
              className="absolute -top-2 left-3 px-1 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs bg-surface-linen dark:bg-surface-dark text-text-muted dark:text-dark-text-secondary"
            >
              Email
            </label>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 border-t border-border-light dark:border-dark-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center rounded-xl border-2 border-border-light dark:border-dark-border text-base font-bold transition-colors hover:opacity-80 text-text-light dark:text-text-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90 bg-primary"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
