'use client'

import React, { ReactElement, ReactNode, useState } from 'react'
import Link from 'next/link'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { dark, darkHeadingBackgroundColor, blogFontFamily, blogTagBackgroundColor, blogTagBackgroundColorDark, blogTagColor, blogTagColorDark, blogTextColor, blogTextColorDark, blogTextSelectedColor, blogTextUnselectedColor, exceptPhone, flexColumn, flexRow, light, margin, phone, spacing, tintColor } from '../styles/theme'
import { SearchInput, SearchIcon, SearchIconContainer } from './Search'
import { TocItem } from '../lib/fetchToc'
import { BookIcon } from './Icons'

export const BlogSidebarContainer = styled.div`
  ${exceptPhone} {
    display: flex !important;
    max-height: 100vh;
    overflow: scroll;
    margin-left: -20px;
    padding-left: 20px;
  }
  ${flexColumn('flex-start')};
  width: 252px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  ${phone} {
    z-index: 3000;
    position: fixed;
    left: -1em;
    top: 0;
    padding-top: 96px;
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
`

const BlogSidebarTitle = styled.div`
  font-family: ${blogFontFamily};
  ${light} {
    color: ${blogTextColor};
  }
  ${dark} {
    color: ${blogTextColorDark};
  }
  font-size: 18px;
  font-weight: 600;
  margin: ${spacing * 3}px 0 ${spacing * 1.5}px 0;
`

const BlogSidebarSectionTitle = styled.div`
  font-size: 12px;
  ${light} {
    color: ${blogTextColor};
  }
  ${dark} {
    color: ${blogTextColorDark};
  }
  text-transform: uppercase;
  margin-top: ${spacing}px;
  margin-bottom: ${spacing}px;
  font-weight: 600;
`

const BlogSidebarItemTitleContainer = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${blogTextUnselectedColor};
  ${flexColumn('flex-start')}
  justify-content: space-between;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: ${spacing}px;
  }
`

const blogSidebarItemTitleLinkClassName = css`
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
`

const BlogSidebarItemTitleLine = styled.div`
  position: relative;
  width: 100%;
  ${flexRow('center')}
  justify-content: space-between;
  cursor: pointer;
`

const BlogSidebarItemTitleTime = styled.div`
  ${light} {
    color: ${blogTagColor};
    background-color: ${blogTagBackgroundColor};
  }
  ${dark} {
    color: ${blogTagColorDark};
    background-color: ${blogTagBackgroundColorDark};
  }
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 5px;
  border-radius: 5px;
`

const BlogSidebarItemInner = styled.div`
  padding-left: ${spacing * 2.85}px;
  margin-left: -${spacing * 1.5}px;
  ${light} {
    border-left: 2px solid rgb(226, 232, 240);
  }
  ${dark} {
    border-left: 2px solid rgb(52, 54, 57);
  }
  margin-bottom: ${spacing * 1.5}px;
`

const BlogSidebarItemIndicatorButton = styled.button`
  background: transparent;
  position: absolute;
  left: -15px;
  top: 4px;
  padding: 0px;
  border: 0px;
`

type BlogSidebarItemIndicatorProps = {
  open: boolean
}

const BlogSidebarItemIndicator: (props: BlogSidebarItemIndicatorProps) => ReactElement = ({ open }) => {
  return <BlogSidebarItemIndicatorButton>
    {!open ? <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.724246C0 0.111374 0.681914 -0.223425 1.13107 0.168926L4.66916 3.25957C5.11028 3.6449 5.11028 4.3551 4.66916 4.74043L1.13107 7.83107C0.681913 8.22342 0 7.88863 0 7.27575V0.724246Z" fill="#A0AEC0"></path></svg> : <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="down open"><path d="M7.27575 0.5C7.88863 0.5 8.22342 1.18191 7.83107 1.63107L4.74043 5.16916C4.3551 5.61028 3.6449 5.61028 3.25957 5.16916L0.168926 1.63107C-0.223425 1.18191 0.111375 0.5 0.724247 0.5L7.27575 0.5Z" fill="#A0AEC0"></path></svg>}
  </BlogSidebarItemIndicatorButton>
}

type BlogSidebarItemProps = {
  children?: ReactNode,
  time?: string,
  link: string,
  title: string,
  path?: string,
  setSidebarVisible: (v: boolean) => void,
}

const BlogSidebarItem: (props: BlogSidebarItemProps) => ReactElement = ({ link, children, time, title, path, setSidebarVisible }) => {
  let open: boolean;
  if (children && path) {
    open = path.startsWith(link)
  } else {
    open = false
  }
  let selected: boolean;
  if (path) {
    selected = path === link
  } else {
    selected = false
  }
  return <>
    <BlogSidebarItemTitleContainer>
      <a href={link} className={blogSidebarItemTitleLinkClassName} onClick={(e) => {
        e.stopPropagation()
        setSidebarVisible(false)
      }}>
        <BlogSidebarItemTitleLine className={selected ? css`
          color: ${blogTextSelectedColor};
          font-weight: 600;
        ` : css`
          font-weight: 300;
        `}>
          {children ? <BlogSidebarItemIndicator open={open} /> : null}
          <div>{title}</div>
          {time ? <BlogSidebarItemTitleTime>{time}</BlogSidebarItemTitleTime> : null}
        </BlogSidebarItemTitleLine>
      </a>
    </BlogSidebarItemTitleContainer>
    {open ?
      <BlogSidebarItemInner>
        {children}
      </BlogSidebarItemInner>
      : null}
  </>
}

type BlogSidebarProps = {
  path: string
}

const renderChildren = (children: TocItem[], path: string, setSidebarVisible: (v: boolean) => void) => {
  return children.map((child) => child.children.length ? <BlogSidebarItem key={child.urlPath} path={path} link={child.urlPath} title={child.title} time={child.time} setSidebarVisible={setSidebarVisible}>
    {renderChildren(child.children, path, setSidebarVisible)}
  </BlogSidebarItem> : <BlogSidebarItem key={child.urlPath} path={path} link={child.urlPath} title={child.title} time={child.time} setSidebarVisible={setSidebarVisible} />)
}

const SidebarWithToc: (props: { item: TocItem, path: string, phoneOpen?: boolean, setSidebarVisible: (v: boolean) => void }) => ReactElement = (props) => {
  console.log(props.item.children)
  return <BlogSidebarContainer style={{ 'display': props.phoneOpen ? "block" : "none" }}>
    <BlogSideBarSearchInput />
    <BlogSidebarTitle>{props.item.title}</BlogSidebarTitle>
    {props.item.children
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((child) => {
        if (child.children.length) {
          return [
            <BlogSidebarSectionTitle key="__sidebar__title">{child.title}</BlogSidebarSectionTitle>,
            ...renderChildren(child.children, props.path, props.setSidebarVisible)
          ]
        } else {
          return <BlogSidebarItem key={child.urlPath} path={props.path} link={child.urlPath} title={child.title} time={child.time} setSidebarVisible={props.setSidebarVisible} />
        }
      })}
  </BlogSidebarContainer>
}

interface SidebarToggleButtonProps {
  sidebarVisible: boolean;
}

const SidebarToggleButton = styled.div<SidebarToggleButtonProps>`
  ${exceptPhone} {
    display: none;
  }
  ${phone} {
    display: flex;
    position: fixed;
    top: 29px;
    right: calc(1em + 40px + 8px + 40px + 8px);
    z-index: ${props => (props.sidebarVisible ? '4000' : '2000')};
    align-items: center;
    justify-content: center;
  }
  cursor: pointer;
  ${light} {
    background-color: #f8f8fa;
  }
  ${dark} {
    background-color: ${darkHeadingBackgroundColor};
  }
  color: ${tintColor};
  width: 40px;
  height: 40px;
  border-radius: 20px;
`

export const BlogSidebarClient = ({ path, sidebarToc }: { path: string, sidebarToc: TocItem }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  return [
    <SidebarToggleButton onClick={() => setSidebarVisible(!sidebarVisible)} key="sidebar-toggle-button" sidebarVisible={sidebarVisible}>
      <BookIcon />
    </SidebarToggleButton>,
    <SidebarWithToc item={sidebarToc} path={path} key="sidebar" phoneOpen={sidebarVisible} setSidebarVisible={setSidebarVisible} />
  ]
}

const BlogSideBarInputContainer = styled.div`
  position: relative;
  margin-top: 44px;
  width: 100%;
`

const BlogSideBarSearchInput = () => {
  return <BlogSideBarInputContainer>
    <SearchInput placeholder='Search Blog...' onKeyUp={(e: any) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        location.href = `/search?q=${encodeURIComponent(e.currentTarget.value)}`
      }
    }} />
    <SearchIconContainer>
      <SearchIcon />
    </SearchIconContainer>
  </BlogSideBarInputContainer>
}
