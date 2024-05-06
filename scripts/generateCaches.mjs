import { buildCommit } from '@teocloud/teo-docs-search-engine'
import { globSync } from 'glob'
import fixWindowsPath from './fixWindowsPath.mjs'
import { generateBreadcrumb } from './generateBreadcrumb.mjs'
import generateFullTextIndex from './generateFullTextIndex.mjs'
import { generateToc } from './generateToc.mjs'

export default function generateCaches() {
    globSync("./src/app/**/*.mdx").forEach((fileLocation) => {
        fileLocation = fixWindowsPath(fileLocation)
        generateFullTextIndex(fileLocation)
        generateToc(fileLocation)
        // generateBreadcrumb(fileLocation)
    })
    buildCommit()
}