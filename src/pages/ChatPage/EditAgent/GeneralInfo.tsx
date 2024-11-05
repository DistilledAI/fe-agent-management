import AvatarCustom from "@components/AvatarCustom"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { Button, Input, Textarea } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"
import CategoryLabel, { Divider, FieldLabel } from "./CategoryLabel"

const GeneralInfo: React.FC = () => {
  const { control } = useFormContext()

  return (
    <div className="w-full">
      <CategoryLabel text="General info" icon={<ClipboardTextIcon />} />
      <div className="mb-4 mt-4 flex w-full justify-between gap-[56px]">
        <Controller
          name="agentName"
          control={control}
          render={() => (
            <div className="w-full">
              <FieldLabel text="Agent name" required />
              <Input
                key="agentName"
                type="text"
                placeholder="Keep it unique and within 4-30 characters."
                className="w-full"
                classNames={{
                  mainWrapper: "border border-mercury-400 rounded-xl",
                  inputWrapper: " bg-mercury-70",
                }}
              />
            </div>
          )}
        />

        <div className="">
          <FieldLabel text="Agent picture" />
          <div className="flex gap-2">
            <AvatarCustom />
            <Button className="h-[44px] rounded-full border border-mercury-50 bg-mercury-100">
              <span className="text-base text-mercury-950">
                Use AI Generated
              </span>
            </Button>
            <Button className="h-[44px] rounded-full border border-mercury-50 bg-mercury-100">
              <span className="text-base text-mercury-950">Upload picture</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <FieldLabel text="Description" />
          <span className="text-base-md text-mercury-900">0/200</span>
        </div>
        <Textarea
          placeholder="Briefly outline your agent story or mission."
          minRows={5}
          maxRows={5}
          className="w-full rounded-xl border border-mercury-400"
          classNames={{
            inputWrapper: "bg-mercury-70",
          }}
        />
      </div>

      <Divider />
    </div>
  )
}
export default GeneralInfo
