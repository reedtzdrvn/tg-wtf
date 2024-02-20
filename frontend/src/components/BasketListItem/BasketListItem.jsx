import { useEffect, useState } from "react";

import DetailsItemIcon from "../../images/basket-item-details.svg";
import DeleteItemIcon from "../../images/delete-basket-icon.svg";

import BasketListButton from "./BasketListButton";

const BasketListItem = ({ title, price, quantity, onQuantityChange }) => {
  const [curr, setCurr] = useState(quantity);
  const [currPrice, setCurrPrice] = useState(price);
  const increaseCurrentQuantity = () => {
    setCurr(curr + 1);
    onQuantityChange(price);
  };
  const decreaseCurrentQuantity = () => {
    if (curr >= 2) {
      setCurr(curr - 1);
      onQuantityChange(-price);
    }
  };

  useEffect(() => {
    setCurrPrice(price * curr);
  }, [curr]);

  return (
    <>
      <div className="basket-list-item mt-[12px] flex justify-between items-center">
        <h3 className="font-bold w-3/12">{title}</h3>
        <BasketListButton
          quantity={curr}
          increaseCurrentQuantity={increaseCurrentQuantity}
          decreaseCurrentQuantity={decreaseCurrentQuantity}
        />
        <h3 className="w-3/12 flex justify-center">${currPrice.toLocaleString()}</h3>
        <div className="basket-list-item-action-wrapper flex items-center w-3/12 flex justify-end">
          <img src={DetailsItemIcon} width={15} height={15} />
          <img
            className="ml-[15px]"
            src={DeleteItemIcon}
            width={15}
            height={15}
          />
        </div>
      </div>
      <hr className="mt-[12px] w-full h-[1px] basket-list-items-separator" />
    </>
  );
};

export default BasketListItem;
