import Image1 from "../../images/image1.png";
import CardItem from "../CardItem/CardItem";

import { useLocation } from "react-router-dom";

const CategoryItemsList = (props) => {
  const location = useLocation();
  const { state } = location;

  const ItemsFromSelecterCategory = [
    {
      id: 1,
      title: "Belt suit blazer",
      price: 120,
      image: Image1,
      isFavorite: false,
      isAvailable: true,
    },
    {
      id: 2,
      title: "Belt suit blazer",
      price: 120,
      image: Image1,
      isFavorite: false,
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
      image: Image1,
      isFavorite: false,
      isAvailable: true,
    },
  ];

  return (
    <>
      <div className="px-[8.5%]">
        <div className="category-items-list-title mt-[5px]">
          <span className="text-[24px]" style={{fontFamily: 'Actor'}}>{state.from}</span>
        </div>
        <div className="category-items-list-wrapper grid grid-cols-2 gap-[20px] mt-[15px]">
          {ItemsFromSelecterCategory.map((el) => (
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

export default CategoryItemsList;
