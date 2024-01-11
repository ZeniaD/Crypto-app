
import { Portfolio, Coin } from "@/types";
import Image from "next/image";
import CurrencyIcon from "@/components/CurrencyIcon";

const PortfolioItem = ({portfolio, portfolioCoins, currency} : {portfolio: Portfolio, portfolioCoins: Coin[], currency: string}) => {
  const coinData: Coin = portfolioCoins.find((item) => item.id === portfolio.id)!;

  return (
    <div className="mb-4 dark:bg-blackberry bg-white flex min-h-[200px] rounded-xl">
      <div className="w-1/3 dark:bg-[#191932] bg-[#6161de80] rounded-l-xl py-4 pl-4 pr-2">
        <div className="flex mb-6 items-center pl-1">
          <Image src={coinData.image} alt={coinData.name} width={40} height={40}/>
          <h2 className="capitalize text-xl ml-2">{coinData.name} (<span className="uppercase">{coinData.symbol}</span>)</h2>
        </div>
        <p className="pl-2">Total Value</p>
        <p className="flex items-center text-2xl my-2"><CurrencyIcon currency={currency} inverted={false} size="w-[32px] h-[32px]"/>{coinData.current_price}</p>
        <p className="pl-2 text-xs dark:text-[#D1D1D1] text-[#424286]">Purchased {portfolio.date}</p>
      </div>
      <div className="w-2/3">

      </div>
    </div>
  )
}

export default PortfolioItem;