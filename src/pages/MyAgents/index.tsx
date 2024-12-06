import AlertBox from "@components/AlertBox"
import HeaderMobileBack from "@components/HeaderMobileBack"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import MyAgents from "@pages/Account/MyAgents"
import AgentStatus from "@pages/ChatPage/ChatBox/RightContent/MyPrivateAgentContent/AgentInitialization/AgentStatus"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getMyPrivateAgent } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

const MyAgentPage = () => {
  const queryClient = useQueryClient()
  const cachedData = queryClient.getQueryData([QueryDataKeys.MY_BOT_LIST])
  const { data } = useQuery<any>({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    queryFn: getMyPrivateAgent,
    refetchOnWindowFocus: false,
    enabled: !cachedData,
  })
  const agents = data ? data?.data?.items : []
  const agent = agents[0]
  const isAgentActive = agent && agent?.status === STATUS_AGENT.ACTIVE

  return (
    <div className="mx-auto max-w-[860px] space-y-6 px-4 pb-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[50px]">
      <div className="md:hidden">
        <HeaderMobileBack title="My Agents" />
      </div>
      {!!agent && (
        <>
          <AgentStatus
            classNames={{
              wrapper: "flex-row justify-center gap-4",
              textWrapper: "flex-row gap-1 items-center",
            }}
            isAgentActive={isAgentActive}
          />
          <AlertBox
            isVisible={!isAgentActive}
            messages={[
              "We appreciate your patience. Please join the whitelist to activate.",
            ]}
            links={[
              {
                to: "https://forms.gle/qGWWAnt3nWWAkxeE9",
                label: "Enter waitlist",
                external: true,
              },
              { to: PATH_NAMES.MARKETPLACE, label: "Chat with other agents" },
            ]}
          />
        </>
      )}
      <MyAgents agents={agents} />
    </div>
  )
}

export default MyAgentPage
