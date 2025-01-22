import React from 'react';

type LanguageSwitcherProps = {
  currentLang: 'th' | 'en';
  onLanguageChange: (lang: 'th' | 'en') => void;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex justify-end md:fixed top-4 right-4 z-50">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={() => onLanguageChange('th')}
          className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
            currentLang === 'th'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          ไทย
        </button>
        <button
          type="button"
          onClick={() => onLanguageChange('en')}
          className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
            currentLang === 'en'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;