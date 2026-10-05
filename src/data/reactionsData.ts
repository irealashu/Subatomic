export interface FeynmanVertex {
  x: number;
  y: number;
  label?: string;
}

export interface FeynmanLine {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'fermion' | 'antifermion' | 'boson_photon' | 'boson_w' | 'boson_gluon' | 'boson_higgs';
  label: string;
  particleName: string;
  arrowDirection?: 'forward' | 'backward' | 'none';
  color?: string;
}

export interface ReactionProcess {
  id: string;
  name: string;
  equation: string;
  category: 'Weak Decay' | 'Electromagnetic' | 'Strong Interaction' | 'Higgs Physics' | 'Neutrino Scattering';
  description: string;
  initialParticles: string[];
  intermediateBoson: string;
  finalParticles: string[];
  conservedQuantities: {
    electricCharge: string;
    baryonNumber: string;
    leptonNumberElectron: string;
    leptonNumberMuon: string;
    leptonNumberTau: string;
    colorCharge: string;
  };
  explanation: string;
  significance: string;
  diagram: {
    width: number;
    height: number;
    vertices: FeynmanVertex[];
    lines: FeynmanLine[];
  };
}

export const REACTION_PROCESSES: ReactionProcess[] = [
  {
    id: 'beta-minus-decay',
    name: 'Nuclear Beta Minus (β⁻) Decay',
    equation: 'n → p + e⁻ + ν̄ₑ  (Quark level: d → u + W⁻ → u + e⁻ + ν̄ₑ)',
    category: 'Weak Decay',
    description: 'A down quark inside a neutron emits a virtual W⁻ boson and transmutes into an up quark, transforming the neutron into a proton. The W⁻ boson instantly decays into an electron and an electron antineutrino.',
    initialParticles: ['Down Quark (d, -1/3 e)'],
    intermediateBoson: 'Virtual W⁻ Boson (-1 e)',
    finalParticles: ['Up Quark (u, +2/3 e)', 'Electron (e⁻, -1 e)', 'Electron Antineutrino (ν̄ₑ, 0 e)'],
    conservedQuantities: {
      electricCharge: '-1/3 = +2/3 - 1 + 0 = -1/3 (Conserved)',
      baryonNumber: '+1/3 = +1/3 + 0 + 0 = +1/3 (Conserved)',
      leptonNumberElectron: '0 = 0 + 1 - 1 = 0 (Conserved)',
      leptonNumberMuon: '0 = 0 (Conserved)',
      leptonNumberTau: '0 = 0 (Conserved)',
      colorCharge: 'Red → Red + 0 = Red (Conserved)'
    },
    explanation: 'The weak charged current is the only force capable of changing quark flavors (down to up). Because the mass of the W⁻ boson (~80.4 GeV) is far greater than the available decay energy (~1.3 MeV), the W⁻ is "virtual" (off-shell), which is why the weak decay rate is low and free neutrons have a long lifetime (~879 seconds).',
    significance: 'Powers carbon-14 dating, nuclear fission reactors, and solar nucleosynthesis inside stars.',
    diagram: {
      width: 440,
      height: 260,
      vertices: [
        { x: 160, y: 130, label: 'Weak Vertex 1 (g_w)' },
        { x: 290, y: 130, label: 'Weak Vertex 2 (g_w)' }
      ],
      lines: [
        { id: 'l1', from: { x: 40, y: 130 }, to: { x: 160, y: 130 }, type: 'fermion', label: 'd (-1/3)', particleName: 'Down Quark', arrowDirection: 'forward', color: '#38bdf8' },
        { id: 'l2', from: { x: 160, y: 130 }, to: { x: 260, y: 40 }, type: 'fermion', label: 'u (+2/3)', particleName: 'Up Quark', arrowDirection: 'forward', color: '#38bdf8' },
        { id: 'l3', from: { x: 160, y: 130 }, to: { x: 290, y: 130 }, type: 'boson_w', label: 'W⁻ boson', particleName: 'Virtual W⁻', arrowDirection: 'none', color: '#f59e0b' },
        { id: 'l4', from: { x: 290, y: 130 }, to: { x: 400, y: 60 }, type: 'fermion', label: 'e⁻ (-1)', particleName: 'Electron', arrowDirection: 'forward', color: '#34d399' },
        { id: 'l5', from: { x: 290, y: 130 }, to: { x: 400, y: 200 }, type: 'antifermion', label: 'ν̄ₑ (anti)', particleName: 'Electron Antineutrino', arrowDirection: 'backward', color: '#a78bfa' }
      ]
    }
  },
  {
    id: 'muon-decay',
    name: 'Muon Leptonic Decay',
    equation: 'μ⁻ → e⁻ + ν̄ₑ + ν_μ',
    category: 'Weak Decay',
    description: 'A heavy second-generation muon decays via the weak force into a lighter first-generation electron, accompanied by a muon neutrino and an electron antineutrino to preserve both lepton family numbers.',
    initialParticles: ['Muon (μ⁻, -1 e, L_μ = +1)'],
    intermediateBoson: 'Virtual W⁻ Boson (-1 e)',
    finalParticles: ['Electron (e⁻, L_e = +1)', 'Electron Antineutrino (ν̄ₑ, L_e = -1)', 'Muon Neutrino (ν_μ, L_μ = +1)'],
    conservedQuantities: {
      electricCharge: '-1 = -1 + 0 + 0 = -1 (Conserved)',
      baryonNumber: '0 = 0 (Conserved)',
      leptonNumberElectron: '0 = +1 - 1 + 0 = 0 (Conserved)',
      leptonNumberMuon: '+1 = 0 + 0 + 1 = +1 (Conserved)',
      leptonNumberTau: '0 = 0 (Conserved)',
      colorCharge: '0 = 0 (Leptons carry no color)'
    },
    explanation: 'The muon lifetime (2.2 microseconds) is the standard precision laboratory test for the Fermi coupling constant G_F = 1.1663787 × 10⁻⁵ GeV⁻². Two neutrinos are mandatory: one to carry away muon lepton number (ν_μ) and a neutrino-antineutrino pair to conserve electron lepton number.',
    significance: 'Fundamental standard candle for measuring electroweak coupling strength G_F with part-per-million accuracy.',
    diagram: {
      width: 440,
      height: 260,
      vertices: [
        { x: 150, y: 130, label: 'Vertex 1 (μ-ν_μ-W)' },
        { x: 280, y: 130, label: 'Vertex 2 (e-ν_e-W)' }
      ],
      lines: [
        { id: 'm1', from: { x: 40, y: 130 }, to: { x: 150, y: 130 }, type: 'fermion', label: 'μ⁻', particleName: 'Muon', arrowDirection: 'forward', color: '#34d399' },
        { id: 'm2', from: { x: 150, y: 130 }, to: { x: 240, y: 40 }, type: 'fermion', label: 'ν_μ', particleName: 'Muon Neutrino', arrowDirection: 'forward', color: '#a78bfa' },
        { id: 'm3', from: { x: 150, y: 130 }, to: { x: 280, y: 130 }, type: 'boson_w', label: 'W⁻', particleName: 'Virtual W⁻ Boson', arrowDirection: 'none', color: '#f59e0b' },
        { id: 'm4', from: { x: 280, y: 130 }, to: { x: 390, y: 60 }, type: 'fermion', label: 'e⁻', particleName: 'Electron', arrowDirection: 'forward', color: '#34d399' },
        { id: 'm5', from: { x: 280, y: 130 }, to: { x: 390, y: 200 }, type: 'antifermion', label: 'ν̄ₑ', particleName: 'Electron Antineutrino', arrowDirection: 'backward', color: '#a78bfa' }
      ]
    }
  },
  {
    id: 'annihilation-dimuon',
    name: 'Electron-Positron Annihilation (e⁺ e⁻ → μ⁺ μ⁻)',
    equation: 'e⁺ + e⁻ → γ* / Z⁰ → μ⁺ + μ⁻',
    category: 'Electromagnetic',
    description: 'An electron and its antiparticle (positron) annihilate into a high-energy virtual photon or virtual Z⁰ boson, which subsequently materializes into a muon-antimuon pair.',
    initialParticles: ['Electron (e⁻)', 'Positron (e⁺)'],
    intermediateBoson: 'Virtual Photon (γ*) or Z⁰ Boson',
    finalParticles: ['Muon (μ⁻)', 'Antimuon (μ⁺)'],
    conservedQuantities: {
      electricCharge: '(-1) + (+1) = 0 = (-1) + (+1) (Conserved)',
      baryonNumber: '0 = 0 (Conserved)',
      leptonNumberElectron: '(+1) + (-1) = 0 (Conserved)',
      leptonNumberMuon: '0 = (+1) + (-1) = 0 (Conserved)',
      leptonNumberTau: '0 = 0 (Conserved)',
      colorCharge: '0 = 0 (Conserved)'
    },
    explanation: 'A cornerstone QED and electroweak reaction studied at colliders such as LEP and PETRA. The cross section ratio R = σ(e⁺e⁻ → hadrons) / σ(e⁺e⁻ → μ⁺μ⁻) proved the existence of 3 color states per quark and revealed new quark flavors as resonances.',
    significance: 'Primary experimental method for precision measurements of the fine-structure constant α and electroweak mixing angle θ_W.',
    diagram: {
      width: 440,
      height: 260,
      vertices: [
        { x: 150, y: 130, label: 'QED Vertex 1' },
        { x: 290, y: 130, label: 'QED Vertex 2' }
      ],
      lines: [
        { id: 'a1', from: { x: 40, y: 50 }, to: { x: 150, y: 130 }, type: 'fermion', label: 'e⁻', particleName: 'Incoming Electron', arrowDirection: 'forward', color: '#34d399' },
        { id: 'a2', from: { x: 150, y: 130 }, to: { x: 40, y: 210 }, type: 'antifermion', label: 'e⁺', particleName: 'Incoming Positron', arrowDirection: 'backward', color: '#f43f5e' },
        { id: 'a3', from: { x: 150, y: 130 }, to: { x: 290, y: 130 }, type: 'boson_photon', label: 'γ* / Z⁰', particleName: 'Virtual Photon / Z', arrowDirection: 'none', color: '#38bdf8' },
        { id: 'a4', from: { x: 290, y: 130 }, to: { x: 400, y: 50 }, type: 'fermion', label: 'μ⁻', particleName: 'Outgoing Muon', arrowDirection: 'forward', color: '#34d399' },
        { id: 'a5', from: { x: 400, y: 210 }, to: { x: 290, y: 130 }, type: 'antifermion', label: 'μ⁺', particleName: 'Outgoing Antimuon', arrowDirection: 'forward', color: '#f43f5e' }
      ]
    }
  },
  {
    id: 'higgs-diphoton',
    name: 'Higgs Boson Production & Diphoton Decay (H⁰ → γγ)',
    equation: 'g + g → (Top Loop) → H⁰ → (W / Top Loop) → γ + γ',
    category: 'Higgs Physics',
    description: 'At the Large Hadron Collider (LHC), two gluons fuse via a virtual top quark triangle loop to create a Higgs boson. The Higgs then decays into two high-energy photons via a virtual W boson loop, the signature that enabled its 2012 discovery.',
    initialParticles: ['Gluon (g₁)', 'Gluon (g₂)'],
    intermediateBoson: 'Top Quark Loop & Higgs Boson H⁰ (125 GeV)',
    finalParticles: ['Photon (γ₁)', 'Photon (γ₂)'],
    conservedQuantities: {
      electricCharge: '0 + 0 = 0 = 0 + 0 (Conserved)',
      baryonNumber: '0 = 0 (Conserved)',
      leptonNumberElectron: '0 = 0 (Conserved)',
      leptonNumberMuon: '0 = 0 (Conserved)',
      leptonNumberTau: '0 = 0 (Conserved)',
      colorCharge: 'Gluon color singlet (Octet cancellation) → 0 (Conserved)'
    },
    explanation: 'Even though photons and gluons have zero electric charge and zero mass (meaning the Higgs does not couple directly to them at tree level), quantum loops involving virtual top quarks and W bosons allow these transitions at loop level.',
    significance: 'The golden discovery channel used by ATLAS and CMS at CERN to announce the discovery of the Higgs boson on July 4, 2012.',
    diagram: {
      width: 440,
      height: 260,
      vertices: [
        { x: 120, y: 90, label: 'Gluon-Top' },
        { x: 120, y: 170, label: 'Gluon-Top' },
        { x: 200, y: 130, label: 'Top-Higgs' },
        { x: 270, y: 130, label: 'Higgs' },
        { x: 330, y: 90, label: 'W-Loop 1' },
        { x: 330, y: 170, label: 'W-Loop 2' }
      ],
      lines: [
        { id: 'h1', from: { x: 30, y: 70 }, to: { x: 120, y: 90 }, type: 'boson_gluon', label: 'g', particleName: 'Gluon 1', arrowDirection: 'none', color: '#fbbf24' },
        { id: 'h2', from: { x: 30, y: 190 }, to: { x: 120, y: 170 }, type: 'boson_gluon', label: 'g', particleName: 'Gluon 2', arrowDirection: 'none', color: '#fbbf24' },
        { id: 'h3', from: { x: 120, y: 90 }, to: { x: 200, y: 130 }, type: 'fermion', label: 'top loop', particleName: 'Top Quark Triangle', arrowDirection: 'forward', color: '#f43f5e' },
        { id: 'h4', from: { x: 200, y: 130 }, to: { x: 120, y: 170 }, type: 'fermion', label: 't̄', particleName: 'Top Quark Loop', arrowDirection: 'forward', color: '#f43f5e' },
        { id: 'h5', from: { x: 120, y: 170 }, to: { x: 120, y: 90 }, type: 'fermion', label: 't', particleName: 'Top Quark Loop', arrowDirection: 'forward', color: '#f43f5e' },
        { id: 'h6', from: { x: 200, y: 130 }, to: { x: 270, y: 130 }, type: 'boson_higgs', label: 'H⁰ (125 GeV)', particleName: 'Higgs Boson', arrowDirection: 'none', color: '#ec4899' },
        { id: 'h7', from: { x: 270, y: 130 }, to: { x: 400, y: 60 }, type: 'boson_photon', label: 'γ (Photon)', particleName: 'High Energy Photon', arrowDirection: 'none', color: '#38bdf8' },
        { id: 'h8', from: { x: 270, y: 130 }, to: { x: 400, y: 200 }, type: 'boson_photon', label: 'γ (Photon)', particleName: 'High Energy Photon', arrowDirection: 'none', color: '#38bdf8' }
      ]
    }
  },
  {
    id: 'top-decay',
    name: 'Top Quark Direct Decay (t → W⁺ + b)',
    equation: 't → W⁺ + b',
    category: 'Weak Decay',
    description: 'The ultra-heavy top quark (173 GeV) decays in approximately 5 × 10⁻²⁵ seconds into a real on-shell W⁺ boson and a bottom quark, before having time to form a bound hadron state.',
    initialParticles: ['Top Quark (t, +2/3 e, mass ~173 GeV)'],
    intermediateBoson: 'Real W⁺ Boson (~80.4 GeV)',
    finalParticles: ['Real W⁺ Boson (+1 e)', 'Bottom Quark (b, -1/3 e, mass ~4.2 GeV)'],
    conservedQuantities: {
      electricCharge: '+2/3 = +1 + (-1/3) = +2/3 (Conserved)',
      baryonNumber: '+1/3 = 0 + 1/3 = +1/3 (Conserved)',
      leptonNumberElectron: '0 = 0 (Conserved)',
      leptonNumberMuon: '0 = 0 (Conserved)',
      leptonNumberTau: '0 = 0 (Conserved)',
      colorCharge: 'Red → 0 + Red = Red (Conserved)'
    },
    explanation: 'Because the top quark mass (173 GeV) is greater than the combined mass of the W boson (80.4 GeV) and b quark (4.2 GeV), the W boson is produced on-shell (real, not virtual). The CKM matrix element |V_tb| ≈ 0.998 ensures that 99.8% of all top quarks decay this way.',
    significance: 'Enables physicists to study the properties of a completely bare, unconfined quark without non-perturbative QCD bound-state corrections.',
    diagram: {
      width: 440,
      height: 260,
      vertices: [
        { x: 180, y: 130, label: 'Weak Vertex (V_tb)' }
      ],
      lines: [
        { id: 't1', from: { x: 40, y: 130 }, to: { x: 180, y: 130 }, type: 'fermion', label: 'Top quark (t, +2/3)', particleName: 'Top Quark', arrowDirection: 'forward', color: '#f43f5e' },
        { id: 't2', from: { x: 180, y: 130 }, to: { x: 380, y: 50 }, type: 'boson_w', label: 'Real W⁺ boson (+1)', particleName: 'W⁺ Boson', arrowDirection: 'none', color: '#f59e0b' },
        { id: 't3', from: { x: 180, y: 130 }, to: { x: 380, y: 210 }, type: 'fermion', label: 'Bottom quark (b, -1/3)', particleName: 'Bottom Quark', arrowDirection: 'forward', color: '#38bdf8' }
      ]
    }
  }
];
