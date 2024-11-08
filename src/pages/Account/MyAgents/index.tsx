import useWindowSize from "@hooks/useWindowSize"
import React from "react"
import { IAgentData } from "types/user"
import ListAgent from "./List"
import ListAgentMobile from "./ListMobile"

const MyAgents: React.FC<{
  agents: IAgentData[]
}> = ({ agents }) => {
  const { isMobile } = useWindowSize()

  return isMobile ? (
    <ListAgentMobile data={agents} hasMore={false} loadMore={() => {}} />
  ) : (
    <ListAgent agents={agents} />
  )
}

export default MyAgents
