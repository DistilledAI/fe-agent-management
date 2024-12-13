import { ReactionTypes } from "types/reactions"
import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

interface ReactionMsg {
  msgId: number | string
  groupId: number | string
  reactionType: ReactionTypes
}

export const postReactionMsg = async ({
  msgId,
  groupId,
  reactionType,
}: ReactionMsg) => {
  return fetchApiAuth({
    method: "POST",
    url: endpoint.POST_REACTION_MESSAGE,
    data: {
      msgId,
      groupId,
      reactionType,
    },
  })
}
