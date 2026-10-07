'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[#090d16] text-white overflow-x-hidden flex items-center justify-center p-4">
      
      <div className="fixed -top-40 -left-40 w-80 h-80 sm:w-[50vw] sm:h-[50vw] rounded-full bg-indigo-600/15 blur-[80px] sm:blur-[130px] pointer-events-none z-0" />
      <div className="fixed -bottom-40 -right-40 w-80 h-80 sm:w-[50vw] sm:h-[50vw] rounded-full bg-purple-600/15 blur-[80px] sm:blur-[130px] pointer-events-none z-0" />

      <div className="w-full max-w-105 p-8 rounded-2xl bg-white/2 border border-white/6 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-indigo-500/5 relative z-10 transition-all duration-300">
        
        <div className="text-center mb-8 relative">
          <Link href="/" className="absolute left-0 top-1 text-slate-500 hover:text-white transition-colors" aria-label="Back">
            <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
          
          <h2 className="text-2xl font-bold tracking-tight mb-1">Welcome Back</h2>
          <p className="text-slate-400 text-xs">Enter your details to sign in to your account</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="w-full h-11 px-4 rounded-xl bg-white/3 border border-white/8 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Password</label>
              <Link href="#" className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 px-4 rounded-xl bg-white/3 border border-white/8 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200"
            />
          </div>

          <div className="flex items-center ml-1">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded border-white/10 bg-white/3 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950"
            />
            <label htmlFor="remember" className="ml-2 text-xs text-slate-400 select-none cursor-pointer hover:text-slate-300 transition-colors">
              Remember me for 30 days
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full h-11 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-white/4">
          <p className="text-xs text-slate-400">
            {"Don't have an account?"}
            <Link href="/sign-up" className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
