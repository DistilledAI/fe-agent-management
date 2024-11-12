import AvatarCustom from "@components/AvatarCustom"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { Button, Input, Textarea } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import ChangeAvatarContainer from "./ChangeAvatarContainer"
import { IAgentData } from "types/user"

const GeneralInfo: React.FC<{
  agentData: IAgentData
}> = ({ agentData }) => {
  const { control, watch } = useFormContext()
  const descLength = watch("description")?.length ?? 0

  const DESC_MAX_LENGTH = 200

  return (
    <div className="w-full">
      <CategoryLabel text="General info" icon={<ClipboardTextIcon />} />
      <div className="mb-4 mt-4 flex w-full items-center justify-between gap-[56px]">
        <Controller
          name="username"
          control={control}
          render={({ field: { value, onChange } }: any) => {
            return (
              <div className="w-full">
                <FieldLabel text="Agent name" required />
                <div className="flex h-[72px] items-center">
                  <Input
                    key="agent-name"
                    value={value}
                    type="text"
                    placeholder="Keep it unique and within 4-30 characters."
                    className="w-full"
                    classNames={{
                      mainWrapper: "border border-mercury-400 rounded-xl",
                      inputWrapper: " bg-mercury-70",
                    }}
                    onChange={(e) => onChange(e.target.value)}
                  />
                </div>
              </div>
            )
          }}
        />

        <div className="">
          <FieldLabel text="Agent picture" />
          <div className="flex items-center gap-2">
            <ChangeAvatarContainer>
              <AvatarCustom
                src={agentData?.avatar ?? undefined}
                publicAddress={agentData?.publicAddress ?? agentData?.username}
                className="h-[72px] w-[72px]"
              />
            </ChangeAvatarContainer>
            <Button className="h-[44px] rounded-full border border-mercury-50 bg-mercury-950">
              <span className="text-base text-white">Use AI Generated</span>
            </Button>
            <ChangeAvatarContainer>
              <button className="h-[44px] w-[130px] rounded-full border border-mercury-50 bg-mercury-30">
                <span className="text-base text-mercury-950">
                  Upload picture
                </span>
              </button>
            </ChangeAvatarContainer>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <FieldLabel text="Description" />
          <span className="text-base-md text-mercury-900">
            {descLength}/{DESC_MAX_LENGTH}
          </span>
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange } }: any) => {
            return (
              <div className="w-full">
                <Textarea
                  placeholder="Briefly outline your agent story or mission."
                  minRows={5}
                  maxRows={5}
                  className="w-full rounded-xl border border-mercury-400"
                  classNames={{
                    inputWrapper: "bg-mercury-70",
                  }}
                  value={value}
                  onChange={(e) => {
                    if (descLength >= DESC_MAX_LENGTH) return
                    onChange(e.target.value)
                  }}
                />
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}
export default GeneralInfo
