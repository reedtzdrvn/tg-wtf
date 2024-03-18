import axios from "../../axios";
import { useEffect, useState } from "react";
import FirstSliderImage from "./FirstSliderImage";

const FirstSlider = () => {
  const [images, setImages] = useState([]);

  const handleAddNewImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/addImageToFirstSlider", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const updatedImages = [...images];
        updatedImages.push(response.data.image);
        console.log(updatedImages)
        setImages(updatedImages);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    axios
      .get("/getAllImagesFirstSlider")
      .then((response) => {
        console.log(response.data);
        setImages(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <div className="xl:w-4/5 xl:my-8 p-8 h-full rounded-lg font-[Montserrat]">
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
        {images?.map((image, index) => (
          <FirstSliderImage
            photoIndex={index}
            image={image.imageUrl}
            itemData={images}
            setItemData={setImages}
            key={image._id}
          />
        ))}
      </div>
    </div>
  );
};

export default FirstSlider;
