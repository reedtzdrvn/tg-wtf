import increaseAmountIcon from "../../images/increase-amount-icon.svg";
import decreaseAmountIcon from "../../images/decrease-amount-icon.svg";

const CardItemDetailsBasketButton = ({
  currentAmount,
  increaseAmountHandler,
  decreaseAmountHandler,
}) => {
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
