import { ReactNode } from "react"
import defaultPreferences from "../lib/preferences/preferencesServer"
import { Aside } from "./Blog"

const DocumentationAsideServer = async ({ children }: { children: ReactNode }) => {
    const preferences = await defaultPreferences()
    return <Aside preferences={preferences}>{children}</Aside>
}

export default DocumentationAsideServer