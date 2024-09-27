import { IconProps } from "types/icons"

export const FilledSquareCircleIcon = ({
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
        d="M9.27667 2.08664L5.94333 7.91998C5.87095 8.04669 5.83311 8.1902 5.83361 8.33613C5.8341 8.48206 5.87291 8.6253 5.94614 8.75152C6.01938 8.87775 6.12448 8.98253 6.25093 9.05538C6.37737 9.12823 6.52073 9.1666 6.66667 9.16664H13.3333C13.4793 9.1666 13.6226 9.12823 13.7491 9.05538C13.8755 8.98253 13.9806 8.87775 14.0539 8.75152C14.1271 8.6253 14.1659 8.48206 14.1664 8.33613C14.1669 8.1902 14.129 8.04669 14.0567 7.91998L10.7233 2.08664C10.6504 1.95919 10.5451 1.85326 10.4181 1.77959C10.2911 1.70591 10.1468 1.66711 10 1.66711C9.85316 1.66711 9.70893 1.70591 9.5819 1.77959C9.45488 1.85326 9.34958 1.95919 9.27667 2.08664ZM14.1667 10.8333C14.8188 10.8333 15.4567 11.0246 16.0012 11.3836C16.5457 11.7425 16.973 12.2533 17.2301 12.8526C17.4872 13.452 17.5628 14.1136 17.4476 14.7555C17.3324 15.3974 17.0314 15.9914 16.5819 16.464C16.1324 16.9365 15.5542 17.2668 14.9188 17.414C14.2835 17.5612 13.6189 17.5187 13.0075 17.2919C12.396 17.0651 11.8645 16.6639 11.4788 16.138C11.0931 15.6121 10.8701 14.9847 10.8375 14.3333L10.8333 14.1666L10.8375 14C10.8803 13.1458 11.2497 12.3408 11.8693 11.7514C12.489 11.162 13.3115 10.8333 14.1667 10.8333ZM7.5 10.8333H4.16667C3.72464 10.8333 3.30072 11.0089 2.98816 11.3215C2.67559 11.634 2.5 12.0579 2.5 12.5V15.8333C2.5 16.2753 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H7.5C7.94203 17.5 8.36595 17.3244 8.67851 17.0118C8.99107 16.6993 9.16667 16.2753 9.16667 15.8333V12.5C9.16667 12.0579 8.99107 11.634 8.67851 11.3215C8.36595 11.0089 7.94203 10.8333 7.5 10.8333Z"
        fill={color}
      />
    </svg>
  )
}
