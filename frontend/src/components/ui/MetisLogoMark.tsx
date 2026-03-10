interface MetisLogoMarkProps {
  className?: string;
}

export function MetisLogoMark({ className }: MetisLogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="metis-core" cx="0" cy="0" r="1" gradientTransform="translate(32 32) scale(15)">
          <stop offset="0" stopColor="#FFF5C8" />
          <stop offset="0.42" stopColor="#F1D778" />
          <stop offset="0.78" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#9A7413" />
        </radialGradient>
        <linearGradient id="metis-blade" x1="32" y1="4" x2="32" y2="60">
          <stop offset="0" stopColor="#FFF0B1" />
          <stop offset="0.28" stopColor="#F2D36F" />
          <stop offset="0.7" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#8D6511" />
        </linearGradient>
        <linearGradient id="metis-ring" x1="12" y1="12" x2="52" y2="52">
          <stop offset="0" stopColor="#F0D88D" />
          <stop offset="0.55" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#8A6512" />
        </linearGradient>
        <filter id="metis-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#metis-glow)">
        <path d="M32 4C35.8 18.5 37.8 26.2 60 32C37.8 37.8 35.8 45.5 32 60C28.2 45.5 26.2 37.8 4 32C26.2 26.2 28.2 18.5 32 4Z" fill="url(#metis-blade)" />
        <path d="M32 10.5C34.4 21.1 36 26.6 53.5 32C36 37.4 34.4 42.9 32 53.5C29.6 42.9 28 37.4 10.5 32C28 26.6 29.6 21.1 32 10.5Z" fill="rgba(11,15,23,0.82)" />
        <path d="M14.5 16C20 13.4 25.9 12 32 12C38.1 12 44 13.4 49.5 16" stroke="url(#metis-ring)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M14.5 48C20 50.6 25.9 52 32 52C38.1 52 44 50.6 49.5 48" stroke="url(#metis-ring)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M10.8 23.2C13.8 18.9 18 15.3 22.8 12.8" stroke="url(#metis-ring)" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M53.2 23.2C50.2 18.9 46 15.3 41.2 12.8" stroke="url(#metis-ring)" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M10.8 40.8C13.8 45.1 18 48.7 22.8 51.2" stroke="url(#metis-ring)" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M53.2 40.8C50.2 45.1 46 48.7 41.2 51.2" stroke="url(#metis-ring)" strokeWidth="2.1" strokeLinecap="round" />
        <circle cx="32" cy="32" r="10.5" fill="url(#metis-core)" stroke="#FFF0B1" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
