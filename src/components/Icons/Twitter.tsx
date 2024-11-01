import { IconProps } from "types/icons"

export const TwitterIcon = ({ size = 19, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
    >
      <path
        d="M14.7033 0.875H17.4599L11.4374 7.75833L18.5224 17.125H12.9749L8.62992 11.4442L3.65825 17.125H0.899922L7.34159 9.7625L0.544922 0.875H6.23326L10.1608 6.0675L14.7033 0.875ZM13.7358 15.475H15.2633L5.40326 2.43833H3.76409L13.7358 15.475Z"
        fill={color}
      />
    </svg>
  )
}
