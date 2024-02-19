import { NavLink, useLocation } from "react-router-dom";

import HomeIcon from "../../images/home.svg";
import FavoritesIcon from "../../images/favorites.svg";
import BasketIcon from "../../images/basket.svg";
import AccountIcon from "../../images/account.svg";

import HomeIconActive from "../../images/home-active.svg";
import FavoritesIconActive from "../../images/favorites-active.svg";
import BasketIconActive from "../../images/basket-active.svg";
import AccountIconActive from "../../images/account-active.svg";

import { HandySvg } from "handy-svg";

import "./footer.css";

const Footer = (props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  console.log(location);
  // src={currentPath === '/' ? HomeIconActive : HomeIcon}
  return (
    <div className="flex justify-center">
      <div className="footer w-[90%] fixed flex items-center justify-between">
        <ul className="footer-nav flex justify-around w-full">
          <li>
            <NavLink to="/">
              <HandySvg
                src={currentPath === "/" ? HomeIconActive : HomeIcon}
                width={30}
                height={30}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites">
              <HandySvg
                src={
                  currentPath === "/favorites"
                    ? FavoritesIconActive
                    : FavoritesIcon
                }
                width={30}
                height={30}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/basket">
              <HandySvg
                src={currentPath === "/basket" ? BasketIconActive : BasketIcon}
                width={30}
                height={30}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/account">
              <HandySvg
                src={
                  currentPath === "/account" ? AccountIconActive : AccountIcon
                }
                width={30}
                height={30}
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
