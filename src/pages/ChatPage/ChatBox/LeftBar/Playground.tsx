import { FilledWindowIcon } from "@components/Icons/FilledWindowIcon"
import { Button } from "@nextui-org/react"

const Playground = () => {
  return (
    <Button className="btn-primary !h-[62px]">
      <div>
        <FilledWindowIcon />
      </div>
      Playground
    </Button>
  )
}
export default Playground
