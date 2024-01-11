'use client'

import { useAppSelector } from "@/redux/store";
import PortfolioItem from "@/components/PortfolioItem";
import { Portfolio, Coin } from "@/types";

const PortfolioTable = () => {
  const { portfolio } = useAppSelector(state => state.portfolio);
  const { allCoinsList } = useAppSelector(state => state.coins);
  const { currency } = useAppSelector(state => state.currency);

  const coinIds: string[] = portfolio.map((coin) => coin.id);
  const individualCoins: string[] = coinIds.filter((coin, index) => coinIds.indexOf(coin) === index);
  const portfolioCoins: Coin[] = allCoinsList.filter((coin) => individualCoins.includes(coin.id));

  return (
    <div className="py-8">
      {portfolio.length && portfolio.map((portfolio: Portfolio) =>
        <PortfolioItem key={portfolio.id} portfolio={portfolio} portfolioCoins={portfolioCoins} currency={currency}/>
      )}
    </div>
  )
}

export default PortfolioTable;