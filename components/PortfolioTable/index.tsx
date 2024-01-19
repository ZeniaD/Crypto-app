'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import PortfolioItem from "@/components/PortfolioItem";
import { Coin, HistoricalCoin } from "@/types";
import Spinner from "@/public/spinner.svg";

const PortfolioTable = () => {
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);
  const { portfolio } = useAppSelector(state => state.portfolio);
  const { allCoinsList } = useAppSelector(state => state.coins);
  const { currency } = useAppSelector(state => state.currency);

  const coinIds: string[] = portfolio.map((coin) => coin.coinId);
  const individualCoins: string[] = coinIds.filter((coin, index) => coinIds.indexOf(coin) === index);
  const portfolioCoins: Coin[] = allCoinsList.filter((coin) => individualCoins.includes(coin.id));

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const results = await Promise.all(portfolio.map( async (coin) => await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.coinId}/history?date=${coin.date}`)));
        const historicalData = results.map((response) => response.data);
        setHistoricalCoins(historicalData);
      } catch (error) {
        console.log(error)
      }
    }
    fetchHistoricalData();
  }, [portfolio])

  const loading = portfolio.length > 0 && historicalCoins.length !== portfolio.length ;
  const hasCoinData = historicalCoins.length > 0;

  return (
    <div className="py-8">
      {hasCoinData && portfolio.slice(0, historicalCoins.length).map((portfolio, index) =>
        <PortfolioItem key={portfolio.id} portfolio={portfolio} portfolioCoins={portfolioCoins} currency={currency} historicalCoinData={historicalCoins[index]}/>
      )}

      {loading && (
        <div className='col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'>
          <Spinner className='h-10 w-10 animate-spin fill-grape text-gray-200 dark:text-gray-600'/>
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </div>
  )
}

export default PortfolioTable;