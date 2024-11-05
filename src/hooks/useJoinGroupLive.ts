import { PATH_NAMES } from "@constants/index"
import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { envConfig } from "@configs/env"
import { inviteUserJoinGroup } from "services/chat"
import useAuthState from "./useAuthState"
import { postCreateAnonymous } from "services/auth"
import { IUser, loginSuccessByAnonymous } from "@reducers/userSlice"
import { useAppDispatch } from "./useAppRedux"
import useFetchGroups from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"

const useJoinGroupLive = () => {
  const { pathname } = useLocation()
  const { chatId } = useParams()
  const isInvitePathName = pathname === `${PATH_NAMES.CHAT_LIVE}/${chatId}`
  const { isLogin, user } = useAuthState()
  const dispatch = useAppDispatch()
  const [isAnonymous, setIsAnonymous] = useState(false)
  const { fetchGroups } = useFetchGroups()

  const joinGroupLive = async (user: IUser, accessToken: string = "") => {
    const groupId = chatId || envConfig.groupIdMax
    const payload = {
      groupId,
      member: [user?.id],
    }
    const headers = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {}
    const res = await inviteUserJoinGroup(payload, headers)
    return !!res.data
  }

  const anonymousJoinGroupLive = async () => {
    const res = await postCreateAnonymous()
    const accessToken = res.data?.accessToken
    const userAnonymous = res.data?.user
    const expiry = Date.now() + 24 * 60 * 60 * 1000

    if (userAnonymous) {
      const isJoined = await joinGroupLive(userAnonymous, accessToken)
      if (isJoined) {
        setIsAnonymous(true)
        setTimeout(async () => {
          await dispatch(
            loginSuccessByAnonymous({
              user: userAnonymous,
              accessToken,
              expiry,
            }),
          )
          fetchGroups()
        }, 1)
      }
    }
  }

  useEffect(() => {
    // anonymous join group live
    ;(async () => {
      if (chatId && isInvitePathName && !isLogin) {
        anonymousJoinGroupLive()
      }
    })()
  }, [isInvitePathName, chatId, isLogin])

  useEffect(() => {
    // user join group live
    ;(async () => {
      const isJoinLiveLogged =
        chatId && isInvitePathName && user?.id && !isAnonymous && isLogin

      if (isJoinLiveLogged) {
        await joinGroupLive(user)
        fetchGroups()
      }
    })()
  }, [isInvitePathName, chatId, user?.id, isAnonymous, isLogin])

  return {}
}

export default useJoinGroupLive
