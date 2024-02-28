import { NavLink } from "react-router-dom";
// import slide from "../../images/slide.png";
import CarouselSecondSlide from "./CarouselSecondISlide";
import { useState, useEffect } from "react";

import axios from '../../axios.js'

const Carousel2 = () => {
  const [caterogies, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  }, []);

  return (
    <>
      <div className="mt-[16px]">
        <div className="CarouselSecond flex gap-[8px]">
          {caterogies.map((el) => (
            <CarouselSecondSlide
              imageSrc={el.image}
              title={el.title}
              key={el._id}
            />
          ))}
        </div>
      </div>
      <div className="mt-[32px] flex justify-center items-center">
        <NavLink to="/categories">
          <button className="bg-black text-white flex justify-center items-center buttonview">
            View all
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Carousel2;
