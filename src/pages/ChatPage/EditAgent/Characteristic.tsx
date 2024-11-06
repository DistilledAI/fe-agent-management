import { scaler } from "@assets/images"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { Textarea } from "@nextui-org/react"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"

const Characteristic: React.FC = () => {
  return (
    <div>
      <CategoryLabel text="Characteristic" icon={<ClipboardTextIcon />} />
      <div className="my-4">
        <FieldLabel text="Greeting message" />
        <Textarea
          placeholder="An agent’s opening message in a new context."
          className="w-full rounded-xl border border-mercury-400"
          classNames={{
            inputWrapper: "bg-mercury-70",
          }}
          minRows={5}
          maxRows={5}
        />
      </div>

      <div className="flex w-full justify-between gap-6">
        <div className="w-[65%]">
          <FieldLabel text="Prompt" required />
          <Textarea
            placeholder="Instruct your agent on how to act and respond to messages from users."
            className="w-full rounded-xl border border-mercury-400"
            classNames={{
              inputWrapper: "bg-mercury-70",
            }}
            minRows={7}
            maxRows={7}
          />
        </div>
        <div className="w-[35%]">
          <div className="flex justify-between">
            <FieldLabel text="Mood" />
            <span className="text-base-sb text-[#4F705B]">
              Positive, Energetic
            </span>
          </div>
          <img
            className="m-auto h-auto w-[250px] object-cover p-4"
            src={scaler}
            alt="agent creative"
          />
        </div>
      </div>
    </div>
  )
}
export default Characteristic
