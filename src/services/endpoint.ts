import { envConfig } from "@configs/env"

const withBaseURL = (path: string) => `${envConfig.baseApiUrl}${path}`

const endpoint = {
  LOGIN: withBaseURL("/user/login"),
  GET_USER: withBaseURL("/user/detail"),
}

export default endpoint
