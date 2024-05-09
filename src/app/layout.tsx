import { Viewport } from "next"
import Main from "../shared/components/Main"
import { headers } from "next/headers"
import React from "react"

export async function generateViewport(): Promise<Viewport> {
    return {
        colorScheme: 'light dark'
    }
}

export async function generateMetata() {
    // const headersList = headers()
    // const pathName = headersList.get('x-request-pathname') as string
    return {
        title: 'TEO Blog',
        description: 'TEO Blog',
        icons: {
            icon: '/favicon.ico'
        }
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100,200,300,400,500,600,700,800,900&family=Barlow:ital,wght@0,100,200,300,400,500,600,700,800,900&family=Inter:wght@100,200,300,400,500,600,700,800,900&family=JetBrains+Mono:ital,wght@0,100,200,300,400,500,600,700,800&display=swap" /> */}
            </head>
            <Main>
                {children}
            </Main>
        </html>
    )
}
