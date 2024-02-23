import Logo from "../../images/logo.svg";
import Search from "../../images/search.svg";
import On from "../../images/notification.svg";
import notificationOn from "../../images/notification-on.svg";
import Message from "../../images/message.svg";

import { NavLink } from "react-router-dom";

import "./header.css";

const Header = () => {
    const haveNotifications = true 

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
          <div className="search-btn">
            <img className="search-btn" src={Search} />
          </div>
          <NavLink to={"/notifications"}>
            <div className={`notifications-btn flex items-center align-center ${haveNotifications ? 'blacked-out' : ''}`}>
              <img className={'notifications-btn'} src={haveNotifications ? notificationOn : On} />
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
