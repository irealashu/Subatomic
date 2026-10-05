import React from 'react';

interface ParticleSymbolProps {
  symbol: string;
  className?: string;
  subClassName?: string;
  supClassName?: string;
}

export const ParticleSymbol: React.FC<ParticleSymbolProps> = ({
  symbol,
  className = '',
  subClassName = 'text-[0.65em] -bottom-0.5 ml-0.5',
  supClassName = 'text-[0.65em] -top-1 ml-0.5',
}) => {
  // Common specific particle symbol mappings
  switch (symbol) {
    case 'ν_μ':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          ν<sub className={subClassName}>μ</sub>
        </span>
      );
    case 'ν_τ':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          ν<sub className={subClassName}>τ</sub>
        </span>
      );
    case 'νₑ':
    case 'ν_e':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          ν<sub className={subClassName}>e</sub>
        </span>
      );
    case 'ν_s':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          ν<sub className={subClassName}>s</sub>
        </span>
      );
    case 'e⁻':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          e<sup className={supClassName}>−</sup>
        </span>
      );
    case 'μ⁻':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          μ<sup className={supClassName}>−</sup>
        </span>
      );
    case 'τ⁻':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          τ<sup className={supClassName}>−</sup>
        </span>
      );
    case 'W±':
    case 'W^±':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          W<sup className={supClassName}>±</sup>
        </span>
      );
    case 'W⁺':
    case 'W+':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          W<sup className={supClassName}>+</sup>
        </span>
      );
    case 'W⁻':
    case 'W-':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          W<sup className={supClassName}>−</sup>
        </span>
      );
    case 'e⁺':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          e<sup className={supClassName}>+</sup>
        </span>
      );
    case 'μ⁺':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          μ<sup className={supClassName}>+</sup>
        </span>
      );
    case 'τ⁺':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          τ<sup className={supClassName}>+</sup>
        </span>
      );
    case 'ν̄ₑ':
    case 'ν̄_e':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">ν</span><sub className={subClassName}>e</sub>
        </span>
      );
    case 'ν̄_μ':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">ν</span><sub className={subClassName}>μ</sub>
        </span>
      );
    case 'ν̄_τ':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">ν</span><sub className={subClassName}>τ</sub>
        </span>
      );
    case 'Z⁰':
    case 'Z0':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          Z<sup className={supClassName}>0</sup>
        </span>
      );
    case 'H⁰':
    case 'H0':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          H<sup className={supClassName}>0</sup>
        </span>
      );
    case 'A⁰':
    case 'a':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          a<sup className={supClassName}>0</sup>
        </span>
      );
    case 'χ̃₁⁰':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          χ̃<sub className={subClassName}>1</sub><sup className={supClassName}>0</sup>
        </span>
      );
    case 'ū':
    case 'u̅':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">u</span>
        </span>
      );
    case 'd̄':
    case 'd̅':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">d</span>
        </span>
      );
    case 's̄':
    case 's̅':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">s</span>
        </span>
      );
    case 'c̄':
    case 'c̅':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">c</span>
        </span>
      );
    case 'b̄':
    case 'b̅':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">b</span>
        </span>
      );
    case 't̄':
    case 't̅':
      return (
        <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
          <span className="overline decoration-1">t</span>
        </span>
      );
  }

  // Generic underscore parser (e.g. symbol_sub)
  if (symbol.includes('_')) {
    const [base, sub] = symbol.split('_');
    return (
      <span className={`inline-flex items-baseline font-mono font-bold ${className}`}>
        {base}
        <sub className={subClassName}>{sub}</sub>
      </span>
    );
  }

  return (
    <span className={`font-mono font-bold ${className}`}>
      {symbol}
    </span>
  );
};
