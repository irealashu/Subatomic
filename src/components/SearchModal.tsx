import React, { useState, useEffect } from 'react';
import { PARTICLES, Particle } from '../data/particlesData';
import { PRESET_HADRONS } from '../data/hadronsData';
import { REACTION_PROCESSES } from '../data/reactionsData';
import { TIMELINE_DATA } from '../data/timelineData';
import { ParticleSymbol } from './ParticleSymbol';
import { Search, X, Atom, Layers, GitBranch, History, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectParticle: (particle: Particle) => void;
  onNavigateTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectParticle,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedParticles = PARTICLES.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.symbol.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.forceOrRole.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const matchedHadrons = PRESET_HADRONS.filter(h =>
    h.name.toLowerCase().includes(query.toLowerCase()) ||
    h.symbol.toLowerCase().includes(query.toLowerCase()) ||
    h.quarks.join('').toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchedReactions = REACTION_PROCESSES.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.equation.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchedMilestones = TIMELINE_DATA.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.particle.toLowerCase().includes(query.toLowerCase()) ||
    m.year.toString().includes(query)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50 dark:bg-slate-950/60">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search particles (quarks, leptons, bosons), hadrons, Feynman decays, or milestones..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4 text-xs">
          {/* Elementary Particles */}
          {matchedParticles.length > 0 && (
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase px-2 block">
                ELEMENTARY PARTICLES ({matchedParticles.length})
              </span>
              {matchedParticles.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectParticle(p);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-slate-100 dark:bg-slate-950 font-bold text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-800 text-xs">
                      <ParticleSymbol symbol={p.symbol} />
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{p.name}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{p.mass} · {p.charge}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-slate-500">
                    {p.category.replace('_', ' ')}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Hadrons */}
          {matchedHadrons.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800/60">
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase px-2 block">
                COMPOSITE HADRONS
              </span>
              {matchedHadrons.map(h => (
                <button
                  key={h.id}
                  onClick={() => {
                    onNavigateTab('hadron');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-sm">
                      {h.symbol}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">{h.name}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Quarks: [{h.quarks.join(' ')}] · {h.mass}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {/* Reactions */}
          {matchedReactions.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800/60">
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase px-2 block">
                FEYNMAN REACTIONS & DECAYS
              </span>
              {matchedReactions.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    onNavigateTab('feynman');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition cursor-pointer"
                >
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">{r.name}</span>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">{r.equation}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {/* Milestones */}
          {matchedMilestones.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800/60">
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase px-2 block">
                HISTORICAL NOBEL MILESTONES
              </span>
              {matchedMilestones.map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    onNavigateTab('timeline');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{m.year}</span>
                    <span className="text-slate-900 dark:text-white">{m.title}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {matchedParticles.length === 0 && matchedHadrons.length === 0 && matchedReactions.length === 0 && (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500 font-mono">
              No matching particle, reaction, or timeline event found for "{query}".
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 px-4 py-2.5 text-[11px] font-mono text-slate-500">
          <span>Navigate with mouse or arrow keys</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
