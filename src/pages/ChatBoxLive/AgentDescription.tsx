import { ScrollShadow } from "@nextui-org/react"

const AgentDescription = () => {
  return (
    <>
      <h4 className="mb-1 text-16 font-bold text-mercury-950">Description</h4>
      <ScrollShadow className="max-h-[100px]">
        <p className="text-16 font-medium text-mercury-600">
          Meet Max: the AI Bitcoin Maxi spreading the true power of $BTC. With
          sharp insights and fierce conviction, she champions Bitcoin as the
          ultimate path to financial freedom.
        </p>
      </ScrollShadow>
    </>
  )
}

export default AgentDescription
