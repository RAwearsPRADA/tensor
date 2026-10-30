"use client"

import { ErrorIcon } from "./ErrorIcon"
import { SuccessIcon } from "./SuccessIcon"
import { AlertPortal } from "./AlertPortal"
import { useAlertStore } from "../store/alert-store"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"


export function Alert() {
    const alert = useAlertStore(s => s.alert)
    const {pathname} = useLocation()
    const clearAlert = useAlertStore(s => s.clearAlert)

    useEffect(() => {
        clearAlert()
    }, [pathname, clearAlert])
    if (!alert)
        return null

    return (
        <>
            <AlertPortal>
                    <div key={alert.id} className={`alert left-1/2 -translate-x-1/2 ${alert.isError? "error": "info"}`} onClick={clearAlert}>
                        {alert.isError? <ErrorIcon/>: <SuccessIcon/>}
                        <span className="truncate">{alert.message}</span>
                    </div>
            </AlertPortal>
        </>
    )
}