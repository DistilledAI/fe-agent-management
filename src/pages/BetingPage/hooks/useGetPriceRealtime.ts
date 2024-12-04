import {
  getPythClusterApiUrl,
  getPythProgramKeyForCluster,
  PriceStatus,
  PythCluster,
  PythConnection,
} from "@pythnetwork/client"
import { Connection } from "@solana/web3.js"
import BigNumber from "bignumber.js"
// import {
//   getPythClusterApiUrl,
//   getPythProgramKeyForCluster,
//   PythCluster,
//   PriceStatus,
//   PythConnection,
// } from ""
import { useEffect, useState } from "react"

const PYTHNET_CLUSTER_NAME: PythCluster = "pythnet"
const connection = new Connection(getPythClusterApiUrl(PYTHNET_CLUSTER_NAME))
const pythPublicKey = getPythProgramKeyForCluster(PYTHNET_CLUSTER_NAME)

const useGetPriceRealtime = () => {
  const [price, setPrice] = useState<string>()
  const [priceChange, setPriceChange] = useState<string>()
  const [priceChangePercent, setPriceChangePercent] = useState<string>()
  //   const BTC_PRICE_ID =
  //     "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"

  useEffect(() => {
    const pythConnection = new PythConnection(connection, pythPublicKey)
    pythConnection.onPriceChangeVerbose(
      (productAccount: any, priceAccount: any) => {
        // The arguments to the callback include solana account information / the update slot if you need it.
        const product = productAccount.accountInfo.data.product
        const price = priceAccount.accountInfo.data

        if (product.symbol === "Crypto.BTC/USD") {
          // sample output:
          // SOL/USD: $14.627930000000001 ±$0.01551797
          if (price.price && price.confidence) {
            // tslint:disable-next-line:no-console
            // console.log("price", price)
            const { previousPrice, price: currentPrice } = price || {}
            const priceChange = new BigNumber(currentPrice)
              .minus(previousPrice)
              .toString()
            const priceChangePercent = new BigNumber(priceChange)
              .multipliedBy(100)
              .div(previousPrice)
              .toString()

            // console.log(
            //   `${product.symbol}: $${price.price} \xB1$${price.confidence}`,
            // )

            console.log("==={priceChange}===", {
              currentPrice,
              priceChange,
              priceChangePercent,
            })
            setPrice(currentPrice)
            setPriceChange(priceChange)
            setPriceChangePercent(priceChangePercent)
          } else {
            // tslint:disable-next-line:no-console
            console.log(
              `${product.symbol}: price currently unavailable. status is ${PriceStatus[price.status]}`,
            )
          }
        }
      },
    )

    // tslint:disable-next-line:no-console
    console.log("Reading from Pyth price feed...")
    pythConnection.start()

    return () => {
      // Cleanup WebSocket connections when component unmounts
      pythConnection.stop()
    }
  }, [])

  return {
    price,
    priceChange,
    priceChangePercent,
  }
}

export default useGetPriceRealtime
