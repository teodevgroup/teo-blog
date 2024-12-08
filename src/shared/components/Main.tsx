'use server'

import React from "react"
import { css } from '@linaria/core'
import { contentFontStack, dark, darkBackground, darkContent, light, lightBackground, lightContent } from "../styles/theme"
import { BlogLayout } from "./Blog"
import { BlogSidebar } from "./BlogSidebar"


export default async function Main({
    children
}: {
    children: React.ReactNode
}) {
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
            <BlogLayout>
                <BlogSidebar />
                {children}
            </BlogLayout>
        </body>
    )
}