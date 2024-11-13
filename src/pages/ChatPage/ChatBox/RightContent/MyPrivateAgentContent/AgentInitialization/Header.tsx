import { Button } from "@nextui-org/react"

const Header: React.FC = () => {
  return (
    <div className="bg-lgd-muted-beige-2 flex items-center justify-center p-3">
      <div className="flex w-full max-w-[768px] items-center justify-between px-4">
        <div className="flex flex-col">
          <span className="text-24 font-semibold text-mercury-950">
            Agent Initialization
          </span>
          <span className="text-base font-medium text-brown-10">
            Your Private Agent is private to you only.
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            className="h-[44px] rounded-full bg-mercury-950 text-[16px] text-mercury-30"
            type="submit"
            isDisabled
          >
            Create Private Agent
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Header
