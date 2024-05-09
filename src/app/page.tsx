import { NextPage } from "next";
import { serialize } from 'next-mdx-remote/serialize';
import { styled } from "@linaria/react";
import { User, Calendar } from "react-feather";
import fs from 'fs';
import path from 'path';

import { flexColumn, dark, flexRow, light, borderColorLight, borderColorDark } from "@/shared/styles/theme";

type BlogPageArticle = {
  slug: string
  title: string
  author: string
  createdAt: string
}

const ArticleItem = styled.div`
  width: 100%;
  padding: 8px 0;
  :not(:last-child) {
    ${light} {
      border-bottom: 1px solid ${borderColorLight};
    }
    ${dark} {
      border-bottom: 1px solid ${borderColorDark};
    }
  }
  ${flexColumn('flex-start')}
`

const ArticleTitle = styled.a`
  font-size: 32px;
  font-weight: 600;
  text-decoration: none;
`

const ArticleData = styled.div`
  ${flexRow('center')}
  color: #a9a9aa;
  font-weight: 300;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 8px;
`

const ArticleDataItem = styled.div`
  ${flexRow('center')}
  width: 140px;
`

const ArticleDataItem2 = styled.div`
  ${flexRow('center')}
  width: 300px;
`

const ArticleDataText = styled.div`
  margin-left: 8px;
`

const BlogHomeConstraint = styled.div`
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
    }
  }))).sort((a, b) => {
    return a.createdAt < b.createdAt ? 1 : -1
  }).map((a) => {
    a.createdAt = (a.createdAt as Date).toJSON()
    return a
  })

  return (
    <BlogHomeConstraint>
      {articles.map((article) => {
        return <ArticleItem key={article.slug}>
          <ArticleTitle href={`/articles/${article.slug}`}>{article.title}</ArticleTitle>
          <ArticleData>
            <ArticleDataItem>
              <User size={16} />
              <ArticleDataText>{article.author}</ArticleDataText>
            </ArticleDataItem>
            <ArticleDataItem2>
              <Calendar size={16} />
              <ArticleDataText>
                {(new Date(article.createdAt)).toDateString()}
              </ArticleDataText>
            </ArticleDataItem2>
          </ArticleData>
        </ArticleItem>
      })}
    </BlogHomeConstraint>
  )
}

export default BlogHome