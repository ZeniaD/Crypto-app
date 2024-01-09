"use client"

import { useState } from "react";
import useClickOutside from "@/utils/useClickOutside";
import Search from "@/components/Search";

const AddAssetModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);
  const [date, setDate] = useState<string>('');

  const modalRef = useClickOutside(() => setShowModal(false));

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  }

  const handleClick = (id: string) => {
    setSelectedCoin(id);
  }

  return (
    <>
      <button onClick={() => setShowModal(!showModal)}
        className="bg-[#7878FA] p-2 rounded-md min-w-[200px] text-center">Add Asset</button>
      {showModal && (
        <div className="w-full h-full flex justify-center items-center absolute left-0 top-0 bg-[#26243752]">
          <form className="dark:bg-[#13121A] bg-indigo min-w-[400px] min-h-[300px] rounded-3xl p-8" ref={modalRef} onSubmit={handleSubmit}>
            <h2>Select Coin</h2>
            <div className="flex h-full">
              <div className="w-1/3 bg-blackberry">

              </div>
              <div className="w-2/3">
                <Search showSearchIcon={false} inputPlaceholder="Select coin" isLink={false} handleClick={handleClick} />
                <input id="task-date" type="date"
                       value={date}
                       onChange={(e) => setDate(e.target.value)}
                       className=""/>
              </div>
            </div>
            <div>
              <button
                className="bg-blackberry mr-4 p-2 rounded-md min-w-[200px] text-center"
                onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="bg-[#7878FA] p-2 rounded-md min-w-[200px] text-center">Save</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default AddAssetModal;