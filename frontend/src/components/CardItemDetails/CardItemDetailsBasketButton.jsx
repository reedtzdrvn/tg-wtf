import increaseAmountIcon from "../../images/increase-amount-icon.svg";
import decreaseAmountIcon from "../../images/decrease-amount-icon.svg";
import { NavLink } from "react-router-dom";

import axios from '../../axios.js'

const CardItemDetailsBasketButton = ({
  currentAmount,
  increaseAmountHandler,
  decreaseAmountHandler,
  itemId,
  telegramId,
  sizeId,
}) => {
  const handleAddToBasket = () => {
    axios
      .post(`/additemcart`, {
        itemId: itemId,
        count: currentAmount,
        telegramId: telegramId,
        sizeId: sizeId,
      })
      .catch((error) => {
        console.log(error);
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
          <div className="add-to-basket-button-wrapper">
            <NavLink to={"/basket"}>
              <button
                onClick={() =>
                  handleAddToBasket(itemId, currentAmount, telegramId, sizeId)
                }
                className="add-to-basket-button"
              >
                Add to Basket
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CardItemDetailsBasketButton;
