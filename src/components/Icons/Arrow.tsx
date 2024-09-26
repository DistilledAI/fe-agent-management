import { BgIconProps } from "types/icons";

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
  );
};
