'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 dark:from-indigo-400 dark:to-blue-600 shadow-lg overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-500 ${
          dark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}>
          <svg className="w-4 h-4 text-yellow-200 absolute top-1 right-1" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <circle cx="18" cy="6" r="1.5" opacity="0.6"/>
            <circle cx="6" cy="18" r="1" opacity="0.4"/>
          </svg>
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          dark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}>
          <svg className="w-5 h-5 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="4"/>
            <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
              <line x1="12" y1="2" x2="12" y2="4"/>
              <line x1="12" y1="20" x2="12" y2="22"/>
              <line x1="2" y1="12" x2="4" y2="12"/>
              <line x1="20" y1="12" x2="22" y2="12"/>
            </g>
          </svg>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {dark ? 'الوضع النهاري' : 'الوضع الليلي'}
      </span>
      <div className="mr-auto flex items-center gap-1.5">
        <span className="text-xs text-gray-400">{dark ? '☀️' : '🌙'}</span>
      </div>
    </button>
  );
}
