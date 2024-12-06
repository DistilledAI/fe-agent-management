import HeaderPrice from "./HeaderPrice"
import HeaderWallet from "./HeaderWallet"
import maxImg from "@assets/images/richoldman.png"

const HeaderBet = () => {
  return (
    <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:justify-start">
      <HeaderPrice />
      {/* <div className="rounded-[50px] bg-[#E4775D] p-[2px]"> */}
      <div className="box-noti-animated rounded-[50px] max-md:mt-3 max-md:w-full max-md:border-2">
        <div className="flex rounded-[50px] bg-[#1a131a] p-3 max-md:p-1">
          <div>
            <img
              src={maxImg}
              alt="Prediction by MAX"
              className="h-8 w-8 rounded-full max-md:h-6 max-md:w-6"
            />
          </div>
          <div className="ml-2 flex items-center text-[16px] font-medium text-[#E4775D] max-md:text-[14px]">
            <span>Prediction by MAX</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-1"
            >
              <path
                d="M3.5 8.375L8 12.875L12.5 8.375M8 12.25V3.125"
                stroke="#E4775D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="max-md:mt-2 max-md:w-full">
        <HeaderWallet />
      </div>
    </div>
  )
}

export default HeaderBet
