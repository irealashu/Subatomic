# Subatomic - Elementary Particles & Standard Model Explorer

An interactive, scientific reference and visual exploration platform for elementary particles, the Standard Model of particle physics, quantum invariants, Feynman interaction diagrams, and fundamental forces.

---

## ✨ Features

- **Canonical Standard Model Matrix**:
  - Exact 5-column, 4-row periodic grid following the official Wikimedia elementary particle taxonomy.
  - Three generations of matter (**Quarks** & **Leptons**), four fundamental **Gauge Bosons** ($\gamma, g, W^\pm, Z^0$), and the **Scalar Higgs Boson** ($H^0$).
  - High-density square tiles (`aspect-square`) with proper particle names, quantum symbols, mass metrics, and fractional charges.
- **Top Metric Switcher**:
  - Dynamically toggle tile metrics between **Rest Mass**, **Electric Charge**, **Spin ($J$)**, **Weak Isospin ($I_3$)**, **Discovery Year**, and **Mean Lifetime**.
- **Fundamental Force Filters**:
  - Highlight active coupling sectors: **Strong (QCD)**, **Electromagnetic (QED)**, **Weak ($SU(2)_L$)**, and **Higgs mass generation**.
- **Collapsible Beyond Standard Model (BSM) Section**:
  - Expandable candidate section exploring hypothetical particles including the **Graviton**, **Axion**, **Gluino**, **Neutralino**, **Dark Photon**, and **$W'/Z'$ Bosons**.
- **Hadron Builder (QCD Confinement Well)**:
  - Assemble mesons ($q\bar{q}$) and baryons ($qqq$) within a color-confinement well.
  - Real-time calculation of net electric charge, net baryon number, constituent rest mass estimation, and selected constituent quark quantum models.
- **Decay & Feynman Interaction Diagrams**:
  - Visual vertices for beta decay ($n \to p + e^- + \bar{\nu}_e$), muon decay, annihilation, and boson interactions.
- **Conservation Laws & Quantum Invariants**:
  - Verify physical vs. forbidden reaction channels through conservation of Baryon number ($B$), Lepton numbers ($L_e, L_\mu, L_\tau$), Charge ($Q$), and Strangeness ($S$).
- **Experimental Discovery Timeline**:
  - Chronological milestones tracking breakthroughs from Thomson's 1897 electron discovery to the 2012 CERN LHC Higgs observation.
- **Global Command Palette**:
  - Press `⌘K` or `Ctrl+K` to search across all particles, forces, and sections instantly.
- **Light & Dark Theme**:
  - System-aware theme switcher with smooth orbital rotating atomic logo.
- **Relative Paths & Zero-Config Subpath Deployment**:
  - Configured with `base: './'` for instant hosting on GitHub Pages or custom subpaths.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/) with relative asset paths (`base: './'`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Continuous Deployment**: GitHub Actions workflow (`.github/workflows/deploy.yml`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher recommended)
- `npm` (version 10 or higher)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development Server

Start the local development server on port 3000:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized production bundle with relative asset paths:

```bash
npm run build
```

The output will be placed in the `dist/` directory, ready to be hosted on any static web server or sub-directory.

### Type Checking & Linting

```bash
npm run lint
```

---

## 🌐 GitHub Pages Deployment

This repository includes an automated GitHub Actions deployment workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To deploy:
1. Push your changes to the `main` or `master` branch.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. The workflow will automatically build and deploy your site to `https://<username>.github.io/<repository-name>/`.

Because Vite is configured with `base: './'`, all scripts, styles, and assets resolve with relative paths regardless of your repository name.

---

## 📄 License

© 2026 Ashutosh Singh. All rights reserved.
Licensed under the [Apache-2.0 License](LICENSE).
