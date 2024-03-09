import { useState } from "react";

import module from "./Users.module.css";

import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";
import { useEffect } from "react";
import axios from "../../axios";

const UsersListItem = ({ user }) => {
  const [itemsInProcess, setItemsInProcess] = useState(0);

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
        });
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
    <div
      className={`${module.UserItemsWrapper} w-full px-[30px] py-[30px] cursor-pointer`}
    >
      <div>
        <div className="flex justify-between">
          <div className={`${module.userNameAndSurname} flex items-center`}>
            <img className="mr-[18px]" src={userIcon} alt="account icon" />
            <span>{user.firstName}</span>
            <span className="ml-[8px]">{user.lastName}</span>
          </div>
          <img width={30} src={arrowIcon} alt="go" />
        </div>
        <div
          className={`${module.userInfoWrapper} flex justify-between items-center  w-full px-[40px]`}
        >
          <div>
            <div>
              <span className="font-bold mr-[5px]">Номер телефона:</span>
              <span>{formatPhoneNumber(user.phoneNumber)}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Telegram username:</span>
              <a
                className={`${module.telegramLink}`}
                href={`https://t.me/${user.userName}`}
              >
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
              <span className="font-bold mr-[5px]">
                Especially for you count:
              </span>
              <span>{user.especiallyForYou?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
