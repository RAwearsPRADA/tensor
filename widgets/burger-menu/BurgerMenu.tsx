"use client"

import type { Dictionary } from "@/shared/dictionaries/languages"
import Link from "next/link"
import { useBurgerButtonStore } from "@/shared/store/useBurgerButtonStore"
import { useLanguageStore } from "@/shared/store/useLanguageStore"

export function BurgerMenu() {
    const closeBurgerMenu = useBurgerButtonStore(s => s.closeBurger)
    const dictionary = useLanguageStore(s => s.t) as Dictionary
    const currentLanguage = useLanguageStore(s => s.language)
    return (
        <>
            <div className="flex flex-col fixed inset-0 zoom-100 bg-slate-900/80 backdrop-blur-sm">
                <div className="flex p-2 justify-end">
                    <button className="right-0.5 cursor-pointer" onClick={closeBurgerMenu}>
                        <svg xmlns="http://w3.org" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <ul className="flex-1 flex flex-col justify-center items-center gap-6 text-center text-3xl">
                    <Link href="/log-in" className="">{dictionary[currentLanguage].header.login}</Link>
                    <Link href="/sign-up">{dictionary[currentLanguage].header.signup}</Link>
                </ul>
            </div>
        </>
    )
}