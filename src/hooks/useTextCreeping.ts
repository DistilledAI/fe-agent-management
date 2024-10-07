import { useEffect, useState } from "react"

interface TextCreepingProps {
  listText: string[]
}

const useTextCreeping = ({ listText }: TextCreepingProps) => {
  const [text, setText] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (listText.length) {
      let i = 0
      const currentText = listText[currentIndex]
      const intervalId = setInterval(() => {
        setText(currentText.slice(0, i++))
        if (i > currentText.length) {
          clearInterval(intervalId)
        }
      }, 40)

      const timeoutId = setTimeout(
        () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % listText.length)
        },
        currentText.length * 100 + 500,
      )

      return () => {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
      }
    }
  }, [currentIndex])

  return { text }
}

export default useTextCreeping
