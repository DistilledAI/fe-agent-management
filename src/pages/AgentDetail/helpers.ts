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

export const getConfigAgentByDataForm = (data: any) => {
  const LIST_KEYS = [
    "customization_instruction",
    "audience_profile",
    "interaction_frequency",
    "knowledge_domain",
    "prohibited_topics",
    "response_length",
    "sample_prompts",
    "tone_adaptation",
  ]
  return Object.entries(data)
    .map(([key, val]) => ({ key, value: val ? val.toString() : "" }))
    .filter((item) => LIST_KEYS.includes(item.key))
}
