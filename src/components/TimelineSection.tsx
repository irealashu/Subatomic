import React, { useState, useMemo } from 'react';
import { TIMELINE_DATA, Milestone } from '../data/timelineData';
import { Award, Building } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMilestones = useMemo(() => {
    return TIMELINE_DATA.filter(m => {
      const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.particle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.nobelLaureates && m.nobelLaureates.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.facility.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-1">
          <span>CHRONOLOGY OF DISCOVERY</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>FROM THOMSON'S CATHODE RAYS TO CERN'S HIGGS BOSON</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Nobel Milestones & Discovery Timeline
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Trace the empirical experiments, collider breakthroughs, and Nobel prize-winning theoretical formulations that unraveled the subatomic universe.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          {['all', 'Fermion', 'Boson', 'Theory', 'Hadron'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono capitalize transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Milestones' : cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter by particle, scientist, facility..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none w-full sm:w-64 font-mono"
        />
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        {filteredMilestones.map(m => (
          <div key={m.id} className="relative group">
            {/* Year Node on timeline */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-600 dark:border-cyan-400 text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 shadow-xs group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              •
            </div>

            {/* Card Content */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-xs">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-cyan-700 dark:text-cyan-400">{m.year}</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{m.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5 block">
                    Particle / Entity: <strong className="text-slate-800 dark:text-slate-200">{m.particle}</strong>
                  </span>
                </div>

                {m.nobelPrizeYear && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 px-2.5 py-1 text-xs font-mono text-amber-800 dark:text-amber-300">
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    <span>Nobel Prize {m.nobelPrizeYear}</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {m.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono">
                  <Building className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                  <span>{m.facility}</span>
                </div>

                {m.nobelLaureates && (
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    Laureates: <strong className="text-slate-700 dark:text-slate-200">{m.nobelLaureates}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
