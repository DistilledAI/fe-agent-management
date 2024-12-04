import { starIcon } from "@assets/svg"

export const CalculatingCardContent = ({ roundItem }: { roundItem: any }) => {
  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      <div
        className={
          "mb-4 flex h-[260px] flex-col items-center justify-center rounded-lg bg-[#080A14] p-4"
        }
      >
        <img
          src={starIcon}
          alt="starImg"
          className="animate-infinite animate-delay-200 h-8 w-8 animate-spin"
        />
        <span className="mt-4 text-[16px] font-medium uppercase text-[#E8E9EE]">
          Calculating
        </span>
        <span className="mt-2 text-center text-[13px] font-medium text-[#585A6B]">
          Transaction submitted to the
          <br />
          blockchain, awaiting confirmation
        </span>
      </div>
    </div>
  )
}
