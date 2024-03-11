import React, { useState, useEffect } from "react";
import axios from "../../axios";
import module from "./Items.module.css";
import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";

const ItemsListItem = ({ item, setIsLoading }) => {
  const [itemsInProcess, setItemsInProcess] = useState(0);
  const [, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (item._id) {
      axios.get(`/categoryNameFromItemId?itemId=${item._id}`)
        .then(response => {
          // Предполагаем, что API возвращает объект категории, и в этом объекте есть поле name
          setCategoryName(response.data.categoryName);
        })
        .catch(error => {
          console.error("Ошибка при получении информации о категории: ", error);
        })
    }
  }, [item._id]);
  

  return (
    <div className={`${module.UserItemsWrapper} w-full xl:px-[30px] px-6 xl:py-[30px] py-4 cursor-pointer`}>
      <div>
        <div className="flex justify-between">
          <div className={`${module.userNameAndSurname} xl:leading-[39px] leading-6 xl:text-[26px] text-[14px] flex items-center`}>
            <img className="xl:mr-[18px] mr-[8px]" src={userIcon} alt="account icon" />
            <span>{item.name}</span>
          </div>
          
          <img width={30} src={arrowIcon} alt="go" />
        </div>
        <div className={`${module.userInfoWrapper} xl:text-[18px] text-[12px] xl:leading-[39px] leading-6 flex xl:justify-between xl:items-center xl:flex-row flex-col w-full px-[8px] xl:px-[40px]`}>
          <div>

            <div>

              <span className="font-bold mr-[5px]">Category:</span>
              <span>{categoryName}</span>

              <span className="ml-[20px] font-bold mr-[5px]">Price:</span>
              <span>{item.price}</span>

            </div>
            <div className="xl:w-[300px] w-[150px]">
                <img src={item.photos[0]} alt="0" />
            </div>
              
            
          </div>

          <div>

            

          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsListItem;