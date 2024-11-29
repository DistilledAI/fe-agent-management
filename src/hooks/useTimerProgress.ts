import { useState, useLayoutEffect } from "react"

const useTimerProgress = (time = 0, repeat = true) => {
  const [progress, setProgress] = useState(0)
  const step = time / 100

  useLayoutEffect(() => {
    if (!time) return
    if (!repeat && progress >= 100) return

    const interval = setInterval(() => {
      setProgress((v) => (v >= 100 ? (repeat ? 0 : 100) : v + 1))
    }, step)

    return () => clearInterval(interval)
  }, [progress, repeat, step])

  return progress
}

export default useTimerProgress
