import CardItem from "../CardItem/CardItem";

import slide from "../../images/slide.png";

import { NavLink } from "react-router-dom";

const CategoriesList = () => {
  const allCategories = [
    {
      id: 1,
      title: "Hockey uniform",
      image: slide,
      isFavorite: false,
      isAvailable: true,
    },
    {
      id: 2,
      title: "Football uniform",
      image: slide,
      isFavorite: false,
      isAvailable: true,
    },
    {
      id: 3,
      title: "Streetwear",
      image: slide,
      isFavorite: false,
      isAvailable: true,
    },
    {
      id: 4,
      title: "Casual",
      image: slide,
      isFavorite: false,
      isAvailable: true,
    },
    {
      id: 5,
      title: "Techno",
      image: slide,
      isFavorite: false,
      isAvailable: true,
    },
  ];

  return (
    <>
      <div className="page all-categories-list grid grid-cols-2 gap-[20px] mt-[15px] px-[8.5%]">
        {allCategories.map((category) => (
          <NavLink
            to={
              "/categories/" + category.title.toLowerCase().replace(/\s/g, "-")
            }
            state={{
              category: category.title,
              pathTitle: category.title.toLowerCase().replace(/\s/g, "-"),
            }}
          >
            <CardItem
              title={category.title}
              image={category.image}
              isFavorite={category.isFavorite}
              isAvailable={category.isAvailable}
              price={null}
              key={category.id}
            />
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default CategoriesList;
