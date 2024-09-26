import { Spinner } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

interface Props {
  baseClassNames?: string
}

const SpinnerLoading: React.FC<Props> = ({ baseClassNames }) => {
  return (
    <Spinner
      label="Loading..."
      labelColor="success"
      classNames={{
        base: twMerge("fixed z-50", baseClassNames),
        circle1: "border-l-green-light-lime border-b-green-light-lime",
        circle2: "border-l-green-light-lime border-b-green-light-lime",
      }}
    />
  )
}

export default SpinnerLoading
