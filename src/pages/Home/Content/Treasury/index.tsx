import useFetchTreasury from "./useFetchTreasury"
import CreateTreasury from "./CreateTreasury"
import WithdrawSol from "./WithdrawSol"
import WithdrawToken from "./WithdrawToken"

const Treasury = ({ botInfo }: { botInfo: any }) => {
  const { treasuryAddress, getTreasury } = useFetchTreasury(
    botInfo?.sol_address,
  )

  if (!treasuryAddress)
    return (
      <CreateTreasury
        agentAddress={botInfo?.sol_address}
        getTreasury={getTreasury}
      />
    )

  return (
    <>
      <p className="font-semibold">Treasury Address:</p>
      <p>{treasuryAddress}</p>
      <WithdrawSol botInfo={botInfo} />
      <WithdrawToken botInfo={botInfo} />
    </>
  )
}

export default Treasury
