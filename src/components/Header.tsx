import React from 'react';
import { Sun, Moon, Atom } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const { theme, toggleTheme } = useTheme();

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'matrix':
        return 'Standard Model';
      case 'feynman':
        return 'Decay & Interaction Diagrams';
      case 'hadron':
        return 'Hadron Builder';
      case 'comparator':
        return 'Conservation Laws';
      case 'timeline':
        return 'Discovery Milestones';
      default:
        return 'Standard Model';
    }
  };

  const title = getTabTitle(activeTab);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="flex h-12 items-center justify-between px-4 sm:px-6">
        {/* Left: Site Logo, Site Name & Section Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 select-none shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
              <Atom className="h-4 w-4 animate-spin-slow" />
            </div>
            <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
              SUBATOMIC
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-700 select-none">/</span>

          <h1 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-tight truncate">
            {title}
          </h1>
        </div>

        {/* Right: Theme Toggle Only */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer shadow-xs"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-700" />
          )}
        </button>
      </div>
    </header>
  );
};
