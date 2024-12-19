import { RootState } from "@configs/store"
import {
  getPythClusterApiUrl,
  getPythProgramKeyForCluster,
  PriceStatus,
  PythCluster,
  PythConnection,
} from "@pythnetwork/client"
import { updatePriceInfo } from "@reducers/priceInfoSlice"
import { Connection } from "@solana/web3.js"
import BigNumber from "bignumber.js"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const PYTHNET_CLUSTER_NAME: PythCluster = "pythnet"
const connection = new Connection(getPythClusterApiUrl(PYTHNET_CLUSTER_NAME))
const pythPublicKey = getPythProgramKeyForCluster(PYTHNET_CLUSTER_NAME)

const useGetPriceRealtime = () => {
  const dispatch = useDispatch()
  const { price, priceChange, priceChangePercent } = useSelector(
    (state: RootState) => state.priceInfo,
  )
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
          if (price.price && price.confidence) {
            const { previousPrice, price: currentPrice } = price || {}
            const priceChangeBN = new BigNumber(currentPrice).minus(
              previousPrice,
            )
            const priceChange = priceChangeBN.toString()
            const priceChangePercent = new BigNumber(priceChange)
              .multipliedBy(100)
              .div(previousPrice)
              .toString()

            // console.log("==={priceChange}===", {
            //   currentPrice,
            //   priceChange,
            //   priceChangePercent,
            // })

            if (!priceChangeBN.isEqualTo(0)) {
              // console.log("priceChange", priceChange)
              dispatch(
                updatePriceInfo({
                  price: currentPrice,
                  priceChange,
                  priceChangePercent,
                }),
              )
            }
          } else {
            console.log(
              `${product.symbol}: price currently unavailable. status is ${PriceStatus[price.status]}`,
            )
          }
        }
      },
    )

    console.log("Reading from Pyth price feed...")
    pythConnection.start()

    return () => {
      console.log("clean ==> Pyth price feed . . . ")
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
