import { persistor, store } from "@configs/store"
import { config } from "@configs/wagmi"
import { NextUIProvider } from "@nextui-org/react"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SolanaWalletProvider } from "providers/SolanaWalletProvider"
import SwiperProvider from "providers/SwiperProvider"
import { HelmetProvider } from "react-helmet-async"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { WagmiProvider } from "wagmi"

const queryClient = new QueryClient()

const Providers = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <SolanaWalletProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                  <RainbowKitProvider locale="en-US">
                    <NextUIProvider>
                      <NextThemesProvider
                        attribute="class"
                        defaultTheme="light"
                      >
                        <SwiperProvider>{children}</SwiperProvider>
                      </NextThemesProvider>
                    </NextUIProvider>
                  </RainbowKitProvider>
                </QueryClientProvider>
              </WagmiProvider>
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </SolanaWalletProvider>
  )
}

export default Providers
