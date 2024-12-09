import { ReactNode } from "react"
import Footer from "./Footer"
import Heading from "./Heading"
import Layout from "./Layout"
import { styled } from "@linaria/react"
import { Calendar, User } from "react-feather"
import { margin, anyDesktop, blogFontFamily, blogTitleFontFamily, codeFontStack, contentFontStack, dark, darkHeadingBackgroundColor, exceptPhone, flexColumn, flexRow, light, phone, tablet, tabletAndDesktop, tintColor, tintFontStack } from '../styles/theme'
import Constraint from "./Constraint"

type BlogLayoutProps = {
    children: ReactNode
  }

  export const BlogContainer = styled.div`
  ${light} {
    color: #40404c;
  }
  ${dark} {
    color: white;
  }
  ${flexColumn('center')}
  font-family: ${tintFontStack};
  justify-content: space-between;
`

export const BlogConstraint = styled(Constraint)`
`

  export const BlogLayout = (props: BlogLayoutProps) => {
    return <Layout>
      <Heading />
      <BlogContainer>
        <BlogConstraint>
          <BlogContent>
            {props.children}
          </BlogContent>
        </BlogConstraint>
      </BlogContainer>
      <Footer />
    </Layout>
  }

  export const BlogTitle = styled.h1`
  margin-top: ${margin * 4}px;
  text-align: center;
  width: 100%;
`



export const BlogContent = styled.div`
  ${flexRow()}
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  font-family: ${tintFontStack};
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  flex-grow: 0;
  flex-shrink: 4;
  justify-content: stretch;
  flex-grow: 1;
  padding-top: 28px;
  padding-bottom: 48px;
  aside {
    ${exceptPhone} {
      display: block !important;
    }
    ${phone} {
      z-index: 3000;
      position: fixed;
      left: -1em;
      top: 0;
      padding-top: 96px !important;
      width: calc(100% + 2em);
      padding: 2em;
      height: 100vh;
      overflow-y: scroll;
      overflow-x: hidden;
      ${light} {
        background-color: #f8f8fa;
      }
      ${dark} {
        background-color: ${darkHeadingBackgroundColor};
      }
    }
    .title {
      margin-top: 20px;
      font-size: 0.875rem;
      text-transform: uppercase;
      font-weight: 600;
    }
    ul {
      list-style: none;
      padding: 0;
      text-decoration: none;
      color: rgb(113, 128, 150);
      font-size: 14px;
      font-weight: 300;
      li {
        padding: 0;
        margin-top: 4px;
        &.h3 {
          margin-left: 20px;
        }
        a {
          transition: background-size 0.7s ease 0s;
          background-size: 0% 2px;
          code {
            transition: background-color 0.7s ease 0s;
          }
        }
        &.selected {
          a {
            ${light} {
              background-image: linear-gradient(#0c344b,#0c344b);
            }
            ${dark} {
              background-image: linear-gradient(#4e6e82,#4e6e82);
            }
            background-position: 0% 100%;
            background-repeat: no-repeat;
            background-size: 100% 2px;
            code {
              ${light} {
                background-color: #0c344b;
                color: #f7fafc;
              }
              ${dark} {
                background-color: #4e6e82;
                color: #242424;
              }
              text-decoration: none;
            }
          }
        }
        code {
          font-feature-settings: "clig" 0,"calt" 0;
          display: inline;
          vertical-align: baseline;
          padding: 0.05em 0.3em 0.2em;
          ${light} {
            background: rgb(237, 242, 247);
          }
          ${dark} {
            background: rgb(62, 64, 66);
          }
          font-size: 14px;
          border-radius: 5px;
          font-family: ${codeFontStack};
        }
      }
    }
  }

  article {
    overflow-x: hidden;
    position: relative;
    ${dark} {
      --shiki-color-text: #f6f8fa;
      --shiki-color-background: #292929; 
      --shiki-token-constant: #dd6b21;
      --shiki-token-string: #690;
      --shiki-token-comment: #718096;
      --shiki-token-keyword: #d5408c;
      --shiki-token-parameter: #9a6e3a;
      --shiki-token-function: #805ad5;
      --shiki-token-string-expression: #690;
      --shiki-token-punctuation: #319795;
      --shiki-token-link: #EE0000;       
    }
    ${light} {
      --shiki-color-text: #1a202c;
      --shiki-color-background: #f6f8fa;    
      --shiki-token-constant: #dd6b21;
      --shiki-token-string: #690;
      --shiki-token-comment: #718096;
      --shiki-token-keyword: #d5408c;
      --shiki-token-parameter: #9a6e3a;
      --shiki-token-function: #805ad5;
      --shiki-token-string-expression: #690;
      --shiki-token-punctuation: #319795;
      --shiki-token-link: #EE0000;        
    }

    overflow-x: hidden;
    overflow-y: auto;
    flex: 100 100 600px;
    ${exceptPhone} {
      padding: 0 40px;
    }
    ${anyDesktop} {
      padding: 0 40px;
    }
    ${phone} {
      padding: 0;
      max-width: calc(100vw - 2em);
    }
    ${tablet} {
      max-width: calc(100vw - 440px);
    }
    ${anyDesktop} {
      max-width: calc(100vw - 440px);
    }
    table {
      overflow-x: scroll;
      max-width: 100%;
      ${tabletAndDesktop} {
        width: 100%;
        max-width: 580px;
      }
      ${anyDesktop} {
        width: 100%;
        max-width: 580px;
      }
      ${phone} {
        display: block;
        width: 100%;
      }
      ${light} {
        border: 1px solid #e2e8f0;
      }
      ${dark} {
        border: 1px solid #3e464f;
      }
      border-radius: 8px;
      border-spacing: 0;
      margin: 0 0 20px;
      white-space: inherit;
      word-break: normal;
      line-height: 1.2;
      font-weight: 400;
      * {
        font-size: 13px;
      }
      tr {
        th {
          font-size: 14px;
          font-weight: 600;
          padding: 12px;
          text-align: left;
        }
        td {
          ${light} {
            border-top: 1px solid #e2e8f0;
          }
          ${dark} {
            border-top: 1px solid #3e464f;
          }
          ${phone} {
            width: 100vw; // fix table cell width for phone
          }
          padding: 12px;
          vertical-align: top;
        }
      }
    }
    span.concept {
      display: inline-block;
      ${light} {
        color: #3182ce;
        background-color: #bee3f8;
      }
      ${dark} {
        color: #1983e6;
        background-color: #2a2d2e;
      }
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      padding: 0 4px;
    }
    .breadcrumbs {
      display: block;
      color: rgb(113, 128, 150) !important;
      font-size: 16px;
      font-weight: 300;
      font-family: ${blogFontFamily};
      .breadcrumb {
        display: inline;
        a {
          color: rgb(113, 128, 150);
          text-decoration: none;
          &:hover {
            ${light} {
              color: #4A5568;
            }
            ${dark} {
              color: rgb(154, 177, 211);
            }
            text-decoration: underline;
          }
        }
      }
    }
    blockquote {
      margin: 0;
      padding-left: 20px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 100%;
        left: 0px;
        top: 0;
        border-radius: 5px;
        background: rgb(251, 211, 141) !important;
      }
      ${light} {
        color: rgb(113, 128, 150);
      }
      ${dark} {
        color: rgb(154, 177, 211);
      }
      font-weight: 400;
    }
    h1 {
      font-size: 40px;
      margin: 0 0 8px 0;
      display: block;
      font-weight: bold;
      font-family: ${blogTitleFontFamily};
      line-height: 1.2;
      &:first-child {
        margin-top: 8px;
      }
    }
    h2 {
      display: block;
      overflow: visible;
      position: relative;
      font-size: 24px;
      margin-top: 24px;
      font-weight: 600;
      font-family: ${blogTitleFontFamily};
      &:hover {
        button {
          display: flex;
        }
      }
    }
    h3 {
      display: block;
      overflow: visible;
      position: relative;
      font-size: 18px;
      font-weight: 600;
      font-family: ${blogTitleFontFamily};
      &:hover {
        button {
          display: flex;
        }
      }
    }
    h4 {
      display: block;
      overflow: visible;
      position: relative;
      font-family: ${blogTitleFontFamily};
      font-weight: 600;
      &:hover {
        button {
          display: flex;
        }
      }
    }
    h5 {
      display: block;
      overflow: visible;
      position: relative;
      font-family: ${blogTitleFontFamily};
      font-weight: 600;
      &:hover {
        button {
          display: flex;
        }
      }
    }
    h6 {
      display: block;
      overflow: visible;
      position: relative;
      &:hover {
        button {
          display: flex;
        }
      }
    }
    p {
      font-weight: 400;
      code {
        font-size: 14px;
      }
    }
    ul {
      list-style: none;
      padding: 0;
      margin-left: 24px;
      font-weight: 400;
      > li::before {
        content: " ";
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: rgb(160,174,192);
        position: absolute;
        left: -6px;
        top: 9px;
      }
    }
    li {
      margin-top: 10px;
      padding-left: 8px;
      position: relative;
      line-height: 1.5;
      code {
        font-size: 14px;
      }
    }
    a {
      ${light} {
        color: #3182ce;
      }
      ${dark} {
        color: #1983e6;
      }
      text-decoration: underline;
    }
    code {
      display: inline;
      vertical-align: baseline;
      padding: 0.05em 0.3em 0.2em;
      ${light} {
        background: rgb(237, 242, 247);
      }
      ${dark} {
        background: rgb(62, 64, 66);
      }
      border-radius: 5px;
    }
    [data-rehype-pretty-code-figure] {
      margin: 16px 0;
    }
    [data-rehype-pretty-code-title] {
      font-size: 0.875rem;
      color: rgb(113, 128, 150);
      font-family: ${contentFontStack};
      font-weight: 600;
      margin-bottom: 4px;
    }
    [data-use-dark] {
      pre {
        background-color: rgb(26, 32, 44) !important;
        --shiki-color-text: #edf2f7;
        button {
          background-color: #2d3748;
        }
        code {
          --shiki-color-text: #edf2f7;
          [data-line]::before {
            color: #4a5568 !important;
          }
        }
      }
    }
    pre {
      margin: 0;
      font-family: ${codeFontStack};
      font-weight: 300;
      font-variant-ligatures: none;
      position: relative;
      background-color: #f6f8fa;
      border-radius: 8px;
      max-width: 580px;
      overflow: hidden;
      button {
        ${light} {
          background-color: rgb(237, 242, 247);
        }
        ${dark} {
          background: rgb(62, 64, 66);
        }
      }
      &[data-language="sh"] {
        background-color: rgb(26, 32, 44) !important;
        --shiki-color-text: #edf2f7;
        button {
          background-color: #2d3748;
        }
      }
      code {
        font-size: 14px;
        font-family: ${codeFontStack};
        font-variant-ligatures: none;
        display: grid;
        background-color: transparent;
        border-radius: 0;
        color: rgb(237, 242, 247);
        padding: 16px 0;
        overflow-x: scroll;
        overflow-y: hidden;
        [data-language="sh"] {
          --shiki-color-text: #edf2f7;
        }
        [data-line] {
          padding: 0 48px 0 16px;
        }
        .highlighted {
          background: rgba(200,200,255,.1);
          border-left: 2px solid #60a5fa;
          padding-left: 14px;
        }
        .word, [data-highlighted-chars] {
          ${light} {
            background: rgba(200,200,255,.15);
          }
          ${dark} {
            background: rgba(114, 114, 155, 0.15);
          }
          padding: 0.16rem 0.2rem;
          border-radius: 0.25rem;
        }
      }
    }
    strong {
      font-weight: 600;
    }

    em {
      font-style: italic;
    }

    code {
      counter-reset: line;
      font-family: ${codeFontStack};
      font-variant-ligatures: none;
    }

    code[data-line-numbers] > [data-line]::before {
      counter-increment: line;
      content: counter(line);

      /* Other styling */
      display: inline-block;
      width: 1rem;
      margin-right: 1rem;
      text-align: right;
      ${light} {
        color: rgb(203, 213, 224);
      }
      ${dark} {
        color: rgb(79, 83, 87);
      }
    }

    code[data-language="sh"] > [data-line]::before {
      content: "$ ";
      color: #4a5568;
    }

    div.prevNext {
      display: flex;
      align-items: stretch;
      flex-direction: row;
      margin-top: 64px;

      .label {
        margin: 0;
        font-size: 12px;
        font-weight: 600;
        ${light} {
          color: rgb(113,128,150) !important;
        }
        ${dark} {
          color: rgb(155, 170, 193) !important;
        }
        line-height: 1.4 !important;
      }
      .title {
        text-decoration: none;
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4 !important;
        text-decoration: none !important;
      }
      .flex-grow-extend {
        flex-grow: 1;
      }
    }
    a.prev {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      margin-right: 12px;
      max-width: calc(50% - 6px);
      ${light} {
        border: 1px solid #dadde1;
      }
      ${dark} {
        border: 1px solid rgb(63, 67, 74);
      }
      border-radius: 0.4em;
      transition: all 0.2s ease-in-out 0s;
      &:hover {
        border-color: ${tintColor};
      }
      .label::before {
        margin-right: 4px;
        display: inline-block;
        content: ' ';
        width: 0; 
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent; 
        ${light} {
          border-right: 6px solid #dadde1;
        }
        ${dark} {
          border-right: 6px solid rgb(63, 67, 74);
        }
      }
      padding: 16px;
      text-decoration: none !important;
    }
    a.next {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: flex-end;
      max-width: calc(50% - 6px);
      ${light} {
        border: 1px solid #dadde1;
      }
      ${dark} {
        border: 1px solid rgb(63, 67, 74);
      }
      border-radius: 0.4em;
      transition: all 0.2s ease-in-out 0s;
      .label::after {
        margin-left: 4px;
        display: inline-block;
        content: ' ';
        width: 0; 
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent; 
        border-left: 6px solid #dadde1;
        ${light} {
          border-left: 6px solid #dadde1;
        }
        ${dark} {
          border-left: 6px solid rgb(63, 67, 74);
        }
      }
      &:hover {
        border-color: ${tintColor};
      }
      padding: 16px;
      text-decoration: none !important;
      .title {
        text-align: right;
      }
    }
  }
`

const ArticleItem = styled.div`
  width: 100%;
  padding: 8px 0;
  ${flexColumn('flex-start')}
`

const ArticleTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-decoration: none;
`

const ArticleData = styled.div`
  ${flexRow('center')}
  color: #a9a9aa;
  font-weight: 400;
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

type ArticleMetadataProps = {
  title: string;
  author: string;
  date: string;
}

export const ArticleMetadata = (props: ArticleMetadataProps) => {
  return <ArticleItem>
    <ArticleTitle>{props.title}</ArticleTitle>
    <ArticleData>
      <ArticleDataItem>
        <User size={16} />
        <ArticleDataText>{props.author}</ArticleDataText>
      </ArticleDataItem>
      <ArticleDataItem2>
        <Calendar size={16} />
        <ArticleDataText>
          {(new Date(props.date)).toDateString()}
        </ArticleDataText>
      </ArticleDataItem2>
    </ArticleData>
  </ArticleItem>
}