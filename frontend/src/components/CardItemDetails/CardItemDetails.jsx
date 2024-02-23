import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import slide1 from "../../images/detail-item-slide1.png";
import slide2 from "../../images/detail-item-slide2.jpg";
import slide3 from "../../images/detail-item-slide3.jpg";
import returnIcon from "../../images/return-button.svg";
import CardItemCarousel from "./CardItemCarousel";
import CardItemSizeButton from "./CardItemSizeButton";
import CardItemDetailsBasketButton from "./CardItemDetailsBasketButton";

import CardItemStars from "./CardItemStars";

const CardItemDetails = (props) => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentSize, setCurrentSize] = useState("");

  const location = useLocation();
  const { state } = location;

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
      setCurrentAmount(0)
    } else {
      setCurrentSize(size);
      if (currentAmount === 0) setCurrentAmount(1)
    }
  };

  const item = {
    title: "Cappadacia",
    ratingsCount: 258,
    learnersCount: 1983,
    price: 2400,
    estimateDeliveryTime: "5-7",
    availableSizes: ["XXS", "S", "M", "L", "XL", "XXL"],
    description:
      "Cappadocia hot air balloon can be pricey but it all comes down to what you may want to be included in the price. The price to ride a hot air balloon is in the range between $140 and $250 (€125 – €220) per person. The cost depends on the duration of the flight, the moment of the day and whether is peak season or not",
    reviewsCount: 653,
    starsCount: 4,
    images: [slide1, slide2, slide3],
    category: "Hockey uniform",
  };

  return (
    <>
      <div>
        <CardItemCarousel images={item.images} />
        <NavLink
          to={`/categories/${state.from}`}
          state={{ category: item.category, pathTitle: item.category.toLowerCase().replace(/\s/g, "-") }}
        >
          <div className="card-item-details-return-button flex justify-center items-center absolute left-[20px] top-[25px]">
            <img className="m-[10px]" src={returnIcon} width={20} height={20} />
          </div>
        </NavLink>
        <div className="card-item-details-wrapper absolute top-[55%] w-full">
          <div className="card-item-details-title-wrapper flex justify-between items-center">
            <div className="card-item-details-title-left-side">
              <span>{item.title}</span>
              <div className="card-item-details-title-ratings flex justify-start items-center">
                <CardItemStars starCount={item.starsCount} />
                <div className="ml-[8px] mt-[3px]">
                  <span>{item.ratingsCount} Ratings</span>
                  <span> | </span>
                  <span>{item.learnersCount} Learners</span>
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
                {item.estimateDeliveryTime} days
              </div>
            </div>
          </div>
          <div className="ml-[20px] mt-[15px] card-item-details-size-wrapper">
            <span className="card-item-details-size-title">Size</span>
            <div className="mt-[10px]">
              {item.availableSizes.map((size) => (
                <CardItemSizeButton
                  currentSize={currentSize}
                  chooseCurrentSizeHandler={chooseCurrentSizeHandler}
                  size={size}
                />
              ))}
            </div>
          </div>

          <div className="card-item-details-description ml-[20px] mr-[25px] mt-[25px]">
            {item.description}
          </div>

          <CardItemDetailsBasketButton
            increaseAmountHandler={increaseAmountHandler}
            decreaseAmountHandler={decreaseAmountHandler}
            currentAmount={currentAmount}
          />
        </div>
      </div>
    </>
  );
};

export default CardItemDetails;
