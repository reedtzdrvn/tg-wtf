import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import axios from "../../axios.js";

import slide1 from "../../images/detail-item-slide1.png";
import slide2 from "../../images/detail-item-slide2.jpg";
import slide3 from "../../images/detail-item-slide3.jpg";
import returnIcon from "../../images/return-button.svg";
import CardItemCarousel from "./CardItemCarousel";
import CardItemSizeButton from "./CardItemSizeButton";
import CardItemDetailsBasketButton from "./CardItemDetailsBasketButton";

import CardItemStars from "./CardItemStars";
import CardItemDetailsRatings from "./CardItemDetailsRatings";
import Preloader from "../errors/Preloader.js";

const CardItemDetails = (props) => {
  const [item, setItem] = useState(false);

  const [showRatings, setShowRatings] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentSize, setCurrentSize] = useState("");

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    axios
      .get(`/size`, { params: { itemId: state.itemId } })
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
      
  }, []);

  if (!item) {
    return <Preloader />
  }

  const changeShowRatingsHandler = () => {
    setShowRatings(!showRatings);
  };

  const increaseAmountHandler = () => {
    setCurrentAmount(currentAmount + 1);
  };

  const decreaseAmountHandler = () => {
    if (currentAmount > 1) {
      setCurrentAmount(currentAmount - 1);
    } else {
      setCurrentAmount(0);
      setCurrentSize("");
    }
  };

  const chooseCurrentSizeHandler = (size) => {
    if (currentSize === size) {
      setCurrentSize("");
      setCurrentAmount(0);
    } else {
      setCurrentSize(size);
      if (currentAmount === 0) setCurrentAmount(1);
    }
  };


  return (
    <>
      {item && item.photos.length >= 2 && (
        <div>
          <CardItemCarousel images={item.photos.slice(1)} />
          {!showRatings ? (
            <NavLink
              to={`/categories/${state.from}`}
              state={{
                category: item.category.title,
                pathTitle: item.category.title.toLowerCase().replace(/\s/g, "-"),
              }}
            >
              <div className="card-item-details-return-button flex justify-center items-center absolute left-[20px] top-[25px]">
                <img
                  className="m-[10px]"
                  src={returnIcon}
                  width={20}
                  height={20}
                />
              </div>
            </NavLink>
          ) : (
            <div
              onClick={changeShowRatingsHandler}
              className="card-item-details-return-button flex justify-center items-center absolute left-[20px] top-[25px]"
            >
              <img
                className="m-[10px]"
                src={returnIcon}
                width={20}
                height={20}
              />
            </div>
          )}
          <div className="card-item-details-wrapper absolute top-[55%] w-full">
            {!showRatings ? (
              <>
                <div className="card-item-details-title-wrapper flex justify-between items-center">
                  <div className="card-item-details-title-left-side">
                    <span>{item.name}</span>
                    <div
                      onClick={changeShowRatingsHandler}
                      className="card-item-details-title-ratings flex justify-start items-center"
                    >
                      <CardItemStars starCount={0} />
                      <div className="ml-[8px] mt-[2px]">
                        <span>{item.reviews.length} Ratings</span>
                        <span> | </span>
                        <span>{113} Learners</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-item-details-title-right-side flex flex-col justify-center items-center">
                    <div>
                      <span className="card-item-details-dollar-sign">$</span>
                      <span>
                        {" "}
                        {currentAmount === 0
                          ? item.price
                          : item.price * currentAmount}
                      </span>
                    </div>
                    <div className="card-item-details-estimateDelTime">
                      {item.deliveryTime} days
                    </div>
                  </div>
                </div>
                <div className="ml-[20px] mt-[15px] card-item-details-size-wrapper">
                  <span className="card-item-details-size-title">Size</span>
                  <div className="mt-[10px]">
                    {item.sizes.map((size) => (
                      <CardItemSizeButton
                        currentSize={currentSize}
                        chooseCurrentSizeHandler={chooseCurrentSizeHandler}
                        size={size.name.toUpperCase()}
                        key={size._id}
                      />
                    ))}
                  </div>
                </div>
                <div className="card-item-details-description ml-[20px] mr-[25px] mt-[25px] ">
                  {item.description}
                </div>
                <CardItemDetailsBasketButton
                  increaseAmountHandler={increaseAmountHandler}
                  decreaseAmountHandler={decreaseAmountHandler}
                  currentAmount={currentAmount}
                />{" "}
              </>
            ) : (
              <CardItemDetailsRatings
                title={item.title}
                deliveryTime={item.deliveryTime}
                currentPrice={
                  currentAmount === 0 ? item.price : item.price * currentAmount
                }
                ratingsScore={0}
                reviewsCount={item.reviews.length}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardItemDetails;
