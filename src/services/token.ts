const getLocalToken = (): {
  accessToken: string
  refreshToken: string
  expireAt: number
} | null => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return user?.token || null
  } catch (err) {
    return null
  }
}

const getLocalAccessToken = (): string | null => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return user?.token?.accessToken || null
  } catch (err) {
    return null
  }
}

const updateLocalAccessToken = (token: string): void => {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const newUser = {
    ...user,
    token: {
      ...user.token,
      access_token: token,
    },
  }
  localStorage.setItem("user", JSON.stringify(newUser))
}

const updateLocalRefreshToken = (refreshToken: string): void => {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const newUser = {
    ...user,
    token: {
      ...user.token,
      refreshToken,
    },
  }
  localStorage.setItem("user", JSON.stringify(newUser))
}

const updateLocalNewToken = (newToken: {
  access_token: string
  refreshToken: string
  expires_in: number
}): void => {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const newUser = {
    ...user,
    token: {
      ...user.token,
      ...newToken,
    },
  }
  localStorage.setItem("user", JSON.stringify(newUser))
}

export const getUserLocal = () => {
  if (typeof window !== "undefined") {
    let user
    try {
      user = JSON.parse(localStorage.getItem("user") || "{}")
    } catch (error) {
      user = {}
    }
    return user
  }
  return {}
}

export const getReferralInfoLocal = () => {
  if (typeof window !== "undefined") {
    let referralInfo
    try {
      referralInfo = JSON.parse(localStorage.getItem("referralInfo") || "{}")
    } catch (error) {
      referralInfo = {}
    }
    return referralInfo
  }
  return {}
}

const setUserLocal = (user: any): void => {
  localStorage.setItem("user", JSON.stringify(user))
}

const setReferralInfoLocal = (referralInfo: any): void => {
  localStorage.setItem("referralInfo", JSON.stringify(referralInfo))
}

const removeUserLocal = (): void => {
  localStorage.removeItem("user")
}

const TokenService = {
  getLocalToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
  updateLocalNewToken,
  getUserLocal,
  setUserLocal,
  setReferralInfoLocal,
  getReferralInfoLocal,
  removeUserLocal,
}

export default TokenService
