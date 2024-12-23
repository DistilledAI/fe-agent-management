import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { LOCK_TIME_OPTIONS } from "../constants"

const LockToken = () => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const { isLogin, isAnonymous } = useAuthState()
  const isConnectWallet = isLogin && !isAnonymous
  const [selectedLockTime, setSelectedLockTime] = useState(LOCK_TIME_OPTIONS[0])

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div className="">
        <p className="text-18 font-semibold">Your locked</p>
        <div className="mt-5">
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-md bg-mercury-70 p-6">
            <p className="font-medium">NO LOCKED</p>
            <p className="text-mercury-500">
              Your locked history will appear here
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-18 font-semibold">Let's lock now</p>
        <div className="mt-5 rounded-md bg-mercury-70 p-6">
          <div>
            <p className="mb-3 text-14 font-medium">LOCK AMOUNT</p>
            <Input
              defaultValue="0"
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
              type="number"
              endContent={
                <div className="flex items-center justify-center gap-2 rounded-md bg-mercury-200 px-3 py-1">
                  <p className="text-14 font-medium">MAX</p>
                  <img
                    className="h-5 w-5 rounded-full object-cover"
                    src="https://agents.land/assets/richoldman-B161lZj3.png"
                    alt="avatar"
                  />
                </div>
              }
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-14">
                <div className="cursor-pointer rounded-md bg-mercury-100 px-2 py-1 hover:opacity-80">
                  25%
                </div>
                <div className="cursor-pointer rounded-md border-1 bg-mercury-100 px-2 py-1 hover:opacity-80">
                  50%
                </div>
                <div className="cursor-pointer rounded-md border-1 bg-mercury-100 px-2 py-1 hover:opacity-80">
                  75%
                </div>
                <div className="cursor-pointer rounded-md border-1 bg-mercury-100 px-2 py-1 hover:opacity-80">
                  100%
                </div>
              </div>
              <div>
                <p className="text-15">Balance: 0 MAX</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="mb-3 text-14 font-medium">LOCKING DURATION</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="px cursor-pointer rounded-md border-1 border-mercury-950 bg-mercury-100 py-2 text-center">
                1 month
              </div>
              <div className="cursor-pointer rounded-md border-1 bg-mercury-100 px-4 py-2 text-center">
                3 months
              </div>
              <div className="cursor-pointer rounded-md border-1 bg-mercury-100 px-4 py-2 text-center">
                6 months
              </div>
            </div>
          </div>
          {isConnectWallet ? (
            <Button className="text-semibold mt-10 h-11 w-full rounded-md bg-mercury-200">
              <span className="font-bold">LOCK</span>
            </Button>
          ) : (
            <Button
              onClick={connectMultipleWallet}
              isLoading={loading}
              className="text-semibold mt-10 h-11 w-full rounded-md bg-mercury-200"
            >
              <span className="font-bold">CONNECT WALLET</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LockToken
