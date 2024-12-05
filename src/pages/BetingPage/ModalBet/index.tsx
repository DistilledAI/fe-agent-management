import { numberWithCommas, toBN } from "@utils/format"
import { ChangeEvent, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { maxIcon } from "@assets/images"
import { Web3SolanaProgramInteraction } from "../../../program/utils/web3Utils"
import { BET_TYPE } from "../CardContainer"
import { loadingButtonIcon } from "@assets/svg"
import { MAX_ADDRESS_SOLANA } from "program/constants"
import { useWallet } from "@solana/wallet-adapter-react"

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

const web3Solana = new Web3SolanaProgramInteraction()

const ModalBet: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [tokenBal, setTokenBal] = useState<number>(0)
  const [type, setType] = useState<number>(BET_TYPE.UP)
  const [amountVal, setAmountVal] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const wallet = useWallet()

  const getBalance = async () => {
    if (!wallet) {
      return
    }

    try {
      const address = wallet.publicKey?.toBase58() || ""

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
  }, [wallet])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(parseFloat(value))) {
      setAmountVal(value)
    } else if (value === "") {
      setAmountVal("") // Allow empty string to clear the input
    }
  }
  return (
    <div
      className={twMerge(
        "fixed inset-0 z-50 flex w-full items-center justify-center backdrop-blur-md",
        !isOpen && "hidden",
      )}
    >
      <div className="relative flex w-full max-w-[480px] flex-col gap-3 rounded-lg bg-[#13141D] p-6 sm:max-w-xl">
        <div className="">
          <h2 className="text-[18px] font-medium text-[#E8E9EE]">
            Set position
          </h2>
          <button
            onClick={() => {
              closeModal()
              setType(BET_TYPE.UP)
              setAmountVal("")
            }}
            className="absolute right-6 top-6 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M13.5909 12.5L18.0441 8.04687C18.2554 7.8359 18.3743 7.54962 18.3745 7.25099C18.3748 6.95237 18.2564 6.66587 18.0455 6.45453C17.8345 6.24319 17.5482 6.12431 17.2496 6.12404C16.951 6.12378 16.6645 6.24215 16.4531 6.45312L12 10.9062L7.54687 6.45312C7.33553 6.24178 7.04888 6.12305 6.75 6.12305C6.45111 6.12305 6.16447 6.24178 5.95312 6.45312C5.74178 6.66447 5.62305 6.95111 5.62305 7.25C5.62305 7.54888 5.74178 7.83553 5.95312 8.04687L10.4062 12.5L5.95312 16.9531C5.74178 17.1645 5.62305 17.4511 5.62305 17.75C5.62305 18.0489 5.74178 18.3355 5.95312 18.5469C6.16447 18.7582 6.45111 18.8769 6.75 18.8769C7.04888 18.8769 7.33553 18.7582 7.54687 18.5469L12 14.0937L16.4531 18.5469C16.6645 18.7582 16.9511 18.8769 17.25 18.8769C17.5489 18.8769 17.8355 18.7582 18.0469 18.5469C18.2582 18.3355 18.3769 18.0489 18.3769 17.75C18.3769 17.4511 18.2582 17.1645 18.0469 16.9531L13.5909 12.5Z"
                fill="#9192A0"
              />
            </svg>
          </button>
          <div className="mt-8 flex w-full gap-2">
            <div
              className={twMerge(
                "h-10 flex-1 cursor-pointer rounded bg-[#1A1C28] p-2 text-center text-[14px] uppercase text-[#E8E9EE] hover:brightness-125",
                type === BET_TYPE.UP && "bg-[#9FF4CF] text-[#080A14]",
              )}
              onClick={() => setType(BET_TYPE.UP)}
            >
              UP
            </div>
            <div
              className={twMerge(
                "h-10 flex-1 cursor-pointer rounded bg-[#1A1C28] p-2 text-center text-[14px] uppercase text-[#E8E9EE] hover:brightness-125",
                type === BET_TYPE.DOWN && "bg-[#E75787] text-[#080A14]",
              )}
              onClick={() => setType(BET_TYPE.DOWN)}
            >
              DOWN
            </div>
          </div>

          <div className="mt-6">
            <div className="flex w-full flex-row items-center rounded border-[1px] border-[#30344A] bg-transparent px-4">
              <div className="flex-1 py-2">
                <input
                  type="number"
                  id="setTrade"
                  value={amountVal}
                  onChange={handleInputChange}
                  pattern="\d*"
                  className="w-full flex-1 bg-transparent text-[24px] capitalize text-[#E8E9EE] outline-none [appearance:textfield] placeholder:text-[#585A6B] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="0.0"
                  required
                />

                <span className="text-[10px] font-medium text-[#E8E9EE]">
                  Balance: {numberWithCommas(tokenBal)}
                  {"MAX"}
                </span>
              </div>

              <div className="flex h-8 w-fit items-center justify-center rounded-[32px] bg-[#080A14] px-4 py-1 text-[14px] text-[#E8E9EE]">
                MAX
                <img
                  src={maxIcon}
                  alt="maxIcon"
                  width={20}
                  height={20}
                  className="ml-1 h-5 w-5 rounded-full border border-[#30344A] object-cover"
                />
              </div>
            </div>
            <div className="flex w-full flex-row gap-3 py-2">
              <div
                className="flex-1 cursor-pointer rounded border-[1px] border-[#30344A] bg-[#080A14] px-2 py-1 text-center text-[12px] font-medium text-[#9192A0] hover:brightness-125"
                onClick={() => setAmountVal((tokenBal / 10).toString())}
              >
                10%
              </div>
              <div
                className="flex-1 cursor-pointer rounded border-[1px] border-[#30344A] bg-[#080A14] px-2 py-1 text-center text-[12px] font-medium text-[#9192A0] hover:brightness-125"
                onClick={() => setAmountVal((tokenBal / 4).toString())}
              >
                25%
              </div>
              <div
                className="flex-1 cursor-pointer rounded border-[1px] border-[#30344A] bg-[#080A14] px-2 py-1 text-center text-[12px] font-medium text-[#9192A0] hover:brightness-125"
                onClick={() => setAmountVal((tokenBal / 2).toString())}
              >
                50%
              </div>
              <div
                className="flex-1 cursor-pointer rounded border-[1px] border-[#30344A] bg-[#080A14] px-2 py-1 text-center text-[12px] font-medium text-[#9192A0] hover:brightness-125"
                onClick={() => setAmountVal(((tokenBal / 4) * 3).toString())}
              >
                75%
              </div>
              <div
                className="flex-1 cursor-pointer rounded border-[1px] border-[#30344A] bg-[#080A14] px-2 py-1 text-center text-[12px] font-medium text-[#9192A0] hover:brightness-125"
                onClick={() => setAmountVal(tokenBal.toString())}
              >
                100%
              </div>
            </div>

            <button
              disabled={!wallet || loading}
              className="mt-4 w-full cursor-pointer rounded border-[2px] border-solid border-[rgba(255,255,255,0.25)] p-1 uppercase transition-all duration-150 ease-in hover:border-[rgba(255,255,255)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 disabled:brightness-75"
              onClick={async () => {
                setLoading(true)
                console.log("----CONFIRM----", {
                  type,
                  amountVal,
                })

                await web3Solana.createOrder(
                  wallet,
                  toBN(amountVal)
                    .multipliedBy(10 ** 6)
                    .toString(),
                  type === BET_TYPE.DOWN ? { down: {} } : { up: {} },
                )

                setLoading(false)
              }}
            >
              <div className="flex items-center justify-center gap-2 rounded bg-white px-6 py-2 uppercase text-[#080A14]">
                {loading && (
                  <img src={loadingButtonIcon} alt="loadingButtonIcon" />
                )}
                CONFIRM
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalBet
