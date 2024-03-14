import React, { useState } from "react";
import module from "./Navigation.module.css";
import settingIcon from "../../images/setting.svg";
import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";
import { NavLink, useLocation } from "react-router-dom";
import NavigationPopUp from "./NavigationPopUp";

const Navigation = () => {
  const location = useLocation();
  const { pathname } = location;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`xl:w-1/5 fixed bottom-2 left-5 xl:!bg-white xl:px-[28px] xl:fixed xl:top-0 xl:left-0`}
    >
      <div className="xl:hidden">
        <button
          className="text-xl text-gray-800 focus:outline-none"
          onClick={handleMenuToggle}
        >
          ☰
        </button>
      </div>
      <div className={`hidden xl:block`}>
        <NavLink to={"/"}>
          <div className="flex items-center mt-[36px] mb-[53px]">
            <img className="mr-[8px]" src={settingIcon} alt="setting" />
            <div>
              <span className={`${module.titleOfNav} mr-[4px]`}>Dashboard</span>
              <span className={`${module.version}`}>v.01</span>
            </div>
          </div>
        </NavLink>

        <div className={``}>
          <NavLink to={"/users"}>
            <div
              className={`${
                !pathname.includes("/users")
                  ? module.navButton
                  : module.navButtonActive
              } cursor-pointer flex justify-between items-center p-[11px]`}
            >
              <div className="flex justify-center items-center">
                <img width={24} src={userIcon} alt="user" />
                <span className="ml-[14px]">Users</span>
              </div>
              <img
                className={`${!pathname.includes("/users") ? "" : "hidden"}`}
                width={16}
                src={arrowIcon}
                alt="arrow"
              />
            </div>
          </NavLink>

          <NavLink to={"/items"}>
            <div
              className={`${
                !pathname.includes("/items")
                  ? module.navButton
                  : module.navButtonActive
              } cursor-pointer flex justify-between items-center p-[11px]`}
            >
              <div className="flex justify-center items-center">
                <img width={24} src={userIcon} alt="user" />
                <span className="ml-[14px]">Items</span>
              </div>
              <img
                className={`${!pathname.includes("/items") ? "" : "hidden"}`}
                width={16}
                src={arrowIcon}
                alt="arrow"
              />
            </div>
          </NavLink>

          <NavLink to={"/sizes"}>
            <div
              className={`${
                !pathname.includes("/sizes")
                  ? module.navButton
                  : module.navButtonActive
              } cursor-pointer flex justify-between items-center p-[11px]`}
            >
              <div className="flex justify-center items-center">
                <img width={24} src={userIcon} alt="user" />
                <span className="ml-[14px]">Sizes</span>
              </div>
              <img
                className={`${!pathname.includes("/sizes") ? "" : "hidden"}`}
                width={16}
                src={arrowIcon}
                alt="arrow"
              />
            </div>
          </NavLink>

          <NavLink to={"/orders"}>
            <div
              className={`${
                !pathname.includes("/orders")
                  ? module.navButton
                  : module.navButtonActive
              } cursor-pointer flex justify-between items-center p-[11px]`}
            >
              <div className="flex justify-center items-center">
                <img width={24} src={userIcon} alt="user" />
                <span className="ml-[14px]">Orders</span>
              </div>
              <img
                className={`${!pathname.includes("/orders") ? "" : "hidden"}`}
                width={16}
                src={arrowIcon}
                alt="arrow"
              />
            </div>
          </NavLink>

          <NavLink to={"/espforyou"}>
            <div
              className={`${
                !pathname.includes("/espforyou")
                  ? module.navButton
                  : module.navButtonActive
              } cursor-pointer flex justify-between items-center p-[11px]`}
            >
              <div className="flex justify-center items-center">
                <img width={24} src={userIcon} alt="user" />
                <span className="ml-[14px]">Esp for you</span>
              </div>
              <img
                className={`${
                  !pathname.includes("/espforyou") ? "" : "hidden"
                }`}
                width={16}
                src={arrowIcon}
                alt="arrow"
              />
            </div>
          </NavLink>

          <NavLink to={"/notifications"}>
            <div
              className={`${
                !pathname.includes("/notifications")
                  ? module.navButton
                  : module.navButtonActive
              } cursor-pointer flex justify-between items-center p-[11px]`}
            >
              <div className="flex justify-center items-center">
                <img width={24} src={userIcon} alt="user" />
                <span className="ml-[14px]">Notifications</span>
              </div>
              <img
                className={`${
                  !pathname.includes("/notifications") ? "" : "hidden"
                }`}
                width={16}
                src={arrowIcon}
                alt="arrow"
              />
            </div>
          </NavLink>
        </div>
      </div>

      {isMenuOpen && (
        <NavigationPopUp handleMenuToggle={handleMenuToggle} />
      )}
    </div>
  );
};

export default Navigation;
