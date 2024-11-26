import {
  COMMUNICATION_STYLE_LIST,
  PATH_NAMES,
  PERSONALITY_LIST,
  STATUS_AGENT,
} from "@constants/index"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getAgentDetail, updateAgent, updateAgentConfig } from "services/agent"
import { updateAvatarUser } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import AgentBehaviors, { SelectedBehaviors } from "./AgentBehaviors"
import Functions from "./Functions"
import GeneralInfo from "./GeneralInfo"
import Header from "./Header"
import Monetization from "./Monetization"
import { getConfigAgentByDataForm, isPassRuleAgentInfo } from "./helpers"
import SmoothScrollTo from "@components/SmoothScrollTo"
import KnowledgeAgent from "./Knowledge"
import TargetAudience from "./TargetAudience"
import {
  INTERACTION_FREQUENCY_KEY,
  RESPONSE_LENGTH_KEY,
} from "./AgentBehaviors/constants"

const AgentDetail: React.FC = () => {
  const { agentId } = useParams()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [valueCustomDefault, setValueCustomDefault] = useState<any>()
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
  const isActive = agentData?.status === STATUS_AGENT.ACTIVE

  const userNameData = agentData?.username
  const descriptionData = agentData?.description
  const firstMsgData = agentData?.firstMsg
  const avatarData = agentData?.avatar
  const agentBehaviors = agentData?.agentBehaviors
    ? JSON.parse(agentData?.agentBehaviors)
    : {}
  const agentPersonalData = agentBehaviors?.agentPersonal || []
  const agentCommunicationData = agentBehaviors?.agentCommunication || []
  const agentInteractionFrequency =
    agentBehaviors?.agentInteractionFrequency ||
    INTERACTION_FREQUENCY_KEY.Occasionally
  const agentToneAdaptation = agentBehaviors?.toneAdaptation || "No"
  const agentResponseLength =
    agentBehaviors?.responseLength || RESPONSE_LENGTH_KEY.Moderate

  const handleSetValueCustomDefaultDisplay = (
    data: any,
    list: any,
    name: "agentPersonal" | "agentCommunication",
  ) => {
    const isDataCustom = !list.map((item: any) => item.value).includes(data)
    const value = isDataCustom
      ? {
          [name]: {
            value: data,
            isFocused: false,
          },
        }
      : undefined
    setValueCustomDefault((prev: any) => ({ ...prev, ...value }))
  }

  useEffect(() => {
    if (agentPersonalData.length)
      handleSetValueCustomDefaultDisplay(
        agentPersonalData[0],
        PERSONALITY_LIST,
        "agentPersonal",
      )
    if (agentCommunicationData.length)
      handleSetValueCustomDefaultDisplay(
        agentCommunicationData[0],
        COMMUNICATION_STYLE_LIST,
        "agentCommunication",
      )
  }, [agentPersonalData.length, agentCommunicationData.length])

  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      firstMsg: "",
      avatar: "",
      agentPersonal: [],
      agentCommunication: [],
      interaction_frequency: INTERACTION_FREQUENCY_KEY.Occasionally,
      tone_adaptation: false,
      response_length: RESPONSE_LENGTH_KEY.Moderate,
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
      interaction_frequency: agentInteractionFrequency,
      tone_adaptation: agentToneAdaptation,
      response_length: agentResponseLength,
    }
    methods.reset(defaults)
  }, [agentData, methods.reset])

  const onSubmit = async (data: any) => {
    if (!isPassRuleAgentInfo(data) || !isActive) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, avatarFile, ...newData } = data
    const agentIdNumber = Number(agentId)
    const configData = getConfigAgentByDataForm(data)

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
      if (configData.length > 0) {
        await updateAgentConfig({ botId: agentIdNumber, data: configData })
      }
      if (res.data) {
        refetch()
        queryClient.invalidateQueries({ queryKey: [QueryDataKeys.MY_BOT_LIST] })
        toast.success("Updated successfully!")
      }
    } catch (error: any) {
      console.error("error", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const componentScrollTo = [
    {
      title: "Display Info",
      content: <GeneralInfo agentData={agentData} />,
    },
    {
      title: "Functions",
      content: <Functions agentData={agentData} />,
    },
    {
      title: "Behaviors",
      content: (
        <AgentBehaviors
          onSelectBehaviors={handleSelectBehaviors}
          selectedBehaviors={{
            agentPersonal: methods.watch("agentPersonal"),
            agentCommunication: methods.watch("agentCommunication"),
          }}
          valueCustomDefault={valueCustomDefault}
        />
      ),
    },
    {
      title: "Knowledge",
      content: <KnowledgeAgent />,
    },
    {
      title: "Target Audience",
      content: <TargetAudience />,
    },
    {
      title: "Monetization",
      content: <Monetization />,
    },
  ]

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header submitLoading={loading} agentData={agentData} />
        <div className="sticky left-0 top-[192px] h-[1px] w-full bg-mercury-100"></div>
        <div className="relative mx-auto max-w-[800px] px-4 pb-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px] max-sm:pb-20 max-sm:pt-6">
          <SmoothScrollTo
            components={componentScrollTo}
            offsetAdjustment={220}
            classNames={{
              headerWrapper: "sticky -mt-[1px] top-[152px] bg-white z-[11]",
              contentWrapper: "pt-5",
            }}
          />
        </div>
      </form>
    </FormProvider>
  )
}
export default AgentDetail
