import mdx from '@next/mdx'
import withLinaria from 'next-with-linaria'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import rehypeMdxTitle from 'rehype-mdx-title'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import { getHighlighter, BUNDLED_LANGUAGES } from 'shiki'
import { search } from '@teocloud/teo-docs-search-engine'

import dataCopy from './plugins/dataCopy.mjs'
import onThisPage from './plugins/onThisPage.mjs'
import prevNext from './plugins/prevNext.mjs'
import tableOfContents from './plugins/tableOfContents.mjs'
import articleData from './plugins/articleData.mjs'

import { fetchBreadcrumb } from './scripts/generateBreadcrumb.mjs'
import generateCaches from './scripts/generateCaches.mjs'
import { fetchPrevNext, fetchToc } from './scripts/generateToc.mjs'

generateCaches()

global.blogSearch = (text) => {
    return search(text)
}

global.blogFetchToc = (urlPath) => {
    return fetchToc(urlPath)
}

global.blogFetchBreadcrumb = (urlPath) => {
    return fetchBreadcrumb(urlPath)
}

global.blogFetchPrevNext = (urlPath) => {
    return fetchPrevNext(urlPath)
}

let withMDX = mdx({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [
            remarkToc, remarkGfm, remarkFrontmatter
        ],
        rehypePlugins: [
            rehypeMdxTitle,
            rehypeSlug,
            [rehypePrettyCode, {
                theme: 'css-variables',
                onVisitLine(node) {
                    // Prevent lines from collapsing in `display: grid` mode, and
                    // allow empty lines to be copy/pasted
                    if (node.children.length === 0) {
                        node.children = [{ type: 'text', value: ' ' }]
                    }
                },
                // Feel free to add classNames that suit your docs
                onVisitHighlightedLine(node) {
                    if (node.properties.className) {
                        node.properties.className.push('highlighted')
                    } else {
                        node.properties.className = ['highlighted']
                    }
                },
                onVisitHighlightedWord(node) {
                    node.properties.className = ['word']
                },
                getHighlighter: (options) => getHighlighter({
                    ...options,
                    langs: [
                        ...BUNDLED_LANGUAGES,
                        {
                            id: 'teo',
                            scopeName: 'source.teo',
                            path: process.cwd() + '/langs/teo.json',
                        },
                    ],
                }),
            }],
            dataCopy,
            tableOfContents,
            prevNext,
            onThisPage,
            articleData,
        ],
        recmaPlugins: [recmaNextjsStaticProps],
    },
})

/** @type {import('next-with-linaria').LinariaConfig} */
const config = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        serverActions: {
            allowedOrigins: ['blog.teocloud.io', 'docker-teo-blog']
        }
    }
}

export default withMDX(withLinaria(config))