import GeneralInfo from "@pages/AgentDetail/GeneralInfo"
import { FormProvider, useForm } from "react-hook-form"
import Header from "./Header"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import { Divider } from "@pages/AgentDetail/CategoryLabel"
import AgentBehaviors, {
  SelectedBehaviors,
} from "@pages/AgentDetail/AgentBehaviors"
import { useState } from "react"

const AgentInitialization: React.FC = () => {
  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      firstMsg: "",
    },
  })

  const onSubmit = async () => {
    // const agentIdNumber = Number(agentId)
    // try {
    //   const res = await updateAgent({
    //     ...data,
    //     botId: agentIdNumber,
    //   })
    //   console.log("🚀 ~ onSubmit ~ res:", res)
    // } catch (error) {
    //   console.log("error", error)
    // }
  }

  const [selectedBehaviors, setSelectedBehaviors] = useState<SelectedBehaviors>(
    {
      agentPersonal: [],
      agentCommunication: [],
    },
  )

  const handleSelectBehaviors = (selected: SelectedBehaviors) => {
    setSelectedBehaviors(selected)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header />
        <div className="mx-auto max-w-[768px] space-y-8 pb-[100px] pt-6 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
          <GeneralInfo />
          <Divider />
          <AgentBehaviors
            selectedBehaviors={selectedBehaviors}
            onSelectBehaviors={handleSelectBehaviors}
          />
          <Divider />
          <div className="flex items-center gap-2">
            <InfoCircleOutlineIcon color="#A2845E" />
            <p className="text-[22px] font-bold text-mercury-950">
              You can set more advanced preferences for your agent later.
            </p>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
export default AgentInitialization
