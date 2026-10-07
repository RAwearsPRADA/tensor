"use client"
import type { Dictionary } from "../dictionaries/languages"
import { useLanguageStore } from "../store/useLanguageStore"

export function Badge() {
    const dictionary = useLanguageStore(s => s.t) as Dictionary
    const currentLanguage = useLanguageStore(s => s.language)

    return <>
        <div className="inline-flex border items-center gap-2 shadow-[0_0_250px_rgba(95,109,252,0.56)] 
        border-[rgba(99,102,241,0.2)] p-2 rounded-full px-5 bg-[rgba(99,101,241,0.07)] text-[#b7bdff] font-semibold
        cursor-pointer transition-all duration-300 ease-out hover:bg-slate-800/60 
        hover:border-slate-700/80 hover:shadow-5xl hover:shadow-indigo-500/10">
            <span className="inline-block aspect-square w-2 bg-[#818CF8] rounded-full"></span>
            {dictionary[currentLanguage].hero.badge}
        </div>
    </>
}