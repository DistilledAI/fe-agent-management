const withBaseURL = (path: string) =>
  `${import.meta.env.VITE_BASE_API_URL}${path}`

const endpoint = {
  LOGIN: withBaseURL("/user/login"),
  GET_USER: withBaseURL("/user/detail"),
}

export default endpoint
