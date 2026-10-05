/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StandardModelGrid } from './components/StandardModelGrid';
import { ParticleDetailModal } from './components/ParticleDetailModal';
import { FeynmanVisualizer } from './components/FeynmanVisualizer';
import { HadronSynthesizer } from './components/HadronSynthesizer';
import { ConservationLab } from './components/ConservationLab';
import { TimelineSection } from './components/TimelineSection';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Particle, PARTICLES } from './data/particlesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('matrix');
  const [selectedParticle, setSelectedParticle] = useState<Particle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Global keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectParticleById = (id: string) => {
    const p = PARTICLES.find(item => item.id === id);
    if (p) setSelectedParticle(p);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 transition-colors">
      {/* Left Menu Collapsed Nav Bar (Hover to open) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col min-h-screen pl-16">
        {/* Minimal Clean Top Header */}
        <Header activeTab={activeTab} />

        {/* Content Body - Wide Layout to fit on one screen */}
        <main className="flex-1 w-full px-3 sm:px-5 py-3 space-y-4">
          {activeTab === 'matrix' && (
            <StandardModelGrid
              onSelectParticle={p => setSelectedParticle(p)}
            />
          )}

          {activeTab === 'feynman' && <FeynmanVisualizer />}

          {activeTab === 'hadron' && (
            <HadronSynthesizer onSelectParticle={handleSelectParticleById} />
          )}

          {activeTab === 'comparator' && <ConservationLab />}

          {activeTab === 'timeline' && <TimelineSection />}
        </main>

        {/* Minimal Compact Footer */}
        <Footer />
      </div>

      {/* Particle Deep-Dive Detail Drawer / Modal */}
      <ParticleDetailModal
        particle={selectedParticle}
        onClose={() => setSelectedParticle(null)}
        onSelectRelated={handleSelectParticleById}
      />

      {/* Global Command Palette (⌘K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectParticle={p => setSelectedParticle(p)}
        onNavigateTab={tab => {
          setActiveTab(tab);
          setIsSearchOpen(false);
        }}
      />
    </div>
  );
}
