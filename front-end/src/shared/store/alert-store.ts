import {create} from "zustand"

interface AlertState {
    alert: {
        id: string,
        message: string,
        isError: boolean
    } | null
    addAlert: (message: string, isError?: boolean) => void
    clearAlert: () => void
}

export const useAlertStore = create<AlertState>((set) => ({
    alert: null,
    addAlert: (message: string, isError: boolean = false) => set({
        alert: {
            id: Math.random().toString(36).substring(2, 9),
            message,
            isError
        }
    }),
    clearAlert: () => set({alert: null})
}))