import axios from "../../axios";
import { useState, useEffect } from "react";

import module from "./Order.module.css";

import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";

const UserOrdersListItem = ({ item }) => {
  const [categoryName, setCategoryName] = useState("");
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    if (item._id) {
      axios
        .get("/item", { params: {itemId: item.itemId} })
        .then((response) => {
          setItemData(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error.message);
        });

      axios
        .get(`/categoryNameFromItemId?itemId=${item.itemId}`)
        .then((response) => {
          // Предполагаем, что API возвращает объект категории, и в этом объекте есть поле name
          setCategoryName(response.data.categoryName);
        })
        .catch((error) => {
          console.error("Ошибка при получении информации о категории: ", error);
        });
    }
  }, []);
  console.log(itemData)
  return (
    <div
      className={`${module.UserItemsWrapper} w-full xl:px-[30px] px-6 xl:py-[30px] py-4 cursor-pointer`}
    >
      <div>
        <div className="flex justify-between">
          <div
            className={`${module.userNameAndSurname} xl:leading-[39px] leading-6 xl:text-[26px] text-[14px] flex items-center`}
          >
            <img
              className="xl:mr-[18px] mr-[8px]"
              src={userIcon}
              alt="account icon"
            />
            <span>{itemData?.name}</span>
          </div>

          <img width={30} src={arrowIcon} alt="go" />
        </div>
        <div
          className={`${module.userInfoWrapper} xl:text-[18px] text-[12px] xl:leading-[39px] leading-6 flex-col flex xl:justify-between w-full px-[8px] xl:px-[40px]`}
        >
          <div className="flex justify-between mt-3 items-center">
            <div className="flex flex-col">
              <div>
              <span className="mr-[5px] font-bold">Category:</span>
              <span>{categoryName}</span>
              </div>

              <div>
              <span className="mr-[5px] font-bold">Price:</span>
              <span>{itemData?.price * item?.count}</span>
              </div>

              <div>
              <span className="mr-[5px] font-bold">Status:</span>
              <span>{item?.status}</span>
              </div>

              <span className=" font-bold">Track:</span>
              <span>{item?.track}</span>

              <div>
              <span className="mr-[5px] font-bold">Count:</span>
              <span className="">{item?.count}</span>
              </div>

              <div>
              <span className="mr-[5px] font-bold">Size:</span>
              <span>{item?.size}</span>
              </div>

              <span className=" font-bold">Approximate Time:</span>
              <span>{item?.approximateTime}</span>
            </div>
            <div className="xl:w-[300px] w-[150px]">
              {itemData !== 0 && <img src={itemData?.photos[0]} alt="0" />}
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersListItem;
