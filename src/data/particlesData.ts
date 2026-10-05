export type ParticleCategory = 'quark' | 'lepton' | 'gauge_boson' | 'scalar_boson' | 'hypothetical';
export type ParticleSubtype = 'up_type_quark' | 'down_type_quark' | 'charged_lepton' | 'neutral_lepton' | 'vector_boson' | 'scalar_boson' | 'hypothetical_boson' | 'hypothetical_fermion';

export interface DecayMode {
  products: string[];
  branchingRatio: string;
  type: string;
}

export interface Particle {
  id: string;
  name: string;
  symbol: string;
  symbolSubscript?: string;
  symbolSuperscript?: string;
  category: ParticleCategory;
  subtype: ParticleSubtype;
  generation?: 1 | 2 | 3;
  mass: string;
  massRawMeV: number; // in MeV/c^2
  charge: string;
  chargeNumeric: number;
  spin: string;
  spinNumeric: number;
  weakIsospin: string;
  weakHypercharge: string;
  colorCharge: string;
  lifetime: string;
  antiparticle: string;
  forceOrRole: string;
  discoveredYear: number;
  discoveredBy: string;
  discoveryFacility: string;
  description: string;
  keyProperties: string[];
  decayModes?: DecayMode[];
  feynmanInteractions: string[];
  gaugeGroup?: string;
}

export const PARTICLES: Particle[] = [
  // --- QUARKS: Generation 1 ---
  {
    id: 'up-quark',
    name: 'Up Quark',
    symbol: 'u',
    category: 'quark',
    subtype: 'up_type_quark',
    generation: 1,
    mass: '2.16 MeV/c²',
    massRawMeV: 2.16,
    charge: '+⅔ e',
    chargeNumeric: 2/3,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '+½',
    weakHypercharge: '+⅓',
    colorCharge: 'Red, Green, or Blue',
    lifetime: 'Stable (inside nucleons)',
    antiparticle: 'Up antiquark (ū, -⅔ e)',
    forceOrRole: 'Constituent of protons (uud) and neutrons (udd)',
    discoveredYear: 1968,
    discoveredBy: 'Jerome Friedman, Henry Kendall, Richard Taylor',
    discoveryFacility: 'SLAC (Stanford Linear Accelerator Center)',
    description: 'The lightest of all quarks. Together with down quarks, up quarks form atomic nuclei (protons and neutrons) which make up over 99.9% of ordinary visible matter in the universe.',
    keyProperties: [
      'Lightest quark (mass ~2.16 MeV/c²)',
      'Fractional electric charge +⅔ e',
      'Confined inside hadrons via Quantum Chromodynamics (QCD)',
      'Interacts through all four fundamental forces'
    ],
    decayModes: [
      { products: ['Stable inside bound hadron states'], branchingRatio: '100%', type: 'Bound state' }
    ],
    feynmanInteractions: ['Strong (gluon exchange)', 'Electromagnetic (photon coupling)', 'Weak charged (W⁺/W⁻ transitions to d, s, b)'],
    gaugeGroup: 'SU(3) color, SU(2) weak, U(1) hypercharge'
  },
  {
    id: 'down-quark',
    name: 'Down Quark',
    symbol: 'd',
    category: 'quark',
    subtype: 'down_type_quark',
    generation: 1,
    mass: '4.67 MeV/c²',
    massRawMeV: 4.67,
    charge: '-⅓ e',
    chargeNumeric: -1/3,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '-½',
    weakHypercharge: '+⅓',
    colorCharge: 'Red, Green, or Blue',
    lifetime: 'Stable (in stable nuclei); ~879 s in free neutron',
    antiparticle: 'Down antiquark (d̄, +⅓ e)',
    forceOrRole: 'Constituent of nucleons; undergoes beta minus decay',
    discoveredYear: 1968,
    discoveredBy: 'SLAC-MIT Collaboration',
    discoveryFacility: 'SLAC Deep Inelastic Scattering',
    description: 'The second lightest quark. Down quarks are slightly heavier than up quarks, which is the exact reason free neutrons decay into protons and why the proton is stable, allowing chemistry and stable stars to exist.',
    keyProperties: [
      'Bare mass ~4.67 MeV/c²',
      'Fractional electric charge -⅓ e',
      'Beta decay d → u + W⁻ mediates nuclear transmutation',
      'Subject to color confinement'
    ],
    decayModes: [
      { products: ['u', 'W⁻ (virtual) → e⁻ + ν̄ₑ'], branchingRatio: '95% (in free neutron/hadron)', type: 'Weak decay via CKM V_ud' }
    ],
    feynmanInteractions: ['Strong (gluon coupling)', 'Electromagnetic (photon)', 'Weak charged (W transition to u)'],
    gaugeGroup: 'SU(3) color, SU(2) weak, U(1) hypercharge'
  },

  // --- QUARKS: Generation 2 ---
  {
    id: 'charm-quark',
    name: 'Charm Quark',
    symbol: 'c',
    category: 'quark',
    subtype: 'up_type_quark',
    generation: 2,
    mass: '1.27 GeV/c²',
    massRawMeV: 1270,
    charge: '+⅔ e',
    chargeNumeric: 2/3,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '+½',
    weakHypercharge: '+⅓',
    colorCharge: 'Red, Green, or Blue',
    lifetime: '≈ 1.1 × 10⁻¹² s (in D mesons)',
    antiparticle: 'Charm antiquark (c̄, -⅔ e)',
    forceOrRole: 'Second-generation up-type quark; confirmed the GIM mechanism',
    discoveredYear: 1974,
    discoveredBy: 'Burton Richter (SLAC) & Samuel Ting (BNL)',
    discoveryFacility: 'SLAC & Brookhaven National Lab (The "November Revolution")',
    description: 'The charm quark discovery in 1974 via the J/ψ meson (a c-c̄ bound state) ignited the "November Revolution" in particle physics, definitively confirming the quark model and the Glashow-Iliopoulos-Maiani (GIM) mechanism.',
    keyProperties: [
      'Heavy quark with mass ~1.27 GeV/c²',
      'Forms charmed hadrons (D mesons, Λc baryons)',
      'Decays predominantly to strange quarks via V_cs',
      'Discovered simultaneously at Stanford and Brookhaven'
    ],
    decayModes: [
      { products: ['s', 'W⁺ (→ hadrons or leptons)'], branchingRatio: '~95% (via CKM V_cs)', type: 'Weak Cabibbo-favored' },
      { products: ['d', 'W⁺'], branchingRatio: '~5% (via CKM V_cd)', type: 'Weak Cabibbo-suppressed' }
    ],
    feynmanInteractions: ['Strong', 'Electromagnetic', 'Weak charged (c → s + W⁺)'],
    gaugeGroup: 'SU(3) color, SU(2) weak, U(1) hypercharge'
  },
  {
    id: 'strange-quark',
    name: 'Strange Quark',
    symbol: 's',
    category: 'quark',
    subtype: 'down_type_quark',
    generation: 2,
    mass: '93.4 MeV/c²',
    massRawMeV: 93.4,
    charge: '-⅓ e',
    chargeNumeric: -1/3,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '-½',
    weakHypercharge: '+⅓',
    colorCharge: 'Red, Green, or Blue',
    lifetime: '≈ 1.2 × 10⁻⁸ s (in K⁺)',
    antiparticle: 'Strange antiquark (s̄, +⅓ e)',
    forceOrRole: 'Carries Strangeness quantum number (S = -1)',
    discoveredYear: 1968,
    discoveredBy: 'SLAC-MIT / Proposed by Murray Gell-Mann (1964)',
    discoveryFacility: 'Cosmic ray studies (1947) & SLAC deep inelastic scattering',
    description: 'First observed as "V-particles" in cosmic ray cloud chambers in 1947 due to unexpectedly long lifetimes. They are produced rapidly via the strong force in pairs, but decay slowly via the weak force, leading to the concept of the "Strangeness" quantum number.',
    keyProperties: [
      'Mass ~93.4 MeV/c²',
      'Strangeness quantum number S = -1',
      'Forms Kaons (K), Sigma (Σ), and Omega (Ω⁻) baryons',
      'CP violation was first discovered in neutral Kaon systems (K₀ - K̄₀ mixing)'
    ],
    decayModes: [
      { products: ['u', 'W⁻ (→ e⁻ + ν̄ₑ or π⁻)'], branchingRatio: '~100% (via CKM V_us)', type: 'Weak Cabibbo-suppressed' }
    ],
    feynmanInteractions: ['Strong', 'Electromagnetic', 'Weak charged (s → u + W⁻)'],
    gaugeGroup: 'SU(3) color, SU(2) weak, U(1) hypercharge'
  },

  // --- QUARKS: Generation 3 ---
  {
    id: 'top-quark',
    name: 'Top Quark',
    symbol: 't',
    category: 'quark',
    subtype: 'up_type_quark',
    generation: 3,
    mass: '172.69 GeV/c²',
    massRawMeV: 172690,
    charge: '+⅔ e',
    chargeNumeric: 2/3,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '+½',
    weakHypercharge: '+⅓',
    colorCharge: 'Red, Green, or Blue',
    lifetime: '≈ 5 × 10⁻²⁵ s (decays before hadronizing)',
    antiparticle: 'Top antiquark (t̄, -⅔ e)',
    forceOrRole: 'Heaviest known elementary particle; couples strongest to the Higgs field',
    discoveredYear: 1995,
    discoveredBy: 'CDF and DØ Collaborations',
    discoveryFacility: 'Fermilab Tevatron (Proton-Antiproton Collider)',
    description: 'The heaviest known elementary particle, nearly as massive as an entire gold atom (173 GeV). Because its lifetime (5×10⁻²⁵ s) is shorter than the QCD hadronization timescale (3×10⁻²⁴ s), it decays as a "bare" quark before forming any bound mesons or baryons.',
    keyProperties: [
      'Heaviest elementary particle (172.69 GeV/c²)',
      'Yukawa coupling to Higgs field is almost exactly y_t ≈ 1',
      'Decays almost 100% to W⁺ + b quark',
      'Crucial for electroweak vacuum stability calculations'
    ],
    decayModes: [
      { products: ['W⁺', 'b quark'], branchingRatio: '99.8% (via CKM V_tb ≈ 1)', type: 'Weak decay' },
      { products: ['W⁺', 's quark'], branchingRatio: '0.17%', type: 'CKM suppressed' },
      { products: ['W⁺', 'd quark'], branchingRatio: '0.007%', type: 'CKM suppressed' }
    ],
    feynmanInteractions: ['Strong (gluon production)', 'Electroweak (t → W⁺ + b)', 'Higgs Yukawa interaction'],
    gaugeGroup: 'SU(3) color, SU(2) weak, U(1) hypercharge'
  },
  {
    id: 'bottom-quark',
    name: 'Bottom Quark',
    symbol: 'b',
    category: 'quark',
    subtype: 'down_type_quark',
    generation: 3,
    mass: '4.18 GeV/c²',
    massRawMeV: 4180,
    charge: '-⅓ e',
    chargeNumeric: -1/3,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '-½',
    weakHypercharge: '+⅓',
    colorCharge: 'Red, Green, or Blue',
    lifetime: '≈ 1.5 × 10⁻¹² s (in B mesons)',
    antiparticle: 'Bottom antiquark (b̄, +⅓ e)',
    forceOrRole: 'Third-generation down-type quark; vital for CP violation and B-physics',
    discoveredYear: 1977,
    discoveredBy: 'Leon Lederman and the E288 Collaboration',
    discoveryFacility: 'Fermilab (via Upsilon meson resonance)',
    description: 'Discovered through the Upsilon (ϒ) resonance (a b-b̄ pair) at Fermilab. The study of B mesons (containing bottom quarks) provides the most precise tests of CP violation and the CKM quark mixing matrix.',
    keyProperties: [
      'Mass ~4.18 GeV/c²',
      'Forms B mesons (B⁰, B⁺, B_s) and Λ_b baryons',
      'Suppressed weak decay transitions (small V_cb and V_ub) cause long lifetimes',
      'Primary decay channel for the Standard Model Higgs boson (58%)'
    ],
    decayModes: [
      { products: ['c', 'W⁻'], branchingRatio: '~98.5% (via CKM V_cb)', type: 'Weak transition' },
      { products: ['u', 'W⁻'], branchingRatio: '~1.5% (via CKM V_ub)', type: 'Weak transition' }
    ],
    feynmanInteractions: ['Strong', 'Electromagnetic', 'Weak charged (b → c + W⁻)', 'Higgs coupling'],
    gaugeGroup: 'SU(3) color, SU(2) weak, U(1) hypercharge'
  },

  // --- LEPTONS: Generation 1 ---
  {
    id: 'electron',
    name: 'Electron',
    symbol: 'e⁻',
    symbolSuperscript: '−',
    category: 'lepton',
    subtype: 'charged_lepton',
    generation: 1,
    mass: '0.51099895 MeV/c²',
    massRawMeV: 0.51099895,
    charge: '-1 e',
    chargeNumeric: -1,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '-½ (left-handed)',
    weakHypercharge: '-1 (left-handed) / -2 (right-handed)',
    colorCharge: 'Colorless (0)',
    lifetime: 'Stable (> 6.6 × 10²⁸ years)',
    antiparticle: 'Positron (e⁺, +1 e)',
    forceOrRole: 'Primary carrier of electricity, chemistry, and atomic bound states',
    discoveredYear: 1897,
    discoveredBy: 'J. J. Thomson',
    discoveryFacility: 'Cavendish Laboratory (Cambridge University)',
    description: 'The first elementary particle ever discovered. As the lightest charged lepton, it is strictly stable due to electric charge and angular momentum conservation. Governs all atomic structure, molecular bonding, and electrical currents.',
    keyProperties: [
      'Lightest electrically charged lepton (mass 0.511 MeV/c²)',
      'Point-like particle with radius < 10⁻¹⁸ m',
      'Magnetic moment g-factor measured to 12 decimal places (QED precision)',
      'Undergoes Quantum Electrodynamics (QED) and weak interactions'
    ],
    decayModes: [
      { products: ['Stable particle'], branchingRatio: '100%', type: 'Forbidden by charge conservation' }
    ],
    feynmanInteractions: ['Electromagnetic (e⁻ e⁻ γ vertex)', 'Weak neutral (e⁻ e⁻ Z⁰)', 'Weak charged (e⁻ νₑ W⁻)'],
    gaugeGroup: 'SU(2) weak, U(1) hypercharge'
  },
  {
    id: 'electron-neutrino',
    name: 'Electron Neutrino',
    symbol: 'νₑ',
    symbolSubscript: 'e',
    category: 'lepton',
    subtype: 'neutral_lepton',
    generation: 1,
    mass: '< 0.8 eV/c²',
    massRawMeV: 0.0000008,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '+½ (left-handed)',
    weakHypercharge: '-1 (left-handed)',
    colorCharge: 'Colorless (0)',
    lifetime: 'Stable (oscillates between flavor eigenstates)',
    antiparticle: 'Electron antineutrino (ν̄ₑ, 0 e)',
    forceOrRole: 'Weak force messenger; produced in solar fusion and nuclear beta decay',
    discoveredYear: 1956,
    discoveredBy: 'Clyde Cowan and Frederick Reines',
    discoveryFacility: 'Savannah River Plant (Nuclear Reactor Neutrino Experiment)',
    description: 'Predicted by Wolfgang Pauli in 1930 to preserve energy and momentum conservation in beta decay. Neutrinos have no electric or color charge and interact exclusively through the weak force and gravity, allowing them to pass through light-years of lead without colliding.',
    keyProperties: [
      'Ultra-tiny non-zero mass (< 0.8 eV/c² from KATRIN experiment)',
      'Interacts purely via the weak force and gravity',
      'Undergoes neutrino flavor oscillations (PMNS mixing matrix)',
      'Over 65 billion solar neutrinos pass through each cm² of Earth per second'
    ],
    decayModes: [
      { products: ['Flavor oscillation into ν_μ, ν_τ'], branchingRatio: 'Oscillatory', type: 'PMNS neutrino mixing' }
    ],
    feynmanInteractions: ['Weak charged (νₑ e⁻ W⁺)', 'Weak neutral (νₑ νₑ Z⁰)'],
    gaugeGroup: 'SU(2) weak, U(1) hypercharge'
  },

  // --- LEPTONS: Generation 2 ---
  {
    id: 'muon',
    name: 'Muon',
    symbol: 'μ⁻',
    symbolSuperscript: '−',
    category: 'lepton',
    subtype: 'charged_lepton',
    generation: 2,
    mass: '105.658375 MeV/c²',
    massRawMeV: 105.658375,
    charge: '-1 e',
    chargeNumeric: -1,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '-½ (left-handed)',
    weakHypercharge: '-1 (left-handed)',
    colorCharge: 'Colorless (0)',
    lifetime: '2.1969811 × 10⁻⁶ s (2.20 μs)',
    antiparticle: 'Antimuon (μ⁺, +1 e)',
    forceOrRole: 'Heavy analog of electron; benchmark for special relativity time dilation',
    discoveredYear: 1936,
    discoveredBy: 'Carl D. Anderson and Seth Neddermeyer',
    discoveryFacility: 'Caltech Cosmic Ray Cloud Chamber',
    description: 'A second-generation lepton about 207 times heavier than the electron. Discovered in cosmic rays, prompting I. I. Rabi\'s famous quote: "Who ordered that?". Cosmic ray muons travel near the speed of light and reach Earth\'s surface thanks to relativistic time dilation.',
    keyProperties: [
      'Mass ~105.66 MeV/c² (≈ 206.77 electron masses)',
      'Lifetime ~2.2 μs (longest lived unstable elementary particle)',
      'Used for muon tomography (imaging pyramids, volcanoes, nuclear reactors)',
      'Muon g-2 anomaly is an active probe for beyond Standard Model physics'
    ],
    decayModes: [
      { products: ['e⁻', 'ν̄ₑ', 'ν_μ'], branchingRatio: '≈ 100%', type: 'Weak 3-body decay via W⁻' },
      { products: ['e⁻', 'ν̄ₑ', 'ν_μ', 'γ'], branchingRatio: '1.4%', type: 'Radiative weak decay' }
    ],
    feynmanInteractions: ['Electromagnetic (μ⁻ μ⁻ γ)', 'Weak charged (μ⁻ ν_μ W⁻)', 'Weak neutral (μ⁻ μ⁻ Z⁰)'],
    gaugeGroup: 'SU(2) weak, U(1) hypercharge'
  },
  {
    id: 'muon-neutrino',
    name: 'Muon Neutrino',
    symbol: 'ν_μ',
    symbolSubscript: 'μ',
    category: 'lepton',
    subtype: 'neutral_lepton',
    generation: 2,
    mass: '< 0.17 MeV/c²',
    massRawMeV: 0.000001,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '+½ (left-handed)',
    weakHypercharge: '-1 (left-handed)',
    colorCharge: 'Colorless (0)',
    lifetime: 'Stable (oscillates)',
    antiparticle: 'Muon antineutrino (ν̄_μ, 0 e)',
    forceOrRole: 'Associated with muon interactions; discovered distinct neutrino flavors',
    discoveredYear: 1962,
    discoveredBy: 'Leon Lederman, Melvin Schwartz, Jack Steinberger',
    discoveryFacility: 'Brookhaven Alternating Gradient Synchrotron (AGS)',
    description: 'Discovered in 1962, proving that neutrinos are not all identical and come in distinct leptonic flavor families (electron vs muon). Won the 1988 Nobel Prize in Physics.',
    keyProperties: [
      'Second generation neutral lepton',
      'Produced in pion decays (π⁺ → μ⁺ + ν_μ) in cosmic rays and accelerators',
      'Undergoes atmospheric neutrino oscillation discovered by Super-Kamiokande in 1998'
    ],
    decayModes: [
      { products: ['Flavor oscillation to ν_τ, ν_e'], branchingRatio: 'Oscillatory', type: 'PMNS neutrino mixing' }
    ],
    feynmanInteractions: ['Weak charged (ν_μ μ⁻ W⁺)', 'Weak neutral (ν_μ ν_μ Z⁰)'],
    gaugeGroup: 'SU(2) weak, U(1) hypercharge'
  },

  // --- LEPTONS: Generation 3 ---
  {
    id: 'tau-lepton',
    name: 'Tau Lepton',
    symbol: 'τ⁻',
    symbolSuperscript: '−',
    category: 'lepton',
    subtype: 'charged_lepton',
    generation: 3,
    mass: '1776.86 MeV/c²',
    massRawMeV: 1776.86,
    charge: '-1 e',
    chargeNumeric: -1,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '-½ (left-handed)',
    weakHypercharge: '-1 (left-handed)',
    colorCharge: 'Colorless (0)',
    lifetime: '2.903 × 10⁻¹³ s',
    antiparticle: 'Antitau (τ⁺, +1 e)',
    forceOrRole: 'Heaviest lepton; only lepton massive enough to decay into hadrons',
    discoveredYear: 1975,
    discoveredBy: 'Martin Lewis Perl and the SLAC-LBL Collaboration',
    discoveryFacility: 'SPEAR storage ring at SLAC',
    description: 'The heaviest known lepton, with a mass of 1.777 GeV (almost twice the mass of a proton). Because of its high mass, it is the only lepton that can decay into hadrons (such as pions and rhos) in addition to lighter leptons.',
    keyProperties: [
      'Mass 1.777 GeV/c² (3477 times heavier than electron)',
      'Lifetime 2.9 × 10⁻¹³ s',
      'Only lepton capable of hadronic decays (65% branch into quarks/hadrons)',
      'Sensitive probe for lepton flavor universality tests'
    ],
    decayModes: [
      { products: ['Hadronic (π⁻/ρ⁻/a₁⁻)', 'ν_τ'], branchingRatio: '64.8%', type: 'Weak decay to hadrons' },
      { products: ['e⁻', 'ν̄ₑ', 'ν_τ'], branchingRatio: '17.8%', type: 'Weak leptonic decay' },
      { products: ['μ⁻', 'ν̄_μ', 'ν_τ'], branchingRatio: '17.4%', type: 'Weak leptonic decay' }
    ],
    feynmanInteractions: ['Electromagnetic (τ⁻ τ⁻ γ)', 'Weak charged (τ⁻ ν_τ W⁻)', 'Weak neutral (τ⁻ τ⁻ Z⁰)'],
    gaugeGroup: 'SU(2) weak, U(1) hypercharge'
  },
  {
    id: 'tau-neutrino',
    name: 'Tau Neutrino',
    symbol: 'ν_τ',
    symbolSubscript: 'τ',
    category: 'lepton',
    subtype: 'neutral_lepton',
    generation: 3,
    mass: '< 18.2 MeV/c²',
    massRawMeV: 0.000001,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '+½ (left-handed)',
    weakHypercharge: '-1 (left-handed)',
    colorCharge: 'Colorless (0)',
    lifetime: 'Stable (oscillates)',
    antiparticle: 'Tau antineutrino (ν̄_τ, 0 e)',
    forceOrRole: 'Third generation neutral lepton; completes the three-generation lepton sector',
    discoveredYear: 2000,
    discoveredBy: 'DONUT Collaboration (Fermilab)',
    discoveryFacility: 'Fermilab Tevatron Beam Dump',
    description: 'The final fermion of the Standard Model to be directly observed. In 2000, the DONUT experiment at Fermilab detected tau neutrinos by observing their charged-current interactions producing tau leptons in nuclear emulsions.',
    keyProperties: [
      'Third generation lepton family neutral partner',
      'Observed directly by DONUT in July 2000',
      'Target of long-baseline neutrino experiments (OPERA, DUNE)'
    ],
    decayModes: [
      { products: ['Flavor oscillation to ν_μ, ν_e'], branchingRatio: 'Oscillatory', type: 'PMNS neutrino mixing' }
    ],
    feynmanInteractions: ['Weak charged (ν_τ τ⁻ W⁺)', 'Weak neutral (ν_τ ν_τ Z⁰)'],
    gaugeGroup: 'SU(2) weak, U(1) hypercharge'
  },

  // --- GAUGE BOSONS (Vector Bosons, Spin 1) ---
  {
    id: 'gluon',
    name: 'Gluon',
    symbol: 'g',
    category: 'gauge_boson',
    subtype: 'vector_boson',
    mass: '0 (theoretical) / < 1.3 MeV/c²',
    massRawMeV: 0,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '1 ℏ',
    spinNumeric: 1,
    weakIsospin: '0',
    weakHypercharge: '0',
    colorCharge: 'Color octet (8 combinations of color + anticolor)',
    lifetime: 'Stable / Confined in hadrons',
    antiparticle: 'Itself (anti-color counterpart)',
    forceOrRole: 'Mediator of the Strong Nuclear Force (Quantum Chromodynamics)',
    discoveredYear: 1979,
    discoveredBy: 'TASSO, JADE, MARK-J, PLUTO Collaborations',
    discoveryFacility: 'PETRA storage ring at DESY (Hamburg, Germany)',
    description: 'The vector gauge boson of Quantum Chromodynamics (QCD). Unlike photons, gluons carry color charge themselves, which causes them to interact directly with other gluons. This unique property leads to asymptotic freedom at high energies and color confinement at low energies.',
    keyProperties: [
      'Massless spin-1 vector boson mediating SU(3) strong force',
      'Exists in 8 distinct color charge states (color-anticolor octet)',
      'Undergoes 3-gluon and 4-gluon self-interactions',
      'Creates the color flux tube and string tension between quarks (~1 ton/fm)'
    ],
    decayModes: [
      { products: ['Quark-antiquark pair (q q̄) or gluon pair (gg)'], branchingRatio: 'Hadronizes', type: 'QCD string breaking' }
    ],
    feynmanInteractions: ['Quark-gluon vertex (q q̄ g)', 'Three-gluon vertex (g g g)', 'Four-gluon vertex (g g g g)'],
    gaugeGroup: 'SU(3) Color Gauge Symmetry'
  },
  {
    id: 'photon',
    name: 'Photon',
    symbol: 'γ',
    category: 'gauge_boson',
    subtype: 'vector_boson',
    mass: '0 (exact) / < 10⁻¹⁸ eV/c²',
    massRawMeV: 0,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '1 ℏ',
    spinNumeric: 1,
    weakIsospin: '0',
    weakHypercharge: '0',
    colorCharge: 'Colorless (0)',
    lifetime: 'Strictly Stable (infinite)',
    antiparticle: 'Itself (Majorana/self-conjugate boson)',
    forceOrRole: 'Mediator of the Electromagnetic Force (Quantum Electrodynamics)',
    discoveredYear: 1905,
    discoveredBy: 'Albert Einstein (Photoelectric effect) / Max Planck',
    discoveryFacility: 'Theoretical (1905) / Compton scattering experiment (1923)',
    description: 'The quantum of light and all electromagnetic radiation. As a massless gauge boson with infinite range (1/r² potential), the photon mediates electromagnetic interactions between all charged particles.',
    keyProperties: [
      'Zero invariant mass and travels at constant speed c in vacuum',
      'Spin-1 with only 2 physical transverse polarization states (helicity ±1)',
      'Mediates light, radio, X-rays, gamma rays, and atomic bonding',
      'Exact gauge symmetry of QED under U(1)_EM'
    ],
    decayModes: [
      { products: ['Stable particle'], branchingRatio: '100%', type: 'Stable' }
    ],
    feynmanInteractions: ['Fermion-photon vertex (f f̄ γ) for any charged fermion'],
    gaugeGroup: 'U(1)_EM Gauge Symmetry'
  },
  {
    id: 'w-boson',
    name: 'W Boson (W⁺ / W⁻)',
    symbol: 'W±',
    symbolSuperscript: '±',
    category: 'gauge_boson',
    subtype: 'vector_boson',
    mass: '80.377 ± 0.012 GeV/c²',
    massRawMeV: 80377,
    charge: '±1 e',
    chargeNumeric: 1,
    spin: '1 ℏ',
    spinNumeric: 1,
    weakIsospin: '±1',
    weakHypercharge: '0',
    colorCharge: 'Colorless (0)',
    lifetime: '3.16 × 10⁻²⁵ s (width Γ ≈ 2.085 GeV)',
    antiparticle: 'W⁺ is antiparticle of W⁻',
    forceOrRole: 'Mediator of the Charged Weak Nuclear Force; changes particle flavor',
    discoveredYear: 1983,
    discoveredBy: 'Carlo Rubbia and Simon van der Meer (UA1 and UA2)',
    discoveryFacility: 'CERN Super Proton Synchrotron (SPS)',
    description: 'The charged vector boson that mediates the weak charged-current interaction. It is the only fundamental interaction that can change quark and lepton flavors (e.g. converting down quarks to up quarks in nuclear beta decay and powering solar fusion).',
    keyProperties: [
      'Massive vector boson (~80.38 GeV/c²)',
      'Possesses 3 polarization states due to spontaneous symmetry breaking',
      'Changes fermion flavor across CKM and PMNS mixing matrices',
      'Short range: ~10⁻¹⁸ m (due to huge mass)'
    ],
    decayModes: [
      { products: ['Hadrons (quarks q q̄\')'], branchingRatio: '67.4%', type: 'Hadronic decay' },
      { products: ['e⁺', 'νₑ'], branchingRatio: '10.7%', type: 'Leptonic decay' },
      { products: ['μ⁺', 'ν_μ'], branchingRatio: '10.6%', type: 'Leptonic decay' },
      { products: ['τ⁺', 'ν_τ'], branchingRatio: '11.3%', type: 'Leptonic decay' }
    ],
    feynmanInteractions: ['Fermion flavor-changing vertex (f f\' W)', 'Triple gauge vertex (W⁺ W⁻ γ, W⁺ W⁻ Z⁰)', 'Higgs coupling (W⁺ W⁻ H)'],
    gaugeGroup: 'SU(2)_L Weak Isospin Gauge Group'
  },
  {
    id: 'z-boson',
    name: 'Z Boson (Z⁰)',
    symbol: 'Z⁰',
    symbolSuperscript: '0',
    category: 'gauge_boson',
    subtype: 'vector_boson',
    mass: '91.1876 ± 0.0021 GeV/c²',
    massRawMeV: 91187.6,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '1 ℏ',
    spinNumeric: 1,
    weakIsospin: '0',
    weakHypercharge: '0',
    colorCharge: 'Colorless (0)',
    lifetime: '2.64 × 10⁻²⁵ s (width Γ ≈ 2.495 GeV)',
    antiparticle: 'Itself (self-conjugate neutral boson)',
    forceOrRole: 'Mediator of the Neutral Weak Nuclear Force (Weak Neutral Currents)',
    discoveredYear: 1983,
    discoveredBy: 'UA1 and UA2 Collaborations',
    discoveryFacility: 'CERN Super Proton Synchrotron (SPS)',
    description: 'The neutral partner to the W bosons in the unified Electroweak theory. Discovered in 1983 at CERN. Precision measurements of its decay width at LEP (CERN) proved that there are precisely 3 generations of light active neutrinos.',
    keyProperties: [
      'Massive neutral gauge boson (91.19 GeV/c²)',
      'Mediates weak neutral current scattering without changing electric charge',
      'LEP precision width Γ_Z proved N_ν = 2.984 ± 0.008 (exactly 3 neutrino families)',
      'Mixes with W⁰ and B⁰ via the Weinberg electroweak angle θ_W'
    ],
    decayModes: [
      { products: ['Hadrons (q q̄ pairs)'], branchingRatio: '69.9%', type: 'Hadronic decay' },
      { products: ['Neutrinos (ν ν̄ pairs, invisible width)'], branchingRatio: '20.0%', type: 'Invisible neutrino width' },
      { products: ['e⁺ e⁻'], branchingRatio: '3.36%', type: 'Leptonic' },
      { products: ['μ⁺ μ⁻'], branchingRatio: '3.37%', type: 'Leptonic' },
      { products: ['τ⁺ τ⁻'], branchingRatio: '3.37%', type: 'Leptonic' }
    ],
    feynmanInteractions: ['Fermion neutral current (f f̄ Z⁰)', 'Gauge boson vertices (W⁺ W⁻ Z⁰)', 'Higgs coupling (Z⁰ Z⁰ H)'],
    gaugeGroup: 'SU(2)_L × U(1)_Y Electroweak Symmetry'
  },

  // --- SCALAR BOSONS (Spin 0) ---
  {
    id: 'higgs-boson',
    name: 'Higgs Boson (H⁰)',
    symbol: 'H⁰',
    symbolSuperscript: '0',
    category: 'scalar_boson',
    subtype: 'scalar_boson',
    mass: '125.25 ± 0.17 GeV/c²',
    massRawMeV: 125250,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '0 ℏ',
    spinNumeric: 0,
    weakIsospin: '-½ (in doublet)',
    weakHypercharge: '+1',
    colorCharge: 'Colorless (0)',
    lifetime: '1.56 × 10⁻²² s (width Γ ≈ 4.1 MeV)',
    antiparticle: 'Itself (Scalar self-conjugate)',
    forceOrRole: 'Excitation of the Higgs Field; gives mass to elementary fermions and gauge bosons',
    discoveredYear: 2012,
    discoveredBy: 'ATLAS and CMS Collaborations',
    discoveryFacility: 'CERN Large Hadron Collider (LHC)',
    description: 'The landmark particle that confirmed the Brout-Englert-Higgs mechanism of electroweak symmetry breaking. Elementary particles acquire inertial mass through their interaction with the pervasive non-zero vacuum expectation value of the Higgs field (v ≈ 246.22 GeV).',
    keyProperties: [
      'Only fundamental scalar (spin-0) particle discovered in nature',
      'Mass 125.25 GeV/c²',
      'Coupling strength is proportional to particle mass (heavier particles couple stronger)',
      'Vacuum expectation value v ≈ 246 GeV stabilizes the electroweak scale'
    ],
    decayModes: [
      { products: ['b b̄ (bottom quark pair)'], branchingRatio: '58.2%', type: 'Dominant fermion decay' },
      { products: ['W W* (virtual W pair)'], branchingRatio: '21.4%', type: 'Gauge boson channel' },
      { products: ['g g (gluon pair via top loop)'], branchingRatio: '8.19%', type: 'Loop-induced' },
      { products: ['τ⁺ τ⁻'], branchingRatio: '6.27%', type: 'Leptonic channel' },
      { products: ['c c̄ (charm pair)'], branchingRatio: '2.89%', type: 'Fermionic channel' },
      { products: ['Z Z* (→ 4 leptons "Golden Channel")'], branchingRatio: '2.62%', type: 'Precision discovery channel' },
      { products: ['γ γ (di-photon via W/top loop)'], branchingRatio: '0.227%', type: 'Discovery channel' },
      { products: ['Z γ'], branchingRatio: '0.154%', type: 'Loop-induced' },
      { products: ['μ⁺ μ⁻'], branchingRatio: '0.022%', type: 'Second gen leptonic' }
    ],
    feynmanInteractions: ['Yukawa coupling to fermions (f f̄ H)', 'Gauge couplings (W⁺ W⁻ H, Z⁰ Z⁰ H)', 'Higgs self-coupling (H H H, H H H H)'],
    gaugeGroup: 'Electroweak Symmetry Breaking'
  },

  // --- HYPOTHETICAL & BEYOND STANDARD MODEL ---
  {
    id: 'graviton',
    name: 'Graviton (Hypothetical)',
    symbol: 'G',
    category: 'hypothetical',
    subtype: 'hypothetical_boson',
    mass: '0 (exact) / < 6 × 10⁻³² eV/c²',
    massRawMeV: 0,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '2 ℏ',
    spinNumeric: 2,
    weakIsospin: '0',
    weakHypercharge: '0',
    colorCharge: 'Colorless (0)',
    lifetime: 'Stable (infinite)',
    antiparticle: 'Itself',
    forceOrRole: 'Proposed quantum mediator of Gravity in Quantum Gravity / String Theory',
    discoveredYear: 0,
    discoveredBy: 'Hypothesized by Paul Dirac, Dmitri Blokhintsev (1934)',
    discoveryFacility: 'Unobserved experimentally (extremely weak coupling ~10⁻³⁹)',
    description: 'The hypothesized spin-2, massless gauge boson mediating the gravitational force in quantum field theory. Because gravity is extraordinarily weak at subatomic scales, detecting a single graviton directly is physically near-impossible with current detector technology.',
    keyProperties: [
      'Massless spin-2 tensor boson',
      'Couples to stress-energy-momentum tensor T_μν with strength ~1/M_Planck',
      'Infinite range obeying inverse-square law',
      'Essential component of string theory and quantum gravity models'
    ],
    decayModes: [
      { products: ['Stable quantum mediator'], branchingRatio: '100%', type: 'Quantum mediator' }
    ],
    feynmanInteractions: ['Universal coupling to all particles with energy-momentum'],
    gaugeGroup: 'General Covariance / Diffeomorphism Invariance'
  },
  {
    id: 'axion',
    name: 'Axion (Hypothetical)',
    symbol: 'a',
    category: 'hypothetical',
    subtype: 'hypothetical_boson',
    mass: '10⁻⁶ – 10⁻³ eV/c²',
    massRawMeV: 0.000000001,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '0 ℏ',
    spinNumeric: 0,
    weakIsospin: '0',
    weakHypercharge: '0',
    colorCharge: 'Colorless (0)',
    lifetime: 'Extremely long (> age of universe)',
    antiparticle: 'Itself',
    forceOrRole: 'Resolves Strong CP Problem; prime Cold Dark Matter candidate',
    discoveredYear: 0,
    discoveredBy: 'Peccei & Quinn (1977), Weinberg & Wilczek (1978)',
    discoveryFacility: 'Searched for by ADMX, CAST, MADMAX, CERN',
    description: 'Postulated to solve the "Strong CP problem" in QCD (explaining why the strong force does not violate CP symmetry and why the neutron has no detectable electric dipole moment). If they exist, relic axions from the Big Bang could constitute all cold dark matter.',
    keyProperties: [
      'Ultra-light pseudoscalar boson (spin-0, negative parity)',
      'Couples extremely weakly to photons in strong magnetic fields (Primakoff effect)',
      'Leading candidate for cosmological Dark Matter'
    ],
    decayModes: [
      { products: ['γ + γ (two photons)'], branchingRatio: '100%', type: 'Primakoff conversion in magnetic field' }
    ],
    feynmanInteractions: ['Axion-photon-photon vertex (a γ γ) via anomaly loop'],
    gaugeGroup: 'Spontaneously broken U(1)_PQ global symmetry'
  },
  {
    id: 'sterile-neutrino',
    name: 'Sterile Neutrino (Hypothetical)',
    symbol: 'ν_s',
    symbolSubscript: 's',
    category: 'hypothetical',
    subtype: 'hypothetical_fermion',
    mass: 'keV to 10¹⁵ GeV/c²',
    massRawMeV: 0.001,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '0 (Singlet)',
    weakHypercharge: '0',
    colorCharge: 'Colorless (0)',
    lifetime: 'Depends on mass scale (can exceed universe age)',
    antiparticle: 'Majorana or Dirac partner',
    forceOrRole: 'Explains tiny neutrino masses via the Seesaw Mechanism; Dark Matter candidate',
    discoveredYear: 0,
    discoveredBy: 'Proposed in Seesaw models (Minkowski, Yanagida, Gell-Mann)',
    discoveryFacility: 'Searched for by MicroBooNE, MiniBooNE, KATRIN, IceCube',
    description: 'Right-handed singlet fermions that do not participate in any Standard Model gauge interactions (strong, weak, or electromagnetic), interacting solely via gravity and mixing with active neutrinos. Heavy sterile neutrinos explain why ordinary neutrinos have non-zero but minuscule masses via the Type-I Seesaw Mechanism.',
    keyProperties: [
      'Standard Model gauge singlet (no weak or electric charge)',
      'Key component of the Type-I Seesaw Mechanism for neutrino masses',
      'KeV-scale sterile neutrinos could explain Warm Dark Matter'
    ],
    decayModes: [
      { products: ['Active neutrino + photon (ν + γ)'], branchingRatio: 'Variable', type: 'Radiative decay via loop' }
    ],
    feynmanInteractions: ['Mass mixing with active neutrinos (ν_e, ν_μ, ν_τ)'],
    gaugeGroup: 'Singlet under SU(3)×SU(2)×U(1)'
  },
  {
    id: 'neutralino',
    name: 'Neutralino (LSP / SUSY)',
    symbol: 'χ̃₁⁰',
    symbolSuperscript: '0',
    symbolSubscript: '1',
    category: 'hypothetical',
    subtype: 'hypothetical_fermion',
    mass: '100 – 1000 GeV/c²',
    massRawMeV: 300000,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: 'Linear combo',
    weakHypercharge: 'Linear combo',
    colorCharge: 'Colorless (0)',
    lifetime: 'Stable (if R-parity is conserved)',
    antiparticle: 'Itself (Majorana fermion)',
    forceOrRole: 'Lightest Supersymmetric Particle (LSP); leading WIMP Dark Matter candidate',
    discoveredYear: 0,
    discoveredBy: 'Supersymmetry theories (MSSM)',
    discoveryFacility: 'Searched for by LHC (ATLAS/CMS), XenonnT, LZ, PandaX',
    description: 'In supersymmetric extensions of the Standard Model (SUSY), each fermion has a bosonic superpartner and vice-versa. The neutralino is a quantum mixture of the photino, zino, and neutral higgsinos. As the Lightest Supersymmetric Particle (LSP) protected by R-parity, it is strictly stable and a prime Weakly Interacting Massive Particle (WIMP) dark matter candidate.',
    keyProperties: [
      'Majorana fermion (is its own antiparticle)',
      'Lightest Supersymmetric Particle in MSSM',
      'Direct detection searched for in deep underground liquid xenon vats'
    ],
    decayModes: [
      { products: ['Stable LSP under R-parity'], branchingRatio: '100%', type: 'Stable dark matter candidate' }
    ],
    feynmanInteractions: ['Weak gauge couplings to W, Z, Higgs and squarks'],
    gaugeGroup: 'Supersymmetric Standard Model'
  },
  {
    id: 'gluino',
    name: 'Gluino (SUSY)',
    symbol: 'g̃',
    category: 'hypothetical',
    subtype: 'hypothetical_fermion',
    mass: '> 2200 GeV/c²',
    massRawMeV: 2200000,
    charge: '0 e',
    chargeNumeric: 0,
    spin: '½ ℏ',
    spinNumeric: 0.5,
    weakIsospin: '0',
    weakHypercharge: '0',
    colorCharge: 'Color octet (8 color combinations)',
    lifetime: '< 10⁻¹⁹ s (decays to squark + quark or loop)',
    antiparticle: 'Itself',
    forceOrRole: 'Fermionic superpartner of the gluon in Supersymmetry',
    discoveredYear: 0,
    discoveredBy: 'MSSM theory',
    discoveryFacility: 'Searched for in high-mass dijet and multi-jet signatures at LHC',
    description: 'The hypothetical fermionic superpartner of the gluon. As a color-octet fermion, gluinos would be strongly produced at hadron colliders like the LHC and decay into squarks and Standard Model quarks, producing signatures with copious jets and missing transverse energy.',
    keyProperties: [
      'Color-octet Majorana fermion',
      'Mass bound excluded below ~2.2 TeV by LHC experiments',
      'Decays into quark + antiquark + neutralino'
    ],
    decayModes: [
      { products: ['q + q̄ + χ̃₁⁰'], branchingRatio: '~100%', type: 'Three-body SUSY decay via virtual squark' }
    ],
    feynmanInteractions: ['Strong interaction (g̃ g̃ g), Gluino-quark-squark vertex'],
    gaugeGroup: 'SU(3)_C Color adjoint representation'
  },
  {
    id: 'magnetic-monopole',
    name: 'Magnetic Monopole',
    symbol: 'M',
    category: 'hypothetical',
    subtype: 'hypothetical_boson',
    mass: '~ 10¹⁶ GeV/c² (GUT scale)',
    massRawMeV: 10000000000000000,
    charge: 'Magnetic charge g_D = 2πℏ/e',
    chargeNumeric: 0,
    spin: '0 or 1 ℏ',
    spinNumeric: 0,
    weakIsospin: '0',
    weakHypercharge: '0',
    colorCharge: 'Colorless (0)',
    lifetime: 'Stable topological defect',
    antiparticle: 'Anti-monopole (opposite magnetic polarity)',
    forceOrRole: 'Symmetrizes Maxwell equations; explains electric charge quantization',
    discoveredYear: 0,
    discoveredBy: "Paul Dirac (1931), 't Hooft & Polyakov (1974)",
    discoveryFacility: 'MoEDAL experiment at CERN LHC, IceCube',
    description: "A hypothetical particle with an isolated magnetic north or south pole. Paul Dirac proved in 1931 that the existence of even a single magnetic monopole in the universe would naturally explain why electric charge is strictly quantized in integer units (e). Grand Unified Theories (GUTs) predict superheavy 't Hooft-Polyakov monopoles.",
    keyProperties: [
      'Carries Dirac magnetic charge g = n ℏc / 2e',
      'Explains quantization of electric charge everywhere in the universe',
      'Predicted as topological solitons in Grand Unified Theories (GUTs)'
    ],
    decayModes: [
      { products: ['Topologically stable; only annihilates with anti-monopole'], branchingRatio: '100%', type: 'Topological defect' }
    ],
    feynmanInteractions: ['Dual electromagnetic coupling to magnetic field'],
    gaugeGroup: 'Spontaneously broken GUT gauge group'
  }
];

export interface ParticleFilterState {
  category: 'all' | 'quark' | 'lepton' | 'gauge_boson' | 'scalar_boson' | 'hypothetical';
  generation: 'all' | '1' | '2' | '3' | 'boson' | 'hypothetical';
  spin: 'all' | 'fermion' | 'boson';
  searchQuery: string;
  sortBy: 'mass' | 'charge' | 'year' | 'name';
}
