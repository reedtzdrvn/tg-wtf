import { NavLink } from "react-router-dom";
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
      category: "Hockey uniform",
    },
    {
      id: 2,
      title: "Belt suit blazer",
      price: 120,
      image: Image2,
      isFavorite: true,
      isAvailable: true,
      category: "Football uniform",
    },
    {
      id: 3,
      title: "Belt suit blazer",
      price: 120,
      image: Image1,
      isFavorite: true,
      isAvailable: true,
      category: "Hockey uniform",
    },
    {
      id: 4,
      title: "Belt suit blazer",
      price: 120,
      image: Image2,
      isFavorite: true,
      isAvailable: false,
      category: "Casual",
    },
    {
      id: 5,
      title: "Belt suit blazer",
      price: 120,
      image: Image1,
      isFavorite: true,
      isAvailable: false,
      category: "Streetwear",
    },
    {
      id: 6,
      title: "Belt suit blazer",
      price: 120,
      image: Image2,
      isFavorite: true,
      isAvailable: true,
      category: "Techno",
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
            <NavLink
              to={
                "/categories/item-details/" +
                el.category.toLowerCase().replace(/\s/g, "-") +
                "/" +
                el.id
              }
              state={{
                category: el.category,
                pathTitle: el.category.toLowerCase().replace(/\s/g, "-"),
                from: el.category.toLowerCase().replace(/\s/g, "-")
              }}
            >
              <CardItem
                title={el.title}
                price={el.price}
                image={el.image}
                isFavorite={el.isFavorite}
                isAvailable={el.isAvailable}
                key={el.id}
              />
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
