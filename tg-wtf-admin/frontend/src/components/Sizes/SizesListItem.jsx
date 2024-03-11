import React, { useState, useEffect } from "react";
import axios from "../../axios";
import module from "./Sizes.module.css";
import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";

const SizesListItem = ({ size, setIsLoading }) => {

  const [, setLoading] = useState(true);

  return (
    <div className={`${module.UserItemsWrapper} w-full xl:px-[30px] px-6 xl:py-[30px] py-4 cursor-pointer`}>
      <div>
        <div className="flex justify-between">
          <div className={`${module.userNameAndSurname} xl:leading-[39px] leading-6 xl:text-[26px] text-[14px] flex items-center`}>
            <img className="xl:mr-[18px] mr-[8px]" src={userIcon} alt="account icon" />
            <span>{size.name}</span>
          </div>
          
          <img width={30} src={arrowIcon} alt="go" />
        </div>
      </div>
    </div>
  );
};

export default SizesListItem;