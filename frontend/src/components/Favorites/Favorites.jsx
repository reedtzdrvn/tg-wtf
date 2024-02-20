import HeartIcon from "../../images/heart.svg";

import Image1 from "../../images/image1.png";
import Image2 from "../../images/image2.png";

import CardItem from "../CardItem/CardItem";

const Favorites = () => {
  const favorites = [
    {
      id: 1,
      title: "Belt suit blazer",
      price: 120,
      image: Image1,
      isFavorite: true,
      isAvailable: true,
    },
    {
      id: 2,
      title: "Belt suit blazer",
      price: 120,
      image: Image2,
      isFavorite: true,
      isAvailable: true,
    },
    {
      id: 3,
      title: "Belt suit blazer",
      price: 120,
      image: Image1,
      isFavorite: true,
      isAvailable: true,
    },
    {
      id: 4,
      title: "Belt suit blazer",
      price: 120,
      image: Image2,
      isFavorite: true,
      isAvailable: false,
    },
    {
      id: 5,
      title: "Belt suit blazer",
      price: 120,
      image: Image1,
      isFavorite: true,
      isAvailable: false,
    },
    {
      id: 6,
      title: "Belt suit blazer",
      price: 120,
      image: Image2,
      isFavorite: true,
      isAvailable: true,
    },
  ];

  return (
    <>
      <div className="page cards-wrapper px-[8.5%]">
        <div className="fav-wrapper">
          <div className="flex items-center align-center mt-[5px]">
            <img width={30} height={30} src={HeartIcon} />
            <span
              className="ml-[10px] text-[24px]"
              style={{ fontFamily: "Actor" }}
            >
              Favorites
            </span>
          </div>
        </div>

        <div className="cards grid grid-cols-2 gap-[20px] mt-[15px]">
          {favorites.map((el) => (
            <CardItem
              title={el.title}
              price={el.price}
              image={el.image}
              isFavorite={el.isFavorite}
              isAvailable={el.isAvailable}
              key={el.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
