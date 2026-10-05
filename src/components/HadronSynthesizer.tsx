import React, { useState, useMemo } from 'react';
import { PRESET_HADRONS, PresetHadron, QUARK_METADATA } from '../data/hadronsData';
import { PARTICLES, Particle } from '../data/particlesData';
import { ParticleSymbol } from './ParticleSymbol';
import { RotateCcw, CheckCircle2, AlertTriangle, Trash2, Eye, Info } from 'lucide-react';

type QuarkType = 'u' | 'd' | 's' | 'c' | 'b' | 'ū' | 'd̄' | 's̄' | 'c̄' | 'b̄';

interface HadronSynthesizerProps {
  onSelectParticle?: (particleId: string) => void;
}

const QUARK_TO_PARTICLE_ID: Record<string, string> = {
  u: 'up-quark',
  d: 'down-quark',
  s: 'strange-quark',
  c: 'charm-quark',
  b: 'bottom-quark',
  'ū': 'up-quark',
  'd̄': 'down-quark',
  's̄': 'strange-quark',
  'c̄': 'charm-quark',
  'b̄': 'bottom-quark',
};

export const HadronSynthesizer: React.FC<HadronSynthesizerProps> = ({ onSelectParticle }) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetHadron | null>(PRESET_HADRONS[0]);
  const [activeQuarks, setActiveQuarks] = useState<QuarkType[]>(['u', 'u', 'd']);
  const [selectedQuark, setSelectedQuark] = useState<QuarkType>('u');

  const availableQuarks: { symbol: QuarkType; name: string; charge: string; isAnti: boolean }[] = [
    { symbol: 'u', name: 'Up', charge: '+⅔', isAnti: false },
    { symbol: 'd', name: 'Down', charge: '-⅓', isAnti: false },
    { symbol: 's', name: 'Strange', charge: '-⅓', isAnti: false },
    { symbol: 'c', name: 'Charm', charge: '+⅔', isAnti: false },
    { symbol: 'b', name: 'Bottom', charge: '-⅓', isAnti: false },
    { symbol: 'ū', name: 'Anti-Up', charge: '-⅔', isAnti: true },
    { symbol: 'd̄', name: 'Anti-Down', charge: '+⅓', isAnti: true },
    { symbol: 's̄', name: 'Anti-Strange', charge: '+⅓', isAnti: true },
    { symbol: 'c̄', name: 'Anti-Charm', charge: '-⅔', isAnti: true },
    { symbol: 'b̄', name: 'Anti-Bottom', charge: '+⅓', isAnti: true },
  ];

  // Retrieve full standard particle model for currently selected quark
  const selectedQuarkParticle: Particle | undefined = useMemo(() => {
    const particleId = QUARK_TO_PARTICLE_ID[selectedQuark] || 'up-quark';
    return PARTICLES.find(p => p.id === particleId);
  }, [selectedQuark]);

  const handleSelectPreset = (preset: PresetHadron) => {
    setSelectedPreset(preset);
    setActiveQuarks(preset.quarks as QuarkType[]);
    if (preset.quarks.length > 0) {
      setSelectedQuark(preset.quarks[0] as QuarkType);
    }
  };

  const handleAddQuark = (quark: QuarkType) => {
    if (activeQuarks.length >= 5) return;
    const next = [...activeQuarks, quark];
    setActiveQuarks(next);
    setSelectedQuark(quark);

    // Check if matches any preset
    const match = PRESET_HADRONS.find(p => {
      if (p.quarks.length !== next.length) return false;
      const sorted1 = [...p.quarks].sort().join('');
      const sorted2 = [...next].sort().join('');
      return sorted1 === sorted2;
    });
    setSelectedPreset(match || null);
  };

  const handleRemoveQuark = (index: number) => {
    const removed = activeQuarks[index];
    const next = activeQuarks.filter((_, i) => i !== index);
    setActiveQuarks(next);
    setSelectedPreset(null);
    if (next.length > 0 && selectedQuark === removed) {
      setSelectedQuark(next[0]);
    }
  };

  const handleClear = () => {
    setActiveQuarks([]);
    setSelectedPreset(null);
  };

  // Real-time calculations
  const computedStats = useMemo(() => {
    let totalCharge = 0;
    let totalBareMass = 0;
    let netQuarks = 0;
    let netStrangeness = 0;
    let netCharm = 0;
    let netBottomness = 0;

    activeQuarks.forEach(q => {
      const meta = QUARK_METADATA[q];
      if (meta) {
        totalCharge += meta.charge;
        totalBareMass += meta.mass;
        netStrangeness += meta.strangeness;
        netCharm += meta.charm;
        netBottomness += meta.bottomness;
        netQuarks += q.includes('̄') ? -1 : 1;
      }
    });

    const baryonNumber = netQuarks / 3;
    const isMeson = activeQuarks.length === 2 && activeQuarks.some(q => !q.includes('̄')) && activeQuarks.some(q => q.includes('̄'));
    const isBaryon = activeQuarks.length === 3 && activeQuarks.every(q => !q.includes('̄'));
    const isAntibaryon = activeQuarks.length === 3 && activeQuarks.every(q => q.includes('̄'));
    const isTetraquark = activeQuarks.length === 4;
    const isPentaquark = activeQuarks.length === 5;

    // Color Confinement check
    const isColorSinglet = (netQuarks % 3 === 0) || (isMeson) || (isTetraquark && netQuarks === 0) || (isPentaquark && netQuarks === 3);

    // Approximate dynamical QCD constituent mass estimate
    let estimatedMass = totalBareMass + (activeQuarks.length * 310);
    if (selectedPreset) {
      estimatedMass = selectedPreset.massMeV;
    }

    // Format charge in exact third fractions
    const roundedThirds = Math.round(totalCharge * 3);
    let chargeFormatted = '0 e';
    if (roundedThirds === 3) chargeFormatted = '+1 e';
    else if (roundedThirds === -3) chargeFormatted = '-1 e';
    else if (roundedThirds === 6) chargeFormatted = '+2 e';
    else if (roundedThirds === -6) chargeFormatted = '-2 e';
    else if (roundedThirds === 2) chargeFormatted = '+⅔ e';
    else if (roundedThirds === -2) chargeFormatted = '-⅔ e';
    else if (roundedThirds === 1) chargeFormatted = '+⅓ e';
    else if (roundedThirds === -1) chargeFormatted = '-⅓ e';
    else if (roundedThirds === 4) chargeFormatted = '+4/3 e';
    else if (roundedThirds === -4) chargeFormatted = '-4/3 e';
    else if (roundedThirds !== 0) chargeFormatted = `${totalCharge > 0 ? '+' : ''}${roundedThirds}/3 e`;

    return {
      totalCharge,
      chargeFormatted,
      totalBareMass,
      baryonNumber,
      baryonNumberFormatted: Math.abs(baryonNumber - 1) < 0.01 ? '1' : Math.abs(baryonNumber + 1) < 0.01 ? '-1' : Math.abs(baryonNumber) < 0.01 ? '0' : baryonNumber.toFixed(2),
      netStrangeness,
      netCharm,
      netBottomness,
      isColorSinglet,
      isMeson,
      isBaryon,
      isAntibaryon,
      isTetraquark,
      isPentaquark,
      estimatedMass,
    };
  }, [activeQuarks, selectedPreset]);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-1">
          <span>QUANTUM CHROMODYNAMICS (QCD)</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>QUARK CONFINEMENT & HADRON SPECTROSCOPY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Hadron Builder & Composite Particle Lab
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Construct baryons (qqq), mesons (qq̄), and exotic multiquarks. Click any constituent quark to inspect its underlying Standard Model particle profile.
        </p>
      </div>

      {/* Preset Hadron Quick Pickers */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>STANDARD & EXOTIC HADRON PRESETS:</span>
          <span>{PRESET_HADRONS.length} Verified Hadrons</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_HADRONS.map(preset => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono transition cursor-pointer border ${
                selectedPreset?.id === preset.id
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-bold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="font-bold text-slate-900 dark:text-white">{preset.symbol}</span>
              <span className="text-[11px] text-slate-500">[{preset.quarks.join('')}]</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Quark Selection & Confinement Well (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>QCD Confinement Well</span>
              <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400">
                ({activeQuarks.length}/5 Quarks)
              </span>
            </h3>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Active Quarks Well (Visual Representation) */}
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80 p-6 flex flex-col items-center justify-center min-h-[160px]">
            {activeQuarks.length === 0 ? (
              <p className="text-xs font-mono text-slate-500 text-center">
                Confinement well is empty. Select constituent quarks below to assemble a hadron state.
              </p>
            ) : (
              <div className="space-y-3 w-full flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {activeQuarks.map((q, idx) => {
                    const meta = QUARK_METADATA[q];
                    const isSelected = selectedQuark === q;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedQuark(q)}
                        className={`group relative flex flex-col items-center justify-center h-16 w-16 rounded-2xl border transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 ring-2 ring-cyan-500 shadow-md scale-105'
                            : 'border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-950/40 hover:border-purple-500 shadow-xs'
                        }`}
                        title={`Select ${q} to view particle model`}
                      >
                        <span className="font-mono text-xl font-bold text-purple-800 dark:text-purple-300">
                          {q}
                        </span>
                        <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                          {meta.charge > 0 ? (meta.charge > 0.5 ? '+⅔ e' : '+⅓ e') : (meta.charge < -0.5 ? '-⅔ e' : '-⅓ e')}
                        </span>

                        {/* Remove Quark button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveQuark(idx);
                          }}
                          className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition cursor-pointer shadow"
                          title="Remove quark"
                          aria-label="Remove quark"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Click any constituent quark above to inspect its elementary particle model.
                </span>
              </div>
            )}
          </div>

          {/* Embedded Selected Particle Model Inspector */}
          {selectedQuarkParticle && (
            <div className="rounded-xl border border-cyan-200 dark:border-cyan-900/50 bg-cyan-50/50 dark:bg-cyan-950/30 p-4 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-cyan-200 dark:border-cyan-900/40 pb-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-900/60 border border-cyan-300 dark:border-cyan-700 font-mono text-2xl font-black text-cyan-800 dark:text-cyan-200 shadow-xs">
                    <ParticleSymbol symbol={selectedQuarkParticle.symbol} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {selectedQuarkParticle.name}
                      </span>
                      {selectedQuark.includes('̄') && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                          Antiquark
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 block">
                      {selectedQuarkParticle.forceOrRole.split(';')[0]}
                    </span>
                  </div>
                </div>

                {onSelectParticle && (
                  <button
                    onClick={() => onSelectParticle(selectedQuarkParticle.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-cyan-300 dark:border-cyan-700 bg-white dark:bg-cyan-900/50 px-3 py-1.5 text-xs font-mono font-bold text-cyan-800 dark:text-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-800/80 transition cursor-pointer shadow-xs"
                    title="Open full particle model modal"
                  >
                    <Eye className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Deep-Dive Model →</span>
                  </button>
                )}
              </div>

              {/* Quantum Invariants of Selected Particle */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="rounded-lg bg-white/80 dark:bg-slate-900/70 p-2 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">REST MASS</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{selectedQuarkParticle.mass}</span>
                </div>
                <div className="rounded-lg bg-white/80 dark:bg-slate-900/70 p-2 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">ELECTRIC CHARGE</span>
                  <span className="font-bold text-cyan-700 dark:text-cyan-300">
                    {selectedQuark.includes('̄')
                      ? (selectedQuarkParticle.charge.startsWith('+') ? selectedQuarkParticle.charge.replace('+', '-') : selectedQuarkParticle.charge.replace('-', '+'))
                      : selectedQuarkParticle.charge}
                  </span>
                </div>
                <div className="rounded-lg bg-white/80 dark:bg-slate-900/70 p-2 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">SPIN (J)</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedQuarkParticle.spin}</span>
                </div>
                <div className="rounded-lg bg-white/80 dark:bg-slate-900/70 p-2 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">COLOR (QCD)</span>
                  <span className="font-semibold text-purple-700 dark:text-purple-300 text-[11px] truncate block" title={selectedQuarkParticle.colorCharge}>
                    {selectedQuark.includes('̄') ? 'Anti-Color' : 'R, G, or B'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {selectedQuarkParticle.description}
              </p>
            </div>
          )}

          {/* Quark Palette */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider block">
              Add Constituent Quarks & Antiquarks
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {availableQuarks.map(q => (
                <button
                  key={q.symbol}
                  onClick={() => handleAddQuark(q.symbol)}
                  disabled={activeQuarks.length >= 5}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition cursor-pointer ${
                    activeQuarks.length >= 5
                      ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950'
                      : q.isAnti
                      ? 'border-rose-200 dark:border-rose-900/40 bg-rose-50/70 dark:bg-rose-950/20 hover:border-rose-400 dark:hover:border-rose-500/50 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-rose-800 dark:text-rose-200'
                      : 'border-purple-200 dark:border-purple-900/40 bg-purple-50/70 dark:bg-purple-950/20 hover:border-purple-400 dark:hover:border-purple-500/50 hover:bg-purple-100 dark:hover:bg-purple-950/40 text-purple-800 dark:text-purple-200'
                  }`}
                >
                  <span className="font-mono text-base font-bold">{q.symbol}</span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{q.name}</span>
                  <span className="text-[10px] font-mono font-semibold text-cyan-700 dark:text-cyan-400 mt-0.5">{q.charge} e</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quantum Numbers & Mass Synthesis (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-4 shadow-xs">
          <div className="border-b border-slate-200 dark:border-slate-800/80 pb-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedPreset ? selectedPreset.name : 'Custom Bound State'}
              </h4>
              <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400">
                {selectedPreset?.type.toUpperCase() || (activeQuarks.length === 2 ? 'MESON CANDIDATE' : activeQuarks.length === 3 ? 'BARYON CANDIDATE' : 'EXOTIC STATE')}
              </span>
            </div>

            {computedStats.isColorSinglet ? (
              <span className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/50 px-2 py-1 rounded">
                <CheckCircle2 className="h-3 w-3" /> Color Singlet
              </span>
            ) : (
              <span className="flex items-center gap-1 font-mono text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/50 px-2 py-1 rounded">
                <AlertTriangle className="h-3 w-3" /> Non-Singlet
              </span>
            )}
          </div>

          {/* Computed Quantum Properties */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
              <span className="font-mono text-slate-500 dark:text-slate-400">NET ELECTRIC CHARGE (Q)</span>
              <span className="font-mono font-bold text-cyan-700 dark:text-cyan-400 text-sm tabular-nums">
                {computedStats.chargeFormatted}
              </span>
            </div>

            <div className="flex justify-between items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
              <span className="font-mono text-slate-500 dark:text-slate-400">BARYON NUMBER (B)</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-sm tabular-nums">
                {computedStats.baryonNumberFormatted}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-2.5 text-center">
                <span className="font-mono text-[10px] text-slate-500 block">STRANGENESS</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">{computedStats.netStrangeness}</span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-2.5 text-center">
                <span className="font-mono text-[10px] text-slate-500 block">CHARM</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">{computedStats.netCharm}</span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-2.5 text-center">
                <span className="font-mono text-[10px] text-slate-500 block">BOTTOMNESS</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">{computedStats.netBottomness}</span>
              </div>
            </div>

            {/* Mass Breakdown (Bare vs Constituent QCD) */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-4 space-y-2">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Mass Breakdown (Bare vs QCD Dynamic Mass)
              </span>
              
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Sum of Bare Quark Masses:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 tabular-nums">{computedStats.totalBareMass.toFixed(2)} MeV/c²</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">QCD Gluon Binding & Kinetic Energy:</span>
                <span className="font-mono text-cyan-700 dark:text-cyan-400 tabular-nums">~{(computedStats.estimatedMass - computedStats.totalBareMass).toFixed(1)} MeV/c²</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-bold">
                <span className="text-slate-900 dark:text-white">Total Hadron Mass:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">{computedStats.estimatedMass.toFixed(1)} MeV/c²</span>
              </div>
            </div>

            {/* Explanation box */}
            {selectedPreset && (
              <div className="rounded-xl border border-cyan-200 dark:border-cyan-900/30 bg-cyan-50/60 dark:bg-cyan-950/20 p-3 text-xs text-slate-700 dark:text-cyan-200/90 leading-relaxed">
                <span className="font-mono font-semibold text-cyan-800 dark:text-cyan-300 block mb-1">PHYSICAL CONTEXT</span>
                {selectedPreset.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
