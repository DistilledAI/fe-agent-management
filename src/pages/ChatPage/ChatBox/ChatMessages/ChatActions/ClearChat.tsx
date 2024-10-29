import ComingSoon from "@components/ComingSoon"
import { MessagePlusIcon } from "@components/Icons/Message"
import { Button } from "@nextui-org/react"

const ClearChat = () => {
  return (
    <ComingSoon wrapperClassName="w-fit">
      <Button className="btn-primary" isDisabled>
        <div>
          <MessagePlusIcon />
        </div>
        Clear chat
      </Button>
    </ComingSoon>
  )
}

export default ClearChat
