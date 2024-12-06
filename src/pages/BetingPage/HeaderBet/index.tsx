import HeaderPrice from "./HeaderPrice"
import HeaderWallet from "./HeaderWallet"

const HeaderBet = () => {
  return (
    <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:justify-start">
      <HeaderPrice />
      <div className="max-md:mt-5">
        <HeaderWallet />
      </div>
    </div>
  )
}

export default HeaderBet
