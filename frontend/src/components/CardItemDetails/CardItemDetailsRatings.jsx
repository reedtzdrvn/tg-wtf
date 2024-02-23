import starRating from "../../images/star-rating.svg";
import arrowReviewButton from "../../images/arrow-review-button.svg";

import CardItemDetailsRatingsReviews from "./CardItemDetailsRatingsReviews";

import CardItemStars from "./CardItemStars";

const CardItemDetailsRatings = ({
  title,
  deliveryTime,
  currentPrice,
  ratingsScore,
  reviewsCount,
}) => {
  return (
    <>
      <div className="mx-[25px] pb-[8.5%]">
        <div className="card-item-details-ratings-title flex justify-between items-center mt-[35px]">
          <div className="card-item-details-ratings-title-left-side flex flex-col">
            <span className="card-item-details-ratings-title-left-side-header">
              {title}
            </span>
            <span className="card-item-details-ratings-title-left-side-deltime">
              {deliveryTime} days
            </span>
          </div>
          <div className="card-item-details-ratings-title-right-side flex items-center">
            <span className="card-item-details-dollar-sign">$</span>
            <span className="card-item-details-current-price ml-[5px]">
              {currentPrice}
            </span>
          </div>
        </div>
        <div className="card-item-details-ratings-stars-wrapper flex items-center">
          <span className="card-item-details-ratings-score">
            {ratingsScore}
          </span>
          <img className="ml-[8px]" src={starRating} width={42} height={42} />
        </div>

        <CardItemDetailsRatingsReviews reviewsCount={reviewsCount} />

        <div className="card-item-details-ratings-reviews-elements mt-[30px]">
          <div className="flex justify-between items-center">
            <span className="card-item-details-ratings-reviews-title">
              Name
            </span>
            <CardItemStars starCount={5} />
          </div>
          <div className="flex justify-center">
            <span className="card-item-details-ratings-reviews-subtitle">
              5-star reviews from satisfied customer
            </span>
          </div>
          <div className="mt-[5px] ml-[5px] flex items-center">
            <button>
              <img src={arrowReviewButton} width={20} height={20} />
            </button>
            <span className="card-item-details-ratings-all-reviews-text ml-[8px] mt-[2px]">ALL REVIEWS</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItemDetailsRatings;
