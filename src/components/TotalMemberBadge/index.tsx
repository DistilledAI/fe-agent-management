import { FilledUserIcon } from "@components/Icons/UserIcon"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { shortenNumber } from "@utils/index"
import { getTotalMemberGroup } from "services/group"
import { QueryDataKeys } from "types/queryDataKeys"

interface TotalMemberBadgeProps {
  groupId: string
  isQuery?: boolean
}

const TotalMemberBadge = ({ groupId }: TotalMemberBadgeProps) => {
  const queryClient = useQueryClient()
  const totalMemberCached = queryClient.getQueryData([
    QueryDataKeys.TOTAL_MEMBER_GROUP,
    groupId,
  ])
  const { data } = useQuery({
    queryKey: [QueryDataKeys.TOTAL_MEMBER_GROUP, groupId],
    queryFn: () => getTotalMemberGroup(Number(groupId)),
    enabled: !!groupId && !totalMemberCached,
  })

  return (
    <div className="flex h-fit w-fit min-w-[18px] items-center rounded-full bg-[#FF3B30] px-[5px] py-[1px]">
      <FilledUserIcon size={12} color="#FFFFFF" />
      <span className="text-13 font-medium leading-[140%] text-white">
        {shortenNumber(Number(data?.total) || 0)}
      </span>
    </div>
  )
}

export default TotalMemberBadge
