import { Button, Input } from "@nextui-org/react"
import { FieldLabel } from "./CategoryLabel"

const ToxicPolicies = () => {
  return (
    <div>
      <FieldLabel
        text={
          <div className="flex items-center gap-2">
            <span>Toxic policies</span>
            <Button className="text-base-14 h-auto rounded-full bg-mercury-800 py-[2px] font-bold text-mercury-30 max-sm:text-12">
              COMING SOON
            </Button>
          </div>
        }
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex min-w-[120px] items-center justify-between rounded-full border-1 border-mercury-50 bg-mercury-100 px-4 py-2 opacity-45">
            <span>Scam</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-mercury-900">
              <span className="h-[2px] w-2 bg-mercury-900"></span>
            </div>
          </div>
          <div className="flex-1">
            <Input
              classNames={{
                inputWrapper: "border-1 border-mercury-400 rounded-[8px]",
              }}
              isDisabled
              value="The message promotes get-rich-quick schemes, fraudulent investment opportunities, or other deceptive practices."
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex min-w-[120px] items-center justify-between rounded-full border-1 border-mercury-50 bg-mercury-100 px-4 py-2 opacity-45">
            <span>Spam</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-mercury-900">
              <span className="h-[2px] w-2 bg-mercury-900"></span>
            </div>
          </div>
          <div className="flex-1">
            <Input
              classNames={{
                inputWrapper: "border-1 border-mercury-400 rounded-[8px]",
              }}
              isDisabled
              value="The message contains unsolicited or irrelevant content, likely with the intent of promoting a product or service."
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex min-w-[120px] items-center justify-between rounded-full border-1 border-mercury-50 bg-mercury-100 px-4 py-2 opacity-45">
            <span>Toxicity</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-mercury-900">
              <span className="h-[2px] w-2 bg-mercury-900"></span>
            </div>
          </div>
          <div className="flex-1">
            <Input
              classNames={{
                inputWrapper: "border-1 border-mercury-400 rounded-[8px]",
              }}
              isDisabled
              value="The message contains abusive, hateful, or discriminatory language towards individuals or groups."
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToxicPolicies
