
import { useContext } from "react"
import { DetailContext } from "../context/DetailContext.js"

const useDetailsContext = () => {
    const context = useContext(DetailContext)

    if (!context) {
        throw Error('context error, no context')
    }

    return context
}

export default useDetailsContext
