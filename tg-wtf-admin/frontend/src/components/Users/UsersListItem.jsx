import React, { useState, useEffect } from "react";
import axios from "../../axios";
import module from "./Users.module.css";
import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";

const UsersListItem = ({ user, setIsLoading }) => {
  const [itemsInProcess, setItemsInProcess] = useState(0);
  const [, setLoading] = useState(true);

  useEffect(() => {
    if (user.orders && user.orders.length > 0) {
      axios
        .get("/getOrderAccountInfo", { params: { orderIds: user.orders } })
        .then((response) => {
          let counter = 0;
          for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < response.data[i].items?.length; j++) {
              if (response.data[i]?.items[j]?.status !== 5) {
                counter++;
              }
            }
          }
          setItemsInProcess(counter);
        })
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          setLoading(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setLoading(false);
    }
  }, [user.orders]);

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
            <span>{user.firstName}</span>
            <span className="xl:ml-[8px] ml-[4px]">{user.lastName}</span>
          </div>
          <img width={30} src={arrowIcon} alt="go" />
        </div>
        <div className={`${module.userInfoWrapper} xl:text-[18px] text-[12px] xl:leading-[39px] leading-6 flex xl:justify-between xl:items-center xl:flex-row flex-col w-full px-[8px] xl:px-[40px]`}>
          <div>
            <div>
              <span className="font-bold mr-[5px]">Номер телефона:</span>
              <span>{formatPhoneNumber(user.phoneNumber)}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Telegram username:</span>
              <a className={`${module.telegramLink}`} href={`https://t.me/${user.userName}`}>
                @{user.userName}
              </a>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Telegram ID:</span>
              <span>{user.telegramId}</span>
            </div>
          </div>

          <div>
            <div>
              <span className="font-bold mr-[5px]">Orders count:</span>
              <span>{user.orders?.length}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Items in process:</span>
              <span>{itemsInProcess}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Notifications count:</span>
              <span>{user.notifications?.length}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Especially for you count:</span>
              <span>{user.especiallyForYou?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
