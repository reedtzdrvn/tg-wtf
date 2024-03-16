import axios from "../../axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import ItemRanges from "./ItemRanges";

import module from "./Item.module.css";
import ItemImage from "./ItemImage";

const Item = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemData, setItemData] = useState({});
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(itemData?.name ? itemData.name : "");
  const [selectedCategory, setSelectedCategory] = useState(
    itemData?.category?.title || ""
  );
  const [itemSizeCount, setItemSizeCount] = useState({});
  const [cost, setCost] = useState(itemData?.price || 0);
  const [discount, setDiscount] = useState(itemData?.sale || 0);
  const [delivery, setDelivery] = useState(itemData?.deliveryTime || 0);
  const [description, setDescription] = useState(itemData?.description || ""); // Добавляем стейт для описания
  const [sizes, setSizes] = useState(itemData?.sizes || []);

  const location = useLocation();
  const { pathname } = location;

  const itemId = pathname.split("/").pop();

  useEffect(() => {
    axios
      .get("/size", { params: { itemId } })
      .then((response) => {
        setItemData(response.data);
        setName(response.data.name);
        setSelectedCategory(response.data.category?.id); // Установить начальное значение категории в виде id
        setDescription(response.data.description); // Устанавливаем описание
        setSizes(response.data.sizes);
        setIsLoading(false);

        axios
          .get("/categories")
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [itemData]);

  useEffect(() => {
    if (itemData.category && itemData.category.title) {
      setSelectedCategory(itemData.category.title);
      setCost(itemData.price);
      setDiscount(itemData.sale);
      setDelivery(itemData.deliveryTime);
      setDescription(itemData.description);

      const tmp = {};
      itemData?.sizes.map((el) => {
        tmp[el._id] = el.count;
      });
      setItemSizeCount(tmp);
      // Обновляем описание при изменении данных о товаре
    }
  }, [itemData]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Обработчик изменения выбранной категории
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleDeliveryChange = (event) => {
    setDelivery(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddNewImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("itemId", itemId);

      try {
        const response = await axios.post("/addImageOfItem", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Обновляем ссылку в состоянии itemData после успешного запроса
        const updatedItemData = { ...itemData };
        console.log(itemData);
        updatedItemData.photos.push(response.data.imageUrl);
        setItemData(updatedItemData);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedCategory);
    const selectedCategoryObject = categories.find(
      (val) => val.title === selectedCategory
    );
    const categoryId = selectedCategoryObject
      ? selectedCategoryObject._id
      : null;

    const dataToSend = {
      name: name,
      categoryId: categoryId,
      description: description,
      sizesData: itemSizeCount,
      sale: discount,
      delivery: delivery,
      description: description,
      itemId: itemId, // Включаем описание в отправляемые данные
    };
    // console.log("Data to send:", dataToSend);

    axios
      .put("/updateItemDetails", dataToSend)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      {!isLoading ? (
        <div className="xl:w-4/5 xl:my-8 p-8 h-full rounded-lg font-[Montserrat]">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter Name"
                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                  />
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border border-gray-300 rounded px-3 py-1"
                  >
                    <option hidden={true} value={itemData.category.title}>
                      {itemData.category.title}
                    </option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter Description"
                  className="border border-gray-300 rounded px-3 py-1 w-full mr-2 mt-4" // добавляем стили
                />

                <div className="mt-[20px] flex xl:flex-row ">
                  <div className="mr-[15px]">
                    <label>Стоимость</label>
                    <input
                      type="number"
                      value={cost}
                      onChange={handleCostChange}
                      placeholder="500"
                      className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                    />
                  </div>
                  <div className="mr-[15px]">
                    <label>Скидка</label>

                    <input
                      type="number"
                      value={discount}
                      onChange={handleDiscountChange}
                      placeholder="0"
                      className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                    />
                  </div>

                  <div>
                    <label>Доставка</label>
                    <input
                      type="text"
                      value={delivery}
                      onChange={handleDeliveryChange}
                      placeholder="1-2"
                      className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                    />
                  </div>
                </div>
              </div>

              <div className="w-2/5 flex justify-center">
                <ItemImage
                  itemData={itemData}
                  setItemData={setItemData}
                  itemId={itemData._id}
                  photoIndex={0}
                  image={itemData?.photos[0]}
                />
              </div>
            </div>

            <div>
              <ItemRanges
                setItemSizeCount={setItemSizeCount}
                itemSizeCount={itemSizeCount}
                sizes={sizes}
                setSizes={setSizes}
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </form>

          <div className="mt-[30px] flex items-center gap-8">
            <div>
              <label htmlFor="add-image">
                <div className="text-[24px] px-[20px] py-[10px] bg-white cursor-pointer">
                  +
                </div>
              </label>
              <input
                id="add-image"
                type="file"
                className="hidden"
                onChange={handleAddNewImage}
              />
            </div>
            {itemData?.photos?.length > 1 &&
              itemData?.photos.slice(1).map((img, index) => (
                <div>
                  <ItemImage
                    itemData={itemData}
                    setItemData={setItemData}
                    itemId={itemData._id}
                    photoIndex={index + 1}
                    image={img}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="xl:w-4/5 w-full min-h-screen flex justify-center items-center">
          <Preloader />
        </div>
      )}
    </>
  );
};

export default Item;
