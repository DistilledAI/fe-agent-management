import HowToEarnEXP from "./HowToEarnEXP"
import { twMerge } from "tailwind-merge"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import RankExpList from "./RankExpList"

const LeaderboardClan = () => {
  const { data: isLeaderboard } = useQuery<boolean>({
    queryKey: [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
  })

  return (
    <div
      className={twMerge(
        "fixed inset-y-6 right-0 z-50 w-full max-w-[380px] translate-x-[100%] overflow-hidden rounded-bl-[22px] rounded-tl-[22px] border border-mercury-100 bg-mercury-30 opacity-0 shadow-9 transition-all duration-300 ease-in-out",
        isLeaderboard && "translate-x-0 opacity-100",
      )}
    >
      <HowToEarnEXP />
      <RankExpList />
    </div>
  )
}

export default LeaderboardClan
