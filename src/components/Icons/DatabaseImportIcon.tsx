import { IconProps } from "types/icons"

export const DatabaseImportIcon = ({
  size = 24,
  color = "#A2845E",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 24"
      fill="none"
    >
      <g clipPath="url(#clip0_937_5444)">
        <path
          d="M4.17627 6C4.17627 7.657 7.54756 9 11.7057 9C15.8638 9 19.2351 7.657 19.2351 6C19.2351 4.343 15.8638 3 11.7057 3C7.54756 3 4.17627 4.343 4.17627 6Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.17627 6V12C4.17627 13.657 7.54756 15 11.7057 15C12.5113 15 13.2869 14.95 14.0153 14.856M19.2351 12V6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.17627 12V18C4.17627 19.657 7.54756 21 11.7057 21C11.8663 21 12.0263 20.998 12.1857 20.994M18.2939 22V16M18.2939 16L21.1174 19M18.2939 16L15.4704 19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_937_5444">
          <rect
            width="22.5882"
            height="24"
            fill="white"
            transform="translate(0.411621)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
