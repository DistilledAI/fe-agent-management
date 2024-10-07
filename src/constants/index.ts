export const PATH_NAMES = {
  HOME: "/",
  LLM: "/chatbot",
  CHAT: "/chat",
  CHAT_DETAIL: "/chat/:chatId",
  INVITE: "/invite",
}

export const MIX_PANEL_TRACK_EVENT = {
  OPEN_WIDGET: "Open_Widget",
  CLOSE_WIDGET: "Close_Widget",
  SEND_MESSAGE_WIDGET: "Send_Message_Widget",
}

export const SITE_LLM_SUPPORTED = {
  LAYER: "layer",
  ORAI: "orai",
  ORAIDEX: "oraidex",
}

export const DISTILLED_AI_URL = "https://distilled.ai/"

export enum RoleUser {
  ADMIN = 1,
  USER = 2,
  BANNED = 3,
  BOT = 4,
  SUPER_ADMIN = 10,
}
