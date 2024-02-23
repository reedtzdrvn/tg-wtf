const CardItemDetailsRatingsReviews = ({ reviewsCount }) => {
  return (
    <div>
      <ul>
        <li className="flex items-center mb-[8px] relative">
          <span className="mr-[5px] w-[10px] text-center">5</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 35 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8234 1.39058C16.2724 0.00861251 18.2276 0.00860948 18.6766 1.39058L21.628 10.4742C21.8288 11.0922 22.4048 11.5106 23.0546 11.5106H32.6057C34.0587 11.5106 34.6629 13.3701 33.4873 14.2242L25.7604 19.8381C25.2346 20.2201 25.0147 20.8972 25.2155 21.5152L28.1669 30.5988C28.6159 31.9807 27.0342 33.1299 25.8586 32.2758L18.1317 26.6619C17.6059 26.2799 16.8941 26.2799 16.3683 26.6619L8.64136 32.2758C7.46579 33.1299 5.88407 31.9807 6.33309 30.5988L9.28453 21.5152C9.48534 20.8972 9.26536 20.2201 8.73963 19.8381L1.01266 14.2242C-0.162908 13.3701 0.441253 11.5106 1.89434 11.5106H11.4454C12.0952 11.5106 12.6712 11.0922 12.872 10.4742L15.8234 1.39058Z"
              fill="#5D5DFF"
            />
          </svg>
          <div className="card-item-details-ratings-rectangles-wrapper w-[40%] h-[1vh] ml-[8px]">
            <div className="card-item-details-ratings-rectangle w-full h-full"></div>
          </div>

          <div className="card-item-details-ratings-reviews-count px-[10px] py-[7.5px] absolute right-[0]">{reviewsCount} reviews</div>
        </li>
        <li className="flex items-center mb-[8px]">
          <span className="mr-[5px] w-[10px] text-center">4</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 35 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8234 1.39058C16.2724 0.00861251 18.2276 0.00860948 18.6766 1.39058L21.628 10.4742C21.8288 11.0922 22.4048 11.5106 23.0546 11.5106H32.6057C34.0587 11.5106 34.6629 13.3701 33.4873 14.2242L25.7604 19.8381C25.2346 20.2201 25.0147 20.8972 25.2155 21.5152L28.1669 30.5988C28.6159 31.9807 27.0342 33.1299 25.8586 32.2758L18.1317 26.6619C17.6059 26.2799 16.8941 26.2799 16.3683 26.6619L8.64136 32.2758C7.46579 33.1299 5.88407 31.9807 6.33309 30.5988L9.28453 21.5152C9.48534 20.8972 9.26536 20.2201 8.73963 19.8381L1.01266 14.2242C-0.162908 13.3701 0.441253 11.5106 1.89434 11.5106H11.4454C12.0952 11.5106 12.6712 11.0922 12.872 10.4742L15.8234 1.39058Z"
              fill="#5D5DFF"
            />
          </svg>
          <div className="card-item-details-ratings-rectangles-wrapper w-[40%] h-[1vh] ml-[8px]">
            <div className="card-item-details-ratings-rectangle w-[80%] h-full"></div>
          </div>
        </li>
        <li className="flex items-center mb-[8px]">
          <span className="mr-[5px] w-[10px] text-center">3</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 35 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8234 1.39058C16.2724 0.00861251 18.2276 0.00860948 18.6766 1.39058L21.628 10.4742C21.8288 11.0922 22.4048 11.5106 23.0546 11.5106H32.6057C34.0587 11.5106 34.6629 13.3701 33.4873 14.2242L25.7604 19.8381C25.2346 20.2201 25.0147 20.8972 25.2155 21.5152L28.1669 30.5988C28.6159 31.9807 27.0342 33.1299 25.8586 32.2758L18.1317 26.6619C17.6059 26.2799 16.8941 26.2799 16.3683 26.6619L8.64136 32.2758C7.46579 33.1299 5.88407 31.9807 6.33309 30.5988L9.28453 21.5152C9.48534 20.8972 9.26536 20.2201 8.73963 19.8381L1.01266 14.2242C-0.162908 13.3701 0.441253 11.5106 1.89434 11.5106H11.4454C12.0952 11.5106 12.6712 11.0922 12.872 10.4742L15.8234 1.39058Z"
              fill="#5D5DFF"
            />
          </svg>
          <div className="card-item-details-ratings-rectangles-wrapper w-[40%] h-[1vh] ml-[8px]">
            <div className="card-item-details-ratings-rectangle w-[60%] h-full"></div>
          </div>
        </li>
        <li className="flex items-center mb-[8px]">
          <span className="mr-[5px] w-[10px] text-center">2</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 35 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8234 1.39058C16.2724 0.00861251 18.2276 0.00860948 18.6766 1.39058L21.628 10.4742C21.8288 11.0922 22.4048 11.5106 23.0546 11.5106H32.6057C34.0587 11.5106 34.6629 13.3701 33.4873 14.2242L25.7604 19.8381C25.2346 20.2201 25.0147 20.8972 25.2155 21.5152L28.1669 30.5988C28.6159 31.9807 27.0342 33.1299 25.8586 32.2758L18.1317 26.6619C17.6059 26.2799 16.8941 26.2799 16.3683 26.6619L8.64136 32.2758C7.46579 33.1299 5.88407 31.9807 6.33309 30.5988L9.28453 21.5152C9.48534 20.8972 9.26536 20.2201 8.73963 19.8381L1.01266 14.2242C-0.162908 13.3701 0.441253 11.5106 1.89434 11.5106H11.4454C12.0952 11.5106 12.6712 11.0922 12.872 10.4742L15.8234 1.39058Z"
              fill="#5D5DFF"
            />
          </svg>
          <div className="card-item-details-ratings-rectangles-wrapper w-[40%] h-[1vh] ml-[8px]">
            <div className="card-item-details-ratings-rectangle w-[40%] h-full"></div>
          </div>
        </li>
        <li className="flex items-center mb-[8px]">
          <span className="mr-[5px] w-[10px] flex justify-center">1</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 35 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8234 1.39058C16.2724 0.00861251 18.2276 0.00860948 18.6766 1.39058L21.628 10.4742C21.8288 11.0922 22.4048 11.5106 23.0546 11.5106H32.6057C34.0587 11.5106 34.6629 13.3701 33.4873 14.2242L25.7604 19.8381C25.2346 20.2201 25.0147 20.8972 25.2155 21.5152L28.1669 30.5988C28.6159 31.9807 27.0342 33.1299 25.8586 32.2758L18.1317 26.6619C17.6059 26.2799 16.8941 26.2799 16.3683 26.6619L8.64136 32.2758C7.46579 33.1299 5.88407 31.9807 6.33309 30.5988L9.28453 21.5152C9.48534 20.8972 9.26536 20.2201 8.73963 19.8381L1.01266 14.2242C-0.162908 13.3701 0.441253 11.5106 1.89434 11.5106H11.4454C12.0952 11.5106 12.6712 11.0922 12.872 10.4742L15.8234 1.39058Z"
              fill="#5D5DFF"
            />
          </svg>
          <div className="card-item-details-ratings-rectangles-wrapper w-[40%] h-[1vh] ml-[8px]">
            <div className="card-item-details-ratings-rectangle w-[20%] h-full"></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardItemDetailsRatingsReviews;
