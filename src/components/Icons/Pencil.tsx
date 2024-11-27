import { IconProps } from "types/icons"

export const PencilCogIcon = ({ size = 24, color = "#545454" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13.5 6.49981L17.5 10.4998M19.001 20.9998C18.4706 20.9998 17.9619 20.7891 17.5868 20.414C17.2117 20.039 17.001 19.5302 17.001 18.9998C17.001 18.4694 17.2117 17.9607 17.5868 17.5856C17.9619 17.2105 18.4706 16.9998 19.001 16.9998M19.001 20.9998C19.5314 20.9998 20.0401 20.7891 20.4152 20.414C20.7903 20.039 21.001 19.5302 21.001 18.9998C21.001 18.4694 20.7903 17.9607 20.4152 17.5856C20.0401 17.2105 19.5314 16.9998 19.001 16.9998M19.001 20.9998V22.4998M19.001 16.9998V15.4998M22.032 17.2498L20.733 17.9998M17.27 19.9998L15.97 20.7498M15.97 17.2498L17.27 17.9998M20.733 19.9998L22.033 20.7498M4 19.9998H8L18.5 9.49981C18.7626 9.23717 18.971 8.92537 19.1131 8.58221C19.2553 8.23905 19.3284 7.87125 19.3284 7.49981C19.3284 7.12838 19.2553 6.76058 19.1131 6.41742C18.971 6.07426 18.7626 5.76246 18.5 5.49981C18.2374 5.23717 17.9256 5.02883 17.5824 4.88669C17.2392 4.74455 16.8714 4.67139 16.5 4.67139C16.1286 4.67139 15.7608 4.74455 15.4176 4.88669C15.0744 5.02883 14.7626 5.23717 14.5 5.49981L4 15.9998V19.9998Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const CrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10 5L13.3333 10L17.5 6.66667L15.8333 15H4.16667L2.5 6.66667L6.66667 10L10 5Z"
        fill="#BCAA88"
      />
    </svg>
  )
}
