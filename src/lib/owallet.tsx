import { OfflineSigner } from "@cosmjs/proto-signing"
import { Keplr as keplr, Key } from "@keplr-wallet/types"
import {
  CosmosChainId,
  network,
  NetworkChainId,
  WalletType,
} from "@oraichain/oraidex-common"

export default class Owallet {
  async createCosmosSigner(chainId: CosmosChainId): Promise<OfflineSigner> {
    const owallet = await this.getOwallet()
    if (owallet) return await owallet.getOfflineSignerAuto(chainId)
    throw new Error(
      "You have to install Cosmos wallet first if you do not use a mnemonic to sign transactions",
    )
  }

  typeWallet: WalletType
  constructor(type: WalletType | "keplr") {
    this.typeWallet = type
  }

  disconnect() {}

  // priority with owallet
  private get owallet(): keplr {
    switch (this.typeWallet) {
      case "owallet":
        //@ts-ignore
        return window.owallet

      default:
        //@ts-ignore
        return window.keplr
    }
  }

  public getFixedAminoSignDoc(signer: string, data: any): Object {
    return {
      chain_id: "",
      account_number: "0",
      sequence: "0",
      fee: {
        gas: "0",
        amount: [],
      },
      msgs: [
        {
          type: "sign/MsgSignData",
          value: {
            data,
            signer,
          },
        },
      ],
      memo: "",
    }
  }

  async getChainInfosWithoutEndpoints(): Promise<any> {
    const isOwallet = await this.getOwallet()
    if (isOwallet) return this.owallet.getChainInfosWithoutEndpoints()
  }

  async getOwallet(): Promise<any | undefined> {
    if (document.readyState === "complete") {
      return this.owallet
    }

    return new Promise((resolve) => {
      const documentStateChange = (event: Event) => {
        if (
          event.target &&
          (event.target as Document).readyState === "complete"
        ) {
          resolve(this.owallet)
          document.removeEventListener("readystatechange", documentStateChange)
        }
      }

      document.addEventListener("readystatechange", documentStateChange)
    })
  }

  async getOwalletKey(chainId?: string): Promise<Key | undefined> {
    try {
      chainId = chainId ?? network.chainId
      if (!chainId) return undefined

      const owallet = await this.getOwallet()
      return owallet.getKey(chainId)
    } catch (error) {
      console.log(
        "🚀 ~ file: owallet.ts:112 ~ owallet ~ getOwalletKey ~ error:",
        error,
      )
    }
  }

  async getOwalletAddr(chainId?: NetworkChainId): Promise<string | undefined> {
    // not support network.chainId (Oraichain)
    chainId = chainId ?? network.chainId
    try {
      const isEnableOwallet = await this.getOwallet()
      if (isEnableOwallet) {
        if (!this.owallet) throw new Error("Error: get window cosmos!")
        //@ts-ignore
        const { bech32Address } = await this.getOwalletKey(chainId)
        if (!bech32Address) throw Error("Not found address from owallet!")
        return bech32Address
      }
      return undefined
    } catch (ex) {
      console.log(ex, chainId)
    }
  }
}
