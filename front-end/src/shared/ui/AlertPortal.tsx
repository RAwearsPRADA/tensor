"use client"

import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

interface AlertPortalProps {
    children: ReactNode,
}

export function AlertPortal({children}: AlertPortalProps) {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])

    if (!isMounted)
        return null

    return createPortal(children, document.body)
}