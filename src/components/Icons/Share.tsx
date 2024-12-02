import { IconProps } from "types/icons"

export const ShareWithQrIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.83337 14.1668V14.1752M5.83337 5.8335V5.84183M14.1667 5.8335V5.84183M14.1667 11.6668H11.6667V14.1668M16.6667 11.6668V11.6752M11.6667 16.6668H14.1667M14.1667 14.1668H16.6667V16.6668M3.33337 4.16683C3.33337 3.94582 3.42117 3.73385 3.57745 3.57757C3.73373 3.42129 3.94569 3.3335 4.16671 3.3335H7.50004C7.72105 3.3335 7.93302 3.42129 8.0893 3.57757C8.24558 3.73385 8.33337 3.94582 8.33337 4.16683V7.50016C8.33337 7.72118 8.24558 7.93314 8.0893 8.08942C7.93302 8.2457 7.72105 8.3335 7.50004 8.3335H4.16671C3.94569 8.3335 3.73373 8.2457 3.57745 8.08942C3.42117 7.93314 3.33337 7.72118 3.33337 7.50016V4.16683ZM11.6667 4.16683C11.6667 3.94582 11.7545 3.73385 11.9108 3.57757C12.0671 3.42129 12.279 3.3335 12.5 3.3335H15.8334C16.0544 3.3335 16.2663 3.42129 16.4226 3.57757C16.5789 3.73385 16.6667 3.94582 16.6667 4.16683V7.50016C16.6667 7.72118 16.5789 7.93314 16.4226 8.08942C16.2663 8.2457 16.0544 8.3335 15.8334 8.3335H12.5C12.279 8.3335 12.0671 8.2457 11.9108 8.08942C11.7545 7.93314 11.6667 7.72118 11.6667 7.50016V4.16683ZM3.33337 12.5002C3.33337 12.2791 3.42117 12.0672 3.57745 11.9109C3.73373 11.7546 3.94569 11.6668 4.16671 11.6668H7.50004C7.72105 11.6668 7.93302 11.7546 8.0893 11.9109C8.24558 12.0672 8.33337 12.2791 8.33337 12.5002V15.8335C8.33337 16.0545 8.24558 16.2665 8.0893 16.4228C7.93302 16.579 7.72105 16.6668 7.50004 16.6668H4.16671C3.94569 16.6668 3.73373 16.579 3.57745 16.4228C3.42117 16.2665 3.33337 16.0545 3.33337 15.8335V12.5002Z"
        stroke="#545454"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ShareWithCloudIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.8333 15C4.79353 15 3.79634 14.6049 3.06112 13.9017C2.32589 13.1984 1.91284 12.2446 1.91284 11.25C1.91284 10.2554 2.32589 9.30161 3.06112 8.59835C3.79634 7.89509 4.79353 7.5 5.8333 7.5C6.07887 6.40598 6.79727 5.44457 7.83045 4.82726C8.34203 4.5216 8.9155 4.30962 9.51811 4.20343C10.1207 4.09723 10.7407 4.0989 11.3426 4.20833C11.9444 4.31777 12.5165 4.53283 13.026 4.84123C13.5356 5.14964 13.9726 5.54535 14.3123 6.00577C14.6519 6.4662 14.8874 6.98232 15.0054 7.52466C15.1234 8.06701 15.1216 8.62496 15 9.16667H15.8333C16.6068 9.16667 17.3487 9.47396 17.8957 10.0209C18.4427 10.5679 18.75 11.3098 18.75 12.0833C18.75 12.8569 18.4427 13.5987 17.8957 14.1457C17.3487 14.6927 16.6068 15 15.8333 15H15"
        stroke="#545454"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 12.5L10 10M10 10L12.5 12.5M10 10V17.5"
        stroke="#545454"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ShareFilledIcon = ({
  size = 24,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 4.5H3.5C3.23478 4.5 2.98043 4.60536 2.79289 4.79289C2.60536 4.98043 2.5 5.23478 2.5 5.5V9.5C2.5 9.76522 2.60536 10.0196 2.79289 10.2071C2.98043 10.3946 3.23478 10.5 3.5 10.5H8.5C8.76522 10.5 9.01957 10.3946 9.20711 10.2071C9.39464 10.0196 9.5 9.76522 9.5 9.5V5.5C9.5 5.23478 9.39464 4.98043 9.20711 4.79289C9.01957 4.60536 8.76522 4.5 8.5 4.5H8M6 7V1.5M6 1.5L4.5 3M6 1.5L7.5 3"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ShareArrowIcon = ({ size = 20, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M10.9976 3.33325V6.66659C5.51839 7.52325 3.48089 12.3233 2.66422 16.6666C2.63339 16.8383 7.15089 11.6983 10.9976 11.6666V14.9999L17.6642 9.16659L10.9976 3.33325Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
