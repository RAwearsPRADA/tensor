import type {ROLE} from "@/entities/user/types"
import {create} from "zustand"

interface UserState {
    role: ROLE,
    setRole: (role: ROLE) => void
}

export const useAlertStore = create<UserState>((set) => ({
    role: null,
    setRole: (role) => set({
        role: role
    }),
}))