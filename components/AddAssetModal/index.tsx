"use client"

import { useState } from "react";
import useClickOutside from "@/utils/useClickOutside";
import Search from "@/components/Search";
import Image from "next/image";
import {Coin} from "@/types";

const AddAssetModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);
  const [date, setDate] = useState<string>('');
  const [invalidCoin, setInvalidCoin] = useState<boolean>(false);
  const [invalidAmount, setInvalidAmount] = useState<boolean>(false);
  const [invalidDate, setInvalidDate] = useState<boolean>(false);

  const modalRef = useClickOutside(() => setShowModal(false));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedCoin ==='' || amount === 0)  {
      if (selectedCoin ==='') {
        setInvalidCoin(true);
        setTimeout(() => {
          setInvalidCoin(false);
        }, 5000);
      }

      if (amount === 0){
        setInvalidAmount(true);
        setTimeout(() => {
          setInvalidAmount(false);
        }, 5000);
      }

      return;
    }

    setShowModal(false);
  }

  const handleClick = (coin: Coin) => {
    setSelectedCoin(coin.id);
    setImage(coin.image);
  }

  const handleDateChange = (dateValue: string) => {
    const today: string = new Date().toISOString().split('T')[0];

    if (dateValue <= today) {
      setDate(dateValue)
    } else {
      setInvalidDate(true);
      setTimeout(() => {
        setInvalidDate(false);
      }, 5000);
    }
  }

  return (
    <>
      <button onClick={() => setShowModal(!showModal)} className="bg-[#7878FA] p-2 rounded-md min-w-[200px] text-center">Add Asset</button>
      {showModal && (
        <div className="w-full h-full flex justify-center items-center absolute left-0 top-0 bg-[#26243752] backdrop-blur-sm">
          <form className="dark:bg-[#13121A] bg-indigo min-w-[50%] min-h-[300px] rounded-3xl p-8" ref={modalRef} onSubmit={handleSubmit}>
            <h2 className="mb-4 text-lg">Select Coin</h2>
            <div className="flex h-full">
              <div className="w-1/3 bg-blackberry mr-6 flex items-center justify-center rounded-md flex-col">
                {!image && !selectedCoin && <p>No coin selected</p>}
                {image && selectedCoin && (
                  <>
                    <div className="p-4 rounded-md bg-[#2C2C4A]">
                      <Image src={image} alt={selectedCoin} width={32} height={32}/>
                    </div>
                    <p className="mt-2 text-xl capitalize">{selectedCoin}</p>
                  </>
                )}
              </div>
              <div className="w-2/3">
                <Search showSearchIcon={false} inputPlaceholder="Select coin" isLink={false} handleClick={handleClick} />
                {invalidCoin && <p className="text-sm text-red-500 pt-2">Select a Coin</p>}
                <input id="amount" type="number"
                       min="0"
                       value={amount}
                       onChange={(e) => setAmount(parseFloat(e.target.value))}
                       className="dark:bg-blackberry bg-lilac placeholder:text-indigo dark:placeholder:text-white py-3 pl-10 pr-3 border border-1 dark:border-[#232336] border-lilac rounded-md focus:outline-none min-w-[250px] w-full mt-4"/>
                {invalidAmount && <p className="text-sm text-red-500 pt-2">Purchase amount can not be zero</p>}
                <input id="date" type="date"
                       value={date}
                       onChange={(e) => handleDateChange(e.target.value)}
                       className="dark:bg-blackberry bg-lilac placeholder:text-indigo dark:placeholder:text-white py-3 pl-10 pr-3 border border-1 dark:border-[#232336] border-lilac rounded-md focus:outline-none min-w-[250px] w-full mt-4"/>
                {invalidDate && <p className="text-sm text-red-500 pt-2">Purchase date can not be in the future</p>}
                <div className="mt-4">
                  <button
                    className="bg-[#232336] mr-4 p-2 rounded-md min-w-[200px] text-center"
                    onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="bg-[#7878FA] p-2 rounded-md min-w-[200px] text-center">Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default AddAssetModal;