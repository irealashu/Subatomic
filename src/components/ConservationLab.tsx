import React, { useState, useMemo } from 'react';
import { PARTICLES, Particle } from '../data/particlesData';
import { ParticleSymbol } from './ParticleSymbol';
import { ShieldCheck, CheckCircle2, XCircle, Scale } from 'lucide-react';

export const ConservationLab: React.FC = () => {
  // Comparator State
  const [selectedIds, setSelectedIds] = useState<string[]>(['electron', 'muon', 'tau-lepton', 'up-quark']);

  // Reaction Tester State
  const [reactants, setReactants] = useState<string[]>(['muon']);
  const [products, setProducts] = useState<string[]>(['electron', 'electron-neutrino', 'muon-neutrino']);

  const comparatorParticles = useMemo(() => {
    return selectedIds.map(id => PARTICLES.find(p => p.id === id)).filter(Boolean) as Particle[];
  }, [selectedIds]);

  const handleToggleComparator = (particleId: string) => {
    if (selectedIds.includes(particleId)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(id => id !== particleId));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, particleId]);
      }
    }
  };

  // Conservation calculations
  const reactionAudit = useMemo(() => {
    const reactantObjs = reactants.map(id => PARTICLES.find(p => p.id === id)).filter(Boolean) as Particle[];
    const productObjs = products.map(id => PARTICLES.find(p => p.id === id)).filter(Boolean) as Particle[];

    // Charge sum
    let initialCharge = 0;
    reactantObjs.forEach(p => initialCharge += p.chargeNumeric);
    let finalCharge = 0;
    productObjs.forEach(p => finalCharge += p.chargeNumeric);
    const chargeConserved = Math.abs(initialCharge - finalCharge) < 0.001;

    // Baryon sum
    let initialBaryon = 0;
    reactantObjs.forEach(p => initialBaryon += (p.category === 'quark' ? 1/3 : 0));
    let finalBaryon = 0;
    productObjs.forEach(p => finalBaryon += (p.category === 'quark' ? 1/3 : 0));
    const baryonConserved = Math.abs(initialBaryon - finalBaryon) < 0.001;

    // Lepton sums
    let initialLe = 0;
    let initialLmu = 0;
    let initialLtau = 0;
    reactantObjs.forEach(p => {
      if (p.id === 'electron') initialLe += 1;
      if (p.id === 'electron-neutrino') initialLe += 1;
      if (p.id === 'muon') initialLmu += 1;
      if (p.id === 'muon-neutrino') initialLmu += 1;
      if (p.id === 'tau-lepton') initialLtau += 1;
      if (p.id === 'tau-neutrino') initialLtau += 1;
    });

    let finalLe = 0;
    let finalLmu = 0;
    let finalLtau = 0;
    productObjs.forEach(p => {
      if (p.id === 'electron') finalLe += 1;
      if (p.id === 'electron-neutrino') finalLe += 1;
      if (p.id === 'muon') finalLmu += 1;
      if (p.id === 'muon-neutrino') finalLmu += 1;
      if (p.id === 'tau-lepton') finalLtau += 1;
      if (p.id === 'tau-neutrino') finalLtau += 1;
    });

    const leConserved = initialLe === finalLe;
    const lmuConserved = initialLmu === finalLmu;
    const ltauConserved = initialLtau === finalLtau;

    // Mass kinematics check (for spontaneous decay, initial mass >= final mass)
    const initialMassMeV = reactantObjs.reduce((acc, p) => acc + p.massRawMeV, 0);
    const finalMassMeV = productObjs.reduce((acc, p) => acc + p.massRawMeV, 0);
    const kinematicallyAllowed = initialMassMeV >= finalMassMeV;

    const isFullyAllowed = chargeConserved && baryonConserved && leConserved && lmuConserved && ltauConserved;

    return {
      initialCharge: initialCharge.toFixed(2),
      finalCharge: finalCharge.toFixed(2),
      chargeConserved,
      initialBaryon: initialBaryon.toFixed(2),
      finalBaryon: finalBaryon.toFixed(2),
      baryonConserved,
      leConserved,
      lmuConserved,
      ltauConserved,
      initialMassMeV,
      finalMassMeV,
      kinematicallyAllowed,
      isFullyAllowed,
    };
  }, [reactants, products]);

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-1">
          <span>NOETHER THEOREMS & INVARIANTS</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>MULTI-PARTICLE COMPARATOR & CONSERVATION LAB</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Conservation Laws & Particle Comparator
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Compare quantum invariants across elementary particles and test hypothetical reaction formulas for conservation of charge, baryon number, and lepton flavor.
        </p>
      </div>

      {/* Part 1: Side-by-Side Multi-Particle Comparator */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>Multi-Particle Side-by-Side Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select 2 to 4 particles from the Standard Model to compare their physical parameters.
            </p>
          </div>

          {/* Quick particle badges to toggle */}
          <div className="flex flex-wrap gap-1.5 max-w-xl">
            {PARTICLES.slice(0, 16).map(p => (
              <button
                key={p.id}
                onClick={() => handleToggleComparator(p.id)}
                className={`rounded px-2 py-1 font-mono text-[11px] transition cursor-pointer ${
                  selectedIds.includes(p.id)
                    ? 'bg-cyan-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Tabular Side by Side Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono">
                <th className="py-3 px-4">PARAMETER</th>
                {comparatorParticles.map(p => (
                  <th key={p.id} className="py-3 px-4 min-w-[160px]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                        <ParticleSymbol symbol={p.symbol} />
                      </span>
                      <span className="text-slate-900 dark:text-white font-semibold">{p.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Category / Subtype</td>
                {comparatorParticles.map(p => (
                  <td key={p.id} className="py-3 px-4 capitalize">
                    {p.category.replace('_', ' ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Rest Mass</td>
                {comparatorParticles.map(p => (
                  <td key={p.id} className="py-3 px-4 font-bold text-slate-900 dark:text-white tabular-nums">
                    {p.mass}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Electric Charge (Q)</td>
                {comparatorParticles.map(p => (
                  <td key={p.id} className="py-3 px-4 text-cyan-700 dark:text-cyan-400 font-bold tabular-nums">
                    {p.charge}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Spin (J)</td>
                {comparatorParticles.map(p => (
                  <td key={p.id} className="py-3 px-4 text-emerald-700 dark:text-emerald-400 tabular-nums font-bold">
                    {p.spin}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Weak Isospin (I₃)</td>
                {comparatorParticles.map(p => (
                  <td key={p.id} className="py-3 px-4 tabular-nums">
                    {p.weakIsospin}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Color Charge</td>
                {comparatorParticles.map(p => (
                  <td key={p.id} className="py-3 px-4 text-purple-700 dark:text-purple-300">
                    {p.colorCharge}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Mean Lifetime (τ)</td>
                {comparatorParticles.map(p => (
                  <td key={p.id} className="py-3 px-4 text-amber-700 dark:text-amber-300">
                    {p.lifetime}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Discovery Year</td>
                {comparatorParticles.map(p => (
                  <td key={p.id} className="py-3 px-4">
                    {p.discoveredYear === 0 ? 'Hypothesized' : `${p.discoveredYear} (${p.discoveryFacility})`}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 2: Custom Reaction Conservation Validator */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 space-y-6 shadow-xs">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Decay & Reaction Conservation Evaluator</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Build an initial state (A + B) and final decay products (C + D + E) to audit quantum conservation laws.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {reactionAudit.isFullyAllowed ? (
              <span className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/50 px-2.5 py-1 rounded">
                <CheckCircle2 className="h-3.5 w-3.5" /> Reaction Permitted
              </span>
            ) : (
              <span className="flex items-center gap-1 font-mono text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/50 px-2.5 py-1 rounded">
                <XCircle className="h-3.5 w-3.5" /> Strictly Forbidden
              </span>
            )}
          </div>
        </div>

        {/* Reaction Builder Formula Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reactants (Initial) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 p-4 space-y-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold block">INITIAL STATE PARTICLES:</span>
            <div className="flex flex-wrap gap-2 min-h-[44px] items-center">
              {reactants.map((id, idx) => {
                const p = PARTICLES.find(part => part.id === id);
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-800/50 px-3 py-1 font-mono text-xs text-cyan-800 dark:text-cyan-300 font-bold"
                  >
                    <span><ParticleSymbol symbol={p?.symbol || ''} /> ({p?.name})</span>
                    {reactants.length > 1 && (
                      <button
                        onClick={() => setReactants(reactants.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
            
            {/* Quick add reactant */}
            <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-200 dark:border-slate-800/60">
              {['muon', 'tau-lepton', 'top-quark', 'electron', 'w-boson', 'z-boson', 'higgs-boson'].map(id => {
                const p = PARTICLES.find(part => part.id === id);
                return (
                  <button
                    key={id}
                    onClick={() => setReactants([...reactants, id])}
                    className="rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 font-mono text-[10px] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
                  >
                    +<ParticleSymbol symbol={p?.symbol || ''} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products (Final) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 p-4 space-y-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold block">FINAL DECAY PRODUCTS:</span>
            <div className="flex flex-wrap gap-2 min-h-[44px] items-center">
              {products.map((id, idx) => {
                const p = PARTICLES.find(part => part.id === id);
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800/50 px-3 py-1 font-mono text-xs text-emerald-800 dark:text-emerald-300 font-bold"
                  >
                    <span><ParticleSymbol symbol={p?.symbol || ''} /> ({p?.name})</span>
                    {products.length > 1 && (
                      <button
                        onClick={() => setProducts(products.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    )}
                  </span>
                );
              })}
            </div>

            {/* Quick add product */}
            <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-200 dark:border-slate-800/60">
              {['electron', 'electron-neutrino', 'muon-neutrino', 'photon', 'up-quark', 'down-quark'].map(id => {
                const p = PARTICLES.find(part => part.id === id);
                return (
                  <button
                    key={id}
                    onClick={() => setProducts([...products, id])}
                    className="rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 font-mono text-[10px] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
                  >
                    +<ParticleSymbol symbol={p?.symbol || ''} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Evaluation Matrix Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">ELECTRIC CHARGE</span>
              {reactionAudit.chargeConserved ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">✓ Conserved</span>
              ) : (
                <span className="text-rose-700 dark:text-rose-400 font-mono font-bold flex items-center gap-1">✗ Violated</span>
              )}
            </div>
            <span className="font-mono text-slate-800 dark:text-slate-300 text-[11px]">
              {reactionAudit.initialCharge} e → {reactionAudit.finalCharge} e
            </span>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">BARYON NUMBER</span>
              {reactionAudit.baryonConserved ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">✓ Conserved</span>
              ) : (
                <span className="text-rose-700 dark:text-rose-400 font-mono font-bold flex items-center gap-1">✗ Violated</span>
              )}
            </div>
            <span className="font-mono text-slate-800 dark:text-slate-300 text-[11px]">
              B = {reactionAudit.initialBaryon} → {reactionAudit.finalBaryon}
            </span>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">LEPTON FLAVOR</span>
              {reactionAudit.leConserved && reactionAudit.lmuConserved ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">✓ Conserved</span>
              ) : (
                <span className="text-rose-700 dark:text-rose-400 font-mono font-bold flex items-center gap-1">✗ Violated</span>
              )}
            </div>
            <span className="font-mono text-slate-800 dark:text-slate-300 text-[11px]">
              L<sub>e</sub>, L<sub>μ</sub>, L<sub>τ</sub> Conserved
            </span>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">MASS KINEMATICS</span>
              {reactionAudit.kinematicallyAllowed ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">✓ Allowed</span>
              ) : (
                <span className="text-amber-700 dark:text-amber-400 font-mono font-bold flex items-center gap-1">▲ Exothermic Only</span>
              )}
            </div>
            <span className="font-mono text-slate-800 dark:text-slate-300 text-[11px] tabular-nums">
              {reactionAudit.initialMassMeV.toFixed(1)} MeV → {reactionAudit.finalMassMeV.toFixed(1)} MeV
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
