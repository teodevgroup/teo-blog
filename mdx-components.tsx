import { MDXComponents } from "mdx/types"
import { Pre, FigCaption, H2, H3, H4, H5, H6 } from './src/shared/components/Blog'
import DocumentationAsideServer from "@/shared/components/ServerAside"

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        aside: (props: any) => <DocumentationAsideServer {...props} />,
        pre: (props: any) => <Pre {...props} />,
        figcaption: (props: any) => <FigCaption {...props} />,
        h2: (props: any) => <H2 {...props} />,
        h3: (props: any) => <H3 {...props} />,
        h4: (props: any) => <H4 {...props} />,
        h5: (props: any) => <H5 {...props} />,
        h6: (props: any) => <H6 {...props} />,
        ...components
    }
}