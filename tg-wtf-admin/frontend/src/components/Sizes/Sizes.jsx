import React, { useState, useEffect } from "react";
import {NavLink} from 'react-router-dom'
import axios from "../../axios";
import SizesListItem from "./SizesListItem";
import userIcon from "../../images/user-square.svg";
import Preloader from "../Preloader/Preloader";
import module from "./Sizes.module.css";

const Sizes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sizes, setSizes] = useState([]);
  const [sizesByName, setSizesByName] = useState([]);
  const [sizeName, setSizeName] = useState("");
  const [showAddSize, setShowAddSize] = useState(false);
  const [newSizeName, setNewSizeName] = useState("");

  const handleAddSize = () => {
    setShowAddSize(true);
  };

  const handleSubmitSize = () => {
    if (newSizeName.trim() !== "") {
      axios.post('/size', { name: newSizeName })
        .then(() => {
          setSizes([...sizes, { name: newSizeName }]);
          setNewSizeName('');
          setShowAddSize(false); // Hide input and OK button, show plus button again
        })
        .catch(error => {
          console.error(error.message);
          alert("Не удалось добавить размер. Пожалуйста, попробуйте еще раз.");
        });
    }
  };

  useEffect(() => {
    axios
      .get(`/sizes`)
      .then((response) => {
        setSizes(response.data);
        setSizesByName(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setSizesByName(
      sizes.filter((size) => size.name.toUpperCase().startsWith(sizeName.toUpperCase()))
    );
  }, [sizeName, sizes]);

  

  return (
    <>
      {isLoading ? ( // Show Preloader if isLoading is true
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
                Список всех размеров
              </span>
            </div>
            <div>
              {showAddSize ? (
                <>
                  <input
                    type="text"
                    value={newSizeName}
                    onChange={(e) => setNewSizeName(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 xl:!text-[16px] xl:!leading-3 focus:outline-none focus:border-blue-500"
                    placeholder="Введите название размера"
                  />
                  <button onClick={handleSubmitSize} className="ml-5 bg-green-500 hover:bg-green-800 text-white rounded-md font-bold px-2 py-2 xl:!text-[16px] xl:!leading-3 focus:outline-none focus:border-blue-500">
                    OK
                  </button>
                </>
              ) : (
                    <button onClick={handleAddSize} className="bg-green-500 hover:bg-green-800 text-white px-2 font-bold rounded">
                        Добавить
                    </button>
              )}
            </div>
            <div>
              <input
                type="text"
                value={sizeName}
                className="border border-gray-300 rounded-md px-3 py-2 xl:!text-[16px] xl:!leading-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setSizeName(e.target.value)}
                placeholder="Введите название товара"
              />
            </div>
          </div>
          {sizesByName.map((size, index) => (    
              <SizesListItem
              key={index}
              size={size}
              setIsLoading={setIsLoading}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Sizes;