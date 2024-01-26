'use client'

import Link from "next/link";
import Search from "@/components/Search";
import CurrencySelector from "@/components/CurrencySelector";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/public/logo.svg";
import HomeIcon from "@/public/home.svg";
import StackOutline from "@/public/stackOutline.svg";
import {useRouter} from "next/navigation";
import {Coin} from "@/types";

const NavBar = () => {
  const router = useRouter();

  const handleClick = (coin: Coin) => {
    router.push(`/coin/${coin.id}`);
  }

  return (
    <div className="py-6 px-2 flex justify-center items-center bg-white dark:bg-transparent">
      <div className="max-w-[1296px] w-full flex justify-between">
        <div className="flex items-center">
          <Logo/>
          <span className="ml-2 text-xl text-indigo dark:text-white font-bold">CryptoCraze</span>
        </div>

        <div className="flex">
          <Link href="/" className="p-3 flex">
            <HomeIcon className="dark:fill-white fill-indigo"/>
            <span className="pl-2 text-indigo dark:text-white dark:hover:text-grape hover:text-grape">Home</span>
          </Link>
          <Link href="/portfolio" className="p-3 flex dark:hover:text-grape">
            <StackOutline className="dark:stroke-white stroke-indigo"/>
            <span className="pl-2 text-indigo dark:text-white dark:hover:text-grape hover:text-grape">Portfolio</span>
          </Link>
        </div>

        <div className="flex">
          <Search showSearchIcon={true} inputPlaceholder="Search..." isLink={true} handleClick={handleClick}/>
          <CurrencySelector />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default NavBar;