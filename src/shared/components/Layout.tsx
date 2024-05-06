'use client'

import { styled } from '@linaria/react'
import { ReactElement, ReactNode } from 'react'
import { globals } from '../styles/app.linaria.global'

const LayoutContainer = styled.div``

type LayoutProps = {
    children?: ReactNode
}

const Layout: (props: LayoutProps) => ReactElement = ({ children }) => {
    return <LayoutContainer className={globals}>
        {children}
    </LayoutContainer>
}

export default Layout