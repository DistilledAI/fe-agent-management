import { PATH_NAMES, RoleUser } from "@constants/index"
import useFetchGroups from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { IUser, loginSuccessByAnonymous } from "@reducers/userSlice"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { postCreateAnonymous } from "services/auth"
import { inviteUserJoinGroup } from "services/chat"
import { useAppDispatch } from "./useAppRedux"
import useAuthState from "./useAuthState"

const useJoinGroupLive = () => {
  const { pathname, state } = useLocation()
  const { chatId, originalChatId } = useGetChatId()
  const isInvitePathName = pathname === `${PATH_NAMES.CLAN}/${originalChatId}`
  const { isLogin, user } = useAuthState()
  const dispatch = useAppDispatch()
  const [isLogged, setIsLogged] = useState(false)
  const isAnonymous = user?.role === RoleUser.ANONYMOUS
  const { fetchGroups } = useFetchGroups()
  const navigate = useNavigate()
  const [isInvited, setIsInvited] = useState(false)

  useEffect(() => {
    if (!isAnonymous) setIsLogged(false)
  }, [isAnonymous])

  const joinGroupLive = async (user: IUser, accessToken: string = "") => {
    setIsInvited(false)
    const groupId = chatId
    const payload = {
      groupId,
      member: [user?.id],
    } as any
    const headers = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {}
    const res = await inviteUserJoinGroup(payload, headers)
    navigate(`${PATH_NAMES.CLAN}/${res?.data?.group?.label}`)
    setIsInvited(true)
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
        setIsLogged(true)
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
        chatId &&
        isInvitePathName &&
        user?.id &&
        !isLogged &&
        isLogin &&
        !state?.isGroupJoined

      if (isJoinLiveLogged) {
        await joinGroupLive(user)
        fetchGroups()
      }
    })()
  }, [isInvitePathName, chatId, isLogin, isLogged, state?.isGroupJoined])

  return { isInvited }
}

export default useJoinGroupLive
