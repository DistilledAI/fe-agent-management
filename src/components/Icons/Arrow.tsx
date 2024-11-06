import { BgIconProps, IconProps } from "types/icons"

export const ArrowUpFilledIcon = ({
  size = 20,
  color = "#545454",
  bgColor = "#FAFAFA",
}: BgIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_215_2516"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={size}
        height={size}
      >
        <path
          d="M10 4.16675V15.8334M10 4.16675L15 9.16675M10 4.16675L5 9.16675"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_215_2516)">
        <rect width={size} height={size} fill={bgColor} />
      </g>
    </svg>
  )
}

export const ArrowLeftFilledIcon = ({
  size = 20,
  color = "#676767",
}: BgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M7.97508 4.94141L2.91675 9.99974L7.97508 15.0581"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0834 10H3.05835"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowBottomSquareOutlineIcon = ({
  size = 12,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M4 6L6 8M6 8L8 6M6 8V4"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowsSort = ({ size = 21, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M3 7.49984L6.33333 4.1665M6.33333 4.1665L9.66667 7.49984M6.33333 4.1665V15.8332M18 12.4998L14.6667 15.8332M14.6667 15.8332L11.3333 12.4998M14.6667 15.8332V4.1665"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowsBarToUpIcon = ({
  size = 24,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M12.5 10.5V20.5M12.5 10.5L16.5 14.5M12.5 10.5L8.5 14.5M4.5 4.5H20.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
