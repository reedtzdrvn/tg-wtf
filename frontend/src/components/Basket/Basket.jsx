import { useState, useEffect } from "react";
import BasketIcon from "../../images/basket-icon.svg";
import Moneybag from "../../images/moneybag.svg";
import PositionsIcon from "../../images/positions-icon.svg";
import BasketListItem from "../BasketListItem/BasketListItem";

import axios from '../../axios.js'

import "./Basket.css";
import { NavLink } from "react-router-dom";

const Basket = () => {
  const [basketList, setBasketList] = useState([])

  let tg = window.Telegram.WebApp;

  let userId = "";

  if (!tg.initDataUnsafe.user) {
    userId = "703999322";
  } else {
    userId = tg.initDataUnsafe.user?.id;
  }

  useEffect(() => {
    axios
      .get(`/getitemcart`, { params: { telegramId: userId } })
      .then((response) => {
        setBasketList(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  }, []);
  console.log(basketList)
  // const basketList = [
  //   {
  //     id: 1,
  //     title: "Skins",
  //     quantity: 1,
  //     price: 40500,
  //   },
  //   {
  //     id: 2,
  //     title: "Skins",
  //     quantity: 1,
  //     price: 40500,
  //   },
  //   {
  //     id: 3,
  //     title: "Skins",
  //     quantity: 1,
  //     price: 40500,
  //   },
  //   {
  //     id: 4,
  //     title: "Skins",
  //     quantity: 1,
  //     price: 40500,
  //   },
  //   {
  //     id: 5,
  //     title: "Skins",
  //     quantity: 1,
  //     price: 40500,
  //   },
  // ];

  let currentSum = 0;
  basketList.map((el) => {
    currentSum = currentSum + el.price;
  });

  const [currentTotalSum, setCurrentTotalSum] = useState(currentSum);

  const onQuantityChange = (sum) => {
    setCurrentTotalSum(currentTotalSum + sum);
  };

  return (
    <>
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
                {currentTotalSum.toLocaleString('en-US')}
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
            {basketList.map((el) => (
              <BasketListItem
                onQuantityChange={onQuantityChange}
                title={el.title}
                price={el.price}
                quantity={el.quantity}
                key={el.id}
              />
            ))}
          </div>
        </div>
        <div className="basket-list-purchase mt-[20%] flex justify-center">
          <NavLink to='/basket/placingorder'
               className="basket-list-purchase-button px-[88px] py-[12px]">
              I want this!
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Basket;
