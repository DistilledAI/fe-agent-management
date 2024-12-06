export const EVENT = "event"
export const EVENT_CONFIG = "event_config"
export const BPS = 300 // fees per prediction event
export const MAX_ADDRESS_SOLANA = "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h"

// FIXME: fill addresses
export const PUBKEYS = {
  LOCALNET: {
    EVENT_AUTHORITY: "",
    CURRENCY_MINT: "",
    MODERATOR: "",
  },
  DEVNET: {
    EVENT_AUTHORITY: "TESTWf3pxDgZ7s8SeVBW19EkgiVbNCBze4KGQHNnHQh",
    CURRENCY_MINT: "EwGUjRyLVJ9Q8KY8kBmeAyhQAf4EcbGxrXsxexZaCGhM",
    MODERATOR: "4cSM2e6rvbGQUFiJbqytoVMi5GgghSMr8LwVrT9VPSPo",
  },
  MAINNET: {
    EVENT_AUTHORITY: "6WJ6YvAFBVVC41qt23Jb7mkaWdbsB1YgDy46aQLG1H49",
    CURRENCY_MINT: MAX_ADDRESS_SOLANA,
    MODERATOR: "FcfgHRQPs8ZNnNegVQpHcY1czcb9vgci2JNZpFaxoMQe",
  },
}
