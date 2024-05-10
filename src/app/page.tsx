import { NextPage } from "next"
import { serialize } from 'next-mdx-remote/serialize'
import { styled } from "@linaria/react"
import { User, Calendar } from "react-feather"
import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'

import { flexColumn, dark, flexRow, light, lightBackground, darkBackground, spacing, panelBoxShadow } from "@/shared/styles/theme"
import Image from "next/image"

type BlogPageArticle = {
  slug: string
  title: string
  author: string
  createdAt: string
}

const HomeArticleCard = styled.a`
  display: block;
  margin-bottom: 20px;
  ${light} {
    background-color: ${lightBackground};
  }
  ${dark} {
    background-color: ${darkBackground};
  }
  width: calc((100% - 60px) / 4);
  &:not(:nth-child(4n)) {
    margin-right: 20px;
  }
  border-radius: ${spacing}px;
  ${flexColumn('flex-start')}
  overflow: hidden;
  box-shadow: ${panelBoxShadow};
  transition: transform 0.25s ease-in-out 0s;
  &:hover {
    transform: translateY(-8px);
  }
`

const HomeArticleCardContents = styled.div`
  padding: 8px;
  width: 100%;
`

const HomeArticleCardTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  height: 50px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const HomeArticleSubtitles = styled.div`
  ${flexRow('center')}
  color: #a9a9aa;
  font-weight: 300;
  font-size: 14px;
  width: 100%;
`

const HomeArticleSubtitle = styled.div`
  ${flexRow('center')}
  width: 50%;
`

const HomeArticleSubtitleText = styled.div`
  margin-left: 4px;
  white-space: nowrap;
`

const HomeArticles = styled.div`
  ${flexRow("flex-start")}
  justify-content: flex-start;
  flex-wrap: wrap;
`

const HomeArticleCoverImage = styled.div`
  width: 100%;
  height: 162px;
  position: relative;
  overflow: hidden;
  & > img {
    position: absolute;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;
  }
`

const BlogHome: NextPage = async () => {
  const dirname = './src/app/articles'
  const files = fs.readdirSync(dirname).filter((file) => !file.endsWith('.mdx'))
  const articles: BlogPageArticle[] = (await Promise.all(files.map(async (filename) => {
    const markdownContent = fs.readFileSync(path.join(dirname, filename, 'page.mdx'), 'utf-8')
    const mdxSource = await serialize(markdownContent, { parseFrontmatter: true })
    return {
      slug: filename.replace('.mdx', '') as string,
      title: mdxSource.frontmatter!['title'] as string,
      author: mdxSource.frontmatter!['author'] as string,
      createdAt: mdxSource.frontmatter!['date'] as any,
      artwork: undefined,
    }
  }))).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map((a) => {
    a.createdAt = (a.createdAt as Date).toJSON()
    return a
  })

  return (
    <HomeArticles>
      {articles.map((article) => {
        return <HomeArticleCard key={article.slug} href={`/articles/${article.slug}`}>
          <HomeArticleCoverImage>
            <Image alt="Cover Image" src='/images/defaultart.png' width={360} height={162} objectFit='contain' />
          </HomeArticleCoverImage>
          <HomeArticleCardContents>
            <HomeArticleCardTitle>{article.title}</HomeArticleCardTitle>
            <HomeArticleSubtitles>
              <HomeArticleSubtitle>
                <User size={16} />
                <HomeArticleSubtitleText>{article.author}</HomeArticleSubtitleText>
              </HomeArticleSubtitle>
              <HomeArticleSubtitle>
                <Calendar size={16} />
                <HomeArticleSubtitleText>
                  {format(new Date(article.createdAt), "yyyy-MM-dd")}
                </HomeArticleSubtitleText>
              </HomeArticleSubtitle>
            </HomeArticleSubtitles>
          </HomeArticleCardContents>
        </HomeArticleCard>
      })}
    </HomeArticles>
  )
}

export default BlogHome