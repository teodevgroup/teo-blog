'use server'

import { FullWidthSearchInput } from "../../shared/components/Search"
import fetchSearchResult from "./fetcher"
import { styled } from "@linaria/react"
import { blogTitleFontFamily } from "../../shared/styles/theme"

const SearchRecordTitle = styled.a`
    font-size: 26px;
    font-weight: bold;
    font-family: ${blogTitleFontFamily};
    line-height: 1.2;
    &:hover {
        text-decoration: underline;
    }
`

const SearchRecordView = styled.div`
    margin-top: 40px;
    display: block;
`

const SearchPage = async ({ searchParams: searchParamsPromise }: any) => {
    const searchParams = await searchParamsPromise
    const original = searchParams["q"] as string | undefined
    const items = await fetchSearchResult(original as any)
    return <div style={{ width: '100%' }}>
        <FullWidthSearchInput defaultValue={original as string | undefined} />
        {items.map((item) => <SearchRecordView key={item.urlPath}>
            <SearchRecordTitle href={item.urlPath} key={item.urlPath}>{item.title}</SearchRecordTitle>
        </SearchRecordView>)}
    </div>
}

export default SearchPage