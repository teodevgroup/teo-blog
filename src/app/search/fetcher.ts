'use server'

export interface SearchRecord {
    title: string
    urlPath: string
}

export default async function fetchSearchResult(query: string): Promise<SearchRecord[]> {
    const items = (global as any).blogSearch(`"${query}"`)
    const result = items.map((item: any) => {
        const tocItem = (global as any).blogFetchToc(item.urlPath)
        if (!tocItem) {
            return undefined
        }
        return {
            title: tocItem.title,
            urlPath: item.urlPath,
        }
    })
    return result.filter((r: any) => r !== undefined)
}