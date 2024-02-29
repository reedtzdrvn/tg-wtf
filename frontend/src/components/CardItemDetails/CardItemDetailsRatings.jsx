import starRating from "../../images/star-rating.svg";
import arrowReviewButton from "../../images/arrow-review-button.svg";

import CardItemDetailsRatingsReviews from "./CardItemDetailsRatingsReviews";

import CardItemStars from "./CardItemStars";
import { useState } from "react";

const CardItemDetailsRatings = ({
  title,
  deliveryTime,
  currentPrice,
  ratingsScore,
  reviewsCount,
  reviews
}) => {


  const [allReviewsOn, setAllReviewsOn] = useState(false)



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
            {parseFloat(ratingsScore.toFixed(1))}
          </span>
          <img className="ml-[8px]" src={starRating} width={42} height={42} />
        </div>

        <div className="relative">
          <CardItemDetailsRatingsReviews reviews={reviews} />
          <div className="card-item-details-ratings-reviews-count px-[10px] py-[7.5px] absolute right-[0] top-[0]">{reviews.length} reviews</div>
        </div>

        <div className="card-item-details-ratings-reviews-elements mt-[30px]">
          {!allReviewsOn ? (
          <>
          <div className="flex justify-between items-center">
                <span className="card-item-details-ratings-reviews-title">
                  {reviews[reviews.length -1].telegramId}
                </span>
                <CardItemStars starCount={reviews[reviews.length -1].ratingsCount} />
              </div>
              <div className="flex justify-center">
                <span className="card-item-details-ratings-reviews-subtitle">
                {reviews[reviews.length -1].textReview}
                </span>
              </div>
              <div className="mt-[5px] ml-[5px] flex items-center cursor-pointer" onClick={() => setAllReviewsOn(true)}>
                <button>
                  <img src={arrowReviewButton} width={20} height={20} />
                </button>
                <div className="card-item-details-ratings-all-reviews-text ml-[8px] mt-[2px]" >ALL REVIEWS</div>
            </div>
          </>
          ): (
            <div className="flex gap-[16px] flex-col">
              {reviews.slice(-100).reverse().map((review) => (
                <div>
                  <div className="flex justify-between items-center">
                    <span className="card-item-details-ratings-reviews-title">
                      {review.telegramId}
                    </span>
                    <CardItemStars starCount={review.ratingsCount} />
                  </div>
                  <div className="flex justify-center">
                    <span className="card-item-details-ratings-reviews-subtitle">
                      {review.textReview}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </>
  );
};

export default CardItemDetailsRatings;
