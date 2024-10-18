import { IconProps } from "types/icons"

export const TablerPlusIcon = ({ size = 20, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10.0003 4.16675V15.8334M4.16699 10.0001H15.8337"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
