// shared/ui/hex-logo.tsx
export function HexLogo({ size = 40 }: { size?: number }) {
    return (
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full relative animate-hex-pulse">
          
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
          >
            <defs>
              <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
  
            <polygon 
              points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" 
              fill="none" 
              stroke="url(#hexGrad)" 
              strokeWidth="3" 
              strokeLinejoin="round"
              filter="url(#neonGlow)"
              className="animate-hex-rotate"
            />
  
            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
            <line x1="7" y1="27.5" x2="93" y2="72.5" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
            <line x1="93" y1="27.5" x2="7" y2="72.5" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
  
            <text 
              x="50" 
              y="62" 
              textAnchor="middle" 
              fill="white" 
              fontSize="48" 
              fontWeight="bold" 
              fontFamily="monospace"
              filter="url(#neonGlow)"
              className="animate-t-glow"
            >
              T
            </text>
          </svg>
        </div>
      </div>
    );
  }