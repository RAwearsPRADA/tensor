'use client'
import { useLanguageStore } from "../store/useLanguageStore"
import { languages } from "../dictionaries/languages"
import { useState, useRef, useEffect } from "react"


export function LanguageSwitcher() {
    const {language, setLanguage } = useLanguageStore()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

  const currentLang = languages.find((l) => l.code === language) || languages[0]
    return (
        <>
        <div className="relative inline-block text-left sm:ml-0 -ml-4" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-x-2 border border-slate-700 px-4 py-2 rounded-xl bg-[#1E293B] text-slate-200 text-sm font-medium cursor-pointer hover:bg-[#243249] hover:border-slate-600 transition-all duration-300 ease-in-out select-none"
          >
            <span>{currentLang.flag}</span>
            <span className="uppercase">{currentLang.code}</span>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-800 bg-[rgba(15,23,42,0.95)] backdrop-blur-lg shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`flex items-center gap-x-3 w-full px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors duration-200 ${
                    language === lang.code
                      ? "bg-[#4F46E5] text-white font-medium"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
    </div>
        </>
    )
}