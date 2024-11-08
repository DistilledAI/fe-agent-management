export const PATH_NAMES = {
  HOME: "/",
  LLM: "/chatbot",
  CHAT: "/chat",
  LIVE: "/live",
  CHAT_DETAIL: "/chat/:chatId",
  INVITE: "/invite",
  NOT_FOUND: "/not-found",
  PRIVATE_AGENT: "/private-agent",
  MARKETPLACE: "/marketplace",
  MY_DATA: "/my-data",
  ADD_MY_DATA: "/add-my-data",
  ACCOUNT: "/account",
  AUTHOR_PROFILE: "/author",
  AGENT_DETAIL: "/agent",
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
  ANONYMOUS = 5,
  SUPER_ADMIN = 10,
}

export enum Publish {
  Published = 1,
  Unpublished = 0,
}

export const STATUS_AGENT = {
  ACTIVE: 1,
  SUSPENDED: 2,
  DELETED: 3,
  PENDING: 4,
}

export enum TYPE_BOT {
  VOICE = 2,
}

export const ACTIVE_COLORS = [
  {
    bgColor: "bg-lgd-code-agent-1",
    borderColor: "border-code-agent-1",
    textColor: "text-code-agent-1",
  },
  {
    bgColor: "bg-lgd-code-agent-2",
    borderColor: "border-code-agent-2",
    textColor: "text-code-agent-2",
  },
  {
    bgColor: "bg-lgd-code-agent-3",
    borderColor: "border-code-agent-3",
    textColor: "text-code-agent-3",
  },
  {
    bgColor: "bg-lgd-code-agent-4",
    borderColor: "border-code-agent-4",
    textColor: "text-code-agent-4",
  },
  {
    bgColor: "bg-lgd-code-agent-5",
    borderColor: "border-code-agent-5",
    textColor: "text-code-agent-5",
  },
  {
    bgColor: "bg-lgd-code-agent-6",
    borderColor: "border-code-agent-6",
    textColor: "text-code-agent-6",
  },
  {
    bgColor: "bg-lgd-code-agent-7",
    borderColor: "border-code-agent-7",
    textColor: "text-code-agent-7",
  },
]

export const MAP_DISPLAY_FROM_STATUS_MY_AGENT = {
  [STATUS_AGENT.PENDING]: {
    label: "Awaiting creation",
    color: "#FF9500",
  },
  [STATUS_AGENT.ACTIVE]: {
    label: "Active",
    color: "#34C759",
  },
}
