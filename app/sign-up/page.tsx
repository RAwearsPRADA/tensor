'use client';

import { type Dictionary } from '@/shared/dictionaries/languages';
import { useCallback, useState } from 'react';
import { useLanguageStore } from '@/shared/store/useLanguageStore';
import Link from 'next/link';
import { GlassEyeButton } from '@/shared/ui/ToggleVisibility';
import { validateFormData } from '@/shared/lib/validators/validator';

export default function SignUpPage() {
  const dictionary = useLanguageStore(s => s.t) as Dictionary
  const currentLanguage = useLanguageStore(s => s.language)
  const [errorField, setErrorField] = useState<string>("")
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const toggleVisibility = () => {
    setPasswordVisible(state => !state)
  }
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  const checkError = useCallback((name: string) => {
    if (errorField === name) {
      return "border-red-600"
    }
    return "border-white/8"
  }, [errorField])

  if (!dictionary[currentLanguage])
    return null
  return (
    <div className="relative min-h-screen bg-[#090d16] text-white overflow-x-hidden flex items-center justify-center p-4">
      
      <div className="fixed -top-40 -left-40 w-80 h-80 sm:w-[50vw] sm:h-[50vw] rounded-full bg-indigo-600/15 blur-[80px] sm:blur-[130px] pointer-events-none z-0" />
      <div className="fixed -bottom-40 -right-40 w-80 h-80 sm:w-[50vw] sm:h-[50vw] rounded-full bg-purple-600/15 blur-[80px] sm:blur-[130px] pointer-events-none z-0" />

      <div className="w-full max-w-110 p-8 rounded-2xl bg-white/2 border border-white/6 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-indigo-500/5 relative z-10 transition-all duration-300">
        
        <div className="text-center mb-6 relative">
          <Link href="/" className="absolute left-0 top-1 text-slate-500 hover:text-white transition-colors" aria-label="Back">
            <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
          
          <h2 className="text-2xl font-bold tracking-tight mb-1">Create Account</h2>
          <p className="text-slate-400 text-xs">Join Tensor and start your math journey</p>
        </div>

        <form onSubmit={async (event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          const data = Object.fromEntries(formData.entries())
          console.log(data)
          const result = validateFormData(data)
          if (result.length > 0){
            setErrorField(result)
            return null;
          }

          const response = await fetch("http://127.0.0.1:8080/api/auth/sign_up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...data,
              role,
              classNumber: data.classNumber? parseInt(data.classNumber as string): null
            })
          })
          setErrorField("")
          console.log(response)

        }} className="space-y-4">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5 ml-1">I want to</label>
            <div className="grid grid-cols-2 gap-3">
              
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  role === 'student'
                    ? 'bg-indigo-600/15 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    : 'bg-white/2 border-white/6 hover:bg-white/4 hover:border-white/10'
                }`}
              >
                <div className="text-lg mb-1">🎒</div>
                <div className="font-semibold text-sm">Study math</div>
                <div className="text-[10px] text-slate-400 mt-0.5">As a Student</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  role === 'teacher'
                    ? 'bg-indigo-600/15 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    : 'bg-white/2 border-white/6 hover:bg-white/4 hover:border-white/10'
                }`}
              >
                <div className="text-lg mb-1">👨‍🏫</div>
                <div className="font-semibold text-sm">Teach math</div>
                <div className="text-[10px] text-slate-400 mt-0.5">As a Teacher</div>
              </button>

            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
              {dictionary[currentLanguage].signUpPage.info.firstName}</label>
            <input 
              type="text"
              name="firstName"
              placeholder={`${dictionary[currentLanguage].signUpPage.info.firstNamePlaceHolder}`} 
              className={`w-full h-11 px-4 rounded-xl border ${checkError("firstName")} bg-white/3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200`}
            />
          </div>
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
              {dictionary[currentLanguage].signUpPage.info.lastName}</label>
            <input 
              type="text"
              name="lastName"
              placeholder={`${dictionary[currentLanguage].signUpPage.info.lastNamePlaceHolder}`} 
              className={`w-full h-11 px-4 rounded-xl border ${checkError("lastName")} bg-white/3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200`}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="example@gmail.com"
              className={`w-full h-11 px-4 rounded-xl border ${checkError("email")} bg-white/3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200`}
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{dictionary[currentLanguage].signUpPage.info.login}</label>
            <input 
              type="text" 
              name="username"
              placeholder="username"
              className={`w-full h-11 px-4 rounded-xl border ${checkError("username")} bg-white/3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200`}
            />
          </div>
          {role === "student" &&
            <>
              <div>
                <label htmlFor="class-number" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{dictionary[currentLanguage].signUpPage.info.classNumber}</label>
                <input type="text" 
                placeholder={dictionary[currentLanguage].signUpPage.info.classNumberPlaceHolder} 
                name="classNumber"
                className={`w-full h-11 px-4 rounded-xl border ${checkError("classNumber")} bg-white/3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200`} 
                />
              </div>
              <div>
                <label htmlFor="classSymbol" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{dictionary[currentLanguage].signUpPage.info.classSymbol}</label>
                <input 
                type="text" 
                placeholder="A" 
                name="classSymbol"
                className={`w-full h-11 px-4 rounded-xl border ${checkError("classSymbol")} bg-white/3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200`} 
                />
              </div>
            </>
          }
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{dictionary[currentLanguage].signUpPage.info.password}</label>
            <input 
              type={passwordVisible? "text": "password"}
              name="password"
              placeholder="••••••••" 
              className={`w-full h-11 px-4 rounded-xl border ${checkError("password")} bg-white/3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-white/6 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200`}
            />
            <GlassEyeButton state={passwordVisible} toggleState={toggleVisibility}/>
          </div>

          <button 
            type="submit" 
            className="w-full h-11 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Sign Up as {role === 'student' ? 'Student' : 'Teacher'}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-white/4">
          <p className="text-xs text-slate-400">
            Already have an account? 
            <Link href="/log-in" className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors">
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
