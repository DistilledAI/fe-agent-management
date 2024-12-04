import base58 from "bs58";

export const EVENT = "event";
export const EVENT_CONFIG = "event_config";
export const BPS = 300; // fees per prediction event
// FIXME: fill addresses
export const PUBKEYS = {
  LOCALNET: {
    EVENT_AUTHORITY: "",
    CURRENCY_MINT: "",
    PYTH_FEED: "",
  },
  DEVNET: {
    EVENT_AUTHORITY: "TESTWf3pxDgZ7s8SeVBW19EkgiVbNCBze4KGQHNnHQh",
    CURRENCY_MINT: "EwGUjRyLVJ9Q8KY8kBmeAyhQAf4EcbGxrXsxexZaCGhM",
    PYTH_FEED: "4cSM2e6rvbGQUFiJbqytoVMi5GgghSMr8LwVrT9VPSPo",
  },
  MAINNET: {
    EVENT_AUTHORITY: "",
    CURRENCY_MINT: "",
    PYTH_FEED: "",
  },
};
