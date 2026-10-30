import type { Dictionary } from "@/shared/dictionaries/languages"

import { Link } from "react-router-dom"
import { HexLogo } from "@/shared/ui/Logo"
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher"
import { useLanguageStore } from "@/shared/store/useLanguageStore"
import { useBurgerButtonStore } from "@/shared/store/useBurgerButtonStore"

export function Header() {
    const dictionary = useLanguageStore(s => s.t) as Dictionary
    const language = useLanguageStore(s => s.language)
    const currentLanguage = dictionary[language]
    const toggleBurgerMenu = useBurgerButtonStore(s => s.toggleBurger)

    return <>
        <header>
            <div className="bg-[rgba(15,23,42,0.3)] backdrop-blur-md flex justify-around py-4 border-b border-slate-800">
                <div className="flex items-center gap-x-1.5">
                    <HexLogo/>
                    <p className="sm:text-[20px] font-bold text-[16px]">{currentLanguage.header.brand}</p>
                </div>
                <div className="flex gap-x-10 items-center">
                    <div className="sm:flex gap-x-5 hidden">
                        <Link to="/log-in" className="sm:px-5 sm:mx-0 -mx-3 inline-flex items-center justify-center border border-slate-700 py-1.5 rounded-xl bg-[#1E293B] cursor-pointer hover:bg-[#203748] hover:border-[#3e3d68] transition-all duration-500 ease-in-out">
                            {currentLanguage.header.login}
                        </Link>
                        <Link to="/sign-up" className="sm:px-5 inline-flex items-center justify-center border border-slate-700 py-1.5 rounded-xl bg-[#4F46E5] cursor-pointer hover:bg-[#464479] hover:border-[#3e3d68] transition-all duration-500 ease-in-out">
                            {currentLanguage.header.signup}
                        </Link>
                    </div>
                    <div className="sm:hidden flex flex-col gap-y-1.5 cursor-pointer" onClick={() => toggleBurgerMenu()}>
                        <div className="w-6 bg-indigo-700 h-0.75"></div>
                        <div className="w-6 bg-indigo-700 h-0.75"></div>
                        <div className="w-6 bg-indigo-700 h-0.75"></div>
                    </div>
                    <LanguageSwitcher/>
                </div>
            </div>
        </header>
    </>
}