import { FilledWindowIcon } from "@components/Icons/FilledWindowIcon"
import { Button } from "@nextui-org/react"

const Playground: React.FC = () => {
  return (
    <Button className="h-11 w-full rounded-full border border-white bg-mercury-30">
      <FilledWindowIcon />
      <span className="text-base">Playground</span>
    </Button>
  )
}
export default Playground
