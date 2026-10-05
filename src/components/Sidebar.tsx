import React, { useState } from 'react';
import {
  Atom,
  GitBranch,
  Layers,
  ShieldCheck,
  History,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onHoverChange?: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onHoverChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHoverChange) onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHoverChange) onHoverChange(false);
  };

  const navItems = [
    {
      id: 'matrix',
      label: 'Standard Model',
      description: 'Periodic Classification',
      icon: Atom,
    },
    {
      id: 'feynman',
      label: 'Decay Diagrams',
      description: 'Perturbative Interactions',
      icon: GitBranch,
    },
    {
      id: 'hadron',
      label: 'Hadron Builder',
      description: 'Quark Bound States',
      icon: Layers,
    },
    {
      id: 'comparator',
      label: 'Conservation Laws',
      description: 'Quantum Invariants',
      icon: ShieldCheck,
    },
    {
      id: 'timeline',
      label: 'Milestones',
      description: 'Experimental Discovery',
      icon: History,
    },
  ];

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-0 left-0 z-40 h-screen border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-all duration-200 ease-out flex flex-col justify-between select-none shadow-md dark:shadow-none overflow-hidden ${
        isHovered ? 'w-64' : 'w-16'
      }`}
    >
      {/* Navigation Items */}
      <div className="flex flex-col flex-1 pt-3">
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition cursor-pointer text-left group relative ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-200 dark:border-cyan-500/30 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
                } ${!isHovered ? 'justify-center px-0' : ''}`}
                title={!isHovered ? `${item.label}` : undefined}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 transition-colors ${
                    isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                  }`}
                />

                {isHovered && (
                  <div className="flex flex-col min-w-0 transition-opacity duration-150 whitespace-nowrap">
                    <span className="text-xs font-semibold leading-tight truncate">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate font-mono">
                      {item.description}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Bar: Clean Minimalist Version Indicator (No extra buttons) */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 text-center">
        {isHovered ? (
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 whitespace-nowrap">
            <span>SU(3)𝒸 × SU(2)ʟ × U(1)ʏ</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">17 Particles</span>
          </div>
        ) : (
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto" />
        )}
      </div>
    </aside>
  );
};
