'use client'

import { useLanguageStore } from "@/shared/store/useLanguageStore";
import { useBurgerButtonStore } from "@/shared/store/useBurgerButtonStore";
import { Footer } from "@/shared/ui/Footer";
import { Header } from "@/widgets/header/Header";
import { HeroSection } from "@/widgets/hero-section/ui/HeroSection";
import { BurgerMenu } from "@/widgets/burger-menu/BurgerMenu";

export default function Home() {
  const {_hasHydrated} = useLanguageStore()
  const isBurgerMenuOpen = useBurgerButtonStore(s => s.isOpen)
  if (!_hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A] text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    )
  }
  return (
    <>
    <Header/>
    <HeroSection/>
    <Footer/>
    {isBurgerMenuOpen && <BurgerMenu/>}
    </>
  );
}
