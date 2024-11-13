import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAgentDetail, updateAgent } from "services/agent"
import AIAgentGenerate from "./AIAgentGenerate"
import AdvancedConfig from "./AdvancedConfig"
import GeneralInfo from "./GeneralInfo"
import Header from "./Header"
import Preferences from "./Preferences"
import { Divider } from "@nextui-org/react"
import ToxicPolicies from "./ToxicPolicies"
import Monetization from "./Monetization"
import { PATH_NAMES } from "@constants/index"
import AgentBehaviors, { SelectedBehaviors } from "./AgentBehaviors"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { updateAvatarUser } from "services/user"

const AgentDetail: React.FC = () => {
  const { agentId } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchAgentDetail = async () => {
    try {
      const agentIdNumber = Number(agentId)
      const response = await getAgentDetail(agentIdNumber)
      if (response?.data) return response.data
      else navigate(PATH_NAMES.HOME)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
      navigate(PATH_NAMES.HOME)
    }
  }

  const { data: agentData, refetch } = useQuery({
    queryKey: [QueryDataKeys.AGENT_DETAIL],
    queryFn: fetchAgentDetail,
    refetchOnWindowFocus: false,
  })

  const userNameData = agentData?.username
  const descriptionData = agentData?.description
  const firstMsgData = agentData?.firstMsg
  const avatarData = agentData?.avatar
  const agentBehaviors = agentData?.agentBehaviors
    ? JSON.parse(agentData?.agentBehaviors)
    : {}
  const agentPersonalData = agentBehaviors?.agentPersonal || []
  const agentCommunicationData = agentBehaviors?.agentCommunication || []

  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      firstMsg: "",
      avatar: "",
      agentPersonal: [],
      agentCommunication: [],
    },
  })

  const handleSelectBehaviors = (selected: SelectedBehaviors) => {
    const { agentPersonal, agentCommunication } = selected
    methods.setValue("agentPersonal", agentPersonal)
    methods.setValue("agentCommunication", agentCommunication)
  }

  useEffect(() => {
    const defaults = {
      username: userNameData,
      description: descriptionData,
      firstMsg: firstMsgData,
      avatar: avatarData,
      agentPersonal: agentPersonalData,
      agentCommunication: agentCommunicationData,
    }
    methods.reset(defaults)
  }, [agentData, methods.reset])

  const isPassRule = (data: any) => {
    const isUsernameLengthPass =
      data["username"]?.length >= 4 && data["username"]?.length <= 30
    if (!isUsernameLengthPass) {
      toast.warning("Agent name within 4-30 characters")
      return false
    }
    return true
  }

  const onSubmit = async (data: any) => {
    if (!isPassRule(data)) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, avatarFile, ...newData } = data
    const agentIdNumber = Number(agentId)

    try {
      setLoading(true)
      const res = await updateAgent({
        ...newData,
        botId: agentIdNumber,
      })
      if (data.avatarFile) {
        const formData = new FormData()
        formData.append("file", data.avatarFile)
        formData.append("userId", agentData?.id?.toString() ?? "")
        await updateAvatarUser(formData)
      }
      if (res.data) {
        refetch()
        toast.success("Updated successfully!")
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header submitLoading={loading} agentData={agentData} />
        <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px] max-sm:pb-20 max-sm:pt-6">
          <GeneralInfo agentData={agentData} />
          <Divider className="my-9" />
          <AgentBehaviors
            onSelectBehaviors={handleSelectBehaviors}
            selectedBehaviors={{
              agentPersonal: methods.watch("agentPersonal"),
              agentCommunication: methods.watch("agentCommunication"),
            }}
          />
          <Divider className="my-9" />
          <AdvancedConfig />
          <AIAgentGenerate />
          <Preferences />
          <ToxicPolicies />
          <Divider className="my-9" />
          <Monetization />
        </div>
      </form>
    </FormProvider>
  )
}
export default AgentDetail
