export const storageKey = {
  ACCESS_TOKEN: "accessToken",
}

const cachedLocalStorage = {
  setWithExpiry: (key: string, value: unknown, ttl?: number) => {
    if (typeof window === "undefined") return

    const item = {
      value,
      ...{ expiry: ttl },
    }

    localStorage.setItem(key, JSON.stringify(item))
  },

  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return
    localStorage.setItem(key, value)
  },

  removeItem: (key: string) => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },

  getItem: (key: string) => {
    if (typeof window === "undefined") return
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
      return null
    }

    return itemStr
  },

  getWithExpiry: (key: string) => {
    if (typeof window === "undefined") return
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  },

  getAllWithExpiry: (key: string) => {
    if (typeof window === "undefined") return
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item
  },
}

export default cachedLocalStorage
