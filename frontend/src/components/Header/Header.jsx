import Logo from "../../images/logo.svg";
import Search from "../../images/search.svg";
import On from "../../images/notification.svg";
import notificationOn from "../../images/notification-on.svg";
import Message from "../../images/message.svg";
import { useState, useEffect } from "react";
import axios from "../../axios.js";
import { NavLink } from "react-router-dom";

import "./header.css";

const Header = () => {
  const [haveNotifications, setNotifications] = useState();

  let tg = window.Telegram.WebApp;

  let userId = "";

  if (!tg.initDataUnsafe.user) {
    userId = "703999322";
  } else {
    userId = tg.initDataUnsafe.user?.id;
  }

  useEffect(() => {
    axios
      .get(`/notifications`, { params: { telegramId: userId } })
      .then((response) => {
        setNotifications(
          response.data.filter((el) => el.seen === false).length
        );
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  }, []);

  return (
    <div className="flex justify-center align-center">
      <div className="header w-[90%] h-[5%] flex items-center justify-between px-[6px]">
        <div className="header-left-side flex justify-start align-center">
          <img className="header-logo flex" src={Logo} />
          <span className="company_name w-[30px] h-[50px] flex items-center font-bold">
            World Transport Function
          </span>
        </div>
        <div className="header-right-side flex justify-end items-center align-center">
          <NavLink className={'w-[35px] h-[35px] mr-[3px]'} to={"/search"}>
            <div className="search-btn w-full h-full flex justify-center items-center">
              <img className="search-btn" src={Search} />
            </div>
          </NavLink>
          <NavLink to={"/notifications"}>
            <div
              className={`notifications-btn flex items-center align-center ${
                haveNotifications > 0 ? "blacked-out" : ""
              }`}
            >
              <img
                className={"notifications-btn"}
                src={haveNotifications > 0 ? notificationOn : On}
              />
            </div>
          </NavLink>
          <div className="message-btn">
            <img className="message-btn" src={Message} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
