import { brainAIIcon } from "@assets/svg"
import { Image } from "@nextui-org/react"
import { IconProps } from "types/icons"

const BrainAIIcon = () => {
  return (
    <div className="h-14 w-14 rounded-full border border-mercury-900 bg-mercury-950 p-[6px]">
      <div className="flex h-full w-full items-center justify-center rounded-full border border-mercury-900 bg-white">
        <Image src={brainAIIcon} alt="brain AI icon" className="h-6 w-6" />
      </div>
    </div>
  )
}

export default BrainAIIcon

export const FilledBrainAIIcon = ({
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
        d="M8.44984 1.67163C9.039 1.67163 9.37484 2.2583 9.37484 2.84746V6.4583H8.629C8.48396 6.09974 8.21873 5.8028 7.87876 5.61835C7.53879 5.4339 7.14526 5.37344 6.7656 5.44732C6.38594 5.5212 6.0438 5.72483 5.79781 6.0233C5.55182 6.32178 5.4173 6.69652 5.4173 7.0833C5.4173 7.47008 5.55182 7.84482 5.79781 8.14329C6.0438 8.44177 6.38594 8.64539 6.7656 8.71927C7.14526 8.79316 7.53879 8.73269 7.87876 8.54825C8.21873 8.3638 8.48396 8.06685 8.629 7.7083H9.37484V16.79C9.37484 17.2866 9.16484 17.7808 8.72234 18.0066C8.32108 18.2168 7.87529 18.3276 7.42234 18.33C6.164 18.33 5.22817 17.6933 4.62567 16.94C4.20915 16.4196 3.91828 15.8102 3.77567 15.1591C3.38655 15.0442 3.02615 14.8483 2.71817 14.5841C2.1265 14.075 1.6665 13.2583 1.6665 12.055C1.6665 11.4258 1.7115 10.8775 1.82484 10.4166H5.33317C5.89817 10.4166 6.3665 10.8333 6.44567 11.3758C6.08852 11.5236 5.79382 11.7908 5.61202 12.1319C5.43022 12.473 5.37262 12.8667 5.44907 13.2455C5.52553 13.6244 5.73128 13.9649 6.03113 14.2088C6.33097 14.4527 6.70626 14.5848 7.09276 14.5825C7.47926 14.5802 7.85295 14.4436 8.14986 14.1962C8.44677 13.9487 8.64844 13.6058 8.72036 13.226C8.79229 12.8463 8.72999 12.4533 8.54412 12.1144C8.35826 11.7755 8.06039 11.5118 7.7015 11.3683C7.65773 10.7701 7.38921 10.2106 6.94989 9.80216C6.51058 9.39376 5.933 9.16671 5.33317 9.16663H2.53317C2.65772 9.06315 2.79668 8.97837 2.94567 8.91496C2.86055 8.60859 2.81078 8.29349 2.79734 7.9758C2.76984 7.3633 2.8615 6.7258 3.04317 6.1583C3.22317 5.59996 3.50817 5.0558 3.90817 4.67996C4.15843 4.43455 4.47661 4.26994 4.8215 4.20746C4.98734 3.50746 5.40984 2.92913 5.949 2.50996C6.6415 1.96996 7.549 1.67163 8.449 1.67163M10.6248 14.1666H11.9998C12.6297 14.1666 13.2338 13.9164 13.6792 13.471C14.1246 13.0256 14.3748 12.4215 14.3748 11.7916V10.2958C14.7334 10.1508 15.0303 9.88552 15.2148 9.54555C15.3992 9.20559 15.4597 8.81205 15.3858 8.43239C15.3119 8.05274 15.1083 7.71059 14.8098 7.4646C14.5114 7.21861 14.1366 7.08409 13.7498 7.08409C13.3631 7.08409 12.9883 7.21861 12.6898 7.4646C12.3914 7.71059 12.1877 8.05274 12.1139 8.43239C12.04 8.81205 12.1004 9.20559 12.2849 9.54555C12.4693 9.88552 12.7663 10.1508 13.1248 10.2958V11.7916C13.1248 12.09 13.0063 12.3761 12.7953 12.5871C12.5844 12.7981 12.2982 12.9166 11.9998 12.9166H10.6248V2.84746C10.6248 2.2583 10.9607 1.67163 11.5498 1.67163C12.4515 1.67163 13.3582 1.96996 14.0507 2.50996C14.5898 2.92913 15.0123 3.5083 15.1782 4.20746C15.5282 4.2658 15.8398 4.44413 16.0915 4.67996C16.4915 5.0558 16.7765 5.59913 16.9565 6.1583C17.1382 6.7258 17.2298 7.3633 17.2023 7.9758C17.1882 8.28913 17.1423 8.60913 17.054 8.91496L17.109 8.93996C17.4173 9.08496 17.6673 9.31246 17.854 9.61496C18.2082 10.1858 18.3332 11.0075 18.3332 12.055C18.3332 13.2591 17.8732 14.0766 17.2815 14.5841C16.9733 14.8484 16.6126 15.0443 16.2232 15.1591C16.0808 15.8101 15.7902 16.4195 15.374 16.94C14.7715 17.6933 13.8357 18.33 12.5765 18.33C12.1236 18.3279 11.6778 18.2173 11.2765 18.0075C10.8348 17.7808 10.6248 17.2866 10.6248 16.79V14.1666ZM6.6665 7.0833C6.6665 6.97279 6.7104 6.86681 6.78854 6.78867C6.86668 6.71053 6.97266 6.66663 7.08317 6.66663C7.19368 6.66663 7.29966 6.71053 7.3778 6.78867C7.45594 6.86681 7.49984 6.97279 7.49984 7.0833C7.49984 7.1938 7.45594 7.29979 7.3778 7.37793C7.29966 7.45607 7.19368 7.49996 7.08317 7.49996C6.97266 7.49996 6.86668 7.45607 6.78854 7.37793C6.7104 7.29979 6.6665 7.1938 6.6665 7.0833ZM7.08317 12.5C6.97266 12.5 6.86668 12.5439 6.78854 12.622C6.7104 12.7001 6.6665 12.8061 6.6665 12.9166C6.6665 13.0271 6.7104 13.1331 6.78854 13.2113C6.86668 13.2894 6.97266 13.3333 7.08317 13.3333C7.19368 13.3333 7.29966 13.2894 7.3778 13.2113C7.45594 13.1331 7.49984 13.0271 7.49984 12.9166C7.49984 12.8061 7.45594 12.7001 7.3778 12.622C7.29966 12.5439 7.19368 12.5 7.08317 12.5ZM13.3332 8.74996C13.3332 8.86047 13.3771 8.96645 13.4552 9.04459C13.5333 9.12273 13.6393 9.16663 13.7498 9.16663C13.8603 9.16663 13.9663 9.12273 14.0445 9.04459C14.1226 8.96645 14.1665 8.86047 14.1665 8.74996C14.1665 8.63946 14.1226 8.53348 14.0445 8.45534C13.9663 8.3772 13.8603 8.3333 13.7498 8.3333C13.6393 8.3333 13.5333 8.3772 13.4552 8.45534C13.3771 8.53348 13.3332 8.63946 13.3332 8.74996Z"
        fill={color}
      />
    </svg>
  )
}
