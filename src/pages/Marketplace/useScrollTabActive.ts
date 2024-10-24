import { useEffect, useState } from "react"

interface Props {
  items: Array<{
    id: string
  }>
}

const useScrollTabActive = ({ items }: Props) => {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const [elementIndex, setElementIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight
      const scrollPosition = window.scrollY + viewportHeight

      items.forEach((item: any, index: number) => {
        const section = document.getElementById(item.id)
        if (section) {
          const rect = section.getBoundingClientRect()
          const threshold = viewportHeight * 0.3
          if (rect.top <= threshold) {
            setActiveId(item.id)
            setElementIndex(index)
          }

          const isLastSection = index === items.length - 1
          if (isLastSection && scrollPosition >= scrollHeight - 100) {
            setActiveId(item.id)
            setElementIndex(index)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleTabClick = (id: string, scrollMarginTop = "200px") => {
    const element = document.getElementById(id)
    if (element) {
      if (items[0]?.id === id) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      } else {
        element.style.scrollMarginTop = scrollMarginTop
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        })
      }
    }
  }

  return {
    activeId,
    handleTabClick,
    setElementIndex,
    elementIndex,
    setActiveId,
  }
}

export default useScrollTabActive
