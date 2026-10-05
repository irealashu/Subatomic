export interface Milestone {
  id: string;
  year: number;
  title: string;
  particle: string;
  category: 'Fermion' | 'Boson' | 'Theory' | 'Hadron';
  nobelPrizeYear?: number;
  nobelLaureates?: string;
  facility: string;
  summary: string;
  impact: string;
}

export const TIMELINE_DATA: Milestone[] = [
  {
    id: 't-1897',
    year: 1897,
    title: 'Discovery of the Electron',
    particle: 'Electron (e⁻)',
    category: 'Fermion',
    nobelPrizeYear: 1906,
    nobelLaureates: 'J. J. Thomson',
    facility: 'Cavendish Laboratory (Cambridge)',
    summary: 'J. J. Thomson measured the charge-to-mass ratio of cathode rays, proving they were subatomic particles 1,800 times lighter than hydrogen.',
    impact: 'First direct evidence that atoms are divisible and possess internal constituent particles.'
  },
  {
    id: 't-1905',
    year: 1905,
    title: 'Light Quanta (Photon Hypothesis)',
    particle: 'Photon (γ)',
    category: 'Boson',
    nobelPrizeYear: 1921,
    nobelLaureates: 'Albert Einstein',
    facility: 'University of Bern / Zurich',
    summary: 'Einstein explained the photoelectric effect by positing that light is emitted and absorbed in discrete energy packets E = hf (photons).',
    impact: 'Birth of Quantum Theory and wave-particle duality.'
  },
  {
    id: 't-1932-p',
    year: 1932,
    title: 'Discovery of the Positron (Antimatter)',
    particle: 'Positron (e⁺)',
    category: 'Fermion',
    nobelPrizeYear: 1936,
    nobelLaureates: 'Carl D. Anderson',
    facility: 'Caltech Cloud Chamber',
    summary: 'Anderson discovered tracks of positively charged particles with the mass of an electron in cosmic rays, validating Dirac\'s relativistic wave equation.',
    impact: 'First discovery of antimatter in history.'
  },
  {
    id: 't-1932-n',
    year: 1932,
    title: 'Discovery of the Neutron',
    particle: 'Neutron (n)',
    category: 'Hadron',
    nobelPrizeYear: 1935,
    nobelLaureates: 'James Chadwick',
    facility: 'Cavendish Laboratory',
    summary: 'Chadwick bombarded beryllium with alpha particles to eject neutral radiation capable of knocking protons out of paraffin wax.',
    impact: 'Solved the mass defect of atomic nuclei and opened nuclear physics.'
  },
  {
    id: 't-1936',
    year: 1936,
    title: 'Discovery of the Muon',
    particle: 'Muon (μ⁻)',
    category: 'Fermion',
    nobelPrizeYear: 1936,
    nobelLaureates: 'Carl Anderson & Seth Neddermeyer',
    facility: 'Caltech Cloud Chamber',
    summary: 'Observed penetrating cosmic-ray tracks with a mass between the electron and proton. Revealed the existence of higher generations of matter.',
    impact: 'First evidence for generation replication in fundamental fermions.'
  },
  {
    id: 't-1956',
    year: 1956,
    title: 'First Direct Detection of Neutrinos',
    particle: 'Electron Neutrino (νₑ)',
    category: 'Fermion',
    nobelPrizeYear: 1995,
    nobelLaureates: 'Frederick Reines & Clyde Cowan',
    facility: 'Savannah River Nuclear Plant',
    summary: 'Detected antineutrinos through inverse beta decay (ν̄ + p → n + e⁺) in a 200-liter water-cadmium detector.',
    impact: 'Confirmed Pauli\'s 26-year-old beta-decay conservation hypothesis.'
  },
  {
    id: 't-1964-q',
    year: 1964,
    title: 'The Quark Model Formulation',
    particle: 'Up, Down, Strange Quarks (u, d, s)',
    category: 'Theory',
    nobelPrizeYear: 1969,
    nobelLaureates: 'Murray Gell-Mann',
    facility: 'Caltech & CERN',
    summary: 'Gell-Mann and George Zweig independently proposed that all hadrons are built from fractional-charge spin-1/2 constituents ("quarks" / "aces").',
    impact: 'Brought order to the "particle zoo" of hundreds of known mesons and baryons.'
  },
  {
    id: 't-1968',
    year: 1968,
    title: 'Experimental Proof of Quarks (DIS)',
    particle: 'Quarks (Partons)',
    category: 'Fermion',
    nobelPrizeYear: 1990,
    nobelLaureates: 'Jerome Friedman, Henry Kendall, Richard Taylor',
    facility: 'SLAC-MIT Linear Accelerator',
    summary: 'High-energy electron scattering off protons revealed hard, point-like scattering centers inside the proton matching fractional quark charges.',
    impact: 'Turned quarks from mathematical abstractions into experimentally proven physical reality.'
  },
  {
    id: 't-1974',
    year: 1974,
    title: 'The "November Revolution" (Charm Quark)',
    particle: 'Charm Quark (c) / J/ψ Meson',
    category: 'Fermion',
    nobelPrizeYear: 1976,
    nobelLaureates: 'Burton Richter & Samuel Ting',
    facility: 'SLAC (SPEAR) & Brookhaven (AGS)',
    summary: 'Simultaneous discovery of an extraordinarily narrow resonance at 3.1 GeV (J/ψ), proving the existence of the charm quark.',
    impact: 'Established the Standard Model as the undisputed framework of particle physics.'
  },
  {
    id: 't-1975',
    year: 1975,
    title: 'Discovery of the Tau Lepton',
    particle: 'Tau Lepton (τ⁻)',
    category: 'Fermion',
    nobelPrizeYear: 1995,
    nobelLaureates: 'Martin Lewis Perl',
    facility: 'SLAC (SPEAR)',
    summary: 'Discovered anomalous e-μ events in electron-positron collisions, confirming a third generation of fundamental leptons.',
    impact: 'Proved the existence of three generations of fundamental matter.'
  },
  {
    id: 't-1977',
    year: 1977,
    title: 'Discovery of the Bottom Quark',
    particle: 'Bottom Quark (b) / Upsilon (ϒ)',
    category: 'Fermion',
    facility: 'Fermilab (E288 Experiment)',
    summary: 'Leon Lederman\'s team discovered the Upsilon resonance at 9.46 GeV, confirming the existence of the fifth quark.',
    impact: 'Confirmed the Kobayashi-Maskawa model predicting 3 generations to explain CP violation.'
  },
  {
    id: 't-1979',
    year: 1979,
    title: 'Discovery of the Gluon (3-Jet Events)',
    particle: 'Gluon (g)',
    category: 'Boson',
    nobelPrizeYear: 1995,
    facility: 'PETRA Collider (DESY, Germany)',
    summary: 'Observed planar 3-jet events in e⁺e⁻ annihilation (q q̄ g), providing conclusive evidence for gluon bremsstrahlung.',
    impact: 'Direct empirical proof of the gauge boson of Quantum Chromodynamics.'
  },
  {
    id: 't-1983',
    year: 1983,
    title: 'Discovery of the W and Z Bosons',
    particle: 'W⁺, W⁻, Z⁰ Vector Bosons',
    category: 'Boson',
    nobelPrizeYear: 1984,
    nobelLaureates: 'Carlo Rubbia & Simon van der Meer',
    facility: 'CERN SPS (UA1 & UA2 Experiments)',
    summary: 'Observed the intermediate vector bosons mediating the weak interaction at masses of 80 GeV (W) and 91 GeV (Z).',
    impact: 'Definitively verified the Glashow-Weinberg-Salam Electroweak unification theory.'
  },
  {
    id: 't-1995',
    year: 1995,
    title: 'Discovery of the Top Quark',
    particle: 'Top Quark (t)',
    category: 'Fermion',
    facility: 'Fermilab Tevatron (CDF & DØ)',
    summary: 'Discovered the sixth and final quark at a massive 173 GeV/c² in proton-antiproton collisions at √s = 1.8 TeV.',
    impact: 'Completed the quark sector of the Standard Model.'
  },
  {
    id: 't-1998',
    year: 1998,
    title: 'Neutrino Mass & Oscillation Confirmed',
    particle: 'Neutrinos (νₑ, ν_μ, ν_τ)',
    category: 'Fermion',
    nobelPrizeYear: 2015,
    nobelLaureates: 'Takaaki Kajita & Arthur B. McDonald',
    facility: 'Super-Kamiokande & SNO',
    summary: 'Proved that neutrinos change flavor when traveling through atmosphere and solar interior, requiring non-zero rest masses.',
    impact: 'First experimental discovery requiring physics beyond the original massless-neutrino Standard Model.'
  },
  {
    id: 't-2012',
    year: 2012,
    title: 'Discovery of the Higgs Boson',
    particle: 'Higgs Boson (H⁰)',
    category: 'Boson',
    nobelPrizeYear: 2013,
    nobelLaureates: 'François Englert & Peter W. Higgs',
    facility: 'CERN LHC (ATLAS & CMS)',
    summary: 'Discovered a scalar boson with mass 125.25 GeV decaying into diphotons and four leptons, confirming the mechanism giving mass to elementary particles.',
    impact: 'Completed the predicted particle content of the Standard Model.'
  }
];
