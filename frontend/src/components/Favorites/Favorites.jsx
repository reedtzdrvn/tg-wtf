import { NavLink } from "react-router-dom";
import HeartIcon from "../../images/heart.svg";

import Preloader from "../errors/Preloader";

import axios from "../../axios.js";

import CardItem from "../CardItem/CardItem";
import { useEffect, useState } from "react";

const Favorites = () => {
  let tg = window.Telegram.WebApp;

  let userId = "";

  if (!tg.initDataUnsafe.user) {
    userId = "703999322";
  } else {
    userId = tg.initDataUnsafe.user?.id;
  }


  const [favoritesData, setFavoritesData] = useState([]);
  const [availability, setAvailability] = useState([])

  useEffect(() => {
    axios
      .get(`/getuserwithfavorites`, { params: { telegramId: userId } })
      .then((response) => {
        setFavoritesData(response.data);

        let temp = []
        if (response.data.userItemsInfo.length != 0) {
          let flag = null
          response.data.userItemsInfo.map((el) => {
            flag = true
            for (let index = 0; index < el.itemSizes.length; index++) {
              if (el.itemSizes[index].count > 0) {
                flag = false
                temp.push(true)
                break;
              }
            }
            if (flag) {
              temp.push(false)
            }
          })
        }
        setAvailability(temp)
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  }, []);

  return (
    <>
      {!(favoritesData.length === 0) ? (
        <div className="page cards-wrapper px-[8.5%]">
          <div className="fav-wrapper">
            <div className="flex items-center align-center mt-[5px]">
              <img width={30} height={30} src={HeartIcon} />
              <span
                className="ml-[10px] text-[24px]"
                style={{ fontFamily: "Actor" }}
              >
                Favorites
              </span>
            </div>
          </div>

          <div className="cards grid grid-cols-2 gap-[20px] mt-[15px]">
            {favoritesData.userItemsInfo.map((el, index) => (
              <NavLink
                to={
                  "/categories/item-details/" +
                  el.itemCategoryName.toLowerCase().replace(/\s/g, "-") +
                  "/" +
                  el.itemId
                }
                state={{
                  category: el.itemCategoryName,
                  pathTitle: el.itemCategoryName
                    .toLowerCase()
                    .replace(/\s/g, "-"),
                  from: el.itemCategoryName.toLowerCase().replace(/\s/g, "-"),
                  itemId: el.itemId
                }}
                key={index}
              >
                <CardItem
                  title={el.itemName}
                  price={el.itemPrice}
                  image={el.itemPhotos[0]}
                  isFavorite={true}
                  isAvailable={availability[index]}
                  key={el.itemId}
                />
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default Favorites;
