import Image from "next/image";
import CurrencyIcon from "@/components/CurrencyIcon";
import PriceChange from "@/components/PriceChange";
import MarketVolumeBar from "@/components/MarketVolumeBar";
import { Portfolio, Coin, HistoricalCoin } from "@/types";
import getFormattedPrice from "@/utils/getFormattedPrice";

const PortfolioItem = ({portfolio, portfolioCoins, currency, historicalCoinData} : {portfolio: Portfolio, portfolioCoins: Coin[], currency: string, historicalCoinData: HistoricalCoin}) => {
  const coinData: Coin = portfolioCoins.find((item) => item.id === portfolio.coinId)!;
  const historicalPrice = historicalCoinData.market_data.current_price[currency];
  const profit = (coinData.current_price - historicalPrice) * portfolio.amount;
  const profitPercentage = getFormattedPrice((profit / historicalPrice) * 100);
  const profitFormatted = getFormattedPrice(profit);
  const priceChange24h = getFormattedPrice(coinData.price_change_percentage_24h);
  const circToSupply = getFormattedPrice((coinData.circulating_supply / coinData.total_supply) * 100);
  const marketToVolume = getFormattedPrice((coinData.total_volume / coinData.market_cap) * 100);

  return (
    <div className="mb-4 dark:bg-blackberry bg-white flex min-h-[200px] rounded-xl">
      <div className="w-1/3 dark:bg-[#191932] bg-lilac rounded-l-xl py-4 pl-4 pr-2">
        <div className="flex mb-6 items-center pl-1">
          <Image src={coinData.image} alt={coinData.name} width={40} height={40}/>
          <h2 className="capitalize text-xl ml-2">{coinData.name} (<span className="uppercase">{coinData.symbol}</span>)</h2>
        </div>
        <p className="pl-2">Total Value</p>
        <p className="flex items-center text-2xl my-2">
          <CurrencyIcon currency={currency} inverted={false} size="w-[32px] h-[32px]"/> {profitFormatted}
          <span className="ml-2 text-base"><PriceChange price={profitPercentage} /></span>
        </p>
        <p className="pl-2 text-xs dark:text-[#D1D1D1] text-[#424286]">Purchased {portfolio.date.replaceAll('-', '/')}</p>
      </div>
      <div className="w-2/3">
        <div className="flex w-full h-1/2 items-center">
          <div className="w-1/2 p-4">
            <p className="flex items-center text-xl">
              <CurrencyIcon currency={currency} inverted={false} size="w-[22px] h-[22px]"/>{coinData.current_price}
            </p>
            <p className="text-xs dark:text-[#D1D1D1] text-[#424286]">Current Price</p>
          </div>
          <div className="w-1/2 p-4">
            <p><PriceChange price={priceChange24h}/></p>
            <p className="text-xs dark:text-[#D1D1D1] text-[#424286]">24h%</p>
          </div>
        </div>
        <div className="flex w-full h-1/2 items-center">
          <div className="w-1/2 p-4">
            <p className="max-w-[80%] mb-1">
              <span className="text-sm text-grape">{marketToVolume}%</span>
              <MarketVolumeBar fill="bg-grape" percentage={marketToVolume}/>
            </p>
            <p className="text-xs dark:text-[#D1D1D1] text-[#424286]">Market cap vs volume</p>
          </div>
          <div className="w-1/2 p-4">
            <p><PriceChange price={circToSupply}/></p>
            <p className="text-xs dark:text-[#D1D1D1] text-[#424286]">Circ supply vs max supply</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioItem;