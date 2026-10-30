"use client"


export function ErrorIcon() {
    return (
        <>
            <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                className="w-6 h-6 text-red-500">
              <circle cx="12" cy="12" r="10" fill="#EF4444" stroke="#eeff00" />
              <line x1="15" y1="9" x2="9" y2="15" stroke="white" />
              <line x1="9" y1="9" x2="15" y2="15" stroke="white" />
            </svg>
        </>
    )
}