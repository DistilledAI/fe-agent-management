import endpoint from "./endpoint"
import { fetchApiAuth } from "./fetchApi"

export const getPredictHistory = async () => {
  return fetchApiAuth({
    method: "get",
    url: endpoint.GET_PREDICT_HISTORY,
  })
}
