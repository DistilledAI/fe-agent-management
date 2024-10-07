import { PATH_NAMES } from "@constants/index"
import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { checkGroupDirect, createGroupChat } from "services/chat"
import useAuthState from "./useAuthState"

const useInviteUser = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { pathname } = useLocation()
  const { user, isLogin } = useAuthState()
  const userId = Number(params?.userId)

  const handleInviteUser = async () => {
    try {
      const checkGroupDirectResponse = await checkGroupDirect({
        members: [userId],
      })
      const groupId = checkGroupDirectResponse?.data?.group?.id
      if (!groupId) {
        const createGroupResponse = await createGroupChat({
          members: [userId],
        })
        const newGroupId = createGroupResponse?.data?.id
        if (newGroupId) {
          navigate(`${PATH_NAMES.CHAT}/${newGroupId}?isInvited=true`)
        }
        return
      }
      navigate(`${PATH_NAMES.CHAT}/${groupId}?isInvited=true`)
    } catch (error) {
      console.log("error", error)
      navigate(`/${PATH_NAMES.CHAT}`)
    }
  }

  useEffect(() => {
    if (
      pathname === `${PATH_NAMES.INVITE}/${userId}` &&
      user?.id !== userId &&
      isLogin
    ) {
      handleInviteUser()
    }
  }, [pathname, userId, user?.id, isLogin])

  return {}
}

export default useInviteUser
