import { useState, useEffect } from "react";
import userIcon from "../../images/user-square.svg";
import axios from "../../axios";
import Preloader from "../Preloader/Preloader";
import CategoriesListItem from "./CategoriesListItem";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesByName, setCategoriesByName] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", newCategoryName)

    try {
      const response = await axios.post(`/category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCategories([...categories, response.data]);
      setShowAddCategory(false)
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error.message);
    }
  };

  useEffect(() => {
    axios
      .get(`/categories`)
      .then((response) => {
        setCategories(response.data);
        setCategoriesByName(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setCategoriesByName(
      categories.filter((category) =>
        category.title.toUpperCase().startsWith(categoryName.toUpperCase())
      )
    );
  }, [categoryName, categories]);
  return (
    <>
      {isLoading ? (
        <div className="xl:w-4/5 min-h-screen flex justify-center items-center">
          <Preloader />
        </div>
      ) : (
        <div className="xl:w-4/5 w-full h-full px-[40px] py-[20px]">
          <div
            className={`${module.titleWrapper} text-[14px] xl:text-[26px] xl:leading-[39px] leading-3 flex xl:items-center justify-between xl:flex-row flex-col pb-[8px] border-b-2 mb-6`}
          >
            <div className="flex items-center xl:mb-0 mb-[10px]">
              <img src={userIcon} alt="account icon" />
              <span className={`${module.usersTitle} ml-[12px]`}>
                Список всех категорий
              </span>
            </div>
            <div>
              {showAddCategory ? (
                <>
                  <div className="flex items-center flex-col">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 xl:text-[16px] xl:leading-3 focus:outline-none focus:border-blue-500"
                        placeholder="Введите название категории"
                      />
                      <input
                        type="file"
                        id="fileInput"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="ml-3 hidden"
                        // Добавляем скрытый класс, чтобы скрыть стандартный визуальный элемент загрузки файла
                      />
                      <label
                        htmlFor="fileInput"
                        className="ml-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md font-bold px-2 py-1 xl:text-[14px] xl:leading-3 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        Выбрать файл
                      </label>
                    </div>
                    <div className="w-full">
                      <button
                        onClick={handleFileUpload}
                        className="mt-3 w-full bg-green-500 hover:bg-green-800 text-white rounded-md font-bold px-2 py-2 xl:text-[16px] xl:leading-3 focus:outline-none focus:border-blue-500"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={handleAddCategory}
                  className="bg-green-500 hover:bg-green-800 text-white px-2 font-bold rounded pb-[4px] py-[1px]"
                >
                  <div>Добавить</div>
                </button>
              )}
            </div>
            <div>
              <input
                type="text"
                value={categoryName}
                className="border border-gray-300 rounded-md px-3 py-2 xl:!text-[16px] xl:!leading-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Введите название категории"
              />
            </div>
          </div>
          {categoriesByName?.map((category) => (
            <CategoriesListItem
              category={category}
              key={category._id}
              categories={categories}
              setCategories={setCategories}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Categories;
