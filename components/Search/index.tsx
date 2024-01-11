"use client"

import SearchIcon from "@/public/search.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Coin } from "@/types";
import useClickOutside from "@/utils/useClickOutside";

const Search = ({showSearchIcon, inputPlaceholder, isLink, handleClick} : {showSearchIcon: boolean, inputPlaceholder: string, isLink: boolean, handleClick: (coin: Coin) => void}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [coins, setCoins] = useState<Coin[] | []>([]);
  const [coinSearch, setCoinSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const searchRef = useClickOutside(() => setShowDropdown(false));

  const getCoins = async () => {
    try {
      const { data } = await axios("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en");
      setCoins(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!coins.length) {
      getCoins();
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoinSearch(e.target.value);
    setShowDropdown(true);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex: number = (selectedIndex + (e.key === 'ArrowDown' ? 1 : -1) + coinResults.length) % coinResults.length;
      setSelectedIndex(newIndex);
    } else if (e.key === "Enter") {
      const selectedCoin: Coin = coinResults[selectedIndex];
      handleClick(selectedCoin);
      setShowDropdown(false);
    }
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const handleButtonClick = (coin: Coin) => {
    setShowDropdown(false);
    handleClick(coin);
  }

  const coinResults: Coin[] = coins.filter((coin: Coin) => coin.name.toLowerCase().includes(coinSearch.toLowerCase()));

  return (
    <div className="relative" ref={searchRef}>
      {showSearchIcon && <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 dark:fill-[#D1D1D6] fill-indigo"/>}
      <input placeholder={inputPlaceholder}
             className="dark:bg-blackberry bg-lilac placeholder:text-indigo dark:placeholder:text-white py-3 pl-10 pr-3 border border-1 dark:border-[#232336] border-lilac rounded-md focus:outline-none min-w-[250px] w-full"
             onChange={handleSearchChange}
             onFocus={() => setShowDropdown(true)}
             value={coinSearch}
             onKeyDown={handleKeyDown}
      />
      {showDropdown && (
        <div className="max-h-[300px] inline-flex flex-col overflow-y-scroll dark:bg-blackberry bg-white absolute z-10 left-0 top-[55px] border border-1 dark:border-[#232336] border-lilac rounded-md min-w-[250px]">
          {coinResults.map((coin, index) => {
            const commonProps = {
              key: coin.id,
              className: `px-4 py-2 flex gap-2 ${index === selectedIndex && 'bg-grape'}`,
              onMouseEnter: () => handleMouseEnter(index),
            };
            return isLink ?
              <Link href={`/coin/${coin.id}`} onClick={() => setShowDropdown(false)} {...commonProps}>
                {coin.name}
              </Link>
              :
              <button onClick={() => handleButtonClick(coin)} {...commonProps}>
                {coin.name}
              </button>
          })}
        </div>
      )}
    </div>
  )
}

export default Search;