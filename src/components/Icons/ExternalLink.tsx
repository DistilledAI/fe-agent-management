import { IconProps } from "types/icons"

export const ExternalLink = ({ size = 21, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M10.4997 5.00016H5.49967C5.05765 5.00016 4.63372 5.17576 4.32116 5.48832C4.0086 5.80088 3.83301 6.2248 3.83301 6.66683V15.0002C3.83301 15.4422 4.0086 15.8661 4.32116 16.1787C4.63372 16.4912 5.05765 16.6668 5.49967 16.6668H13.833C14.275 16.6668 14.699 16.4912 15.0115 16.1787C15.3241 15.8661 15.4997 15.4422 15.4997 15.0002V10.0002M9.66634 10.8335L17.1663 3.3335M17.1663 3.3335H12.9997M17.1663 3.3335V7.50016"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
