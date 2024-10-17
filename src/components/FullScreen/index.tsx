import { IconExpandClose, IconExpandOpen } from "@components/Icons/DefiLens"
import { useEffect } from "react"

const FullScreen = ({ containerRef, fullScreen, fullScreenChange }) => {
  useEffect(() => {
    document.addEventListener("fullscreenchange", fullScreenChange)
    document.addEventListener("mozfullscreenchange", fullScreenChange)
    document.addEventListener("webkitfullscreenchange", fullScreenChange)
    document.addEventListener("msfullscreenchange", fullScreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", fullScreenChange)
      document.removeEventListener("mozfullscreenchange", fullScreenChange)
      document.removeEventListener("webkitfullscreenchange", fullScreenChange)
      document.removeEventListener("msfullscreenchange", fullScreenChange)
    }
  }, [fullScreenChange])

  return (
    <button
      type="button"
      className="effect-scale max-xl:hidden"
      onClick={() => {
        if (!fullScreen) {
          const el = containerRef?.current?.parentElement
          if (el) {
            // @ts-ignore
            const enterFullScreen =
              el.requestFullscreen ??
              el.webkitRequestFullscreen ??
              el.mozRequestFullScreen ??
              el.msRequestFullscreen
            enterFullScreen.call(el)
          }
        } else {
          const exitFullscreen =
            document.exitFullscreen ??
            // @ts-ignore
            document.msExitFullscreen ??
            // @ts-ignore
            document.mozCancelFullScreen ??
            // @ts-ignore
            document.webkitExitFullscreen
          exitFullscreen.call(document)
        }
      }}
    >
      {fullScreen ? <IconExpandClose /> : <IconExpandOpen />}
    </button>
  )
}

export default FullScreen
