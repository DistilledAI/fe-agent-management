import { toast } from "react-toastify"
import { DESC_MAX_LENGTH } from "./GeneralInfo"

export const isPassRuleAgentInfo = (data: any) => {
  const isUsernameLengthPass =
    data["username"]?.length >= 4 && data["username"]?.length <= 30
  const isDescLengthPass = data["description"]?.length <= DESC_MAX_LENGTH
  if (!isUsernameLengthPass) {
    toast.warning("Agent name within 4-30 characters")
    return false
  }
  if (!isDescLengthPass) {
    toast.warning(`Agent description max ${DESC_MAX_LENGTH} characters`)
    return false
  }
  return true
}
