import userIcon from "../../images/user-square.svg";
import CategoryImage from "./CategoryImage";
import cross from "../../images/cross.svg";
import module from "./Categories.module.css";

import axios from "../../axios";

const CategoriesListItem = ({ category, categories, setCategories }) => {
  const handleDeleteCategory = () => {
    axios
      .post("/deleteCategoryAndItems", { categoryId: category._id })
      .then((response) => {
        setCategories(categories.filter((el) => el._id !== category._id));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div
      className={`${module.UserItemsWrapper} w-full xl:px-[30px] px-6 xl:py-[30px] py-4`}
    >
      <div className="abosolute top-0 left-0 cursor-pointer">
        <img
          onClick={handleDeleteCategory}
          className="w-[20px] cursor-pointer"
          src={cross}
          alt="delete"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <div
            className={`${module.userNameAndSurname} xl:leading-[39px] leading-6 xl:text-[26px] text-[14px] flex items-center`}
          >
            <img
              className="xl:mr-[18px] mr-[8px]"
              src={userIcon}
              alt="account icon"
            />
            <span>{category.title}</span>
          </div>
          <CategoryImage
            image={category.image}
            categoryId={category._id}
            itemData={categories}
            setItemData={setCategories}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesListItem;
