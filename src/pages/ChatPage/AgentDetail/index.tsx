import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAgentDetail, updateAgent } from "services/agent"
import AIAgentGenerate from "./AIAgentGenerate"
import Behaviors from "./Behaviors"
import GeneralInfo from "./GeneralInfo"
import Header from "./Header"
import Preferences from "./Preferences"

const AgentDetail: React.FC = () => {
  const { agentId } = useParams()
  const [agentData, setAgentData] = useState<any>(null)
  const userNameData = agentData?.username
  const descriptionData = agentData?.description
  const firstMsgData = agentData?.firstMsg

  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      firstMsg: "",
    },
  })

  useEffect(() => {
    let defaults = {
      username: userNameData,
      description: descriptionData,
      firstMsg: firstMsgData,
    }
    methods.reset(defaults)
  }, [agentData, methods.reset])

  const onSubmit = async (data: any) => {
    const agentIdNumber = Number(agentId)

    try {
      const res = await updateAgent({
        ...data,
        botId: agentIdNumber,
      })
      console.log("🚀 ~ onSubmit ~ res:", res)
    } catch (error) {
      console.log("error", error)
    }
  }

  const fetchAgentDetail = async () => {
    try {
      const agentIdNumber = Number(agentId)
      const response = await getAgentDetail(agentIdNumber)
      if (response) setAgentData(response?.data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    fetchAgentDetail()
  }, [agentId])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header agentData={agentData} methods={methods} />
        <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
          <GeneralInfo />
          <Behaviors />
          <AIAgentGenerate />
          <Preferences />
        </div>
      </form>
    </FormProvider>
  )
}
export default AgentDetail
