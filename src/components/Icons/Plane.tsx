import { IconProps } from "types/icons"

export const PlaneTiltIcon = ({ size = 24, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.5 6.50012L17.5 3.60012C17.8846 3.21556 18.4061 2.99951 18.95 2.99951C19.4939 2.99951 20.0154 3.21556 20.4 3.60012C20.7846 3.98469 21.0006 4.50627 21.0006 5.05012C21.0006 5.59398 20.7846 6.11556 20.4 6.50012L17.5 9.50012L20 17.0001L17.5 19.5501L14 13.0001L11 16.0001V19.0001L9 21.0001L7.5 16.5001L3 15.0001L5 13.0001H8L11 10.0001L4.5 6.50012L7 4.00012L14.5 6.50012Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
