import { useEffect } from "react"
import useWindowSize from "./useWindowSize"

const useBodyOverflow = (overflowState = "hidden") => {
  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (isMobile) {
      return
    }

    const scrollPosition = window.scrollY

    if (overflowState === "hidden") {
      document.body.style.overflow = "hidden"

      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
      if (overflowState !== "hidden") {
        window.scrollTo(0, scrollPosition)
      }
    }
  }, [overflowState, isMobile])
}

export default useBodyOverflow
