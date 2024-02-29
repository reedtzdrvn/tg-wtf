import CardItem from "../CardItem/CardItem";

import slide from "../../images/slide.png";

import { useState, useEffect } from "react";

import axios from '../../axios.js'

import { NavLink } from "react-router-dom";
import Preloader from "../errors/Preloader.js";

const CategoriesList = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`/categories`)
      .then((response) => {
        setAllCategories(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  }, []);

  if (allCategories.length === 0) {
    return <Preloader />
  }

  return (
    <>
      <div className="page all-categories-list grid grid-cols-2 gap-[20px] mt-[15px] px-[8.5%]">
        {allCategories.map((category) => (
          <NavLink
            to={
              "/categories/" + category.title.toLowerCase().replace(/\s/g, "-")
            }
            state={{
              category: category.title,
              pathTitle: category.title.toLowerCase().replace(/\s/g, "-"),
            }}
          >
            <CardItem
              title={category.title}
              image={category.image}
              isFavorite={false}
              isAvailable={true}
              price={null}
              key={category._id}
            />
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default CategoriesList;
