import module from "./Navigation.module.css";

import settingIcon from "../../images/setting.svg";
import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
    const location = useLocation()
    const {pathname} = location

  return (
    <div className={`w-1/5 h-[100vh] !bg-white px-[28px]`}>
      <NavLink to={'/'}>
      <div className="flex items-center mt-[36px] mb-[53px]">
        <img className="mr-[8px]" src={settingIcon} alt="setting" />
        <div>
          <span className={`${module.titleOfNav} mr-[4px]`}>Dashboard</span>
          <span className={`${module.version}`}>v.01</span>
        </div>
      </div>
      </NavLink>

      <div className={``}>
        <NavLink to={'/users'}>
        <div className={`${!pathname.includes('/users') ? module.navButton : module.navButtonActive} cursor-pointer flex justify-between items-center p-[11px]`}>
          <div className="flex justify-center items-center">
            <img width={24} src={userIcon} alt="user" />
            <span className="ml-[14px]">Users</span>
          </div>
          <img className={`${!pathname.includes('/users') ? '' : 'hidden'}`} width={16} src={arrowIcon} alt="arrow" />
        </div>
        </NavLink>
        
        <NavLink to={'/orders'}>
        <div className={`${!pathname.includes('/orders') ? module.navButton : module.navButtonActive} cursor-pointer flex justify-between items-center p-[11px]`}>
          <div className="flex justify-center items-center">
            <img width={24} src={userIcon} alt="user" />
            <span className="ml-[14px]">Orders</span>
          </div>
          <img className={`${!pathname.includes('/orders') ? '' : 'hidden'}`} width={16} src={arrowIcon} alt="arrow" />
        </div>
        </NavLink>

        <NavLink to={'/especially-for-you'}>
        <div className={`${!pathname.includes('/especially-for-you') ? module.navButton : module.navButtonActive} cursor-pointer flex justify-between items-center p-[11px]`}>
          <div className="flex justify-center items-center">
            <img width={24} src={userIcon} alt="user" />
            <span className="ml-[14px]">Esp for you</span>
          </div>
          <img className={`${!pathname.includes('/especially-for-you') ? '' : 'hidden'}`} width={16} src={arrowIcon} alt="arrow" />
        </div>
        </NavLink>

        <NavLink to={'/notifications'}>
        <div className={`${!pathname.includes('/notifications') ? module.navButton : module.navButtonActive} cursor-pointer flex justify-between items-center p-[11px]`}>
          <div className="flex justify-center items-center">
            <img width={24} src={userIcon} alt="user" />
            <span className="ml-[14px]">Notifications</span>
          </div>
          <img className={`${!pathname.includes('/notifications') ? '' : 'hidden'}`} width={16} src={arrowIcon} alt="arrow" />
        </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
