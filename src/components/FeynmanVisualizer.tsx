import React, { useState } from 'react';
import { REACTION_PROCESSES, ReactionProcess } from '../data/reactionsData';
import { GitBranch, ArrowRight, CheckCircle2, ShieldCheck, Play, RotateCcw, Info, Sparkles } from 'lucide-react';

export const FeynmanVisualizer: React.FC = () => {
  const [selectedProcessId, setSelectedProcessId] = useState<string>('beta-minus-decay');
  const [isAnimated, setIsAnimated] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const activeProcess = REACTION_PROCESSES.find(p => p.id === selectedProcessId) || REACTION_PROCESSES[0];

  const renderFeynmanSVG = (process: ReactionProcess) => {
    const { width, height, vertices, lines } = process.diagram;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto max-h-[380px] select-none"
      >
        <defs>
          {/* Arrowhead marker for fermions */}
          <marker
            id="arrowhead-forward"
            markerWidth="6"
            markerHeight="6"
            refX="4"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
          </marker>
          <marker
            id="arrowhead-backward"
            markerWidth="6"
            markerHeight="6"
            refX="2"
            refY="3"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
          </marker>

          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Grid Pattern */}
        <rect width={width} height={height} fill="#090d16" rx="12" />
        
        {/* Subtle coordinate lines */}
        <g stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3">
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} />
          <line x1={width / 2} y1="0" x2={width / 2} y2={height} />
        </g>

        {/* Time and Space Axes labels */}
        <text x="20" y={height - 14} fill="#475569" fontSize="10" fontFamily="JetBrains Mono, monospace">
          Space (x) →
        </text>
        <text x="14" y="24" fill="#475569" fontSize="10" fontFamily="JetBrains Mono, monospace">
          Time (t) ↑
        </text>

        {/* Render Propagators and Fermion Lines */}
        {lines.map(line => {
          const isBosonW = line.type === 'boson_w';
          const isBosonPhoton = line.type === 'boson_photon';
          const isBosonGluon = line.type === 'boson_gluon';
          const isBosonHiggs = line.type === 'boson_higgs';

          const strokeColor = line.color || '#38bdf8';
          const midX = (line.from.x + line.to.x) / 2;
          const midY = (line.from.y + line.to.y) / 2;

          if (isBosonW || isBosonPhoton) {
            // Sine wave wiggle for vector bosons
            const dx = line.to.x - line.from.x;
            const dy = line.to.y - line.from.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const waves = Math.max(3, Math.floor(dist / 22));
            
            let pathD = `M ${line.from.x} ${line.from.y}`;
            for (let i = 1; i <= waves; i++) {
              const segFraction = i / waves;
              const prevFraction = (i - 1) / waves;
              const segX = line.from.x + dx * segFraction;
              const segY = line.from.y + dy * segFraction;
              const prevX = line.from.x + dx * prevFraction;
              const prevY = line.from.y + dy * prevFraction;
              
              const perpX = -dy / dist * 6 * (i % 2 === 0 ? 1 : -1);
              const perpY = dx / dist * 6 * (i % 2 === 0 ? 1 : -1);
              const cpX = (prevX + segX) / 2 + perpX;
              const cpY = (prevY + segY) / 2 + perpY;
              pathD += ` Q ${cpX} ${cpY} ${segX} ${segY}`;
            }

            return (
              <g key={line.id} className="cursor-pointer">
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  className={isAnimated ? 'animate-pulse' : ''}
                />
                <text
                  x={midX}
                  y={midY - 10}
                  fill={strokeColor}
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {line.label}
                </text>
              </g>
            );
          }

          if (isBosonHiggs) {
            // Dashed line for scalar Higgs boson
            return (
              <g key={line.id}>
                <line
                  x1={line.from.x}
                  y1={line.from.y}
                  x2={line.to.x}
                  y2={line.to.y}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  strokeDasharray="6,4"
                />
                <text
                  x={midX}
                  y={midY - 10}
                  fill={strokeColor}
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {line.label}
                </text>
              </g>
            );
          }

          if (isBosonGluon) {
            // Looped curly line for gluons
            return (
              <g key={line.id}>
                <line
                  x1={line.from.x}
                  y1={line.from.y}
                  x2={line.to.x}
                  y2={line.to.y}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  strokeDasharray="3,3"
                />
                <text
                  x={midX}
                  y={midY - 8}
                  fill={strokeColor}
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {line.label}
                </text>
              </g>
            );
          }

          // Straight line with arrow for fermions
          return (
            <g key={line.id}>
              <line
                x1={line.from.x}
                y1={line.from.y}
                x2={line.to.x}
                y2={line.to.y}
                stroke={strokeColor}
                strokeWidth="2"
              />
              {/* Arrow in middle */}
              <circle
                cx={midX}
                cy={midY}
                r="3"
                fill={strokeColor}
              />
              <text
                x={midX + 8}
                y={midY - 6}
                fill={strokeColor}
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="500"
              >
                {line.label}
              </text>
            </g>
          );
        })}

        {/* Vertices */}
        {vertices.map((v, i) => (
          <g key={i}>
            <circle
              cx={v.x}
              cy={v.y}
              r="5"
              fill="#f8fafc"
              stroke="#0284c7"
              strokeWidth="2"
              filter="url(#glow)"
            />
            {v.label && (
              <text
                x={v.x}
                y={v.y + 18}
                fill="#94a3b8"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
              >
                {v.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    );
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-1">
          <span>QFT PERTURBATION THEORY</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>FEYNMAN DIAGRAMS & WEAK INTERACTIONS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Feynman Diagrams & Particle Decays
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Visualize subatomic scattering, virtual gauge boson exchange (W⁺, W⁻, Z⁰, γ, g, H⁰), and verify strict conservation of quantum numbers.
        </p>
      </div>

      {/* Process Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {REACTION_PROCESSES.map(proc => (
          <button
            key={proc.id}
            onClick={() => {
              setSelectedProcessId(proc.id);
              setCurrentStep(0);
            }}
            className={`flex flex-col p-3 rounded-xl border text-left transition cursor-pointer ${
              selectedProcessId === proc.id
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-white shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span className="text-[11px] font-mono uppercase text-cyan-700 dark:text-cyan-400 font-semibold truncate">
              {proc.category}
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-200 mt-0.5 truncate">
              {proc.name.split('(')[0]}
            </span>
            <span className="text-[10px] font-mono text-slate-500 mt-1 truncate">
              {proc.equation}
            </span>
          </button>
        ))}
      </div>

      {/* Main Feynman Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Diagram Viewport (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{activeProcess.name}</h3>
              <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400 mt-0.5">{activeProcess.equation}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAnimated(!isAnimated)}
                className={`rounded px-2.5 py-1 text-xs font-mono transition cursor-pointer ${
                  isAnimated ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {isAnimated ? 'Animation: ON' : 'Animation: OFF'}
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-2 overflow-hidden shadow-inner">
            {renderFeynmanSVG(activeProcess)}
          </div>

          {/* Step Sequence Details */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 space-y-2">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Vertex Reaction Dynamics
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeProcess.explanation}
            </p>
          </div>
        </div>

        {/* Right: Quantum Conservation & Invariants Audit (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-4 shadow-xs">
          <div className="border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Conservation Laws Audit</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified by Noether's Theorem & Gauge Symmetries
            </p>
          </div>

          {/* Conservation Badges */}
          <div className="space-y-2.5 text-xs">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">ELECTRIC CHARGE (Q)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="h-3 w-3" /> Exact
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {activeProcess.conservedQuantities.electricCharge}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">BARYON NUMBER (B)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="h-3 w-3" /> Exact
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {activeProcess.conservedQuantities.baryonNumber}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">
                  LEPTON FLAVORS (L<sub>e</sub>, L<sub>μ</sub>, L<sub>τ</sub>)
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="h-3 w-3" /> Conserved
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {activeProcess.conservedQuantities.leptonNumberElectron} · {activeProcess.conservedQuantities.leptonNumberMuon}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">COLOR CHARGE (QCD)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="h-3 w-3" /> Exact
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {activeProcess.conservedQuantities.colorCharge}
              </p>
            </div>
          </div>

          {/* Theoretical Significance Box */}
          <div className="rounded-xl border border-cyan-200 dark:border-cyan-900/30 bg-cyan-50/70 dark:bg-cyan-950/20 p-3.5 text-xs text-slate-700 dark:text-cyan-200">
            <span className="font-mono font-bold text-cyan-800 dark:text-cyan-300 block mb-1">EMPIRICAL SIGNIFICANCE</span>
            <p className="leading-relaxed">
              {activeProcess.significance}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
