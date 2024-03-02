import { useEffect, useState } from "react";

import DetailsItemIcon from "../../images/basket-item-details.svg";
import DeleteItemIcon from "../../images/delete-basket-icon.svg";

import BasketListButton from "./BasketListButton";

import axios from "../../axios.js";
import { NavLink } from "react-router-dom";

const BasketListItem = ({
  itemId,
  telegramId,
  title,
  price,
  quantity,
  onQuantityChange,
  sizes,
  chosenSize,
  setBasketList,
  basketList,
  chosenSizeId,
  deleteCartItemHandler,
}) => {
  const [curr, setCurr] = useState(quantity);
  const [currPrice, setCurrPrice] = useState(price);
  const [categoryName, setCategoryName] = useState("");


  useEffect(() => {
    axios
      .get("/categoryNameFromItemId", { params: { itemId: itemId } })
      .then((response) => {
        setCategoryName(response.data.categoryName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [basketList]);

  const changeSizeHandler = (currentCount) => {
    console.log(telegramId, itemId, currentCount);
    axios
      .post(`/updateitemcart`, {
        telegramId: telegramId,
        itemId: itemId,
        count: currentCount,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const increaseCurrentQuantity = () => {
    const currentSize = sizes.find(
      (s) => s.name.toLowerCase() === chosenSize.toLowerCase()
    );

    if (curr < currentSize.count) {
      changeSizeHandler(curr + 1);
      setCurr(curr + 1);
      onQuantityChange(price);
    }
  };
  const decreaseCurrentQuantity = () => {
    if (curr >= 2) {
      changeSizeHandler(curr - 1);
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
        <h3 className="font-bold w-3/12">{title} - {chosenSize}</h3>
        <BasketListButton
          quantity={curr}
          increaseCurrentQuantity={increaseCurrentQuantity}
          decreaseCurrentQuantity={decreaseCurrentQuantity}
        />
        <h3 className="w-3/12 flex justify-center">
          ${currPrice.toLocaleString("en-US")}
        </h3>
        <div className="basket-list-item-action-wrapper flex items-center w-3/12 justify-end">
          <NavLink
            to={`/categories/item-details/${categoryName
              .toLowerCase()
              .replace(/\s/g, "-")}/${itemId}`}
            state={{
              itemId: itemId,
              from: categoryName.toLowerCase().replace(/\s/g, "-"),
            }}
          >
            <img src={DetailsItemIcon} width={15} height={15} />
          </NavLink>
          <img
            className="ml-[15px]"
            onClick={() =>
              deleteCartItemHandler(
                sizes.find(
                  (s) => s.name.toLowerCase() === chosenSize.toLowerCase()
                ),
                itemId,
                chosenSizeId
              )
            }
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
