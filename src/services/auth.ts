import endpoint from "./endpoint"
import { fetchApi } from "./fetchApi"

export interface IDataSignatureAuth {
  data: {
    action: string
    publicAddress: string
    timestamp: number
  }
  signData: {
    signature: string
    publicKey: string
  }
  typeLogin: string
}

export const signatureAuth = async (data: IDataSignatureAuth) => {
  return fetchApi({
    method: "POST",
    url: endpoint.LOGIN,
    data,
  })
}

export const postCreateAnonymous = async () => {
  return fetchApi({
    method: "POST",
    url: endpoint.CREATE_ANONYMOUS,
  })
}
