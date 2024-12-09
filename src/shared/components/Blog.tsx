'use client'

import { styled } from "@linaria/react"
import { Children, ReactNode, cloneElement, useEffect, useState } from "react"
import { Clipboard, Hash, File, Calendar, User } from "react-feather"
import { css } from "@linaria/core"

import { margin, anyDesktop, blogFontFamily, blogTitleFontFamily, codeFontStack, contentFontStack, dark, darkHeadingBackgroundColor, exceptPhone, flexColumn, flexRow, light, phone, tablet, tabletAndDesktop, tintColor, tintFontStack } from '../styles/theme'
import FileIcon from "./FileIcon"
import PreferencesDropDownSelector from "./Preference/PreferencesDropDownSelector"
import Preferences from "../lib/preferences/preferences"

const CodeTitleContainer = styled.div`
  ${flexRow('center')}

`
type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const CodeTitle = (props: DivProps) => {
  return <CodeTitleContainer {...props}>
    <File size={16} className={css`
      margin-right: 4px;
    `} />
    {props.children}
  </CodeTitleContainer>
}

type FigCaptionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const FigCaption = (props: FigCaptionProps) => {
  if ((props as any)['data-rehype-pretty-code-title'] === '') {
    return <CodeTitle {...props}>
      {props.children}
    </CodeTitle>
  } else {
    return <figcaption {...props}>
      {props.children}
    </figcaption>
  }
}

const HeadingButton = styled.button`
  background-color: transparent;
  font-size: unset;
  border: none;
  user-select: none;
  padding: none;
  color: rgb(203,213,224);
  cursor: pointer;
  position: absolute;
  transform: translateX(-1.5em);
  align-items: center;
  justify-content: center;
  display: none;
`

const AsideContentContainer = styled.div`
  ${phone} {
    position: absolute;
  }
  ${exceptPhone} {
    position: sticky;
    display: block !important;
    width: 180px;
    overflow-y: auto;
    max-height: 100vh;
  }
  
  
  right: 0;
  top: 0;
  flex-grow: 0;
  flex-shrink: 0;
  padding-top: 8px;
`

interface MobileAsideToggleButtonProps {
  phoneAsideVisible: boolean;
}

const MobileAsideToggleButton = styled.div<MobileAsideToggleButtonProps>`
  ${exceptPhone} {
    display: none;
  }
  ${phone} {
    display: flex;
    position: fixed;
    top: 29px;
    right: calc(1em + 40px + 8px - 1px);
    z-index: ${props => (props.phoneAsideVisible ? '4000' : '2000')};
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

type AsideProps = {
  preferences: Preferences
  children: ReactNode
}

export const Aside = (props: AsideProps) => {
  const [hash, setHash] = useState('')
  const [phoneAsideVisible, setPhoneAsideVisible] = useState(false)
  useEffect(() => {
    const listener = () => {
      setPhoneAsideVisible(false)
    }
    window.addEventListener('hashchange', listener)
    return () => {
      window.removeEventListener("hashchange", listener)
    }
  }, [])
  useEffect(() => {
    const headings = Array.prototype.slice.call(document.querySelectorAll('h2[id],h3[id]'))
    const handler = (e: Event) => {
      let cachedHash = ''
      for (let heading of headings) {
        const rect = heading.getBoundingClientRect()
        if (rect.top >= 1) {
          break
        } else {
          cachedHash = `#${heading.id}`
        }
      }
      setHash(cachedHash)
    }
    document.addEventListener('scroll', handler)
    return () => {
      document.removeEventListener('scroll', handler)
    }
  }, [])
  const children = Children.map(props.children, (c) => {
    if ((c as any).type && (c as any).type === 'ul') {
      return cloneElement(c as any, {
        children: Children.map((c as any).props.children, (c) => {
          if (c.props.children.props.href) {
            if (hash === c.props.children.props.href) {
              return cloneElement(c, { className: `${c.props.className} selected` })
            } else {
              return c
            }
          } else {
            return c
          }
        })
      })
    } else if ((c as any).type && (c as any).type === 'triple') {
      return <PreferencesDropDownSelector preferences={props.preferences} />
    } else {
      return c
    }
  })
  return <AsideContentContainer>
    <MobileAsideToggleButton onClick={() => setPhoneAsideVisible(!phoneAsideVisible)} phoneAsideVisible={phoneAsideVisible}>
      <FileIcon />
    </MobileAsideToggleButton>
    <aside style={{ display: phoneAsideVisible ? 'block' : 'none' }}>
      {children}
    </aside>
  </AsideContentContainer>
}

type CopyButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { 'data-copy': string }

const CopyButton = (props: CopyButtonProps) => {
  return <button {...props} className={css`
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    padding: 0;
    svg {
      width: 16px;
      height: 16px;
      ${light} {
        color: rgb(160, 174, 192);
      }
      ${dark} {
        color: rgb(142, 165, 195);
      }
    }
  `} onClick={() => {
      navigator.clipboard.writeText(props['data-copy'])
    }}>
    <Clipboard />
  </button>
}

type PreProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> & { 'data-copy': string }

export const Pre = (props: PreProps) => {
  return <pre {...props}>
    {props.children}
    <CopyButton data-copy={props['data-copy']} />
  </pre>
}

type HeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const H2 = (props: HeadingProps) => {
  return <h2 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={24} />
    </HeadingButton>
    {props.children}
  </h2>
}

export const H3 = (props: HeadingProps) => {
  return <h3 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={18} />
    </HeadingButton>
    {props.children}
  </h3>
}

export const H4 = (props: HeadingProps) => {
  return <h4 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={16} />
    </HeadingButton>
    {props.children}
  </h4>
}

export const H5 = (props: HeadingProps) => {
  return <h5 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={14} />
    </HeadingButton>
    {props.children}
  </h5>
}

export const H6 = (props: HeadingProps) => {
  return <h6 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={12} />
    </HeadingButton>
    {props.children}
  </h6>
}

