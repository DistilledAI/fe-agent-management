import { FormProvider, useForm } from "react-hook-form"
import Behaviors from "./Behaviors"
import GeneralInfo from "./GeneralInfo"
import Header from "./Header"

const EditAgent: React.FC = () => {
  const methods = useForm<any>({
    defaultValues: {},
  })

  return (
    <FormProvider {...methods}>
      <>
        <Header />
        <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
          <GeneralInfo />
          <Behaviors />
        </div>
      </>
    </FormProvider>
  )
}
export default EditAgent
