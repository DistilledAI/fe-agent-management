import { maxIcon } from "@assets/images"
import { solanaCircleIcon } from "@assets/svg"
import { CopyIcon } from "@components/Icons/Copy"
import { Button, Image } from "@nextui-org/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { numberWithCommas } from "@utils/format"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import { MAX_ADDRESS_SOLANA } from "program/constants"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

const web3Solana = new Web3SolanaProgramInteraction()

const HeaderWallet = () => {
  const { publicKey, select, connect } = useWallet()
  const [tokenBal, setTokenBal] = useState<number>(0)
  const address = publicKey?.toBase58() || ""
  const getBalance = async () => {
    if (!publicKey) {
      return
    }

    try {
      const tokenBal = await web3Solana.getTokenBalance(
        address,
        MAX_ADDRESS_SOLANA,
      )

      console.log("tokenBal", address, tokenBal)
      setTokenBal(tokenBal ? tokenBal : 0)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    getBalance()
  }, [publicKey])

  const connectPhantom = async () => {
    select(PhantomWalletName)
    await connect()
  }

  return publicKey ? (
    <div>
      <div className="flex items-center gap-2">
        <p className="w-[62px] font-medium text-[#999]">Wallet:</p>
        <div
          className={twMerge("flex cursor-pointer items-center gap-2")}
          onClick={(e) => copyClipboard(e, address)}
        >
          <span className={twMerge("text-[16px] text-[#cfcfcf]")}>
            {centerTextEllipsis(address)}
          </span>
          <Image className="h-6 w-6" src={solanaCircleIcon} />
          <CopyIcon color="#cfcfcf" />
        </div>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <p className="w-[62px] font-medium text-[#999]">Balance:</p>
        <p className="text-[#cfcfcf]">{numberWithCommas(tokenBal)}</p>
        <Image className="h-5 w-5 rounded-full" src={maxIcon} />
      </div>
    </div>
  ) : (
    <Button onClick={connectPhantom} className="rounded bg-white font-medium">
      Connect to Phantom
    </Button>
  )
}

export default HeaderWallet
