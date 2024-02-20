import "./CardItem.css";

import LikeIcon from '../../images/liked-icon.svg'

const CardItem = ({ title, price, image, isFavorite, isAvailable }) => {
  return (
    <>
      <div className="card-item">
        <div className="relative">
        <img src={image} />
        {isFavorite ? <div className="liked absolute top-[150px] left-[15px] w-[36px] h-[36px]"></div> : <></>}
        </div>
        <div className="card-item-title">{title}</div>
        <div className="card-item-price">{price}$</div>
      </div>
    </>
  );
};

export default CardItem;
