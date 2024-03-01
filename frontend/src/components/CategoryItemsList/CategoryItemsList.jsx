import { useState, useEffect } from "react";
import Image1 from "../../images/image1.png";
import CardItem from "../CardItem/CardItem";

import axios from "../../axios.js";

import { NavLink, useLocation } from "react-router-dom";
import Preloader from "../errors/Preloader.js";

const CategoryItemsList = (props) => {
  let tg = window.Telegram.WebApp;

  let userId = "";

  if (!tg.initDataUnsafe.user) {
    userId = "703999322";
  } else {
    userId = tg.initDataUnsafe.user?.id;
  }

  const location = useLocation();
  const { state } = location;

  const [isItemsLoading, setIsItemsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const [ItemsFromSelecterCategory, setItemsFromSelecterCategory] = useState(
    []
  );
  const [user, setUser] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const getCategoryId = (categoryName) => {
    axios
      .get(`/category`, { params: { categoryName: categoryName } })
      .then((response) => {
        setCategoryId(response.data._id);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  };

  const getItemsFromSelectedCategory = (categoryId) => {
    axios
      .get(`/category-items`, { params: { categoryId: categoryId } })
      .then((response) => {
        setItemsFromSelecterCategory(response.data);
        setIsItemsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  };

  useEffect(() => {
    getCategoryId(state.category);
  }, []);

  useEffect(() => {
    if (user && user.favourites.length !== 0 && ItemsFromSelecterCategory.length !== 0) {
      const temp = ItemsFromSelecterCategory.map(el =>
        user.favourites.some(item => String(item) === String(el._id))
      );
      setFavorites(temp);
    }
  }, [user, ItemsFromSelecterCategory]);


  useEffect(() => {
    if (categoryId !== null) {
      getItemsFromSelectedCategory(categoryId);
      getUserData();
    }
  }, [categoryId]);

  const getUserData = () => {
    axios
      .get(`/user`, { params: { telegramId: userId } })
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  };

  if (isItemsLoading) {
    return <Preloader />;
  }


  return (
    <>
      <div className="page px-[8.5%]">
        <div className="category-items-list-title mt-[5px]">
          <span className="text-[24px]" style={{ fontFamily: "Actor" }}>
            {state.category}
          </span>
        </div>
        <div className="category-items-list-wrapper grid grid-cols-2 gap-[20px] mt-[15px]">
          {ItemsFromSelecterCategory.map((el, index) => (
            <NavLink
              to={"item-details/" + state.pathTitle + "/" + el._id}
              state={{ from: state.pathTitle, itemId: el._id }}
              key={el._id}
            >
              <CardItem
                itemId={el._id}
                title={el.name}
                price={el.price}
                image={el.photos[0]}
                isFavorite={favorites[index]}
                isAvailable={el.sizes.length === 0 ? false : true}
                
              />
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryItemsList;
