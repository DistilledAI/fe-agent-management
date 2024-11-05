import { FormProvider, useForm } from "react-hook-form"
import Characteristic from "./Characteristic"
import GeneralInfo from "./GeneralInfo"
import Header from "./Header"

const EditAgent: React.FC = () => {
  const methods = useForm<any>({
    defaultValues: {},
  })

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
        <Header />
        <GeneralInfo />
        <Characteristic />
      </div>
    </FormProvider>
  )
}
export default EditAgent
