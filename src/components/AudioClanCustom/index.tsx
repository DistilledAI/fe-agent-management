import { VolumeIcon, VolumeOffIcon } from "@components/Icons/Voice"
import React, { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

const AudioClanCustom: React.FC<{
  classNames?: {
    wrapper?: string
  }
  audioSrc: any
}> = ({ classNames, audioSrc }) => {
  const [isMuteAudio, setIsMuteAudio] = useState(true)
  const audioRef = useRef<any>()

  const handlePlayAudio = () => {
    if (isMuteAudio) audioRef.current.play()
    else audioRef.current.pause()
    setIsMuteAudio(!isMuteAudio)
  }

  useEffect(() => {
    setIsMuteAudio(true)
    audioRef.current.pause()
  }, [])

  return (
    <>
      <div
        onClick={handlePlayAudio}
        className={twMerge(
          "absolute left-5 top-5 z-[11] cursor-pointer",
          classNames?.wrapper,
        )}
      >
        {isMuteAudio ? (
          <VolumeOffIcon color="white" />
        ) : (
          <VolumeIcon color="white" />
        )}
      </div>
      <audio ref={audioRef} className="hidden">
        <source src={audioSrc} />
      </audio>
    </>
  )
}

export default AudioClanCustom
