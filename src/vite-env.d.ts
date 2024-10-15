/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CHATBOT_URL: string
  readonly VITE_APP_ENV_MODE: string
  readonly VITE_APP_SIGNING_SECRET: string
  readonly VITE_APP_BASE_LLM_URL: string
  readonly VITE_APP_MIXPANEL_TOKEN: string

  readonly VITE_COMMIT_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
