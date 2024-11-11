import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAgentDetail } from "services/agent"
import Behaviors from "./Behaviors"
import GeneralInfo from "./GeneralInfo"
import Header from "./Header"

const AgentDetail: React.FC = () => {
  const { agentId } = useParams()
  const [agentData, setAgentData] = useState<any>(null)
  const userNameData = agentData?.username

  const methods = useForm<any>({
    defaultValues: {
      userName: "",
      description: "",
      firstMsg: "",
    },
  })

  useEffect(() => {
    let defaults = {
      userName: userNameData,
    }
    methods.reset(defaults)
  }, [agentData, methods.reset])

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
      <>
        <Header />
        <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
          <GeneralInfo agentData={agentData} />
          <Behaviors />
        </div>
      </>
    </FormProvider>
  )
}
export default AgentDetail
