import axios from "../../axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import UserOrdersListItem from "./UserOrdersListItem";

import module from "./Order.module.css";

import userIcon from "../../images/user-square.svg";

const UserOrdersItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  const orderId = pathname.split("/").pop();

  useEffect(() => {
    axios
      .get("/getOrderById", { params: { orderId } })
      .then((response) => {
        setOrderData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

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
                Список заказа
              </span>
            </div>
          </div>
          {orderData?.items.map((order, index) => (
            <NavLink to={`/order-details/${order?.itemId}`}>
              <UserOrdersListItem
                item={order}
              />
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrdersItems;
