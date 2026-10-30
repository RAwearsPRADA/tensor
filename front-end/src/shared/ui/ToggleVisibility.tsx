'use client';

import { useRef } from 'react';

interface ComponentProps {
  state: boolean,
  toggleState: () => void,
}

export function GlassEyeButton({state, toggleState}: ComponentProps) {
    const btnRef = useRef<null | HTMLButtonElement>(null)
    const toggleVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      toggleState()
    };
    return (
      <button
        ref={btnRef}
        onClick={toggleVisibility}
        className={`
          absolute right-1 bottom-[4.5px] w-9 h-9 rounded-lg
          flex items-center justify-center
          border transition-all duration-500 ease-out select-none z-10
        
          ${
            state
              ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6),inset_0_0_8px_rgba(168,85,247,0.4)] backdrop-blur-none scale-105'
              : 'bg-white/2 border-white/10 backdrop-blur-[6px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/5'
          }
        `}
      >
        <svg
          className={`w-4 h-4 transition-colors duration-500 ${
            state ? 'text-purple-400' : 'text-gray-500'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {state ? (
            <>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </>
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 014.132-5.4M9.9 4.24a9.122 9.122 0 011.87 0A10.5 10.5 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.4M9.9 4.24A3 3 0 0012 9c.425 0 .836-.088 1.212-.247M9.9 4.24l5.47 5.47M12 9a3 3 0 013 3c0 .425-.088.836-.247 1.212M15 12l5.47 5.47M3 3l18 18" />
          )}
        </svg>
      </button>
    );
}
