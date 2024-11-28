export const Indicator = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="40"
      viewBox="0 0 26 40"
      fill="none"
    >
      <rect x="0.5" y="20" width="26" height="20" fill="#363636" />
      <rect
        width="26"
        height="20"
        transform="matrix(1 0 0 -1 0.5 20)"
        fill="#363636"
      />
      <path
        d="M0.5 40C0.5 28.9543 9.45431 20 20.5 20H26.5V40H0.5Z"
        fill="white"
      />
      <path
        d="M0.5 0C0.5 11.0457 9.45431 20 20.5 20H26.5V0H0.5Z"
        fill="white"
      />
    </svg>
  )
}
