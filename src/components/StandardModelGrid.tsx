import React, { useState, useMemo } from 'react';
import { Particle, PARTICLES } from '../data/particlesData';
import { ParticleSymbol } from './ParticleSymbol';
import { Eye, Search, Zap, Sparkles, ChevronDown } from 'lucide-react';

interface StandardModelGridProps {
  onSelectParticle: (particle: Particle) => void;
}

type DisplayMetric = 'mass' | 'charge' | 'spin' | 'isospin' | 'year' | 'lifetime';
type ForceHighlight = 'all' | 'strong' | 'electromagnetic' | 'weak' | 'higgs';

export const StandardModelGrid: React.FC<StandardModelGridProps> = ({ onSelectParticle }) => {
  const [displayMetric, setDisplayMetric] = useState<DisplayMetric>('mass');
  const [forceFilter, setForceFilter] = useState<ForceHighlight>('all');
  const [showHypothetical, setShowHypothetical] = useState(false);
  const [matrixSearch, setMatrixSearch] = useState('');

  // Categorize canonical particles
  const quarksUp = useMemo(
    () => PARTICLES.filter((p) => p.category === 'quark' && p.subtype === 'up_type_quark'),
    []
  );
  const quarksDown = useMemo(
    () => PARTICLES.filter((p) => p.category === 'quark' && p.subtype === 'down_type_quark'),
    []
  );
  const leptonsCharged = useMemo(
    () => PARTICLES.filter((p) => p.category === 'lepton' && p.subtype === 'charged_lepton'),
    []
  );
  const leptonsNeutral = useMemo(
    () => PARTICLES.filter((p) => p.category === 'lepton' && p.subtype === 'neutral_lepton'),
    []
  );
  const gaugeBosons = useMemo(
    () => PARTICLES.filter((p) => p.category === 'gauge_boson'),
    []
  );
  const scalarBosons = useMemo(
    () => PARTICLES.filter((p) => p.category === 'scalar_boson'),
    []
  );
  const hypotheticalParticles = useMemo(
    () => PARTICLES.filter((p) => p.category === 'hypothetical'),
    []
  );

  // Helper for force interaction highlighting
  const matchesForce = (p: Particle): boolean => {
    if (forceFilter === 'all') return true;
    if (forceFilter === 'strong') {
      return p.category === 'quark' || p.id === 'gluon';
    }
    if (forceFilter === 'electromagnetic') {
      return p.chargeNumeric !== 0 || p.id === 'photon';
    }
    if (forceFilter === 'weak') {
      return (
        p.category === 'quark' ||
        p.category === 'lepton' ||
        p.id === 'w-boson' ||
        p.id === 'z-boson' ||
        p.id === 'higgs-boson'
      );
    }
    if (forceFilter === 'higgs') {
      return p.massRawMeV > 0;
    }
    return true;
  };

  const getMetricValue = (p: Particle, metric: DisplayMetric) => {
    switch (metric) {
      case 'mass':
        return p.mass;
      case 'charge':
        return p.charge;
      case 'spin':
        return p.spin;
      case 'isospin':
        return p.weakIsospin;
      case 'year':
        return p.discoveredYear === 0 ? 'Hypoth.' : `${p.discoveredYear}`;
      case 'lifetime':
        return p.lifetime;
    }
  };

  const getParticleDisplayName = (p: Particle): string[] => {
    switch (p.id) {
      case 'up-quark':
        return ['up'];
      case 'down-quark':
        return ['down'];
      case 'charm-quark':
        return ['charm'];
      case 'strange-quark':
        return ['strange'];
      case 'top-quark':
        return ['top'];
      case 'bottom-quark':
        return ['bottom'];
      case 'electron':
        return ['electron'];
      case 'muon':
        return ['muon'];
      case 'tau':
        return ['tau'];
      case 'electron-neutrino':
        return ['electron', 'neutrino'];
      case 'muon-neutrino':
        return ['muon', 'neutrino'];
      case 'tau-neutrino':
        return ['tau', 'neutrino'];
      case 'gluon':
        return ['gluon'];
      case 'photon':
        return ['photon'];
      case 'z-boson':
        return ['Z boson'];
      case 'w-boson':
        return ['W boson'];
      case 'higgs-boson':
        return ['Higgs', 'boson'];
      case 'graviton':
        return ['graviton'];
      case 'axion':
        return ['axion'];
      case 'gluino':
        return ['gluino'];
      case 'neutralino':
        return ['neutralino'];
      case 'dark-photon':
        return ['dark', 'photon'];
      case 'w-prime-boson':
        return ['W′/Z′', 'boson'];
      default:
        return [p.name.toLowerCase()];
    }
  };

  const renderParticleCard = (p: Particle) => {
    const isHighlighted = matchesForce(p);
    const isSearchMatched =
      !matrixSearch ||
      p.name.toLowerCase().includes(matrixSearch.toLowerCase()) ||
      p.symbol.toLowerCase().includes(matrixSearch.toLowerCase()) ||
      p.forceOrRole.toLowerCase().includes(matrixSearch.toLowerCase());

    const isDimmed = !isHighlighted || !isSearchMatched;

    const isQuark = p.category === 'quark';
    const isLepton = p.category === 'lepton';
    const isGauge = p.category === 'gauge_boson';
    const isScalar = p.category === 'scalar_boson';
    const isHypo = p.category === 'hypothetical';

    // Wikimedia-exact color schemes with subtle particle gradient ball
    let theme = {
      cardBg: 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-500',
      symbolColor: 'text-slate-900 dark:text-white',
      ballGlow: 'bg-slate-200/40 dark:bg-slate-800/40',
      accentGlow: 'hover:shadow-md dark:hover:shadow-slate-900/50',
    };

    if (isQuark) {
      theme = {
        cardBg: 'bg-purple-50/80 dark:bg-purple-950/25 border-purple-300 dark:border-purple-600/70 hover:border-purple-500',
        symbolColor: 'text-purple-950 dark:text-purple-100',
        ballGlow: 'bg-purple-300/35 dark:bg-purple-500/25',
        accentGlow: 'hover:shadow-[0_0_16px_rgba(168,85,247,0.22)]',
      };
    } else if (isLepton) {
      theme = {
        cardBg: 'bg-emerald-50/80 dark:bg-emerald-950/25 border-emerald-300 dark:border-emerald-600/70 hover:border-emerald-500',
        symbolColor: 'text-emerald-950 dark:text-emerald-100',
        ballGlow: 'bg-emerald-300/35 dark:bg-emerald-500/25',
        accentGlow: 'hover:shadow-[0_0_16px_rgba(16,185,129,0.22)]',
      };
    } else if (isGauge) {
      theme = {
        cardBg: 'bg-rose-50/80 dark:bg-rose-950/25 border-rose-300 dark:border-rose-600/70 hover:border-rose-500',
        symbolColor: 'text-rose-950 dark:text-rose-100',
        ballGlow: 'bg-rose-300/35 dark:bg-rose-500/25',
        accentGlow: 'hover:shadow-[0_0_16px_rgba(244,63,94,0.22)]',
      };
    } else if (isScalar) {
      theme = {
        cardBg: 'bg-amber-50/80 dark:bg-amber-950/25 border-amber-300 dark:border-amber-600/70 hover:border-amber-500',
        symbolColor: 'text-amber-950 dark:text-amber-100',
        ballGlow: 'bg-amber-300/35 dark:bg-amber-500/25',
        accentGlow: 'hover:shadow-[0_0_16px_rgba(245,158,11,0.22)]',
      };
    } else if (isHypo) {
      theme = {
        cardBg: 'bg-cyan-50/70 dark:bg-cyan-950/20 border-cyan-300 dark:border-cyan-600/60 hover:border-cyan-500 border-dashed',
        symbolColor: 'text-cyan-950 dark:text-cyan-100',
        ballGlow: 'bg-cyan-300/35 dark:bg-cyan-500/25',
        accentGlow: 'hover:shadow-[0_0_16px_rgba(6,182,212,0.22)]',
      };
    }

    return (
      <button
        key={p.id}
        onClick={() => onSelectParticle(p)}
        className={`group relative flex flex-col justify-between rounded-xl border-2 p-1.5 sm:p-2 text-left transition-all duration-150 cursor-pointer overflow-hidden aspect-square w-full select-none ${
          theme.cardBg
        } ${theme.accentGlow} ${
          isDimmed
            ? 'opacity-25 grayscale-[70%] scale-[0.98]'
            : 'opacity-100 hover:scale-[1.03] shadow-xs'
        }`}
      >
        {/* Central Particle Sphere Aura (Authentic Wikimedia Ball) */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full pointer-events-none transition-all duration-300 ${theme.ballGlow} group-hover:scale-115`}
        />

        {/* Top Detail: Selected from Filter on Top */}
        <div className="relative z-10 flex items-center justify-between w-full font-mono text-[8px] sm:text-[9px] leading-tight tracking-tight">
          <span className="font-semibold truncate text-slate-700 dark:text-slate-300 max-w-full">
            {getMetricValue(p, displayMetric)}
          </span>
        </div>

        {/* Center: Iconic Bold Particle Symbol */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`text-xl sm:text-2xl lg:text-3xl font-black font-mono tracking-tight leading-none ${theme.symbolColor} group-hover:scale-110 transition-transform`}
          >
            <ParticleSymbol symbol={p.symbol} />
          </span>
        </div>

        {/* Bottom: Proper Particle Name in Bold, Centered (Matching Wikimedia Standard) */}
        <div className="relative z-10 w-full text-center mt-auto flex flex-col items-center justify-end min-h-[20px]">
          {getParticleDisplayName(p).map((line, i) => (
            <span
              key={i}
              className="text-[8.5px] sm:text-[9.5px] font-extrabold text-slate-900 dark:text-slate-100 block leading-[1.05] tracking-tight"
            >
              {line}
            </span>
          ))}
        </div>
      </button>
    );
  };

  return (
    <section className="space-y-3">
      {/* Top Controls Toolbar: Force Interactions, Metric Switcher, Search, BSM */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-slate-900/90 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        {/* Force Interaction Couplings Filter */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
            <Zap className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">FORCES:</span>
          </span>
          {[
            { id: 'all', label: 'All' },
            { id: 'strong', label: 'Strong (QCD)' },
            { id: 'electromagnetic', label: 'EM (QED)' },
            { id: 'weak', label: 'Weak (SU(2))' },
            { id: 'higgs', label: 'Higgs' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setForceFilter(f.id as ForceHighlight)}
              className={`rounded-md px-2 py-1 text-xs font-mono transition cursor-pointer ${
                forceFilter === f.id
                  ? 'bg-cyan-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Metric Selector + Search + BSM */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 px-1 flex items-center gap-1">
              <Eye className="h-2.5 w-2.5 text-cyan-600 dark:text-cyan-400" />
            </span>
            {(['mass', 'charge', 'spin', 'isospin', 'year', 'lifetime'] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setDisplayMetric(metric)}
                className={`rounded px-1.5 py-0.5 text-[11px] font-mono capitalize transition cursor-pointer ${
                  displayMetric === metric
                    ? 'bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 font-bold shadow-xs border border-cyan-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={matrixSearch}
              onChange={(e) => setMatrixSearch(e.target.value)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pl-6 pr-2 py-1 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none w-28 sm:w-36 font-mono"
            />
          </div>
        </div>
      </div>

      {/* MATRIX VIEW: Compact Smaller Square Tiles Layout */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[480px] max-w-[620px] mx-auto space-y-1.5 select-none">
          
          {/* Top Macro Banner: Three Generations (Fermions) | Force Carriers (Bosons) */}
          <div className="grid grid-cols-[44px_repeat(5,1fr)] gap-1.5 text-center font-mono text-[10px] font-bold">
            <div />
            {/* Columns 1-3: Three Generations of Matter */}
            <div className="col-span-3 rounded-lg border border-blue-200 dark:border-blue-900/40 bg-blue-50/70 dark:bg-blue-950/20 py-1 px-1.5 text-blue-900 dark:text-blue-300">
              Three generations of matter (fermions)
            </div>
            {/* Columns 4-5: Interactions / Force Carriers */}
            <div className="col-span-2 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/70 dark:bg-red-950/20 py-1 px-1.5 text-red-900 dark:text-red-300">
              Interactions / force carriers (bosons)
            </div>
          </div>

          {/* Column Headers: I, II, III, Gauge Bosons, Scalar Bosons */}
          <div className="grid grid-cols-[44px_repeat(5,1fr)] gap-1.5 text-center font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">
            {/* Left Top Legend for Active Detail */}
            <div className="flex flex-col justify-center text-right pr-1 text-[9px] font-mono text-cyan-600 dark:text-cyan-400 font-bold leading-tight">
              <span className="capitalize">{displayMetric} →</span>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-xs font-extrabold text-blue-700 dark:text-blue-400">
              I
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-xs font-extrabold text-blue-700 dark:text-blue-400">
              II
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-xs font-extrabold text-blue-700 dark:text-blue-400">
              III
            </div>
            <div className="bg-rose-50/80 dark:bg-rose-950/30 text-rose-800 dark:text-rose-400 py-1 rounded-md border border-rose-200 dark:border-rose-900/40 truncate px-0.5 text-[9px]">
              gauge bosons
            </div>
            <div className="bg-amber-50/80 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 py-1 rounded-md border border-amber-200 dark:border-amber-900/40 truncate px-0.5 text-[9px]">
              scalar bosons
            </div>
          </div>

          {/* QUARKS SECTION (Rows 1 & 2) */}
          <div className="relative grid grid-cols-[44px_1fr] gap-1.5 items-center">
            {/* Left Vertical QUARKS Banner */}
            <div className="rounded-xl border-2 border-purple-300 dark:border-purple-600/70 bg-purple-100/60 dark:bg-purple-950/30 h-full flex flex-col items-center justify-center p-0.5 text-center font-mono">
              <span className="text-[10px] font-black tracking-widest text-purple-800 dark:text-purple-300 [writing-mode:vertical-lr] rotate-180 uppercase select-none">
                QUARKS
              </span>
            </div>

            {/* Quarks Rows (2 Rows × 5 Columns) */}
            <div className="space-y-1.5">
              {/* Row 1: Up, Charm, Top, Gluon, Higgs */}
              <div className="grid grid-cols-5 gap-1.5 items-center">
                {renderParticleCard(quarksUp[0])}
                {renderParticleCard(quarksUp[1])}
                {renderParticleCard(quarksUp[2])}
                {renderParticleCard(gaugeBosons[0])}
                {renderParticleCard(scalarBosons[0])}
              </div>

              {/* Row 2: Down, Strange, Bottom, Photon, [Empty Slot] */}
              <div className="grid grid-cols-5 gap-1.5 items-center">
                {renderParticleCard(quarksDown[0])}
                {renderParticleCard(quarksDown[1])}
                {renderParticleCard(quarksDown[2])}
                {renderParticleCard(gaugeBosons[1])}
                <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/10 aspect-square w-full flex items-center justify-center text-slate-300 dark:text-slate-700 font-mono text-xs select-none">
                  —
                </div>
              </div>
            </div>
          </div>

          {/* LEPTONS SECTION (Rows 3 & 4) */}
          <div className="relative grid grid-cols-[44px_1fr] gap-1.5 items-center pt-0.5">
            {/* Left Vertical LEPTONS Banner */}
            <div className="rounded-xl border-2 border-emerald-300 dark:border-emerald-600/70 bg-emerald-100/60 dark:bg-emerald-950/30 h-full flex flex-col items-center justify-center p-0.5 text-center font-mono">
              <span className="text-[10px] font-black tracking-widest text-emerald-800 dark:text-emerald-300 [writing-mode:vertical-lr] rotate-180 uppercase select-none">
                LEPTONS
              </span>
            </div>

            {/* Leptons Rows (2 Rows × 5 Columns) */}
            <div className="space-y-1.5">
              {/* Row 3: Electron, Muon, Tau, Z Boson, [Empty Slot] */}
              <div className="grid grid-cols-5 gap-1.5 items-center">
                {renderParticleCard(leptonsCharged[0])}
                {renderParticleCard(leptonsCharged[1])}
                {renderParticleCard(leptonsCharged[2])}
                {renderParticleCard(gaugeBosons[3])}
                <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/10 aspect-square w-full flex items-center justify-center text-slate-300 dark:text-slate-700 font-mono text-xs select-none">
                  —
                </div>
              </div>

              {/* Row 4: Electron Neutrino, Muon Neutrino, Tau Neutrino, W Boson, [Empty Slot] */}
              <div className="grid grid-cols-5 gap-1.5 items-center">
                {renderParticleCard(leptonsNeutral[0])}
                {renderParticleCard(leptonsNeutral[1])}
                {renderParticleCard(leptonsNeutral[2])}
                {renderParticleCard(gaugeBosons[2])}
                <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/10 aspect-square w-full flex items-center justify-center text-slate-300 dark:text-slate-700 font-mono text-xs select-none">
                  —
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beyond Standard Model (BSM) Collapsible Section Below Main Matrix */}
      <div className="max-w-[620px] mx-auto pt-1">
        <button
          onClick={() => setShowHypothetical(!showHypothetical)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition cursor-pointer text-xs font-mono select-none ${
            showHypothetical
              ? 'border-cyan-400 dark:border-cyan-700 bg-cyan-50/70 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200'
              : 'border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-cyan-400 dark:hover:border-cyan-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="font-bold tracking-tight">Beyond Standard Model (BSM) Candidates</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
              (Graviton, Axion, Gluino, Neutralino, Dark Photon, W′/Z′)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-700 dark:text-cyan-300">
            <span>{showHypothetical ? 'Hide' : 'Show'}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                showHypothetical ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {showHypothetical && (
          <div className="mt-2 rounded-xl border border-cyan-200 dark:border-cyan-900/40 bg-cyan-50/30 dark:bg-cyan-950/15 p-2.5 space-y-1.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-cyan-200 dark:border-cyan-900/40 pb-1 font-mono text-xs">
              <span className="text-cyan-800 dark:text-cyan-300 font-bold text-[11px]">
                HYPOTHETICAL & EXTENDED GAUGE SECTOR
              </span>
              <span className="text-[9px] text-slate-500">
                Click any candidate tile to inspect quantum properties
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {hypotheticalParticles.map((p) => renderParticleCard(p))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
