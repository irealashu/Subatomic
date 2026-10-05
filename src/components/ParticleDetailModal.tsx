import React, { useState } from 'react';
import { Particle } from '../data/particlesData';
import { ParticleSymbol } from './ParticleSymbol';
import { X, Sparkles, History, GitPullRequest, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

interface ParticleDetailModalProps {
  particle: Particle | null;
  onClose: () => void;
  onSelectRelated?: (particleId: string) => void;
}

export const ParticleDetailModal: React.FC<ParticleDetailModalProps> = ({
  particle,
  onClose,
  onSelectRelated,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'decays' | 'couplings' | 'history'>('overview');

  if (!particle) return null;

  const getCategoryColor = (cat: Particle['category']) => {
    switch (cat) {
      case 'quark':
        return {
          text: 'text-purple-700 dark:text-purple-300',
          bg: 'bg-purple-100 dark:bg-purple-500/10',
          border: 'border-purple-300 dark:border-purple-500/30',
        };
      case 'lepton':
        return {
          text: 'text-emerald-700 dark:text-emerald-300',
          bg: 'bg-emerald-100 dark:bg-emerald-500/10',
          border: 'border-emerald-300 dark:border-emerald-500/30',
        };
      case 'gauge_boson':
        return {
          text: 'text-amber-700 dark:text-amber-300',
          bg: 'bg-amber-100 dark:bg-amber-500/10',
          border: 'border-amber-300 dark:border-amber-500/30',
        };
      case 'scalar_boson':
        return {
          text: 'text-rose-700 dark:text-rose-300',
          bg: 'bg-rose-100 dark:bg-rose-500/10',
          border: 'border-rose-300 dark:border-rose-500/30',
        };
      case 'hypothetical':
        return {
          text: 'text-cyan-700 dark:text-cyan-300',
          bg: 'bg-cyan-100 dark:bg-cyan-500/10',
          border: 'border-cyan-300 dark:border-cyan-500/30',
        };
    }
  };

  const theme = getCategoryColor(particle.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${theme.border} ${theme.bg} text-2xl font-bold ${theme.text}`}>
              <ParticleSymbol symbol={particle.symbol} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{particle.name}</h2>
                <span className={`text-xs font-mono uppercase px-2 py-0.5 rounded border ${theme.border} ${theme.bg} ${theme.text}`}>
                  {particle.category.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {particle.forceOrRole}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/40 px-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'overview'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Quantum Numbers & Profile
          </button>
          <button
            onClick={() => setActiveTab('decays')}
            className={`py-3 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'decays'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Decay Modes ({particle.decayModes?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('couplings')}
            className={`py-3 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'couplings'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Feynman Vertices
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'history'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Discovery & History
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-slate-700 dark:text-slate-300 text-sm">
          {activeTab === 'overview' && (
            <>
              {/* Description */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
                <p className="leading-relaxed text-slate-800 dark:text-slate-200">
                  {particle.description}
                </p>
              </div>

              {/* Quantum Numbers Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Fundamental Quantum Numbers & Invariants
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-3 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 block">REST MASS (m₀)</span>
                    <span className="text-base font-mono font-bold text-slate-900 dark:text-white tabular-nums">{particle.mass}</span>
                  </div>

                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-3 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 block">ELECTRIC CHARGE (Q)</span>
                    <span className="text-base font-mono font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">{particle.charge}</span>
                  </div>

                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-3 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 block">SPIN (J)</span>
                    <span className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{particle.spin}</span>
                  </div>

                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-3 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 block">MEAN LIFETIME (τ)</span>
                    <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-300 block truncate" title={particle.lifetime}>
                      {particle.lifetime}
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-3 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 block">WEAK ISOSPIN (I₃)</span>
                    <span className="text-sm font-mono font-medium text-slate-800 dark:text-slate-200 tabular-nums">{particle.weakIsospin}</span>
                  </div>

                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-3 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 block">WEAK HYPERCHARGE (Y<sub>W</sub>)</span>
                    <span className="text-sm font-mono font-medium text-slate-800 dark:text-slate-200 tabular-nums">{particle.weakHypercharge}</span>
                  </div>

                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-3 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 block">COLOR CHARGE</span>
                    <span className="text-xs font-mono font-medium text-purple-600 dark:text-purple-300">{particle.colorCharge}</span>
                  </div>

                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-3 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 block">ANTIPARTICLE</span>
                    <span className="text-xs font-mono font-medium text-rose-600 dark:text-rose-300 truncate block" title={particle.antiparticle}>
                      {particle.antiparticle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Physical Properties */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Physical Properties
                </h4>
                <ul className="space-y-2">
                  {particle.keyProperties.map((prop, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                      <span>{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {activeTab === 'decays' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-3 text-xs text-slate-600 dark:text-slate-400">
                <span>Branching fractions and primary decay channels governed by selection rules and conservation laws.</span>
              </div>

              {particle.decayModes && particle.decayModes.length > 0 ? (
                <div className="space-y-3">
                  {particle.decayModes.map((decay, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-4 space-y-2 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono font-semibold text-slate-900 dark:text-white">
                          <ParticleSymbol symbol={particle.symbol} />
                          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-cyan-700 dark:text-cyan-300">{decay.products.join(' + ')}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                          {decay.branchingRatio}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span className="font-mono">Mechanism:</span>
                        <span>{decay.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No decay channels available (particle is strictly stable or quantum mediator).</p>
              )}
            </div>
          )}

          {activeTab === 'couplings' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-3 text-xs text-slate-600 dark:text-slate-400">
                <span>Gauge group representation and permissible fundamental interaction vertices in Quantum Field Theory (QFT).</span>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-4 space-y-2 shadow-xs">
                <span className="text-xs font-mono text-slate-500 block">GAUGE SYMMETRY GROUP</span>
                <p className="font-mono text-sm text-cyan-700 dark:text-cyan-300">
                  {particle.gaugeGroup ? (
                    particle.gaugeGroup
                  ) : (
                    <span>SU(3)<sub>C</sub> × SU(2)<sub>L</sub> × U(1)<sub>Y</sub></span>
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Coupling Vertices
                </span>
                <div className="space-y-2">
                  {particle.feynmanInteractions.map((coupling, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-3 text-xs shadow-xs">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 shrink-0 font-mono font-bold">
                        {i + 1}
                      </div>
                      <span className="font-mono text-slate-800 dark:text-slate-200">{coupling}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono text-slate-500 block">DISCOVERY YEAR</span>
                    <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                      {particle.discoveredYear === 0 ? 'Hypothesized (Unobserved)' : particle.discoveredYear}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-500 block">FACILITY</span>
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{particle.discoveryFacility}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-500 block">DISCOVERERS / THEORISTS</span>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{particle.discoveredBy}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 px-6 py-3 text-xs text-slate-500">
          <span className="font-mono">Elementary Particle Quantum Invariants</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 dark:bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
