import { IconProps } from "types/icons"

export const VoiceChatIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21Z"
        stroke="#545454"
        strokeWidth="1.5"
      />
      <path
        d="M14 8V14M17 10V12M8 8V14M5 10V12M11 6V16"
        stroke="#545454"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const VolumeIcon = ({ size = 24, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15 7.99997C15.621 8.46571 16.125 9.06963 16.4721 9.76391C16.8193 10.4582 17 11.2237 17 12C17 12.7762 16.8193 13.5418 16.4721 14.236C16.125 14.9303 15.621 15.5342 15 16M17.7 4.99997C18.744 5.84362 19.586 6.9101 20.1645 8.12129C20.7429 9.33249 21.0431 10.6577 21.0431 12C21.0431 13.3422 20.7429 14.6675 20.1645 15.8787C19.586 17.0898 18.744 18.1563 17.7 19M6 15H4C3.73478 15 3.48043 14.8946 3.29289 14.7071C3.10536 14.5195 3 14.2652 3 14V9.99997C3 9.73476 3.10536 9.4804 3.29289 9.29287C3.48043 9.10533 3.73478 8.99997 4 8.99997H6L9.5 4.49997C9.5874 4.3302 9.73265 4.1973 9.90949 4.12526C10.0863 4.05323 10.2831 4.04683 10.4643 4.10722C10.6454 4.1676 10.799 4.29078 10.8972 4.45451C10.9955 4.61824 11.0319 4.81171 11 4.99997V19C11.0319 19.1882 10.9955 19.3817 10.8972 19.5454C10.799 19.7092 10.6454 19.8323 10.4643 19.8927C10.2831 19.9531 10.0863 19.9467 9.90949 19.8747C9.73265 19.8027 9.5874 19.6697 9.5 19.5L6 15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const VolumeOffIcon = ({ size = 24, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M15.5 8C16.2483 8.56124 16.8242 9.32114 17.1622 10.1933C17.5002 11.0655 17.5867 12.0151 17.412 12.934M16.035 15.536C15.8679 15.7031 15.6891 15.8582 15.5 16M18.2 5C19.805 6.29704 20.9154 8.10621 21.3455 10.1244C21.7755 12.1427 21.4989 14.2474 20.562 16.086M18.886 18.385C18.668 18.6016 18.439 18.8068 18.2 19M9.569 5.054L10 4.5C10.0874 4.33023 10.2326 4.19732 10.4095 4.12529C10.5863 4.05326 10.7831 4.04686 10.9643 4.10724C11.1454 4.16763 11.299 4.29081 11.3972 4.45454C11.4955 4.61827 11.5319 4.81174 11.5 5V7M11.5 11V19C11.5319 19.1883 11.4955 19.3817 11.3972 19.5455C11.299 19.7092 11.1454 19.8324 10.9643 19.8928C10.7831 19.9531 10.5863 19.9467 10.4095 19.8747C10.2326 19.8027 10.0874 19.6698 10 19.5L6.5 15H4.5C4.23478 15 3.98043 14.8946 3.79289 14.7071C3.60536 14.5196 3.5 14.2652 3.5 14V10C3.5 9.73478 3.60536 9.48043 3.79289 9.29289C3.98043 9.10536 4.23478 9 4.5 9H6.5L7.794 7.336M3.5 3L21.5 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
