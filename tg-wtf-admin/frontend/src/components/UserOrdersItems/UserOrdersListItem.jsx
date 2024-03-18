import axios from "../../axios";
import { useState, useEffect } from "react";

import module from "./Order.module.css";

import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";
import { NavLink, useLocation } from "react-router-dom";

const UserOrdersListItem = ({ item }) => {
  const [categoryName, setCategoryName] = useState("");
  const [itemData, setItemData] = useState(null);

  const location = useLocation()
  const {pathname} = location

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'сборка';
      case 2:
        return 'заказ отправлен';
      case 3:
        return 'прибыл в страну назначения';
      case 4:
        return 'в пути к заказчику';
      case 5:
        return 'доставлен';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (item._id) {
      axios
        .get("/item", { params: { itemId: item.itemId } })
        .then((response) => {
          setItemData(response.data);
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
  return (
    <NavLink to={`${pathname}/${item.itemId}`}>
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
                  <span>{getStatusText(item?.status)}</span>
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
                <span>
                  {new Date(item?.approximateTime)
                    .toLocaleDateString("en-US")
                    .toLowerCase()}
                </span>
              </div>
              <div className="xl:w-[300px] w-[150px]">
                {itemData !== 0 && <img src={itemData?.photos[0]} alt="0" />}
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default UserOrdersListItem;
