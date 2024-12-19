const urlStaging = ["mesh-distilled-ai-dev.web.app", "localhost:5173"]

export const envConfig = {
  solanaRpc: import.meta.env.VITE_SOLANA_RPC,
  solanaWs: import.meta.env.VITE_SOLANA_WS,
  baseApiUrl: import.meta.env.VITE_BASE_API_URL,
  predictionApiUrl: import.meta.env.VITE_BASE_PREDICTION_API_URL,
  socketUrl: import.meta.env.VITE_SOCKET_URL,
  groupDefaultForPrivateAgent: import.meta.env
    .VITE_GROUP_DEFAULT_FOR_PRIVATE_AGENT,
  groupIdMax: urlStaging.includes(window.location.host) ? 98 : 1177,
}
