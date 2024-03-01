import { useState, useEffect } from "react";
import BasketIcon from "../../images/basket-icon.svg";
import Moneybag from "../../images/moneybag.svg";
import PositionsIcon from "../../images/positions-icon.svg";
import BasketListItem from "../BasketListItem/BasketListItem";
import Preloader from "../errors/Preloader.js";

import axios from "../../axios.js";

import "./Basket.css";
import { NavLink } from "react-router-dom";

const Basket = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [basketList, setBasketList] = useState([]);

  let tg = window.Telegram.WebApp;

  let userId = "";

  if (!tg.initDataUnsafe.user) {
    userId = "703999322";
  } else {
    userId = tg.initDataUnsafe.user?.id;
  }

  const deleteCartItemHandler = (currentSize, itemId) => {
    axios
      .post(`/deleteItemFromCart`, {
        telegramId: userId,
        itemId: itemId,
        sizeItem: currentSize.id,
      })
      .then((response) => {
        let temp = [];
        basketList.map((item) => {
          const tempId = `${itemId}${currentSize.id}`;
          console.log(tempId);
          if (tempId !== `${itemId}${item.chosenId}`) {
            temp.push(item);
          }
        });
        console.log(temp);
        // console.log(`upd: ${updatedBasketList}`);
        setBasketList([...temp]);
        console.log(basketList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`/getitemcart`, { params: { telegramId: userId } })
      .then((response) => {
        setBasketList(response.data);
        setIsLoading(false);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  }, []);

  let currentSum = 0;
  basketList?.map((el) => {
    currentSum = currentSum + el.price * el.chosenCount;
  });

  const [currentTotalSum, setCurrentTotalSum] = useState(currentSum);

  useEffect(() => {
    setCurrentTotalSum(currentSum);
  }, [basketList]);

  const onQuantityChange = (sum) => {
    setCurrentTotalSum(currentTotalSum + sum);
  };

  return (
    <>
      {!isLoading ? (
        <div className="page px-[30px] mt-[10px]">
          <div className="flex ml-[22px] items-center align-center mt-[5px]">
            <img width={30} height={30} src={BasketIcon} />
            <span
              className="ml-[10px] text-[24px]"
              style={{ fontFamily: "Actor" }}
            >
              Basket
            </span>
          </div>
          <div className="basket-information-wrapper mt-[17px] gap-[5px]">
            <div className="basket-total-invested flex justify-start items-center">
              <div className="basket-total-icon-wrapper w-[42px] h-[42px] ml-[16px] flex justify-center items-center">
                <img src={Moneybag} width={18} height={18} />
              </div>
              <div className="ml-[20px]">
                <span className="basket-total-invested-title">
                  Total Invested
                  <br /> Amount
                </span>
                <span className="basket-total-price">
                  {currentTotalSum.toLocaleString("en-US")}
                </span>
              </div>
            </div>
            <div className="basket-positions-wrapper flex justify-center items-center py-[20px] px-[15px]">
              <div className="basket-positions-icon-wrapper w-[42px] h-[42px] flex justify-center items-center">
                <img src={PositionsIcon} />
              </div>
              <div className="ml-[12px]">
                <span className="basket-total-positions-title block">
                  Positions
                </span>
                <span className="basket-total-positions-count">
                  {basketList.length}
                </span>
              </div>
            </div>
          </div>
          <div className="basket-list-items-wrapper px-[20px] mt-[35px]">
            <div className="basket-list-title flex justify-between">
              <span className="w-3/12">Position</span>
              <span className="w-3/12 text-center">Quantity</span>
              <span className="w-3/12 text-center">Price</span>
              <span className="w-3/12 flex justify-end">Action</span>
            </div>
            <div className="basket-list-items flex flex-col">
              {console.log(basketList)}
              {basketList.map((el) => (
                <BasketListItem
                  itemId={el.itemId}
                  telegramId={userId}
                  onQuantityChange={onQuantityChange}
                  title={el.name}
                  price={el.price}
                  quantity={el.chosenCount}
                  key={`${el.itemId}${el.chosenSize}`}
                  sizes={el.sizes}
                  chosenSize={el.chosenSize}
                  setBasketList={setBasketList}
                  basketList={basketList}
                  deleteCartItemHandler={deleteCartItemHandler}
                  chosenSizeId={el.chosenId}
                />
              ))}
            </div>
          </div>
          {!(basketList.length === 0) ? (
            <div className="basket-list-purchase mt-[20%] flex justify-center">
              <NavLink
                to="/basket/placingorder"
                className="basket-list-purchase-button px-[88px] py-[12px]"
              >
                I want this!
              </NavLink>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default Basket;
