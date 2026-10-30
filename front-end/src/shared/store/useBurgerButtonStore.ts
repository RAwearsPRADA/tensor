import { create } from "zustand"

interface BurgerButtonState {
    isOpen: boolean,
    toggleBurger: () => void,
    closeBurger: () => void
}

export const useBurgerButtonStore = create<BurgerButtonState>()(
        (set, get) => ({
            isOpen: false,
            toggleBurger() {
                set({isOpen: !get().isOpen})
            },
            closeBurger() {
                set({isOpen: false})
            },
        }),
)
