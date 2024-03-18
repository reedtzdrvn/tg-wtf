import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavigationPopUp = ({ handleMenuToggle }) => {
  const popUpRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        handleMenuToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleMenuToggle]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
      <div ref={popUpRef} className="bg-white p-4 rounded-lg w-3/5 h-3/5">
        <div className="flex justify-between items-center">
          <NavLink to={"/"} onClick={handleMenuToggle}>
            <div>
              <span className="font-[Poppins] text-[18px] bold">Dashboard</span>
              <span className="font-[Poppins] text-[12px] text-gray-500 ml-[2px]">
                v.01
              </span>
            </div>
          </NavLink>
          <div className="flex items-center" onClick={handleMenuToggle}>
            <span className="text-[28px]" style={{ color: "red" }}>
              &times;
            </span>
          </div>
        </div>
        <ul className="mt-[5%] md:mt-[30px] flex justify-around items-center flex-col">
          <div className="flex mt-[5%] md:mt-0 justify-center border-b-2 pb-[10px] border-gray-300 w-full">
            <li>
              <NavLink to={"/users"} onClick={handleMenuToggle}>
                Users
              </NavLink>
            </li>
          </div>
          <div className="flex mt-[5%] justify-center border-b-2 pb-[10px] border-gray-300 w-full">
            <li>
              <NavLink to={"/items"} onClick={handleMenuToggle}>
                Items
              </NavLink>
            </li>
          </div>
          <div className="flex mt-[5%] justify-center border-b-2 pb-[10px] border-gray-300 w-full">
            <li>
              <NavLink to={"/sizes"} onClick={handleMenuToggle}>
                Sizes
              </NavLink>
            </li>
          </div>
          <div className="flex mt-[5%] justify-center border-b-2 pb-[10px] border-gray-300 w-full">
            <li>
              <NavLink to={"/orders"} onClick={handleMenuToggle}>
                Orders
              </NavLink>
            </li>
          </div>
          <div className="flex mt-[5%] justify-center border-b-2 pb-[10px] border-gray-300 w-full">
            <li>
              <NavLink to={"/espforyou"} onClick={handleMenuToggle}>
                Esp for you
              </NavLink>
            </li>
          </div>
          <div className="flex mt-[5%] justify-center border-b-2 pb-[10px] border-gray-300 w-full">
            <li>
              <NavLink to={"/first-slider"} onClick={handleMenuToggle}>
                First Slider
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavigationPopUp;
