const withBaseURL = (path: string) =>
  `${import.meta.env.VITE_BASE_API_URL}${path}`

const endpoint = {
  LOGIN: withBaseURL("/user/login"),
}

export default endpoint
