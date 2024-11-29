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
        <p className="text-16 font-medium text-mercury-600">
          {groupDetail?.group.description || isMaxi
            ? `Meet Max: the AI Bitcoin Maxi spreading the true power of $BTC. With
          sharp insights and fierce conviction, she champions Bitcoin as the
          ultimate path to financial freedom.`
            : `Meet Stalor, the AI agent with 70 years of sass and sarcasm wrapped in code. 
He's grumpy, goofy, and unapologetically rude, but somehow, you’ll love him. Welcome to the world of Distilled—where tech has an attitude 😏`}
        </p>
      </ScrollShadow>
    </>
  )
}

export default AgentDescription
