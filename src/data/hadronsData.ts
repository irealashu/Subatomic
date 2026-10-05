export type HadronType = 'baryon' | 'antibaryon' | 'meson' | 'tetraquark' | 'pentaquark';

export interface QuarkConstituent {
  quark: 'u' | 'd' | 'c' | 's' | 't' | 'b' | 'ū' | 'd̄' | 'c̄' | 's̄' | 't̄' | 'b̄';
  isAnti: boolean;
  charge: number;
  strangeness: number;
  charm: number;
  bottomness: number;
  topness: number;
  bareMassMeV: number;
}

export interface PresetHadron {
  id: string;
  name: string;
  symbol: string;
  type: HadronType;
  quarks: string[];
  charge: string;
  chargeNumeric: number;
  mass: string;
  massMeV: number;
  spin: string;
  lifetime: string;
  quarkContentExplanation: string;
  description: string;
}

export const PRESET_HADRONS: PresetHadron[] = [
  {
    id: 'proton',
    name: 'Proton',
    symbol: 'p / p⁺',
    type: 'baryon',
    quarks: ['u', 'u', 'd'],
    charge: '+1 e',
    chargeNumeric: 1,
    mass: '938.272 MeV/c²',
    massMeV: 938.272,
    spin: '½ ℏ',
    lifetime: 'Stable (> 1.6 × 10³⁴ years)',
    quarkContentExplanation: 'u (+⅔ e) + u (+⅔ e) + d (-⅓ e) = +1 e. Baryon number B = 1.',
    description: 'The only strictly stable composite hadron in the universe. Note that the sum of bare quark masses (2.2 + 2.2 + 4.7 ≈ 9.1 MeV) is only ~1% of the proton\'s total 938 MeV mass; 99% of the proton mass is generated dynamically by the kinetic energy and color field binding energy of gluons (QCD scale Λ_QCD).'
  },
  {
    id: 'neutron',
    name: 'Neutron',
    symbol: 'n / n⁰',
    type: 'baryon',
    quarks: ['u', 'd', 'd'],
    charge: '0 e',
    chargeNumeric: 0,
    mass: '939.565 MeV/c²',
    massMeV: 939.565,
    spin: '½ ℏ',
    lifetime: '879.4 ± 0.6 seconds (free)',
    quarkContentExplanation: 'u (+⅔ e) + d (-⅓ e) + d (-⅓ e) = 0 e. Baryon number B = 1.',
    description: 'Slightly heavier than the proton by 1.29 MeV/c² due to having two down quarks instead of two up quarks. In isolation, free neutrons decay via beta minus decay (n → p + e⁻ + ν̄ₑ) in ~14.6 minutes, but become stable when bound inside atomic nuclei.'
  },
  {
    id: 'pion-plus',
    name: 'Pion (Positive)',
    symbol: 'π⁺',
    type: 'meson',
    quarks: ['u', 'd̄'],
    charge: '+1 e',
    chargeNumeric: 1,
    mass: '139.570 MeV/c²',
    massMeV: 139.570,
    spin: '0 ℏ',
    lifetime: '26.033 ns (2.60 × 10⁻⁸ s)',
    quarkContentExplanation: 'u (+⅔ e) + d̄ (+⅓ e) = +1 e. Meson (quark + antiquark).',
    description: 'The lightest meson and the pseudo-Goldstone boson of spontaneously broken chiral symmetry in QCD. Acts as the primary mediator of the residual strong nuclear force binding protons and neutrons together in atomic nuclei (Yukawa interaction).'
  },
  {
    id: 'pion-zero',
    name: 'Pion (Neutral)',
    symbol: 'π⁰',
    type: 'meson',
    quarks: ['u', 'ū'],
    charge: '0 e',
    chargeNumeric: 0,
    mass: '134.977 MeV/c²',
    massMeV: 134.977,
    spin: '0 ℏ',
    lifetime: '8.52 × 10⁻¹⁷ s',
    quarkContentExplanation: 'Superposition (u ū - d d̄)/√2. Net charge 0 e. Net strangeness 0.',
    description: 'Decays overwhelmingly into two photons (π⁰ → γ + γ) via the electromagnetic chiral anomaly, explaining why its lifetime is 8 orders of magnitude shorter than the charged pion.'
  },
  {
    id: 'kaon-plus',
    name: 'Kaon (Positive)',
    symbol: 'K⁺',
    type: 'meson',
    quarks: ['u', 's̄'],
    charge: '+1 e',
    chargeNumeric: 1,
    mass: '493.677 MeV/c²',
    massMeV: 493.677,
    spin: '0 ℏ',
    lifetime: '12.38 ns (1.24 × 10⁻⁸ s)',
    quarkContentExplanation: 'u (+⅔ e) + s̄ (+⅓ e) = +1 e. Strangeness S = +1.',
    description: 'First observed in cosmic ray tracks in 1947. Their unexpectedly long lifetimes led to the discovery of the Strangeness quantum number. Historical study of neutral Kaon mixing led to the discovery of CP violation in 1964.'
  },
  {
    id: 'j-psi',
    name: 'J/ψ Meson (Charmonium)',
    symbol: 'J/ψ',
    type: 'meson',
    quarks: ['c', 'c̄'],
    charge: '0 e',
    chargeNumeric: 0,
    mass: '3096.900 MeV/c²',
    massMeV: 3096.9,
    spin: '1 ℏ',
    lifetime: '7.2 × 10⁻²¹ s',
    quarkContentExplanation: 'c (+⅔ e) + c̄ (-⅔ e) = 0 e. Pure charmonium bound state.',
    description: 'The bound state of a charm quark and charm antiquark. Discovered simultaneously in November 1974 at SLAC (named ψ) and Brookhaven (named J), cementing the existence of the fourth quark in the "November Revolution".'
  },
  {
    id: 'delta-plus-plus',
    name: 'Delta Baryon Resonance',
    symbol: 'Δ⁺⁺',
    type: 'baryon',
    quarks: ['u', 'u', 'u'],
    charge: '+2 e',
    chargeNumeric: 2,
    mass: '1232 MeV/c²',
    massMeV: 1232,
    spin: '3/2 ℏ',
    lifetime: '5.6 × 10⁻²⁴ s',
    quarkContentExplanation: 'u (+⅔ e) + u (+⅔ e) + u (+⅔ e) = +2 e. Baryon number B = 1.',
    description: 'An excited baryon with 3 up quarks all in symmetric spin states. The apparent violation of the Pauli Exclusion Principle by the Δ⁺⁺ led Oscar Greenberg and Yoichiro Nambu to introduce the fundamental concept of Color Charge (Red, Green, Blue).'
  },
  {
    id: 'omega-minus',
    name: 'Omega Baryon',
    symbol: 'Ω⁻',
    type: 'baryon',
    quarks: ['s', 's', 's'],
    charge: '-1 e',
    chargeNumeric: -1,
    mass: '1672.45 MeV/c²',
    massMeV: 1672.45,
    spin: '3/2 ℏ',
    lifetime: '8.21 × 10⁻¹¹ s',
    quarkContentExplanation: 's (-⅓ e) + s (-⅓ e) + s (-⅓ e) = -1 e. Strangeness S = -3.',
    description: 'Predicted theoretically by Murray Gell-Mann in 1962 using the SU(3) "Eightfold Way" symmetry scheme before it had ever been seen. Its exact experimental discovery in 1964 at Brookhaven confirmed the predictive power of the quark model.'
  },
  {
    id: 'x-3872',
    name: 'Exotic Tetraquark X(3872) / χ_c1(3872)',
    symbol: 'X(3872)',
    type: 'tetraquark',
    quarks: ['c', 'c̄', 'u', 'ū'],
    charge: '0 e',
    chargeNumeric: 0,
    mass: '3871.69 MeV/c²',
    massMeV: 3871.69,
    spin: '1 ℏ (1⁺⁺)',
    lifetime: '5.5 × 10⁻²² s',
    quarkContentExplanation: 'Four-quark composite: c + c̄ + u + ū (charmonium-like tetraquark or D⁰ D̄*⁰ molecule).',
    description: 'Discovered by the Belle experiment in Japan in 2003. It was the first recognized exotic multiquark state, proving that QCD allows bound states beyond conventional 3-quark baryons and 2-quark mesons.'
  },
  {
    id: 'pentaquark',
    name: 'Pentaquark State P_c(4312)⁺',
    symbol: 'P_c⁺',
    type: 'pentaquark',
    quarks: ['u', 'u', 'd', 'c', 'c̄'],
    charge: '+1 e',
    chargeNumeric: 1,
    mass: '4311.9 MeV/c²',
    massMeV: 4311.9,
    spin: '1/2 ℏ or 3/2 ℏ',
    lifetime: '6.7 × 10⁻²³ s',
    quarkContentExplanation: 'Five-quark composite: 3 valence quarks (u u d) + charm-anticharm pair (c c̄).',
    description: 'Discovered in 2019 by the LHCb experiment at CERN. Represents a resonant bound state consisting of a proton-like core (uud) coupled to a charmonium (c c̄) state, confirming the reality of 5-quark matter.'
  }
];

export const QUARK_METADATA: Record<string, { name: string; charge: number; spin: number; mass: number; strangeness: number; charm: number; bottomness: number }> = {
  u: { name: 'Up', charge: 2/3, spin: 0.5, mass: 2.16, strangeness: 0, charm: 0, bottomness: 0 },
  d: { name: 'Down', charge: -1/3, spin: 0.5, mass: 4.67, strangeness: 0, charm: 0, bottomness: 0 },
  c: { name: 'Charm', charge: 2/3, spin: 0.5, mass: 1270, strangeness: 0, charm: 1, bottomness: 0 },
  s: { name: 'Strange', charge: -1/3, spin: 0.5, mass: 93.4, strangeness: -1, charm: 0, bottomness: 0 },
  t: { name: 'Top', charge: 2/3, spin: 0.5, mass: 172690, strangeness: 0, charm: 0, bottomness: 0 },
  b: { name: 'Bottom', charge: -1/3, spin: 0.5, mass: 4180, strangeness: 0, charm: 0, bottomness: -1 },
  'ū': { name: 'Anti-Up', charge: -2/3, spin: 0.5, mass: 2.16, strangeness: 0, charm: 0, bottomness: 0 },
  'd̄': { name: 'Anti-Down', charge: 1/3, spin: 0.5, mass: 4.67, strangeness: 0, charm: 0, bottomness: 0 },
  'c̄': { name: 'Anti-Charm', charge: -2/3, spin: 0.5, mass: 1270, strangeness: 0, charm: -1, bottomness: 0 },
  's̄': { name: 'Anti-Strange', charge: 1/3, spin: 0.5, mass: 93.4, strangeness: 1, charm: 0, bottomness: 0 },
  't̄': { name: 'Anti-Top', charge: -2/3, spin: 0.5, mass: 172690, strangeness: 0, charm: 0, bottomness: 0 },
  'b̄': { name: 'Anti-Bottom', charge: 1/3, spin: 0.5, mass: 4180, strangeness: 0, charm: 0, bottomness: 1 }
};
