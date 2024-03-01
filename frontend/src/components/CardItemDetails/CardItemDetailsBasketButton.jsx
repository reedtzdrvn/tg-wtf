import increaseAmountIcon from "../../images/increase-amount-icon.svg";
import decreaseAmountIcon from "../../images/decrease-amount-icon.svg";
import { useNavigate } from "react-router-dom";

import axios from "../../axios.js";
import { useState } from "react";

const CardItemDetailsBasketButton = ({
  currentAmount,
  increaseAmountHandler,
  decreaseAmountHandler,
  itemId,
  telegramId,
  sizeId,
  setErrorMessage
}) => {
  let navigate = useNavigate();
  

  const handleAddToBasket = () => {
    axios
      .post(`/additemcart`, {
        itemId: itemId,
        count: currentAmount,
        telegramId: telegramId,
        sizeId: sizeId,
      }).then((response) => {
        navigate("/basket");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
      });
  };

  return (
    <>
      {currentAmount >= 1 ? (
        <div className="flex justify-center items-center mt-[30px] pb-[12%]">
          <div className="amount-controllers-buttons-wrapper flex justify-center items-center">
            <div
              onClick={increaseAmountHandler}
              className="amount-button-increase-circle"
            >
              {/* мне похуй я дединсайд */}
              <span className="amount-button-sign">+</span>
            </div>
            <span className="mx-[10px]">{currentAmount}</span>
            <div
              onClick={decreaseAmountHandler}
              className="amount-button-decrease-circle"
            >
              <span className="amount-button-sign">-</span>
            </div>
          </div>
          <div
            className="add-to-basket-button-wrapper"
            onClick={() =>
              handleAddToBasket(itemId, currentAmount, telegramId, sizeId)
            }
          >
            <button className="add-to-basket-button">Add to Basket</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CardItemDetailsBasketButton;
