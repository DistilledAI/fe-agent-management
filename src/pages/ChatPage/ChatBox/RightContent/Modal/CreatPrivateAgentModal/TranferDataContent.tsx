import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import useTextCreeping from "@hooks/useTextCreeping"
import { Button, Input } from "@nextui-org/react"
import WordCloundContent from "./WordCloundContent"

const LIST_TEXT_DEFAULT_2 = [
  "Your data is transferred to your own confidential pod.",
]

const TranferDataContent: React.FC = () => {
  const { text: text2 } = useTextCreeping({ listText: LIST_TEXT_DEFAULT_2 })

  return (
    <div className="grid w-[800px] grid-cols-2">
      <div className="w-full">
        <div className="flex-items-center mb-2 w-full gap-4">
          <div className="flex-items-center h-9 w-9 justify-center rounded-full bg-yellow-10">
            <FilledBrainAIIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-base-b">Data collected on:</span>
            <span className="text-base">https://linkedin.com/tunganhdo</span>
          </div>
        </div>
        <WordCloundContent />
      </div>
      <div>
        <div className="relative mb-4 max-w-[300px] text-base transition-all duration-500 ease-linear">
          <span className="text-[24px] font-semibold text-mercury-950">
            {text2}
          </span>
        </div>

        <span className="text-base-14 text-mercury-800">
          Enter your email to{" "}
          <span className="font-bold">receive a notification</span> when your
          private intelligence is{" "}
          <span className="font-bold">ready on the pod.</span>
        </span>

        <Input
          placeholder="Email address"
          labelPlacement="outside"
          classNames={{
            inputWrapper:
              "!bg-mercury-200 rounded-full mt-8 !border !border-mercury-400",
            innerWrapper: "!bg-mercury-200 rounded-full",
            input: "text-18 !text-mercury-950 caret-[#363636]",
          }}
          size="lg"
        />

        <Button className="mt-4 w-full rounded-full bg-mercury-950" size="lg">
          <span className="text-18 text-mercury-30">Enter waitlist</span>
          <div className="rotate-180">
            <ArrowLeftFilledIcon color="#FAFAFA" />
          </div>
        </Button>
      </div>
    </div>
  )
}
export default TranferDataContent
