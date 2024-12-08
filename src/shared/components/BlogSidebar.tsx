'use server'

import { headers } from "next/headers"
import fetchToc from "../lib/fetchToc"
import { BlogSidebarClient, BlogSidebarContainer } from "./BlogSidebarClient"

export const BlogSidebar = async () => {
  const headerList = await headers()
  const path = headerList.get('x-request-pathname') as string
  const sidebarToc = await fetchToc(firstPathComponent(path))
  if (sidebarToc) {
    return <BlogSidebarClient sidebarToc={sidebarToc} path={path} />
  } else {
    return requiresSidebar(path) ? <BlogSidebarContainer /> : <></>
  }
}

const requiresSidebar = (path: string) => {
  return !(path === "/")
}

const firstPathComponent = (path: string) => {
  const components = path.split('/')
  if (components.length > 1) {
    return '/' + components[1]
  } else {
    return ''
  }
}
