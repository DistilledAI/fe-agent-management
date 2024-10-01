import { IconProps } from "types/icons"

export const PDFTypeIcon = ({ size = 24, color = "#A2845E" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 12V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V12M5 18H6.5C6.89782 18 7.27936 17.842 7.56066 17.5607C7.84196 17.2794 8 16.8978 8 16.5C8 16.1022 7.84196 15.7206 7.56066 15.4393C7.27936 15.158 6.89782 15 6.5 15H5V21M17 18H19M20 15H17V21M11 15V21H12C12.5304 21 13.0391 20.7893 13.4142 20.4142C13.7893 20.0391 14 19.5304 14 19V17C14 16.4696 13.7893 15.9609 13.4142 15.5858C13.0391 15.2107 12.5304 15 12 15H11Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
