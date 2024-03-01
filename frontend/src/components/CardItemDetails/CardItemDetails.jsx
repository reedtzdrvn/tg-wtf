import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import axios from "../../axios.js";

import returnIcon from "../../images/return-button.svg";
import hearticon from "../../images/favorite.svg"
import hearticonActive from "../../images/favorite-active.svg"
import CardItemCarousel from "./CardItemCarousel";
import CardItemSizeButton from "./CardItemSizeButton";
import CardItemDetailsBasketButton from "./CardItemDetailsBasketButton";

import CardItemStars from "./CardItemStars";
import CardItemDetailsRatings from "./CardItemDetailsRatings";
import Preloader from "../errors/Preloader.js";

const CardItemDetails = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [item, setItem] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let tg = window.Telegram.WebApp;

  let userId = "";

  if (!tg.initDataUnsafe.user) {
    userId = "703999322";
  } else {
    userId = tg.initDataUnsafe.user?.id;
  }

  const [showRatings, setShowRatings] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentSize, setCurrentSize] = useState("");
  const [currentSizeId, setCurrentSizeId] = useState(null);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    getItemData();
    getUserData();
  }, []); 

  function postAnToggle() {
    setIsActive(!isActive)
    postFavorite()
  }


  const getItemData = () => {
    axios
      .get(`/size`, { params: { itemId: state.itemId } })
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  };


  const postFavorite = () => {
    axios
      .post(`/additemtofavorites`, { itemId: state.itemId, telegramId: userId } )
      .then((response) => {
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  };

  const getUserData = () => {
    axios
      .get(`/user`, { params: { telegramId: userId } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  };

  if (!item) {
    return <Preloader />;
  }
  const changeShowRatingsHandler = () => {
    setShowRatings(!showRatings);
  };

  const increaseAmountHandler = () => {
    const selectedSize = item.sizes.find(
      (s) => s.name.toLowerCase() === currentSize.toLowerCase()
    );

    if (selectedSize && currentAmount < selectedSize.count) {
      setCurrentAmount(currentAmount + 1);
    }
  };

  const decreaseAmountHandler = () => {
    if (currentAmount > 1) {
      setCurrentAmount(currentAmount - 1);
    } else {
      setCurrentAmount(0);
      setCurrentSize("");
    }
  };

  const chooseCurrentSizeHandler = (size, sizeId) => {
    const selectedSize = item.sizes.find(
      (s) => s.name.toLowerCase() === size.toLowerCase()
    );
    if (currentSize === size) {
      setCurrentSize("");
      setCurrentSizeId(null);
      setCurrentAmount(0);
    } else {
      setCurrentSize(size);
      setCurrentSizeId(sizeId);
      if (currentAmount === 0) setCurrentAmount(1);
      else {
        if (currentAmount > selectedSize.count) {
          setCurrentAmount(selectedSize.count);
        }
      }
    }
  };

  const calculateRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    let totalRating = 0;
    for (const review of reviews) {
      totalRating += review.ratingsCount;
    }

    return totalRating / reviews.length;
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
                pathTitle: item.category.title
                  .toLowerCase()
                  .replace(/\s/g, "-"),
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
          <div
              onClick = {postAnToggle}
              className="card-item-details-return-button flex justify-center items-center absolute right-[20px] top-[25px]"
            >
              <img
                className="m-[10px]"
                src={isActive ? hearticonActive : hearticon}
                width={20}
                height={20}
              />
            </div>
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
                      <CardItemStars
                        starCount={Math.round(calculateRating(item.reviews))}
                      />
                      <div className="ml-[8px] mt-[2px]">
                        <span>{item.reviews.length} Ratings</span>
                        <span> | </span>
                        <span>{item.reviews.length} Learners</span>
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
                        sizeId={size._id}
                        key={size._id}
                      />
                    ))}
                  </div>
                  <span className="card-item-details-error-wrapper text-red-500">
                    {errorMessage}
                  </span>
                </div>
                <div className="card-item-details-description ml-[20px] mr-[25px] mt-[25px] ">
                  {item.description}
                </div>
                <CardItemDetailsBasketButton
                  increaseAmountHandler={increaseAmountHandler}
                  decreaseAmountHandler={decreaseAmountHandler}
                  currentAmount={currentAmount}
                  itemId={item._id}
                  telegramId={userId}
                  sizeId={currentSizeId}
                  setErrorMessage={setErrorMessage}
                />{" "}
              </>
            ) : (
              <CardItemDetailsRatings
                title={item.name}
                deliveryTime={item.deliveryTime}
                currentPrice={
                  currentAmount === 0 ? item.price : item.price * currentAmount
                }
                ratingsScore={calculateRating(item.reviews)}
                reviewsCount={item.reviews.length}
                reviews={item.reviews}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardItemDetails;
