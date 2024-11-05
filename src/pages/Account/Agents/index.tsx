import React from "react"
import { IAgentData } from "types/user"
import useWindowSize from "@hooks/useWindowSize"
import ListAgentMobile from "./ListMobile"
import ListAgent from "./List"

const Agents: React.FC<{
  agents: IAgentData[]
}> = ({ agents }) => {
  const { isMobile } = useWindowSize()

  return isMobile ? (
    <ListAgentMobile data={agents} hasMore={false} loadMore={() => {}} />
  ) : (
    <ListAgent agents={agents} />
  )
}

export default Agents
