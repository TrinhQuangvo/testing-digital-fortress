"use client"
import { DarkModeProvider } from '@/context/darkmode-context'
import React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeProvider>{children}</DarkModeProvider>
    )
}
