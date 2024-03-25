import React, { useEffect, useState } from "react";
import axios from "../../axios";

import cross from '../../images/cross.svg'

const ItemRanges = ({ sizes,  setSizes, setItemSizeCount, itemSizeCount }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [allSizes, setAllSizes] = useState([]);

  useEffect(() => {
    axios
      .get("/sizes")
      .then((response) => {
        setAllSizes(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleQuantityChange = (size, event) => {
    const { value } = event.target;
    setItemSizeCount((prevQuantities) => ({
      ...prevQuantities,
      [size]: value,
    }));
  };

  const availableSizes = getAllAvailableSizes();

  function getAllAvailableSizes() {
    return allSizes.filter((size) => !sizes.some((obj) => obj._id === size._id));
  }

  const handleSizeSelect = (selectedSize) => {
    const newSize = allSizes.find((size) => size._id === selectedSize);
    if (newSize) {
      setItemSizeCount((prevQuantities) => ({
        ...prevQuantities,
        [selectedSize]: 1, // Устанавливаем количество в 1
      }));
      setSizes(prevSizes => [...prevSizes, newSize]);
      setIsSelectOpen(false);
    }
  };

  const handleRemoveSize = (sizeId) => {
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      if (sizeId >= 0 && sizeId < newSizes.length) {
        newSizes[sizeId].count = 0;
      }
      return newSizes;
    });
  
    setItemSizeCount((prevQuantities) => {
      const newSizeCount = { ...prevQuantities };
      newSizeCount[sizeId] = 0;
      return newSizeCount;
    });
  };

  return (
    <div className="mt-8">
      {sizes.map((sizeObj, index) => (
        <div key={sizeObj._id} className="flex w-2/5 items-center mb-4">
          <span className="w-1/5">{sizeObj.name}</span>
          <input
            className="border w-4/5 border-gray-300 rounded-md py-1 px-2"
            type="number"
            value={itemSizeCount[sizeObj._id]}
            onChange={(e) => handleQuantityChange(sizeObj._id, e)}
          />
          <img src={cross} className="ml-2 h-[20px] cursor-pointer" onClick={() => handleRemoveSize(sizeObj._id)} />
        </div>
      ))}
      {isSelectOpen && (
        <div>
          <select
            className="border w-2/5 border-gray-300 rounded-md py-1 px-2 mt-4"
            onChange={(e) => handleSizeSelect(e.target.value)}
          >
            <option value="">Выберите размер</option>
            {availableSizes.map((size) => (
              <option key={size._id} value={size._id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <button
      type="button"
        className="mt-2 bg-orange-300 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsSelectOpen(!isSelectOpen)}
      >
        {isSelectOpen ? 'Убрать' : 'Добавить размер'}
      </button>
    </div>
  );
};

export default ItemRanges;
