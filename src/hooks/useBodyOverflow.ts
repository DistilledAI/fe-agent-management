import { useEffect } from "react"

const useBodyOverflow = (overflowState = "hidden") => {
  useEffect(() => {
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
  }, [overflowState])
}

export default useBodyOverflow
