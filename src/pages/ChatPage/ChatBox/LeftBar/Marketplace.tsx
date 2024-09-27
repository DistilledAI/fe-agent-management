import { FilledSquareCircleIcon } from "@components/Icons/FilledSquareCircleIcon"
import { Button } from "@nextui-org/react"

const Marketplace: React.FC = () => {
  return (
    <Button className="h-11 w-full rounded-full border border-white bg-mercury-30">
      <FilledSquareCircleIcon />
      <span className="text-base">Marketplace</span>
    </Button>
  )
}
export default Marketplace
