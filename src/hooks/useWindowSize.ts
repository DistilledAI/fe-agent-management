import { useState, useEffect } from "react"

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  })
  const { screenWidth, screenHeight } = windowSize

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isDesktop = screenWidth > 1023
  const isTablet = screenWidth > 679 && screenWidth < 1024
  const isMobile = screenWidth < 426

  return {
    screenWidth,
    screenHeight,
    isDesktop,
    isTablet,
    isMobile,
  }
}

export default useWindowSize
