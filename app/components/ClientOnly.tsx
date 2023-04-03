'use client'

import { useEffect, useState, FC, ReactNode } from 'react'
interface ClientOnlyProps {
    children?: ReactNode
}
const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, sethasMounted] = useState(false)
    useEffect(() => sethasMounted(true), [])
    if (!hasMounted) return null
    return <>{children}</>
}

export default ClientOnly
