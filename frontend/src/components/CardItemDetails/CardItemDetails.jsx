import { useState } from "react";
import slide1 from "../../images/detail-item-slide1.png";
import slide2 from "../../images/detail-item-slide2.jpg";
import slide3 from "../../images/detail-item-slide3.jpg";
import CardItemCarousel from "./CardItemCarousel";
import CardItemSizeButton from "./CardItemSizeButton";

import CardItemStars from "./CardItemStars";

const CardItemDetails = (props) => {
  const [currentSize, setCurrentSize] = useState('')

  const chooseCurrentSizeHandler = (size) => {
    if (currentSize === '') {
      setCurrentSize(size);
    }
    if (currentSize === size) {
      setCurrentSize('')
    }
  }

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
  };

  return (
    <>
      <div>
        <CardItemCarousel images={item.images} />
        <div className="card-item-details-wrapper absolute top-[55%] w-full">
          <div className="card-item-details-title-wrapper flex justify-between items-center">
            <div className="card-item-details-title-left-side">
              <span>{item.title}</span>
              <div className="card-item-details-title-ratings flex justify-start items-center">
                <CardItemStars starCount={item.starsCount} />
                <div className="ml-[8px]">
                  <span>{item.ratingsCount} Ratings</span>
                  <span> | </span>
                  <span>{item.learnersCount} Learners</span>
                </div>
              </div>
            </div>
            <div className="card-item-details-title-right-side flex flex-col justify-center items-center">
              <div>
                <span className="card-item-details-dollar-sign">$</span>
                <span> {item.price}</span>
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
                <CardItemSizeButton currentSize={currentSize} chooseCurrentSizeHandler={chooseCurrentSizeHandler} size={size} />
              ))}
            </div>
          </div>

          <div className="card-item-details-description ml-[20px] mr-[25px] mt-[25px]">
              {item.description}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItemDetails;
