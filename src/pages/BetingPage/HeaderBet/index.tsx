import HeaderPrice from "./HeaderPrice"
import HeaderWallet from "./HeaderWallet"

const HeaderBet = () => {
  return (
    <div className="flex items-center justify-between">
      <HeaderPrice />
      <HeaderWallet />
    </div>
  )
}

export default HeaderBet
