'use server'

export interface SearchRecord {
    title: string
    urlPath: string
    // breadcrumb: any
}

export default async function fetchSearchResult(query: string): Promise<SearchRecord[]> {
    const items = global.blogSearch(`"${query}"`)
    const result = items.map((item: any) => {
        const tocItem = global.blogFetchToc(item.urlPath)
        if (!tocItem) {
            return undefined
        }
        // const breadcrumb = global.blogFetchBreadcrumb(item.urlPath)
        // if (!breadcrumb || breadcrumb.length === 0) {
        //     return undefined
        // }
        return {
            title: tocItem.title,
            urlPath: item.urlPath,
            // breadcrumb,
        }
    })
    return result.filter((r) => r !== undefined)
}