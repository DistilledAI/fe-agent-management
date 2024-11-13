import Behaviors from "@pages/ChatPage/AgentDetail/Behaviors"
import GeneralInfo from "@pages/ChatPage/AgentDetail/GeneralInfo"
import { FormProvider, useForm } from "react-hook-form"
import Header from "./Header"

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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header />
        <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
          <GeneralInfo isBasicVersion />
          <Behaviors isBasicVersion />
        </div>
      </form>
    </FormProvider>
  )
}
export default AgentInitialization
