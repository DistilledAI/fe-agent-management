import { useState, useLayoutEffect } from "react"

const useTimerProgress = (time = 0, repeat = true) => {
  const [timerProgress, setTimerProgress] = useState(0)
  const step = time / 100

  useLayoutEffect(() => {
    if (!time) return
    if (!repeat && timerProgress >= 100) return

    const interval = setInterval(() => {
      setTimerProgress((v) => (v >= 100 ? (repeat ? 0 : 100) : v + 1))
    }, step)

    return () => clearInterval(interval)
  }, [timerProgress, repeat, step])

  return { timerProgress, setTimerProgress }
}

export default useTimerProgress
