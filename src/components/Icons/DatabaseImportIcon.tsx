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

export const DatabaseSearchIcon = ({
  size = 20,
  color = "#545454",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M3.33301 5C3.33301 6.38083 6.31801 7.5 9.99967 7.5C13.6813 7.5 16.6663 6.38083 16.6663 5C16.6663 3.61917 13.6813 2.5 9.99967 2.5C6.31801 2.5 3.33301 3.61917 3.33301 5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 5V10C3.33301 11.3808 6.31801 12.5 9.99967 12.5M16.6663 9.58333V5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 10V15C3.33301 16.3808 6.31801 17.5 9.99967 17.5M16.833 16.8333L18.333 18.3333M12.4997 15C12.4997 15.663 12.7631 16.2989 13.2319 16.7678C13.7007 17.2366 14.3366 17.5 14.9997 17.5C15.6627 17.5 16.2986 17.2366 16.7674 16.7678C17.2363 16.2989 17.4997 15.663 17.4997 15C17.4997 14.337 17.2363 13.7011 16.7674 13.2322C16.2986 12.7634 15.6627 12.5 14.9997 12.5C14.3366 12.5 13.7007 12.7634 13.2319 13.2322C12.7631 13.7011 12.4997 14.337 12.4997 15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
