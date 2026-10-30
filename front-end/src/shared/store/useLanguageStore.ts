import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface LanguageState {
    language: string,
    t: Record<string, unknown>,
    _hasHydrated: boolean,
    setLanguage: (language: string) => void,
    setHasHydrated: (state: boolean) => void,
    loadDictionary: (language: string) => Promise<void>,
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            t: {},
            language: "en",
            _hasHydrated: false,
            setLanguage: async (language: string) => {
                if (get().language === language)
                    return
                await get().loadDictionary(language)
            },
            setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
            loadDictionary: async (language: string) => {
                try {
                    const dictionary = await import(`@/shared/dictionaries/${language}.ts`)
                    set({ t: dictionary.default || dictionary, language: language })
                } catch (error) {
                    console.log(`Failed to download dictionary for language ${language} \n`, error)
                }
            }
        }),
        {
            name: "tensor_language",
            storage: createJSONStorage(() => localStorage),
            
            onRehydrateStorage: (state) => {
                return async (hydratedState, error) => {
                    if (error) {
                        console.log("Hydration error:", error)
                        return
                    }
                    
                    const activeLang = hydratedState?.language || 'en'
                    
                    if (hydratedState) {
                        await hydratedState.loadDictionary(activeLang)
                        hydratedState.setHasHydrated(true)
                    }
                }
            }
        }
    )
)
