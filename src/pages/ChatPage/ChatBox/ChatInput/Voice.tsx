import { MicrophoneFilledIcon } from "@components/Icons/Microphone"
import { Button } from "@nextui-org/react"
import React, { useEffect } from "react"
import type SpeechRecognition from "react-speech-recognition"
import { toast } from "react-toastify"
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
  const startVoice = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return toast.warning("Your browser is not support")
    }
    resetTranscript()
    SpeechRecognition.startListening({ continuous: true })
  }

  const stopVoice = () => {
    SpeechRecognition.stopListening()
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
            "rounded-full bg-mercury-200",
            isDarkTheme && "bg-mercury-950",
          )}
        >
          <MicrophoneFilledIcon color={isDarkTheme ? "#E6E6E6" : "#545454"} />
        </Button>
      )}
    </>
  )
}

export default VoiceChat
