import { IconProps } from "types/icons"

export const FilledWindowIcon = ({
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
        d="M15.8334 3.33331C16.4965 3.33331 17.1323 3.59671 17.6012 4.06555C18.07 4.53439 18.3334 5.17027 18.3334 5.83331V14.1666C18.3334 14.8297 18.07 15.4656 17.6012 15.9344C17.1323 16.4033 16.4965 16.6666 15.8334 16.6666H4.16675C3.50371 16.6666 2.86782 16.4033 2.39898 15.9344C1.93014 15.4656 1.66675 14.8297 1.66675 14.1666V5.83331C1.66675 5.17027 1.93014 4.53439 2.39898 4.06555C2.86782 3.59671 3.50371 3.33331 4.16675 3.33331H15.8334ZM5.00842 5.83331L4.90258 5.83915C4.69167 5.86423 4.49829 5.96891 4.36197 6.13179C4.22564 6.29466 4.15666 6.50345 4.1691 6.71548C4.18155 6.92752 4.27449 7.1268 4.42894 7.27261C4.58339 7.41841 4.78768 7.49974 5.00008 7.49998L5.10591 7.49415C5.31683 7.46906 5.5102 7.36438 5.64653 7.20151C5.78285 7.03863 5.85184 6.82984 5.83939 6.61781C5.82694 6.40577 5.734 6.20649 5.57956 6.06069C5.42511 5.91488 5.22081 5.83355 5.00842 5.83331ZM7.50842 5.83331L7.40258 5.83915C7.19167 5.86423 6.99829 5.96891 6.86197 6.13179C6.72564 6.29466 6.65666 6.50345 6.6691 6.71548C6.68155 6.92752 6.77449 7.1268 6.92894 7.27261C7.08339 7.41841 7.28768 7.49974 7.50008 7.49998L7.60591 7.49415C7.81683 7.46906 8.0102 7.36438 8.14653 7.20151C8.28285 7.03863 8.35184 6.82984 8.33939 6.61781C8.32694 6.40577 8.234 6.20649 8.07956 6.06069C7.92511 5.91488 7.72081 5.83355 7.50842 5.83331Z"
        fill={color}
      />
    </svg>
  )
}
