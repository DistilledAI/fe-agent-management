import { MicrophoneFilledIcon } from "@components/Icons/Microphone"
import { Button } from "@nextui-org/react"
import React, { useEffect } from "react"
import type SpeechRecognition from "react-speech-recognition"
import { toast } from "react-toastify"

const VoiceChat: React.FC<{
  setMessages: React.Dispatch<React.SetStateAction<string>>
  transcript: string
  SpeechRecognition: SpeechRecognition
  isListening: boolean
  resetTranscript: () => void
  isDisabled: boolean
}> = ({
  setMessages,
  transcript,
  SpeechRecognition,
  isListening,
  resetTranscript,
  isDisabled,
}) => {
  const startVoice = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return toast.warning("Your browser is not support")
    }

    console.log("hicccc", SpeechRecognition.browserSupportsSpeechRecognition)
    const speechRecognitionSupported =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window

    console.log("speechRecognitionSupported:", speechRecognitionSupported)

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
          className="hidden rounded-full bg-mercury-200 md:block"
        >
          <MicrophoneFilledIcon />
        </Button>
      )}
    </>
  )
}

export default VoiceChat
