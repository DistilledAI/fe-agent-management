export const CopyIcon = ({
  size = 20,
  color = "#676767",
}: {
  size?: number
  color?: string
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.83337 8.056C5.83337 7.46655 6.06753 6.90125 6.48433 6.48445C6.90113 6.06765 7.46643 5.8335 8.05587 5.8335H15.2775C15.5694 5.8335 15.8584 5.89098 16.1281 6.00267C16.3977 6.11437 16.6427 6.27807 16.8491 6.48445C17.0555 6.69083 17.2192 6.93584 17.3309 7.20548C17.4426 7.47513 17.5 7.76413 17.5 8.056V15.2777C17.5 15.5695 17.4426 15.8585 17.3309 16.1282C17.2192 16.3978 17.0555 16.6428 16.8491 16.8492C16.6427 17.0556 16.3977 17.2193 16.1281 17.331C15.8584 17.4427 15.5694 17.5002 15.2775 17.5002H8.05587C7.76401 17.5002 7.47501 17.4427 7.20536 17.331C6.93571 17.2193 6.69071 17.0556 6.48433 16.8492C6.27795 16.6428 6.11424 16.3978 6.00255 16.1282C5.89086 15.8585 5.83337 15.5695 5.83337 15.2777V8.056Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.34333 13.9475C3.0875 13.8021 2.87471 13.5916 2.72658 13.3374C2.57846 13.0832 2.50028 12.7942 2.5 12.5V4.16667C2.5 3.25 3.25 2.5 4.16667 2.5H12.5C13.125 2.5 13.465 2.82083 13.75 3.33333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
