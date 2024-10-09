import { FilledSquareCircleIcon } from "@components/Icons/FilledSquareCircleIcon"
import { Button } from "@nextui-org/react"

const Marketplace = () => {
  return (
    <Button isDisabled className="btn-primary !h-[62px]">
      <div>
        <FilledSquareCircleIcon />
      </div>
      Marketplace
    </Button>
  )
}
export default Marketplace
