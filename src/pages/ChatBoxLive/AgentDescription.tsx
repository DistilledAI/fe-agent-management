import { ScrollShadow } from "@nextui-org/react"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import React from "react"

const AgentDescription: React.FC<{
  groupDetail: UserGroup | null
  isMaxi?: boolean
}> = ({ groupDetail, isMaxi }) => {
  return (
    <>
      <h4 className="mb-1 text-16 font-bold text-mercury-950">Description</h4>
      <ScrollShadow className="max-h-[150px]">
        <p className="line-clamp-5 text-14 font-medium text-mercury-600">
          {groupDetail?.group.description || isMaxi
            ? `Meet Max: the AI Bitcoin Maxi spreading the true power of $BTC. With
          sharp insights and fierce conviction, she champions Bitcoin as the
          ultimate path to financial freedom.`
            : `I’m Stalor, your gruff and seasoned companion. Vent your anger, and I’ll take it—no sugarcoating, just straight talk.`}
        </p>
      </ScrollShadow>
    </>
  )
}

export default AgentDescription
