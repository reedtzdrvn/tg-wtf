import React, { useState, useEffect } from "react";
import {NavLink} from 'react-router-dom'
import axios from "../../axios";
import ItemsListItem from "./ItemsListItem";
import userIcon from "../../images/user-square.svg";
import Preloader from "../Preloader/Preloader";
import module from "./Items.module.css";

const Items = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsByName, setItemsByName] = useState([]);
  const [itemName, setItemName] = useState("");

  const handleAddNewItem = () => {
    axios
      .post(`/addItemAdmin`)
      .then((response) => {
        setItems((prevItems) => prevItems.concat(response.data));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    axios
      .get(`/items`)
      .then((response) => {
        setItems(response.data);
        setItemsByName(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setItemsByName(
      items.filter((item) => item.name.toUpperCase().startsWith(itemName.toUpperCase()))
    );
  }, [itemName, items]);

  return (
    <>
      {isLoading ? ( // Show Preloader if isLoading is true
        <div className="xl:w-4/5 min-h-screen flex justify-center items-center">
          <Preloader />
        </div>
      ) : (
        <div className="xl:w-4/5 w-full h-full px-[40px] py-[20px]">
          <div
            className={`${module.titleWrapper} text-[14px] xl:text-[26px] xl:leading-[39px] leading-3 flex xl:items-center justify-between xl:flex-row flex-col pb-[8px] border-b-2 mb-6`}
          >
            <div className="flex items-center xl:mb-0 mb-[10px]">
              <img src={userIcon} alt="account icon" />
              <span className={`${module.usersTitle} ml-[12px]`}>
                Список всех товаров
              </span>
            </div>
            <div>
              <input
                type="text"
                value={itemName}
                className="border border-gray-300 rounded-md px-3 py-2 xl:!text-[16px] xl:!leading-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Введите название товара"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div to="/itemadd" className="bg-lime-600 py-[6px] px-[48px] rounded-3xl flex justify-center items-center mb-[24px] cursor-pointer" onClick={handleAddNewItem}>
              Добавить товар
            </div>
          </div>
          
          {itemsByName.map((item, index) => (
            <NavLink to={`/item/${item._id}`}>
              <ItemsListItem
              key={index}
              item={item}
              setIsLoading={setIsLoading}
            />
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default Items;