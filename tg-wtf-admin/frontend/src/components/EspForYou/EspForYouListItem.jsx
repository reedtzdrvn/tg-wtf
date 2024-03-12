import React, { useState, useEffect } from "react";
import axios from "../../axios";
import module from "./EspForYou.module.css";
import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";

const EspForYouListItem = ({ esp, setIsLoading }) => {
  const [, setLoading] = useState(true);
  const [showInformation, setShowInformation] = useState(false);

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }

    return phoneNumber;
  };

  const handleItemClick = () => {
    setShowInformation(!showInformation);
  };

  return (
    <div
      className={`${module.UserItemsWrapper} w-full xl:px-[30px] px-6 xl:py-[30px] py-4 cursor-pointer`}
      onClick={handleItemClick}
    >
      <div>
        <div className="flex justify-between">
          <div className={`${module.userNameAndSurname} xl:leading-[39px] leading-6 xl:text-[26px] text-[14px] flex items-center`}>
            <img className="xl:mr-[18px] mr-[8px]" src={userIcon} alt="account icon" />
            <span> {esp.user.firstName} {esp.user.lastName}</span>
          </div>
          
          <img width={30} src={arrowIcon} alt="go" />
        </div>
          <div className={`${module.userInfoWrapper} xl:text-[18px] text-[12px] xl:leading-[39px] leading-6 flex xl:justify-between xl:items-center xl:flex-row flex-col w-full px-[8px] xl:px-[40px]`}>
            <div>
              <div>
                <span className="font-bold mr-[5px]">Telegram username:</span>
                <span>{esp.user.userName}</span>
              </div>
              <div>
                <span className="font-bold mr-[5px]">Номер телефона:</span>
                <span>{formatPhoneNumber(esp.user.phoneNumber)}</span>
              </div>
              <div>
                <span className="font-bold mr-[5px]">Адрес:</span>
                <span>{esp.address}</span>
              </div>
              {showInformation && (
              <div className="flex flex-col">
                <span className="font-bold mr-[5px]">Информация:</span>
                <div  className={`${module.infopopup}`}>{esp.information}</div>
              </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default EspForYouListItem;