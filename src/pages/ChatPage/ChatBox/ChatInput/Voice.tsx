import { allowMicrophone } from "@assets/images"
import DrawerBottom from "@components/DrawerBottom"
import { MicrophoneFilledIcon } from "@components/Icons/Microphone"
import useWindowSize from "@hooks/useWindowSize"
import { Button, Image } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import type SpeechRecognition from "react-speech-recognition"
import { toast } from "react-toastify"
import { match } from "ts-pattern"
import { twMerge } from "tailwind-merge"

const VoiceChat: React.FC<{
  setMessages: React.Dispatch<React.SetStateAction<string>>
  transcript: string
  SpeechRecognition: SpeechRecognition
  isListening: boolean
  resetTranscript: () => void
  isDisabled: boolean
  isDarkTheme?: boolean
}> = ({
  setMessages,
  transcript,
  SpeechRecognition,
  isListening,
  resetTranscript,
  isDisabled,
  isDarkTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useWindowSize()

  const startVoice = async () => {
    const isMicrophoneAllowed = await isMicrophoneAllow()
    const isBrowserSupport =
      SpeechRecognition.browserSupportsSpeechRecognition()

    const isPassRule = match({
      isMicrophoneAllowed,
      isMobile,
      isBrowserSupport,
    })
      .returnType<boolean>()
      .with({ isMicrophoneAllowed: false, isMobile: false }, () => {
        toast.warning("Please allow microphone access")
        return false
      })
      .with({ isMicrophoneAllowed: false, isMobile: true }, () => {
        setIsOpen(true)
        return false
      })
      .with({ isBrowserSupport: false }, () => {
        toast.warning("Your browser is not support")
        return false
      })
      .otherwise(() => true)
    if (!isPassRule) return

    resetTranscript()
    SpeechRecognition.startListening({ continuous: true })
  }

  const stopVoice = () => {
    SpeechRecognition.stopListening()
  }

  const isMicrophoneAllow = async () => {
    const permissionNav: any = navigator.permissions
    const permission = await permissionNav.query({ name: "microphone" })
    if (permission.state === "granted") return true
    return false
  }

  useEffect(() => {
    setMessages(transcript)
  }, [transcript])

  return (
    <>
      {isListening ? (
        <div className="relative">
          <span
            style={{ animation: "bounce .8s ease-in-out infinite .5s" }}
            className="absolute z-[-1] h-10 w-10 rounded-full bg-gray-400 opacity-20"
          ></span>
          <Button
            onClick={stopVoice}
            className="relative h-10 w-10 min-w-10 rounded-full bg-code-agent-1 p-0"
          >
            <span className="h-3 w-3 rounded-sm bg-white"></span>
          </Button>
        </div>
      ) : (
        <Button
          onClick={startVoice}
          isIconOnly
          isDisabled={isDisabled}
          className={twMerge(
            "h-9 rounded-full bg-mercury-200",
            isDarkTheme && "bg-mercury-950",
          )}
        >
          <MicrophoneFilledIcon color={isDarkTheme ? "#E6E6E6" : "#545454"} />
        </Button>
      )}
      {isMobile && (
        <>
          {isOpen && (
            <div className="fixed left-0 top-0 h-dvh w-full bg-[rgba(0,0,0,0.25)] backdrop-blur-[10px]"></div>
          )}
          <DrawerBottom
            classNames={{
              base: "max-h-[calc(100dvh-200px)] bg-mercury-30 rounded-b-none",
            }}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div className="flex h-full w-full flex-col justify-center overflow-y-auto">
              <Image className="mt-6 h-auto w-full" src={allowMicrophone} />
              <p className="mt-5 text-center text-24 text-base font-semibold">
                Allow Microphone access
              </p>
              <p className="mt-6 text-center !text-[14px] text-base text-mercury-800">
                <span className="!text-[14px] text-base font-medium">
                  Voice chat with AI Companion
                </span>{" "}
                requires Microphone access for receiving and processing outgoing
                audio
              </p>
            </div>
          </DrawerBottom>
        </>
      )}
    </>
  )
}

export default VoiceChat
