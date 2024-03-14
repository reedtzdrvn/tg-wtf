import React, { useState, useEffect } from "react";
import axios from "../../axios";
import module from "./Orders.module.css";
import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";

const OrdersListItem = ({ order, setIsLoading }) => {
  const [, setLoading] = useState(true);

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }

    return phoneNumber;
  };

  return (
    <div className={`${module.UserItemsWrapper} w-full xl:px-[30px] px-6 xl:py-[30px] py-4 cursor-pointer`}>
      <div>
        <div className="flex justify-between">
          <div className={`${module.userNameAndSurname} xl:leading-[39px] leading-6 xl:text-[26px] text-[14px] flex items-center`}>
            <img className="xl:mr-[18px] mr-[8px]" src={userIcon} alt="account icon" />
            <span>{order.name}</span>
           
          </div>
          <img width={30} src={arrowIcon} alt="go" />
        </div>
        <div className={`${module.userInfoWrapper} xl:text-[18px] text-[12px] xl:leading-[39px] leading-6 flex xl:justify-between xl:items-center xl:flex-row flex-col w-full px-[8px] xl:px-[40px]`}>
          <div>
            <div>
              <span className="font-bold mr-[5px]">Номер телефона:</span>
              <span>{formatPhoneNumber(order.phoneNumber)}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Telegram username:</span>
              <a className={`${module.telegramLink}`} href={`https://t.me/${order.telegramLink}`}>
                {order.telegramLink}
              </a>
            </div>

            <div>
              <span className="font-bold mr-[5px]">E-mail:</span>
              <span>{order.email}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Дата:</span>
              <span>{order.dateOrder}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Цена:</span>
              <span>{order.totalPrice}</span>
            </div>
            
          </div>

          <div>

            <div>
              <span className="font-bold mr-[5px]">Страна:</span>
              <span>{order.country}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Город:</span>
              <span>{order.city}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Адрес:</span>
              <span>{order.presentAdress}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Номер квартиры:</span>
              <span>{order.apartmentNumber}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Postal code:</span>
              <span>{order.postalCode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersListItem;
