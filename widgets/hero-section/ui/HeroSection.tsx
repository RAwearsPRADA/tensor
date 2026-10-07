"use client"


import type { Dictionary } from "@/shared/dictionaries/languages"
import { useLanguageStore } from "@/shared/store/useLanguageStore"
import { Badge } from "@/shared/ui/Badge"
import Link from "next/link"

export function HeroSection() {
    const dictionary = useLanguageStore(s => s.t) as Dictionary
    const language = useLanguageStore(s => s.language)
    return <>
        <main className="flex flex-col items-center hero-section">
            <div className="flex flex-col items-center pt-20 gap-y-10 text-center max-w-[90%]">
                <Badge/>
                <h1 className="sm:text-6xl text-4xl font-extrabold">
                    {dictionary[language].hero.title.split(" ").slice(0, -3).join(" ")}
                    <span className="text-[#6f71f3]">{dictionary[language].hero.title.split(" ").slice(2).join(" ")}</span>
                </h1>
                <p className="sm:text-2xl text-x1 text-[#d4d4d4] max-w-[50%]">
                    {dictionary[language].hero.subtitle}
                </p>
                <div className="p-7 px-10 border border-[#1E293B] rounded-2xl text-2xl formula-bg ">
                    <span className="text-[#818CF8]">
                        {dictionary[language].hero.formula}
                    </span>
                </div>
                <div className="flex gap-x-5">
                <Link href={"/log-in"} className="p-3 px-4 bg-[#4F46E5] rounded-2xl cursor-pointer shadow-[0_0_100px_rgba(95,109,252,0.56)]
                transition-all duration-300 ease-out hover:bg-[#605bb8]">
                    {dictionary[language].hero.ctaPrimary}
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 text-start max-w-[85%] col-span-full"> 
                {dictionary[language].features.map((feature, index) => {
                    const isThirdCol = index === 2
                    return (
                        <div className={`flex flex-col p-5 py-10 gap-y-2 bg-[rgba(0,0,0,0.1)] border border-[#1E293B] 
                        rounded-3xl shadow-[0_0_100px_rgba(95,109,252,0.1)] ${isThirdCol? "md:max-[1024px]:col-span-2 lg:col-span1": ""} cursor-pointer
                        transition-all duration-300 ease-out hover:-translate-y-2
                        hover:bg-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/5 group
                        `} 
                        title="feature" key={feature.title}>
                            <div className="" title="feature-icon">
                                {feature.icon}
                            </div>
                            <div className="text-2xl font-bold" title="feature-title">
                                {feature.title}
                            </div>
                            <div className="text-[#adadad]" title="feature-description">
                                {feature.description}
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </main>
    </>
}