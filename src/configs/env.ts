export const envConfig = {
  baseApiUrl: import.meta.env.VITE_BASE_API_URL,
  socketUrl: import.meta.env.VITE_SOCKET_URL,
  groupDefaultForPrivateAgent: import.meta.env
    .VITE_GROUP_DEFAULT_FOR_PRIVATE_AGENT,
  groupIdMax: import.meta.env.VITE_IS_STAGING ? 98 : 1177,
}
