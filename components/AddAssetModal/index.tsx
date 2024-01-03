"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import useClickOutside from "@/utils/useClickOutside";

const AddAssetModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [coins, setCoins] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useClickOutside(() => setShowModal(false));

  return (
    <>
      <button onClick={() => setShowModal(!showModal)}
        className="bg-[#7878FA] p-2 rounded-md min-w-[200px] text-center">Add Asset</button>
      {showModal && (
        <div className="w-full h-full flex justify-center items-center absolute left-0 top-0">
          <div className="dark:bg-plum bg-indigo min-w-[400px] min-h-[300px] rounded-3xl p-8" ref={modalRef}>
            <h2>Select Coin</h2>
            <div className="flex h-full">
              <div className="w-1/3 bg-blackberry">

              </div>
              <div className="w-2/3">

              </div>
            </div>
            <div>
              <button className="bg-blackberry mr-4 p-2 rounded-md min-w-[200px] text-center">Cancel</button>
              <button className="bg-[#7878FA] p-2 rounded-md min-w-[200px] text-center">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddAssetModal;