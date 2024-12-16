import { RootState } from "@configs/store"
import { updatePriceTokens } from "@reducers/priceInfoSlice"
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"

export enum CoinGeckoId {
  solana = "solana",
  "max-2" = "max-2",
}
export const CONFIG_TOKEN_PRICE_CGK = Object.values(CoinGeckoId)

/**
 * Constructs the URL to retrieve prices from CoinGecko.
 * @param tokens
 * @returns
 */
export const buildCoinGeckoPricesURL = (tokens: readonly string[]): string =>
  // `https://api.coingecko.com/api/v3/simple/price?ids=${tokens.join('%2C')}&vs_currencies=usd`;
  `https://price.market.orai.io/simple/price?ids=${tokens.join("%2C")}&vs_currencies=usd&include_24hr_vol=true`

/**
 * Prices of each token.
 */
export type CoinGeckoPrices<T extends string> = {
  [C in T]: number | null
}

/**
 * Fetches prices of tokens from CoinGecko.
 * @returns The CoinGecko prices.
 */
export const useCoinGeckoPrices = <T extends CoinGeckoId>(
  options: Omit<
    UseQueryOptions<CoinGeckoPrices<T>, unknown, CoinGeckoPrices<T>, string[]>,
    "queryKey" | "queryFn"
  > = {},
): UseQueryResult<CoinGeckoPrices<T>, unknown> => {
  const dispatch = useDispatch()
  const { tokenPrices } = useSelector((state: RootState) => state.priceInfo)
  const tokens = [...new Set([...CONFIG_TOKEN_PRICE_CGK])]
  tokens.sort()

  // use cached first then update by query, if is limited then return cached version

  return useQuery({
    initialData: tokenPrices || ({} as any),
    ...options,
    // make unique
    queryKey: ["coinGeckoPrices", ...tokens],
    queryFn: async ({ signal }) => {
      const { prices } = await getCoingeckoPrices(
        tokens,
        tokenPrices || ({} as any),
        signal,
      )
      dispatch(
        updatePriceTokens({
          ...(prices as any),
        }),
      )

      return Object.fromEntries(
        tokens.map((token) => [token, prices[token]]),
      ) as CoinGeckoPrices<T>
    },
  })
}

export const getCoingeckoPrices = async <T extends string>(
  tokens: string[],
  cachePrices?: CoinGeckoPrices<CoinGeckoId>,
  signal?: AbortSignal,
): Promise<{ prices: CoinGeckoPrices<string> }> => {
  const coingeckoPricesURL = buildCoinGeckoPricesURL(tokens)

  const prices: any = { ...(cachePrices || {}) }

  // by default not return data then use cached version
  try {
    const resp = await fetch(coingeckoPricesURL, { signal })
    const rawData = (await resp.json()) as {
      [C in T]?: {
        usd: number
      }
    }
    // update cached
    for (const key in rawData) {
      prices[key] = rawData[key]?.usd || "0"
    }
  } catch {
    // remain old cache
    console.log("error getting coingecko prices: ", prices)
  }
  return { prices }
}
