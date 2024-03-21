import Carousel1 from "../Carousel1/Carousel1";
import "./home.css";
import Carousel2 from "../Carousel2/Carousel2";
import background from "../../images/background.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "../errors/Preloader";
import axios from "../../axios.js";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [caterogies, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`/categories`)
      .then((response) => {
        setCategories(response.data);

        axios
          .get("/getAllImagesFirstSlider")
          .then((response) => {
            setSlides(response.data);
          })
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  }, []);

  return (
    <>
      {(caterogies.length === 0) || (slides.length === 0) ? (
        <Preloader />
      ) : (
        <div className="page">
          <Carousel1 slides={slides} />
          <Carousel2 caterogies={caterogies} />
          <div className="mx-[8.5%] mt-[32px] relative">
            <img src={background} alt="1" className="imghomepage" />
            <div className="absolute top-0 w-full text-white px-[10%] h-[152px] py-[20px]">
              <div className="lend flex flex-col gap-2 leading-10 font-bold">
                <div className="text-left">ESPECIALLY</div>
                <div className="text-right">FOR YOU</div>
              </div>
              <div className="flex justify-center">
                <NavLink
                  to="/especially-for-you"
                  className="mt-[6px] buttonlend flex justify-center items-center"
                >
                  Checkout
                </NavLink>
              </div>
            </div>
          </div>
          <div className="textlendunder mx-[8.5%] mt-[8px] text-center">
            *We can do everything and even more. If something is not in our
            catalog, you can always place a special order.
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
