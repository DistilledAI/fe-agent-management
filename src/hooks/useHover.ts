import { useCallback, useEffect, useRef, useState } from "react"

export function useHover() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleMouseHover = useCallback(() => {
    setIsHovered(!isHovered)
  }, [isHovered])

  useEffect(() => {
    const element = ref.current
    if (element) {
      element.addEventListener("mouseenter", handleMouseHover)
      element.addEventListener("mouseleave", handleMouseHover)
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", handleMouseHover)
        element.removeEventListener("mouseleave", handleMouseHover)
      }
    }
  })

  return [ref, isHovered]
}
