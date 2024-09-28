import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { mainnet, sepolia } from "wagmi/chains"
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets"
import { createConfig } from "wagmi"

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet],
    },
  ],
  {
    appName: "Distill-Demo",
    projectId: "2ac779892f366ccc0af6a8d986ab6d86",
  },
)

export const config = createConfig({
  connectors,
  chains: [mainnet, sepolia],
})

// export const config: ReturnType<typeof getDefaultConfig> = getDefaultConfig({
//   appName: "Distill-Demo",
//   projectId: "2ac779892f366ccc0af6a8d986ab6d86",
//   chains: [mainnet, sepolia],
// })
