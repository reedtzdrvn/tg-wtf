import React, { useState, useEffect } from "react";
import axios from "../../axios";
import module from "./EspForYou.module.css";
import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";

const EspForYouListItem = ({ esp, setIsLoading }) => {
  const [, setLoading] = useState(true);

 
  

  return (
    <div className={`${module.UserItemsWrapper} w-full xl:px-[30px] px-6 xl:py-[30px] py-4 cursor-pointer`}>
      <div>
        <div className="flex justify-between">
          <div className={`${module.userNameAndSurname} xl:leading-[39px] leading-6 xl:text-[26px] text-[14px] flex items-center`}>
            <img className="xl:mr-[18px] mr-[8px]" src={userIcon} alt="account icon" />
            <span>ИМЯ ПОЛЬЗОВАТЕЛЯ</span>
            <span className='ml-[5px]'> НОМЕР ТЕЛЕФОНА</span>
            <span className='ml-[5px]'> USERNAME TELEGRAM</span>
          </div>
          
          <img width={30} src={arrowIcon} alt="go" />
        </div>
        <div className={`${module.userInfoWrapper} xl:text-[18px] text-[12px] xl:leading-[39px] leading-6 flex xl:justify-between xl:items-center xl:flex-row flex-col w-full px-[8px] xl:px-[40px]`}>
 
            <div>

              <span className="font-bold mr-[5px]">Adress:</span>
              <span>{esp.address}</span>

              <div>
                <span className="font-bold mr-[5px]">Information:</span>
                <span>{esp.information}</span>
              </div>

            </div>

        </div>
      </div>
    </div>
  );
};

export default EspForYouListItem;