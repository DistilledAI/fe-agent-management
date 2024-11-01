import { PATH_NAMES } from "@constants/index"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { loginSuccessByAnonymous } from "@reducers/userSlice"
import { useQueryClient } from "@tanstack/react-query"
import { ConfigBotType } from "@types"
import { cachedSessionStorage, storageKey } from "@utils/storage"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { postCreateAnonymous } from "services/auth"
import { createGroupChat } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import useAuthState from "./useAuthState"
import useWindowSize from "./useWindowSize"

const useInviteUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { isMobile } = useWindowSize()
  const params = useParams()
  const { pathname } = useLocation()
  const { user, isLogin } = useAuthState()
  const userId = Number(params?.inviteUserId)
  const isInvitePathName = pathname === `${PATH_NAMES.INVITE}/${userId}`
  const sessionAccessToken = cachedSessionStorage.getWithExpiry(
    storageKey.ACCESS_TOKEN,
  )

  const handleInviteUserLoggedIn = async (userId: number) => {
    try {
      const createGroupResponse = await createGroupChat({
        members: [userId],
      })
      const newData = createGroupResponse.data
      if (newData && isMobile)
        queryClient.setQueryData(
          [QueryDataKeys.MY_LIST_CHAT],
          (oldData: UserGroup[]) => {
            return [newData].concat(oldData ?? [])
          },
        )
      const newGroupId = newData?.groupId
      if (newGroupId) {
        const configBot = newData?.group?.userB?.configBot
        if (configBot === ConfigBotType.LIVE) {
          return navigate(
            `${PATH_NAMES.CHAT_LIVE}/${newGroupId}?isInvited=true`,
          )
        }
        return navigate(`${PATH_NAMES.CHAT}/${newGroupId}?isInvited=true`)
      } else {
        navigate(PATH_NAMES.HOME)
      }
      // }

      // navigate(`${PATH_NAMES.CHAT}/${groupId}`)
    } catch (error) {
      console.log("error", error)
      navigate(PATH_NAMES.HOME)
    }
  }

  const handleInviteAnonymous = async () => {
    try {
      const res = await postCreateAnonymous()
      const accessToken = res.data?.accessToken
      const userAnonymous = res.data?.user
      const expiry = Date.now() + 24 * 60 * 60 * 1000

      if (accessToken && userAnonymous) {
        dispatch(
          loginSuccessByAnonymous({
            user: userAnonymous,
            accessToken,
            expiry,
          }),
        )
      } else {
        console.log("Access token not found in response")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    const isAnonymous = isInvitePathName && !isLogin && !sessionAccessToken
    if (isAnonymous) {
      handleInviteAnonymous()
    }
  }, [isInvitePathName, isLogin, sessionAccessToken])

  useEffect(() => {
    const isRealUser =
      isInvitePathName && user?.id !== userId && isLogin && !sessionAccessToken
    if (isRealUser) {
      handleInviteUserLoggedIn(userId)
    }
  }, [isInvitePathName, userId, user?.id, isLogin, sessionAccessToken])

  useEffect(() => {
    const isAnonymousLogged =
      sessionAccessToken && isLogin && isInvitePathName && userId
    if (isAnonymousLogged) handleInviteUserLoggedIn(userId)
  }, [userId, sessionAccessToken, isLogin, isInvitePathName])

  return { handleInviteUserLoggedIn, handleInviteAnonymous }
}

export default useInviteUser
