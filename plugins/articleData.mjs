import extractFrontmatter from '../scripts/extractFrontmatter.mjs'
import fixWindowsPath from '../scripts/fixWindowsPath.mjs'
import { fromHtml } from 'hast-util-from-html'

/** @type {import('unified').Plugin<[], import('hast').Root>} */
const articleData = () => {
    return async (tree, vfile) => {
        let index = tree.children.findIndex((child) => child.type !== 'mdxjsEsm')
        if (index != undefined) {
            let fileLocation = fixWindowsPath(vfile.path.replace(vfile.cwd, ''))
            const urlPath = fileLocation.replace(/^\/src\/app/, '').replace(/\/page.mdx$/, '')
            // fix absolute path to relative path for extractFrontmatter() to read
            fileLocation = fileLocation.slice(1)
            const frontmatterData = extractFrontmatter(fileLocation, urlPath)
            if (frontmatterData) {
                const htmlString = `<div id="metadata"><h1>${frontmatterData.title}</h1><div><div id="author"><svg xmlns="http://www.w3.org/2000/svg"width="16"height="16"viewbox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12"cy="7"r="4"></circle></svg><div>${frontmatterData.author}</div></div><div id="date"><svg xmlns="http://www.w3.org/2000/svg"width="16"height="16"viewbox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"><rect x="3"y="4"width="18"height="18"rx="2"ry="2"></rect><line x1="16"y1="2"x2="16"y2="6"></line><line x1="8"y1="2"x2="8"y2="6"></line><line x1="3"y1="10"x2="21"y2="10"></line></svg><div>${(new Date(frontmatterData.date)).toDateString()}</div></div></div></div>`
                let nodeToInsert = fromHtml(htmlString, { fragment: true })
                tree.children.map((node) => {
                    node.tagName === 'article' ? node.children.splice(0, 0, nodeToInsert) : node
                })
            }
        }
    }
}

export default articleData