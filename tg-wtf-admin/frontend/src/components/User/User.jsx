import axios from "../../axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

import module from './User.module.css'

import cartIcon from "../../images/basket-active.svg";
import ordersIcon from "../../images/moneybag.svg";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedData, setUpdatedData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
  const location = useLocation();
  const { pathname } = location;

  const telegramId = pathname.split("/").pop();

  useEffect(() => {
    axios
      .get(`/user`, { params: { telegramId } })
      .then((response) => {
        setUserData(response.data[0]);
        setUpdatedData(response.data[0]); // Set initial values for updatedData
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .post(`/updateuser`, updatedData)
      .then((response) => {
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after 2 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <>
      {!isLoading && userData ? (
        <div className="xl:w-4/5 xl:my-8 p-8 h-full rounded-lg font-[Montserrat]">
          <h2 className="text-2xl font-bold mb-4">
            {userData.firstName} {userData.lastName}
          </h2>
          <div className="flex flex-col xl:flex-row">
            <div className="xl:w-3/5 w-full">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={updatedData.firstName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full xl:w-4/5"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={updatedData.lastName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full xl:w-4/5"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={updatedData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full xl:w-4/5"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Username:
                </label>
                <input
                  type="text"
                  name="userName"
                  value={updatedData.userName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full xl:w-4/5"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Phone Number:
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={updatedData.phoneNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full xl:w-4/5"
                />
              </div>
              <div className="flex justify-center xl:block">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
              </div>
              {showSuccessMessage && (
                <div className={`absolute top-3 mx-auto bg-green-500 text-white p-4 rounded ${module.fadeOut}`}>
                  Data saved successfully!
                </div>
              )}
            </div>

            <div className="flex xl:flex-col max-sm:grid max-sm:grid-cols-2 max-sm:gap-4 lg:flex-row justify-around xl:mt-[0] mt-[50px] items-center xl:w-2/5 w-full">
              <div className="bg-white xl:w-[250px] cursor-pointer rounded-xl px-[30px] py-[10px] lg:px-[50px] lg:py-[25px] xl:px-[80px] xl:py-[50px]">
                <div className="flex justify-center items-center flex-col">
                  <img className="lg:w-[60px] md:w-[40px] w-[20px]" src={cartIcon} alt="cart" />
                  <span className="block text-sm font-semibold mb-1">Cart</span>
                  <span>{userData.cart.length} items</span>
                </div>
              </div>
              <div className="bg-white xl:w-[250px] cursor-pointer rounded-xl xl:mt-[20px] px-[30px] py-[10px] lg:px-[50px] lg:py-[25px] xl:px-[80px] xl:py-[50px]">
                <NavLink to={'/orders'} state={{telegramLink: `@${updatedData.userName}`}}>
                <div className="flex justify-center items-center flex-col">
                  <img className="lg:w-[60px] md:w-[40px] w-[20px]" src={ordersIcon} alt="orders" />
                  <span className="block text-sm font-semibold mb-1">
                    Orders
                  </span>
                  <span>{userData.orders.length} orders</span>
                </div>
                </NavLink>
              </div>

              <div className="bg-white xl:w-[250px] cursor-pointer rounded-xl xl:mt-[20px] px-[30px] py-[10px] lg:px-[50px] lg:py-[25px] xl:px-[80px] xl:py-[50px]">
                <NavLink to={'/espforyou'} state={{telegramLink: `${updatedData.userName}`}}>
                <div className="flex justify-center items-center flex-col">
                  <img className="lg:w-[60px] md:w-[40px] w-[20px]" src={ordersIcon} alt="orders" />
                  <span className="block text-[12px] font-semibold mb-1">
                    Esp for you
                  </span>
                  <span>{userData.especiallyForYou.length} items</span>
                </div>
                </NavLink>
              </div>
            </div>
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

export default User;
