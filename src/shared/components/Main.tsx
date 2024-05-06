'use client'

import { usePathname } from "next/navigation"
import React from "react"
import { css } from '@linaria/core'
import { contentFontStack, dark, darkBackground, darkContent, light, lightBackground, lightContent } from "../styles/theme"
import { BlogContent, BlogLayout } from "./Blog"
import { BlogSidebar } from "./BlogSidebar"


export default function Main({
    children
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <body className={css`
            margin: 0;
            scroll-behavior: smooth;
                ${light} {
                    background-color: ${lightBackground};
                    color: ${lightContent};
                }
                ${dark} {
                    background-color: ${darkBackground};
                    color: ${darkContent};
                }
                font-family: ${contentFontStack};
        `}>
            <BlogLayout path={pathname}>
                <BlogSidebar path={pathname} />
                {children}
            </BlogLayout>
        </body>
    )
}