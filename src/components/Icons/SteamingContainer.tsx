import { IconProps } from "types/icons"

export const StreamingContainer = ({ size = 202 }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 202 202"
      fill="none"
    >
      <circle opacity="0.1" cx="101" cy="101" r="62.5" stroke="white" />
      <circle opacity="0.2" cx="101" cy="101" r="51.5" stroke="white" />
      <circle opacity="0.5" cx="101" cy="101" r="44.5" stroke="white" />
      <circle opacity="0.07" cx="101" cy="101" r="77.5" stroke="white" />
      <circle opacity="0.03" cx="101" cy="101" r="100.5" stroke="white" />
    </svg>
  )
}
