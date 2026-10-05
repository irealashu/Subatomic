import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-2 pb-6 space-y-6">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Main Headline & Quantitative Metric Cards */}
      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400">
            <span>STANDARD MODEL OF PARTICLE PHYSICS</span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span>GAUGE THEORY SU(3)<sub>C</sub> × SU(2)<sub>L</sub> × U(1)<sub>Y</sub></span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Fundamental Building Blocks of Reality
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The mathematical and empirical framework describing all 17 confirmed elementary particles, their quantum invariants (mass, charge, spin, weak isospin), and the fundamental gauge forces mediating all interactions in the universe.
          </p>
        </div>
      </div>

      {/* Quantitative Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-3.5 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">STANDARD PARTICLES</span>
          <span className="text-xl font-mono font-bold text-slate-900 dark:text-white tabular-nums mt-0.5 block">17 Confirmed</span>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">6 Quarks · 6 Leptons · 4 Gauge · 1 Higgs</span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-3.5 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">FUNDAMENTAL INTERACTIONS</span>
          <span className="text-xl font-mono font-bold text-cyan-600 dark:text-cyan-400 tabular-nums mt-0.5 block">4 Forces</span>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">Strong · Weak · Electromagnetic · Gravity</span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-3.5 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">QUARK EXPERIMENTAL LIMIT</span>
          <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5 block">&lt; 10⁻¹⁹ m</span>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">Point-like at LHC 13.6 TeV scale</span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-3.5 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">HIGGS VACUUM EXPECTATION</span>
          <span className="text-xl font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums mt-0.5 block">v = 246.22 GeV</span>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">Higgs mass m<sub>H</sub> = 125.25 GeV/c²</span>
        </div>
      </div>
    </section>
  );
};
