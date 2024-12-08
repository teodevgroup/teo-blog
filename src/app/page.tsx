import { NextPage } from "next"
import { serialize } from 'next-mdx-remote/serialize'
import { styled } from "@linaria/react"
import { User, Calendar } from "react-feather"
import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'

import { flexColumn, dark, flexRow, light, lightBackground, darkBackground, spacing, panelBoxShadow, desktopHD, phone, exceptPhone, desktop, tablet, phoneLandscape, phonePortrait, exceptPhonePortrait, darkHeadingBackgroundColor } from "@/shared/styles/theme"
import Image from "next/image"

type BlogPageArticle = {
  slug: string
  title: string
  author: string
  createdAt: string
}

const HomeArticleCardContents = styled.div`
  padding: 8px;
  width: 100%;
  transition: background-color 0.25s ease-in-out 0s;
`

const HomeArticleCard = styled.a`
  display: block;
  margin-bottom: 20px;
  ${phonePortrait} {
    width: 100%;
  }
  ${phoneLandscape} {
    width: calc((100% - 20px) / 2);
    &:not(:nth-child(2n)) {
      margin-right: 20px;
    }
  }
  ${tablet} {
    width: calc((100% - 20px) / 2);
    &:not(:nth-child(2n)) {
      margin-right: 20px;
    }
  }
  ${desktop} {
    width: calc((100% - 40px) / 3);
    &:not(:nth-child(3n)) {
      margin-right: 20px;
    }
  }
  ${desktopHD} {
    width: calc((100% - 60px) / 4);
    &:not(:nth-child(4n)) {
      margin-right: 20px;
    }
  }
  border-radius: ${spacing}px;
  ${flexColumn('flex-start')}
  overflow: hidden;
  box-shadow: ${panelBoxShadow};
  transition: transform 0.25s ease-in-out 0s;
  ${HomeArticleCardContents} {
    ${light} {
      background-color: ${lightBackground};
    }
    ${dark} {
      background-color: ${darkHeadingBackgroundColor};
    }
  }  
  &:hover {
    ${exceptPhonePortrait} {
      transform: translateY(-8px);
    }
    ${HomeArticleCardContents} {
      ${light} {
        background-color: #F6F6F8;
      }
      ${dark} {
        background-color: #2E2E31;
      }
    }
  }
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
  ${phone} {
    ${flexRow("flex-start")}
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  ${exceptPhone} {
    ${flexRow("flex-start")}
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`

const HomeArticleCoverImageContainer = styled.div`
  width: 100%;
  ${desktopHD} {
    height: 180px;
  }
  ${desktop} {
    height: 220px;
  }
  ${tablet} {
    height: 260px;
  }
  ${phoneLandscape} {
    height: 240px;
  }
  ${phonePortrait} {
    height: 220px;
  }
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

const HomeArticleCoverImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
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
  }))).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)

  return (
    <HomeArticles>
      {articles.map((article) => {
        return <HomeArticleCard key={article.slug} href={`/articles/${article.slug}`}>
          <HomeArticleCoverImageContainer>
            <HomeArticleCoverImage alt="Cover Image" src='/images/defaultart.png' />
          </HomeArticleCoverImageContainer>
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