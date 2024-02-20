import { useState } from "react";
import "./BasketListButton.css";

const BasketListButton = ({
  quantity,
  decreaseCurrentQuantity,
  increaseCurrentQuantity,
}) => {
  return (
    <div className="basket-list-item-button h-[15px] w-[50px] flex justify-around items-center">
      <span
        className="list-item-decrease-quantity"
        onClick={decreaseCurrentQuantity}
      >
        -
      </span>
      <span className="">{quantity}</span>
      <span
        className="list-item-increase-quantity"
        onClick={increaseCurrentQuantity}
      >
        +
      </span>
    </div>
  );
};

export default BasketListButton;
