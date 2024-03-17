import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "../../axios";
import OrdersListItem from "./OrdersListItem";
import userIcon from "../../images/user-square.svg";
import Preloader from "../Preloader/Preloader";
import module from "./Orders.module.css";

const Orders = () => {
  const location = useLocation();

  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersByTelegramLink, setOrdersByTelegramLink] = useState([]);
  const [telegramLink, setTelegramLink] = useState(
    state?.telegramLink ? state.telegramLink : ""
  );

  useEffect(() => {
    axios
      .get(`/orders`)
      .then((response) => {
        setOrders(response.data);
        setOrdersByTelegramLink(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setOrdersByTelegramLink(
      orders.filter((order) => order.telegramLink.startsWith(telegramLink))
    );
  }, [telegramLink, orders]);

  return (
    <>
      {isLoading ? ( // Show Preloader if isLoading is true
        <div className="xl:w-4/5 min-h-screen flex justify-center items-center">
          <Preloader />
        </div>
      ) : (
        <div className="xl:w-4/5 w-full h-full px-[40px] py-[20px]">
          <div
            className={`${module.titleWrapper} text-[14px] xl:text-[26px] xl:leading-[39px] leading-3 flex xl:items-center justify-between xl:flex-row flex-col pb-[8px] border-b-2 mb-6`}
          >
            <div className="flex items-center xl:mb-0 mb-[10px]">
              <img src={userIcon} alt="account icon" />
              <span className={`${module.usersTitle} ml-[12px]`}>
                Список всех заказов
              </span>
            </div>
            <div>
              <input
                type="text"
                value={telegramLink}
                className="border border-gray-300 rounded-md px-3 py-2 xl:!text-[16px] xl:!leading-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setTelegramLink(e.target.value)}
                placeholder="@example"
              />
            </div>
          </div>
          {ordersByTelegramLink.map((order, index) => (
            <NavLink to={`/order/${order._id}`}>
              <OrdersListItem
                key={index}
                order={order}
                setIsLoading={setIsLoading}
              />
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default Orders;
